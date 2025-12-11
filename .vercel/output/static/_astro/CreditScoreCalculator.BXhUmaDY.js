import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.5eoMw82F.js";const L={mortgage:{"760+":6.5,"700-759":6.8,"660-699":7.2,"620-659":7.8,below620:8.5},auto:{"760+":5.5,"700-759":7,"660-699":9,"620-659":12,below620:15}},c=[{value:"760+",label:"760+ (Excellent)",color:"#22c55e"},{value:"700-759",label:"700-759 (Very Good)",color:"#84cc16"},{value:"660-699",label:"660-699 (Good)",color:"#eab308"},{value:"620-659",label:"620-659 (Fair)",color:"#f97316"},{value:"below620",label:"Below 620 (Poor)",color:"#ef4444"}];function M(){const[a,g]=o.useState("mortgage"),[s,x]=o.useState(3e5),[d,y]=o.useState("660-699"),[n,N]=o.useState("760+"),[t,p]=o.useState(30),m=(r,C,z)=>{const i=C/100/12,u=z*12;return i===0?r/u:r*i*Math.pow(1+i,u)/(Math.pow(1+i,u)-1)},h=L[a],b=h[d],f=h[n],v=m(s,b,t),j=m(s,f,t),l=v-j,w=l*t*12,S=()=>c.find(r=>r.value===d)?.color||"#666",k=()=>c.find(r=>r.value===n)?.color||"#666";return e.jsxs("div",{className:"calculator-container",children:[e.jsxs("div",{className:"calculator-header",children:[e.jsx("h3",{children:"💰 Credit Score Savings Calculator"}),e.jsx("p",{children:"See how much you could save with a better credit score"})]}),e.jsxs("div",{className:"calculator-inputs",children:[e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Loan Type"}),e.jsxs("div",{className:"toggle-buttons",children:[e.jsx("button",{className:a==="mortgage"?"active":"",onClick:()=>{g("mortgage"),p(30)},children:"🏠 Mortgage"}),e.jsx("button",{className:a==="auto"?"active":"",onClick:()=>{g("auto"),p(5)},children:"🚗 Auto Loan"})]})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Loan Amount"}),e.jsxs("div",{className:"input-with-prefix",children:[e.jsx("span",{children:"$"}),e.jsx("input",{type:"number",value:s,onChange:r=>x(Number(r.target.value)),min:1e3,max:2e6})]}),e.jsx("input",{type:"range",value:s,onChange:r=>x(Number(r.target.value)),min:a==="mortgage"?5e4:5e3,max:a==="mortgage"?1e6:1e5,step:a==="mortgage"?1e4:1e3})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Loan Term"}),e.jsx("select",{value:t,onChange:r=>p(Number(r.target.value)),children:a==="mortgage"?e.jsxs(e.Fragment,{children:[e.jsx("option",{value:15,children:"15 years"}),e.jsx("option",{value:30,children:"30 years"})]}):e.jsxs(e.Fragment,{children:[e.jsx("option",{value:3,children:"3 years"}),e.jsx("option",{value:4,children:"4 years"}),e.jsx("option",{value:5,children:"5 years"}),e.jsx("option",{value:6,children:"6 years"})]})})]}),e.jsxs("div",{className:"score-selectors",children:[e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Your Current Score"}),e.jsx("select",{value:d,onChange:r=>y(r.target.value),style:{borderColor:S()},children:c.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))})]}),e.jsx("div",{className:"arrow",children:"→"}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Target Score"}),e.jsx("select",{value:n,onChange:r=>N(r.target.value),style:{borderColor:k()},children:c.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))})]})]})]}),e.jsxs("div",{className:"calculator-results",children:[e.jsxs("div",{className:"comparison",children:[e.jsxs("div",{className:"result-card current",children:[e.jsx("span",{className:"label",children:"Current Rate"}),e.jsxs("span",{className:"rate",children:[b,"%"]}),e.jsxs("span",{className:"payment",children:["$",v.toLocaleString("en-US",{maximumFractionDigits:0}),"/mo"]})]}),e.jsx("div",{className:"vs",children:"VS"}),e.jsxs("div",{className:"result-card target",children:[e.jsxs("span",{className:"label",children:["With ",n]}),e.jsxs("span",{className:"rate",children:[f,"%"]}),e.jsxs("span",{className:"payment",children:["$",j.toLocaleString("en-US",{maximumFractionDigits:0}),"/mo"]})]})]}),l>0&&e.jsxs("div",{className:"savings-highlight",children:[e.jsxs("div",{className:"savings-row",children:[e.jsx("span",{children:"Monthly Savings"}),e.jsxs("strong",{children:["$",l.toLocaleString("en-US",{maximumFractionDigits:0})]})]}),e.jsxs("div",{className:"savings-row total",children:[e.jsxs("span",{children:["Total Savings (",t," years)"]}),e.jsxs("strong",{className:"big",children:["$",w.toLocaleString("en-US",{maximumFractionDigits:0})]})]})]}),l<=0&&e.jsx("div",{className:"no-savings",children:e.jsx("p",{children:"Select a higher target score to see potential savings!"})})]}),e.jsx("style",{children:`
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
      `})]})}export{M as default};
