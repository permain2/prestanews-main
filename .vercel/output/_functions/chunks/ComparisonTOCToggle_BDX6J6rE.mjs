import { jsxs, jsx } from 'react/jsx-runtime';
import { useInView, motion, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30
};
const smoothEase = [0.25, 0.46, 0.45, 0.94];
function FAQItem({ faq, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      className: "faq-item",
      initial: { opacity: 0, y: 40 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: {
        duration: 0.6,
        delay: index * 0.08,
        ease: smoothEase
      },
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "faq-card",
          animate: {
            boxShadow: isHovered ? "0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(59, 130, 246, 0.1)" : "0 2px 12px -2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)",
            y: isHovered ? -4 : 0
          },
          transition: springTransition,
          children: [
            /* @__PURE__ */ jsxs(
              motion.button,
              {
                className: "faq-question",
                onClick: () => setIsOpen(!isOpen),
                "aria-expanded": isOpen,
                whileTap: { scale: 0.995 },
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "question-content", children: [
                    /* @__PURE__ */ jsx(
                      motion.span,
                      {
                        className: "question-number",
                        animate: {
                          backgroundColor: isOpen ? "#3b82f6" : isHovered ? "#dbeafe" : "#f1f5f9",
                          color: isOpen ? "#ffffff" : isHovered ? "#1d4ed8" : "#64748b"
                        },
                        transition: { duration: 0.2 },
                        children: String(index + 1).padStart(2, "0")
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "question-text", children: faq.question })
                  ] }),
                  /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      className: "icon-container",
                      animate: {
                        backgroundColor: isOpen ? "#3b82f6" : isHovered ? "#eff6ff" : "transparent"
                      },
                      transition: { duration: 0.2 },
                      children: /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          className: "icon-wrapper",
                          animate: { rotate: isOpen ? 180 : 0 },
                          transition: springTransition,
                          children: /* @__PURE__ */ jsx(
                            "svg",
                            {
                              width: "20",
                              height: "20",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: isOpen ? "#ffffff" : "#64748b",
                              strokeWidth: "2.5",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              children: /* @__PURE__ */ jsx("path", { d: "M6 9l6 6 6-6" })
                            }
                          )
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "faq-answer-wrapper",
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: {
                  height: { duration: 0.4, ease: smoothEase },
                  opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 }
                },
                children: /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    className: "faq-answer",
                    initial: { y: -10 },
                    animate: { y: 0 },
                    transition: { duration: 0.3, ease: smoothEase },
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "answer-line" }),
                      /* @__PURE__ */ jsx("p", { children: faq.answer })
                    ]
                  }
                )
              }
            ) })
          ]
        }
      )
    }
  );
}
function AnimatedFAQ({ faqs }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxs("section", { className: "faq-section", ref: containerRef, children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "faq-header",
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, ease: smoothEase },
        children: [
          /* @__PURE__ */ jsx(
            motion.span,
            {
              className: "section-label",
              initial: { opacity: 0, scale: 0.9 },
              animate: isInView ? { opacity: 1, scale: 1 } : {},
              transition: { delay: 0.1 },
              children: "Got Questions?"
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "section-title", children: "Frequently Asked Questions" }),
          /* @__PURE__ */ jsx("p", { className: "section-subtitle", children: "Everything you need to know about home warranty coverage" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "faq-list", children: faqs.map((faq, index) => /* @__PURE__ */ jsx(FAQItem, { faq, index }, index)) }),
    /* @__PURE__ */ jsx("style", { children: `
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
      ` })
  ] });
}

const defaultItems = [
  { id: "providers", label: "Top Picks", href: "#providers" },
  { id: "guide", label: "Buying Guide", href: "#guide" },
  { id: "compare", label: "Compare", href: "#compare" },
  { id: "methodology", label: "Methodology", href: "#methodology" },
  { id: "faq", label: "FAQ", href: "#faq" }
];
function ToggleItem({
  item,
  isSelected,
  onClick
}) {
  return /* @__PURE__ */ jsxs(
    motion.a,
    {
      href: item.href,
      onClick: (e) => {
        e.preventDefault();
        onClick();
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      },
      initial: { scale: 1 },
      whileTap: { scale: 0.95 },
      className: "comparison-toggle-item",
      children: [
        /* @__PURE__ */ jsx("span", { children: item.label }),
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isSelected && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "comparison-selected-indicator",
            layoutId: "comparison-toc-indicator"
          }
        ) })
      ]
    }
  );
}
function ComparisonTOCToggle({ items, category }) {
  const tocItems = items || defaultItems;
  const [activeSection, setActiveSection] = useState(tocItems[0]?.id || "providers");
  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter((s) => s.element);
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);
  return /* @__PURE__ */ jsxs("nav", { className: "comparison-toc-container", role: "navigation", "aria-label": "Page sections", children: [
    /* @__PURE__ */ jsx("div", { className: "comparison-toc-group", children: tocItems.map((item) => /* @__PURE__ */ jsx(
      ToggleItem,
      {
        item,
        isSelected: activeSection === item.id,
        onClick: () => setActiveSection(item.id)
      },
      item.id
    )) }),
    /* @__PURE__ */ jsx("style", { children: `
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
            ` })
  ] });
}

export { AnimatedFAQ as A, ComparisonTOCToggle as C };
