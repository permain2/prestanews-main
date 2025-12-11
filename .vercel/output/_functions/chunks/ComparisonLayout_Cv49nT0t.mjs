import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, f as renderSlot } from './astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from './MainLayout_BztIZ2OU.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useInView, motion, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { C as ComparisonTOCToggle, A as AnimatedFAQ } from './ComparisonTOCToggle_BDX6J6rE.mjs';
import { S as SignupNotifications } from './SignupNotifications_DqYVWS6a.mjs';
import { $ as $$ArticleSchema, a as $$BreadcrumbSchema } from './BreadcrumbSchema_mXbPXXif.mjs';
import { $ as $$FAQSchema } from './FAQSchema_DuLtzo96.mjs';
import { $ as $$AggregateRatingSchema } from './AggregateRatingSchema_DYiKuBkP.mjs';
/* empty css                                               */

const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30
};
const smoothEase$1 = [0.25, 0.46, 0.45, 0.94];
function ComparisonProviderCard({
  provider,
  index,
  rank
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fullStars = Math.floor(provider.rating);
  const hasHalfStar = provider.rating % 1 >= 0.5;
  return /* @__PURE__ */ jsxs(
    motion.article,
    {
      ref,
      className: "comparison-card",
      initial: { opacity: 0, y: 20 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        ease: smoothEase$1
      },
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "comparison-card-inner",
            animate: {
              boxShadow: isHovered ? "0 8px 30px rgba(0, 0, 0, 0.08)" : "0 1px 3px rgba(0, 0, 0, 0.04)"
            },
            transition: { duration: 0.2 },
            children: [
              /* @__PURE__ */ jsx("div", { className: "rank-indicator", children: /* @__PURE__ */ jsx("span", { className: "rank-number", children: rank }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-layout", children: [
                /* @__PURE__ */ jsxs("div", { className: "card-left-panel", children: [
                  /* @__PURE__ */ jsx("div", { className: "logo-container", children: /* @__PURE__ */ jsx("div", { className: "logo-wrapper", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: provider.logo,
                      alt: `${provider.name} logo`,
                      className: "provider-logo",
                      onLoad: () => setImageLoaded(true),
                      style: { opacity: imageLoaded ? 1 : 0 }
                    }
                  ) }) }),
                  /* @__PURE__ */ jsxs(
                    motion.a,
                    {
                      href: provider.affiliateUrl || "#",
                      className: "cta-button",
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      transition: springTransition,
                      children: [
                        /* @__PURE__ */ jsx("span", { children: "Get Quote" }),
                        /* @__PURE__ */ jsx(
                          motion.svg,
                          {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2.5",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            animate: { x: isHovered ? 4 : 0 },
                            transition: springTransition,
                            children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M12 5l7 7-7 7" })
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("p", { className: "cta-subtext", children: [
                    provider.name,
                    "'s site"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card-right-panel", children: [
                  /* @__PURE__ */ jsxs("div", { className: "card-header", children: [
                    /* @__PURE__ */ jsxs("div", { className: "header-left", children: [
                      /* @__PURE__ */ jsxs("span", { className: "best-for-badge", children: [
                        "Best for ",
                        provider.bestFor
                      ] }),
                      /* @__PURE__ */ jsx("h3", { className: "provider-name", children: provider.name })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "rating-container", children: [
                      /* @__PURE__ */ jsx("div", { className: "stars-row", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: `star ${i < fullStars ? "filled" : i === fullStars && hasHalfStar ? "half" : ""}`,
                          viewBox: "0 0 20 20",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
                              fill: "currentColor"
                            }
                          )
                        },
                        i
                      )) }),
                      /* @__PURE__ */ jsx("span", { className: "rating-number", children: provider.rating })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "stats-row", children: [
                    /* @__PURE__ */ jsxs("div", { className: "stat-item", children: [
                      /* @__PURE__ */ jsx("span", { className: "stat-label", children: "Monthly" }),
                      /* @__PURE__ */ jsx("span", { className: "stat-value", children: provider.monthlyAvg })
                    ] }),
                    provider.serviceFee && /* @__PURE__ */ jsxs("div", { className: "stat-item", children: [
                      /* @__PURE__ */ jsx("span", { className: "stat-label", children: "Service Fee" }),
                      /* @__PURE__ */ jsx("span", { className: "stat-value", children: provider.serviceFee })
                    ] }),
                    provider.amBest && /* @__PURE__ */ jsxs("div", { className: "stat-item stat-badge", children: [
                      /* @__PURE__ */ jsx("span", { className: "stat-label", children: "AM Best" }),
                      /* @__PURE__ */ jsx("span", { className: "stat-value badge-value", children: provider.amBest })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "provider-description", children: provider.description }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      className: "verdict-toggle",
                      onClick: () => setIsExpanded(!isExpanded),
                      children: [
                        /* @__PURE__ */ jsx("span", { children: isExpanded ? "Hide details" : "Show details" }),
                        /* @__PURE__ */ jsx(
                          motion.svg,
                          {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            animate: { rotate: isExpanded ? 180 : 0 },
                            transition: { duration: 0.2 },
                            children: /* @__PURE__ */ jsx("path", { d: "M6 9l6 6 6-6" })
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isExpanded && /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      className: "verdict-content",
                      initial: { height: 0, opacity: 0 },
                      animate: { height: "auto", opacity: 1 },
                      exit: { height: 0, opacity: 0 },
                      transition: {
                        height: { duration: 0.4, ease: smoothEase$1 },
                        opacity: { duration: 0.25 }
                      },
                      children: /* @__PURE__ */ jsx("div", { className: "verdict-inner", children: /* @__PURE__ */ jsxs("div", { className: "verdict-grid", children: [
                        /* @__PURE__ */ jsxs("div", { className: "verdict-column pros", children: [
                          /* @__PURE__ */ jsx("div", { className: "verdict-header", children: /* @__PURE__ */ jsx("span", { children: "Pros" }) }),
                          /* @__PURE__ */ jsx("ul", { className: "verdict-list", children: provider.pros.map((pro, i) => /* @__PURE__ */ jsxs("li", { children: [
                            /* @__PURE__ */ jsx("span", { className: "list-bullet pros-bullet" }),
                            pro
                          ] }, i)) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "verdict-column cons", children: [
                          /* @__PURE__ */ jsx("div", { className: "verdict-header", children: /* @__PURE__ */ jsx("span", { children: "Cons" }) }),
                          /* @__PURE__ */ jsx("ul", { className: "verdict-list", children: provider.cons.map((con, i) => /* @__PURE__ */ jsxs("li", { children: [
                            /* @__PURE__ */ jsx("span", { className: "list-bullet cons-bullet" }),
                            con
                          ] }, i)) })
                        ] })
                      ] }) })
                    }
                  ) })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("style", { children: `
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
      ` })
      ]
    }
  );
}

const smoothEase = [0.25, 0.46, 0.45, 0.94];
function QuickSummary({ providers }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const avgRating = (providers.reduce((sum, p) => sum + p.rating, 0) / providers.length).toFixed(1);
  const topProvider = providers[0]?.name || "";
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      className: "quick-summary",
      initial: { opacity: 0 },
      animate: isInView ? { opacity: 1 } : {},
      transition: { duration: 0.5, ease: smoothEase },
      children: [
        /* @__PURE__ */ jsxs("p", { className: "summary-text", children: [
          /* @__PURE__ */ jsxs("span", { className: "summary-count", children: [
            providers.length,
            " providers"
          ] }),
          " compared ·",
          /* @__PURE__ */ jsxs("span", { className: "summary-highlight", children: [
            " ",
            topProvider
          ] }),
          " ranked #1 ·",
          /* @__PURE__ */ jsx("span", { className: "summary-rating", children: avgRating }),
          " avg rating"
        ] }),
        /* @__PURE__ */ jsx("style", { children: `
        .quick-summary {
          text-align: center;
          padding: 1rem 0 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 1.5rem;
        }

        .summary-text {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .summary-count {
          font-weight: 600;
          color: #0f172a;
        }

        .summary-highlight {
          font-weight: 600;
          color: #0f172a;
        }

        .summary-rating {
          font-weight: 600;
          color: #0f172a;
        }
      ` })
      ]
    }
  );
}
function SortOptions({
  activeFilter,
  onFilterChange
}) {
  const filters = [
    { id: "all", label: "Our Pick" },
    { id: "rating", label: "Rating" },
    { id: "price", label: "Price" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "sort-container", children: [
    /* @__PURE__ */ jsx("span", { className: "sort-label", children: "Sort by" }),
    /* @__PURE__ */ jsx("div", { className: "sort-options", children: filters.map((filter) => /* @__PURE__ */ jsx(
      motion.button,
      {
        className: `sort-option ${activeFilter === filter.id ? "active" : ""}`,
        onClick: () => onFilterChange(filter.id),
        whileTap: { scale: 0.97 },
        children: filter.label
      },
      filter.id
    )) }),
    /* @__PURE__ */ jsx("style", { children: `
        .sort-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .sort-label {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sort-options {
          display: flex;
          background: #f1f5f9;
          border-radius: 8px;
          padding: 3px;
        }

        .sort-option {
          padding: 8px 16px;
          background: transparent;
          border: none;
          border-radius: 6px;
          font-family: inherit;
          font-weight: 500;
          font-size: 0.85rem;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sort-option:hover {
          color: #0f172a;
        }

        .sort-option.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
      ` })
  ] });
}
function ComparisonShowcase({
  providers,
  title,
  showFilters = true,
  category
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const containerRef = useRef(null);
  useInView(containerRef, { once: true, margin: "-100px" });
  const sortedProviders = [...providers].sort((a, b) => {
    switch (activeFilter) {
      case "rating":
        return b.rating - a.rating;
      case "price":
        const getLowestPrice = (str) => {
          const match = str.match(/\$(\d+)/);
          return match ? parseInt(match[1]) : 0;
        };
        return getLowestPrice(a.monthlyAvg) - getLowestPrice(b.monthlyAvg);
      case "service":
        const getServiceFee = (fee) => {
          if (!fee) return 999;
          const match = fee.match(/\$(\d+)/);
          return match ? parseInt(match[1]) : 999;
        };
        return getServiceFee(a.serviceFee) - getServiceFee(b.serviceFee);
      default:
        return 0;
    }
  });
  return /* @__PURE__ */ jsxs("section", { className: "comparison-showcase", ref: containerRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "showcase-container", children: [
      /* @__PURE__ */ jsx(QuickSummary, { providers }),
      showFilters && /* @__PURE__ */ jsx(SortOptions, { activeFilter, onFilterChange: setActiveFilter }),
      /* @__PURE__ */ jsx("div", { className: "providers-list", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: sortedProviders.map((provider, index) => /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: true,
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          transition: {
            duration: 0.4,
            delay: index * 0.05,
            ease: smoothEase
          },
          children: /* @__PURE__ */ jsx(
            ComparisonProviderCard,
            {
              provider,
              index,
              rank: activeFilter === "all" ? index + 1 : providers.indexOf(provider) + 1
            }
          )
        },
        provider.name
      )) }) })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        .comparison-showcase {
          padding: 0 0 4rem;
          background: #f8fafc;
        }

        .showcase-container {
          max-width: 880px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .providers-list {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 640px) {
          .showcase-container {
            padding: 0 1rem;
          }
        }
      ` })
  ] });
}

function PremiumContentSection({
  children
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxs("section", { className: "premium-content-section", ref: containerRef, children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "content-container",
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { duration: 0.5 },
        children: /* @__PURE__ */ jsx("div", { className: "premium-content", children })
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
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
      ` })
  ] });
}

const $$Astro = createAstro("https://www.screened.com");
const $$ComparisonLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ComparisonLayout;
  const {
    title,
    description,
    category,
    categoryLabel,
    heroImage,
    author = "Screened Editorial Team",
    date = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    providers,
    faqs = [],
    researchIntro,
    tocItems
  } = Astro2.props;
  const currentUrl = Astro2.url.pathname;
  const avgRating = providers.length > 0 ? providers.reduce((sum, p) => sum + p.rating, 0) / providers.length : 4.5;
  const breadcrumbItems = [
    { name: category, url: `/${category.toLowerCase()}` },
    { name: title }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description, "data-astro-cid-qpockwpf": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "ArticleSchema", $$ArticleSchema, { "title": title, "description": description, "url": currentUrl, "image": heroImage, "datePublished": /* @__PURE__ */ new Date(), "dateModified": /* @__PURE__ */ new Date(), "author": author, "section": category, "tags": [category.toLowerCase(), "comparison", "reviews"], "data-astro-cid-qpockwpf": true })} ${faqs.length > 0 && renderTemplate`${renderComponent($$result2, "FAQSchema", $$FAQSchema, { "faqs": faqs, "data-astro-cid-qpockwpf": true })}`}${renderComponent($$result2, "AggregateRatingSchema", $$AggregateRatingSchema, { "itemName": title, "itemType": "Article", "rating": avgRating, "reviewCount": providers.length * 47, "url": currentUrl, "image": heroImage, "description": description, "data-astro-cid-qpockwpf": true })} ${renderComponent($$result2, "BreadcrumbSchema", $$BreadcrumbSchema, { "items": breadcrumbItems, "data-astro-cid-qpockwpf": true })}  ${maybeRenderHead()}<section class="premium-hero" data-astro-cid-qpockwpf> <div class="hero-background" data-astro-cid-qpockwpf> <img${addAttribute(heroImage, "src")}${addAttribute(title, "alt")} class="hero-image" loading="eager" data-astro-cid-qpockwpf> <div class="hero-overlay" data-astro-cid-qpockwpf></div> <div class="hero-gradient-bottom" data-astro-cid-qpockwpf></div> </div> <div class="hero-content" data-astro-cid-qpockwpf> <div class="hero-container" data-astro-cid-qpockwpf> <span class="hero-label" data-astro-cid-qpockwpf>${categoryLabel}</span> <h1 class="hero-title" data-astro-cid-qpockwpf>${title}</h1> <p class="hero-description" data-astro-cid-qpockwpf>${description}</p> <div class="hero-meta" data-astro-cid-qpockwpf> <div class="meta-author" data-astro-cid-qpockwpf> <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-qpockwpf> <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-qpockwpf></path> <circle cx="12" cy="7" r="4" data-astro-cid-qpockwpf></circle> </svg> <span data-astro-cid-qpockwpf>${author}</span> </div> <span class="meta-divider" data-astro-cid-qpockwpf>•</span> <div class="meta-date" data-astro-cid-qpockwpf> <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-qpockwpf> <rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-astro-cid-qpockwpf></rect> <line x1="16" y1="2" x2="16" y2="6" stroke-linecap="round" data-astro-cid-qpockwpf></line> <line x1="8" y1="2" x2="8" y2="6" stroke-linecap="round" data-astro-cid-qpockwpf></line> <line x1="3" y1="10" x2="21" y2="10" data-astro-cid-qpockwpf></line> </svg> <span data-astro-cid-qpockwpf>Updated ${date}</span> </div> </div> <!-- Scroll indicator --> <div class="scroll-indicator" data-astro-cid-qpockwpf> <span data-astro-cid-qpockwpf>Scroll to explore</span> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-qpockwpf> <path d="M12 5v14M19 12l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-qpockwpf></path> </svg> </div> </div> </div> </section>  ${renderComponent($$result2, "SignupNotifications", SignupNotifications, { "client:load": true, "initialDelay": 5e3, "interval": 12e4, "displayDuration": 6e3, "showInitialBatch": 1, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/SignupNotifications.tsx", "client:component-export": "default", "data-astro-cid-qpockwpf": true })}  <section class="disclosure-section" data-astro-cid-qpockwpf> <div class="disclosure-container" data-astro-cid-qpockwpf> <p class="disclosure-text" data-astro-cid-qpockwpf> <svg class="disclosure-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-qpockwpf> <circle cx="12" cy="12" r="10" data-astro-cid-qpockwpf></circle> <line x1="12" y1="16" x2="12" y2="12" stroke-linecap="round" data-astro-cid-qpockwpf></line> <line x1="12" y1="8" x2="12.01" y2="8" stroke-linecap="round" data-astro-cid-qpockwpf></line> </svg>
We may receive compensation when you click on links to products. Our analysis, reviews, and opinions are entirely from our editorial team. <a href="/advertising" data-astro-cid-qpockwpf>Learn more</a> </p> </div> </section>  <section class="toc-section sticky top-16 z-40" data-astro-cid-qpockwpf> <div class="toc-container" data-astro-cid-qpockwpf> ${renderComponent($$result2, "ComparisonTOCToggle", ComparisonTOCToggle, { "items": tocItems, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/ComparisonTOCToggle.tsx", "client:component-export": "default", "data-astro-cid-qpockwpf": true })} </div> </section>  ${researchIntro && renderTemplate`<section id="providers" class="research-intro-section" data-astro-cid-qpockwpf> <div class="research-intro-container" data-astro-cid-qpockwpf> <p class="research-intro-text" data-astro-cid-qpockwpf>${researchIntro}</p> </div> </section>`} <div${addAttribute(researchIntro ? "" : "providers", "id")} data-astro-cid-qpockwpf> ${renderComponent($$result2, "ComparisonShowcase", ComparisonShowcase, { "providers": providers, "showFilters": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/ComparisonShowcase.tsx", "client:component-export": "default", "data-astro-cid-qpockwpf": true })} </div>  <div id="guide" data-astro-cid-qpockwpf> ${renderComponent($$result2, "PremiumContentSection", PremiumContentSection, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/PremiumContentSection.tsx", "client:component-export": "default", "data-astro-cid-qpockwpf": true }, { "default": ($$result3) => renderTemplate` ${renderSlot($$result3, $$slots["default"])} ` })} </div>  ${faqs.length > 0 && renderTemplate`<div id="faq" data-astro-cid-qpockwpf> ${renderComponent($$result2, "AnimatedFAQ", AnimatedFAQ, { "faqs": faqs, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/AnimatedFAQ.tsx", "client:component-export": "default", "data-astro-cid-qpockwpf": true })} </div>`}  ` })}`;
}, "/Users/permain2/affiliatewebsite/src/layouts/ComparisonLayout.astro", void 0);

export { $$ComparisonLayout as $ };
