import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.5eoMw82F.js";import"./index.C9kKzUNu.js";import{u as M,a as F}from"./use-pointer-position.CW7iYfRs.js";import"./index.BmS9Bzzq.js";import{m as N,d as X}from"./proxy.Dx8v2PAo.js";import{u as Y}from"./use-transform.x9-mPL9h.js";import{A as k}from"./index.Btit3ATN.js";import{w as B}from"./index.Dbh5LEKj.js";import"./index.B4vNfNLm.js";import"./use-motion-value.14dBj_fk.js";const L=["/cursor-trail/cards/amex-platinum.png","/cursor-trail/cards/amex-gold.png","/cursor-trail/cards/chase-sapphire-preferred.png","/cursor-trail/cards/capital-one-venture-x.png","/cursor-trail/cards/citi-double-cash.png","/cursor-trail/cards/blue-cash-preferred.png","/cursor-trail/cards/discover-it-balance-transfer.png","/cursor-trail/cards/delta-skymiles-reserve.png"],T=["/cursor-trail/insurance/geico.png","/cursor-trail/insurance/progressive.png","/cursor-trail/insurance/statefarm.png","/cursor-trail/insurance/allstate.png","/cursor-trail/insurance/lemonade.png","/cursor-trail/insurance/nationwide.png","/cursor-trail/insurance/prudential.png"],g=[...L.map(a=>({src:a,type:"card"})),...T.map(a=>({src:a,type:"insurance"}))];function Q({fadeOutDuration:a=1.5,cardSize:m=120,logoSize:p=80,spawnDistance:j=90,velocityFactor:x=.08}){const s=i.useRef(0),I=i.useRef(0),r=i.useRef(void 0),[E,f]=i.useState([]),u=i.useRef(null),[h,y]=i.useState(!1),t=M(),R=Y(()=>{if(!h)return 0;const e=t.x.get(),c=t.y.get(),o=e-(t.x.getPrevious()??e),l=c-(t.y.getPrevious()??c);return Math.sqrt(o*o+l*l)});F(R,"change",e=>{if(h){if(r.current===void 0){r.current=0;return}r.current+=e,r.current>=j&&(C(t.x.get(),t.y.get()),r.current=0)}});const C=(e,c)=>{if(!u.current)return;const o=u.current.getBoundingClientRect(),l=e-o.left,P=c-o.top,v=g[s.current],b=v.type==="card"?m:p,w={id:I.current++,x:l-b/2,y:P-b/2,imageIndex:s.current,velocityX:t.x.getVelocity(),velocityY:t.y.getVelocity(),type:v.type};f(d=>[...d,w]),s.current=B(0,g.length,s.current+1),X(()=>{f(d=>d.filter(z=>z.id!==w.id))},a)};return n.jsxs("div",{ref:u,className:"cursor-trail-container-blog",onMouseEnter:()=>y(!0),onMouseLeave:()=>{y(!1),r.current=void 0},children:[n.jsx("div",{className:"trail-title-blog",children:"Blog"}),n.jsx(k,{children:E.map(e=>n.jsx(N.img,{className:e.type==="card"?"trail-blog-card":"trail-blog-insurance",src:g[e.imageIndex].src,alt:"",style:{left:e.x,top:e.y,willChange:"opacity, transform"},initial:{opacity:0,scale:.5,rotate:-10},animate:{opacity:1,scale:1,rotate:Math.random()*20-10,x:0,y:0},transition:{duration:.15,x:{type:"inertia",velocity:e.velocityX*x},y:{type:"inertia",velocity:e.velocityY*x}},exit:{opacity:0,scale:.3,transition:{duration:.4}}},e.id))}),n.jsx("p",{className:"trail-subtitle-blog",children:"Expert insights on credit cards, insurance, travel rewards, and personal finance. Stay informed with the latest news and guides."}),n.jsx("style",{children:`
                .cursor-trail-container-blog {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: linear-gradient(135deg, #F0F4FF 0%, #E8EEF8 100%);
                    z-index: 1;
                    isolation: isolate;
                }

                .trail-title-blog {
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

                .trail-subtitle-blog {
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

                .trail-blog-card {
                    position: absolute;
                    width: ${m}px;
                    height: auto;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 1;
                    border-radius: 8px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
                }

                .trail-blog-insurance {
                    position: absolute;
                    width: ${p}px;
                    height: ${p}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 1;
                    border-radius: 10px;
                    background: white;
                    padding: 8px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 768px) {
                    .cursor-trail-container-blog {
                        min-height: 220px;
                    }
                    .trail-blog-card {
                        width: 80px;
                    }
                    .trail-blog-insurance {
                        width: 60px;
                        height: 60px;
                        padding: 5px;
                    }
                }
            `})]})}export{Q as default};
