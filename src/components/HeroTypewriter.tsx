"use client"

import { delay, wrap } from "motion"
import { Typewriter } from "motion-plus/react"
import { useState } from "react"

export default function HeroTypewriter({
  words = ["Financial", "Insurance", "Credit", "Investment", "Money"],
}: {
  words?: string[]
}) {
  const [index, setIndex] = useState(0)

  return (
    <div className="hero-typewriter-container">
      <h1 className="hero-typewriter-title">
        <span className="hero-static-text">Make Smarter</span>
        <span className="hero-dynamic-line">
          <Typewriter
            as="span"
            cursorStyle={cursorStyle}
            onComplete={() => {
              delay(() => setIndex(wrap(0, words.length, index + 1)), 1.5)
            }}
            textStyle={textStyle}
          >
            {words[index]}
          </Typewriter>
        </span>
        <span className="hero-static-text hero-decisions">Decisions</span>
      </h1>

      <style>{`
        .hero-typewriter-container {
          text-align: center;
          max-width: 48rem;
          margin: 0 auto;
        }

        .hero-typewriter-title {
          font-family: 'Lexend', sans-serif;
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          font-weight: 600;
          color: #162433;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .hero-static-text {
          display: block;
        }

        .hero-dynamic-line {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 1.2em;
          background: linear-gradient(135deg, #146aff 0%, #0D2C4B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-decisions {
          color: #162433;
        }

        @media (max-width: 768px) {
          .hero-typewriter-title {
            font-size: clamp(1.75rem, 6vw, 2.5rem);
          }
        }
      `}</style>
    </div>
  )
}

/**
 * ==============   Styles   ================
 */
const textStyle: React.CSSProperties = {
  fontSize: "inherit",
  fontWeight: 700,
  lineHeight: 1.15,
  fontFamily: "'Lexend', sans-serif",
}

const cursorStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #146aff 0%, #0D2C4B 100%)",
  width: 4,
  borderRadius: 2,
  marginLeft: 2,
}









