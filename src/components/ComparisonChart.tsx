import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComparisonItem {
  name: string;
  value: number;
  color?: string;
  logo?: string;
}

interface ComparisonChartProps {
  title: string;
  items: ComparisonItem[];
  unit?: string;
  prefix?: string;
  suffix?: string;
  maxValue?: number;
  sortDescending?: boolean;
}

export default function ComparisonChart({
  title,
  items,
  unit = '',
  prefix = '',
  suffix = '',
  maxValue,
  sortDescending = true
}: ComparisonChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const sortedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => 
      sortDescending ? b.value - a.value : a.value - b.value
    );
    return sorted;
  }, [items, sortDescending]);

  const max = maxValue || Math.max(...items.map(i => i.value)) * 1.1;

  const defaultColors = [
    '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', 
    '#ef4444', '#06b6d4', '#ec4899', '#84cc16'
  ];

  return (
    <div className="comparison-chart">
      <h3 className="chart-title">{title}</h3>
      
      <div className="chart-container">
        {sortedItems.map((item, index) => {
          const percentage = (item.value / max) * 100;
          const color = item.color || defaultColors[index % defaultColors.length];
          const isHovered = hoveredIndex === index;
          
          return (
            <motion.div
              key={item.name}
              className="chart-row"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
            >
              <div className="row-label">
                {item.logo && (
                  <img src={item.logo} alt={item.name} className="row-logo" />
                )}
                <span className="row-name">{item.name}</span>
              </div>
              
              <div className="row-bar-container">
                <motion.div
                  className="row-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1 + 0.2,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 50,
                    damping: 20
                  }}
                  style={{ 
                    backgroundColor: color,
                    boxShadow: isHovered ? `0 4px 20px ${color}40` : 'none'
                  }}
                />
                
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="row-tooltip"
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      style={{ borderColor: color }}
                    >
                      <strong>{item.name}</strong>
                      <span>{prefix}{item.value.toLocaleString()}{suffix} {unit}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="row-value">
                {prefix}{item.value.toLocaleString()}{suffix}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <style>{`
        .comparison-chart {
          background: #ffffff;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 
            0 0 0 1px rgba(0, 0, 0, 0.03),
            0 2px 4px rgba(0, 0, 0, 0.02),
            0 12px 24px rgba(0, 0, 0, 0.06);
        }
        
        .chart-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 1.5rem;
          letter-spacing: -0.01em;
        }
        
        .chart-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .chart-row {
          display: grid;
          grid-template-columns: 140px 1fr 80px;
          gap: 1rem;
          align-items: center;
          cursor: default;
        }
        
        .row-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .row-logo {
          width: 28px;
          height: 28px;
          object-fit: contain;
          border-radius: 6px;
        }
        
        .row-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #334155;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .row-bar-container {
          position: relative;
          height: 32px;
          background: #f1f5f9;
          border-radius: 8px;
          overflow: visible;
        }
        
        .row-bar {
          height: 100%;
          border-radius: 8px;
          transition: box-shadow 0.2s ease;
        }
        
        .row-tooltip {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border-left: 3px solid;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          white-space: nowrap;
          z-index: 10;
        }
        
        .row-tooltip strong {
          font-size: 0.8125rem;
          color: #0f172a;
        }
        
        .row-tooltip span {
          font-size: 0.75rem;
          color: #64748b;
        }
        
        .row-value {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0f172a;
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        
        @media (max-width: 640px) {
          .chart-row {
            grid-template-columns: 100px 1fr 60px;
          }
          
          .row-name {
            font-size: 0.75rem;
          }
          
          .row-value {
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </div>
  );
}

// Rating comparison variant
export function RatingComparisonChart({
  title,
  items
}: {
  title: string;
  items: { name: string; rating: number; logo?: string }[];
}) {
  return (
    <ComparisonChart
      title={title}
      items={items.map(item => ({
        name: item.name,
        value: item.rating,
        logo: item.logo,
        color: item.rating >= 4.5 ? '#10b981' : item.rating >= 4 ? '#3b82f6' : '#f59e0b'
      }))}
      maxValue={5}
      suffix="/5"
    />
  );
}

// Price comparison variant  
export function PriceComparisonChart({
  title,
  items,
  perMonth = true
}: {
  title: string;
  items: { name: string; price: number; logo?: string }[];
  perMonth?: boolean;
}) {
  return (
    <ComparisonChart
      title={title}
      items={items.map(item => ({
        name: item.name,
        value: item.price,
        logo: item.logo
      }))}
      prefix="$"
      suffix={perMonth ? '/mo' : ''}
      sortDescending={false}
    />
  );
}

