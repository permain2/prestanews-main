"use client"

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "motion/react"
import { useState, useRef, useEffect, type FormEvent, type MouseEvent } from "react"

type NewsletterVariant = "guides" | "credit-card" | "insurance"

interface NewsletterBoxProps {
  variant?: NewsletterVariant
}

export default function NewsletterBox({ variant = "guides" }: NewsletterBoxProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [isHovered, setIsHovered] = useState(false)
  const [checkProgress, setCheckProgress] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking for tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 300, damping: 30 })

  // Animate checkmark on success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setCheckProgress(1), 200)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setStatus("loading")
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: `newsletter-${variant}` })
      })
      
      if (response.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 3000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const config = variants[variant]

  return (
    <motion.div
      ref={cardRef}
      className="newsletter-box-wrapper"
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`newsletter-box-modern newsletter-${variant}`}>
        {/* Animated Background Glow */}
        <motion.div 
          className="glow-orb"
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.15 : 0.08 
          }}
          transition={{ duration: 0.4 }}
        />
        
        <AnimatePresence mode="wait">
          {status === "success" ? (
            /* Inline Success State */
            <motion.div
              key="success"
              className="inline-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Animated Check Circle */}
              <motion.div 
                className="success-check-circle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 15,
                  delay: 0.1 
                }}
              >
                <svg viewBox="0 0 52 52" className="check-svg">
                  <motion.path
                    d="M14 27L22 35L38 19"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: checkProgress }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  />
                </svg>
                
                {/* Ripple Effects */}
                <motion.div
                  className="ripple"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
                <motion.div
                  className="ripple"
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
              </motion.div>

              {/* Success Message */}
              <motion.h3 
                className="success-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                You're In!
              </motion.h3>
              
              <motion.p 
                className="success-subtitle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Check your inbox for {config.offer}
              </motion.p>

              {/* Benefits reminder */}
              <motion.ul 
                className="success-benefits"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {["Weekly insights", "Exclusive deals", "Expert tips"].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <span className="benefit-check">✓</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ) : (
            /* Form State */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Icon */}
              <motion.div 
                className="icon-container"
                animate={{ 
                  y: isHovered ? -4 : 0,
                  scale: isHovered ? 1.1 : 1 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {config.icon}
              </motion.div>

              {/* Headlines */}
              <motion.p 
                className="headline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Get the <strong>{config.offer}</strong>
              </motion.p>
              <motion.p 
                className="subheadline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {config.subtitle}
              </motion.p>

              {/* Benefits List with Stagger */}
              <motion.ul 
                className="benefits-list"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
                  }
                }}
              >
                {config.benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  >
                    <span className="benefit-icon">{benefit.icon}</span>
                    <span>{benefit.text}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Form */}
              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <motion.div 
                    className="input-wrapper"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      required
                    />
                    <motion.span 
                      className="input-focus-ring"
                      initial={{ scaleX: 0 }}
                      whileFocus={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    className={`submit-btn ${status === "error" ? "error" : ""}`}
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.02, brightness: 1.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {status === "loading" ? (
                        <motion.span
                          key="loading"
                          className="btn-loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, rotate: 360 }}
                          exit={{ opacity: 0 }}
                          transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" opacity="0.25" />
                            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                          </svg>
                        </motion.span>
                      ) : status === "error" ? (
                        <motion.span
                          key="error"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          ✕
                        </motion.span>
                      ) : (
                        <motion.span
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          FREE
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                
                {/* Error Message */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      className="error-message"
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              {/* Social Proof */}
              <motion.p 
                className="social-proof"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.span 
                  className="check-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  ✓
                </motion.span>
                {config.socialProof}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .newsletter-box-wrapper {
          transform-style: preserve-3d;
        }

        .newsletter-box-modern {
          position: relative;
          background: linear-gradient(165deg, #0D2C4B 0%, #091E32 100%);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          box-shadow: 
            0 4px 24px rgba(0, 0, 0, 0.3),
            0 1px 0 rgba(255, 255, 255, 0.05) inset;
          min-height: 320px;
        }

        .glow-orb {
          position: absolute;
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, var(--glow-color, #146aff) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .newsletter-guides .glow-orb { --glow-color: #146aff; }
        .newsletter-credit-card .glow-orb { --glow-color: #C9A227; }
        .newsletter-insurance .glow-orb { --glow-color: #10b981; }

        /* Inline Success Styles */
        .inline-success {
          position: relative;
          z-index: 1;
          padding: 1rem 0;
        }

        .success-check-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--success-color, #146aff) 0%, var(--success-dark, #0040B1) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          position: relative;
        }

        .newsletter-guides .success-check-circle {
          --success-color: #146aff;
          --success-dark: #0040B1;
        }

        .newsletter-credit-card .success-check-circle {
          --success-color: #fbbf24;
          --success-dark: #C9A227;
        }

        .newsletter-insurance .success-check-circle {
          --success-color: #10b981;
          --success-dark: #059669;
        }

        .check-svg {
          width: 32px;
          height: 32px;
        }

        .ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid var(--success-color, #146aff);
          pointer-events: none;
        }

        .success-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .success-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
        }

        .success-benefits {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
        }

        .success-benefits li {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.85);
          padding: 0.375rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .benefit-check {
          color: var(--success-color, #146aff);
          font-weight: bold;
          font-size: 0.875rem;
        }

        .newsletter-guides .benefit-check { color: #146aff; }
        .newsletter-credit-card .benefit-check { color: #fbbf24; }
        .newsletter-insurance .benefit-check { color: #10b981; }

        /* Form Styles */
        .icon-container {
          position: relative;
          z-index: 1;
          width: 48px;
          height: 48px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-container svg {
          width: 100%;
          height: 100%;
        }

        .headline {
          position: relative;
          z-index: 1;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
          line-height: 1.4;
        }

        .headline strong {
          font-weight: 700;
        }

        .newsletter-guides .headline strong { color: #60a5fa; }
        .newsletter-credit-card .headline strong { color: #fbbf24; }
        .newsletter-insurance .headline strong { color: #34d399; }

        .subheadline {
          position: relative;
          z-index: 1;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.55);
          margin-bottom: 1rem;
        }

        .benefits-list {
          position: relative;
          z-index: 1;
          list-style: none;
          padding: 0;
          margin: 0 0 1rem 0;
          text-align: left;
        }

        .benefits-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.8);
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          cursor: default;
        }

        .benefits-list li:last-child {
          border-bottom: none;
        }

        .benefit-icon {
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .signup-form {
          position: relative;
          z-index: 1;
        }

        .input-group {
          display: flex;
          gap: 0.5rem;
        }

        .input-wrapper {
          flex: 1;
          position: relative;
        }

        .input-wrapper input {
          width: 100%;
          padding: 0.75rem 1rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 0.5rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .input-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .input-wrapper input:focus {
          border-color: var(--focus-color, #146aff);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(var(--focus-rgb, 20, 106, 255), 0.15);
        }

        .newsletter-guides .input-wrapper input:focus { 
          --focus-color: #146aff; 
          --focus-rgb: 20, 106, 255;
        }
        .newsletter-credit-card .input-wrapper input:focus { 
          --focus-color: #C9A227; 
          --focus-rgb: 201, 162, 39;
        }
        .newsletter-insurance .input-wrapper input:focus { 
          --focus-color: #10b981; 
          --focus-rgb: 16, 185, 129;
        }

        .input-focus-ring {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--focus-color, #146aff);
          transform-origin: left;
        }

        .submit-btn {
          padding: 0.75rem 1.25rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #ffffff;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          min-width: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .newsletter-guides .submit-btn {
          background: linear-gradient(135deg, #146aff 0%, #0040B1 100%);
        }

        .newsletter-credit-card .submit-btn {
          background: linear-gradient(135deg, #C9A227 0%, #9f7b00 100%);
          color: #0D2C4B;
        }

        .newsletter-insurance .submit-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .submit-btn:hover:not(:disabled) {
          filter: brightness(1.1);
        }

        .submit-btn:disabled {
          opacity: 0.8;
          cursor: default;
        }

        .submit-btn.error {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        .btn-loading svg {
          width: 18px;
          height: 18px;
        }

        .error-message {
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          color: #f87171;
          margin-top: 0.5rem;
          text-align: left;
        }

        .social-proof {
          position: relative;
          z-index: 1;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
        }

        .check-icon {
          color: #10b981;
          font-weight: bold;
        }

        /* Mobile adjustments */
        @media (max-width: 480px) {
          .newsletter-box-modern {
            padding: 1.25rem;
            min-height: 280px;
          }

          .headline {
            font-size: 0.9375rem;
          }

          .input-wrapper input {
            padding: 0.625rem 0.875rem;
            font-size: 0.8125rem;
          }

          .submit-btn {
            padding: 0.625rem 1rem;
          }
          
          .success-check-circle {
            width: 56px;
            height: 56px;
          }
          
          .check-svg {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </motion.div>
  )
}

// Icon Components
const EnvelopeIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="envGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#146aff" />
        <stop offset="100%" stopColor="#0040B1" />
      </linearGradient>
    </defs>
    <rect x="4" y="16" width="40" height="26" rx="3" fill="url(#envGrad)" />
    <path d="M4 19L24 32L44 19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M4 19V16.5C4 15.12 5.12 14 6.5 14H41.5C42.88 14 44 15.12 44 16.5V19" stroke="none" fill="url(#envGrad)" />
    <rect x="16" y="8" width="16" height="12" rx="1" fill="#ffffff" opacity="0.9" />
    <line x1="19" y1="12" x2="29" y2="12" stroke="#146aff" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="16" x2="26" y2="16" stroke="#146aff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
)

const CreditCardIcon = () => (
  <svg viewBox="0 0 48 36" fill="none">
    <defs>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C9A227" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
    </defs>
    {/* Card body */}
    <rect x="2" y="4" width="44" height="28" rx="4" fill="#162433" />
    <rect x="2" y="4" width="44" height="28" rx="4" stroke="rgba(201, 162, 39, 0.3)" strokeWidth="1" />
    {/* Chip */}
    <rect x="8" y="12" width="12" height="10" rx="2" fill="url(#cardGrad)" />
    <line x1="10" y1="15" x2="18" y2="15" stroke="#8B6914" strokeWidth="1" />
    <line x1="10" y1="17" x2="18" y2="17" stroke="#8B6914" strokeWidth="1" />
    <line x1="10" y1="19" x2="18" y2="19" stroke="#8B6914" strokeWidth="1" />
    <line x1="14" y1="12" x2="14" y2="22" stroke="#8B6914" strokeWidth="1" />
    {/* Contactless */}
    <path d="M38 10C40 12 40 16 38 18" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M35 12C36 13 36 15 35 16" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Card numbers (decorative dots) */}
    <g fill="#C9A227" opacity="0.7">
      <circle cx="10" cy="26" r="1" />
      <circle cx="14" cy="26" r="1" />
      <circle cx="18" cy="26" r="1" />
      <circle cx="22" cy="26" r="1" />
    </g>
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 40 48" fill="none">
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <path 
      d="M20 4L6 10V22C6 34 12 42 20 46C28 42 34 34 34 22V10L20 4Z" 
      fill="url(#shieldGrad)"
    />
    <path 
      d="M20 4L6 10V22C6 34 12 42 20 46C28 42 34 34 34 22V10L20 4Z" 
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="1"
      fill="none"
    />
    {/* Checkmark */}
    <path 
      d="M14 24L18 28L26 18" 
      stroke="white" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    {/* Shine effect */}
    <path 
      d="M12 12L14 14" 
      stroke="rgba(255, 255, 255, 0.4)" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
)

// Configuration for each variant
const variants: Record<NewsletterVariant, {
  icon: React.ReactNode
  offer: string
  subtitle: string
  benefits: { icon: string; text: string }[]
  socialProof: string
}> = {
  guides: {
    icon: <EnvelopeIcon />,
    offer: "Money Cheat Sheet",
    subtitle: "Weekly tips to save $1,000+/year",
    benefits: [
      { icon: "💰", text: "Hidden savings strategies" },
      { icon: "📊", text: "Budget templates & tools" },
      { icon: "🎯", text: "Personalized money tips" }
    ],
    socialProof: "12,847 readers already saving"
  },
  "credit-card": {
    icon: <CreditCardIcon />,
    offer: "$2,500 Card Guide",
    subtitle: "Best cards for max rewards (2025)",
    benefits: [
      { icon: "💳", text: "Top bonus offers this month" },
      { icon: "📊", text: "Point valuations cheat sheet" },
      { icon: "🎯", text: "Card matching quiz" }
    ],
    socialProof: "12,847 cardholders already earning"
  },
  insurance: {
    icon: <ShieldIcon />,
    offer: "$1,200 Savings Guide",
    subtitle: "Cut your premiums in half",
    benefits: [
      { icon: "🚗", text: "Auto rate comparison sheet" },
      { icon: "🏠", text: "Home coverage checklist" },
      { icon: "💰", text: "Hidden discount codes" }
    ],
    socialProof: "8,234 protected readers"
  }
}
