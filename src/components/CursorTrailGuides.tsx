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

interface TrailIcon {
    id: number
    x: number
    y: number
    iconIndex: number
    velocityX: number
    velocityY: number
}

// Mix of credit card and insurance logos for guides
const guideIcons = [
    "/credit-cards/chase-sapphire-preferred.png",
    "/insurance-logos/geico.png",
    "/credit-cards/amex-platinum.png",
    "/insurance-logos/progressive.png",
    "/credit-cards/capital-one-venture-x.png",
    "/insurance-logos/statefarm.png",
    "/credit-cards/amex-gold.png",
    "/insurance-logos/allstate.png",
    "/credit-cards/citi-double-cash.png",
    "/insurance-logos/nationwide.png",
    "/credit-cards/discover-it-balance-transfer.png",
    "/insurance-logos/travelers.png",
    "/credit-cards/blue-cash-preferred.png",
    "/insurance-logos/prudential.png",
    "/credit-cards/hilton-honors-aspire.png",
    "/insurance-logos/metlife.png",
]

export default function CursorTrailGuides({
    fadeOutDuration = 1.5,
    imageSize = 140,
    spawnDistance = 100,
    velocityFactor = 0.08,
}: {
    fadeOutDuration?: number
    imageSize?: number
    spawnDistance?: number
    velocityFactor?: number
}) {
    const iconIndex = useRef(0)
    const idCounter = useRef(0)
    const distance = useRef<number | undefined>(undefined)
    const [trailIcons, setTrailIcons] = useState<TrailIcon[]>([])
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
            spawnIcon(pointer.x.get(), pointer.y.get())
            distance.current = 0
        }
    })

    const spawnIcon = (x: number, y: number) => {
        if (!containerRef.current) return
        
        const rect = containerRef.current.getBoundingClientRect()
        const relativeX = x - rect.left
        const relativeY = y - rect.top
        
        const newIcon: TrailIcon = {
            id: idCounter.current++,
            x: relativeX - imageSize / 2,
            y: relativeY - imageSize / 2,
            iconIndex: iconIndex.current,
            velocityX: pointer.x.getVelocity(),
            velocityY: pointer.y.getVelocity(),
        }

        setTrailIcons((prev) => [...prev, newIcon])

        iconIndex.current = wrap(0, guideIcons.length, iconIndex.current + 1)

        delay(() => {
            setTrailIcons((prev) =>
                prev.filter((icon) => icon.id !== newIcon.id)
            )
        }, fadeOutDuration)
    }

    return (
        <div 
            ref={containerRef}
            className="cursor-trail-container-guides"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false)
                distance.current = undefined
            }}
        >
            {/* Decorative Title */}
            <div className="trail-title-guides">Guides</div>
            
            {/* Trail Icons */}
            <AnimatePresence>
                {trailIcons.map((icon) => (
                    <motion.img
                        key={icon.id}
                        className="trail-guide-image"
                        src={guideIcons[icon.iconIndex]}
                        alt=""
                        style={{
                            left: icon.x,
                            top: icon.y,
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
                                velocity: icon.velocityX * velocityFactor,
                            },
                            y: {
                                type: "inertia",
                                velocity: icon.velocityY * velocityFactor,
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
            <p className="trail-subtitle-guides">
                Expert guides for credit cards, insurance, and personal finance. Learn how to maximize rewards, choose the right coverage, and build your financial future.
            </p>

            <style>{`
                .cursor-trail-container-guides {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: linear-gradient(135deg, #F0F4E8 0%, #E8F0E0 100%);
                }

                .trail-title-guides {
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

                .trail-subtitle-guides {
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

                .trail-guide-image {
                    position: absolute;
                    width: ${imageSize}px;
                    height: auto;
                    max-height: ${imageSize}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    border-radius: 12px;
                    background: white;
                    padding: 10px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
                }

                @media (max-width: 768px) {
                    .cursor-trail-container-guides {
                        min-height: 220px;
                    }
                    .trail-guide-image {
                        width: 100px;
                        max-height: 100px;
                        padding: 6px;
                    }
                }
            `}</style>
        </div>
    )
}






