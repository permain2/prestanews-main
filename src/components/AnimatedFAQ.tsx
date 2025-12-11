"use client";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface AnimatedFAQProps {
  faqs: FAQ[];
}

// Premium spring configuration
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const smoothEase = [0.25, 0.46, 0.45, 0.94];

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="faq-item"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: smoothEase,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="faq-card"
        animate={{
          boxShadow: isHovered
            ? "0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(59, 130, 246, 0.1)"
            : "0 2px 12px -2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)",
          y: isHovered ? -4 : 0,
        }}
        transition={springTransition}
      >
        {/* Question Header */}
        <motion.button
          className="faq-question"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          whileTap={{ scale: 0.995 }}
        >
          <div className="question-content">
            {/* Number badge */}
            <motion.span
              className="question-number"
              animate={{
                backgroundColor: isOpen ? "#3b82f6" : isHovered ? "#dbeafe" : "#f1f5f9",
                color: isOpen ? "#ffffff" : isHovered ? "#1d4ed8" : "#64748b",
              }}
              transition={{ duration: 0.2 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
            
            <span className="question-text">{faq.question}</span>
          </div>

          {/* Animated icon */}
          <motion.div
            className="icon-container"
            animate={{
              backgroundColor: isOpen ? "#3b82f6" : isHovered ? "#eff6ff" : "transparent",
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="icon-wrapper"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={springTransition}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isOpen ? "#ffffff" : "#64748b"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.button>

        {/* Answer Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className="faq-answer-wrapper"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: smoothEase },
                opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 },
              }}
            >
              <motion.div
                className="faq-answer"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, ease: smoothEase }}
              >
                <div className="answer-line" />
                <p>{faq.answer}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function AnimatedFAQ({ faqs }: AnimatedFAQProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="faq-section" ref={containerRef}>
      {/* Section Header */}
      <motion.div
        className="faq-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: smoothEase }}
      >
        <motion.span
          className="section-label"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          Got Questions?
        </motion.span>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Everything you need to know about home warranty coverage
        </p>
      </motion.div>

      {/* FAQ List */}
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>

      <style>{`
        .faq-section {
          padding: 4rem 0;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .faq-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 3rem;
        }

        .section-label {
          display: inline-block;
          padding: 8px 20px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          color: #1d4ed8;
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          border-radius: 100px;
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .section-title {
          font-family: 'Sora', sans-serif;
          font-size: 2.25rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.75rem;
          line-height: 1.2;
        }

        @media (max-width: 640px) {
          .section-title {
            font-size: 1.75rem;
          }
        }

        .section-subtitle {
          color: #64748b;
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0 1rem;
        }

        .faq-item {
          width: 100%;
        }

        .faq-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .question-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }

        .question-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .question-text {
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: #0f172a;
          line-height: 1.4;
        }

        @media (max-width: 640px) {
          .question-text {
            font-size: 0.95rem;
          }
        }

        .icon-container {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .faq-answer-wrapper {
          overflow: hidden;
        }

        .faq-answer {
          position: relative;
          padding: 0 1.5rem 1.5rem 4.5rem;
        }

        @media (max-width: 640px) {
          .faq-answer {
            padding: 0 1.25rem 1.25rem 1.25rem;
          }
        }

        .answer-line {
          position: absolute;
          left: 2.625rem;
          top: 0;
          bottom: 1.5rem;
          width: 2px;
          background: linear-gradient(180deg, #3b82f6 0%, transparent 100%);
          border-radius: 1px;
        }

        @media (max-width: 640px) {
          .answer-line {
            display: none;
          }
        }

        .faq-answer p {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.8;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
