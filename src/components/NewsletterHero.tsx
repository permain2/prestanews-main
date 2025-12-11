"use client"

import { motion, useMotionValue, useTransform, useSpring, animate, AnimatePresence } from "motion/react"
import { useState, useRef, useEffect, type FormEvent, type MouseEvent } from "react"

export default function NewsletterHero() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [checkProgress, setCheckProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Parallax transforms for floating elements
  const floatX1 = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 100, damping: 30 })
  const floatY1 = useSpring(useTransform(mouseY, [-1, 1], [-15, 15]), { stiffness: 100, damping: 30 })
  const floatX2 = useSpring(useTransform(mouseX, [-1, 1], [20, -20]), { stiffness: 80, damping: 25 })
  const floatY2 = useSpring(useTransform(mouseY, [-1, 1], [20, -20]), { stiffness: 80, damping: 25 })
  const floatX3 = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), { stiffness: 120, damping: 35 })
  const floatY3 = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), { stiffness: 120, damping: 35 })

  // Animated counter
  const [displayCount, setDisplayCount] = useState(0)
  const targetCount = 12847

  useEffect(() => {
    const controls = animate(0, targetCount, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (value) => setDisplayCount(Math.round(value))
    })
    return () => controls.stop()
  }, [])

  // Animate checkmark on success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setCheckProgress(1), 200)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setStatus("loading")
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter-hero' })
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

  return (
    <div 
      ref={containerRef}
      className="newsletter-hero-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Background Elements */}
      <div className="bg-elements">
        <motion.div 
          className="float-element float-1"
          style={{ x: floatX1, y: floatY1 }}
        >
          <svg viewBox="0 0 60 60" fill="none">
            <rect x="5" y="15" width="50" height="35" rx="4" fill="rgba(20, 106, 255, 0.15)" />
            <path d="M5 20L30 38L55 20" stroke="rgba(20, 106, 255, 0.3)" strokeWidth="2" />
          </svg>
        </motion.div>
        <motion.div 
          className="float-element float-2"
          style={{ x: floatX2, y: floatY2 }}
        >
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" fill="rgba(201, 162, 39, 0.12)" />
            <path d="M14 20L18 24L26 16" stroke="rgba(201, 162, 39, 0.4)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>
        <motion.div 
          className="float-element float-3"
          style={{ x: floatX3, y: floatY3 }}
        >
          <svg viewBox="0 0 50 50" fill="none">
            <rect x="8" y="8" width="34" height="24" rx="3" fill="rgba(16, 185, 129, 0.12)" />
            <rect x="12" y="14" width="8" height="6" rx="1" fill="rgba(16, 185, 129, 0.3)" />
          </svg>
        </motion.div>
      </div>

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Kicker */}
        <motion.span 
          className="kicker"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          FREE NEWSLETTER
        </motion.span>

        {/* Main Title with Gradient */}
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Stay in the <span className="gradient-text">Loop</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Get the best credit card deals, travel tips, and financial insights 
          delivered to your inbox every week.
        </motion.p>

        {/* Form Area - Switches between Form and Success */}
        <motion.div 
          className="form-area"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              /* Inline Success State */
              <motion.div
                key="success"
                className="inline-success-hero"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="success-inner">
                  {/* Animated Check Circle */}
                  <motion.div 
                    className="success-check-circle"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
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
                    {/* Ripple */}
                    <motion.div
                      className="ripple"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </motion.div>
                  
                  <div className="success-text">
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      You're In!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Check your inbox for confirmation
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Form State */
              <motion.form 
                key="form"
                className="hero-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="form-container">
                  <div className="input-container">
                    <svg className="email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className={`submit-button ${status === "error" ? "error" : ""}`}
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {status === "loading" ? (
                        <motion.span
                          key="loading"
                          className="loading-spinner"
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
                          TRY AGAIN
                        </motion.span>
                      ) : (
                        <motion.span
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          SUBSCRIBE FREE
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                <AnimatePresence>
                  {status === "error" ? (
                    <motion.p 
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  ) : (
                    <motion.p 
                      className="disclaimer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      No spam, ever. Unsubscribe at any time.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social Proof with Animated Counter */}
        <motion.div 
          className="social-proof"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="avatars">
            <div className="avatar">JK</div>
            <div className="avatar">SM</div>
            <div className="avatar">AL</div>
            <div className="avatar more">+</div>
          </div>
          <p>
            Join <strong>{displayCount.toLocaleString()}</strong> readers already getting smarter about money
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div 
          className="feature-pills"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.8 }
            }
          }}
        >
          {[
            { icon: "💳", text: "Credit Card Alerts" },
            { icon: "✈️", text: "Deal Alerts" },
            { icon: "📊", text: "Weekly Digest" }
          ].map((pill, i) => (
            <motion.span 
              key={i}
              className="pill"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="pill-icon">{pill.icon}</span>
              {pill.text}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        .newsletter-hero-container {
          position: relative;
          background: linear-gradient(165deg, #0D2C4B 0%, #091E32 100%);
          padding: 5rem 2rem;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .float-element {
          position: absolute;
          opacity: 0.6;
        }

        .float-1 {
          top: 15%;
          left: 10%;
          width: 80px;
          height: 80px;
        }

        .float-2 {
          top: 25%;
          right: 15%;
          width: 60px;
          height: 60px;
        }

        .float-3 {
          bottom: 20%;
          left: 18%;
          width: 70px;
          height: 70px;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 36rem;
        }

        .kicker {
          display: inline-block;
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #146aff;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #146aff 50%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1.125rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 2rem;
        }

        .form-area {
          margin-bottom: 2rem;
          min-height: 120px;
        }

        .hero-form {
          /* inherits from form-area */
        }

        .form-container {
          display: flex;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1rem;
          padding: 0.5rem;
        }

        .input-container {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .email-icon {
          position: absolute;
          left: 1rem;
          width: 1.25rem;
          height: 1.25rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .input-container input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: #ffffff;
          background: transparent;
          border: none;
          outline: none;
        }

        .input-container input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .input-container input:focus {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
        }

        .submit-button {
          padding: 1rem 2rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #0D2C4B;
          background: linear-gradient(135deg, #fbbf24 0%, #C9A227 100%);
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          min-width: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-button:hover:not(:disabled) {
          filter: brightness(1.1);
          box-shadow: 0 4px 20px rgba(201, 162, 39, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.9;
          cursor: default;
        }

        .submit-button.error {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .loading-spinner svg {
          width: 20px;
          height: 20px;
        }

        .disclaimer {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.75rem;
        }

        .error-message {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: #f87171;
          margin-top: 0.75rem;
        }

        /* Inline Success State */
        .inline-success-hero {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1rem;
          padding: 1.5rem 2rem;
        }

        .success-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
        }

        .success-check-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }

        .check-svg {
          width: 28px;
          height: 28px;
        }

        .ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #10b981;
          pointer-events: none;
        }

        .success-text {
          text-align: left;
        }

        .success-text h3 {
          font-family: 'Sora', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .success-text p {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .social-proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .avatars {
          display: flex;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #146aff 0%, #0D2C4B 100%);
          border: 2px solid #0D2C4B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          color: white;
          margin-right: -8px;
        }

        .avatar.more {
          background: rgba(255, 255, 255, 0.1);
          font-size: 0.875rem;
        }

        .social-proof p {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .social-proof strong {
          color: #fbbf24;
          font-weight: 700;
        }

        .feature-pills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.8);
          cursor: default;
          transition: all 0.2s ease;
        }

        .pill:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .pill-icon {
          font-size: 1rem;
        }

        @media (max-width: 640px) {
          .newsletter-hero-container {
            padding: 3rem 1.25rem;
          }

          .form-container {
            flex-direction: column;
            padding: 0.75rem;
          }

          .input-container input {
            padding: 0.875rem 0.875rem 0.875rem 2.75rem;
          }

          .submit-button {
            width: 100%;
          }

          .inline-success-hero {
            padding: 1.25rem;
          }

          .success-inner {
            flex-direction: column;
            text-align: center;
          }

          .success-text {
            text-align: center;
          }

          .social-proof {
            flex-direction: column;
            gap: 0.5rem;
          }

          .feature-pills {
            gap: 0.5rem;
          }

          .pill {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }
        }
      `}</style>
    </div>
  )
}



