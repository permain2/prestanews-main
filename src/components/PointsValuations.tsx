import { motion } from "motion/react";
import { useState } from "react";

const programs = [
  { name: "Chase Ultimate Rewards", value: "2.05", logo: "/logos/chase.svg" },
  { name: "Bilt Rewards", value: "2.20", logo: "/logos/bilt.svg" },
  { name: "American Express Membership Rewards", value: "2.00", logo: "/logos/amex.svg" },
  { name: "Capital One Miles", value: "1.85", logo: "/logos/capital-one.svg" },
  { name: "Citi ThankYou Points", value: "1.70", logo: "/logos/citi.svg" },
  { name: "Wells Fargo Rewards", value: "1.50", logo: "/logos/wells-fargo.svg" },
];

export default function PointsValuations() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const next = () => {
    setStartIndex((prev) => (prev + 1) % programs.length);
  };

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + programs.length) % programs.length);
  };

  const getVisiblePrograms = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(programs[(startIndex + i) % programs.length]);
    }
    return visible;
  };

  return (
    <section className="valuations-section">
      <div className="valuations-container">
        <h2 className="valuations-title">We know what points are worth</h2>
        <p className="valuations-subtitle">
          Invest in the right programs with our unique points valuations — designed to help you maximize rewards.
        </p>

        <div className="valuations-carousel">
          <button className="carousel-btn prev" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="valuations-grid">
            {getVisiblePrograms().map((program, index) => (
              <motion.div
                key={`${program.name}-${startIndex}-${index}`}
                className="valuation-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span className="valuation-value">{program.value}¢</span>
                <span className="valuation-name">{program.name}</span>
                <div className="valuation-logo">
                  <ProgramLogo name={program.name} />
                </div>
              </motion.div>
            ))}
          </div>

          <button className="carousel-btn next" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <a href="/credit-cards" className="valuations-link">
          Go to our valuations →
        </a>
      </div>

      <style>{`
        .valuations-section {
          background: #F8F9FA;
          padding: 4rem 0;
        }

        .valuations-container {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }

        .valuations-title {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #0D2644;
          margin-bottom: 0.75rem;
          font-style: italic;
        }

        .valuations-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: #5A6670;
          max-width: 40rem;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .valuations-carousel {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
        }

        .carousel-btn {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: 1px solid #D1D5DB;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .carousel-btn:hover {
          border-color: #0D2644;
          background: #0D2644;
        }

        .carousel-btn:hover svg {
          stroke: white;
        }

        .carousel-btn svg {
          width: 1.25rem;
          height: 1.25rem;
          stroke: #5A6670;
        }

        .valuations-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          flex: 1;
          max-width: 56rem;
        }

        .valuation-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem 1rem;
        }

        .valuation-value {
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0D2644;
        }

        .valuation-name {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: #5A6670;
          text-align: center;
          line-height: 1.4;
        }

        .valuation-logo {
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .valuation-logo svg {
          width: 100%;
          height: 100%;
        }

        .valuations-link {
          display: inline-block;
          margin-top: 2rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #146AFF;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .valuations-link:hover {
          color: #0052CC;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .valuations-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .valuations-section {
            padding: 3rem 0;
          }

          .carousel-btn {
            display: none;
          }

          .valuation-value {
            font-size: 1.5rem;
          }

          .valuation-name {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}

function ProgramLogo({ name }: { name: string }) {
  if (name.includes("Chase")) {
    return (
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M32 8L8 24v16l24 16 24-16V24L32 8z" fill="#0D2644"/>
        <path d="M32 16l-16 10.67v10.66L32 48l16-10.67V26.67L32 16z" fill="white"/>
      </svg>
    );
  }
  if (name.includes("Bilt")) {
    return (
      <svg viewBox="0 0 64 64" fill="none">
        <rect x="12" y="16" width="10" height="32" fill="#0D2644"/>
        <rect x="27" y="16" width="10" height="32" fill="#0D2644"/>
        <rect x="42" y="16" width="10" height="32" fill="#0D2644"/>
        <rect x="12" y="16" width="40" height="8" fill="#0D2644"/>
      </svg>
    );
  }
  if (name.includes("American Express")) {
    return (
      <svg viewBox="0 0 64 64" fill="none">
        <rect x="8" y="20" width="48" height="24" rx="2" fill="#006FCF"/>
        <text x="32" y="36" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">AMEX</text>
      </svg>
    );
  }
  if (name.includes("Capital One")) {
    return (
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M8 32c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="#D03027" strokeWidth="6" fill="none"/>
        <path d="M16 36l12-8 12 8" stroke="#D03027" strokeWidth="4" fill="none"/>
      </svg>
    );
  }
  if (name.includes("Citi")) {
    return (
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M12 28h40v8H12z" fill="#003B70"/>
        <circle cx="32" cy="32" r="4" fill="#E31837"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="20" stroke="#0D2644" strokeWidth="2" fill="none"/>
      <text x="32" y="36" textAnchor="middle" fill="#0D2644" fontSize="12" fontWeight="bold">$</text>
    </svg>
  );
}

