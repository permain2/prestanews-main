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
    type: 'card' | 'insurance' | 'icon'
}

// Mix of credit cards, insurance logos, and icons
const creditCards = [
    "/credit-cards/amex-platinum.png",
    "/credit-cards/amex-gold.png",
    "/credit-cards/chase-sapphire-preferred.png",
    "/credit-cards/capital-one-venture-x.png",
    "/credit-cards/citi-double-cash.png",
    "/credit-cards/blue-cash-preferred.png",
    "/credit-cards/discover-it-balance-transfer.png",
]

const insuranceLogos = [
    "/insurance-logos/geico.png",
    "/insurance-logos/progressive.png",
    "/insurance-logos/statefarm.png",
    "/insurance-logos/allstate.png",
    "/insurance-logos/lemonade.png",
    "/insurance-logos/nationwide.png",
    "/insurance-logos/prudential.png",
]

// SVG data URLs for icons (question marks, articles, lightbulbs)
const iconSvgs = [
    // Question mark icon
    `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#3B82F6"/><text x="50" y="68" font-family="Arial" font-size="55" font-weight="bold" fill="white" text-anchor="middle">?</text></svg>')}`,
    // Article/document icon
    `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="15" y="10" width="70" height="80" rx="8" fill="#10B981"/><rect x="25" y="25" width="40" height="6" rx="3" fill="white"/><rect x="25" y="40" width="50" height="4" rx="2" fill="white" opacity="0.7"/><rect x="25" y="50" width="45" height="4" rx="2" fill="white" opacity="0.7"/><rect x="25" y="60" width="50" height="4" rx="2" fill="white" opacity="0.7"/><rect x="25" y="70" width="35" height="4" rx="2" fill="white" opacity="0.7"/></svg>')}`,
    // Lightbulb icon (tips/guides)
    `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><ellipse cx="50" cy="40" rx="28" ry="30" fill="#F59E0B"/><rect x="38" y="65" width="24" height="8" rx="2" fill="#F59E0B"/><rect x="40" y="75" width="20" height="6" rx="2" fill="#D97706"/><rect x="42" y="82" width="16" height="4" rx="2" fill="#D97706"/><path d="M50 20 L50 35 M38 28 L48 35 M62 28 L52 35" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>')}`,
    // Dollar sign icon (finance)
    `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#059669"/><text x="50" y="70" font-family="Arial" font-size="55" font-weight="bold" fill="white" text-anchor="middle">$</text></svg>')}`,
    // Star icon (reviews/ratings)
    `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,10 61,40 95,40 68,60 79,90 50,72 21,90 32,60 5,40 39,40" fill="#EAB308"/></svg>')}`,
    // Shield icon (protection/insurance)
    `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 10 L85 25 L85 50 C85 72 68 88 50 95 C32 88 15 72 15 50 L15 25 Z" fill="#6366F1"/><path d="M45 55 L40 50 L35 55 L45 65 L65 45 L60 40 Z" fill="white"/></svg>')}`,
]

// Combine all images with their types
const allImages: { src: string; type: 'card' | 'insurance' | 'icon' }[] = [
    ...creditCards.map(src => ({ src, type: 'card' as const })),
    ...insuranceLogos.map(src => ({ src, type: 'insurance' as const })),
    ...iconSvgs.map(src => ({ src, type: 'icon' as const })),
]

export default function CursorTrailBlog({
    fadeOutDuration = 1.5,
    imageSize = 120,
    spawnDistance = 90,
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
        
        const currentImage = allImages[imageIndex.current]
        
        const newImage: TrailImage = {
            id: idCounter.current++,
            x: relativeX - imageSize / 2,
            y: relativeY - imageSize / 2,
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

    const getImageClass = (type: 'card' | 'insurance' | 'icon') => {
        switch (type) {
            case 'card':
                return 'trail-blog-card'
            case 'insurance':
                return 'trail-blog-insurance'
            case 'icon':
                return 'trail-blog-icon'
        }
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
            {/* Decorative Title */}
            <div className="trail-title-blog">Blog</div>
            
            {/* Trail Images */}
            <AnimatePresence>
                {trailImages.map((image) => (
                    <motion.img
                        key={image.id}
                        className={getImageClass(image.type)}
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

            {/* Subtitle */}
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
                }

                .trail-title-blog {
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

                .trail-subtitle-blog {
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

                /* Credit card style */
                .trail-blog-card {
                    position: absolute;
                    width: ${imageSize * 1.2}px;
                    height: auto;
                    max-height: ${imageSize * 0.8}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    border-radius: 10px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
                }

                /* Insurance logo style */
                .trail-blog-insurance {
                    position: absolute;
                    width: ${imageSize}px;
                    height: ${imageSize}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    border-radius: 14px;
                    background: white;
                    padding: 10px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                }

                /* Icon style */
                .trail-blog-icon {
                    position: absolute;
                    width: ${imageSize * 0.7}px;
                    height: ${imageSize * 0.7}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.2));
                }

                @media (max-width: 768px) {
                    .cursor-trail-container-blog {
                        min-height: 220px;
                    }
                    .trail-blog-card {
                        width: ${imageSize * 0.8}px;
                        max-height: ${imageSize * 0.55}px;
                    }
                    .trail-blog-insurance {
                        width: ${imageSize * 0.7}px;
                        height: ${imageSize * 0.7}px;
                        padding: 6px;
                    }
                    .trail-blog-icon {
                        width: ${imageSize * 0.5}px;
                        height: ${imageSize * 0.5}px;
                    }
                }
            `}</style>
        </div>
    )
}
