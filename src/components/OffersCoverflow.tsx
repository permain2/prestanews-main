"use client"

import { Carousel, useTickerItem } from "motion-plus/react"
import { motion, useTransform } from "motion/react"

// Credit card offers data
const offers = [
  {
    id: 1,
    badge: "Best for Travel",
    name: "Chase Sapphire Preferred®",
    description: "Earn 75,000 bonus points after qualifying spend.",
    highlightNumber: "75,000",
    highlightLabel: "bonus points",
    image: "/credit-cards/cq5dam.web.767.767.png",
    link: "https://www.chase.com/personal/credit-cards/sapphire/sapphire-preferred?utm_source=prestanews&utm_medium=affiliate"
  },
  {
    id: 2,
    badge: "Best for Miles",
    name: "Capital One Venture X",
    description: "Earn 100,000 bonus miles with limited-time offer.",
    highlightNumber: "100,000",
    highlightLabel: "bonus miles",
    image: "/credit-cards/united_club_infinite_card.png",
    link: "https://www.capitalone.com/credit-cards/venture-x/?utm_source=prestanews&utm_medium=affiliate"
  },
  {
    id: 3,
    badge: "Best for Cash Back",
    name: "Citi Double Cash® Card",
    description: "Earn 2% cash back on every purchase, everywhere.",
    highlightNumber: "2%",
    highlightLabel: "unlimited cash back",
    image: "/credit-cards/Membership_Rewards_Card.avif",
    link: "https://www.citi.com/credit-cards/citi-double-cash-credit-card?utm_source=prestanews&utm_medium=affiliate"
  },
  {
    id: 4,
    badge: "Best for Business",
    name: "Amex Business Platinum",
    description: "Premium business travel rewards and perks.",
    highlightNumber: "150,000",
    highlightLabel: "bonus points",
    image: "/credit-cards/1684306443-green-credit-card-new.avif",
    link: "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/?utm_source=prestanews"
  },
  {
    id: 5,
    badge: "No Annual Fee",
    name: "Discover it® Cash Back",
    description: "5% cash back in rotating categories.",
    highlightNumber: "5%",
    highlightLabel: "rotating cash back",
    image: "/credit-cards/swa_prem_biz_cardart-1.png",
    link: "https://www.discover.com/credit-cards/cash-back/?utm_source=prestanews"
  },
  {
    id: 6,
    badge: "Best for Hotels",
    name: "IHG One Rewards Premier",
    description: "Earn up to 26x points at IHG hotels.",
    highlightNumber: "26x",
    highlightLabel: "points at IHG",
    image: "/credit-cards/ihg-card-hub-seo-card-img-business-usen-1500x980.avif",
    link: "https://www.ihg.com/onerewards/us/en/credit-cards?utm_source=prestanews"
  },
]

interface OfferCardProps {
  offer: typeof offers[0]
  index: number
}

function CoverflowCard({ offer, index }: OfferCardProps) {
  const { offset } = useTickerItem()

  const rotateY = useTransform(offset, [-300, 0, 300], [35, 0, -35])
  const scale = useTransform(offset, [-300, 0, 300], [0.75, 1, 0.75])
  const x = useTransform(
    offset,
    [-600, -200, 200, 600],
    ["80%", "0%", "0%", "-80%"]
  )
  const opacity = useTransform(offset, [-400, -200, 0, 200, 400], [0.5, 0.8, 1, 0.8, 0.5])
  const zIndex = useTransform(offset, (value) =>
    Math.max(0, Math.round(1000 - Math.abs(value)))
  )

  return (
    <motion.div
      className="coverflow-offer-card"
      style={{ transformPerspective: 800, x, rotateY, scale, opacity, zIndex }}
    >
      <div className="coverflow-badge">{offer.badge}</div>
      <div className="coverflow-card-image">
        <img src={offer.image} alt={offer.name} draggable={false} />
      </div>
      <div className="coverflow-card-content">
        <h3 className="coverflow-card-name">{offer.name}</h3>
        <p className="coverflow-card-description">{offer.description}</p>
        <div className="coverflow-highlight">
          <span className="coverflow-highlight-number">{offer.highlightNumber}</span>
          <span className="coverflow-highlight-label">{offer.highlightLabel}</span>
        </div>
        <a 
          href={offer.link} 
          className="coverflow-cta"
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Apply Now
        </a>
      </div>
    </motion.div>
  )
}

export default function OffersCoverflow() {
  const carouselItems = offers.map((offer, index) => (
    <CoverflowCard key={offer.id} offer={offer} index={index} />
  ))

  return (
    <div className="offers-coverflow-wrapper">
      <div className="offers-coverflow-mask">
        <Carousel
          className="offers-coverflow-carousel"
          items={carouselItems}
          overflow
          gap={20}
          safeMargin={300}
        />
      </div>
      
      <style>{`
        .offers-coverflow-wrapper {
          width: 100%;
          padding: 2rem 0;
        }

        .offers-coverflow-mask {
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          overflow: hidden;
        }

        .offers-coverflow-carousel {
          width: 100%;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coverflow-list-item {
          list-style: none;
        }

        .coverflow-offer-card {
          width: 320px;
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          will-change: transform, opacity;
          position: relative;
          cursor: grab;
        }

        .coverflow-offer-card:active {
          cursor: grabbing;
        }

        .coverflow-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: linear-gradient(135deg, #146aff 0%, #0040B1 100%);
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(20, 106, 255, 0.3);
        }

        .coverflow-card-image {
          width: 100%;
          height: 180px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .coverflow-card-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
        }

        .coverflow-card-content {
          padding: 1.5rem;
        }

        .coverflow-card-name {
          font-family: 'Lexend', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #162433;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .coverflow-card-description {
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          color: #68727C;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .coverflow-highlight {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .coverflow-highlight-number {
          font-family: 'Lexend', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, #0D2C4B 0%, #146aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .coverflow-highlight-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          color: #68727C;
        }

        .coverflow-cta {
          display: block;
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #146aff 0%, #0040B1 100%);
          color: white;
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(20, 106, 255, 0.25);
        }

        .coverflow-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(20, 106, 255, 0.35);
        }

        @media (max-width: 768px) {
          .offers-coverflow-carousel {
            height: 420px;
          }

          .coverflow-offer-card {
            width: 280px;
          }

          .coverflow-card-image {
            height: 150px;
          }

          .coverflow-highlight-number {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .offers-coverflow-carousel {
            height: 400px;
          }

          .coverflow-offer-card {
            width: 260px;
          }

          .coverflow-card-image {
            height: 130px;
          }

          .coverflow-card-content {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  )
}



