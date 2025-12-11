"use client";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useState, useRef } from "react";
import ComparisonProviderCard from "./ComparisonProviderCard";

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

interface ComparisonShowcaseProps {
  providers: Provider[];
  title?: string;
  showFilters?: boolean;
  category?: string;
}

// Premium spring configuration
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const smoothEase = [0.25, 0.46, 0.45, 0.94];

// Minimal inline summary - Apple style
function QuickSummary({ providers }: { providers: Provider[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const avgRating = (providers.reduce((sum, p) => sum + p.rating, 0) / providers.length).toFixed(1);
  const topProvider = providers[0]?.name || "";

  return (
    <motion.div
      ref={ref}
      className="quick-summary"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: smoothEase }}
    >
      <p className="summary-text">
        <span className="summary-count">{providers.length} providers</span> compared · 
        <span className="summary-highlight"> {topProvider}</span> ranked #1 · 
        <span className="summary-rating">{avgRating}</span> avg rating
      </p>

      <style>{`
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
      `}</style>
    </motion.div>
  );
}

// Minimal sort options - Apple style
function SortOptions({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  const filters = [
    { id: "all", label: "Our Pick" },
    { id: "rating", label: "Rating" },
    { id: "price", label: "Price" },
  ];

  return (
    <div className="sort-container">
      <span className="sort-label">Sort by</span>
      <div className="sort-options">
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            className={`sort-option ${activeFilter === filter.id ? "active" : ""}`}
            onClick={() => onFilterChange(filter.id)}
            whileTap={{ scale: 0.97 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}

export default function ComparisonShowcase({
  providers,
  title,
  showFilters = true,
  category,
}: ComparisonShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Sort providers based on filter
  const sortedProviders = [...providers].sort((a, b) => {
    switch (activeFilter) {
      case "rating":
        return b.rating - a.rating;
      case "price":
        // Extract lowest price from string like "$35-$49"
        const getLowestPrice = (str: string) => {
          const match = str.match(/\$(\d+)/);
          return match ? parseInt(match[1]) : 0;
        };
        return getLowestPrice(a.monthlyAvg) - getLowestPrice(b.monthlyAvg);
      case "service":
        // Sort by service fee (lowest first)
        const getServiceFee = (fee?: string) => {
          if (!fee) return 999;
          const match = fee.match(/\$(\d+)/);
          return match ? parseInt(match[1]) : 999;
        };
        return getServiceFee(a.serviceFee) - getServiceFee(b.serviceFee);
      default:
        return 0; // Keep original order
    }
  });

  return (
    <section className="comparison-showcase" ref={containerRef}>
      <div className="showcase-container">
        {/* No header - cleaner look */}

        {/* Quick Summary */}
        <QuickSummary providers={providers} />

        {/* Sort Options */}
        {showFilters && (
          <SortOptions activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        )}

        {/* Provider Cards */}
        <div className="providers-list">
          <AnimatePresence mode="popLayout">
            {sortedProviders.map((provider, index) => (
              <motion.div
                key={provider.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: smoothEase,
                }}
              >
                <ComparisonProviderCard
                  provider={provider}
                  index={index}
                  rank={
                    activeFilter === "all"
                      ? index + 1
                      : providers.indexOf(provider) + 1
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </section>
  );
}
