import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.5eoMw82F.js";import{u as m}from"./use-in-view.CaBKN0k0.js";import{m as a}from"./proxy.Dx8v2PAo.js";import{A as x}from"./index.Btit3ATN.js";const c={type:"spring",stiffness:400,damping:30},l=[.25,.46,.45,.94];function h({faq:r,index:n}){const t=o.useRef(null),d=m(t,{once:!0,margin:"-50px"}),[i,p]=o.useState(!1),[s,f]=o.useState(!1);return e.jsx(a.div,{ref:t,className:"faq-item",initial:{opacity:0,y:40},animate:d?{opacity:1,y:0}:{},transition:{duration:.6,delay:n*.08,ease:l},onHoverStart:()=>f(!0),onHoverEnd:()=>f(!1),children:e.jsxs(a.div,{className:"faq-card",animate:{boxShadow:s?"0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(59, 130, 246, 0.1)":"0 2px 12px -2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)",y:s?-4:0},transition:c,children:[e.jsxs(a.button,{className:"faq-question",onClick:()=>p(!i),"aria-expanded":i,whileTap:{scale:.995},children:[e.jsxs("div",{className:"question-content",children:[e.jsx(a.span,{className:"question-number",animate:{backgroundColor:i?"#3b82f6":s?"#dbeafe":"#f1f5f9",color:i?"#ffffff":s?"#1d4ed8":"#64748b"},transition:{duration:.2},children:String(n+1).padStart(2,"0")}),e.jsx("span",{className:"question-text",children:r.question})]}),e.jsx(a.div,{className:"icon-container",animate:{backgroundColor:i?"#3b82f6":s?"#eff6ff":"transparent"},transition:{duration:.2},children:e.jsx(a.div,{className:"icon-wrapper",animate:{rotate:i?180:0},transition:c,children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:i?"#ffffff":"#64748b",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M6 9l6 6 6-6"})})})})]}),e.jsx(x,{initial:!1,children:i&&e.jsx(a.div,{className:"faq-answer-wrapper",initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{height:{duration:.4,ease:l},opacity:{duration:.25,delay:i?.1:0}},children:e.jsxs(a.div,{className:"faq-answer",initial:{y:-10},animate:{y:0},transition:{duration:.3,ease:l},children:[e.jsx("div",{className:"answer-line"}),e.jsx("p",{children:r.answer})]})})})]})})}function j({faqs:r}){const n=o.useRef(null),t=m(n,{once:!0,margin:"-100px"});return e.jsxs("section",{className:"faq-section",ref:n,children:[e.jsxs(a.div,{className:"faq-header",initial:{opacity:0,y:30},animate:t?{opacity:1,y:0}:{},transition:{duration:.6,ease:l},children:[e.jsx(a.span,{className:"section-label",initial:{opacity:0,scale:.9},animate:t?{opacity:1,scale:1}:{},transition:{delay:.1},children:"Got Questions?"}),e.jsx("h2",{className:"section-title",children:"Frequently Asked Questions"}),e.jsx("p",{className:"section-subtitle",children:"Everything you need to know about home warranty coverage"})]}),e.jsx("div",{className:"faq-list",children:r.map((d,i)=>e.jsx(h,{faq:d,index:i},i))}),e.jsx("style",{children:`
        .faq-section {
          padding: 4rem 0;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .faq-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 3rem;
        }

        .section-label {
          display: inline-block;
          padding: 8px 20px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          color: #1d4ed8;
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          border-radius: 100px;
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .section-title {
          font-family: 'Sora', sans-serif;
          font-size: 2.25rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.75rem;
          line-height: 1.2;
        }

        @media (max-width: 640px) {
          .section-title {
            font-size: 1.75rem;
          }
        }

        .section-subtitle {
          color: #64748b;
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0 1rem;
        }

        .faq-item {
          width: 100%;
        }

        .faq-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .question-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }

        .question-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .question-text {
          font-family: 'Lexend', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: #0f172a;
          line-height: 1.4;
        }

        @media (max-width: 640px) {
          .question-text {
            font-size: 0.95rem;
          }
        }

        .icon-container {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .faq-answer-wrapper {
          overflow: hidden;
        }

        .faq-answer {
          position: relative;
          padding: 0 1.5rem 1.5rem 4.5rem;
        }

        @media (max-width: 640px) {
          .faq-answer {
            padding: 0 1.25rem 1.25rem 1.25rem;
          }
        }

        .answer-line {
          position: absolute;
          left: 2.625rem;
          top: 0;
          bottom: 1.5rem;
          width: 2px;
          background: linear-gradient(180deg, #3b82f6 0%, transparent 100%);
          border-radius: 1px;
        }

        @media (max-width: 640px) {
          .answer-line {
            display: none;
          }
        }

        .faq-answer p {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.8;
          margin: 0;
        }
      `})]})}export{j as default};
