"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

interface Notification {
    id: number
    name: string
    location: string
    card: string
    flag: string
    timeAgo: string
}

// Sample notification data - mimics real signups
const sampleNotifications: Omit<Notification, 'id'>[] = [
    { name: "Chris W.", location: "Sheridan, Wyoming", card: "Chase Sapphire Preferred", flag: "🇺🇸", timeAgo: "2 min ago" },
    { name: "Sarah M.", location: "Austin, Texas", card: "Capital One Venture X", flag: "🇺🇸", timeAgo: "5 min ago" },
    { name: "Michael T.", location: "Denver, Colorado", card: "Amex Gold Card", flag: "🇺🇸", timeAgo: "8 min ago" },
    { name: "Emily R.", location: "Seattle, Washington", card: "Chase Sapphire Reserve", flag: "🇺🇸", timeAgo: "12 min ago" },
    { name: "David L.", location: "Miami, Florida", card: "Capital One Venture", flag: "🇺🇸", timeAgo: "15 min ago" },
    { name: "Jessica K.", location: "Chicago, Illinois", card: "Citi Strata Premier", flag: "🇺🇸", timeAgo: "18 min ago" },
    { name: "Robert P.", location: "Phoenix, Arizona", card: "Amex Platinum", flag: "🇺🇸", timeAgo: "22 min ago" },
    { name: "Amanda S.", location: "Portland, Oregon", card: "Wells Fargo Autograph", flag: "🇺🇸", timeAgo: "25 min ago" },
    { name: "James B.", location: "San Diego, California", card: "United Explorer Card", flag: "🇺🇸", timeAgo: "28 min ago" },
    { name: "Lauren H.", location: "Nashville, Tennessee", card: "Hilton Aspire", flag: "🇺🇸", timeAgo: "32 min ago" },
]

// State flags by state
const stateFlags: Record<string, string> = {
    "Wyoming": "🏔️",
    "Texas": "⭐",
    "Colorado": "🏔️",
    "Washington": "🌲",
    "Florida": "🌴",
    "Illinois": "🌆",
    "Arizona": "🌵",
    "Oregon": "🌲",
    "California": "☀️",
    "Tennessee": "🎸",
}

interface SignupNotificationsProps {
    initialDelay?: number // Delay before first notification (ms)
    interval?: number // Interval between notifications (ms)
    displayDuration?: number // How long each notification shows (ms)
    showInitialBatch?: number // Number of notifications to show initially
}

