import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as m}from"./index.5eoMw82F.js";function b(){const[s,p]=m.useState({groceries:600,dining:300,gas:200,online:400,other:500}),n=[{key:"groceries",label:"Groceries",icon:"🛒",flatRate:2,optimalRate:6,card:"Blue Cash Preferred"},{key:"dining",label:"Dining",icon:"🍽️",flatRate:2,optimalRate:4,card:"Capital One Savor"},{key:"gas",label:"Gas",icon:"⛽",flatRate:2,optimalRate:4,card:"Costco Visa"},{key:"online",label:"Online Shopping",icon:"📦",flatRate:2,optimalRate:5,card:"Amazon Prime + Portals"},{key:"other",label:"Everything Else",icon:"💳",flatRate:2,optimalRate:2,card:"Citi Double Cash"}],g=Object.values(s).reduce((a,r)=>a+r,0),d=a=>n.reduce((r,t)=>{const o=s[t.key],x=a==="flat"?t.flatRate:t.optimalRate;return r+o*x/100},0),i=d("flat"),l=d("optimized"),c=l-i;return e.jsxs("div",{className:"cashback-calc",children:[e.jsxs("div",{className:"calc-header",children:[e.jsx("h3",{children:"💵 Cash Back Earnings Calculator"}),e.jsx("p",{children:"See how much more you could earn with the right cards"})]}),e.jsxs("div",{className:"spending-inputs",children:[e.jsx("h4",{children:"Enter Your Monthly Spending"}),n.map(a=>e.jsxs("div",{className:"spending-row",children:[e.jsxs("div",{className:"category-info",children:[e.jsx("span",{className:"cat-icon",children:a.icon}),e.jsx("span",{className:"cat-label",children:a.label})]}),e.jsxs("div",{className:"amount-input",children:[e.jsx("span",{className:"dollar",children:"$"}),e.jsx("input",{type:"number",value:s[a.key],onChange:r=>p({...s,[a.key]:Number(r.target.value)})}),e.jsx("span",{className:"per-month",children:"/mo"})]})]},a.key)),e.jsxs("div",{className:"spending-total",children:[e.jsx("span",{children:"Total Monthly Spending"}),e.jsxs("strong",{children:["$",g.toLocaleString()]})]})]}),e.jsxs("div",{className:"comparison-section",children:[e.jsx("h4",{children:"Monthly Cash Back Comparison"}),e.jsxs("div",{className:"strategy-cards",children:[e.jsxs("div",{className:"strategy-card flat",children:[e.jsxs("div",{className:"strategy-header",children:[e.jsx("span",{className:"strategy-label",children:"Flat 2% Card"}),e.jsx("span",{className:"strategy-desc",children:"Single card for everything"})]}),e.jsxs("div",{className:"strategy-amount",children:["$",i.toFixed(0)]}),e.jsxs("div",{className:"strategy-annual",children:["$",(i*12).toFixed(0),"/year"]})]}),e.jsx("div",{className:"vs-divider",children:e.jsx("span",{children:"VS"})}),e.jsxs("div",{className:"strategy-card optimized",children:[e.jsxs("div",{className:"strategy-header",children:[e.jsx("span",{className:"strategy-label",children:"Optimized Strategy"}),e.jsx("span",{className:"strategy-desc",children:"Best card per category"})]}),e.jsxs("div",{className:"strategy-amount",children:["$",l.toFixed(0)]}),e.jsxs("div",{className:"strategy-annual",children:["$",(l*12).toFixed(0),"/year"]})]})]}),e.jsxs("div",{className:"extra-earnings",children:[e.jsx("div",{className:"extra-label",children:"Extra Earnings with Optimization"}),e.jsxs("div",{className:"extra-amounts",children:[e.jsxs("div",{className:"extra-monthly",children:[e.jsx("span",{children:"Monthly"}),e.jsxs("strong",{children:["+$",c.toFixed(0)]})]}),e.jsxs("div",{className:"extra-annual",children:[e.jsx("span",{children:"Annual"}),e.jsxs("strong",{className:"highlight",children:["+$",(c*12).toFixed(0)]})]})]})]})]}),e.jsxs("div",{className:"breakdown-section",children:[e.jsx("h4",{children:"Category Breakdown"}),e.jsxs("div",{className:"breakdown-table",children:[e.jsxs("div",{className:"table-header",children:[e.jsx("span",{children:"Category"}),e.jsx("span",{children:"Flat 2%"}),e.jsx("span",{children:"Optimized"}),e.jsx("span",{children:"Best Card"})]}),n.map(a=>{const r=s[a.key],t=r*a.flatRate/100,o=r*a.optimalRate/100;return e.jsxs("div",{className:"table-row",children:[e.jsxs("span",{className:"row-category",children:[a.icon," ",a.label]}),e.jsxs("span",{className:"row-flat",children:["$",t.toFixed(0)]}),e.jsxs("span",{className:"row-opt",children:["$",o.toFixed(0)]}),e.jsxs("span",{className:"row-card",children:[e.jsxs("span",{className:"rate-badge",children:[a.optimalRate,"%"]}),a.card]})]},a.key)})]})]}),e.jsx("style",{children:`
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
      `})]})}export{b as default};
