import { useState } from 'react';

const rateData = {
  mortgage: {
    '760+': 6.5,
    '700-759': 6.8,
    '660-699': 7.2,
    '620-659': 7.8,
    'below620': 8.5,
  },
  auto: {
    '760+': 5.5,
    '700-759': 7.0,
    '660-699': 9.0,
    '620-659': 12.0,
    'below620': 15.0,
  },
};

const scoreRanges = [
  { value: '760+', label: '760+ (Excellent)', color: '#22c55e' },
  { value: '700-759', label: '700-759 (Very Good)', color: '#84cc16' },
  { value: '660-699', label: '660-699 (Good)', color: '#eab308' },
  { value: '620-659', label: '620-659 (Fair)', color: '#f97316' },
  { value: 'below620', label: 'Below 620 (Poor)', color: '#ef4444' },
];

export default function CreditScoreCalculator() {
  const [loanType, setLoanType] = useState<'mortgage' | 'auto'>('mortgage');
  const [loanAmount, setLoanAmount] = useState(300000);
  const [currentScore, setCurrentScore] = useState('660-699');
  const [targetScore, setTargetScore] = useState('760+');
  const [loanTerm, setLoanTerm] = useState(30);

  const calculateMonthlyPayment = (principal: number, annualRate: number, years: number) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const rates = rateData[loanType];
  const currentRate = rates[currentScore as keyof typeof rates];
  const targetRate = rates[targetScore as keyof typeof rates];

  const currentMonthly = calculateMonthlyPayment(loanAmount, currentRate, loanTerm);
  const targetMonthly = calculateMonthlyPayment(loanAmount, targetRate, loanTerm);
  
  const monthlySavings = currentMonthly - targetMonthly;
  const totalSavings = monthlySavings * loanTerm * 12;

  const getCurrentScoreColor = () => scoreRanges.find(s => s.value === currentScore)?.color || '#666';
  const getTargetScoreColor = () => scoreRanges.find(s => s.value === targetScore)?.color || '#666';

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h3>💰 Credit Score Savings Calculator</h3>
        <p>See how much you could save with a better credit score</p>
      </div>

      <div className="calculator-inputs">
        <div className="input-group">
          <label>Loan Type</label>
          <div className="toggle-buttons">
            <button 
              className={loanType === 'mortgage' ? 'active' : ''}
              onClick={() => { setLoanType('mortgage'); setLoanTerm(30); }}
            >
              🏠 Mortgage
            </button>
            <button 
              className={loanType === 'auto' ? 'active' : ''}
              onClick={() => { setLoanType('auto'); setLoanTerm(5); }}
            >
              🚗 Auto Loan
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Loan Amount</label>
          <div className="input-with-prefix">
            <span>$</span>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              min={1000}
              max={2000000}
            />
          </div>
          <input
            type="range"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            min={loanType === 'mortgage' ? 50000 : 5000}
            max={loanType === 'mortgage' ? 1000000 : 100000}
            step={loanType === 'mortgage' ? 10000 : 1000}
          />
        </div>

        <div className="input-group">
          <label>Loan Term</label>
          <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
            {loanType === 'mortgage' ? (
              <>
                <option value={15}>15 years</option>
                <option value={30}>30 years</option>
              </>
            ) : (
              <>
                <option value={3}>3 years</option>
                <option value={4}>4 years</option>
                <option value={5}>5 years</option>
                <option value={6}>6 years</option>
              </>
            )}
          </select>
        </div>

        <div className="score-selectors">
          <div className="input-group">
            <label>Your Current Score</label>
            <select 
              value={currentScore} 
              onChange={(e) => setCurrentScore(e.target.value)}
              style={{ borderColor: getCurrentScoreColor() }}
            >
              {scoreRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          <div className="arrow">→</div>

          <div className="input-group">
            <label>Target Score</label>
            <select 
              value={targetScore} 
              onChange={(e) => setTargetScore(e.target.value)}
              style={{ borderColor: getTargetScoreColor() }}
            >
              {scoreRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="calculator-results">
        <div className="comparison">
          <div className="result-card current">
            <span className="label">Current Rate</span>
            <span className="rate">{currentRate}%</span>
            <span className="payment">${currentMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo</span>
          </div>
          <div className="vs">VS</div>
          <div className="result-card target">
            <span className="label">With {targetScore}</span>
            <span className="rate">{targetRate}%</span>
            <span className="payment">${targetMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo</span>
          </div>
        </div>

        {monthlySavings > 0 && (
          <div className="savings-highlight">
            <div className="savings-row">
              <span>Monthly Savings</span>
              <strong>${monthlySavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
            </div>
            <div className="savings-row total">
              <span>Total Savings ({loanTerm} years)</span>
              <strong className="big">${totalSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
            </div>
          </div>
        )}
        
        {monthlySavings <= 0 && (
          <div className="no-savings">
            <p>Select a higher target score to see potential savings!</p>
          </div>
        )}
      </div>

      <style>{`
        .calculator-container {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 16px;
          padding: 24px;
          margin: 32px 0;
          color: #fff;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .calculator-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .calculator-header h3 {
          font-size: 1.5rem;
          margin: 0 0 8px 0;
          color: #fff;
        }
        .calculator-header p {
          color: #94a3b8;
          margin: 0;
          font-size: 0.95rem;
        }
        .calculator-inputs {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .input-group label {
          font-size: 0.85rem;
          color: #94a3b8;
          font-weight: 500;
        }
        .toggle-buttons {
          display: flex;
          gap: 8px;
        }
        .toggle-buttons button {
          flex: 1;
          padding: 12px;
          border: 2px solid #334155;
          background: transparent;
          color: #fff;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .toggle-buttons button:hover {
          border-color: #3b82f6;
        }
        .toggle-buttons button.active {
          background: #3b82f6;
          border-color: #3b82f6;
        }
        .input-with-prefix {
          display: flex;
          align-items: center;
          background: #1e293b;
          border-radius: 8px;
          border: 2px solid #334155;
        }
        .input-with-prefix span {
          padding: 12px;
          color: #94a3b8;
        }
        .input-with-prefix input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1.1rem;
          padding: 12px 12px 12px 0;
        }
        .input-with-prefix input:focus {
          outline: none;
        }
        input[type="range"] {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #334155;
          -webkit-appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        select {
          background: #1e293b;
          border: 2px solid #334155;
          border-radius: 8px;
          color: #fff;
          padding: 12px;
          font-size: 1rem;
          cursor: pointer;
        }
        select:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .score-selectors {
          display: flex;
          align-items: flex-end;
          gap: 16px;
        }
        .score-selectors .input-group {
          flex: 1;
        }
        .arrow {
          font-size: 1.5rem;
          color: #3b82f6;
          padding-bottom: 12px;
        }
        .calculator-results {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #334155;
        }
        .comparison {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .result-card {
          background: #1e293b;
          border-radius: 12px;
          padding: 16px 24px;
          text-align: center;
          flex: 1;
        }
        .result-card .label {
          display: block;
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        .result-card .rate {
          display: block;
          font-size: 1.8rem;
          font-weight: 700;
        }
        .result-card.current .rate {
          color: #f97316;
        }
        .result-card.target .rate {
          color: #22c55e;
        }
        .result-card .payment {
          display: block;
          font-size: 0.95rem;
          color: #94a3b8;
          margin-top: 4px;
        }
        .vs {
          font-weight: 700;
          color: #64748b;
        }
        .savings-highlight {
          background: linear-gradient(135deg, #166534 0%, #15803d 100%);
          border-radius: 12px;
          padding: 20px;
        }
        .savings-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }
        .savings-row.total {
          border-top: 1px solid rgba(255,255,255,0.2);
          margin-top: 8px;
          padding-top: 16px;
        }
        .savings-row strong {
          font-size: 1.2rem;
        }
        .savings-row strong.big {
          font-size: 1.8rem;
          color: #86efac;
        }
        .no-savings {
          background: #1e293b;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }
        .no-savings p {
          margin: 0;
          color: #94a3b8;
        }
        @media (max-width: 600px) {
          .score-selectors {
            flex-direction: column;
          }
          .arrow {
            transform: rotate(90deg);
            padding: 0;
          }
          .comparison {
            flex-direction: column;
          }
          .vs {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}






