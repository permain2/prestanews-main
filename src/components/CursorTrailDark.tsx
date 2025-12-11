"use client"

import { delay, wrap } from "motion"
import { usePointerPosition } from "motion-plus/react"
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useTransform,
} from "motion/react"
import { useRef, useState } from "react"

interface TrailImage {
    id: number
    x: number
    y: number
    imageIndex: number
    velocityX: number
    velocityY: number
}

const creditCardImages = [
    "/credit-cards/1684306443-green-credit-card-new.avif",
    "/credit-cards/Membership_Rewards_Card.avif",
    "/credit-cards/en_in-smart-earn-credit-card.avif",
    "/credit-cards/in-visa-gold-card-498x280.webp",
    "/credit-cards/visa-platinum-recto-800x450.webp",
    "/credit-cards/images.png",
    "/credit-cards/cq5dam.web.767.767.png",
    "/credit-cards/-1x-1.webp",
    "/credit-cards/f0760430-aaa4-11f0-9b33-4180f1b0bec1.webp",
    "/credit-cards/artst.webp",
    "/credit-cards/a0aaf110-5c28-11f0-a560-59457a3cd909.webp",
    "/credit-cards/images (2).jpeg",
    "/credit-cards/images (3).jpeg",
    "/credit-cards/ihg-card-hub-seo-card-img-business-usen-1500x980.avif",
    "/credit-cards/united_club_infinite_card.png",
    "/credit-cards/swa_prem_biz_cardart-1.png",
]

interface CursorTrailDarkProps {
    title: string
    kicker?: string
    subtitle: string
    author?: string
    date?: string
    fadeOutDuration?: number
    imageSize?: number
    spawnDistance?: number
    velocityFactor?: number
}

export default function CursorTrailDark({
    title,
    kicker = "TRAVEL CARDS",
    subtitle,
    author = "Screened Editorial Team",
    date = "Dec. 10, 2025",
    fadeOutDuration = 1.5,
    imageSize = 160,
    spawnDistance = 100,
    velocityFactor = 0.08,
}: CursorTrailDarkProps) {
    const imageIndex = useRef(0)
    const idCounter = useRef(0)
    const distance = useRef<number | undefined>(undefined)
    const [trailImages, setTrailImages] = useState<TrailImage[]>([])
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    
    const pointer = usePointerPosition()
    
    const pointerDistance = useTransform(() => {
        if (!isHovering) return 0
        const x = pointer.x.get()
        const y = pointer.y.get()
        const deltaX = x - (pointer.x.getPrevious() ?? x)
        const deltaY = y - (pointer.y.getPrevious() ?? y)
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    })

    useMotionValueEvent(pointerDistance, "change", (latest) => {
        if (!isHovering) return
        
        if (distance.current === undefined) {
            distance.current = 0
            return
        }

        distance.current += latest

        if (distance.current >= spawnDistance) {
            spawnImage(pointer.x.get(), pointer.y.get())
            distance.current = 0
        }
    })

    const spawnImage = (x: number, y: number) => {
        if (!containerRef.current) return
        
        const rect = containerRef.current.getBoundingClientRect()
        const relativeX = x - rect.left
        const relativeY = y - rect.top
        
        const newImage: TrailImage = {
            id: idCounter.current++,
            x: relativeX - imageSize / 2,
            y: relativeY - imageSize / 2,
            imageIndex: imageIndex.current,
            velocityX: pointer.x.getVelocity(),
            velocityY: pointer.y.getVelocity(),
        }

        setTrailImages((prev) => [...prev, newImage])

        imageIndex.current = wrap(0, creditCardImages.length, imageIndex.current + 1)

        delay(() => {
            setTrailImages((prev) =>
                prev.filter((img) => img.id !== newImage.id)
            )
        }, fadeOutDuration)
    }

    return (
        <div 
            ref={containerRef}
            className="cursor-trail-dark-container"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false)
                distance.current = undefined
            }}
        >
            {/* Trail Images - Behind content */}
            <div className="trail-images-layer">
                <AnimatePresence>
                    {trailImages.map((image) => (
                        <motion.img
                            key={image.id}
                            className="trail-card-dark"
                            src={creditCardImages[image.imageIndex]}
                            alt=""
                            style={{
                                left: image.x,
                                top: image.y,
                                willChange: "opacity, transform",
                            }}
                            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                            animate={{
                                opacity: 0.25,
                                scale: 1,
                                rotate: Math.random() * 30 - 15,
                                x: 0,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.15,
                                x: {
                                    type: "inertia",
                                    velocity: image.velocityX * velocityFactor,
                                },
                                y: {
                                    type: "inertia",
                                    velocity: image.velocityY * velocityFactor,
                                },
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.3,
                                transition: { duration: 0.5 },
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Dark overlay */}
            <div className="dark-overlay" />

            {/* Content - On top */}
            <div className="content-layer">
                <span className="trail-kicker">{kicker}</span>
                <h1 className="trail-dark-title">{title}</h1>
                <p className="trail-dark-subtitle">{subtitle}</p>
                <div className="trail-meta">
                    <span>By {author}</span>
                    <span>•</span>
                    <span>Updated {date}</span>
                </div>
            </div>

            <style>{`
                .cursor-trail-dark-container {
                    position: relative;
                    width: 100%;
                    min-height: 320px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: #0D2C4B;
                }

                .trail-images-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1;
                }

                .dark-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(13, 44, 75, 0.7);
                    z-index: 2;
                    pointer-events: none;
                }

                .content-layer {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    padding: 0 2rem;
                    pointer-events: none;
                }

                .trail-kicker {
                    display: inline-block;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.875rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    color: #3B82F6;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                }

                .trail-dark-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 700;
                    color: #FFFFFF !important;
                    line-height: 1.2;
                    margin-bottom: 1rem;
                    max-width: 800px;
                }

                .trail-dark-subtitle {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.25rem;
                    color: #CBD5E1;
                    line-height: 1.7;
                    max-width: 700px;
                    margin: 0 auto 1.5rem;
                }

                .trail-meta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.875rem;
                    color: #94A3B8;
                }

                .trail-card-dark {
                    position: absolute;
                    width: ${imageSize}px;
                    height: auto;
                    max-height: ${imageSize * 0.7}px;
                    object-fit: contain;
                    pointer-events: none;
                    border-radius: 10px;
                    filter: blur(1px);
                }

                @media (max-width: 768px) {
                    .cursor-trail-dark-container {
                        min-height: 280px;
                    }
                    .trail-card-dark {
                        width: 100px;
                        max-height: 70px;
                    }
                    .trail-dark-subtitle {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </div>
    )
}

