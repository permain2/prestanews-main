"use client"

import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

interface SplitTextTitleProps {
    text: string
    className?: string
    delay?: number
}

export default function SplitTextTitle({ 
    text, 
    className = "",
    delay = 0 
}: SplitTextTitleProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (hasAnimated.current) return
        
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            // Show the container once fonts are loaded
            containerRef.current.style.visibility = "visible"

            const h1 = containerRef.current.querySelector("h1")
            if (!h1) return

            const { words } = splitText(h1)

            // Animate the words
            animate(
                words,
                { opacity: [0, 1], y: [20, 0] },
                {
                    type: "spring",
                    duration: 1.5,
                    bounce: 0,
                    delay: stagger(0.04, { start: delay / 1000 }),
                }
            )
            
            hasAnimated.current = true
        })
    }, [delay])

    return (
        <div className="split-text-container" ref={containerRef}>
            <h1 className={`split-text-h1 ${className}`}>
                {text}
            </h1>

            <style>{`
                .split-text-container {
                    visibility: hidden;
                    width: 100%;
                    text-align: center;
                }

                .split-text-h1 {
                    font-family: 'Lexend', 'Sora', sans-serif;
                    font-size: clamp(1.75rem, 4.5vw, 2.5rem);
                    font-weight: 700;
                    color: #FFFFFF;
                    line-height: 1.2;
                    margin: 0;
                    max-width: 700px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .split-word {
                    will-change: transform, opacity;
                    display: inline-block;
                }
            `}</style>
        </div>
    )
}