export default function SignupNotifications({
    initialDelay = 3000,
    interval = 120000, // 2 minutes
    displayDuration = 5000,
    showInitialBatch = 1,
}: SignupNotificationsProps) {
    const [activeNotifications, setActiveNotifications] = useState<Notification[]>([])
    const [notificationIndex, setNotificationIndex] = useState(0)
    const [idCounter, setIdCounter] = useState(0)

    const addNotification = () => {
        const notification = {
            ...sampleNotifications[notificationIndex % sampleNotifications.length],
            id: idCounter,
            timeAgo: "Just now",
        }
        
        setActiveNotifications(prev => [...prev.slice(-2), notification]) // Keep max 3
        setNotificationIndex(prev => prev + 1)
        setIdCounter(prev => prev + 1)

        // Auto-remove after display duration
        setTimeout(() => {
            setActiveNotifications(prev => prev.filter(n => n.id !== notification.id))
        }, displayDuration)
    }

    useEffect(() => {
        // Show initial batch after delay
        const initialTimeout = setTimeout(() => {
            for (let i = 0; i < showInitialBatch; i++) {
                setTimeout(() => addNotification(), i * 500)
            }
        }, initialDelay)

        // Set up recurring interval
        const intervalId = setInterval(() => {
            addNotification()
        }, interval)

        return () => {
            clearTimeout(initialTimeout)
            clearInterval(intervalId)
        }
    }, [])

    return (
        <div id="signup-notifications">
            <AnimatePresence initial={false} mode="popLayout">
                {activeNotifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        className="notification-toast"
                        layout
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{
                            opacity: 0,
                            x: 50,
                            scale: 0.9,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <div className="notification-avatar">
                            <svg className="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="notification-content">
                            <div className="notification-header">
                                <span className="notification-name">{notification.name}</span>
                                <span className="notification-flag">{stateFlags[notification.location.split(", ")[1]] || notification.flag}</span>
                            </div>
                            <div className="notification-message">
                                Applied for <strong>{notification.card}</strong>
                            </div>
                            <div className="notification-location">
                                {notification.location} • {notification.timeAgo}
                            </div>
                        </div>
                        <button 
                            className="notification-close"
                            onClick={() => setActiveNotifications(prev => prev.filter(n => n.id !== notification.id))}
                            aria-label="Dismiss"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>

            <style>{`
                #signup-notifications {
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    pointer-events: none;
                    width: 100%;
                    max-width: 340px;
                }

                .notification-toast {
                    position: relative;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-radius: 14px;
                    padding: 14px 16px;
                    box-shadow: 
                        0 0 0 1px rgba(0, 0, 0, 0.04),
                        0 4px 20px rgba(0, 0, 0, 0.08),
                        0 12px 40px rgba(0, 0, 0, 0.12);
                    pointer-events: all;
                    width: 100%;
                    max-width: 340px;
                }

                .notification-avatar {
                    flex-shrink: 0;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .avatar-icon {
                    width: 20px;
                    height: 20px;
                    stroke: white;
                }

                .notification-content {
                    flex: 1;
                    min-width: 0;
                }

                .notification-header {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 2px;
                }

                .notification-name {
                    font-weight: 600;
                    font-size: 14px;
                    color: #0f172a;
                }

                .notification-flag {
                    font-size: 12px;
                }

                .notification-message {
                    font-size: 13px;
                    color: #334155;
                    line-height: 1.4;
                    margin-bottom: 4px;
                }

                .notification-message strong {
                    color: #0066B2;
                    font-weight: 600;
                }

                .notification-location {
                    font-size: 11px;
                    color: #64748b;
                }

                .notification-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 24px;
                    height: 24px;
                    border: none;
                    background: transparent;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    opacity: 0;
                    transition: all 0.2s ease;
                    color: #94a3b8;
                }

                .notification-toast:hover .notification-close {
                    opacity: 1;
                }

                .notification-close:hover {
                    background: #f1f5f9;
                    color: #64748b;
                }

                /* Mobile styles - top right */
                @media (max-width: 640px) {
                    #signup-notifications {
                        top: 70px;
                        right: 12px;
                        max-width: calc(100% - 24px);
                    }

                    .notification-toast {
                        max-width: 100%;
                        padding: 12px 14px;
                        border-radius: 12px;
                    }

                    .notification-avatar {
                        width: 36px;
                        height: 36px;
                    }

                    .avatar-icon {
                        width: 18px;
                        height: 18px;
                    }

                    .notification-name {
                        font-size: 13px;
                    }

                    .notification-message {
                        font-size: 12px;
                    }

                    .notification-close {
                        opacity: 1;
                    }
                }

                /* Dark mode support */
                @media (prefers-color-scheme: dark) {
                    .notification-toast {
                        background: rgba(30, 41, 59, 0.98);
                        box-shadow: 
                            0 0 0 1px rgba(255, 255, 255, 0.06),
                            0 4px 20px rgba(0, 0, 0, 0.3),
                            0 12px 40px rgba(0, 0, 0, 0.4);
                    }

                    .notification-name {
                        color: #f1f5f9;
                    }

                    .notification-message {
                        color: #cbd5e1;
                    }

                    .notification-message strong {
                        color: #60a5fa;
                    }

                    .notification-location {
                        color: #94a3b8;
                    }

                    .notification-close {
                        color: #64748b;
                    }

                    .notification-close:hover {
                        background: rgba(255, 255, 255, 0.1);
                        color: #94a3b8;
                    }
                }
            `}</style>
        </div>
    )
}
