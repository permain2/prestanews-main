const offers = [
  {
    badge: "BEST FOR BEGINNER TRAVELERS",
    badgeStyle: "default",
    name: "Chase Sapphire Preferred® Card",
    image: "/credit-cards/chase-sapphire-preferred.png",
    bonus: "75,000 bonus points",
    url: "https://www.chase.com/personal/credit-cards/sapphire/sapphire-preferred",
    expert: { name: "Sarah Chen", title: "Editor-in-Chief", image: "/team/sarah-chen.jpg" },
    whyLike: "Valuable rewards, a low annual fee and wide-ranging travel protections"
  },
  {
    badge: "LIMITED-TIME OFFER",
    badgeStyle: "highlight",
    name: "Capital One Venture X Rewards Credit Card",
    image: "/credit-cards/capital-one-venture-x.png",
    bonus: "Earn 100,000 bonus miles",
    url: "https://www.capitalone.com/credit-cards/venture-x/",
    expert: { name: "Michael Rodriguez", title: "Senior Credit Card Analyst", image: "/team/michael-rodriguez.jpg" },
    whyLike: "Solid earning rates, extensive travel protections and terrific airport lounge access"
  },
  {
    badge: "LIMITED-TIME OFFER",
    badgeStyle: "highlight",
    name: "Capital One Venture X Business",
    image: "/credit-cards/capital-one-venture-x.png",
    bonus: "Earn up to 400K bonus miles",
    url: "https://www.capitalone.com/small-business/credit-cards/venture-x-business/",
    expert: { name: "Emily Johnson", title: "Insurance Editor", image: "/team/emily-johnson.jpg" },
    whyLike: "Unlimited access to Capital One's awesome airport lounges"
  },
  {
    badge: "$2500+ IN ANNUAL VALUE",
    badgeStyle: "premium",
    name: "Chase Sapphire Reserve for Business℠",
    image: "/credit-cards/chase-sapphire-preferred.png",
    bonus: "Earn 200,000 bonus points",
    url: "https://www.chase.com/business/credit-cards/ink-business-preferred",
    expert: { name: "Sarah Chen", title: "Editor-in-Chief", image: "/team/sarah-chen.jpg" },
    whyLike: "Unlock more than $2,500 in travel and business credits each year"
  }
];

