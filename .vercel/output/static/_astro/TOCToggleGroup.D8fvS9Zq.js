import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.5eoMw82F.js";import{m as d}from"./proxy.Dx8v2PAo.js";import{A as g}from"./index.Btit3ATN.js";const c=[{id:"cards",label:"All Cards",href:"#cards"},{id:"how-rewards-work",label:"How Rewards Work",href:"#how-rewards-work"},{id:"how-to-choose",label:"How to Choose",href:"#how-to-choose"},{id:"best-by-category",label:"By Category",href:"#best-by-category"},{id:"compare-table",label:"Compare",href:"#compare-table"},{id:"methodology",label:"Methodology",href:"#methodology"},{id:"faq",label:"FAQ",href:"#faq"}];function p({item:r,isSelected:i,onClick:e}){return t.jsxs(d.a,{href:r.href,onClick:a=>{a.preventDefault(),e();const l=document.querySelector(r.href);l&&l.scrollIntoView({behavior:"smooth",block:"start"})},initial:{scale:1},whileTap:{scale:.95},className:"toggle-item",children:[t.jsx("span",{children:r.label}),t.jsx(g,{initial:!1,children:i&&t.jsx(d.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"selected-indicator",layoutId:"toc-selected-indicator"})})]})}function b(){const[r,i]=s.useState("cards");return s.useEffect(()=>{const e=()=>{const a=c.map(o=>({id:o.id,element:document.getElementById(o.id)})).filter(o=>o.element),l=window.scrollY+150;for(let o=a.length-1;o>=0;o--){const n=a[o];if(n.element&&n.element.offsetTop<=l){i(n.id);break}}};return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]),t.jsxs("nav",{className:"toc-toggle-container",role:"navigation","aria-label":"Page sections",children:[t.jsx("div",{className:"toc-toggle-group",children:c.map(e=>t.jsx(p,{item:e,isSelected:r===e.id,onClick:()=>i(e.id)},e.id))}),t.jsx("style",{children:`
                .toc-toggle-container {
                    width: 100%;
                    overflow-x: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .toc-toggle-container::-webkit-scrollbar {
                    display: none;
                }

                .toc-toggle-group {
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

                .toggle-item {
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

                .toggle-item:hover {
                    color: rgba(255, 255, 255, 0.95);
                }

                .toggle-item > span {
                    position: relative;
                    z-index: 1;
                }

                .selected-indicator {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
                }

                .toggle-item:has(.selected-indicator) {
                    color: #ffffff;
                }

                @media (max-width: 768px) {
                    .toc-toggle-group {
                        padding: 5px;
                        gap: 3px;
                        border-radius: 10px;
                    }

                    .toggle-item {
                        padding: 10px 6px;
                        font-size: 0.6875rem;
                        border-radius: 6px;
                    }

                    .selected-indicator {
                        border-radius: 6px;
                    }
                }

                @media (max-width: 480px) {
                    .toggle-item {
                        padding: 8px 4px;
                        font-size: 0.625rem;
                    }
                }
            `})]})}export{b as default};
