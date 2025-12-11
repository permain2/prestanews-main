import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.5eoMw82F.js";import"./index.C9kKzUNu.js";import{T as a}from"./index.BmS9Bzzq.js";import{d as o}from"./proxy.Dx8v2PAo.js";import{w as s}from"./index.Dbh5LEKj.js";import"./index.B4vNfNLm.js";import"./index.Btit3ATN.js";import"./use-motion-value.14dBj_fk.js";function u({words:t=["Financial","Insurance","Credit","Investment","Money"]}){const[r,i]=n.useState(0);return e.jsxs("div",{className:"hero-typewriter-container",children:[e.jsxs("h1",{className:"hero-typewriter-title",children:[e.jsx("span",{className:"hero-static-text",children:"Make Smarter"}),e.jsx("span",{className:"hero-dynamic-line",children:e.jsx(a,{as:"span",cursorStyle:c,onComplete:()=>{o(()=>i(s(0,t.length,r+1)),1.5)},textStyle:l,children:t[r]})}),e.jsx("span",{className:"hero-static-text hero-decisions",children:"Decisions"})]}),e.jsx("style",{children:`
        .hero-typewriter-container {
          text-align: center;
          max-width: 48rem;
          margin: 0 auto;
        }

        .hero-typewriter-title {
          font-family: 'Lexend', sans-serif;
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          font-weight: 600;
          color: #162433;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .hero-static-text {
          display: block;
        }

        .hero-dynamic-line {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 1.2em;
          background: linear-gradient(135deg, #146aff 0%, #0D2C4B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-decisions {
          color: #162433;
        }

        @media (max-width: 768px) {
          .hero-typewriter-title {
            font-size: clamp(1.75rem, 6vw, 2.5rem);
          }
        }
      `})]})}const l={fontSize:"inherit",fontWeight:700,lineHeight:1.15,fontFamily:"'Lexend', sans-serif"},c={background:"linear-gradient(135deg, #146aff 0%, #0D2C4B 100%)",width:4,borderRadius:2,marginLeft:2};export{u as default};
