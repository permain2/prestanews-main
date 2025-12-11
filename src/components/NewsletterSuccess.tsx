"use client"

import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { useEffect, useState, useMemo } from "react"

interface NewsletterSuccessProps {
  variant?: "guides" | "credit-card" | "insurance"
  onClose?: () => void
}

// Generate confetti pieces
function generateConfetti(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    color: [
      "#fbbf24", // gold
      "#146aff", // blue
      "#10b981", // green
      "#60a5fa", // light blue
      "#f472b6", // pink
      "#a78bfa", // purple
    ][Math.floor(Math.random() * 6)],
    size: 6 + Math.random() * 8,
    type: Math.random() > 0.5 ? "circle" : "rect",
  }))
}

export default function NewsletterSuccess({ variant = "guides", onClose }: NewsletterSuccessProps) {
  const [confetti] = useState(() => generateConfetti(50))
  const checkProgress = useMotionValue(0)
  const checkPathLength = useTransform(checkProgress, [0, 1], [0, 1])
  
  // Animated counter
  const [displayCount, setDisplayCount] = useState(0)
  const targetCount = variant === "insurance" ? 8235 : 12848

  useEffect(() => {
    // Animate check mark
    animate(checkProgress, 1, { duration: 0.6, delay: 0.3 })
    
    // Animate counter
    const controls = animate(0, targetCount, {
      duration: 1.5,
      delay: 0.5,
      ease: "easeOut",
      onUpdate: (value) => setDisplayCount(Math.round(value))
    })
    
    return () => controls.stop()
  }, [checkProgress, targetCount])

  const config = useMemo(() => ({
    guides: {
      title: "You're In! 🎉",
      subtitle: "Check your inbox for the Money Cheat Sheet",
      color: "#146aff",
      gradient: "linear-gradient(135deg, #146aff 0%, #0040B1 100%)",
    },
    "credit-card": {
      title: "Welcome Aboard! 💳",
      subtitle: "Your $2,500 Card Guide is on its way",
      color: "#C9A227",
      gradient: "linear-gradient(135deg, #fbbf24 0%, #C9A227 100%)",
    },
    insurance: {
      title: "You're Protected! 🛡️",
      subtitle: "Your $1,200 Savings Guide is coming",
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    },
  }[variant]), [variant])

  return (
    <motion.div 
      className="success-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Confetti */}
      <div className="confetti-container">
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color,
              width: piece.size,
              height: piece.type === "rect" ? piece.size * 0.4 : piece.size,
              borderRadius: piece.type === "circle" ? "50%" : "2px",
            }}
            initial={{ 
              y: -20, 
              opacity: 0,
              rotate: 0,
              scale: 0
            }}
            animate={{ 
              y: [0, 400, 600],
              opacity: [0, 1, 1, 0],
              rotate: [0, piece.rotation, piece.rotation * 2],
              scale: [0, 1, 1, 0.5]
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Success Card */}
      <motion.div 
        className="success-card"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          delay: 0.1 
        }}
      >
        {/* Animated Check Circle */}
        <motion.div 
          className="check-circle"
          style={{ background: config.gradient }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 15,
            delay: 0.2 
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
              style={{ pathLength: checkPathLength }}
            />
          </svg>
          
          {/* Ripple Effect */}
          <motion.div
            className="ripple"
            style={{ borderColor: config.color }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          />
          <motion.div
            className="ripple"
            style={{ borderColor: config.color }}
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>

        {/* Title */}
        <motion.h2 
          className="success-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {config.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          className="success-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {config.subtitle}
        </motion.p>

        {/* Counter */}
        <motion.div 
          className="success-counter"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="counter-number" style={{ color: config.color }}>
            {displayCount.toLocaleString()}
          </span>
          <span className="counter-label">readers and counting</span>
        </motion.div>

        {/* Benefits reminder */}
        <motion.div 
          className="success-benefits"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>Here's what's coming your way:</p>
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } }
            }}
          >
            {[
              "Weekly insights & tips",
              "Exclusive deals & offers",
              "Expert analysis"
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <span className="benefit-check" style={{ color: config.color }}>✓</span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Close Button */}
        {onClose && (
          <motion.button
            className="close-btn"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ background: config.gradient }}
          >
            Continue Reading
          </motion.button>
        )}
      </motion.div>

      <style>{`
        .success-overlay {
          position: fixed;
          inset: 0;
          background: rgba(9, 30, 50, 0.95);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
          overflow: hidden;
        }

        .confetti-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          top: -20px;
        }

        .success-card {
          background: linear-gradient(165deg, #0D2C4B 0%, #091E32 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 2.5rem;
          text-align: center;
          max-width: 400px;
          width: 100%;
          position: relative;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        .check-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          position: relative;
        }

        .check-svg {
          width: 40px;
          height: 40px;
        }

        .ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid;
          pointer-events: none;
        }

        .success-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .success-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
        }

        .success-counter {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
        }

        .counter-number {
          font-family: 'Sora', sans-serif;
          font-size: 2rem;
          font-weight: 700;
        }

        .counter-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .success-benefits {
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .success-benefits p {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 0.75rem;
        }

        .success-benefits ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .success-benefits li {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.85);
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .benefit-check {
          font-weight: bold;
          font-size: 1rem;
        }

        .close-btn {
          width: 100%;
          padding: 1rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          color: white;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          filter: brightness(1.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 480px) {
          .success-card {
            padding: 2rem 1.5rem;
          }

          .success-title {
            font-size: 1.5rem;
          }

          .counter-number {
            font-size: 1.5rem;
          }

          .check-circle {
            width: 64px;
            height: 64px;
          }

          .check-svg {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </motion.div>
  )
}




