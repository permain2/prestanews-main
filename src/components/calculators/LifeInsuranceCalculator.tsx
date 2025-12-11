import { useState } from 'react';

export default function LifeInsuranceCalculator() {
  const [debt, setDebt] = useState({
    mortgage: 300000,
    carLoans: 25000,
    creditCards: 5000,
    studentLoans: 30000,
    other: 0,
  });
  const [income, setIncome] = useState(100000);
  const [yearsToReplace, setYearsToReplace] = useState(20);
  const [numChildren, setNumChildren] = useState(2);
  const [educationPerChild, setEducationPerChild] = useState(150000);
  const [existingCoverage, setExistingCoverage] = useState(100000);
  const [existingSavings, setExistingSavings] = useState(50000);

  const totalDebt = Object.values(debt).reduce((a, b) => a + b, 0);
  const incomeReplacement = income * yearsToReplace;
  const educationTotal = numChildren * educationPerChild;
  const grossNeed = totalDebt + incomeReplacement + educationTotal;
  const netNeed = Math.max(0, grossNeed - existingCoverage - existingSavings);

  const formatCurrency = (val: number) => 
    '$' + val.toLocaleString('en-US', { maximumFractionDigits: 0 });

  const getRecommendedTerm = () => {
    if (yearsToReplace <= 10) return '10-year term';
    if (yearsToReplace <= 20) return '20-year term';
    return '30-year term';
  };

  const getEstimatedPremium = () => {
    // Rough estimate for healthy 35-year-old
    const base = netNeed / 1000000;
    if (yearsToReplace <= 10) return Math.round(base * 25);
    if (yearsToReplace <= 20) return Math.round(base * 40);
    return Math.round(base * 60);
  };

  return (
    <div className="calc-container">
      <div className="calc-header">
        <h3>🛡️ Life Insurance Needs Calculator</h3>
        <p>DIME Method: Debt + Income + Mortgage + Education</p>
      </div>

      <div className="calc-sections">
        {/* Debt Section */}
        <div className="section">
          <div className="section-header">
            <span className="section-icon">💳</span>
            <h4>D - Debt & Final Expenses</h4>
          </div>
          <div className="section-inputs">
            <div className="field">
              <label>Mortgage Balance</label>
              <input
                type="number"
                value={debt.mortgage}
                onChange={(e) => setDebt({ ...debt, mortgage: Number(e.target.value) })}
              />
            </div>
            <div className="field">
              <label>Car Loans</label>
              <input
                type="number"
                value={debt.carLoans}
                onChange={(e) => setDebt({ ...debt, carLoans: Number(e.target.value) })}
              />
            </div>
            <div className="field">
              <label>Credit Cards</label>
              <input
                type="number"
                value={debt.creditCards}
                onChange={(e) => setDebt({ ...debt, creditCards: Number(e.target.value) })}
              />
            </div>
            <div className="field">
              <label>Student Loans</label>
              <input
                type="number"
                value={debt.studentLoans}
                onChange={(e) => setDebt({ ...debt, studentLoans: Number(e.target.value) })}
              />
            </div>
            <div className="field">
              <label>Other Debt</label>
              <input
                type="number"
                value={debt.other}
                onChange={(e) => setDebt({ ...debt, other: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="section-total">
            <span>Total Debt</span>
            <strong>{formatCurrency(totalDebt)}</strong>
          </div>
        </div>

        {/* Income Section */}
        <div className="section">
          <div className="section-header">
            <span className="section-icon">💼</span>
            <h4>I - Income Replacement</h4>
          </div>
          <div className="section-inputs">
            <div className="field">
              <label>Annual Income</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label>Years to Replace</label>
              <input
                type="range"
                min={5}
                max={30}
                value={yearsToReplace}
                onChange={(e) => setYearsToReplace(Number(e.target.value))}
              />
              <span className="range-value">{yearsToReplace} years</span>
            </div>
          </div>
          <div className="section-total">
            <span>Income Replacement Need</span>
            <strong>{formatCurrency(incomeReplacement)}</strong>
          </div>
        </div>

        {/* Education Section */}
        <div className="section">
          <div className="section-header">
            <span className="section-icon">🎓</span>
            <h4>E - Education Costs</h4>
          </div>
          <div className="section-inputs">
            <div className="field">
              <label>Number of Children</label>
              <div className="number-selector">
                {[0, 1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    className={numChildren === n ? 'active' : ''}
                    onClick={() => setNumChildren(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Education Cost per Child</label>
              <select
                value={educationPerChild}
                onChange={(e) => setEducationPerChild(Number(e.target.value))}
              >
                <option value={50000}>$50,000 (Community/State)</option>
                <option value={100000}>$100,000 (State University)</option>
                <option value={150000}>$150,000 (Private University)</option>
                <option value={250000}>$250,000 (Elite University)</option>
              </select>
            </div>
          </div>
          <div className="section-total">
            <span>Education Total</span>
            <strong>{formatCurrency(educationTotal)}</strong>
          </div>
        </div>

        {/* Existing Coverage */}
        <div className="section subtract">
          <div className="section-header">
            <span className="section-icon">➖</span>
            <h4>Subtract Existing Resources</h4>
          </div>
          <div className="section-inputs">
            <div className="field">
              <label>Existing Life Insurance</label>
              <input
                type="number"
                value={existingCoverage}
                onChange={(e) => setExistingCoverage(Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label>Savings & Investments</label>
              <input
                type="number"
                value={existingSavings}
                onChange={(e) => setExistingSavings(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="section-total">
            <span>Total to Subtract</span>
            <strong>-{formatCurrency(existingCoverage + existingSavings)}</strong>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="results">
        <div className="breakdown">
          <div className="breakdown-row">
            <span>Debt & Final Expenses</span>
            <span>{formatCurrency(totalDebt)}</span>
          </div>
          <div className="breakdown-row">
            <span>Income Replacement ({yearsToReplace} years)</span>
            <span>{formatCurrency(incomeReplacement)}</span>
          </div>
          <div className="breakdown-row">
            <span>Education ({numChildren} children)</span>
            <span>{formatCurrency(educationTotal)}</span>
          </div>
          <div className="breakdown-row subtract-row">
            <span>Less: Existing Resources</span>
            <span>-{formatCurrency(existingCoverage + existingSavings)}</span>
          </div>
        </div>

        <div className="final-result">
          <div className="result-label">Recommended Coverage</div>
          <div className="result-amount">{formatCurrency(netNeed)}</div>
          <div className="result-details">
            <span className="badge">{getRecommendedTerm()}</span>
            <span className="estimate">Est. ~${getEstimatedPremium()}/mo*</span>
          </div>
          <p className="disclaimer">*Estimated premium for healthy 35-year-old. Actual rates vary.</p>
        </div>
      </div>

      <style>{`
        .calc-container {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
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
          color: #94a3b8;
          margin: 0;
          font-size: 0.9rem;
        }
        .calc-sections {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .section {
          background: #1e293b;
          border-radius: 12px;
          padding: 16px;
          border-left: 4px solid #3b82f6;
        }
        .section.subtract {
          border-left-color: #ef4444;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .section-icon {
          font-size: 1.3rem;
        }
        .section-header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .section-inputs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .field label {
          font-size: 0.75rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .field input[type="number"] {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          color: #fff;
          padding: 10px 12px;
          font-size: 1rem;
        }
        .field input:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .field input[type="range"] {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #334155;
          -webkit-appearance: none;
        }
        .field input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .range-value {
          text-align: center;
          color: #3b82f6;
          font-weight: 600;
        }
        .number-selector {
          display: flex;
          gap: 6px;
        }
        .number-selector button {
          flex: 1;
          padding: 8px;
          border: 1px solid #334155;
          background: #0f172a;
          color: #fff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .number-selector button:hover {
          border-color: #3b82f6;
        }
        .number-selector button.active {
          background: #3b82f6;
          border-color: #3b82f6;
        }
        .field select {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          color: #fff;
          padding: 10px 12px;
          font-size: 0.9rem;
        }
        .section-total {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid #334155;
        }
        .section-total span {
          color: #94a3b8;
          font-size: 0.9rem;
        }
        .section-total strong {
          color: #fff;
          font-size: 1.1rem;
        }
        .results {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 2px solid #334155;
        }
        .breakdown {
          background: #1e293b;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
        }
        .breakdown-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          color: #94a3b8;
          font-size: 0.9rem;
        }
        .breakdown-row.subtract-row {
          color: #f87171;
        }
        .final-result {
          background: linear-gradient(135deg, #166534 0%, #15803d 100%);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
        }
        .result-label {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
          margin-bottom: 8px;
        }
        .result-amount {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
        }
        .result-details {
          display: flex;
          justify-content: center;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }
        .badge {
          background: rgba(255,255,255,0.2);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
        }
        .estimate {
          color: #86efac;
          font-weight: 500;
        }
        .disclaimer {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.6);
          margin-top: 12px;
          margin-bottom: 0;
        }
        @media (max-width: 500px) {
          .section-inputs {
            grid-template-columns: 1fr;
          }
          .result-amount {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}




