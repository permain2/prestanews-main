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

export default function CursorTrailCreditCards({
    fadeOutDuration = 1.5,
    imageSize = 180,
    spawnDistance = 100,
    velocityFactor = 0.08,
}: {
    fadeOutDuration?: number
    imageSize?: number
    spawnDistance?: number
    velocityFactor?: number
}) {
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
            className="cursor-trail-container"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false)
                distance.current = undefined
            }}
        >
            {/* Decorative Title */}
            <div className="trail-title">Credit Cards</div>
            
            {/* Trail Images */}
            <AnimatePresence>
                {trailImages.map((image) => (
                    <motion.img
                        key={image.id}
                        className="trail-card-image"
                        src={creditCardImages[image.imageIndex]}
                        alt=""
                        style={{
                            left: image.x,
                            top: image.y,
                            willChange: "opacity, transform",
                        }}
                        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                        animate={{
                            opacity: 1,
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
                            transition: { duration: 0.4 },
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Subtitle */}
            <p className="trail-subtitle">
                Find the perfect credit card for your spending habits. Our experts review and compare the best options for travel rewards, cash back, business, and more.
            </p>

            <style>{`
                .cursor-trail-container {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: linear-gradient(135deg, #EEF2F6 0%, #E8ECF0 100%);
                }

                .trail-title {
                    position: relative;
                    font-family: 'Lexend', sans-serif;
                    font-size: clamp(2.5rem, 6vw, 4rem);
                    font-weight: 700;
                    color: #162433;
                    z-index: 50;
                    pointer-events: none;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .trail-subtitle {
                    position: relative;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.125rem;
                    color: #68727C;
                    z-index: 50;
                    pointer-events: none;
                    text-align: center;
                    max-width: 700px;
                    padding: 0 1.5rem;
                    line-height: 1.7;
                }

                .trail-card-image {
                    position: absolute;
                    width: ${imageSize}px;
                    height: auto;
                    max-height: ${imageSize * 0.7}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                }

                @media (max-width: 768px) {
                    .cursor-trail-container {
                        min-height: 220px;
                    }
                    .trail-card-image {
                        width: 120px;
                        max-height: 84px;
                    }
                }
            `}</style>
        </div>
    )
}



