import{j as i}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.5eoMw82F.js";import"./index.C9kKzUNu.js";import{u as R,a as P}from"./use-pointer-position.CW7iYfRs.js";import"./index.BmS9Bzzq.js";import{u as M}from"./use-transform.x9-mPL9h.js";import{A as N}from"./index.Btit3ATN.js";import{m as X,d as Y}from"./proxy.Dx8v2PAo.js";import{w as k}from"./index.Dbh5LEKj.js";import"./index.B4vNfNLm.js";import"./use-motion-value.14dBj_fk.js";const h=["/cursor-trail/cards/amex-platinum.png","/cursor-trail/cards/amex-gold.png","/cursor-trail/cards/chase-sapphire-preferred.png","/cursor-trail/cards/capital-one-venture-x.png","/cursor-trail/cards/citi-double-cash.png","/cursor-trail/cards/blue-cash-preferred.png","/cursor-trail/cards/discover-it-balance-transfer.png","/cursor-trail/cards/delta-skymiles-reserve.png"];function O({fadeOutDuration:v=1.5,imageSize:o=140,spawnDistance:y=100,velocityFactor:p=.08}){const l=n.useRef(0),b=n.useRef(0),r=n.useRef(void 0),[w,m]=n.useState([]),d=n.useRef(null),[x,f]=n.useState(!1),t=R(),C=M(()=>{if(!x)return 0;const e=t.x.get(),s=t.y.get(),a=e-(t.x.getPrevious()??e),c=s-(t.y.getPrevious()??s);return Math.sqrt(a*a+c*c)});P(C,"change",e=>{if(x){if(r.current===void 0){r.current=0;return}r.current+=e,r.current>=y&&(j(t.x.get(),t.y.get()),r.current=0)}});const j=(e,s)=>{if(!d.current)return;const a=d.current.getBoundingClientRect(),c=e-a.left,I=s-a.top,g={id:b.current++,x:c-o/2,y:I-o/2,imageIndex:l.current,velocityX:t.x.getVelocity(),velocityY:t.y.getVelocity()};m(u=>[...u,g]),l.current=k(0,h.length,l.current+1),Y(()=>{m(u=>u.filter(E=>E.id!==g.id))},v)};return i.jsxs("div",{ref:d,className:"cursor-trail-container",onMouseEnter:()=>f(!0),onMouseLeave:()=>{f(!1),r.current=void 0},children:[i.jsx("div",{className:"trail-title",children:"Credit Cards"}),i.jsx(N,{children:w.map(e=>i.jsx(X.img,{className:"trail-card-image",src:h[e.imageIndex],alt:"",style:{left:e.x,top:e.y,willChange:"opacity, transform"},initial:{opacity:0,scale:.5,rotate:-15},animate:{opacity:1,scale:1,rotate:Math.random()*30-15,x:0,y:0},transition:{duration:.15,x:{type:"inertia",velocity:e.velocityX*p},y:{type:"inertia",velocity:e.velocityY*p}},exit:{opacity:0,scale:.3,transition:{duration:.4}}},e.id))}),i.jsx("p",{className:"trail-subtitle",children:"Find the perfect credit card for your spending habits. Our experts review and compare the best options for travel rewards, cash back, business, and more."}),i.jsx("style",{children:`
                .cursor-trail-container {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: linear-gradient(135deg, #EEF2F6 0%, #E8ECF0 100%);
                    z-index: 1;
                    isolation: isolate;
                }

                .trail-title {
                    position: relative;
                    font-family: 'Lexend', sans-serif;
                    font-size: clamp(2.5rem, 6vw, 4rem);
                    font-weight: 700;
                    color: #162433;
                    z-index: 2;
                    pointer-events: none;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .trail-subtitle {
                    position: relative;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.125rem;
                    color: #68727C;
                    z-index: 2;
                    pointer-events: none;
                    text-align: center;
                    max-width: 700px;
                    padding: 0 1.5rem;
                    line-height: 1.7;
                }

                .trail-card-image {
                    position: absolute;
                    width: ${o}px;
                    height: auto;
                    max-height: ${o*.7}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 1;
                    border-radius: 10px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
                }

                @media (max-width: 768px) {
                    .cursor-trail-container {
                        min-height: 220px;
                    }
                    .trail-card-image {
                        width: 100px;
                        max-height: 70px;
                    }
                }
            `})]})}export{O as default};
