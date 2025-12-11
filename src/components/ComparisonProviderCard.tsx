"use client";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";

interface Provider {
  name: string;
  logo: string;
  bestFor: string;
  monthlyAvg: string;
  serviceFee?: string;
  rating: number;
  amBest?: string;
  pros: string[];
  cons: string[];
  description: string;
  affiliateUrl?: string;
}

interface ComparisonProviderCardProps {
  provider: Provider;
  index: number;
  rank: number;
}

// Premium spring configuration for smooth, Apple-like animations
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const smoothEase = [0.25, 0.46, 0.45, 0.94];

export default function ComparisonProviderCard({
  provider,
  index,
  rank,
}: ComparisonProviderCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate star rating display
  const fullStars = Math.floor(provider.rating);
  const hasHalfStar = provider.rating % 1 >= 0.5;

  return (
    <motion.article
      ref={ref}
      className="comparison-card"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: smoothEase,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Card Container with hover effects */}
      <motion.div
        className="comparison-card-inner"
        animate={{
          boxShadow: isHovered
            ? "0 32px 64px -12px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(59, 130, 246, 0.1)"
            : "0 4px 24px -4px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)",
          y: isHovered ? -8 : 0,
        }}
        transition={springTransition}
      >
        {/* Rank Badge - Floating */}
        <motion.div
          className="rank-badge"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            delay: index * 0.12 + 0.3,
            ...springTransition,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="rank-number">#{rank}</span>
        </motion.div>

        <div className="card-layout">
          {/* Left Panel - Logo & CTA */}
          <div className="card-left-panel">
            {/* Logo Container with shimmer effect */}
            <motion.div
              className="logo-container"
              animate={{
                scale: isHovered ? 1.03 : 1,
              }}
              transition={springTransition}
            >
              <motion.div
                className="logo-wrapper"
                style={{ perspective: 1000 }}
                whileHover={{
                  rotateY: 5,
                  rotateX: -3,
                }}
                transition={springTransition}
              >
                <img
                  src={provider.logo}
                  alt={`${provider.name} logo`}
                  className="provider-logo"
                  onLoad={() => setImageLoaded(true)}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />
                
                {/* Premium shine effect on hover */}
                <motion.div
                  className="shine-overlay"
                  animate={isHovered ? { x: ["100%", "-100%"] } : {}}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.a
              href={provider.affiliateUrl || "#"}
              className="cta-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springTransition}
            >
              <span>Get Quote</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={springTransition}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </motion.a>

            <motion.p
              className="cta-subtext"
              animate={{ opacity: isHovered ? 1 : 0.6 }}
              transition={{ duration: 0.2 }}
            >
              On {provider.name}'s Website
            </motion.p>
          </div>

          {/* Right Panel - Details */}
          <div className="card-right-panel">
            {/* Header */}
            <div className="card-header">
              <div className="header-left">
                <motion.span
                  className="best-for-badge"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.12 + 0.2 }}
                >
                  Best for: {provider.bestFor}
                </motion.span>
                <h3 className="provider-name">{provider.name}</h3>
              </div>

              {/* Rating */}
              <motion.div
                className="rating-container"
                whileHover={{ scale: 1.05 }}
                transition={springTransition}
              >
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className={`star ${i < fullStars ? "filled" : i === fullStars && hasHalfStar ? "half" : ""}`}
                      viewBox="0 0 20 20"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{
                        delay: index * 0.12 + 0.4 + i * 0.05,
                        ...springTransition,
                      }}
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        fill="currentColor"
                      />
                    </motion.svg>
                  ))}
                </div>
                <span className="rating-number">{provider.rating}</span>
              </motion.div>
            </div>

            {/* Stats Row */}
            <motion.div
              className="stats-row"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.12 + 0.3 }}
            >
              <div className="stat-item">
                <span className="stat-label">Monthly</span>
                <span className="stat-value">{provider.monthlyAvg}</span>
              </div>
              {provider.serviceFee && (
                <div className="stat-item">
                  <span className="stat-label">Service Fee</span>
                  <span className="stat-value">{provider.serviceFee}</span>
                </div>
              )}
              {provider.amBest && (
                <div className="stat-item stat-badge">
                  <span className="stat-label">AM Best</span>
                  <span className="stat-value badge-value">{provider.amBest}</span>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              className="provider-description"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.12 + 0.35 }}
            >
              {provider.description}
            </motion.p>

            {/* Expand/Collapse Verdict Section */}
            <motion.button
              className="verdict-toggle"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.08)" }}
              transition={{ duration: 0.2 }}
            >
              <span>Our Verdict</span>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={springTransition}
              >
                <path d="M6 9l6 6 6-6" />
              </motion.svg>
            </motion.button>

            {/* Verdict Content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  className="verdict-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.4, ease: smoothEase },
                    opacity: { duration: 0.25 },
                  }}
                >
                  <div className="verdict-inner">
                    <div className="verdict-grid">
                      {/* Pros */}
                      <div className="verdict-column pros">
                        <div className="verdict-header">
                          <motion.div
                            className="verdict-icon-container pros-icon"
                            animate={isExpanded ? { scale: [0, 1.2, 1] } : {}}
                            transition={{ delay: 0.1 }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.div>
                          <span>Pros</span>
                        </div>
                        <ul className="verdict-list">
                          {provider.pros.map((pro, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                            >
                              <span className="list-bullet pros-bullet" />
                              {pro}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div className="verdict-column cons">
                        <div className="verdict-header">
                          <motion.div
                            className="verdict-icon-container cons-icon"
                            animate={isExpanded ? { scale: [0, 1.2, 1] } : {}}
                            transition={{ delay: 0.15 }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.div>
                          <span>Cons</span>
                        </div>
                        <ul className="verdict-list">
                          {provider.cons.map((con, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + i * 0.05 }}
                            >
                              <span className="list-bullet cons-bullet" />
                              {con}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <style>{`
        .comparison-card {
          margin-bottom: 1.5rem;
        }

        .comparison-card-inner {
          position: relative;
          background: #ffffff;
          border-radius: 20px;
          overflow: visible;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Rank Badge */
        .rank-badge {
          position: absolute;
          top: -12px;
          left: 24px;
          z-index: 10;
          background: linear-gradient(135deg, #0D2C4B 0%, #1a4a7a 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 100px;
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          box-shadow: 0 4px 16px rgba(13, 44, 75, 0.3);
        }

        .rank-number {
          background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Card Layout */
        .card-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
        }

        @media (max-width: 768px) {
          .card-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Left Panel */
        .card-left-panel {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
          border-right: 1px solid rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 768px) {
          .card-left-panel {
            border-right: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            padding: 1.5rem;
          }
        }

        /* Logo Container */
        .logo-container {
          margin-bottom: 1.5rem;
        }

        .logo-wrapper {
          position: relative;
          width: 200px;
          height: 100px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .provider-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: opacity 0.3s ease;
        }

        .shine-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.6) 45%,
            transparent 50%
          );
          pointer-events: none;
        }

        /* CTA Button */
        .cta-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          max-width: 200px;
          padding: 14px 24px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.35);
          transition: box-shadow 0.3s ease;
        }

        .cta-button:hover {
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.45);
        }

        .cta-subtext {
          margin-top: 0.75rem;
          font-size: 0.75rem;
          color: #64748b;
          text-align: center;
        }

        /* Right Panel */
        .card-right-panel {
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .card-right-panel {
            padding: 1.5rem;
          }
        }

        /* Card Header */
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          margin-top: 0.5rem;
        }

        .header-left {
          flex: 1;
          min-width: 0;
        }

        .best-for-badge {
          display: inline-block;
          padding: 6px 14px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          color: #1d4ed8;
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          border-radius: 100px;
          margin-bottom: 0.5rem;
          letter-spacing: 0.025em;
        }

        .provider-name {
          font-family: 'Sora', sans-serif;
          font-size: 1.375rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .provider-name {
            font-size: 1.125rem;
          }
        }

        /* Rating */
        .rating-container {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: #fefce8;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .stars-row {
          display: flex;
          gap: 2px;
        }

        .star {
          width: 16px;
          height: 16px;
          color: #e5e7eb;
        }

        .star.filled {
          color: #f59e0b;
        }

        .star.half {
          color: #fcd34d;
        }

        .rating-number {
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #0f172a;
        }

        /* Stats Row */
        .stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 1rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 12px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .stat-value {
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #0f172a;
        }

        .stat-badge .badge-value {
          color: #059669;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          padding: 2px 10px;
          border-radius: 6px;
          font-size: 0.85rem;
        }

        /* Description */
        .provider-description {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        /* Verdict Toggle */
        .verdict-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1rem;
          background: transparent;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          color: #0f172a;
          transition: all 0.2s ease;
        }

        .verdict-toggle:hover {
          border-color: #3b82f6;
        }

        /* Verdict Content */
        .verdict-content {
          overflow: hidden;
        }

        .verdict-inner {
          padding-top: 1rem;
        }

        .verdict-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .verdict-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .verdict-column {
          padding: 1rem;
          border-radius: 12px;
        }

        .verdict-column.pros {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }

        .verdict-column.cons {
          background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
        }

        .verdict-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.75rem;
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .verdict-icon-container {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .verdict-icon-container svg {
          width: 14px;
          height: 14px;
        }

        .pros-icon {
          background: #22c55e;
          color: white;
        }

        .pros .verdict-header {
          color: #166534;
        }

        .cons-icon {
          background: #ef4444;
          color: white;
        }

        .cons .verdict-header {
          color: #991b1b;
        }

        .verdict-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .verdict-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.875rem;
          color: #374151;
          line-height: 1.6;
          padding: 4px 0;
        }

        .list-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 7px;
        }

        .pros-bullet {
          background: #22c55e;
        }

        .cons-bullet {
          background: #ef4444;
        }
      `}</style>
    </motion.article>
  );
}