export default function OffersSection() {
  return (
    <section className="offers-section">
      <div className="offers-container">
        <h2 className="offers-title">Great offers from our partners</h2>
        <p className="offers-subtitle">Top credit card deals handpicked by our expert team</p>
        
        <div className="offers-grid">
          {offers.map((offer) => (
            <div key={offer.name} className={`offer-card ${offer.badgeStyle === 'highlight' || offer.badgeStyle === 'premium' ? 'highlighted' : ''}`}>
              {(offer.badgeStyle === 'highlight' || offer.badgeStyle === 'premium') && (
                <div className={`card-highlight-bar ${offer.badgeStyle}`}>
                  {offer.badgeStyle === 'highlight' ? 'LIMITED-TIME OFFER' : '$2500+ IN ANNUAL VALUE'}
                </div>
              )}
              
              <div className="card-inner">
                <span className={`offer-badge ${offer.badgeStyle}`}>{offer.badge}</span>
                
                <div className="card-header">
                  <div className="card-image">
                    <img src={offer.image} alt={offer.name} />
                  </div>
                  <h3 className="card-name">{offer.name}</h3>
                </div>

                <div className="card-cta-row">
                  <a href={offer.url} className="apply-btn" target="_blank" rel="noopener noreferrer">
                    Apply now
                  </a>
                  <span className="bonus-text">{offer.bonus}</span>
                </div>

                <div className="card-terms">
                  <span>Terms Apply</span>
                  <a href={offer.url} target="_blank" rel="noopener noreferrer">See rates & fees</a>
                </div>

                <div className="card-divider"></div>

                <div className="expert-section">
                  <span className="section-label">HOW WE'D USE THESE POINTS</span>
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
                  <span className="section-label">WHY YOU'LL LIKE IT</span>
                  <p className="why-text">{offer.whyLike}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Bar - Matching footer style */}
      <div className="newsletter-bar">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h3 className="newsletter-title">Get notified about limited-time offers</h3>
            <p className="newsletter-text">We'll email you when bonus offers are <strong>up to 65% higher</strong> than usual</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className="newsletter-input" required />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </div>

      <style>{`
        .offers-section {
          background: #0D2C4B;
          padding: 4rem 0 0;
        }

        .offers-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }

        .offers-title {
          font-family: 'Lexend', sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 600;
          color: white;
          text-align: center;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .offers-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin-bottom: 2.5rem;
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
        }

        .offer-card.highlighted {
          box-shadow: 0 0 0 2px #146aff;
        }

        .card-highlight-bar {
          background: #146aff;
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 600;
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
          font-size: 0.5625rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #0D2C4B;
          margin-bottom: 0.875rem;
        }

        .offer-badge.highlight {
          color: #146aff;
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
          width: 4rem;
          height: 2.5rem;
          border-radius: 0.25rem;
          overflow: hidden;
          flex-shrink: 0;
          background: #f5f5f5;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-name {
          font-family: 'Lexend', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0D2C4B;
          line-height: 1.3;
        }

        .card-cta-row {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 0.625rem;
        }

        .apply-btn {
          background: linear-gradient(135deg, #146aff 0%, #0040B1 100%);
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.5rem 0.875rem;
          border-radius: 0.375rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .apply-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(20, 106, 255, 0.3);
        }

        .bonus-text {
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          color: #0D2C4B;
          font-weight: 500;
        }

        .card-terms {
          display: flex;
          gap: 0.75rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          color: #68727C;
          margin-bottom: 1rem;
        }

        .card-terms a {
          color: #146aff;
          text-decoration: none;
        }

        .card-terms a:hover {
          text-decoration: underline;
        }

        .card-divider {
          height: 1px;
          background: #E6E8EB;
          margin: 1rem 0;
        }

        .expert-section {
          margin-bottom: 1rem;
        }

        .section-label {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.5625rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #68727C;
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
          gap: 0.5rem;
        }

        .expert-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          object-fit: cover;
        }

        .expert-name {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #0D2C4B;
        }

        .expert-title {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          color: #68727C;
        }

        .expand-btn {
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          border: 1px solid #E6E8EB;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .expand-btn:hover {
          border-color: #146aff;
        }

        .expand-btn svg {
          width: 1rem;
          height: 1rem;
          stroke: #146aff;
        }

        .why-text {
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          color: #68727C;
          line-height: 1.5;
          margin: 0;
        }

        /* Newsletter Bar - Screened branded */
        .newsletter-bar {
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 0;
        }

        .newsletter-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .newsletter-content {
          flex: 1;
        }

        .newsletter-title {
          font-family: 'Lexend', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin: 0 0 0.25rem;
        }

        .newsletter-text {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .newsletter-text strong {
          color: #FFD93D;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .newsletter-input {
          width: 12rem;
          padding: 0.625rem 0.875rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 0.375rem;
          background: rgba(255, 255, 255, 0.08);
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          transition: all 0.2s ease;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #146aff;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(20, 106, 255, 0.2);
        }

        .newsletter-btn {
          padding: 0.625rem 1.25rem;
          background: linear-gradient(135deg, #146aff 0%, #0040B1 100%);
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .newsletter-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(20, 106, 255, 0.4);
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
            max-width: 22rem;
            margin: 0 auto;
          }

          .newsletter-container {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .newsletter-form {
            width: 100%;
            max-width: 20rem;
          }

          .newsletter-input {
            flex: 1;
            width: auto;
          }
        }
      `}</style>
    </section>
  );
}
