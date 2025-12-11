"use client";
import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

interface PremiumContentSectionProps {
  children: ReactNode;
}

// Premium spring configuration
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const smoothEase = [0.25, 0.46, 0.45, 0.94];

// Animated wrapper for scroll reveal
function ScrollRevealBlock({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: smoothEase,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function PremiumContentSection({
  children,
}: PremiumContentSectionProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="premium-content-section" ref={containerRef}>
      <motion.div
        className="content-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="premium-content">{children}</div>
      </motion.div>

      <style>{`
        .premium-content-section {
          padding: 4rem 0;
          background: #ffffff;
        }

        .content-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Premium Content Typography */
        .premium-content {
          color: #374151;
          font-size: 1.0625rem;
          line-height: 1.85;
        }

        /* Headings */
        .premium-content h2 {
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 1.875rem;
          color: #0f172a;
          margin: 3.5rem 0 1.5rem;
          padding-bottom: 0.875rem;
          border-bottom: 2px solid #e2e8f0;
          position: relative;
        }

        .premium-content h2::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
        }

        .premium-content h3 {
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 1.375rem;
          color: #1e293b;
          margin: 2.5rem 0 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .premium-content h4 {
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 1.125rem;
          color: #334155;
          margin: 2rem 0 0.75rem;
        }

        /* Paragraphs */
        .premium-content p {
          margin-bottom: 1.5rem;
          color: #475569;
        }

        .premium-content p strong {
          color: #0f172a;
          font-weight: 600;
        }

        /* Links */
        .premium-content a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          transition: all 0.2s ease;
        }

        .premium-content a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: #3b82f6;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .premium-content a:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* Lists */
        .premium-content ul,
        .premium-content ol {
          margin: 1.5rem 0 2rem;
          padding-left: 0;
          list-style: none;
        }

        .premium-content ul li,
        .premium-content ol li {
          position: relative;
          padding-left: 1.75rem;
          margin-bottom: 0.875rem;
          line-height: 1.7;
          color: #475569;
        }

        .premium-content ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
          border-radius: 50%;
        }

        .premium-content ol {
          counter-reset: list-counter;
        }

        .premium-content ol li {
          counter-increment: list-counter;
        }

        .premium-content ol li::before {
          content: counter(list-counter);
          position: absolute;
          left: 0;
          top: 0;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          color: #1d4ed8;
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Premium Tables */
        .premium-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }

        .premium-content thead {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }

        .premium-content th {
          color: #ffffff;
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          text-align: left;
          padding: 1rem 1.25rem;
          border: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .premium-content th:first-child {
          border-top-left-radius: 16px;
        }

        .premium-content th:last-child {
          border-top-right-radius: 16px;
        }

        .premium-content tbody tr {
          transition: all 0.2s ease;
        }

        .premium-content tbody tr:hover {
          background: linear-gradient(90deg, #f8fafc 0%, #ffffff 100%);
        }

        .premium-content td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.95rem;
          color: #475569;
        }

        .premium-content tbody tr:last-child td {
          border-bottom: none;
        }

        .premium-content tbody tr:last-child td:first-child {
          border-bottom-left-radius: 16px;
        }

        .premium-content tbody tr:last-child td:last-child {
          border-bottom-right-radius: 16px;
        }

        .premium-content td strong {
          color: #0f172a;
          font-weight: 600;
        }

        /* Key Takeaways Box - Premium card style */
        .premium-content .key-takeaways {
          background: #ffffff;
          border: none;
          border-radius: 16px;
          padding: 0;
          margin: 2rem 0;
          overflow: hidden;
          box-shadow: 
            0 0 0 1px rgba(0, 0, 0, 0.03),
            0 4px 24px rgba(0, 0, 0, 0.06);
        }

        .premium-content .key-takeaways h3 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          margin: 0;
          padding: 1rem 1.5rem;
          font-size: 1rem;
        }

        .premium-content .key-takeaways h3::before {
          content: '';
          width: 20px;
          height: 20px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M9 11l3 3L22 4'/%3E%3Cpath d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'/%3E%3C/svg%3E");
          background-size: contain;
          flex-shrink: 0;
        }

        .premium-content .key-takeaways ul {
          margin: 0;
          padding: 1.25rem 1.5rem;
        }

        .premium-content .key-takeaways li {
          padding-left: 1.5rem;
          color: #334155;
        }

        .premium-content .key-takeaways li::before {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        }

        /* Info Box - No emoji, uses icon in header */
        .premium-content .info-box {
          background: #ffffff;
          border: none;
          border-radius: 16px;
          padding: 0;
          margin: 2rem 0;
          overflow: hidden;
          box-shadow: 
            0 0 0 1px rgba(59, 130, 246, 0.1),
            0 4px 24px rgba(59, 130, 246, 0.08);
        }

        .premium-content .info-box h4 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #ffffff;
          margin: 0;
          padding: 1rem 1.5rem;
          font-size: 0.9375rem;
        }

        .premium-content .info-box h4::before {
          content: '';
          width: 20px;
          height: 20px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 16v-4M12 8h.01'/%3E%3C/svg%3E");
          background-size: contain;
          flex-shrink: 0;
        }

        .premium-content .info-box p {
          color: #334155;
          margin: 0;
          padding: 1.25rem 1.5rem;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .premium-content .info-box ul {
          margin: 0;
          padding: 0 1.5rem 1.25rem;
        }

        .premium-content .info-box li {
          color: #334155;
        }

        .premium-content .info-box li::before {
          background: #3b82f6;
        }

        /* Success Box */
        .premium-content .success-box {
          background: #ffffff;
          border: none;
          border-radius: 16px;
          padding: 0;
          margin: 2rem 0;
          overflow: hidden;
          box-shadow: 
            0 0 0 1px rgba(34, 197, 94, 0.1),
            0 4px 24px rgba(34, 197, 94, 0.08);
        }

        .premium-content .success-box h4 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: #ffffff;
          margin: 0;
          padding: 1rem 1.5rem;
          font-size: 0.9375rem;
        }

        .premium-content .success-box h4::before {
          content: '';
          width: 20px;
          height: 20px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M20 6L9 17l-5-5'/%3E%3C/svg%3E");
          background-size: contain;
          flex-shrink: 0;
        }

        .premium-content .success-box p,
        .premium-content .success-box li {
          color: #334155;
        }

        .premium-content .success-box p {
          margin: 0;
          padding: 1.25rem 1.5rem;
        }

        .premium-content .success-box ul {
          margin: 0;
          padding: 0 1.5rem 1.25rem;
        }

        .premium-content .success-box li::before {
          background: #22c55e;
        }

        /* Warning Box */
        .premium-content .warning-box {
          background: #ffffff;
          border: none;
          border-radius: 16px;
          padding: 0;
          margin: 2rem 0;
          overflow: hidden;
          box-shadow: 
            0 0 0 1px rgba(245, 158, 11, 0.15),
            0 4px 24px rgba(245, 158, 11, 0.1);
        }

        .premium-content .warning-box h4 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          margin: 0;
          padding: 1rem 1.5rem;
          font-size: 0.9375rem;
        }

        .premium-content .warning-box h4::before {
          content: '';
          width: 20px;
          height: 20px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01'/%3E%3C/svg%3E");
          background-size: contain;
          flex-shrink: 0;
        }

        .premium-content .warning-box p {
          margin: 0;
          padding: 1.25rem 1.5rem;
          color: #334155;
        }

        .premium-content .warning-box li {
          color: #334155;
        }

        .premium-content .warning-box ul {
          margin: 0;
          padding: 0 1.5rem 1.25rem;
        }

        .premium-content .warning-box li::before {
          background: #f59e0b;
        }

        /* Blockquote */
        .premium-content blockquote {
          margin: 2rem 0;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
          border-left: 4px solid #3b82f6;
          border-radius: 0 16px 16px 0;
          font-style: italic;
          color: #475569;
        }

        .premium-content blockquote p {
          margin: 0;
        }

        /* Code */
        .premium-content code {
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 0.9em;
          color: #475569;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .content-container {
            padding: 0 1rem;
          }

          .premium-content h2 {
            font-size: 1.5rem;
          }

          .premium-content h3 {
            font-size: 1.25rem;
          }

          .premium-content {
            font-size: 1rem;
          }

          .premium-content table {
            display: block;
            overflow-x: auto;
          }

          .premium-content th,
          .premium-content td {
            padding: 0.75rem;
            font-size: 0.875rem;
          }

          .premium-content .key-takeaways,
          .premium-content .info-box,
          .premium-content .success-box,
          .premium-content .warning-box {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

// Export sub-components for use in Astro
export function KeyTakeaways({
  children,
  title = "Key Takeaways",
}: {
  children: ReactNode;
  title?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="key-takeaways-card"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        ease: smoothEase,
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="takeaways-header">
        <h3>{title}</h3>
      </div>
      <div className="takeaways-content">{children}</div>

      <style>{`
        .key-takeaways-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          margin: 2rem 0;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
        }

        .takeaways-header {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 1rem 1.5rem;
        }

        .takeaways-header h3 {
          color: #ffffff;
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 1.125rem;
          margin: 0;
        }

        .takeaways-content {
          padding: 1.5rem;
        }

        .takeaways-content ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .takeaways-content li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          color: #475569;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .takeaways-content li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: 600;
        }

        .takeaways-content li strong {
          color: #0f172a;
          font-weight: 600;
        }

        .takeaways-content li:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </motion.div>
  );
}

