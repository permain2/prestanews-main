import{j as o}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.5eoMw82F.js";import{m as p}from"./proxy.Dx8v2PAo.js";import{A as g}from"./index.Btit3ATN.js";const x=[{id:"providers",label:"Top Picks",href:"#providers"},{id:"guide",label:"Buying Guide",href:"#guide"},{id:"compare",label:"Compare",href:"#compare"},{id:"methodology",label:"Methodology",href:"#methodology"},{id:"faq",label:"FAQ",href:"#faq"}];function f({item:r,isSelected:l,onClick:t}){return o.jsxs(p.a,{href:r.href,onClick:n=>{n.preventDefault(),t();const a=document.querySelector(r.href);a&&a.scrollIntoView({behavior:"smooth",block:"start"})},initial:{scale:1},whileTap:{scale:.95},className:"comparison-toggle-item",children:[o.jsx("span",{children:r.label}),o.jsx(g,{initial:!1,children:l&&o.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"comparison-selected-indicator",layoutId:"comparison-toc-indicator"})})]})}function v({items:r,category:l}){const t=r||x,[n,a]=d.useState(t[0]?.id||"providers");return d.useEffect(()=>{const i=()=>{const c=t.map(e=>({id:e.id,element:document.getElementById(e.id)})).filter(e=>e.element),m=window.scrollY+200;for(let e=c.length-1;e>=0;e--){const s=c[e];if(s.element&&s.element.offsetTop<=m){a(s.id);break}}};return window.addEventListener("scroll",i,{passive:!0}),()=>window.removeEventListener("scroll",i)},[t]),o.jsxs("nav",{className:"comparison-toc-container",role:"navigation","aria-label":"Page sections",children:[o.jsx("div",{className:"comparison-toc-group",children:t.map(i=>o.jsx(f,{item:i,isSelected:n===i.id,onClick:()=>a(i.id)},i.id))}),o.jsx("style",{children:`
                .comparison-toc-container {
                    width: 100%;
                    overflow-x: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .comparison-toc-container::-webkit-scrollbar {
                    display: none;
                }

                .comparison-toc-group {
                    display: flex;
                    width: 100%;
                    padding: 6px;
                    background: linear-gradient(135deg, #0D2C4B 0%, #1a3a5c 100%);
                    border-radius: 12px;
                    gap: 4px;
                    box-shadow: 
                        0 0 0 1px rgba(255, 255, 255, 0.05),
                        0 4px 20px rgba(0, 0, 0, 0.15);
                }

                .comparison-toggle-item {
                    flex: 1 1 0;
                    color: rgba(255, 255, 255, 0.7);
                    padding: 12px 8px;
                    border-radius: 8px;
                    display: inline-flex;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    line-height: 1;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    text-decoration: none;
                    white-space: nowrap;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }

                .comparison-toggle-item:hover {
                    color: rgba(255, 255, 255, 0.95);
                }

                .comparison-toggle-item > span {
                    position: relative;
                    z-index: 1;
                }

                .comparison-selected-indicator {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
                }

                .comparison-toggle-item:has(.comparison-selected-indicator) {
                    color: #ffffff;
                }

                @media (max-width: 768px) {
                    .comparison-toc-group {
                        padding: 5px;
                        gap: 3px;
                        border-radius: 10px;
                    }

                    .comparison-toggle-item {
                        padding: 10px 6px;
                        font-size: 0.6875rem;
                        border-radius: 6px;
                    }

                    .comparison-selected-indicator {
                        border-radius: 6px;
                    }
                }

                @media (max-width: 480px) {
                    .comparison-toggle-item {
                        padding: 8px 4px;
                        font-size: 0.625rem;
                    }
                }
            `})]})}export{v as default};
