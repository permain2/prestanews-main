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
  const [imageError, setImageError] = useState(false);

  // Generate star rating display
  const fullStars = Math.floor(provider.rating);
  const hasHalfStar = provider.rating % 1 >= 0.5;

  return (
    <motion.article
      ref={ref}
      className="comparison-card"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: smoothEase,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card Container with hover effects */}
      <motion.div
        className="comparison-card-inner"
        animate={{
          boxShadow: isHovered
            ? "0 8px 30px rgba(0, 0, 0, 0.08)"
            : "0 1px 3px rgba(0, 0, 0, 0.04)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Rank indicator - subtle */}
        <div className="rank-indicator">
          <span className="rank-number">{rank}</span>
        </div>

        <div className="card-layout">
          {/* Left Panel - Logo & CTA */}
          <div className="card-left-panel">
            {/* Logo Container */}
            <div className="logo-container">
              <div className="logo-wrapper">
                {imageError ? (
                  <div className="logo-fallback">
                    <span className="logo-initial">{provider.name.charAt(0)}</span>
                  </div>
                ) : (
                  <img
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    className="provider-logo"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    style={{ opacity: imageLoaded ? 1 : 0 }}
                  />
                )}
              </div>
            </div>

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

            <p className="cta-subtext">
              {provider.name}'s site
            </p>
          </div>

          {/* Right Panel - Details */}
          <div className="card-right-panel">
            {/* Header */}
            <div className="card-header">
              <div className="header-left">
                <span className="best-for-badge">
                  Best for {provider.bestFor}
                </span>
                <h3 className="provider-name">{provider.name}</h3>
              </div>

              {/* Rating */}
              <div className="rating-container">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`star ${i < fullStars ? "filled" : i === fullStars && hasHalfStar ? "half" : ""}`}
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        fill="currentColor"
                      />
                    </svg>
                  ))}
                </div>
                <span className="rating-number">{provider.rating}</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="stats-row">
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
            </div>

            {/* Description */}
            <p className="provider-description">{provider.description}</p>

            {/* Expand/Collapse Verdict Section */}
            <button
              className="verdict-toggle"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span>{isExpanded ? "Hide details" : "Show details"}</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M6 9l6 6 6-6" />
              </motion.svg>
            </button>

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
                          <span>Pros</span>
                        </div>
                        <ul className="verdict-list">
                          {provider.pros.map((pro, i) => (
                            <li key={i}>
                              <span className="list-bullet pros-bullet" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div className="verdict-column cons">
                        <div className="verdict-header">
                          <span>Cons</span>
                        </div>
                        <ul className="verdict-list">
                          {provider.cons.map((con, i) => (
                            <li key={i}>
                              <span className="list-bullet cons-bullet" />
                              {con}
                            </li>
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
          margin-bottom: 1rem;
        }

        .comparison-card-inner {
          position: relative;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }

        /* Rank indicator */
        .rank-indicator {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
          width: 28px;
          height: 28px;
          background: #0f172a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rank-number {
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          color: #ffffff;
        }

        /* Card Layout */
        .card-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
        }

        @media (max-width: 768px) {
          .card-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Left Panel */
        .card-left-panel {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fafafa;
          border-right: 1px solid #f1f5f9;
        }

        @media (max-width: 768px) {
          .card-left-panel {
            border-right: none;
            border-bottom: 1px solid #f1f5f9;
            padding: 1.25rem;
          }
        }

        /* Logo Container */
        .logo-container {
          margin-bottom: 1.25rem;
        }

        .logo-wrapper {
          position: relative;
          width: 160px;
          height: 80px;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          overflow: hidden;
        }

        .provider-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: opacity 0.3s ease;
        }

        .logo-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0D2C4B 0%, #1a3a5c 100%);
          border-radius: 12px;
        }

        .logo-initial {
          font-family: 'Sora', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
        }

        /* CTA Button */
        .cta-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          max-width: 180px;
          padding: 12px 20px;
          background: #0f172a;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .cta-button:hover {
          background: #1e293b;
        }

        .cta-subtext {
          margin-top: 0.5rem;
          font-size: 0.7rem;
          color: #94a3b8;
          text-align: center;
        }

        /* Right Panel */
        .card-right-panel {
          padding: 1.5rem;
        }

        @media (max-width: 768px) {
          .card-right-panel {
            padding: 1.25rem;
          }
        }

        /* Card Header */
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .header-left {
          flex: 1;
          min-width: 0;
        }

        .best-for-badge {
          display: inline-block;
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 0.25rem;
          font-weight: 500;
        }

        .provider-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .provider-name {
            font-size: 1rem;
          }
        }

        /* Rating */
        .rating-container {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .stars-row {
          display: flex;
          gap: 1px;
        }

        .star {
          width: 14px;
          height: 14px;
          color: #e5e7eb;
        }

        .star.filled {
          color: #0f172a;
        }

        .star.half {
          color: #94a3b8;
        }

        .rating-number {
          font-family: inherit;
          font-weight: 600;
          font-size: 0.9rem;
          color: #0f172a;
        }

        /* Stats Row */
        .stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .stat-value {
          font-weight: 600;
          font-size: 0.95rem;
          color: #0f172a;
        }

        .stat-badge .badge-value {
          color: #059669;
          font-weight: 600;
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
          gap: 4px;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.85rem;
          color: #64748b;
          transition: color 0.2s ease;
        }

        .verdict-toggle:hover {
          color: #0f172a;
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
          padding: 0;
        }

        .verdict-column.pros {
          /* clean */
        }

        .verdict-column.cons {
          /* clean */
        }

        .verdict-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 0.75rem;
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: #64748b;
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
          width: 4px;
          height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 8px;
        }

        .pros-bullet {
          background: #0f172a;
        }

        .cons-bullet {
          background: #94a3b8;
        }
      `}</style>
    </motion.article>
  );
}
