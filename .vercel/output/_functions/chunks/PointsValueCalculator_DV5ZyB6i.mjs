import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pointsPrograms = {
  "chase-ur": {
    name: "Chase Ultimate Rewards",
    value: 1.25,
    transferPartners: ["United", "Southwest", "Hyatt", "Marriott", "IHG", "British Airways", "Air France"]
  },
  "chase-ur-reserve": {
    name: "Chase UR (Reserve)",
    value: 1.5,
    transferPartners: ["United", "Southwest", "Hyatt", "Marriott", "IHG", "British Airways", "Air France"]
  },
  "amex-mr": {
    name: "Amex Membership Rewards",
    value: 1,
    transferPartners: ["Delta", "Hilton", "Marriott", "British Airways", "ANA", "Singapore"]
  },
  "capital-one": {
    name: "Capital One Miles",
    value: 1,
    transferPartners: ["Air Canada", "British Airways", "Emirates", "Qantas", "Turkish"]
  },
  "citi-ty": {
    name: "Citi ThankYou",
    value: 1,
    transferPartners: ["Air France", "Emirates", "JetBlue", "Singapore", "Turkish", "Virgin Atlantic"]
  },
  "hyatt": { name: "World of Hyatt", value: 1.7, transferPartners: [] },
  "marriott": { name: "Marriott Bonvoy", value: 0.7, transferPartners: ["40+ airline partners"] },
  "hilton": { name: "Hilton Honors", value: 0.5, transferPartners: ["10+ airline partners"] },
  "delta": { name: "Delta SkyMiles", value: 1.1, transferPartners: [] },
  "united": { name: "United MileagePlus", value: 1.2, transferPartners: [] },
  "southwest": { name: "Southwest Rapid Rewards", value: 1.4, transferPartners: [] },
  "american": { name: "AAdvantage", value: 1.3, transferPartners: [] }
};
function PointsValueCalculator() {
  const [selectedProgram, setSelectedProgram] = useState("chase-ur");
  const [pointsAmount, setPointsAmount] = useState(5e4);
  const [customValue, setCustomValue] = useState(null);
  const program = pointsPrograms[selectedProgram];
  const valuePerPoint = customValue ?? program.value;
  const calculations = useMemo(() => {
    const cashValue = pointsAmount * valuePerPoint / 100;
    const transferValue = pointsAmount * (valuePerPoint * 1.5) / 100;
    return {
      cashValue,
      transferValue,
      perThousand: 1e3 * valuePerPoint / 100
    };
  }, [pointsAmount, valuePerPoint]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "calculator-container",
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { type: "spring", stiffness: 100, damping: 20 },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "calculator-header", children: [
          /* @__PURE__ */ jsx("div", { className: "calculator-icon", children: /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
            /* @__PURE__ */ jsx("rect", { x: "4", y: "2", width: "16", height: "20", rx: "2" }),
            /* @__PURE__ */ jsx("line", { x1: "8", y1: "6", x2: "16", y2: "6" }),
            /* @__PURE__ */ jsx("line", { x1: "8", y1: "10", x2: "16", y2: "10" }),
            /* @__PURE__ */ jsx("line", { x1: "8", y1: "14", x2: "12", y2: "14" }),
            /* @__PURE__ */ jsx("line", { x1: "8", y1: "18", x2: "10", y2: "18" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Points Value Calculator" }),
            /* @__PURE__ */ jsx("p", { children: "Calculate the real dollar value of your credit card points" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "calculator-body", children: [
          /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsx("label", { children: "Select Points Program" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: selectedProgram,
                onChange: (e) => {
                  setSelectedProgram(e.target.value);
                  setCustomValue(null);
                },
                children: [
                  /* @__PURE__ */ jsxs("optgroup", { label: "Bank Points", children: [
                    /* @__PURE__ */ jsx("option", { value: "chase-ur", children: "Chase Ultimate Rewards (Preferred)" }),
                    /* @__PURE__ */ jsx("option", { value: "chase-ur-reserve", children: "Chase Ultimate Rewards (Reserve)" }),
                    /* @__PURE__ */ jsx("option", { value: "amex-mr", children: "Amex Membership Rewards" }),
                    /* @__PURE__ */ jsx("option", { value: "capital-one", children: "Capital One Miles" }),
                    /* @__PURE__ */ jsx("option", { value: "citi-ty", children: "Citi ThankYou Points" })
                  ] }),
                  /* @__PURE__ */ jsxs("optgroup", { label: "Hotel Programs", children: [
                    /* @__PURE__ */ jsx("option", { value: "hyatt", children: "World of Hyatt" }),
                    /* @__PURE__ */ jsx("option", { value: "marriott", children: "Marriott Bonvoy" }),
                    /* @__PURE__ */ jsx("option", { value: "hilton", children: "Hilton Honors" })
                  ] }),
                  /* @__PURE__ */ jsxs("optgroup", { label: "Airline Programs", children: [
                    /* @__PURE__ */ jsx("option", { value: "delta", children: "Delta SkyMiles" }),
                    /* @__PURE__ */ jsx("option", { value: "united", children: "United MileagePlus" }),
                    /* @__PURE__ */ jsx("option", { value: "southwest", children: "Southwest Rapid Rewards" }),
                    /* @__PURE__ */ jsx("option", { value: "american", children: "AAdvantage Miles" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsx("label", { children: "Number of Points/Miles" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: pointsAmount,
                onChange: (e) => setPointsAmount(Math.max(0, parseInt(e.target.value) || 0)),
                min: "0",
                step: "1000"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "quick-amounts", children: [25e3, 5e4, 75e3, 1e5].map((amount) => /* @__PURE__ */ jsxs(
              motion.button,
              {
                onClick: () => setPointsAmount(amount),
                className: pointsAmount === amount ? "active" : "",
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                transition: { type: "spring", stiffness: 400, damping: 25 },
                children: [
                  amount / 1e3,
                  "K"
                ]
              },
              amount
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxs("label", { children: [
              "Point Value (cents per point)",
              /* @__PURE__ */ jsxs("span", { className: "label-hint", children: [
                "Average: ",
                program.value,
                " cents"
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: customValue ?? program.value,
                onChange: (e) => setCustomValue(parseFloat(e.target.value) || program.value),
                min: "0.1",
                max: "5",
                step: "0.1"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.button,
              {
                className: "reset-btn",
                onClick: () => setCustomValue(null),
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                children: "Reset to average"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "results-section",
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { type: "spring", stiffness: 300, damping: 30 },
              children: [
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    className: "result-card primary",
                    whileHover: { scale: 1.01, y: -2 },
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "result-label", children: "Estimated Cash Value" }),
                      /* @__PURE__ */ jsxs("span", { className: "result-value", children: [
                        "$",
                        calculations.cashValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "result-sub", children: [
                        "at ",
                        valuePerPoint,
                        " cents per point"
                      ] })
                    ]
                  }
                ),
                program.transferPartners && program.transferPartners.length > 0 && /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    className: "result-card secondary",
                    whileHover: { scale: 1.01, y: -2 },
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "result-label", children: "Potential Transfer Value" }),
                      /* @__PURE__ */ jsxs("span", { className: "result-value", children: [
                        "$",
                        calculations.transferValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "result-sub", children: "with optimal transfer partner redemption" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "value-breakdown", children: [
                  /* @__PURE__ */ jsxs("div", { className: "breakdown-item", children: [
                    /* @__PURE__ */ jsx("span", { children: "Per 1,000 points" }),
                    /* @__PURE__ */ jsxs("strong", { children: [
                      "$",
                      calculations.perThousand.toFixed(2)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "breakdown-item", children: [
                    /* @__PURE__ */ jsx("span", { children: "Points program" }),
                    /* @__PURE__ */ jsx("strong", { children: program.name })
                  ] })
                ] }),
                program.transferPartners && program.transferPartners.length > 0 && /* @__PURE__ */ jsxs("div", { className: "transfer-partners", children: [
                  /* @__PURE__ */ jsx("span", { className: "partners-label", children: "Transfer Partners" }),
                  /* @__PURE__ */ jsxs("div", { className: "partners-list", children: [
                    program.transferPartners.slice(0, 6).map((partner) => /* @__PURE__ */ jsx("span", { className: "partner-tag", children: partner }, partner)),
                    program.transferPartners.length > 6 && /* @__PURE__ */ jsxs("span", { className: "partner-tag more", children: [
                      "+",
                      program.transferPartners.length - 6,
                      " more"
                    ] })
                  ] })
                ] })
              ]
            },
            `${pointsAmount}-${valuePerPoint}`
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "calculator-footer", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Note:" }),
          " Point values vary based on redemption method. Transfer to airline/hotel partners often yields higher value than cash back or travel portal redemptions."
        ] }) }),
        /* @__PURE__ */ jsx("style", { children: `
        .calculator-container {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          margin: 2rem 0;
          box-shadow: 
            0 0 0 1px rgba(0, 0, 0, 0.03),
            0 2px 4px rgba(0, 0, 0, 0.02),
            0 12px 24px rgba(0, 0, 0, 0.06);
        }

        .calculator-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
        }

        .calculator-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .calculator-icon svg {
          stroke: rgba(255, 255, 255, 0.9);
        }

        .calculator-header h3 {
          margin: 0 0 0.25rem;
          font-size: 1.125rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .calculator-header p {
          margin: 0;
          font-size: 0.875rem;
          opacity: 0.7;
        }

        .calculator-body {
          padding: 1.5rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-group label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #475569;
          margin-bottom: 0.5rem;
          letter-spacing: 0.01em;
        }

        .label-hint {
          font-weight: 400;
          color: #94a3b8;
        }

        .input-group select,
        .input-group input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          background: #f8fafc;
          color: #0f172a;
        }

        .input-group select:focus,
        .input-group input:focus {
          outline: none;
          background: #f1f5f9;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .quick-amounts {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .quick-amounts button {
          flex: 1;
          padding: 0.625rem;
          border: none;
          border-radius: 10px;
          background: #f8fafc;
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
          cursor: pointer;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .quick-amounts button:hover {
          background: #f1f5f9;
          color: #334155;
        }

        .quick-amounts button.active {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
        }

        .reset-btn {
          margin-top: 0.75rem;
          padding: 0.5rem 1rem;
          border: none;
          background: transparent;
          font-size: 0.8125rem;
          color: #64748b;
          cursor: pointer;
          transition: color 0.15s;
        }

        .reset-btn:hover {
          color: #334155;
        }

        .results-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f1f5f9;
        }

        .result-card {
          padding: 1.5rem;
          border-radius: 16px;
          margin-bottom: 0.75rem;
          text-align: center;
          cursor: default;
        }

        .result-card.primary {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15);
        }

        .result-card.secondary {
          background: linear-gradient(135deg, #047857 0%, #059669 100%);
          color: white;
          box-shadow: 0 8px 24px rgba(4, 120, 87, 0.15);
        }

        .result-label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .result-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
        }

        .result-sub {
          font-size: 0.8125rem;
          opacity: 0.7;
        }

        .value-breakdown {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .breakdown-item {
          padding: 1rem;
          background: #f8fafc;
          border-radius: 12px;
          text-align: center;
        }

        .breakdown-item span {
          display: block;
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 0.25rem;
        }

        .breakdown-item strong {
          font-size: 0.9375rem;
          color: #0f172a;
          font-weight: 600;
        }

        .transfer-partners {
          margin-top: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 12px;
        }

        .partners-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 0.625rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .partners-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .partner-tag {
          padding: 0.25rem 0.625rem;
          background: white;
          border-radius: 100px;
          font-size: 0.75rem;
          color: #475569;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .partner-tag.more {
          background: #0f172a;
          color: white;
        }

        .calculator-footer {
          padding: 1rem 1.5rem;
          background: #f8fafc;
        }

        .calculator-footer p {
          margin: 0;
          font-size: 0.8125rem;
          color: #64748b;
          line-height: 1.6;
        }

        .calculator-footer strong {
          color: #475569;
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
      ` })
      ]
    }
  );
}

export { PointsValueCalculator as P };
