import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.5eoMw82F.js";import{u as g}from"./use-motion-value.14dBj_fk.js";import{u as o}from"./use-spring.Bk1lo1W2.js";import{u as l}from"./use-transform.x9-mPL9h.js";import{a as B}from"./index.Dbh5LEKj.js";import{m as i}from"./proxy.Dx8v2PAo.js";import{A as f}from"./index.Btit3ATN.js";function O(){const[m,h]=r.useState(""),[a,n]=r.useState("idle"),[u,x]=r.useState(0),p=r.useRef(null),c=g(0),d=g(0),y=o(l(c,[-1,1],[-15,15]),{stiffness:100,damping:30}),b=o(l(d,[-1,1],[-15,15]),{stiffness:100,damping:30}),v=o(l(c,[-1,1],[20,-20]),{stiffness:80,damping:25}),j=o(l(d,[-1,1],[20,-20]),{stiffness:80,damping:25}),w=o(l(c,[-1,1],[-10,10]),{stiffness:120,damping:35}),k=o(l(d,[-1,1],[-10,10]),{stiffness:120,damping:35}),[N,S]=r.useState(0),L=12847;r.useEffect(()=>{const t=B(0,L,{duration:2,ease:"easeOut",onUpdate:s=>S(Math.round(s))});return()=>t.stop()},[]),r.useEffect(()=>{if(a==="success"){const t=setTimeout(()=>x(1),200);return()=>clearTimeout(t)}},[a]);const C=t=>{if(!p.current)return;const s=p.current.getBoundingClientRect(),M=(t.clientX-s.left)/s.width*2-1,P=(t.clientY-s.top)/s.height*2-1;c.set(M),d.set(P)},z=()=>{c.set(0),d.set(0)},E=async t=>{if(t.preventDefault(),!!m){n("loading");try{(await fetch("/api/subscribe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:m,source:"newsletter-hero"})})).ok?(n("success"),h("")):(n("error"),setTimeout(()=>n("idle"),3e3))}catch{n("error"),setTimeout(()=>n("idle"),3e3)}}};return e.jsxs("div",{ref:p,className:"newsletter-hero-container",onMouseMove:C,onMouseLeave:z,children:[e.jsxs("div",{className:"bg-elements",children:[e.jsx(i.div,{className:"float-element float-1",style:{x:y,y:b},children:e.jsxs("svg",{viewBox:"0 0 60 60",fill:"none",children:[e.jsx("rect",{x:"5",y:"15",width:"50",height:"35",rx:"4",fill:"rgba(20, 106, 255, 0.15)"}),e.jsx("path",{d:"M5 20L30 38L55 20",stroke:"rgba(20, 106, 255, 0.3)",strokeWidth:"2"})]})}),e.jsx(i.div,{className:"float-element float-2",style:{x:v,y:j},children:e.jsxs("svg",{viewBox:"0 0 40 40",fill:"none",children:[e.jsx("circle",{cx:"20",cy:"20",r:"18",fill:"rgba(201, 162, 39, 0.12)"}),e.jsx("path",{d:"M14 20L18 24L26 16",stroke:"rgba(201, 162, 39, 0.4)",strokeWidth:"2.5",strokeLinecap:"round"})]})}),e.jsx(i.div,{className:"float-element float-3",style:{x:w,y:k},children:e.jsxs("svg",{viewBox:"0 0 50 50",fill:"none",children:[e.jsx("rect",{x:"8",y:"8",width:"34",height:"24",rx:"3",fill:"rgba(16, 185, 129, 0.12)"}),e.jsx("rect",{x:"12",y:"14",width:"8",height:"6",rx:"1",fill:"rgba(16, 185, 129, 0.3)"})]})})]}),e.jsxs(i.div,{className:"hero-content",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,ease:"easeOut"},children:[e.jsx(i.span,{className:"kicker",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.2},children:"FREE NEWSLETTER"}),e.jsxs(i.h1,{className:"hero-title",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:["Stay in the ",e.jsx("span",{className:"gradient-text",children:"Loop"})]}),e.jsx(i.p,{className:"hero-subtitle",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},children:"Get the best credit card deals, travel tips, and financial insights delivered to your inbox every week."}),e.jsx(i.div,{className:"form-area",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.5},children:e.jsx(f,{mode:"wait",children:a==="success"?e.jsx(i.div,{className:"inline-success-hero",initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},transition:{type:"spring",stiffness:300,damping:25},children:e.jsxs("div",{className:"success-inner",children:[e.jsxs(i.div,{className:"success-check-circle",initial:{scale:0},animate:{scale:1},transition:{type:"spring",stiffness:400,damping:15,delay:.1},children:[e.jsx("svg",{viewBox:"0 0 52 52",className:"check-svg",children:e.jsx(i.path,{d:"M14 27L22 35L38 19",fill:"none",stroke:"white",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round",initial:{pathLength:0},animate:{pathLength:u},transition:{duration:.4,delay:.3}})}),e.jsx(i.div,{className:"ripple",initial:{scale:1,opacity:.5},animate:{scale:2.5,opacity:0},transition:{duration:1,delay:.3}})]}),e.jsxs("div",{className:"success-text",children:[e.jsx(i.h3,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.4},children:"You're In!"}),e.jsx(i.p,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.5},children:"Check your inbox for confirmation"})]})]})},"success"):e.jsxs(i.form,{className:"hero-form",onSubmit:E,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,scale:.95},children:[e.jsxs("div",{className:"form-container",children:[e.jsxs("div",{className:"input-container",children:[e.jsx("svg",{className:"email-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"})}),e.jsx("input",{type:"email",placeholder:"Enter your email address",value:m,onChange:t=>h(t.target.value),disabled:a==="loading",required:!0})]}),e.jsx(i.button,{type:"submit",className:`submit-button ${a==="error"?"error":""}`,disabled:a==="loading",whileHover:{scale:1.02},whileTap:{scale:.98},children:e.jsx(f,{mode:"wait",children:a==="loading"?e.jsx(i.span,{className:"loading-spinner",initial:{opacity:0},animate:{opacity:1,rotate:360},exit:{opacity:0},transition:{rotate:{duration:1,repeat:1/0,ease:"linear"}},children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10",opacity:"0.25"}),e.jsx("path",{d:"M12 2a10 10 0 0 1 10 10",strokeLinecap:"round"})]})},"loading"):a==="error"?e.jsx(i.span,{initial:{scale:0},animate:{scale:1},exit:{scale:0},children:"TRY AGAIN"},"error"):e.jsx(i.span,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:"SUBSCRIBE FREE"},"default")})})]}),e.jsx(f,{children:a==="error"?e.jsx(i.p,{className:"error-message",initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:"Something went wrong. Please try again."}):e.jsx(i.p,{className:"disclaimer",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:"No spam, ever. Unsubscribe at any time."})})]},"form")})}),e.jsxs(i.div,{className:"social-proof",initial:{opacity:0},animate:{opacity:1},transition:{delay:.7},children:[e.jsxs("div",{className:"avatars",children:[e.jsx("div",{className:"avatar",children:"JK"}),e.jsx("div",{className:"avatar",children:"SM"}),e.jsx("div",{className:"avatar",children:"AL"}),e.jsx("div",{className:"avatar more",children:"+"})]}),e.jsxs("p",{children:["Join ",e.jsx("strong",{children:N.toLocaleString()})," readers already getting smarter about money"]})]}),e.jsx(i.div,{className:"feature-pills",initial:"hidden",animate:"visible",variants:{visible:{transition:{staggerChildren:.1,delayChildren:.8}}},children:[{icon:"💳",text:"Credit Card Alerts"},{icon:"✈️",text:"Deal Alerts"},{icon:"📊",text:"Weekly Digest"}].map((t,s)=>e.jsxs(i.span,{className:"pill",variants:{hidden:{opacity:0,scale:.8},visible:{opacity:1,scale:1}},whileHover:{scale:1.05,y:-2},children:[e.jsx("span",{className:"pill-icon",children:t.icon}),t.text]},s))})]}),e.jsx("style",{children:`
        .newsletter-hero-container {
          position: relative;
          background: linear-gradient(165deg, #0D2C4B 0%, #091E32 100%);
          padding: 5rem 2rem;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .float-element {
          position: absolute;
          opacity: 0.6;
        }

        .float-1 {
          top: 15%;
          left: 10%;
          width: 80px;
          height: 80px;
        }

        .float-2 {
          top: 25%;
          right: 15%;
          width: 60px;
          height: 60px;
        }

        .float-3 {
          bottom: 20%;
          left: 18%;
          width: 70px;
          height: 70px;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 36rem;
        }

        .kicker {
          display: inline-block;
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #146aff;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #146aff 50%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1.125rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 2rem;
        }

        .form-area {
          margin-bottom: 2rem;
          min-height: 120px;
        }

        .hero-form {
          /* inherits from form-area */
        }

        .form-container {
          display: flex;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1rem;
          padding: 0.5rem;
        }

        .input-container {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .email-icon {
          position: absolute;
          left: 1rem;
          width: 1.25rem;
          height: 1.25rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .input-container input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: #ffffff;
          background: transparent;
          border: none;
          outline: none;
        }

        .input-container input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .input-container input:focus {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
        }

        .submit-button {
          padding: 1rem 2rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #0D2C4B;
          background: linear-gradient(135deg, #fbbf24 0%, #C9A227 100%);
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          min-width: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-button:hover:not(:disabled) {
          filter: brightness(1.1);
          box-shadow: 0 4px 20px rgba(201, 162, 39, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.9;
          cursor: default;
        }

        .submit-button.error {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .loading-spinner svg {
          width: 20px;
          height: 20px;
        }

        .disclaimer {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.75rem;
        }

        .error-message {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: #f87171;
          margin-top: 0.75rem;
        }

        /* Inline Success State */
        .inline-success-hero {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1rem;
          padding: 1.5rem 2rem;
        }

        .success-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
        }

        .success-check-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }

        .check-svg {
          width: 28px;
          height: 28px;
        }

        .ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #10b981;
          pointer-events: none;
        }

        .success-text {
          text-align: left;
        }

        .success-text h3 {
          font-family: 'Sora', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .success-text p {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .social-proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .avatars {
          display: flex;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #146aff 0%, #0D2C4B 100%);
          border: 2px solid #0D2C4B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          color: white;
          margin-right: -8px;
        }

        .avatar.more {
          background: rgba(255, 255, 255, 0.1);
          font-size: 0.875rem;
        }

        .social-proof p {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .social-proof strong {
          color: #fbbf24;
          font-weight: 700;
        }

        .feature-pills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.8);
          cursor: default;
          transition: all 0.2s ease;
        }

        .pill:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .pill-icon {
          font-size: 1rem;
        }

        @media (max-width: 640px) {
          .newsletter-hero-container {
            padding: 3rem 1.25rem;
          }

          .form-container {
            flex-direction: column;
            padding: 0.75rem;
          }

          .input-container input {
            padding: 0.875rem 0.875rem 0.875rem 2.75rem;
          }

          .submit-button {
            width: 100%;
          }

          .inline-success-hero {
            padding: 1.25rem;
          }

          .success-inner {
            flex-direction: column;
            text-align: center;
          }

          .success-text {
            text-align: center;
          }

          .social-proof {
            flex-direction: column;
            gap: 0.5rem;
          }

          .feature-pills {
            gap: 0.5rem;
          }

          .pill {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }
        }
      `})]})}export{O as default};
