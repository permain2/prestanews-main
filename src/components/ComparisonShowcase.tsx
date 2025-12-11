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

// Quick stats summary component
function QuickStats({ providers }: { providers: Provider[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    {
      label: "Providers Reviewed",
      value: providers.length.toString(),
      icon: "📊",
    },
    {
      label: "Top Rated",
      value: providers[0]?.name.split(" ")[0] || "—",
      icon: "🏆",
    },
    {
      label: "Best Value",
      value:
        providers.find((p) => p.bestFor.toLowerCase().includes("budget"))?.name.split(" ")[0] ||
        providers[2]?.name.split(" ")[0] ||
        "—",
      icon: "💰",
    },
    {
      label: "Avg Rating",
      value: (providers.reduce((sum, p) => sum + p.rating, 0) / providers.length).toFixed(1),
      icon: "⭐",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="quick-stats"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: smoothEase }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: index * 0.1,
            ...springTransition,
          }}
          whileHover={{
            y: -4,
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
          }}
        >
          <span className="stat-icon">{stat.icon}</span>
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </motion.div>
      ))}

      <style>{`
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 768px) {
          .quick-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .quick-stats {
            grid-template-columns: 1fr;
          }
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.25rem;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }

        .stat-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 1.125rem;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
    </motion.div>
  );
}

// Sort/Filter pills component
function FilterPills({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  const filters = [
    { id: "all", label: "All Providers" },
    { id: "rating", label: "Highest Rated" },
    { id: "price", label: "Lowest Price" },
    { id: "service", label: "Best Service" },
  ];

  return (
    <div className="filter-pills-container">
      <div className="filter-pills">
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            className={`filter-pill ${activeFilter === filter.id ? "active" : ""}`}
            onClick={() => onFilterChange(filter.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
          >
            {filter.label}
            {activeFilter === filter.id && (
              <motion.div
                className="pill-indicator"
                layoutId="pill-indicator"
                transition={springTransition}
              />
            )}
          </motion.button>
        ))}
      </div>

      <style>{`
        .filter-pills-container {
          position: sticky;
          top: 64px;
          z-index: 40;
          background: linear-gradient(180deg, #f8fafc 0%, #f8fafc 80%, transparent 100%);
          padding: 1rem 0 1.5rem;
          margin-bottom: 1rem;
        }

        .filter-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-pill {
          position: relative;
          padding: 10px 20px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 100px;
          font-family: 'Lexend', sans-serif;
          font-weight: 500;
          font-size: 0.875rem;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .filter-pill:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .filter-pill.active {
          background: #0f172a;
          border-color: #0f172a;
          color: #ffffff;
        }

        .pill-indicator {
          position: absolute;
          inset: 0;
          background: #0f172a;
          border-radius: 100px;
          z-index: -1;
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
        {/* Section Header */}
        {title && (
          <motion.div
            className="showcase-header"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: smoothEase }}
          >
            <span className="header-label">Compare & Choose</span>
            <h2 className="header-title">{title}</h2>
          </motion.div>
        )}

        {/* Quick Stats */}
        <QuickStats providers={providers} />

        {/* Filter Pills */}
        {showFilters && (
          <FilterPills activeFilter={activeFilter} onFilterChange={setActiveFilter} />
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
          padding: 2rem 0 4rem;
          background: #f8fafc;
        }

        .showcase-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header-label {
          display: inline-block;
          padding: 6px 16px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          color: #1d4ed8;
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          border-radius: 100px;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .header-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .providers-list {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 640px) {
          .showcase-container {
            padding: 0 1rem;
          }

          .header-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
