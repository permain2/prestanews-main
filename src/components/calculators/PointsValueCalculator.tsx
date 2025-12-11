import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PointsProgram {
  name: string;
  value: number; // cents per point
  transferPartners?: string[];
}

const pointsPrograms: Record<string, PointsProgram> = {
  'chase-ur': {
    name: 'Chase Ultimate Rewards',
    value: 1.25, // via Chase Travel portal with Sapphire Preferred
    transferPartners: ['United', 'Southwest', 'Hyatt', 'Marriott', 'IHG', 'British Airways', 'Air France']
  },
  'chase-ur-reserve': {
    name: 'Chase UR (Reserve)',
    value: 1.5, // via Chase Travel portal with Sapphire Reserve
    transferPartners: ['United', 'Southwest', 'Hyatt', 'Marriott', 'IHG', 'British Airways', 'Air France']
  },
  'amex-mr': {
    name: 'Amex Membership Rewards',
    value: 1.0,
    transferPartners: ['Delta', 'Hilton', 'Marriott', 'British Airways', 'ANA', 'Singapore']
  },
  'capital-one': {
    name: 'Capital One Miles',
    value: 1.0,
    transferPartners: ['Air Canada', 'British Airways', 'Emirates', 'Qantas', 'Turkish']
  },
  'citi-ty': {
    name: 'Citi ThankYou',
    value: 1.0,
    transferPartners: ['Air France', 'Emirates', 'JetBlue', 'Singapore', 'Turkish', 'Virgin Atlantic']
  },
  'hyatt': {
    name: 'World of Hyatt',
    value: 1.7,
    transferPartners: []
  },
  'marriott': {
    name: 'Marriott Bonvoy',
    value: 0.7,
    transferPartners: ['40+ airline partners']
  },
  'hilton': {
    name: 'Hilton Honors',
    value: 0.5,
    transferPartners: ['10+ airline partners']
  },
  'delta': {
    name: 'Delta SkyMiles',
    value: 1.1,
    transferPartners: []
  },
  'united': {
    name: 'United MileagePlus',
    value: 1.2,
    transferPartners: []
  },
  'southwest': {
    name: 'Southwest Rapid Rewards',
    value: 1.4,
    transferPartners: []
  },
  'american': {
    name: 'AAdvantage',
    value: 1.3,
    transferPartners: []
  }
};

