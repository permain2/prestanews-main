const offers = [
  {
    badge: "BEST FOR BEGINNER TRAVELERS",
    badgeStyle: "default",
    name: "Chase Sapphire Preferred® Card",
    image: "/credit-cards/chase-sapphire-preferred.png",
    bonus: "75,000 bonus points",
    url: "https://www.chase.com/personal/credit-cards/sapphire/sapphire-preferred",
    expert: {
      name: "Sarah Chen",
      title: "Editor-in-Chief",
      image: "/team/sarah-chen.jpg"
    },
    whyLike: "Valuable rewards, a low annual fee and wide-ranging travel protections"
  },
  {
    badge: "LIMITED-TIME OFFER",
    badgeStyle: "highlight",
    name: "Capital One Venture X Rewards Credit Card",
    image: "/credit-cards/capital-one-venture-x.png",
    bonus: "Earn 100,000 bonus miles",
    url: "https://www.capitalone.com/credit-cards/venture-x/",
    expert: {
      name: "Michael Rodriguez",
      title: "Senior Credit Card Analyst",
      image: "/team/michael-rodriguez.jpg"
    },
    whyLike: "Solid earning rates, extensive travel protections and terrific airport lounge access"
  },
  {
    badge: "LIMITED-TIME OFFER",
    badgeStyle: "highlight",
    name: "Capital One Venture X Business",
    image: "/credit-cards/capital-one-venture-x.png",
    bonus: "Earn up to 400K bonus miles",
    url: "https://www.capitalone.com/small-business/credit-cards/venture-x-business/",
    expert: {
      name: "Emily Johnson",
      title: "Insurance Editor",
      image: "/team/emily-johnson.jpg"
    },
    whyLike: "Unlimited access to Capital One's awesome airport lounges"
  },
  {
    badge: "$2500+ IN ANNUAL VALUE",
    badgeStyle: "premium",
    name: "Chase Sapphire Reserve for Business℠",
    image: "/credit-cards/chase-sapphire-preferred.png",
    bonus: "Earn 200,000 bonus points",
    url: "https://www.chase.com/business/credit-cards/ink-business-preferred",
    expert: {
      name: "Sarah Chen",
      title: "Editor-in-Chief",
      image: "/team/sarah-chen.jpg"
    },
    whyLike: "Unlock more than $2,500 in travel and business credits each year"
  }
];

