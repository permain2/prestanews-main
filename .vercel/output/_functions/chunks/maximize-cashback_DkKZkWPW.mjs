import { i as createVNode, F as Fragment, ax as __astro_tag_component__ } from './astro/server_DKBvgln8.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import 'clsx';

function CashBackCalculator() {
  const [spending, setSpending] = useState({
    groceries: 600,
    dining: 300,
    gas: 200,
    online: 400,
    other: 500
  });
  const categories = [
    { key: "groceries", label: "Groceries", icon: "🛒", flatRate: 2, optimalRate: 6, card: "Blue Cash Preferred" },
    { key: "dining", label: "Dining", icon: "🍽️", flatRate: 2, optimalRate: 4, card: "Capital One Savor" },
    { key: "gas", label: "Gas", icon: "⛽", flatRate: 2, optimalRate: 4, card: "Costco Visa" },
    { key: "online", label: "Online Shopping", icon: "📦", flatRate: 2, optimalRate: 5, card: "Amazon Prime + Portals" },
    { key: "other", label: "Everything Else", icon: "💳", flatRate: 2, optimalRate: 2, card: "Citi Double Cash" }
  ];
  const totalSpending = Object.values(spending).reduce((a, b) => a + b, 0);
  const calculateRewards = (strategy) => {
    return categories.reduce((total, cat) => {
      const amount = spending[cat.key];
      const rate = strategy === "flat" ? cat.flatRate : cat.optimalRate;
      return total + amount * rate / 100;
    }, 0);
  };
  const flatRewards = calculateRewards("flat");
  const optimizedRewards = calculateRewards("optimized");
  const extraEarnings = optimizedRewards - flatRewards;
  return /* @__PURE__ */ jsxs("div", { className: "cashback-calc", children: [
    /* @__PURE__ */ jsxs("div", { className: "calc-header", children: [
      /* @__PURE__ */ jsx("h3", { children: "💵 Cash Back Earnings Calculator" }),
      /* @__PURE__ */ jsx("p", { children: "See how much more you could earn with the right cards" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "spending-inputs", children: [
      /* @__PURE__ */ jsx("h4", { children: "Enter Your Monthly Spending" }),
      categories.map((cat) => /* @__PURE__ */ jsxs("div", { className: "spending-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "category-info", children: [
          /* @__PURE__ */ jsx("span", { className: "cat-icon", children: cat.icon }),
          /* @__PURE__ */ jsx("span", { className: "cat-label", children: cat.label })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "amount-input", children: [
          /* @__PURE__ */ jsx("span", { className: "dollar", children: "$" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: spending[cat.key],
              onChange: (e) => setSpending({ ...spending, [cat.key]: Number(e.target.value) })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "per-month", children: "/mo" })
        ] })
      ] }, cat.key)),
      /* @__PURE__ */ jsxs("div", { className: "spending-total", children: [
        /* @__PURE__ */ jsx("span", { children: "Total Monthly Spending" }),
        /* @__PURE__ */ jsxs("strong", { children: [
          "$",
          totalSpending.toLocaleString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "comparison-section", children: [
      /* @__PURE__ */ jsx("h4", { children: "Monthly Cash Back Comparison" }),
      /* @__PURE__ */ jsxs("div", { className: "strategy-cards", children: [
        /* @__PURE__ */ jsxs("div", { className: "strategy-card flat", children: [
          /* @__PURE__ */ jsxs("div", { className: "strategy-header", children: [
            /* @__PURE__ */ jsx("span", { className: "strategy-label", children: "Flat 2% Card" }),
            /* @__PURE__ */ jsx("span", { className: "strategy-desc", children: "Single card for everything" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "strategy-amount", children: [
            "$",
            flatRewards.toFixed(0)
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "strategy-annual", children: [
            "$",
            (flatRewards * 12).toFixed(0),
            "/year"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "vs-divider", children: /* @__PURE__ */ jsx("span", { children: "VS" }) }),
        /* @__PURE__ */ jsxs("div", { className: "strategy-card optimized", children: [
          /* @__PURE__ */ jsxs("div", { className: "strategy-header", children: [
            /* @__PURE__ */ jsx("span", { className: "strategy-label", children: "Optimized Strategy" }),
            /* @__PURE__ */ jsx("span", { className: "strategy-desc", children: "Best card per category" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "strategy-amount", children: [
            "$",
            optimizedRewards.toFixed(0)
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "strategy-annual", children: [
            "$",
            (optimizedRewards * 12).toFixed(0),
            "/year"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "extra-earnings", children: [
        /* @__PURE__ */ jsx("div", { className: "extra-label", children: "Extra Earnings with Optimization" }),
        /* @__PURE__ */ jsxs("div", { className: "extra-amounts", children: [
          /* @__PURE__ */ jsxs("div", { className: "extra-monthly", children: [
            /* @__PURE__ */ jsx("span", { children: "Monthly" }),
            /* @__PURE__ */ jsxs("strong", { children: [
              "+$",
              extraEarnings.toFixed(0)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "extra-annual", children: [
            /* @__PURE__ */ jsx("span", { children: "Annual" }),
            /* @__PURE__ */ jsxs("strong", { className: "highlight", children: [
              "+$",
              (extraEarnings * 12).toFixed(0)
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "breakdown-section", children: [
      /* @__PURE__ */ jsx("h4", { children: "Category Breakdown" }),
      /* @__PURE__ */ jsxs("div", { className: "breakdown-table", children: [
        /* @__PURE__ */ jsxs("div", { className: "table-header", children: [
          /* @__PURE__ */ jsx("span", { children: "Category" }),
          /* @__PURE__ */ jsx("span", { children: "Flat 2%" }),
          /* @__PURE__ */ jsx("span", { children: "Optimized" }),
          /* @__PURE__ */ jsx("span", { children: "Best Card" })
        ] }),
        categories.map((cat) => {
          const amount = spending[cat.key];
          const flatCB = amount * cat.flatRate / 100;
          const optCB = amount * cat.optimalRate / 100;
          return /* @__PURE__ */ jsxs("div", { className: "table-row", children: [
            /* @__PURE__ */ jsxs("span", { className: "row-category", children: [
              cat.icon,
              " ",
              cat.label
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "row-flat", children: [
              "$",
              flatCB.toFixed(0)
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "row-opt", children: [
              "$",
              optCB.toFixed(0)
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "row-card", children: [
              /* @__PURE__ */ jsxs("span", { className: "rate-badge", children: [
                cat.optimalRate,
                "%"
              ] }),
              cat.card
            ] })
          ] }, cat.key);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
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
      ` })
  ] });
}

const frontmatter = {
  "title": "Maximizing Cash Back Rewards: Strategies to Earn More",
  "description": "Strategies to earn more cash back on everyday purchases, including stacking rewards and category bonuses.",
  "pubDate": "2025-11-28T00:00:00.000Z",
  "heroImage": "/guides-images/maximize-cashback.jpeg",
  "author": "Michael Rodriguez",
  "authorImage": "/team/michael-rodriguez.jpg",
  "authorRole": "Senior Credit Card Analyst",
  "category": "Credit Cards",
  "tags": ["credit-cards", "cash-back", "rewards", "guide"]
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "understanding-cash-back-rates",
    "text": "Understanding Cash Back Rates"
  }, {
    "depth": 3,
    "slug": "types-of-cash-back-structures",
    "text": "Types of Cash Back Structures"
  }, {
    "depth": 3,
    "slug": "cash-back-rate-comparison",
    "text": "Cash Back Rate Comparison"
  }, {
    "depth": 2,
    "slug": "building-your-cash-back-card-portfolio",
    "text": "Building Your Cash Back Card Portfolio"
  }, {
    "depth": 3,
    "slug": "the-optimal-setup",
    "text": "The Optimal Setup"
  }, {
    "depth": 3,
    "slug": "recommended-card-combinations",
    "text": "Recommended Card Combinations"
  }, {
    "depth": 2,
    "slug": "maximizing-grocery-cash-back",
    "text": "Maximizing Grocery Cash Back"
  }, {
    "depth": 3,
    "slug": "top-grocery-cards",
    "text": "Top Grocery Cards"
  }, {
    "depth": 3,
    "slug": "grocery-earning-strategies",
    "text": "Grocery Earning Strategies"
  }, {
    "depth": 2,
    "slug": "maximizing-dining-cash-back",
    "text": "Maximizing Dining Cash Back"
  }, {
    "depth": 3,
    "slug": "top-dining-cards",
    "text": "Top Dining Cards"
  }, {
    "depth": 3,
    "slug": "what-counts-as-dining",
    "text": "What Counts as Dining"
  }, {
    "depth": 2,
    "slug": "maximizing-gas-cash-back",
    "text": "Maximizing Gas Cash Back"
  }, {
    "depth": 3,
    "slug": "top-gas-cards",
    "text": "Top Gas Cards"
  }, {
    "depth": 3,
    "slug": "gas-station-tips",
    "text": "Gas Station Tips"
  }, {
    "depth": 2,
    "slug": "stacking-rewards-advanced-strategies",
    "text": "Stacking Rewards: Advanced Strategies"
  }, {
    "depth": 3,
    "slug": "the-triple-stack",
    "text": "The Triple Stack"
  }, {
    "depth": 3,
    "slug": "shopping-portals",
    "text": "Shopping Portals"
  }, {
    "depth": 3,
    "slug": "manufacturer-rebates",
    "text": "Manufacturer Rebates"
  }, {
    "depth": 2,
    "slug": "gift-card-strategies",
    "text": "Gift Card Strategies"
  }, {
    "depth": 3,
    "slug": "buying-gift-cards-for-bonus-cash-back",
    "text": "Buying Gift Cards for Bonus Cash Back"
  }, {
    "depth": 3,
    "slug": "discounted-gift-cards",
    "text": "Discounted Gift Cards"
  }, {
    "depth": 2,
    "slug": "quarterly-category-activation",
    "text": "Quarterly Category Activation"
  }, {
    "depth": 3,
    "slug": "cards-with-rotating-categories",
    "text": "Cards with Rotating Categories"
  }, {
    "depth": 3,
    "slug": "recent-quarter-examples",
    "text": "Recent Quarter Examples"
  }, {
    "depth": 3,
    "slug": "activation-tips",
    "text": "Activation Tips"
  }, {
    "depth": 2,
    "slug": "redemption-strategies",
    "text": "Redemption Strategies"
  }, {
    "depth": 3,
    "slug": "when-to-redeem",
    "text": "When to Redeem"
  }, {
    "depth": 3,
    "slug": "automatic-redemption",
    "text": "Automatic Redemption"
  }, {
    "depth": 2,
    "slug": "tracking-your-earnings",
    "text": "Tracking Your Earnings"
  }, {
    "depth": 3,
    "slug": "cash-back-tracking-spreadsheet",
    "text": "Cash Back Tracking Spreadsheet"
  }, {
    "depth": 3,
    "slug": "apps-for-tracking",
    "text": "Apps for Tracking"
  }, {
    "depth": 2,
    "slug": "common-mistakes-to-avoid",
    "text": "Common Mistakes to Avoid"
  }, {
    "depth": 3,
    "slug": "1-carrying-a-balance",
    "text": "1. Carrying a Balance"
  }, {
    "depth": 3,
    "slug": "2-chasing-bonuses-over-value",
    "text": "2. Chasing Bonuses Over Value"
  }, {
    "depth": 3,
    "slug": "3-using-wrong-card",
    "text": "3. Using Wrong Card"
  }, {
    "depth": 3,
    "slug": "4-ignoring-shopping-portals",
    "text": "4. Ignoring Shopping Portals"
  }, {
    "depth": 3,
    "slug": "5-forgetting-to-activate",
    "text": "5. Forgetting to Activate"
  }, {
    "depth": 2,
    "slug": "annual-cash-back-projection",
    "text": "Annual Cash Back Projection"
  }, {
    "depth": 3,
    "slug": "conservative-strategy-flat-2",
    "text": "Conservative Strategy (Flat 2%)"
  }, {
    "depth": 3,
    "slug": "moderate-optimization",
    "text": "Moderate Optimization"
  }, {
    "depth": 3,
    "slug": "full-optimization",
    "text": "Full Optimization"
  }, {
    "depth": 2,
    "slug": "take-action",
    "text": "Take Action"
  }];
}
function _createMdxContent(props) {
  const _components = {
    h2: "h2",
    h3: "h3",
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
      children: "Cash back rewards put real money back in your pocket with every purchase. With the right strategy, you can earn hundreds or even thousands of dollars in cash back each year. Here’s how to maximize every swipe."
    }), "\n", createVNode(_components.h2, {
      id: "understanding-cash-back-rates",
      children: "Understanding Cash Back Rates"
    }), "\n", createVNode(_components.h3, {
      id: "types-of-cash-back-structures",
      children: "Types of Cash Back Structures"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Flat-Rate Cards"
      }), "\nEarn the same percentage on everything:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "1.5% to 2% on all purchases"
      }), "\n", createVNode(_components.li, {
        children: "Simple to use—no category tracking"
      }), "\n", createVNode(_components.li, {
        children: "Best for people who want simplicity"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Category Bonus Cards"
      }), "\nEarn more in specific spending categories:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "3-6% on groceries, gas, dining, etc."
      }), "\n", createVNode(_components.li, {
        children: "Requires using right card for each purchase"
      }), "\n", createVNode(_components.li, {
        children: "Higher earning potential with effort"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Rotating Category Cards"
      }), "\nBonus categories change quarterly:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "5% on activated categories"
      }), "\n", createVNode(_components.li, {
        children: "Requires quarterly activation"
      }), "\n", createVNode(_components.li, {
        children: "Categories like Amazon, gas, restaurants rotate"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "cash-back-rate-comparison",
      children: "Cash Back Rate Comparison"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Spending Type"
          }), createVNode(_components.th, {
            children: "Flat 2%"
          }), createVNode(_components.th, {
            children: "Category Card"
          }), createVNode(_components.th, {
            children: "Optimal Setup"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "$500 groceries"
          }), createVNode(_components.td, {
            children: "$10"
          }), createVNode(_components.td, {
            children: "$30 (6%)"
          }), createVNode(_components.td, {
            children: "$30"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "$300 dining"
          }), createVNode(_components.td, {
            children: "$6"
          }), createVNode(_components.td, {
            children: "$15 (5%)"
          }), createVNode(_components.td, {
            children: "$15"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "$200 gas"
          }), createVNode(_components.td, {
            children: "$4"
          }), createVNode(_components.td, {
            children: "$10 (5%)"
          }), createVNode(_components.td, {
            children: "$10"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "$1,000 other"
          }), createVNode(_components.td, {
            children: "$20"
          }), createVNode(_components.td, {
            children: "$15 (1.5%)"
          }), createVNode(_components.td, {
            children: "$20"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Monthly Total"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "$40"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "$70"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "$75"
            })
          })]
        })]
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Annual Difference:"
      }), " $420 more with category optimization"]
    }), "\n", createVNode(_components.p, {
      children: "Calculate your personal cash back potential with our interactive calculator:"
    }), "\n", createVNode(CashBackCalculator, {
      "client:load": true,
      "client:component-path": "/Users/permain2/affiliatewebsite/src/components/calculators/CashBackCalculator.tsx",
      "client:component-export": "default",
      "client:component-hydration": true
    }), "\n", createVNode(_components.h2, {
      id: "building-your-cash-back-card-portfolio",
      children: "Building Your Cash Back Card Portfolio"
    }), "\n", createVNode(_components.h3, {
      id: "the-optimal-setup",
      children: "The Optimal Setup"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Card 1: Category Powerhouse"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "5-6% on groceries"
      }), "\n", createVNode(_components.li, {
        children: "4-5% on dining"
      }), "\n", createVNode(_components.li, {
        children: "Examples: Blue Cash Preferred, Citi Custom Cash"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Card 2: Gas/Travel Card"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "3-5% on gas stations"
      }), "\n", createVNode(_components.li, {
        children: "3% on travel"
      }), "\n", createVNode(_components.li, {
        children: "Examples: Costco Visa, Wells Fargo Autograph"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Card 3: Flat-Rate Fallback"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "2% on everything else"
      }), "\n", createVNode(_components.li, {
        children: "Examples: Citi Double Cash, Wells Fargo Active Cash"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Card 4: Rotating Categories (Optional)"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "5% quarterly categories"
      }), "\n", createVNode(_components.li, {
        children: "Examples: Chase Freedom Flex, Discover it"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "recommended-card-combinations",
      children: "Recommended Card Combinations"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "For Families:"
      })
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Blue Cash Preferred (6% groceries, 6% streaming)"
      }), "\n", createVNode(_components.li, {
        children: "Capital One SavorOne (3% dining, 3% groceries)"
      }), "\n", createVNode(_components.li, {
        children: "Citi Double Cash (2% everything)"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "For Commuters:"
      })
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Costco Visa (4% gas, 3% dining, 3% travel)"
      }), "\n", createVNode(_components.li, {
        children: "Chase Freedom Flex (5% rotating, 3% dining)"
      }), "\n", createVNode(_components.li, {
        children: "Wells Fargo Active Cash (2% everything)"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "For Online Shoppers:"
      })
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Amazon Prime Visa (5% Amazon, Whole Foods)"
      }), "\n", createVNode(_components.li, {
        children: "PayPal Cashback (3% PayPal purchases)"
      }), "\n", createVNode(_components.li, {
        children: "Citi Double Cash (2% everything)"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "maximizing-grocery-cash-back",
      children: "Maximizing Grocery Cash Back"
    }), "\n", createVNode(_components.h3, {
      id: "top-grocery-cards",
      children: "Top Grocery Cards"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Card"
          }), createVNode(_components.th, {
            children: "Rate"
          }), createVNode(_components.th, {
            children: "Annual Fee"
          }), createVNode(_components.th, {
            children: "Best For"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Blue Cash Preferred"
          }), createVNode(_components.td, {
            children: "6% (up to $6k)"
          }), createVNode(_components.td, {
            children: "$95"
          }), createVNode(_components.td, {
            children: "Heavy grocery shoppers"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Blue Cash Everyday"
          }), createVNode(_components.td, {
            children: "3% (up to $6k)"
          }), createVNode(_components.td, {
            children: "$0"
          }), createVNode(_components.td, {
            children: "Moderate shoppers"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Citi Custom Cash"
          }), createVNode(_components.td, {
            children: "5% (up to $500/mo)"
          }), createVNode(_components.td, {
            children: "$0"
          }), createVNode(_components.td, {
            children: "Category flexibility"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Capital One SavorOne"
          }), createVNode(_components.td, {
            children: "3%"
          }), createVNode(_components.td, {
            children: "$0"
          }), createVNode(_components.td, {
            children: "Dining + groceries combo"
          })]
        })]
      })]
    }), "\n", createVNode(_components.h3, {
      id: "grocery-earning-strategies",
      children: "Grocery Earning Strategies"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "What Counts as Groceries:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Supermarkets (Kroger, Safeway, Publix)"
      }), "\n", createVNode(_components.li, {
        children: "Some wholesale clubs"
      }), "\n", createVNode(_components.li, {
        children: "Specialty food stores"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "What Doesn’t Count:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Walmart (codes as discount store)"
      }), "\n", createVNode(_components.li, {
        children: "Target (usually codes as discount store)"
      }), "\n", createVNode(_components.li, {
        children: "Amazon Fresh (codes as Amazon)"
      }), "\n", createVNode(_components.li, {
        children: "Costco (usually codes as wholesale)"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Pro Tips:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Buy gift cards at grocery stores for bonus earnings"
      }), "\n", createVNode(_components.li, {
        children: "Gas stations at grocery stores usually don’t count"
      }), "\n", createVNode(_components.li, {
        children: "Check card terms for category definitions"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "maximizing-dining-cash-back",
      children: "Maximizing Dining Cash Back"
    }), "\n", createVNode(_components.h3, {
      id: "top-dining-cards",
      children: "Top Dining Cards"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Card"
          }), createVNode(_components.th, {
            children: "Rate"
          }), createVNode(_components.th, {
            children: "Annual Fee"
          }), createVNode(_components.th, {
            children: "Notes"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Capital One Savor"
          }), createVNode(_components.td, {
            children: "4%"
          }), createVNode(_components.td, {
            children: "$95"
          }), createVNode(_components.td, {
            children: "Also 4% entertainment"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Wells Fargo Autograph"
          }), createVNode(_components.td, {
            children: "3%"
          }), createVNode(_components.td, {
            children: "$0"
          }), createVNode(_components.td, {
            children: "Multi-category card"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Citi Custom Cash"
          }), createVNode(_components.td, {
            children: "5%"
          }), createVNode(_components.td, {
            children: "$0"
          }), createVNode(_components.td, {
            children: "If dining is top category"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Chase Freedom Flex"
          }), createVNode(_components.td, {
            children: "3%"
          }), createVNode(_components.td, {
            children: "$0"
          }), createVNode(_components.td, {
            children: "Plus rotating 5%"
          })]
        })]
      })]
    }), "\n", createVNode(_components.h3, {
      id: "what-counts-as-dining",
      children: "What Counts as Dining"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Included:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Restaurants and bars"
      }), "\n", createVNode(_components.li, {
        children: "Fast food"
      }), "\n", createVNode(_components.li, {
        children: "Coffee shops"
      }), "\n", createVNode(_components.li, {
        children: "Food delivery (DoorDash, Uber Eats)"
      }), "\n", createVNode(_components.li, {
        children: "Some meal kit services"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Usually Excluded:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Grocery stores (even prepared food)"
      }), "\n", createVNode(_components.li, {
        children: "Convenience stores"
      }), "\n", createVNode(_components.li, {
        children: "Vending machines"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "maximizing-gas-cash-back",
      children: "Maximizing Gas Cash Back"
    }), "\n", createVNode(_components.h3, {
      id: "top-gas-cards",
      children: "Top Gas Cards"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Card"
          }), createVNode(_components.th, {
            children: "Rate"
          }), createVNode(_components.th, {
            children: "Annual Fee"
          }), createVNode(_components.th, {
            children: "Notes"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Costco Visa"
          }), createVNode(_components.td, {
            children: "4%"
          }), createVNode(_components.td, {
            children: "$0 (membership required)"
          }), createVNode(_components.td, {
            children: "Best overall gas rate"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "PenFed Platinum"
          }), createVNode(_components.td, {
            children: "5%"
          }), createVNode(_components.td, {
            children: "$0"
          }), createVNode(_components.td, {
            children: "Credit union membership"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Citi Custom Cash"
          }), createVNode(_components.td, {
            children: "5%"
          }), createVNode(_components.td, {
            children: "$0"
          }), createVNode(_components.td, {
            children: "Up to $500/month"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Sam’s Club Mastercard"
          }), createVNode(_components.td, {
            children: "5%"
          }), createVNode(_components.td, {
            children: "$0 (membership required)"
          }), createVNode(_components.td, {
            children: "Up to $6k/year"
          })]
        })]
      })]
    }), "\n", createVNode(_components.h3, {
      id: "gas-station-tips",
      children: "Gas Station Tips"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Use GasBuddy"
        }), " to find lowest prices"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Pay inside"
        }), " if pump limits to lower authorization"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Warehouse clubs"
        }), " often have cheapest gas"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Grocery store gas"
        }), " usually doesn’t code as gas station"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "stacking-rewards-advanced-strategies",
      children: "Stacking Rewards: Advanced Strategies"
    }), "\n", createVNode(_components.h3, {
      id: "the-triple-stack",
      children: "The Triple Stack"
    }), "\n", createVNode(_components.p, {
      children: "Earn rewards three ways on one purchase:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Credit card cash back"
        }), " (2-6%)"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Shopping portal"
        }), " (1-15%)"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Store rewards/coupons"
        }), " (varies)"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Example: Online Shopping"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Purchase: $100 at Target.com"
      }), "\n", createVNode(_components.li, {
        children: "Shopping portal: 1% ($1)"
      }), "\n", createVNode(_components.li, {
        children: "RedCard: 5% ($5)"
      }), "\n", createVNode(_components.li, {
        children: "Target Circle: 2% ($2)"
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.strong, {
          children: "Total back: 8% ($8)"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "shopping-portals",
      children: "Shopping Portals"
    }), "\n", createVNode(_components.p, {
      children: "Access through these before shopping:"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Portal"
          }), createVNode(_components.th, {
            children: "Average Rates"
          }), createVNode(_components.th, {
            children: "Best For"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Rakuten"
          }), createVNode(_components.td, {
            children: "1-12%"
          }), createVNode(_components.td, {
            children: "Wide selection"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "TopCashback"
          }), createVNode(_components.td, {
            children: "1-15%"
          }), createVNode(_components.td, {
            children: "Highest rates"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Capital One Shopping"
          }), createVNode(_components.td, {
            children: "1-10%"
          }), createVNode(_components.td, {
            children: "Auto-applies coupons"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Honey Gold"
          }), createVNode(_components.td, {
            children: "1-8%"
          }), createVNode(_components.td, {
            children: "Browser extension"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "BeFrugal"
          }), createVNode(_components.td, {
            children: "1-12%"
          }), createVNode(_components.td, {
            children: "Consistent rates"
          })]
        })]
      })]
    }), "\n", createVNode(_components.h3, {
      id: "manufacturer-rebates",
      children: "Manufacturer Rebates"
    }), "\n", createVNode(_components.p, {
      children: "Stack with credit card rewards:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Ibotta"
        }), " - Grocery rebates"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Checkout 51"
        }), " - Grocery rebates"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Fetch Rewards"
        }), " - Receipt scanning"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Shopkick"
        }), " - In-store and online"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "gift-card-strategies",
      children: "Gift Card Strategies"
    }), "\n", createVNode(_components.h3, {
      id: "buying-gift-cards-for-bonus-cash-back",
      children: "Buying Gift Cards for Bonus Cash Back"
    }), "\n", createVNode(_components.p, {
      children: "Purchase gift cards at bonus category stores:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Buy Amazon gift cards at grocery store (6% back)"
      }), "\n", createVNode(_components.li, {
        children: "Buy restaurant gift cards at grocery store"
      }), "\n", createVNode(_components.li, {
        children: "Stock up during rotating category quarters"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Caution:"
      }), " Some cards exclude gift card purchases from bonuses."]
    }), "\n", createVNode(_components.h3, {
      id: "discounted-gift-cards",
      children: "Discounted Gift Cards"
    }), "\n", createVNode(_components.p, {
      children: "Buy gift cards below face value:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Raise"
        }), " - Discounted gift cards (1-15% off)"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "CardCash"
        }), " - Buy and sell gift cards"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Sam’s Club"
        }), " - Discounted gift cards"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Costco"
        }), " - Restaurant and retail bundles"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Example Stack:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "$100 restaurant gift card at grocery store"
      }), "\n", createVNode(_components.li, {
        children: "Buy for $90 (10% discount at Sam’s)"
      }), "\n", createVNode(_components.li, {
        children: "Earn 6% cash back ($5.40)"
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.strong, {
          children: "Effective discount: 15.4%"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "quarterly-category-activation",
      children: "Quarterly Category Activation"
    }), "\n", createVNode(_components.h3, {
      id: "cards-with-rotating-categories",
      children: "Cards with Rotating Categories"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Chase Freedom Flex"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "5% on quarterly categories (up to $1,500/quarter)"
      }), "\n", createVNode(_components.li, {
        children: "Must activate each quarter"
      }), "\n", createVNode(_components.li, {
        children: "Categories announced in advance"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Discover it"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "5% on quarterly categories (up to $1,500/quarter)"
      }), "\n", createVNode(_components.li, {
        children: "Cash back match first year (doubles everything!)"
      }), "\n", createVNode(_components.li, {
        children: "Must activate each quarter"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "recent-quarter-examples",
      children: "Recent Quarter Examples"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Q1"
          }), createVNode(_components.th, {
            children: "Q2"
          }), createVNode(_components.th, {
            children: "Q3"
          }), createVNode(_components.th, {
            children: "Q4"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Grocery stores"
          }), createVNode(_components.td, {
            children: "Gas stations"
          }), createVNode(_components.td, {
            children: "Amazon, Target"
          }), createVNode(_components.td, {
            children: "Walmart, PayPal"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Fitness clubs"
          }), createVNode(_components.td, {
            children: "Select streaming"
          }), createVNode(_components.td, {
            children: "Restaurants"
          }), createVNode(_components.td, {
            children: "Department stores"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Target"
          }), createVNode(_components.td, {
            children: "Home improvement"
          }), createVNode(_components.td, {}), createVNode(_components.td, {
            children: "Amazon"
          })]
        })]
      })]
    }), "\n", createVNode(_components.h3, {
      id: "activation-tips",
      children: "Activation Tips"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Set calendar reminders"
        }), " for activation"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Activate both cards"
        }), " at quarter start"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Plan large purchases"
        }), " around categories"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Stock up"
        }), " on gift cards during relevant quarters"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "redemption-strategies",
      children: "Redemption Strategies"
    }), "\n", createVNode(_components.h3, {
      id: "when-to-redeem",
      children: "When to Redeem"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Redeem Regularly:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Cash back doesn’t earn interest"
      }), "\n", createVNode(_components.li, {
        children: "Avoid point devaluation risk"
      }), "\n", createVNode(_components.li, {
        children: "Use money productively elsewhere"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Best Redemption Options:"
      })
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Statement credit"
      }), "\n", createVNode(_components.li, {
        children: "Direct deposit"
      }), "\n", createVNode(_components.li, {
        children: "Check"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Avoid:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Gift cards (usually 1:1, no bonus)"
      }), "\n", createVNode(_components.li, {
        children: "Merchandise (typically worse value)"
      }), "\n", createVNode(_components.li, {
        children: "Travel through portals (unless bonus)"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "automatic-redemption",
      children: "Automatic Redemption"
    }), "\n", createVNode(_components.p, {
      children: "Set up auto-redemption to:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Ensure you don’t forget"
      }), "\n", createVNode(_components.li, {
        children: "Maintain consistent cash flow"
      }), "\n", createVNode(_components.li, {
        children: "Avoid accumulation temptation"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "tracking-your-earnings",
      children: "Tracking Your Earnings"
    }), "\n", createVNode(_components.h3, {
      id: "cash-back-tracking-spreadsheet",
      children: "Cash Back Tracking Spreadsheet"
    }), "\n", createVNode(_components.p, {
      children: "Track monthly earnings:"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Category"
          }), createVNode(_components.th, {
            children: "Monthly Spend"
          }), createVNode(_components.th, {
            children: "Card Used"
          }), createVNode(_components.th, {
            children: "Rate"
          }), createVNode(_components.th, {
            children: "Cash Back"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Groceries"
          }), createVNode(_components.td, {
            children: "$600"
          }), createVNode(_components.td, {
            children: "Blue Cash Preferred"
          }), createVNode(_components.td, {
            children: "6%"
          }), createVNode(_components.td, {
            children: "$36"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Dining"
          }), createVNode(_components.td, {
            children: "$300"
          }), createVNode(_components.td, {
            children: "Chase Freedom"
          }), createVNode(_components.td, {
            children: "3%"
          }), createVNode(_components.td, {
            children: "$9"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Gas"
          }), createVNode(_components.td, {
            children: "$200"
          }), createVNode(_components.td, {
            children: "Costco Visa"
          }), createVNode(_components.td, {
            children: "4%"
          }), createVNode(_components.td, {
            children: "$8"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Online"
          }), createVNode(_components.td, {
            children: "$400"
          }), createVNode(_components.td, {
            children: "Rakuten + Double Cash"
          }), createVNode(_components.td, {
            children: "5%"
          }), createVNode(_components.td, {
            children: "$20"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "Other"
          }), createVNode(_components.td, {
            children: "$500"
          }), createVNode(_components.td, {
            children: "Double Cash"
          }), createVNode(_components.td, {
            children: "2%"
          }), createVNode(_components.td, {
            children: "$10"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Total"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "$2,000"
            })
          }), createVNode(_components.td, {}), createVNode(_components.td, {}), createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "$83"
            })
          })]
        })]
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Annual projection:"
      }), " $996"]
    }), "\n", createVNode(_components.h3, {
      id: "apps-for-tracking",
      children: "Apps for Tracking"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Mint"
        }), " - Free tracking across cards"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Personal Capital"
        }), " - Cash flow monitoring"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Card-specific apps"
        }), " - Real-time earning tracking"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "common-mistakes-to-avoid",
      children: "Common Mistakes to Avoid"
    }), "\n", createVNode(_components.h3, {
      id: "1-carrying-a-balance",
      children: "1. Carrying a Balance"
    }), "\n", createVNode(_components.p, {
      children: "Cash back is worthless if you pay interest:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "20% APR destroys any 2-6% cash back"
      }), "\n", createVNode(_components.li, {
        children: "Always pay in full"
      }), "\n", createVNode(_components.li, {
        children: "Set up autopay"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "2-chasing-bonuses-over-value",
      children: "2. Chasing Bonuses Over Value"
    }), "\n", createVNode(_components.p, {
      children: "Don’t overspend for rewards:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Only buy what you’d buy anyway"
      }), "\n", createVNode(_components.li, {
        children: "Sign-up bonuses shouldn’t drive unnecessary spending"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "3-using-wrong-card",
      children: "3. Using Wrong Card"
    }), "\n", createVNode(_components.p, {
      children: "Missing out on bonus categories:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Know which card for each category"
      }), "\n", createVNode(_components.li, {
        children: "Label cards or use wallet organization"
      }), "\n", createVNode(_components.li, {
        children: "Set default cards by merchant on phone"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "4-ignoring-shopping-portals",
      children: "4. Ignoring Shopping Portals"
    }), "\n", createVNode(_components.p, {
      children: "Leaving money on the table:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Check portals before every online purchase"
      }), "\n", createVNode(_components.li, {
        children: "Browser extensions automate this"
      }), "\n", createVNode(_components.li, {
        children: "Extra 1-15% adds up"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "5-forgetting-to-activate",
      children: "5. Forgetting to Activate"
    }), "\n", createVNode(_components.p, {
      children: "Quarterly category activation:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Set calendar reminders"
      }), "\n", createVNode(_components.li, {
        children: "Activate day categories go live"
      }), "\n", createVNode(_components.li, {
        children: "Check all rotating category cards"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "annual-cash-back-projection",
      children: "Annual Cash Back Projection"
    }), "\n", createVNode(_components.h3, {
      id: "conservative-strategy-flat-2",
      children: "Conservative Strategy (Flat 2%)"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Annual spending: $30,000"
      }), "\n", createVNode(_components.li, {
        children: "Cash back earned: $600"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "moderate-optimization",
      children: "Moderate Optimization"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Category bonuses on 40% of spending"
      }), "\n", createVNode(_components.li, {
        children: "Average effective rate: 3%"
      }), "\n", createVNode(_components.li, {
        children: "Cash back earned: $900"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "full-optimization",
      children: "Full Optimization"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Maximized categories + portals"
      }), "\n", createVNode(_components.li, {
        children: "Average effective rate: 4%+"
      }), "\n", createVNode(_components.li, {
        children: "Cash back earned: $1,200+"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "take-action",
      children: "Take Action"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Audit your current cards"
        }), " - Know your earning rates"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Identify your top spending categories"
        }), " - Where does your money go?"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Fill portfolio gaps"
        }), " - Get cards for top categories"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Install shopping portal extensions"
        }), " - Automate extra earnings"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Set up category activation reminders"
        }), " - Never miss 5% quarters"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Track and optimize"
        }), " - Review monthly, adjust strategy"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Cash back rewards are the simplest path to free money. With a strategic approach, you can earn $1,000+ annually just by using the right card for each purchase."
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

const url = "src/content/blog/maximize-cashback.mdx";
const file = "/Users/permain2/affiliatewebsite/src/content/blog/maximize-cashback.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/permain2/affiliatewebsite/src/content/blog/maximize-cashback.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
