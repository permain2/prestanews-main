import{j as c}from"./jsx-runtime.D_zvdyIk.js";import{e as V,r as X,m as N,d as Y}from"./proxy.Dx8v2PAo.js";import{r as g}from"./index.5eoMw82F.js";import"./index.C9kKzUNu.js";import{u as z,a as q}from"./use-pointer-position.CW7iYfRs.js";import"./index.BmS9Bzzq.js";import{a as O,w as U}from"./index.Dbh5LEKj.js";import{u as G}from"./use-transform.x9-mPL9h.js";import{A as J}from"./index.Btit3ATN.js";import"./index.B4vNfNLm.js";import"./use-motion-value.14dBj_fk.js";function K(o,a){if(o==="first")return 0;{const t=a-1;return o==="last"?t:t/2}}function Q(o=.1,{startDelay:a=0,from:t=0,ease:y}={}){return(h,d)=>{const u=typeof t=="number"?t:K(t,d),x=Math.abs(u-h);let f=o*x;if(y){const e=d*o;f=V(y)(f/e)*e}return a+f}}function F(o,a){const t=document.createElement("span");return o&&(t.className=o),a!==void 0&&(t.dataset.index=a.toString()),t.style.display="inline-block",t}function M(o,a,t,y){const h=F(t,y);return h.textContent=a,o.appendChild(h),h}function W(o,{splitBy:a=" ",charClass:t="split-char",wordClass:y="split-word",lineClass:h="split-line"}={}){const[d]=X(o),u=d.textContent||"";d.setAttribute("aria-label",u),d.textContent="";const x={chars:[],words:[],lines:[]},f=u.split(a),e=[],v=[];for(let n=0;n<f.length;n++){const p=f[n],r=F(y,n);x.words.push(r),e.push(r);const i=Array.from(p);for(let m=0;m<i.length;m++){const k=i[m],C=M(r,k,t,m);x.chars.push(C)}if(d.appendChild(r),n<f.length-1)if(a===" "){const m=document.createTextNode(" ");d.appendChild(m),v.push(m)}else{const m=M(r,a,`${t}-delimiter`);x.chars.push(m)}}const b=e.map((n,p)=>({element:n,top:n.offsetTop,index:p,spacer:p<v.length?v[p]:null})),w=[];let l=[],I=b[0]?.top??0,$=0;for(let n=0;n<b.length;n++){const{element:p,top:r,spacer:i}=b[n];r>I&&l.length>0&&(w.push({elements:l,lineIndex:$++}),l=[],I=r),l.push(p),i&&l.push(i)}l.length>0&&w.push({elements:l,lineIndex:$}),d.textContent="";for(const{elements:n,lineIndex:p}of w){const r=F(h,p);r.style.display="inline-block",x.lines.push(r);for(const i of n)r.appendChild(i);d.appendChild(r)}return x}const S=["/credit-cards/citi-diamond-preferred.png","/credit-cards/wells-fargo-reflect.png","/credit-cards/bankamericard.png","/credit-cards/discover-it-balance-transfer.png","/credit-cards/us-bank-visa-platinum.png","/credit-cards/chase-slate-edge.png","/credit-cards/blue-cash-preferred.png","/credit-cards/blue-cash-everyday.png","/credit-cards/amex-cash-magnet.png","/credit-cards/citi-double-cash.png","/credit-cards/chase-sapphire-preferred.png","/credit-cards/capital-one-venture-x.png"];function ce({title:o,kicker:a="TRAVEL CARDS",subtitle:t,author:y="Screened Editorial Team",date:h="Dec. 10, 2025",fadeOutDuration:d=1.5,imageSize:u=160,spawnDistance:x=100,velocityFactor:f=.08,compact:e=!1,animateTitle:v=!1}){const b=g.useRef(0),w=g.useRef(0),l=g.useRef(void 0),[I,$]=g.useState([]),n=g.useRef(null),[p,r]=g.useState(!1),i=z(),m=G(()=>{if(!p)return 0;const s=i.x.get(),E=i.y.get(),j=s-(i.x.getPrevious()??s),R=E-(i.y.getPrevious()??E);return Math.sqrt(j*j+R*R)});q(m,"change",s=>{if(p){if(l.current===void 0){l.current=0;return}l.current+=s,l.current>=x&&(B(i.x.get(),i.y.get()),l.current=0)}});const k=g.useRef(null),C=g.useRef(!1);g.useEffect(()=>{!v||C.current||document.fonts.ready.then(()=>{if(!k.current)return;k.current.style.visibility="visible";const{words:s}=W(k.current);O(s,{opacity:[0,1],y:[15,0]},{type:"spring",duration:1.2,bounce:0,delay:Q(.035,{})}),C.current=!0})},[v]);const B=(s,E)=>{if(!n.current)return;const j=n.current.getBoundingClientRect(),R=s-j.left,H=E-j.top,P={id:w.current++,x:R-u/2,y:H-u/2,imageIndex:b.current,velocityX:i.x.getVelocity(),velocityY:i.y.getVelocity()};$(D=>[...D,P]),b.current=U(0,S.length,b.current+1),Y(()=>{$(D=>D.filter(L=>L.id!==P.id))},d)},T=e?220:320,A=e?180:280;return c.jsxs("div",{ref:n,className:`cursor-trail-dark-container ${e?"compact":""}`,onMouseEnter:()=>r(!0),onMouseLeave:()=>{r(!1),l.current=void 0},children:[c.jsx("div",{className:"trail-images-layer",children:c.jsx(J,{children:I.map(s=>c.jsx(N.img,{className:"trail-card-dark",src:S[s.imageIndex],alt:"",style:{left:s.x,top:s.y,willChange:"opacity, transform"},initial:{opacity:0,scale:.5,rotate:-15},animate:{opacity:.25,scale:1,rotate:Math.random()*30-15,x:0,y:0},transition:{duration:.15,x:{type:"inertia",velocity:s.velocityX*f},y:{type:"inertia",velocity:s.velocityY*f}},exit:{opacity:0,scale:.3,transition:{duration:.5}}},s.id))})}),c.jsx("div",{className:"dark-overlay"}),c.jsxs("div",{className:"content-layer",children:[a&&c.jsx(N.span,{className:"trail-kicker",initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{delay:.1,duration:.4},children:a}),c.jsx("h1",{ref:k,className:`trail-dark-title ${v?"animated":""}`,children:o}),c.jsx(N.p,{className:"trail-dark-subtitle",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.6,duration:.5},children:t}),c.jsxs(N.div,{className:"trail-meta",initial:{opacity:0},animate:{opacity:1},transition:{delay:.8,duration:.4},children:[c.jsxs("span",{children:["By ",y]}),c.jsx("span",{children:"•"}),c.jsxs("span",{children:["Updated ",h]})]})]}),c.jsx("style",{children:`
                .cursor-trail-dark-container {
                    position: relative;
                    width: 100%;
                    min-height: ${T}px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: #0D2C4B;
                }

                .cursor-trail-dark-container.compact {
                    min-height: ${T}px;
                }

                .trail-images-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1;
                }

                .dark-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(13, 44, 75, 0.7);
                    z-index: 2;
                    pointer-events: none;
                }

                .content-layer {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    padding: ${e?"0 1.5rem":"0 2rem"};
                    pointer-events: none;
                }

                .trail-kicker {
                    display: inline-block;
                    font-family: 'Poppins', sans-serif;
                    font-size: ${e?"0.75rem":"0.875rem"};
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    color: #3B82F6;
                    text-transform: uppercase;
                    margin-bottom: ${e?"0.5rem":"1rem"};
                }

                .trail-dark-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: ${e?"clamp(1.5rem, 4vw, 2.25rem)":"clamp(2rem, 5vw, 3rem)"};
                    font-weight: 700;
                    color: #FFFFFF !important;
                    line-height: 1.2;
                    margin-bottom: ${e?"0.5rem":"1rem"};
                    max-width: ${e?"650px":"800px"};
                }

                .trail-dark-title.animated {
                    visibility: hidden;
                }

                .trail-dark-title .split-word {
                    will-change: transform, opacity;
                    display: inline-block;
                }

                .trail-dark-subtitle {
                    font-family: 'Poppins', sans-serif;
                    font-size: ${e?"1rem":"1.25rem"};
                    color: #CBD5E1;
                    line-height: 1.6;
                    max-width: ${e?"550px":"700px"};
                    margin: 0 auto ${e?"0.75rem":"1.5rem"};
                }

                .trail-meta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    font-family: 'Poppins', sans-serif;
                    font-size: ${e?"0.75rem":"0.875rem"};
                    color: #94A3B8;
                }

                .trail-card-dark {
                    position: absolute;
                    width: ${e?u*.75:u}px;
                    height: auto;
                    max-height: ${(e?u*.75:u)*.7}px;
                    object-fit: contain;
                    pointer-events: none;
                    border-radius: 10px;
                    filter: blur(1px);
                }

                @media (max-width: 768px) {
                    .cursor-trail-dark-container {
                        min-height: ${A}px;
                    }
                    .cursor-trail-dark-container.compact {
                        min-height: ${A}px;
                    }
                    .trail-card-dark {
                        width: ${e?"70px":"100px"};
                        max-height: ${e?"50px":"70px"};
                    }
                    .trail-dark-subtitle {
                        font-size: ${e?"0.875rem":"1rem"};
                    }
                    .content-layer {
                        padding: 0 1rem;
                    }
                }
            `})]})}export{ce as default};
