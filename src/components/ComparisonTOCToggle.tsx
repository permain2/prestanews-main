"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState, useEffect } from "react"

interface TOCItem {
    id: string
    label: string
    href: string
}

interface ComparisonTOCToggleProps {
    items?: TOCItem[]
    category?: string
}

// Default items for most comparison pages
const defaultItems: TOCItem[] = [
    { id: "providers", label: "Top Picks", href: "#providers" },
    { id: "guide", label: "Buying Guide", href: "#guide" },
    { id: "compare", label: "Compare", href: "#compare" },
    { id: "methodology", label: "Methodology", href: "#methodology" },
    { id: "faq", label: "FAQ", href: "#faq" },
]

function ToggleItem({
    item,
    isSelected,
    onClick,
}: {
    item: TOCItem
    isSelected: boolean
    onClick: () => void
}) {
    return (
        <motion.a
            href={item.href}
            onClick={(e) => {
                e.preventDefault()
                onClick()
                const element = document.querySelector(item.href)
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" })
                }
            }}
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            className="comparison-toggle-item"
        >
            <span>{item.label}</span>
            <AnimatePresence initial={false}>
                {isSelected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="comparison-selected-indicator"
                        layoutId="comparison-toc-indicator"
                    />
                )}
            </AnimatePresence>
        </motion.a>
    )
}

export default function ComparisonTOCToggle({ items, category }: ComparisonTOCToggleProps) {
    const tocItems = items || defaultItems
    const [activeSection, setActiveSection] = useState(tocItems[0]?.id || "providers")

    // Track scroll position to highlight active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = tocItems.map(item => ({
                id: item.id,
                element: document.getElementById(item.id)
            })).filter(s => s.element)

            const scrollPosition = window.scrollY + 200

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section.element && section.element.offsetTop <= scrollPosition) {
                    setActiveSection(section.id)
                    break
                }
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [tocItems])

    return (
        <nav className="comparison-toc-container" role="navigation" aria-label="Page sections">
            <div className="comparison-toc-group">
                {tocItems.map((item) => (
                    <ToggleItem
                        key={item.id}
                        item={item}
                        isSelected={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                    />
                ))}
            </div>

            <style>{`
                .comparison-toc-container {
                    width: 100%;
                    overflow-x: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .comparison-toc-container::-webkit-scrollbar {
                    display: none;
                }

                .comparison-toc-group {
                    display: flex;
                    width: 100%;
                    padding: 6px;
                    background: linear-gradient(135deg, #0D2C4B 0%, #1a3a5c 100%);
                    border-radius: 12px;
                    gap: 4px;
                    box-shadow: 
                        0 0 0 1px rgba(255, 255, 255, 0.05),
                        0 4px 20px rgba(0, 0, 0, 0.15);
                }

                .comparison-toggle-item {
                    flex: 1 1 0;
                    color: rgba(255, 255, 255, 0.7);
                    padding: 12px 8px;
                    border-radius: 8px;
                    display: inline-flex;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    line-height: 1;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    text-decoration: none;
                    white-space: nowrap;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }

                .comparison-toggle-item:hover {
                    color: rgba(255, 255, 255, 0.95);
                }

                .comparison-toggle-item > span {
                    position: relative;
                    z-index: 1;
                }

                .comparison-selected-indicator {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
                }

                .comparison-toggle-item:has(.comparison-selected-indicator) {
                    color: #ffffff;
                }

                @media (max-width: 768px) {
                    .comparison-toc-group {
                        padding: 5px;
                        gap: 3px;
                        border-radius: 10px;
                    }

                    .comparison-toggle-item {
                        padding: 10px 6px;
                        font-size: 0.6875rem;
                        border-radius: 6px;
                    }

                    .comparison-selected-indicator {
                        border-radius: 6px;
                    }
                }

                @media (max-width: 480px) {
                    .comparison-toggle-item {
                        padding: 8px 4px;
                        font-size: 0.625rem;
                    }
                }
            `}</style>
        </nav>
    )
}