export default function PointsValueCalculator() {
  const [selectedProgram, setSelectedProgram] = useState('chase-ur');
  const [pointsAmount, setPointsAmount] = useState(50000);
  const [customValue, setCustomValue] = useState<number | null>(null);

  const program = pointsPrograms[selectedProgram];
  const valuePerPoint = customValue ?? program.value;
  
  const calculations = useMemo(() => {
    const cashValue = (pointsAmount * valuePerPoint) / 100;
    const transferValue = (pointsAmount * (valuePerPoint * 1.5)) / 100; // Estimate 50% more with transfers
    
    return {
      cashValue,
      transferValue,
      perThousand: (1000 * valuePerPoint) / 100
    };
  }, [pointsAmount, valuePerPoint]);

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <div className="calculator-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="2"/>
            <line x1="8" y1="6" x2="16" y2="6"/>
            <line x1="8" y1="10" x2="16" y2="10"/>
            <line x1="8" y1="14" x2="12" y2="14"/>
            <line x1="8" y1="18" x2="10" y2="18"/>
          </svg>
        </div>
        <div>
          <h3>Points Value Calculator</h3>
          <p>Calculate the real dollar value of your credit card points</p>
        </div>
      </div>

      <div className="calculator-body">
        <div className="input-group">
          <label>Select Points Program</label>
          <select 
            value={selectedProgram}
            onChange={(e) => {
              setSelectedProgram(e.target.value);
              setCustomValue(null);
            }}
          >
            <optgroup label="Bank Points">
              <option value="chase-ur">Chase Ultimate Rewards (Preferred)</option>
              <option value="chase-ur-reserve">Chase Ultimate Rewards (Reserve)</option>
              <option value="amex-mr">Amex Membership Rewards</option>
              <option value="capital-one">Capital One Miles</option>
              <option value="citi-ty">Citi ThankYou Points</option>
            </optgroup>
            <optgroup label="Hotel Programs">
              <option value="hyatt">World of Hyatt</option>
              <option value="marriott">Marriott Bonvoy</option>
              <option value="hilton">Hilton Honors</option>
            </optgroup>
            <optgroup label="Airline Programs">
              <option value="delta">Delta SkyMiles</option>
              <option value="united">United MileagePlus</option>
              <option value="southwest">Southwest Rapid Rewards</option>
              <option value="american">AAdvantage Miles</option>
            </optgroup>
          </select>
        </div>

        <div className="input-group">
          <label>Number of Points/Miles</label>
          <input
            type="number"
            value={pointsAmount}
            onChange={(e) => setPointsAmount(Math.max(0, parseInt(e.target.value) || 0))}
            min="0"
            step="1000"
          />
          <div className="quick-amounts">
            {[25000, 50000, 75000, 100000].map(amount => (
              <button
                key={amount}
                onClick={() => setPointsAmount(amount)}
                className={pointsAmount === amount ? 'active' : ''}
              >
                {(amount / 1000)}K
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>
            Point Value (¢ per point)
            <span className="label-hint">Average: {program.value}¢</span>
          </label>
          <input
            type="number"
            value={customValue ?? program.value}
            onChange={(e) => setCustomValue(parseFloat(e.target.value) || program.value)}
            min="0.1"
            max="5"
            step="0.1"
          />
          <button 
            className="reset-btn"
            onClick={() => setCustomValue(null)}
          >
            Reset to average
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={`${pointsAmount}-${valuePerPoint}`}
            className="results-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="result-card primary">
              <span className="result-label">Estimated Cash Value</span>
              <span className="result-value">${calculations.cashValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className="result-sub">at {valuePerPoint}¢ per point</span>
            </div>

            {program.transferPartners && program.transferPartners.length > 0 && (
              <div className="result-card secondary">
                <span className="result-label">Potential Transfer Value</span>
                <span className="result-value">${calculations.transferValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className="result-sub">with optimal transfer partner redemption</span>
              </div>
            )}

            <div className="value-breakdown">
              <div className="breakdown-item">
                <span>Per 1,000 points</span>
                <strong>${calculations.perThousand.toFixed(2)}</strong>
              </div>
              <div className="breakdown-item">
                <span>Points program</span>
                <strong>{program.name}</strong>
              </div>
            </div>

            {program.transferPartners && program.transferPartners.length > 0 && (
              <div className="transfer-partners">
                <span className="partners-label">Transfer Partners:</span>
                <div className="partners-list">
                  {program.transferPartners.slice(0, 6).map(partner => (
                    <span key={partner} className="partner-tag">{partner}</span>
                  ))}
                  {program.transferPartners.length > 6 && (
                    <span className="partner-tag more">+{program.transferPartners.length - 6} more</span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="calculator-footer">
        <p>
          <strong>Note:</strong> Point values vary based on redemption method. Transfer to airline/hotel partners often yields higher value than cash back or travel portal redemptions.
        </p>
      </div>

      <style>{`
        .calculator-container {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .calculator-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #0D2C4B 0%, #1a4a7a 100%);
          color: white;
        }

        .calculator-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .calculator-header h3 {
          margin: 0 0 0.25rem;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .calculator-header p {
          margin: 0;
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .calculator-body {
          padding: 1.5rem;
        }

        .input-group {
          margin-bottom: 1.25rem;
        }

        .input-group label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .label-hint {
          font-weight: 400;
          color: #6b7280;
        }

        .input-group select,
        .input-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.2s;
          background: white;
        }

        .input-group select:focus,
        .input-group input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .quick-amounts {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .quick-amounts button {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
          cursor: pointer;
          transition: all 0.2s;
        }

        .quick-amounts button:hover {
          background: #f3f4f6;
        }

        .quick-amounts button.active {
          background: #0D2C4B;
          border-color: #0D2C4B;
          color: white;
        }

        .reset-btn {
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          background: #f3f4f6;
          border-radius: 8px;
          font-size: 0.8rem;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .reset-btn:hover {
          background: #e5e7eb;
          color: #374151;
        }

        .results-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .result-card {
          padding: 1.25rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          text-align: center;
        }

        .result-card.primary {
          background: linear-gradient(135deg, #0D2C4B 0%, #1a4a7a 100%);
          color: white;
        }

        .result-card.secondary {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          color: white;
        }

        .result-label {
          display: block;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .result-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .result-sub {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .value-breakdown {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }

        .breakdown-item {
          padding: 1rem;
          background: #f8fafc;
          border-radius: 10px;
          text-align: center;
        }

        .breakdown-item span {
          display: block;
          font-size: 0.75rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .breakdown-item strong {
          font-size: 0.95rem;
          color: #162433;
        }

        .transfer-partners {
          margin-top: 1rem;
          padding: 1rem;
          background: #f0f9ff;
          border-radius: 10px;
          border: 1px solid #bae6fd;
        }

        .partners-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #0369a1;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .partners-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .partner-tag {
          padding: 0.25rem 0.75rem;
          background: white;
          border: 1px solid #e0f2fe;
          border-radius: 100px;
          font-size: 0.75rem;
          color: #0284c7;
        }

        .partner-tag.more {
          background: #0284c7;
          border-color: #0284c7;
          color: white;
        }

        .calculator-footer {
          padding: 1rem 1.5rem;
          background: #f8fafc;
          border-top: 1px solid #e5e7eb;
        }

        .calculator-footer p {
          margin: 0;
          font-size: 0.8rem;
          color: #6b7280;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .calculator-header {
            flex-direction: column;
            text-align: center;
          }

          .result-value {
            font-size: 2rem;
          }

          .value-breakdown {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