export default function OffersSection() {
  return (
    <section className="offers-section">
      <div className="offers-container">
        <h2 className="offers-title">
          Great offers from partners<br />
          <span>that reward every day</span>
        </h2>
        
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <div key={offer.name} className={`offer-card ${offer.badgeStyle === 'highlight' ? 'highlighted' : ''}`}>
              {offer.badgeStyle === 'highlight' && <div className="card-highlight-bar">LIMITED-TIME OFFER</div>}
              {offer.badgeStyle === 'premium' && <div className="card-highlight-bar premium">$2500+ IN ANNUAL VALUE</div>}
              
              <div className="card-inner">
                <span className={`offer-badge ${offer.badgeStyle}`}>{offer.badge}</span>
                
                <div className="card-header">
                  <div className="card-image">
                    <img src={offer.image} alt={offer.name} />
                  </div>
                  <div className="card-info">
                    <h3 className="card-name">{offer.name}</h3>
                  </div>
                </div>

                <div className="card-cta-row">
                  <a href={offer.url} className="apply-btn" target="_blank" rel="noopener noreferrer">
                    Apply now
                  </a>
                  <span className="bonus-text">{offer.bonus} <span className="info-icon">ⓘ</span></span>
                </div>

                <div className="card-terms">
                  <span>Terms Apply</span>
                  <a href={offer.url} target="_blank" rel="noopener noreferrer">See rates & fees</a>
                </div>

                <div className="card-divider"></div>

                <div className="expert-section">
                  <span className="expert-label">HOW WE'D USE THESE POINTS</span>
                  <div className="expert-row">
                    <div className="expert-info">
                      <img src={offer.expert.image} alt={offer.expert.name} className="expert-avatar" />
                      <div>
                        <span className="expert-name">{offer.expert.name}</span>
                        <span className="expert-title">{offer.expert.title}</span>
                      </div>
                    </div>
                    <button className="expand-btn" aria-label="Expand">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v8M8 12h8" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="why-section">
                  <span className="why-label">WHY YOU'LL LIKE IT</span>
                  <p className="why-text">{offer.whyLike}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Bar */}
      <div className="newsletter-bar">
        <div className="newsletter-container">
          <div className="newsletter-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="4" y="8" width="40" height="32" rx="4" fill="#FFD93D"/>
              <rect x="8" y="12" width="32" height="24" rx="2" fill="#4ECDC4"/>
              <path d="M8 14l16 10 16-10" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <p className="newsletter-text">
            We'll notify you about limited-time offers <strong>up to 65% higher</strong> than usual
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email address" className="newsletter-input" />
            <button type="submit" className="newsletter-btn">
              Notify me
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .offers-section {
          background: linear-gradient(180deg, #0D2644 0%, #1A3A5C 100%);
          padding: 4rem 0 0;
        }

        .offers-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }

        .offers-title {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: white;
          text-align: center;
          margin-bottom: 3rem;
          line-height: 1.2;
          font-style: italic;
        }

        .offers-title span {
          display: block;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          align-items: start;
        }

        .offer-card {
          background: white;
          border-radius: 0.75rem;
          overflow: hidden;
          position: relative;
        }

        .offer-card.highlighted {
          box-shadow: 0 0 0 2px #4ECDC4;
        }

        .card-highlight-bar {
          background: linear-gradient(90deg, #0D4D4D 0%, #1A6B6B 100%);
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-align: center;
          padding: 0.5rem;
        }

        .card-highlight-bar.premium {
          background: linear-gradient(90deg, #B8860B 0%, #DAA520 100%);
        }

        .card-inner {
          padding: 1.25rem;
        }

        .offer-badge {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #0D2644;
          margin-bottom: 1rem;
        }

        .offer-badge.highlight {
          color: #0D4D4D;
        }

        .offer-badge.premium {
          color: #B8860B;
        }

        .card-header {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .card-image {
          width: 4.5rem;
          height: 3rem;
          border-radius: 0.375rem;
          overflow: hidden;
          flex-shrink: 0;
          background: linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 100%);
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-name {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0D2644;
          line-height: 1.3;
        }

        .card-cta-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .apply-btn {
          background: #0D4D4D;
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .apply-btn:hover {
          background: #0A3D3D;
        }

        .bonus-text {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: #0D2644;
          font-weight: 500;
        }

        .info-icon {
          color: #9CA3AF;
          font-size: 0.75rem;
        }

        .card-terms {
          display: flex;
          gap: 1rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.6875rem;
          color: #6B7280;
          margin-bottom: 1rem;
        }

        .card-terms a {
          color: #0D4D4D;
          text-decoration: none;
        }

        .card-terms a:hover {
          text-decoration: underline;
        }

        .card-divider {
          height: 1px;
          background: #E5E7EB;
          margin: 1rem 0;
        }

        .expert-section {
          margin-bottom: 1rem;
        }

        .expert-label, .why-label {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #6B7280;
          margin-bottom: 0.5rem;
        }

        .expert-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .expert-info {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .expert-avatar {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          object-fit: cover;
        }

        .expert-name {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #0D2644;
        }

        .expert-title {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.6875rem;
          color: #6B7280;
        }

        .expand-btn {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 1px solid #E5E7EB;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .expand-btn:hover {
          border-color: #0D4D4D;
        }

        .expand-btn svg {
          width: 1.25rem;
          height: 1.25rem;
          stroke: #0D4D4D;
        }

        .why-text {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: #4B5563;
          line-height: 1.5;
          margin: 0;
        }

        /* Newsletter Bar */
        .newsletter-bar {
          background: #1F2937;
          padding: 1.5rem 0;
        }

        .newsletter-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .newsletter-icon {
          width: 3rem;
          height: 3rem;
          flex-shrink: 0;
        }

        .newsletter-icon svg {
          width: 100%;
          height: 100%;
        }

        .newsletter-text {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9375rem;
          color: white;
          margin: 0;
          flex: 1;
        }

        .newsletter-text strong {
          color: #FFD93D;
        }

        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .newsletter-input {
          width: 14rem;
          padding: 0.75rem 1rem;
          border: 1px solid #374151;
          border-radius: 0.5rem;
          background: #111827;
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
        }

        .newsletter-input::placeholder {
          color: #6B7280;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #4ECDC4;
        }

        .newsletter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: #4ECDC4;
          color: #0D2644;
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .newsletter-btn:hover {
          background: #3DBDB5;
        }

        .newsletter-btn svg {
          width: 1rem;
          height: 1rem;
        }

        @media (max-width: 1024px) {
          .offers-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .offers-section {
            padding: 3rem 0 0;
          }

          .offers-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            max-width: 24rem;
            margin: 0 auto;
          }

          .newsletter-container {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .newsletter-form {
            flex-direction: column;
            width: 100%;
          }

          .newsletter-input {
            width: 100%;
          }

          .newsletter-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
