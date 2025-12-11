import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.5eoMw82F.js";import"./index.C9kKzUNu.js";import{u as P,a as C}from"./use-pointer-position.CW7iYfRs.js";import"./index.BmS9Bzzq.js";import{u as M}from"./use-transform.x9-mPL9h.js";import{A as N}from"./index.Btit3ATN.js";import{m as X,d as Y}from"./proxy.Dx8v2PAo.js";import{w as F}from"./index.Dbh5LEKj.js";import"./index.B4vNfNLm.js";import"./use-motion-value.14dBj_fk.js";const h=["/cursor-trail/insurance/geico.png","/cursor-trail/insurance/progressive.png","/cursor-trail/insurance/statefarm.png","/cursor-trail/insurance/allstate.png","/cursor-trail/insurance/lemonade.png","/cursor-trail/insurance/nationwide.png","/cursor-trail/insurance/prudential.png"];function O({fadeOutDuration:v=1.5,imageSize:s=100,spawnDistance:y=100,velocityFactor:d=.08}){const l=i.useRef(0),w=i.useRef(0),r=i.useRef(void 0),[b,m]=i.useState([]),u=i.useRef(null),[g,x]=i.useState(!1),t=P(),I=M(()=>{if(!g)return 0;const e=t.x.get(),a=t.y.get(),o=e-(t.x.getPrevious()??e),c=a-(t.y.getPrevious()??a);return Math.sqrt(o*o+c*c)});C(I,"change",e=>{if(g){if(r.current===void 0){r.current=0;return}r.current+=e,r.current>=y&&(j(t.x.get(),t.y.get()),r.current=0)}});const j=(e,a)=>{if(!u.current)return;const o=u.current.getBoundingClientRect(),c=e-o.left,E=a-o.top,f={id:w.current++,x:c-s/2,y:E-s/2,imageIndex:l.current,velocityX:t.x.getVelocity(),velocityY:t.y.getVelocity()};m(p=>[...p,f]),l.current=F(0,h.length,l.current+1),Y(()=>{m(p=>p.filter(R=>R.id!==f.id))},v)};return n.jsxs("div",{ref:u,className:"cursor-trail-container-insurance",onMouseEnter:()=>x(!0),onMouseLeave:()=>{x(!1),r.current=void 0},children:[n.jsx("div",{className:"trail-title-insurance",children:"Insurance"}),n.jsx(N,{children:b.map(e=>n.jsx(X.img,{className:"trail-logo-image",src:h[e.imageIndex],alt:"",style:{left:e.x,top:e.y,willChange:"opacity, transform"},initial:{opacity:0,scale:.5,rotate:-10},animate:{opacity:1,scale:1,rotate:Math.random()*20-10,x:0,y:0},transition:{duration:.15,x:{type:"inertia",velocity:e.velocityX*d},y:{type:"inertia",velocity:e.velocityY*d}},exit:{opacity:0,scale:.3,transition:{duration:.4}}},e.id))}),n.jsx("p",{className:"trail-subtitle-insurance",children:"Find the right insurance coverage for your needs. Our experts review and compare the best providers for auto, home, renters, and life insurance."}),n.jsx("style",{children:`
                .cursor-trail-container-insurance {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: linear-gradient(135deg, #E8F4F8 0%, #E0EEF4 100%);
                }

                .trail-title-insurance {
                    position: relative;
                    font-family: 'Lexend', sans-serif;
                    font-size: clamp(2.5rem, 6vw, 4rem);
                    font-weight: 700;
                    color: #162433;
                    z-index: 50;
                    pointer-events: none;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .trail-subtitle-insurance {
                    position: relative;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.125rem;
                    color: #68727C;
                    z-index: 50;
                    pointer-events: none;
                    text-align: center;
                    max-width: 700px;
                    padding: 0 1.5rem;
                    line-height: 1.7;
                }

                .trail-logo-image {
                    position: absolute;
                    width: ${s}px;
                    height: ${s}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    border-radius: 12px;
                    background: white;
                    padding: 10px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 768px) {
                    .cursor-trail-container-insurance {
                        min-height: 220px;
                    }
                    .trail-logo-image {
                        width: 70px;
                        height: 70px;
                        padding: 6px;
                    }
                }
            `})]})}export{O as default};
