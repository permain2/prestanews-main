"use client"

import { animate, delay, stagger, wrap } from "motion"
import { splitText } from "motion-plus"
import { usePointerPosition } from "motion-plus/react"
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useTransform,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

interface TrailImage {
    id: number
    x: number
    y: number
    imageIndex: number
    velocityX: number
    velocityY: number
}

const creditCardImages = [
    // Balance Transfer Cards
    "/credit-cards/citi-diamond-preferred.png",
    "/credit-cards/wells-fargo-reflect.png",
    "/credit-cards/bankamericard.png",
    "/credit-cards/discover-it-balance-transfer.png",
    "/credit-cards/us-bank-visa-platinum.png",
    "/credit-cards/chase-slate-edge.png",
    // Cash Back Cards
    "/credit-cards/blue-cash-preferred.png",
    "/credit-cards/blue-cash-everyday.png",
    "/credit-cards/amex-cash-magnet.png",
    "/credit-cards/citi-double-cash.png",
    // Featured Cards
    "/credit-cards/chase-sapphire-preferred.png",
    "/credit-cards/capital-one-venture-x.png",
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
    compact?: boolean
    animateTitle?: boolean
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
    compact = false,
    animateTitle = false,
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

    const titleRef = useRef<HTMLHeadingElement>(null)
    const hasAnimated = useRef(false)

    // Split text animation for title
    useEffect(() => {
        if (!animateTitle || hasAnimated.current) return

        document.fonts.ready.then(() => {
            if (!titleRef.current) return

            titleRef.current.style.visibility = "visible"

            const { words } = splitText(titleRef.current)

            animate(
                words,
                { opacity: [0, 1], y: [15, 0] },
                {
                    type: "spring",
                    duration: 1.2,
                    bounce: 0,
                    delay: stagger(0.035, { start: 0.2 }),
                }
            )

            hasAnimated.current = true
        })
    }, [animateTitle])

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

    const containerHeight = compact ? 220 : 320
    const mobileContainerHeight = compact ? 180 : 280

    return (
        <div 
            ref={containerRef}
            className={`cursor-trail-dark-container ${compact ? 'compact' : ''}`}
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
                {kicker && (
                    <motion.span 
                        className="trail-kicker"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                    >
                        {kicker}
                    </motion.span>
                )}
                <h1 
                    ref={titleRef}
                    className={`trail-dark-title ${animateTitle ? 'animated' : ''}`}
                >
                    {title}
                </h1>
                <motion.p 
                    className="trail-dark-subtitle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    {subtitle}
                </motion.p>
                <motion.div 
                    className="trail-meta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                >
                    <span>By {author}</span>
                    <span>•</span>
                    <span>Updated {date}</span>
                </motion.div>
            </div>

            <style>{`
                .cursor-trail-dark-container {
                    position: relative;
                    width: 100%;
                    min-height: ${containerHeight}px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: #0D2C4B;
                }

                .cursor-trail-dark-container.compact {
                    min-height: ${containerHeight}px;
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
                    padding: ${compact ? '0 1.5rem' : '0 2rem'};
                    pointer-events: none;
                }

                .trail-kicker {
                    display: inline-block;
                    font-family: 'Poppins', sans-serif;
                    font-size: ${compact ? '0.75rem' : '0.875rem'};
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    color: #3B82F6;
                    text-transform: uppercase;
                    margin-bottom: ${compact ? '0.5rem' : '1rem'};
                }

                .trail-dark-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: ${compact ? 'clamp(1.5rem, 4vw, 2.25rem)' : 'clamp(2rem, 5vw, 3rem)'};
                    font-weight: 700;
                    color: #FFFFFF !important;
                    line-height: 1.2;
                    margin-bottom: ${compact ? '0.5rem' : '1rem'};
                    max-width: ${compact ? '650px' : '800px'};
                }

                .trail-dark-title.animated {
                    visibility: hidden;
                }

                .trail-dark-title .split-word {
                    will-change: transform, opacity;
                    display: inline-block;
                    margin-right: 0.25em;
                }

                .trail-dark-title .split-word:last-child {
                    margin-right: 0;
                }

                /* Slight adjustment to prevent words running together */
                .trail-dark-title.animated {
                    word-spacing: 0.05em;
                }

                .trail-dark-subtitle {
                    font-family: 'Poppins', sans-serif;
                    font-size: ${compact ? '1rem' : '1.25rem'};
                    color: #CBD5E1;
                    line-height: 1.6;
                    max-width: ${compact ? '550px' : '700px'};
                    margin: 0 auto ${compact ? '0.75rem' : '1.5rem'};
                }

                .trail-meta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    font-family: 'Poppins', sans-serif;
                    font-size: ${compact ? '0.75rem' : '0.875rem'};
                    color: #94A3B8;
                }

                .trail-card-dark {
                    position: absolute;
                    width: ${compact ? imageSize * 0.75 : imageSize}px;
                    height: auto;
                    max-height: ${(compact ? imageSize * 0.75 : imageSize) * 0.7}px;
                    object-fit: contain;
                    pointer-events: none;
                    border-radius: 10px;
                    filter: blur(1px);
                }

                @media (max-width: 768px) {
                    .cursor-trail-dark-container {
                        min-height: ${mobileContainerHeight}px;
                    }
                    .cursor-trail-dark-container.compact {
                        min-height: ${mobileContainerHeight}px;
                    }
                    .trail-card-dark {
                        width: ${compact ? '70px' : '100px'};
                        max-height: ${compact ? '50px' : '70px'};
                    }
                    .trail-dark-subtitle {
                        font-size: ${compact ? '0.875rem' : '1rem'};
                    }
                    .content-layer {
                        padding: 0 1rem;
                    }
                }
            `}</style>
        </div>
    )
}

