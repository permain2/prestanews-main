import { useState } from 'react';

export default function CashBackCalculator() {
  const [spending, setSpending] = useState({
    groceries: 600,
    dining: 300,
    gas: 200,
    online: 400,
    other: 500,
  });

  const categories = [
    { key: 'groceries', label: 'Groceries', icon: '🛒', flatRate: 2, optimalRate: 6, card: 'Blue Cash Preferred' },
    { key: 'dining', label: 'Dining', icon: '🍽️', flatRate: 2, optimalRate: 4, card: 'Capital One Savor' },
    { key: 'gas', label: 'Gas', icon: '⛽', flatRate: 2, optimalRate: 4, card: 'Costco Visa' },
    { key: 'online', label: 'Online Shopping', icon: '📦', flatRate: 2, optimalRate: 5, card: 'Amazon Prime + Portals' },
    { key: 'other', label: 'Everything Else', icon: '💳', flatRate: 2, optimalRate: 2, card: 'Citi Double Cash' },
  ];

  const totalSpending = Object.values(spending).reduce((a, b) => a + b, 0);
  
  const calculateRewards = (strategy: 'flat' | 'optimized') => {
    return categories.reduce((total, cat) => {
      const amount = spending[cat.key as keyof typeof spending];
      const rate = strategy === 'flat' ? cat.flatRate : cat.optimalRate;
      return total + (amount * rate / 100);
    }, 0);
  };

  const flatRewards = calculateRewards('flat');
  const optimizedRewards = calculateRewards('optimized');
  const extraEarnings = optimizedRewards - flatRewards;

  return (
    <div className="cashback-calc">
      <div className="calc-header">
        <h3>💵 Cash Back Earnings Calculator</h3>
        <p>See how much more you could earn with the right cards</p>
      </div>

      <div className="spending-inputs">
        <h4>Enter Your Monthly Spending</h4>
        {categories.map((cat) => (
          <div key={cat.key} className="spending-row">
            <div className="category-info">
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
            </div>
            <div className="amount-input">
              <span className="dollar">$</span>
              <input
                type="number"
                value={spending[cat.key as keyof typeof spending]}
                onChange={(e) => setSpending({ ...spending, [cat.key]: Number(e.target.value) })}
              />
              <span className="per-month">/mo</span>
            </div>
          </div>
        ))}
        <div className="spending-total">
          <span>Total Monthly Spending</span>
          <strong>${totalSpending.toLocaleString()}</strong>
        </div>
      </div>

      <div className="comparison-section">
        <h4>Monthly Cash Back Comparison</h4>
        
        <div className="strategy-cards">
          <div className="strategy-card flat">
            <div className="strategy-header">
              <span className="strategy-label">Flat 2% Card</span>
              <span className="strategy-desc">Single card for everything</span>
            </div>
            <div className="strategy-amount">${flatRewards.toFixed(0)}</div>
            <div className="strategy-annual">
              ${(flatRewards * 12).toFixed(0)}/year
            </div>
          </div>

          <div className="vs-divider">
            <span>VS</span>
          </div>

          <div className="strategy-card optimized">
            <div className="strategy-header">
              <span className="strategy-label">Optimized Strategy</span>
              <span className="strategy-desc">Best card per category</span>
            </div>
            <div className="strategy-amount">${optimizedRewards.toFixed(0)}</div>
            <div className="strategy-annual">
              ${(optimizedRewards * 12).toFixed(0)}/year
            </div>
          </div>
        </div>

        <div className="extra-earnings">
          <div className="extra-label">Extra Earnings with Optimization</div>
          <div className="extra-amounts">
            <div className="extra-monthly">
              <span>Monthly</span>
              <strong>+${extraEarnings.toFixed(0)}</strong>
            </div>
            <div className="extra-annual">
              <span>Annual</span>
              <strong className="highlight">+${(extraEarnings * 12).toFixed(0)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="breakdown-section">
        <h4>Category Breakdown</h4>
        <div className="breakdown-table">
          <div className="table-header">
            <span>Category</span>
            <span>Flat 2%</span>
            <span>Optimized</span>
            <span>Best Card</span>
          </div>
          {categories.map((cat) => {
            const amount = spending[cat.key as keyof typeof spending];
            const flatCB = amount * cat.flatRate / 100;
            const optCB = amount * cat.optimalRate / 100;
            return (
              <div key={cat.key} className="table-row">
                <span className="row-category">
                  {cat.icon} {cat.label}
                </span>
                <span className="row-flat">${flatCB.toFixed(0)}</span>
                <span className="row-opt">${optCB.toFixed(0)}</span>
                <span className="row-card">
                  <span className="rate-badge">{cat.optimalRate}%</span>
                  {cat.card}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .cashback-calc {
          background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
          border-radius: 16px;
          padding: 24px;
          margin: 32px 0;
          color: #fff;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .calc-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .calc-header h3 {
          font-size: 1.5rem;
          margin: 0 0 8px 0;
        }
        .calc-header p {
          color: #bae6fd;
          margin: 0;
          font-size: 0.9rem;
        }
        .spending-inputs h4,
        .comparison-section h4,
        .breakdown-section h4 {
          font-size: 1rem;
          margin: 0 0 16px 0;
          color: #bae6fd;
        }
        .spending-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .category-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cat-icon {
          font-size: 1.2rem;
        }
        .cat-label {
          font-weight: 500;
        }
        .amount-input {
          display: flex;
          align-items: center;
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 8px 12px;
        }
        .dollar {
          color: #7dd3fc;
          margin-right: 4px;
        }
        .amount-input input {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1rem;
          width: 80px;
          text-align: right;
        }
        .amount-input input:focus {
          outline: none;
        }
        .per-month {
          color: #7dd3fc;
          font-size: 0.8rem;
          margin-left: 4px;
        }
        .spending-total {
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          margin-top: 8px;
        }
        .spending-total strong {
          font-size: 1.2rem;
        }
        .comparison-section {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .strategy-cards {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .strategy-card {
          flex: 1;
          background: rgba(0,0,0,0.2);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }
        .strategy-card.optimized {
          background: linear-gradient(135deg, #166534 0%, #15803d 100%);
        }
        .strategy-header {
          margin-bottom: 12px;
        }
        .strategy-label {
          display: block;
          font-weight: 600;
          font-size: 1rem;
        }
        .strategy-desc {
          display: block;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
        }
        .strategy-amount {
          font-size: 2.2rem;
          font-weight: 700;
        }
        .strategy-annual {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          margin-top: 4px;
        }
        .vs-divider {
          font-weight: 700;
          color: rgba(255,255,255,0.5);
        }
        .extra-earnings {
          background: rgba(0,0,0,0.2);
          border-radius: 12px;
          padding: 16px;
          margin-top: 16px;
          text-align: center;
        }
        .extra-label {
          font-size: 0.9rem;
          color: #7dd3fc;
          margin-bottom: 12px;
        }
        .extra-amounts {
          display: flex;
          justify-content: center;
          gap: 32px;
        }
        .extra-monthly,
        .extra-annual {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .extra-monthly span,
        .extra-annual span {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
        }
        .extra-monthly strong,
        .extra-annual strong {
          font-size: 1.3rem;
          color: #4ade80;
        }
        .extra-annual strong.highlight {
          font-size: 1.8rem;
        }
        .breakdown-section {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .breakdown-table {
          background: rgba(0,0,0,0.2);
          border-radius: 12px;
          overflow: hidden;
        }
        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          padding: 12px 16px;
          background: rgba(0,0,0,0.2);
          font-size: 0.75rem;
          color: #7dd3fc;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.9rem;
        }
        .table-row:last-child {
          border-bottom: none;
        }
        .row-category {
          font-weight: 500;
        }
        .row-flat {
          color: rgba(255,255,255,0.7);
        }
        .row-opt {
          color: #4ade80;
          font-weight: 600;
        }
        .row-card {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
        }
        .rate-badge {
          background: #4ade80;
          color: #000;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.75rem;
        }
        @media (max-width: 600px) {
          .strategy-cards {
            flex-direction: column;
          }
          .vs-divider {
            transform: rotate(90deg);
          }
          .table-header,
          .table-row {
            grid-template-columns: 1fr 1fr;
          }
          .table-header span:nth-child(4),
          .row-card {
            display: none;
          }
          .extra-amounts {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
