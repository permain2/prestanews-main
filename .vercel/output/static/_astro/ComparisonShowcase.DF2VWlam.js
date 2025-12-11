import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as p}from"./index.5eoMw82F.js";import{u as b}from"./use-in-view.CaBKN0k0.js";import{m as n}from"./proxy.Dx8v2PAo.js";import{A as y}from"./index.Btit3ATN.js";const j={type:"spring",stiffness:400,damping:30},v=[.25,.46,.45,.94];function N({provider:a,index:o,rank:l}){const t=p.useRef(null),c=b(t,{once:!0,margin:"-80px"}),[h,d]=p.useState(!1),[g,i]=p.useState(!1),[r,u]=p.useState(!1),f=Math.floor(a.rating),x=a.rating%1>=.5;return e.jsxs(n.article,{ref:t,className:"comparison-card",initial:{opacity:0,y:20},animate:c?{opacity:1,y:0}:{},transition:{duration:.4,delay:o*.05,ease:v},onHoverStart:()=>d(!0),onHoverEnd:()=>d(!1),children:[e.jsxs(n.div,{className:"comparison-card-inner",animate:{boxShadow:h?"0 8px 30px rgba(0, 0, 0, 0.08)":"0 1px 3px rgba(0, 0, 0, 0.04)"},transition:{duration:.2},children:[e.jsx("div",{className:"rank-indicator",children:e.jsx("span",{className:"rank-number",children:l})}),e.jsxs("div",{className:"card-layout",children:[e.jsxs("div",{className:"card-left-panel",children:[e.jsx("div",{className:"logo-container",children:e.jsx("div",{className:"logo-wrapper",children:e.jsx("img",{src:a.logo,alt:`${a.name} logo`,className:"provider-logo",onLoad:()=>u(!0),style:{opacity:r?1:0}})})}),e.jsxs(n.a,{href:a.affiliateUrl||"#",className:"cta-button",whileHover:{scale:1.02},whileTap:{scale:.98},transition:j,children:[e.jsx("span",{children:"Get Quote"}),e.jsx(n.svg,{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",animate:{x:h?4:0},transition:j,children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]}),e.jsxs("p",{className:"cta-subtext",children:[a.name,"'s site"]})]}),e.jsxs("div",{className:"card-right-panel",children:[e.jsxs("div",{className:"card-header",children:[e.jsxs("div",{className:"header-left",children:[e.jsxs("span",{className:"best-for-badge",children:["Best for ",a.bestFor]}),e.jsx("h3",{className:"provider-name",children:a.name})]}),e.jsxs("div",{className:"rating-container",children:[e.jsx("div",{className:"stars-row",children:[...Array(5)].map((s,m)=>e.jsx("svg",{className:`star ${m<f?"filled":m===f&&x?"half":""}`,viewBox:"0 0 20 20",children:e.jsx("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",fill:"currentColor"})},m))}),e.jsx("span",{className:"rating-number",children:a.rating})]})]}),e.jsxs("div",{className:"stats-row",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-label",children:"Monthly"}),e.jsx("span",{className:"stat-value",children:a.monthlyAvg})]}),a.serviceFee&&e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-label",children:"Service Fee"}),e.jsx("span",{className:"stat-value",children:a.serviceFee})]}),a.amBest&&e.jsxs("div",{className:"stat-item stat-badge",children:[e.jsx("span",{className:"stat-label",children:"AM Best"}),e.jsx("span",{className:"stat-value badge-value",children:a.amBest})]})]}),e.jsx("p",{className:"provider-description",children:a.description}),e.jsxs("button",{className:"verdict-toggle",onClick:()=>i(!g),children:[e.jsx("span",{children:g?"Hide details":"Show details"}),e.jsx(n.svg,{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",animate:{rotate:g?180:0},transition:{duration:.2},children:e.jsx("path",{d:"M6 9l6 6 6-6"})})]}),e.jsx(y,{initial:!1,children:g&&e.jsx(n.div,{className:"verdict-content",initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{height:{duration:.4,ease:v},opacity:{duration:.25}},children:e.jsx("div",{className:"verdict-inner",children:e.jsxs("div",{className:"verdict-grid",children:[e.jsxs("div",{className:"verdict-column pros",children:[e.jsx("div",{className:"verdict-header",children:e.jsx("span",{children:"Pros"})}),e.jsx("ul",{className:"verdict-list",children:a.pros.map((s,m)=>e.jsxs("li",{children:[e.jsx("span",{className:"list-bullet pros-bullet"}),s]},m))})]}),e.jsxs("div",{className:"verdict-column cons",children:[e.jsx("div",{className:"verdict-header",children:e.jsx("span",{children:"Cons"})}),e.jsx("ul",{className:"verdict-list",children:a.cons.map((s,m)=>e.jsxs("li",{children:[e.jsx("span",{className:"list-bullet cons-bullet"}),s]},m))})]})]})})})})]})]})]}),e.jsx("style",{children:`
        .comparison-card {
          margin-bottom: 1rem;
        }

        .comparison-card-inner {
          position: relative;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }

        /* Rank indicator */
        .rank-indicator {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
          width: 28px;
          height: 28px;
          background: #0f172a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rank-number {
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          color: #ffffff;
        }

        /* Card Layout */
        .card-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
        }

        @media (max-width: 768px) {
          .card-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Left Panel */
        .card-left-panel {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fafafa;
          border-right: 1px solid #f1f5f9;
        }

        @media (max-width: 768px) {
          .card-left-panel {
            border-right: none;
            border-bottom: 1px solid #f1f5f9;
            padding: 1.25rem;
          }
        }

        /* Logo Container */
        .logo-container {
          margin-bottom: 1.25rem;
        }

        .logo-wrapper {
          position: relative;
          width: 160px;
          height: 80px;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          overflow: hidden;
        }

        .provider-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: opacity 0.3s ease;
        }


        /* CTA Button */
        .cta-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          max-width: 180px;
          padding: 12px 20px;
          background: #0f172a;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .cta-button:hover {
          background: #1e293b;
        }

        .cta-subtext {
          margin-top: 0.5rem;
          font-size: 0.7rem;
          color: #94a3b8;
          text-align: center;
        }

        /* Right Panel */
        .card-right-panel {
          padding: 1.5rem;
        }

        @media (max-width: 768px) {
          .card-right-panel {
            padding: 1.25rem;
          }
        }

        /* Card Header */
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .header-left {
          flex: 1;
          min-width: 0;
        }

        .best-for-badge {
          display: inline-block;
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 0.25rem;
          font-weight: 500;
        }

        .provider-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .provider-name {
            font-size: 1rem;
          }
        }

        /* Rating */
        .rating-container {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .stars-row {
          display: flex;
          gap: 1px;
        }

        .star {
          width: 14px;
          height: 14px;
          color: #e5e7eb;
        }

        .star.filled {
          color: #0f172a;
        }

        .star.half {
          color: #94a3b8;
        }

        .rating-number {
          font-family: inherit;
          font-weight: 600;
          font-size: 0.9rem;
          color: #0f172a;
        }

        /* Stats Row */
        .stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .stat-value {
          font-weight: 600;
          font-size: 0.95rem;
          color: #0f172a;
        }

        .stat-badge .badge-value {
          color: #059669;
          font-weight: 600;
        }

        /* Description */
        .provider-description {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        /* Verdict Toggle */
        .verdict-toggle {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.85rem;
          color: #64748b;
          transition: color 0.2s ease;
        }

        .verdict-toggle:hover {
          color: #0f172a;
        }

        /* Verdict Content */
        .verdict-content {
          overflow: hidden;
        }

        .verdict-inner {
          padding-top: 1rem;
        }

        .verdict-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .verdict-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .verdict-column {
          padding: 0;
        }

        .verdict-column.pros {
          /* clean */
        }

        .verdict-column.cons {
          /* clean */
        }

        .verdict-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 0.75rem;
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: #64748b;
        }


        .verdict-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .verdict-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.875rem;
          color: #374151;
          line-height: 1.6;
          padding: 4px 0;
        }

        .list-bullet {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 8px;
        }

        .pros-bullet {
          background: #0f172a;
        }

        .cons-bullet {
          background: #94a3b8;
        }
      `})]})}const w=[.25,.46,.45,.94];function k({providers:a}){const o=p.useRef(null),l=b(o,{once:!0,margin:"-50px"}),t=(a.reduce((h,d)=>h+d.rating,0)/a.length).toFixed(1),c=a[0]?.name||"";return e.jsxs(n.div,{ref:o,className:"quick-summary",initial:{opacity:0},animate:l?{opacity:1}:{},transition:{duration:.5,ease:w},children:[e.jsxs("p",{className:"summary-text",children:[e.jsxs("span",{className:"summary-count",children:[a.length," providers"]})," compared ·",e.jsxs("span",{className:"summary-highlight",children:[" ",c]})," ranked #1 ·",e.jsx("span",{className:"summary-rating",children:t})," avg rating"]}),e.jsx("style",{children:`
        .quick-summary {
          text-align: center;
          padding: 1rem 0 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 1.5rem;
        }

        .summary-text {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .summary-count {
          font-weight: 600;
          color: #0f172a;
        }

        .summary-highlight {
          font-weight: 600;
          color: #0f172a;
        }

        .summary-rating {
          font-weight: 600;
          color: #0f172a;
        }
      `})]})}function z({activeFilter:a,onFilterChange:o}){const l=[{id:"all",label:"Our Pick"},{id:"rating",label:"Rating"},{id:"price",label:"Price"}];return e.jsxs("div",{className:"sort-container",children:[e.jsx("span",{className:"sort-label",children:"Sort by"}),e.jsx("div",{className:"sort-options",children:l.map(t=>e.jsx(n.button,{className:`sort-option ${a===t.id?"active":""}`,onClick:()=>o(t.id),whileTap:{scale:.97},children:t.label},t.id))}),e.jsx("style",{children:`
        .sort-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .sort-label {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sort-options {
          display: flex;
          background: #f1f5f9;
          border-radius: 8px;
          padding: 3px;
        }

        .sort-option {
          padding: 8px 16px;
          background: transparent;
          border: none;
          border-radius: 6px;
          font-family: inherit;
          font-weight: 500;
          font-size: 0.85rem;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sort-option:hover {
          color: #0f172a;
        }

        .sort-option.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
      `})]})}function P({providers:a,title:o,showFilters:l=!0,category:t}){const[c,h]=p.useState("all"),d=p.useRef(null);b(d,{once:!0,margin:"-100px"});const g=[...a].sort((i,r)=>{switch(c){case"rating":return r.rating-i.rating;case"price":const u=x=>{const s=x.match(/\$(\d+)/);return s?parseInt(s[1]):0};return u(i.monthlyAvg)-u(r.monthlyAvg);case"service":const f=x=>{if(!x)return 999;const s=x.match(/\$(\d+)/);return s?parseInt(s[1]):999};return f(i.serviceFee)-f(r.serviceFee);default:return 0}});return e.jsxs("section",{className:"comparison-showcase",ref:d,children:[e.jsxs("div",{className:"showcase-container",children:[e.jsx(k,{providers:a}),l&&e.jsx(z,{activeFilter:c,onFilterChange:h}),e.jsx("div",{className:"providers-list",children:e.jsx(y,{mode:"popLayout",children:g.map((i,r)=>e.jsx(n.div,{layout:!0,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},transition:{duration:.4,delay:r*.05,ease:w},children:e.jsx(N,{provider:i,index:r,rank:c==="all"?r+1:a.indexOf(i)+1})},i.name))})})]}),e.jsx("style",{children:`
        .comparison-showcase {
          padding: 0 0 4rem;
          background: #f8fafc;
        }

        .showcase-container {
          max-width: 880px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .providers-list {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 640px) {
          .showcase-container {
            padding: 0 1rem;
          }
        }
      `})]})}export{P as default};
