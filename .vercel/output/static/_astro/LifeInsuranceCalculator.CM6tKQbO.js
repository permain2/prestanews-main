import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.5eoMw82F.js";function z(){const[a,i]=t.useState({mortgage:3e5,carLoans:25e3,creditCards:5e3,studentLoans:3e4,other:0}),[u,b]=t.useState(1e5),[r,g]=t.useState(20),[o,f]=t.useState(2),[p,j]=t.useState(15e4),[l,v]=t.useState(1e5),[c,N]=t.useState(5e4),d=Object.values(a).reduce((s,k)=>s+k,0),m=u*r,x=o*p,y=d+m+x,h=Math.max(0,y-l-c),n=s=>"$"+s.toLocaleString("en-US",{maximumFractionDigits:0}),C=()=>r<=10?"10-year term":r<=20?"20-year term":"30-year term",w=()=>{const s=h/1e6;return r<=10?Math.round(s*25):r<=20?Math.round(s*40):Math.round(s*60)};return e.jsxs("div",{className:"calc-container",children:[e.jsxs("div",{className:"calc-header",children:[e.jsx("h3",{children:"🛡️ Life Insurance Needs Calculator"}),e.jsx("p",{children:"DIME Method: Debt + Income + Mortgage + Education"})]}),e.jsxs("div",{className:"calc-sections",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"section-icon",children:"💳"}),e.jsx("h4",{children:"D - Debt & Final Expenses"})]}),e.jsxs("div",{className:"section-inputs",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Mortgage Balance"}),e.jsx("input",{type:"number",value:a.mortgage,onChange:s=>i({...a,mortgage:Number(s.target.value)})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Car Loans"}),e.jsx("input",{type:"number",value:a.carLoans,onChange:s=>i({...a,carLoans:Number(s.target.value)})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Credit Cards"}),e.jsx("input",{type:"number",value:a.creditCards,onChange:s=>i({...a,creditCards:Number(s.target.value)})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Student Loans"}),e.jsx("input",{type:"number",value:a.studentLoans,onChange:s=>i({...a,studentLoans:Number(s.target.value)})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Other Debt"}),e.jsx("input",{type:"number",value:a.other,onChange:s=>i({...a,other:Number(s.target.value)})})]})]}),e.jsxs("div",{className:"section-total",children:[e.jsx("span",{children:"Total Debt"}),e.jsx("strong",{children:n(d)})]})]}),e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"section-icon",children:"💼"}),e.jsx("h4",{children:"I - Income Replacement"})]}),e.jsxs("div",{className:"section-inputs",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Annual Income"}),e.jsx("input",{type:"number",value:u,onChange:s=>b(Number(s.target.value))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Years to Replace"}),e.jsx("input",{type:"range",min:5,max:30,value:r,onChange:s=>g(Number(s.target.value))}),e.jsxs("span",{className:"range-value",children:[r," years"]})]})]}),e.jsxs("div",{className:"section-total",children:[e.jsx("span",{children:"Income Replacement Need"}),e.jsx("strong",{children:n(m)})]})]}),e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"section-icon",children:"🎓"}),e.jsx("h4",{children:"E - Education Costs"})]}),e.jsxs("div",{className:"section-inputs",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Number of Children"}),e.jsx("div",{className:"number-selector",children:[0,1,2,3,4].map(s=>e.jsx("button",{className:o===s?"active":"",onClick:()=>f(s),children:s},s))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Education Cost per Child"}),e.jsxs("select",{value:p,onChange:s=>j(Number(s.target.value)),children:[e.jsx("option",{value:5e4,children:"$50,000 (Community/State)"}),e.jsx("option",{value:1e5,children:"$100,000 (State University)"}),e.jsx("option",{value:15e4,children:"$150,000 (Private University)"}),e.jsx("option",{value:25e4,children:"$250,000 (Elite University)"})]})]})]}),e.jsxs("div",{className:"section-total",children:[e.jsx("span",{children:"Education Total"}),e.jsx("strong",{children:n(x)})]})]}),e.jsxs("div",{className:"section subtract",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"section-icon",children:"➖"}),e.jsx("h4",{children:"Subtract Existing Resources"})]}),e.jsxs("div",{className:"section-inputs",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Existing Life Insurance"}),e.jsx("input",{type:"number",value:l,onChange:s=>v(Number(s.target.value))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Savings & Investments"}),e.jsx("input",{type:"number",value:c,onChange:s=>N(Number(s.target.value))})]})]}),e.jsxs("div",{className:"section-total",children:[e.jsx("span",{children:"Total to Subtract"}),e.jsxs("strong",{children:["-",n(l+c)]})]})]})]}),e.jsxs("div",{className:"results",children:[e.jsxs("div",{className:"breakdown",children:[e.jsxs("div",{className:"breakdown-row",children:[e.jsx("span",{children:"Debt & Final Expenses"}),e.jsx("span",{children:n(d)})]}),e.jsxs("div",{className:"breakdown-row",children:[e.jsxs("span",{children:["Income Replacement (",r," years)"]}),e.jsx("span",{children:n(m)})]}),e.jsxs("div",{className:"breakdown-row",children:[e.jsxs("span",{children:["Education (",o," children)"]}),e.jsx("span",{children:n(x)})]}),e.jsxs("div",{className:"breakdown-row subtract-row",children:[e.jsx("span",{children:"Less: Existing Resources"}),e.jsxs("span",{children:["-",n(l+c)]})]})]}),e.jsxs("div",{className:"final-result",children:[e.jsx("div",{className:"result-label",children:"Recommended Coverage"}),e.jsx("div",{className:"result-amount",children:n(h)}),e.jsxs("div",{className:"result-details",children:[e.jsx("span",{className:"badge",children:C()}),e.jsxs("span",{className:"estimate",children:["Est. ~$",w(),"/mo*"]})]}),e.jsx("p",{className:"disclaimer",children:"*Estimated premium for healthy 35-year-old. Actual rates vary."})]})]}),e.jsx("style",{children:`
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
      `})]})}export{z as default};
