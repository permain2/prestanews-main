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
    type: 'card' | 'insurance'
}

// Optimized thumbnail credit cards (8)
const creditCards = [
    "/cursor-trail/cards/amex-platinum.png",
    "/cursor-trail/cards/amex-gold.png",
    "/cursor-trail/cards/chase-sapphire-preferred.png",
    "/cursor-trail/cards/capital-one-venture-x.png",
    "/cursor-trail/cards/citi-double-cash.png",
    "/cursor-trail/cards/blue-cash-preferred.png",
    "/cursor-trail/cards/discover-it-balance-transfer.png",
    "/cursor-trail/cards/delta-skymiles-reserve.png",
]

// Optimized thumbnail insurance logos (7)
const insuranceLogos = [
    "/cursor-trail/insurance/geico.png",
    "/cursor-trail/insurance/progressive.png",
    "/cursor-trail/insurance/statefarm.png",
    "/cursor-trail/insurance/allstate.png",
    "/cursor-trail/insurance/lemonade.png",
    "/cursor-trail/insurance/nationwide.png",
    "/cursor-trail/insurance/prudential.png",
]

// Combined: 15 total images (8 cards + 7 insurance)
const allImages: { src: string; type: 'card' | 'insurance' }[] = [
    ...creditCards.map(src => ({ src, type: 'card' as const })),
    ...insuranceLogos.map(src => ({ src, type: 'insurance' as const })),
]

export default function CursorTrailBlog({
    fadeOutDuration = 1.5,
    cardSize = 120,
    logoSize = 80,
    spawnDistance = 90,
    velocityFactor = 0.08,
}: {
    fadeOutDuration?: number
    cardSize?: number
    logoSize?: number
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
        
        const currentImage = allImages[imageIndex.current]
        const size = currentImage.type === 'card' ? cardSize : logoSize
        
        const newImage: TrailImage = {
            id: idCounter.current++,
            x: relativeX - size / 2,
            y: relativeY - size / 2,
            imageIndex: imageIndex.current,
            velocityX: pointer.x.getVelocity(),
            velocityY: pointer.y.getVelocity(),
            type: currentImage.type,
        }

        setTrailImages((prev) => [...prev, newImage])

        imageIndex.current = wrap(0, allImages.length, imageIndex.current + 1)

        delay(() => {
            setTrailImages((prev) =>
                prev.filter((img) => img.id !== newImage.id)
            )
        }, fadeOutDuration)
    }

    return (
        <div 
            ref={containerRef}
            className="cursor-trail-container-blog"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false)
                distance.current = undefined
            }}
        >
            <div className="trail-title-blog">Blog</div>
            
            <AnimatePresence>
                {trailImages.map((image) => (
                    <motion.img
                        key={image.id}
                        className={image.type === 'card' ? 'trail-blog-card' : 'trail-blog-insurance'}
                        src={allImages[image.imageIndex].src}
                        alt=""
                        style={{
                            left: image.x,
                            top: image.y,
                            willChange: "opacity, transform",
                        }}
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: Math.random() * 20 - 10,
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

            <p className="trail-subtitle-blog">
                Expert insights on credit cards, insurance, travel rewards, and personal finance. Stay informed with the latest news and guides.
            </p>

            <style>{`
                .cursor-trail-container-blog {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: linear-gradient(135deg, #F0F4FF 0%, #E8EEF8 100%);
                    z-index: 1;
                    isolation: isolate;
                }

                .trail-title-blog {
                    position: relative;
                    font-family: 'Lexend', sans-serif;
                    font-size: clamp(2.5rem, 6vw, 4rem);
                    font-weight: 700;
                    color: #162433;
                    z-index: 2;
                    pointer-events: none;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .trail-subtitle-blog {
                    position: relative;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.125rem;
                    color: #68727C;
                    z-index: 2;
                    pointer-events: none;
                    text-align: center;
                    max-width: 700px;
                    padding: 0 1.5rem;
                    line-height: 1.7;
                }

                .trail-blog-card {
                    position: absolute;
                    width: ${cardSize}px;
                    height: auto;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 1;
                    border-radius: 8px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
                }

                .trail-blog-insurance {
                    position: absolute;
                    width: ${logoSize}px;
                    height: ${logoSize}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 1;
                    border-radius: 10px;
                    background: white;
                    padding: 8px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 768px) {
                    .cursor-trail-container-blog {
                        min-height: 220px;
                    }
                    .trail-blog-card {
                        width: 80px;
                    }
                    .trail-blog-insurance {
                        width: 60px;
                        height: 60px;
                        padding: 5px;
                    }
                }
            `}</style>
        </div>
    )
}
