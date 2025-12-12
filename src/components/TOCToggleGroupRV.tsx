"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState, useEffect } from "react"

interface TOCItem {
    id: string
    label: string
    href: string
    hideOnMobile?: boolean
}

const tocItems: TOCItem[] = [
    { id: "cards", label: "Top Insurers", href: "#cards" },
    { id: "compare-table", label: "Compare", href: "#compare-table" },
    { id: "what-is", label: "Overview", href: "#what-is", hideOnMobile: true },
    { id: "how-to-choose", label: "How to Choose", href: "#how-to-choose", hideOnMobile: true },
    { id: "methodology", label: "Methodology", href: "#methodology", hideOnMobile: true },
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
        <a
            href={item.href}
            onClick={onClick}
            className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap ${
                item.hideOnMobile ? "hidden md:flex" : "flex"
            } ${
                isSelected
                    ? "text-white"
                    : "text-[#68727C] hover:text-[#0D2C4B] hover:bg-gray-100"
            }`}
        >
            {isSelected && (
                <motion.div
                    layoutId="rv-toc-pill"
                    className="absolute inset-0 bg-gradient-to-r from-[#0D2C4B] to-[#1a4a70] rounded-lg"
                    initial={false}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                    }}
                />
            )}
            <span className="relative z-10">{item.label}</span>
        </a>
    )
}

export default function TOCToggleGroupRV() {
    const [selected, setSelected] = useState(tocItems[0].id)

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
                    setSelected(section.id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide" aria-label="Page sections">
            <AnimatePresence mode="wait">
                {tocItems.map((item) => (
                    <ToggleItem
                        key={item.id}
                        item={item}
                        isSelected={selected === item.id}
                        onClick={() => setSelected(item.id)}
                    />
                ))}
            </AnimatePresence>
        </nav>
    )
}

