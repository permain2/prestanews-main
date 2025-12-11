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

const insuranceLogos = [
    "/insurance-logos/geico.png",
    "/insurance-logos/progressive.png",
    "/insurance-logos/statefarm.png",
    "/insurance-logos/allstate.png",
    "/insurance-logos/libertymutual.png",
    "/insurance-logos/prudential.png",
    "/insurance-logos/metlife.png",
    "/insurance-logos/newyorklife.png",
    "/insurance-logos/northwestern.png",
    "/insurance-logos/massmutual.png",
    "/insurance-logos/nationwide.png",
    "/insurance-logos/travelers.png",
    "/insurance-logos/farmers.png",
    "/insurance-logos/usaa.png",
    "/insurance-logos/lemonade.png",
    "/insurance-logos/amica.png",
    "/insurance-logos/erie.png",
    "/insurance-logos/chubb.png",
]

export default function CursorTrailInsurance({
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

        imageIndex.current = wrap(0, insuranceLogos.length, imageIndex.current + 1)

        delay(() => {
            setTrailImages((prev) =>
                prev.filter((img) => img.id !== newImage.id)
            )
        }, fadeOutDuration)
    }

    return (
        <div 
            ref={containerRef}
            className="cursor-trail-container-insurance"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false)
                distance.current = undefined
            }}
        >
            {/* Decorative Title */}
            <div className="trail-title-insurance">Insurance</div>
            
            {/* Trail Images */}
            <AnimatePresence>
                {trailImages.map((image) => (
                    <motion.img
                        key={image.id}
                        className="trail-logo-image"
                        src={insuranceLogos[image.imageIndex]}
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
            <p className="trail-subtitle-insurance">
                Find the right insurance coverage for your needs. Our experts review and compare the best providers for auto, home, renters, and life insurance.
            </p>

            <style>{`
                .cursor-trail-container-insurance {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: linear-gradient(135deg, #E8F4F8 0%, #E0EEF4 100%);
                }

                .trail-title-insurance {
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

                .trail-subtitle-insurance {
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

                .trail-logo-image {
                    position: absolute;
                    width: ${imageSize}px;
                    height: ${imageSize}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    border-radius: 16px;
                    background: white;
                    padding: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
                }

                @media (max-width: 768px) {
                    .cursor-trail-container-insurance {
                        min-height: 220px;
                    }
                    .trail-logo-image {
                        width: 100px;
                        height: 100px;
                        padding: 8px;
                    }
                }
            `}</style>
        </div>
    )
}
