import { i as createVNode, F as Fragment, ax as __astro_tag_component__ } from './astro/server_DKBvgln8.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import 'clsx';

function LifeInsuranceCalculator() {
  const [debt, setDebt] = useState({
    mortgage: 3e5,
    carLoans: 25e3,
    creditCards: 5e3,
    studentLoans: 3e4,
    other: 0
  });
  const [income, setIncome] = useState(1e5);
  const [yearsToReplace, setYearsToReplace] = useState(20);
  const [numChildren, setNumChildren] = useState(2);
  const [educationPerChild, setEducationPerChild] = useState(15e4);
  const [existingCoverage, setExistingCoverage] = useState(1e5);
  const [existingSavings, setExistingSavings] = useState(5e4);
  const totalDebt = Object.values(debt).reduce((a, b) => a + b, 0);
  const incomeReplacement = income * yearsToReplace;
  const educationTotal = numChildren * educationPerChild;
  const grossNeed = totalDebt + incomeReplacement + educationTotal;
  const netNeed = Math.max(0, grossNeed - existingCoverage - existingSavings);
  const formatCurrency = (val) => "$" + val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const getRecommendedTerm = () => {
    if (yearsToReplace <= 10) return "10-year term";
    if (yearsToReplace <= 20) return "20-year term";
    return "30-year term";
  };
  const getEstimatedPremium = () => {
    const base = netNeed / 1e6;
    if (yearsToReplace <= 10) return Math.round(base * 25);
    if (yearsToReplace <= 20) return Math.round(base * 40);
    return Math.round(base * 60);
  };
  return /* @__PURE__ */ jsxs("div", { className: "calc-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "calc-header", children: [
      /* @__PURE__ */ jsx("h3", { children: "🛡️ Life Insurance Needs Calculator" }),
      /* @__PURE__ */ jsx("p", { children: "DIME Method: Debt + Income + Mortgage + Education" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "calc-sections", children: [
      /* @__PURE__ */ jsxs("div", { className: "section", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsx("span", { className: "section-icon", children: "💳" }),
          /* @__PURE__ */ jsx("h4", { children: "D - Debt & Final Expenses" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "section-inputs", children: [
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Mortgage Balance" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: debt.mortgage,
                onChange: (e) => setDebt({ ...debt, mortgage: Number(e.target.value) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Car Loans" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: debt.carLoans,
                onChange: (e) => setDebt({ ...debt, carLoans: Number(e.target.value) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Credit Cards" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: debt.creditCards,
                onChange: (e) => setDebt({ ...debt, creditCards: Number(e.target.value) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Student Loans" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: debt.studentLoans,
                onChange: (e) => setDebt({ ...debt, studentLoans: Number(e.target.value) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Other Debt" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: debt.other,
                onChange: (e) => setDebt({ ...debt, other: Number(e.target.value) })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "section-total", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Debt" }),
          /* @__PURE__ */ jsx("strong", { children: formatCurrency(totalDebt) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "section", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsx("span", { className: "section-icon", children: "💼" }),
          /* @__PURE__ */ jsx("h4", { children: "I - Income Replacement" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "section-inputs", children: [
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Annual Income" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: income,
                onChange: (e) => setIncome(Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Years to Replace" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "range",
                min: 5,
                max: 30,
                value: yearsToReplace,
                onChange: (e) => setYearsToReplace(Number(e.target.value))
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "range-value", children: [
              yearsToReplace,
              " years"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "section-total", children: [
          /* @__PURE__ */ jsx("span", { children: "Income Replacement Need" }),
          /* @__PURE__ */ jsx("strong", { children: formatCurrency(incomeReplacement) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "section", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsx("span", { className: "section-icon", children: "🎓" }),
          /* @__PURE__ */ jsx("h4", { children: "E - Education Costs" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "section-inputs", children: [
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Number of Children" }),
            /* @__PURE__ */ jsx("div", { className: "number-selector", children: [0, 1, 2, 3, 4].map((n) => /* @__PURE__ */ jsx(
              "button",
              {
                className: numChildren === n ? "active" : "",
                onClick: () => setNumChildren(n),
                children: n
              },
              n
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Education Cost per Child" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: educationPerChild,
                onChange: (e) => setEducationPerChild(Number(e.target.value)),
                children: [
                  /* @__PURE__ */ jsx("option", { value: 5e4, children: "$50,000 (Community/State)" }),
                  /* @__PURE__ */ jsx("option", { value: 1e5, children: "$100,000 (State University)" }),
                  /* @__PURE__ */ jsx("option", { value: 15e4, children: "$150,000 (Private University)" }),
                  /* @__PURE__ */ jsx("option", { value: 25e4, children: "$250,000 (Elite University)" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "section-total", children: [
          /* @__PURE__ */ jsx("span", { children: "Education Total" }),
          /* @__PURE__ */ jsx("strong", { children: formatCurrency(educationTotal) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "section subtract", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsx("span", { className: "section-icon", children: "➖" }),
          /* @__PURE__ */ jsx("h4", { children: "Subtract Existing Resources" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "section-inputs", children: [
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Existing Life Insurance" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: existingCoverage,
                onChange: (e) => setExistingCoverage(Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsx("label", { children: "Savings & Investments" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: existingSavings,
                onChange: (e) => setExistingSavings(Number(e.target.value))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "section-total", children: [
          /* @__PURE__ */ jsx("span", { children: "Total to Subtract" }),
          /* @__PURE__ */ jsxs("strong", { children: [
            "-",
            formatCurrency(existingCoverage + existingSavings)
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "results", children: [
      /* @__PURE__ */ jsxs("div", { className: "breakdown", children: [
        /* @__PURE__ */ jsxs("div", { className: "breakdown-row", children: [
          /* @__PURE__ */ jsx("span", { children: "Debt & Final Expenses" }),
          /* @__PURE__ */ jsx("span", { children: formatCurrency(totalDebt) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "breakdown-row", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "Income Replacement (",
            yearsToReplace,
            " years)"
          ] }),
          /* @__PURE__ */ jsx("span", { children: formatCurrency(incomeReplacement) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "breakdown-row", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "Education (",
            numChildren,
            " children)"
          ] }),
          /* @__PURE__ */ jsx("span", { children: formatCurrency(educationTotal) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "breakdown-row subtract-row", children: [
          /* @__PURE__ */ jsx("span", { children: "Less: Existing Resources" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "-",
            formatCurrency(existingCoverage + existingSavings)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "final-result", children: [
        /* @__PURE__ */ jsx("div", { className: "result-label", children: "Recommended Coverage" }),
        /* @__PURE__ */ jsx("div", { className: "result-amount", children: formatCurrency(netNeed) }),
        /* @__PURE__ */ jsxs("div", { className: "result-details", children: [
          /* @__PURE__ */ jsx("span", { className: "badge", children: getRecommendedTerm() }),
          /* @__PURE__ */ jsxs("span", { className: "estimate", children: [
            "Est. ~$",
            getEstimatedPremium(),
            "/mo*"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "disclaimer", children: "*Estimated premium for healthy 35-year-old. Actual rates vary." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
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
      ` })
  ] });
}

const frontmatter = {
  "title": "Life Insurance Explained: Term vs. Whole Life and How to Choose",
  "description": "Term vs. whole life, how much coverage you need, and tips for finding affordable life insurance to protect your family.",
  "pubDate": "2025-11-30T00:00:00.000Z",
  "heroImage": "/guides-images/life-insurance-explained.jpeg",
  "author": "Emily Johnson",
  "authorImage": "/team/emily-johnson.jpg",
  "authorRole": "Insurance Specialist",
  "category": "Insurance",
  "tags": ["insurance", "life-insurance", "guide"]
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "why-life-insurance-matters",
    "text": "Why Life Insurance Matters"
  }, {
    "depth": 2,
    "slug": "term-life-insurance",
    "text": "Term Life Insurance"
  }, {
    "depth": 3,
    "slug": "how-term-life-works",
    "text": "How Term Life Works"
  }, {
    "depth": 3,
    "slug": "term-life-pros",
    "text": "Term Life Pros"
  }, {
    "depth": 3,
    "slug": "term-life-cons",
    "text": "Term Life Cons"
  }, {
    "depth": 3,
    "slug": "sample-term-life-rates-healthy-35-year-old",
    "text": "Sample Term Life Rates (Healthy 35-Year-Old)"
  }, {
    "depth": 2,
    "slug": "whole-life-insurance",
    "text": "Whole Life Insurance"
  }, {
    "depth": 3,
    "slug": "how-whole-life-works",
    "text": "How Whole Life Works"
  }, {
    "depth": 3,
    "slug": "whole-life-pros",
    "text": "Whole Life Pros"
  }, {
    "depth": 3,
    "slug": "whole-life-cons",
    "text": "Whole Life Cons"
  }, {
    "depth": 3,
    "slug": "whole-life-vs-term-cost-comparison",
    "text": "Whole Life vs. Term Cost Comparison"
  }, {
    "depth": 2,
    "slug": "other-permanent-life-insurance-types",
    "text": "Other Permanent Life Insurance Types"
  }, {
    "depth": 3,
    "slug": "universal-life",
    "text": "Universal Life"
  }, {
    "depth": 3,
    "slug": "variable-life",
    "text": "Variable Life"
  }, {
    "depth": 3,
    "slug": "indexed-universal-life",
    "text": "Indexed Universal Life"
  }, {
    "depth": 2,
    "slug": "how-much-life-insurance-do-you-need",
    "text": "How Much Life Insurance Do You Need?"
  }, {
    "depth": 3,
    "slug": "the-dime-method",
    "text": "The DIME Method"
  }, {
    "depth": 3,
    "slug": "quick-rules-of-thumb",
    "text": "Quick Rules of Thumb"
  }, {
    "depth": 3,
    "slug": "example-calculation",
    "text": "Example Calculation"
  }, {
    "depth": 2,
    "slug": "term-vs-whole-life-which-should-you-choose",
    "text": "Term vs. Whole Life: Which Should You Choose?"
  }, {
    "depth": 3,
    "slug": "choose-term-life-if",
    "text": "Choose Term Life If:"
  }, {
    "depth": 3,
    "slug": "choose-whole-life-if",
    "text": "Choose Whole Life If:"
  }, {
    "depth": 3,
    "slug": "the-hybrid-approach",
    "text": "The Hybrid Approach"
  }, {
    "depth": 2,
    "slug": "shopping-for-life-insurance",
    "text": "Shopping for Life Insurance"
  }, {
    "depth": 3,
    "slug": "factors-that-affect-rates",
    "text": "Factors That Affect Rates"
  }, {
    "depth": 3,
    "slug": "the-application-process",
    "text": "The Application Process"
  }, {
    "depth": 3,
    "slug": "medical-exam-tips",
    "text": "Medical Exam Tips"
  }, {
    "depth": 3,
    "slug": "no-exam-life-insurance",
    "text": "No-Exam Life Insurance"
  }, {
    "depth": 2,
    "slug": "common-life-insurance-mistakes",
    "text": "Common Life Insurance Mistakes"
  }, {
    "depth": 3,
    "slug": "1-waiting-too-long",
    "text": "1. Waiting Too Long"
  }, {
    "depth": 3,
    "slug": "2-buying-too-little",
    "text": "2. Buying Too Little"
  }, {
    "depth": 3,
    "slug": "3-only-having-work-coverage",
    "text": "3. Only Having Work Coverage"
  }, {
    "depth": 3,
    "slug": "4-not-comparing-quotes",
    "text": "4. Not Comparing Quotes"
  }, {
    "depth": 3,
    "slug": "5-naming-wrong-beneficiaries",
    "text": "5. Naming Wrong Beneficiaries"
  }, {
    "depth": 2,
    "slug": "life-insurance-checklist",
    "text": "Life Insurance Checklist"
  }, {
    "depth": 3,
    "slug": "before-you-apply",
    "text": "Before You Apply"
  }, {
    "depth": 3,
    "slug": "during-application",
    "text": "During Application"
  }, {
    "depth": 3,
    "slug": "after-approval",
    "text": "After Approval"
  }, {
    "depth": 2,
    "slug": "take-action",
    "text": "Take Action"
  }];
}
function _createMdxContent(props) {
  const _components = {
    em: "em",
    h2: "h2",
    h3: "h3",
    input: "input",
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    table: "table",
    tbody: "tbody",
    td: "td",
    th: "th",
    thead: "thead",
    tr: "tr",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Life insurance ensures your loved ones are financially protected if something happens to you. Understanding your options helps you choose the right coverage without overpaying."
    }), "\n", createVNode(_components.h2, {
      id: "why-life-insurance-matters",
      children: "Why Life Insurance Matters"
    }), "\n", createVNode(_components.p, {
      children: "Life insurance provides a tax-free death benefit to your beneficiaries when you pass away. This money can:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Replace your income for years"
      }), "\n", createVNode(_components.li, {
        children: "Pay off the mortgage"
      }), "\n", createVNode(_components.li, {
        children: "Cover children’s education"
      }), "\n", createVNode(_components.li, {
        children: "Handle final expenses"
      }), "\n", createVNode(_components.li, {
        children: "Eliminate debt"
      }), "\n", createVNode(_components.li, {
        children: "Provide inheritance"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "term-life-insurance",
      children: "Term Life Insurance"
    }), "\n", createVNode(_components.p, {
      children: "Term life provides coverage for a specific period (term) at a fixed premium."
    }), "\n", createVNode(_components.h3, {
      id: "how-term-life-works",
      children: "How Term Life Works"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Choose a term:"
        }), " 10, 15, 20, or 30 years"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Select coverage amount:"
        }), " $100,000 to $10,000,000+"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Pay fixed premiums:"
        }), " Same amount throughout term"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Beneficiaries receive death benefit:"
        }), " If you die during the term"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Coverage ends:"
        }), " When term expires (no payout if still living)"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "term-life-pros",
      children: "Term Life Pros"
    }), "\n", createVNode(_components.p, {
      children: ["✅ ", createVNode(_components.strong, {
        children: "Affordable"
      }), " - Most coverage for lowest cost\n✅ ", createVNode(_components.strong, {
        children: "Simple"
      }), " - Easy to understand\n✅ ", createVNode(_components.strong, {
        children: "Flexible terms"
      }), " - Match coverage to needs\n✅ ", createVNode(_components.strong, {
        children: "Convertible"
      }), " - Many policies convert to permanent\n✅ ", createVNode(_components.strong, {
        children: "Level premiums"
      }), " - Predictable costs"]
    }), "\n", createVNode(_components.h3, {
      id: "term-life-cons",
      children: "Term Life Cons"
    }), "\n", createVNode(_components.p, {
      children: ["❌ ", createVNode(_components.strong, {
        children: "Temporary"
      }), " - Coverage ends after term\n❌ ", createVNode(_components.strong, {
        children: "No cash value"
      }), " - Premiums don’t build equity\n❌ ", createVNode(_components.strong, {
        children: "Renewal expensive"
      }), " - Rates increase dramatically after term\n❌ ", createVNode(_components.strong, {
        children: "May outlive coverage"
      }), " - Could leave you uninsured"]
    }), "\n", createVNode(_components.h3, {
      id: "sample-term-life-rates-healthy-35-year-old",
      children: "Sample Term Life Rates (Healthy 35-Year-Old)"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Coverage"
          }), createVNode(_components.th, {
            children: "10-Year"
          }), createVNode(_components.th, {
            children: "20-Year"
          }), createVNode(_components.th, {
            children: "30-Year"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "$250,000"
          }), createVNode(_components.td, {
            children: "$14/mo"
          }), createVNode(_components.td, {
            children: "$18/mo"
          }), createVNode(_components.td, {
            children: "$25/mo"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "$500,000"
          }), createVNode(_components.td, {
            children: "$20/mo"
          }), createVNode(_components.td, {
            children: "$28/mo"
          }), createVNode(_components.td, {
            children: "$42/mo"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "$1,000,000"
          }), createVNode(_components.td, {
            children: "$32/mo"
          }), createVNode(_components.td, {
            children: "$48/mo"
          }), createVNode(_components.td, {
            children: "$75/mo"
          })]
        })]
      })]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Rates vary by health, age, and insurer"
      })
    }), "\n", createVNode(_components.h2, {
      id: "whole-life-insurance",
      children: "Whole Life Insurance"
    }), "\n", createVNode(_components.p, {
      children: "Whole life provides lifetime coverage with a cash value component."
    }), "\n", createVNode(_components.h3, {
      id: "how-whole-life-works",
      children: "How Whole Life Works"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Permanent coverage:"
        }), " Lasts your entire life"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Fixed premiums:"
        }), " Never increase"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Cash value grows:"
        }), " Tax-deferred savings component"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Dividends possible:"
        }), " From mutual insurers"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Death benefit guaranteed:"
        }), " As long as premiums paid"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "whole-life-pros",
      children: "Whole Life Pros"
    }), "\n", createVNode(_components.p, {
      children: ["✅ ", createVNode(_components.strong, {
        children: "Lifetime coverage"
      }), " - Never expires\n✅ ", createVNode(_components.strong, {
        children: "Cash value accumulation"
      }), " - Builds wealth\n✅ ", createVNode(_components.strong, {
        children: "Fixed premiums"
      }), " - Predictable for life\n✅ ", createVNode(_components.strong, {
        children: "Dividends"
      }), " - Can reduce premiums or grow cash value\n✅ ", createVNode(_components.strong, {
        children: "Loan access"
      }), " - Borrow against cash value"]
    }), "\n", createVNode(_components.h3, {
      id: "whole-life-cons",
      children: "Whole Life Cons"
    }), "\n", createVNode(_components.p, {
      children: ["❌ ", createVNode(_components.strong, {
        children: "Expensive"
      }), " - 5-15x cost of term life\n❌ ", createVNode(_components.strong, {
        children: "Complex"
      }), " - Multiple features to understand\n❌ ", createVNode(_components.strong, {
        children: "Low returns"
      }), " - Cash value grows slowly early on\n❌ ", createVNode(_components.strong, {
        children: "Surrender charges"
      }), " - Penalties for early cancellation\n❌ ", createVNode(_components.strong, {
        children: "Less flexibility"
      }), " - Harder to adjust coverage"]
    }), "\n", createVNode(_components.h3, {
      id: "whole-life-vs-term-cost-comparison",
      children: "Whole Life vs. Term Cost Comparison"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "$500,000 coverage for 35-year-old:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Term (20-year): ~$28/month"
      }), "\n", createVNode(_components.li, {
        children: "Whole Life: ~$350/month"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Difference:"
      }), " $322/month or $3,864/year"]
    }), "\n", createVNode(_components.h2, {
      id: "other-permanent-life-insurance-types",
      children: "Other Permanent Life Insurance Types"
    }), "\n", createVNode(_components.h3, {
      id: "universal-life",
      children: "Universal Life"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Flexible premiums"
        }), " - Pay more or less within limits"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Adjustable death benefit"
        }), " - Increase or decrease"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Cash value growth"
        }), " - Based on interest rates"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "More complex"
        }), " - Requires active management"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "variable-life",
      children: "Variable Life"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Investment options"
        }), " - Cash value in stocks, bonds"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Market risk"
        }), " - Cash value can decrease"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Potential for higher returns"
        }), " - Also higher risk"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Most complex"
        }), " - Requires investment knowledge"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "indexed-universal-life",
      children: "Indexed Universal Life"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Cash value tied to index"
        }), " - S&P 500 or similar"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Floor protection"
        }), " - Won’t lose value when market drops"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Cap on gains"
        }), " - Maximum return limited"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Middle ground"
        }), " - Between fixed and variable"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "how-much-life-insurance-do-you-need",
      children: "How Much Life Insurance Do You Need?"
    }), "\n", createVNode(_components.p, {
      children: "Use our calculator to determine your coverage needs using the DIME method:"
    }), "\n", createVNode(LifeInsuranceCalculator, {
      "client:load": true,
      "client:component-path": "/Users/permain2/affiliatewebsite/src/components/calculators/LifeInsuranceCalculator.tsx",
      "client:component-export": "default",
      "client:component-hydration": true
    }), "\n", createVNode(_components.h3, {
      id: "the-dime-method",
      children: "The DIME Method"
    }), "\n", createVNode(_components.p, {
      children: "Calculate your needs across four areas:"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "D - Debt"
      }), "\nTotal outstanding debts:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Mortgage balance: $______"
      }), "\n", createVNode(_components.li, {
        children: "Car loans: $______"
      }), "\n", createVNode(_components.li, {
        children: "Credit cards: $______"
      }), "\n", createVNode(_components.li, {
        children: "Student loans: $______"
      }), "\n", createVNode(_components.li, {
        children: "Other debt: $______"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "I - Income Replacement"
      }), "\nAnnual income × years to replace:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Annual income: $______"
      }), "\n", createVNode(_components.li, {
        children: "Years until retirement/kids independent: ______"
      }), "\n", createVNode(_components.li, {
        children: "Total: $______"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "M - Mortgage"
      }), "\nRemaining mortgage balance (if not counted above):"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Balance: $______"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "E - Education"
      }), "\nFuture education costs for children:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Per child: $50,000-$250,000"
      }), "\n", createVNode(_components.li, {
        children: "Number of children: ______"
      }), "\n", createVNode(_components.li, {
        children: "Total: $______"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Total DIME Calculation:"
      }), " D + I + M + E - Existing savings = Coverage needed"]
    }), "\n", createVNode(_components.h3, {
      id: "quick-rules-of-thumb",
      children: "Quick Rules of Thumb"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "10-12x annual income"
        }), " - Common recommendation"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Income replacement focus"
        }), " - Years of income to replace"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Debt payoff"
        }), " - Enough to eliminate obligations"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "example-calculation",
      children: "Example Calculation"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Family situation:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Age: 35"
      }), "\n", createVNode(_components.li, {
        children: "Income: $100,000/year"
      }), "\n", createVNode(_components.li, {
        children: "Mortgage: $300,000"
      }), "\n", createVNode(_components.li, {
        children: "Other debt: $30,000"
      }), "\n", createVNode(_components.li, {
        children: "Two children (ages 5 and 8)"
      }), "\n", createVNode(_components.li, {
        children: "Spouse income: $50,000"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "DIME Calculation:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "D (Debt): $330,000"
      }), "\n", createVNode(_components.li, {
        children: "I (Income for 20 years): $2,000,000"
      }), "\n", createVNode(_components.li, {
        children: "M (Already in Debt): $0"
      }), "\n", createVNode(_components.li, {
        children: "E (Education $150,000 × 2): $300,000"
      }), "\n", createVNode(_components.li, {
        children: "Less existing coverage/savings: -$130,000"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Total Need: ~$2,500,000"
      })
    }), "\n", createVNode(_components.h2, {
      id: "term-vs-whole-life-which-should-you-choose",
      children: "Term vs. Whole Life: Which Should You Choose?"
    }), "\n", createVNode(_components.h3, {
      id: "choose-term-life-if",
      children: "Choose Term Life If:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "You need maximum coverage at lowest cost"
      }), "\n", createVNode(_components.li, {
        children: "You want coverage for a specific period (until kids graduate, mortgage paid)"
      }), "\n", createVNode(_components.li, {
        children: "You’re disciplined about investing the premium difference"
      }), "\n", createVNode(_components.li, {
        children: "You’re young and healthy"
      }), "\n", createVNode(_components.li, {
        children: "You prefer simplicity"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "choose-whole-life-if",
      children: "Choose Whole Life If:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "You want guaranteed lifetime coverage"
      }), "\n", createVNode(_components.li, {
        children: "You’ve maxed out other tax-advantaged accounts"
      }), "\n", createVNode(_components.li, {
        children: "You need insurance for estate planning"
      }), "\n", createVNode(_components.li, {
        children: "You want forced savings discipline"
      }), "\n", createVNode(_components.li, {
        children: "Cash value features are valuable to you"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "the-hybrid-approach",
      children: "The Hybrid Approach"
    }), "\n", createVNode(_components.p, {
      children: "Many experts recommend:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Buy term life"
        }), " for primary coverage needs"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Invest the difference"
        }), " in index funds or retirement accounts"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Consider small whole life"
        }), " for final expenses or estate needs"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "shopping-for-life-insurance",
      children: "Shopping for Life Insurance"
    }), "\n", createVNode(_components.h3, {
      id: "factors-that-affect-rates",
      children: "Factors That Affect Rates"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "You Can’t Control:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Age"
      }), "\n", createVNode(_components.li, {
        children: "Gender"
      }), "\n", createVNode(_components.li, {
        children: "Family health history"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "You Can Control:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Health and weight"
      }), "\n", createVNode(_components.li, {
        children: "Smoking status"
      }), "\n", createVNode(_components.li, {
        children: "Driving record"
      }), "\n", createVNode(_components.li, {
        children: "Dangerous hobbies"
      }), "\n", createVNode(_components.li, {
        children: "Occupation risks"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "the-application-process",
      children: "The Application Process"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Get quotes"
        }), " - Compare multiple insurers"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Apply"
        }), " - Basic information and medical history"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Medical exam"
        }), " - Usually required for larger policies"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Underwriting"
        }), " - Insurer evaluates risk"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Approval"
        }), " - Receive offer with rates"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Policy delivery"
        }), " - Sign and pay first premium"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "medical-exam-tips",
      children: "Medical Exam Tips"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Schedule morning appointments (better blood work)"
      }), "\n", createVNode(_components.li, {
        children: "Fast 8-12 hours before"
      }), "\n", createVNode(_components.li, {
        children: "Avoid alcohol 24-48 hours before"
      }), "\n", createVNode(_components.li, {
        children: "Stay hydrated"
      }), "\n", createVNode(_components.li, {
        children: "Get good sleep"
      }), "\n", createVNode(_components.li, {
        children: "Avoid strenuous exercise day before"
      }), "\n", createVNode(_components.li, {
        children: "Bring ID and know your doctors’ info"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "no-exam-life-insurance",
      children: "No-Exam Life Insurance"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Simplified Issue:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "No medical exam required"
      }), "\n", createVNode(_components.li, {
        children: "Answer health questions"
      }), "\n", createVNode(_components.li, {
        children: "Higher premiums"
      }), "\n", createVNode(_components.li, {
        children: "Lower coverage limits"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Guaranteed Issue:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "No health questions"
      }), "\n", createVNode(_components.li, {
        children: "Everyone approved"
      }), "\n", createVNode(_components.li, {
        children: "Highest premiums"
      }), "\n", createVNode(_components.li, {
        children: "Lowest coverage (typically $25,000 max)"
      }), "\n", createVNode(_components.li, {
        children: "Graded death benefit (2-3 year waiting period)"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "common-life-insurance-mistakes",
      children: "Common Life Insurance Mistakes"
    }), "\n", createVNode(_components.h3, {
      id: "1-waiting-too-long",
      children: "1. Waiting Too Long"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Rates increase every year"
      }), "\n", createVNode(_components.li, {
        children: "Health can change"
      }), "\n", createVNode(_components.li, {
        children: "May become uninsurable"
      }), "\n", createVNode(_components.li, {
        children: "Lock in rates while young and healthy"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "2-buying-too-little",
      children: "2. Buying Too Little"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Underestimating income replacement needs"
      }), "\n", createVNode(_components.li, {
        children: "Forgetting future expenses"
      }), "\n", createVNode(_components.li, {
        children: "Not accounting for inflation"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "3-only-having-work-coverage",
      children: "3. Only Having Work Coverage"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Usually not portable"
      }), "\n", createVNode(_components.li, {
        children: "Typically only 1-2x salary"
      }), "\n", createVNode(_components.li, {
        children: "Ends when you leave job"
      }), "\n", createVNode(_components.li, {
        children: "May be inadequate"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "4-not-comparing-quotes",
      children: "4. Not Comparing Quotes"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Rates vary 50%+ between insurers"
      }), "\n", createVNode(_components.li, {
        children: "Same coverage, different prices"
      }), "\n", createVNode(_components.li, {
        children: "Shop at least 3-5 companies"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "5-naming-wrong-beneficiaries",
      children: "5. Naming Wrong Beneficiaries"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Keep beneficiaries updated"
      }), "\n", createVNode(_components.li, {
        children: "Primary and contingent beneficiaries"
      }), "\n", createVNode(_components.li, {
        children: "Consider trusts for minors"
      }), "\n", createVNode(_components.li, {
        children: "Review after life changes"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "life-insurance-checklist",
      children: "Life Insurance Checklist"
    }), "\n", createVNode(_components.h3, {
      id: "before-you-apply",
      children: "Before You Apply"
    }), "\n", createVNode(_components.ul, {
      class: "contains-task-list",
      children: ["\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Calculate coverage needs using DIME or similar"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Determine term length needed"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Get quotes from 3-5 insurers"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Check insurer financial ratings"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Understand policy features and riders"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "during-application",
      children: "During Application"
    }), "\n", createVNode(_components.ul, {
      class: "contains-task-list",
      children: ["\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Gather medical history information"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " List doctors and medications"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Schedule exam (if required)"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Be honest on application"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Ask about discounts"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "after-approval",
      children: "After Approval"
    }), "\n", createVNode(_components.ul, {
      class: "contains-task-list",
      children: ["\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Review policy details carefully"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Designate primary and contingent beneficiaries"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Store policy in safe place"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Inform beneficiaries of policy"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Set up automatic premium payments"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Review annually and after life changes"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "take-action",
      children: "Take Action"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Assess your needs"
        }), " using the DIME method"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Get quotes"
        }), " from multiple insurers"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Compare term vs. whole life"
        }), " costs and benefits"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Apply while healthy"
        }), " - rates only go up"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Review coverage"
        }), " annually and after major life events"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Life insurance isn’t something to put off. The best time to buy is when you’re young, healthy, and rates are lowest. Protect your family’s financial future today."
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/blog/life-insurance-explained.mdx";
const file = "/Users/permain2/affiliatewebsite/src/content/blog/life-insurance-explained.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/permain2/affiliatewebsite/src/content/blog/life-insurance-explained.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
