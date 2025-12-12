import { useState } from "react";

const programs = [
  { name: "Chase Ultimate Rewards", value: "2.05", logo: "chase" },
  { name: "Bilt Rewards", value: "2.20", logo: "bilt" },
  { name: "Amex Membership Rewards", value: "2.00", logo: "amex" },
  { name: "Capital One Miles", value: "1.85", logo: "capital-one" },
  { name: "Citi ThankYou Points", value: "1.70", logo: "citi" },
  { name: "Wells Fargo Rewards", value: "1.50", logo: "wells-fargo" },
];

export default function PointsValuations() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const next = () => setStartIndex((prev) => (prev + 1) % programs.length);
  const prev = () => setStartIndex((prev) => (prev - 1 + programs.length) % programs.length);

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
          <button className="carousel-btn" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="valuations-grid">
            {getVisiblePrograms().map((program, index) => (
              <div key={`${program.name}-${startIndex}-${index}`} className="valuation-card">
                <span className="valuation-value">{program.value}¢</span>
                <span className="valuation-name">{program.name}</span>
                <div className="valuation-logo">
                  <ProgramLogo name={program.logo} />
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-btn" onClick={next} aria-label="Next">
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
          background: #F7F8FA;
          padding: 4rem 0;
          border-bottom: 1px solid #E6E8EB;
        }

        .valuations-container {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }

        .valuations-title {
          font-family: 'Lexend', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 600;
          color: #0D2C4B;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .valuations-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9375rem;
          color: #68727C;
          max-width: 36rem;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .valuations-carousel {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          justify-content: center;
        }

        .carousel-btn {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: 1px solid #E6E8EB;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .carousel-btn:hover {
          border-color: #0D2C4B;
          background: #0D2C4B;
        }

        .carousel-btn:hover svg {
          stroke: white;
        }

        .carousel-btn svg {
          width: 1.25rem;
          height: 1.25rem;
          stroke: #68727C;
        }

        .valuations-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          flex: 1;
          max-width: 52rem;
        }

        .valuation-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          padding: 1rem;
        }

        .valuation-value {
          font-family: 'Lexend', sans-serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: #0D2C4B;
        }

        .valuation-name {
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          color: #68727C;
          text-align: center;
          line-height: 1.4;
        }

        .valuation-logo {
          width: 2.5rem;
          height: 2.5rem;
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
          font-size: 0.875rem;
          font-weight: 600;
          color: #146aff;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .valuations-link:hover {
          color: #0D2C4B;
        }

        @media (max-width: 768px) {
          .valuations-section {
            padding: 3rem 0;
          }

          .valuations-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .carousel-btn {
            display: none;
          }

          .valuation-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

function ProgramLogo({ name }: { name: string }) {
  const logos: Record<string, JSX.Element> = {
    chase: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 4L4 14v12l16 10 16-10V14L20 4z" fill="#0D2C4B"/>
        <path d="M20 10l-10 6.67v6.66L20 30l10-6.67v-6.66L20 10z" fill="white"/>
      </svg>
    ),
    bilt: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="8" y="10" width="6" height="20" fill="#0D2C4B"/>
        <rect x="17" y="10" width="6" height="20" fill="#0D2C4B"/>
        <rect x="26" y="10" width="6" height="20" fill="#0D2C4B"/>
        <rect x="8" y="10" width="24" height="5" fill="#0D2C4B"/>
      </svg>
    ),
    amex: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="4" y="12" width="32" height="16" rx="2" fill="#006FCF"/>
        <text x="20" y="23" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">AMEX</text>
      </svg>
    ),
    "capital-one": (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M4 20c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#D03027" strokeWidth="4" fill="none"/>
        <path d="M10 24l8-6 8 6" stroke="#D03027" strokeWidth="3" fill="none"/>
      </svg>
    ),
    citi: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M6 17h28v6H6z" fill="#003B70"/>
        <circle cx="20" cy="20" r="3" fill="#E31837"/>
      </svg>
    ),
    "wells-fargo": (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="8" y="14" width="24" height="12" rx="2" fill="#D71E28"/>
        <rect x="12" y="18" width="16" height="4" rx="1" fill="#FFCD41"/>
      </svg>
    ),
  };

  return logos[name] || (
    <svg viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke="#0D2C4B" strokeWidth="2" fill="none"/>
      <text x="20" y="24" textAnchor="middle" fill="#0D2C4B" fontSize="10" fontWeight="bold">$</text>
    </svg>
  );
}
