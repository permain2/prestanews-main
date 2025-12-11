import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export default function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 1.5,
  decimals = 0,
  className = ''
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000
  });

  const display = useTransform(spring, (latest) => {
    const num = decimals > 0 
      ? latest.toFixed(decimals) 
      : Math.round(latest).toLocaleString();
    return `${prefix}${num}${suffix}`;
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, spring, hasAnimated]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

// Compact version for inline use
export function AnimatedStat({
  value,
  label,
  prefix = '',
  suffix = '',
  color = '#0f172a'
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  color?: string;
}) {
  return (
    <div className="animated-stat">
      <AnimatedNumber 
        value={value} 
        prefix={prefix} 
        suffix={suffix}
        className="stat-value"
      />
      <span className="stat-label">{label}</span>
      
      <style>{`
        .animated-stat {
          text-align: center;
          padding: 1.5rem;
        }
        
        .stat-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: ${color};
          line-height: 1;
          margin-bottom: 0.5rem;
          font-variant-numeric: tabular-nums;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}
