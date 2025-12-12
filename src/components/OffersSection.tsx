import { motion, useInView } from "motion/react";
import { useRef } from "react";

const offers = [
  {
    badge: "Best for Travel",
    name: "Chase Sapphire Preferred®",
    description: "Earn 75,000 bonus points after qualifying spend.",
    highlight: "75,000",
    highlightLabel: "bonus points",
    image: "/credit-cards/chase-sapphire-preferred.png",
    url: "https://www.chase.com/personal/credit-cards/sapphire/sapphire-preferred?utm_source=prestanews&utm_medium=affiliate"
  },
  {
    badge: "Best for Miles",
    name: "Capital One Venture X",
    description: "Earn 100,000 bonus miles with limited-time offer.",
    highlight: "100,000",
    highlightLabel: "bonus miles",
    image: "/credit-cards/capital-one-venture-x.png",
    url: "https://www.capitalone.com/credit-cards/venture-x/?utm_source=prestanews&utm_medium=affiliate"
  },
  {
    badge: "Best for Cash Back",
    name: "Citi Double Cash® Card",
    description: "Earn 2% cash back on every purchase, everywhere.",
    highlight: "2%",
    highlightLabel: "unlimited cash back",
    image: "/credit-cards/citi-double-cash.png",
    url: "https://www.citi.com/credit-cards/citi-double-cash-credit-card?utm_source=prestanews&utm_medium=affiliate"
  }
];

export default function OffersSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="offers-section" ref={containerRef}>
      <div className="offers-container">
        <motion.h2 
          className="offers-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Great offers from our partners
        </motion.h2>
        
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.name}
              className="offer-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className="offer-badge">{offer.badge}</div>
              <div className="offer-card-image">
                <motion.img 
                  src={offer.image} 
                  alt={offer.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="offer-content">
                <h3 className="offer-name">{offer.name}</h3>
                <p className="offer-description">{offer.description}</p>
                <div className="offer-highlight">
                  <span className="highlight-number">{offer.highlight}</span>
                  <span className="highlight-label">{offer.highlightLabel}</span>
                </div>
                <motion.a 
                  href={offer.url} 
                  className="offer-cta" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Now
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="offers-footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.a 
            href="/credit-cards" 
            className="see-all-btn"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#162433" }}
            whileTap={{ scale: 0.98 }}
          >
            See All Credit Cards →
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        .offers-section {
          background: linear-gradient(180deg, #0f1c28 0%, #162433 50%, #1a2c3d 100%);
          padding: 4rem 0;
          position: relative;
          overflow: hidden;
        }

        .offers-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20, 106, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 100%, rgba(41, 131, 107, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(20, 106, 255, 0.06) 0%, transparent 50%);
        }

        .offers-container {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 1;
        }

        .offers-title {
          font-family: 'Lexend', sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 600;
          color: white;
          text-align: center;
          margin-bottom: 2.5rem;
          letter-spacing: -0.02em;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .offer-card {
          background: white;
          border-radius: 1.25rem;
          overflow: hidden;
          position: relative;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 10px 15px -3px rgba(0, 0, 0, 0.15),
            0 20px 40px -10px rgba(0, 0, 0, 0.2);
          will-change: transform;
        }

        .offer-badge {
          position: absolute;
          top: 0.875rem;
          left: 0.875rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #0D2C4B;
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0.4rem 0.875rem;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          z-index: 2;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .offer-card-image {
          aspect-ratio: 16/10;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
        }

        .offer-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .offer-content {
          padding: 1.5rem;
          background: white;
        }

        .offer-name {
          font-family: 'Lexend', sans-serif;
          font-size: 1.125rem;
          font-weight: 600;
          color: #162433;
          margin-bottom: 0.375rem;
          letter-spacing: -0.01em;
        }

        .offer-description {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: #68727C;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .offer-highlight {
          display: flex;
          align-items: baseline;
          gap: 0.375rem;
          margin-bottom: 1.25rem;
        }

        .highlight-number {
          font-family: 'Lexend', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #0D2C4B 0%, #146aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .highlight-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: #68727C;
        }

        .offer-cta {
          display: block;
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #146aff 0%, #0052cc 100%);
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          border-radius: 0.625rem;
          box-shadow: 0 4px 12px rgba(20, 106, 255, 0.25);
        }

        .offers-footer {
          text-align: center;
          margin-top: 2.5rem;
        }

        .see-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1024px) {
          .offers-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .offers-section {
            padding: 3rem 0;
          }

          .offers-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            max-width: 20rem;
            margin: 0 auto;
          }

          .offer-card {
            border-radius: 1rem;
          }

          .offer-content {
            padding: 1.25rem;
          }

          .offer-name {
            font-size: 1rem;
          }

          .highlight-number {
            font-size: 1.5rem;
          }

          .offer-cta {
            padding: 0.75rem;
            font-size: 0.8125rem;
          }

          .offers-title {
            font-size: 1.5rem;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </section>
  );
}

