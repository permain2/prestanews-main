"use client"

import { motion } from "motion/react"
import { useState } from "react"

interface TOCItem {
    label: string
    href: string
    number: number
}

const tocItems: TOCItem[] = [
    { label: "All 15 Travel Cards", href: "#cards", number: 1 },
    { label: "How Travel Rewards Work", href: "#how-rewards-work", number: 2 },
    { label: "How to Choose a Card", href: "#how-to-choose", number: 3 },
    { label: "Best Cards by Category", href: "#best-by-category", number: 4 },
    { label: "Quick Comparison Table", href: "#compare-table", number: 5 },
    { label: "Our Ranking Methodology", href: "#methodology", number: 6 },
    { label: "FAQ (10 Questions)", href: "#faq", number: 7 },
    { label: "Related Guides", href: "#related", number: 8 },
]

function TOCItem({ label, href, number }: TOCItem) {
    const [isHovered, setIsHovered] = useState(false)

    const content = (
        <>
            <span className="toc-number">0{number}</span>
            {label}
        </>
    )

    return (
        <motion.a
            href={href}
            className="toc-reveal-item"
            style={{
                justifyContent: isHovered ? "flex-end" : "flex-start",
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <motion.span layout className="toc-text">
                {content}
            </motion.span>
            <motion.span layout className="toc-text toc-text-hidden" aria-hidden>
                {content}
            </motion.span>
        </motion.a>
    )
}

export default function TextRevealTOC() {
    return (
        <div className="toc-reveal-container">
            <div className="toc-reveal-header">
                <span className="toc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round"/>
                    </svg>
                </span>
                <h2 className="toc-title">Table of Contents</h2>
            </div>
            <nav className="toc-reveal-list">
                {tocItems.map((item) => (
                    <TOCItem key={item.href} {...item} />
                ))}
            </nav>

            <style>{`
                .toc-reveal-container {
                    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    padding: 1.5rem 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .toc-reveal-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1.25rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e2e8f0;
                }

                .toc-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #0D2C4B 0%, #1a4a7a 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .toc-icon svg {
                    width: 18px;
                    height: 18px;
                    stroke: white;
                }

                .toc-title {
                    font-family: 'Sora', 'Lexend', sans-serif;
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }

                .toc-reveal-list {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.5rem 1.5rem;
                }

                .toc-reveal-item {
                    position: relative;
                    cursor: pointer;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    height: 40px;
                    padding: 0.5rem 0.75rem;
                    border-radius: 10px;
                    text-decoration: none;
                    transition: background 0.2s ease;
                }

                .toc-reveal-item:hover {
                    background: #f1f5f9;
                }

                .toc-text {
                    color: #334155;
                    font-size: 0.9rem;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    line-height: 24px;
                    white-space: nowrap;
                }

                .toc-text-hidden {
                    position: absolute;
                    color: #3B82F6;
                    font-weight: 600;
                }

                .toc-number {
                    font-size: 0.8rem;
                    font-weight: 700;
                    opacity: 0.4;
                    font-variant-numeric: tabular-nums;
                    min-width: 20px;
                }

                .toc-reveal-item:hover .toc-text:not(.toc-text-hidden) {
                    opacity: 0.3;
                }

                @media (max-width: 640px) {
                    .toc-reveal-container {
                        padding: 1.25rem 1.5rem;
                        border-radius: 16px;
                    }

                    .toc-reveal-list {
                        grid-template-columns: 1fr;
                        gap: 0.25rem;
                    }

                    .toc-reveal-item {
                        height: 36px;
                        padding: 0.375rem 0.5rem;
                    }

                    .toc-text {
                        font-size: 0.85rem;
                    }
                }
            `}</style>
        </div>
    )
}
