import{j as i}from"./jsx-runtime.D_zvdyIk.js";import{r as e}from"./index.5eoMw82F.js";import{A as u}from"./index.Btit3ATN.js";import{m as b}from"./proxy.Dx8v2PAo.js";const s=[{name:"Chris W.",location:"Sheridan, Wyoming",card:"Chase Sapphire Preferred",flag:"🇺🇸",timeAgo:"2 min ago"},{name:"Sarah M.",location:"Austin, Texas",card:"Capital One Venture X",flag:"🇺🇸",timeAgo:"5 min ago"},{name:"Michael T.",location:"Denver, Colorado",card:"Amex Gold Card",flag:"🇺🇸",timeAgo:"8 min ago"},{name:"Emily R.",location:"Seattle, Washington",card:"Chase Sapphire Reserve",flag:"🇺🇸",timeAgo:"12 min ago"},{name:"David L.",location:"Miami, Florida",card:"Capital One Venture",flag:"🇺🇸",timeAgo:"15 min ago"},{name:"Jessica K.",location:"Chicago, Illinois",card:"Citi Strata Premier",flag:"🇺🇸",timeAgo:"18 min ago"},{name:"Robert P.",location:"Phoenix, Arizona",card:"Amex Platinum",flag:"🇺🇸",timeAgo:"22 min ago"},{name:"Amanda S.",location:"Portland, Oregon",card:"Wells Fargo Autograph",flag:"🇺🇸",timeAgo:"25 min ago"},{name:"James B.",location:"San Diego, California",card:"United Explorer Card",flag:"🇺🇸",timeAgo:"28 min ago"},{name:"Lauren H.",location:"Nashville, Tennessee",card:"Hilton Aspire",flag:"🇺🇸",timeAgo:"32 min ago"}],v={Wyoming:"🏔️",Texas:"⭐",Colorado:"🏔️",Washington:"🌲",Florida:"🌴",Illinois:"🌆",Arizona:"🌵",Oregon:"🌲",California:"☀️",Tennessee:"🎸"};function y({initialDelay:c=3e3,interval:l=12e4,displayDuration:d=5e3,showInitialBatch:p=1}){const[m,n]=e.useState([]),[x,g]=e.useState(0),[f,h]=e.useState(0),r=()=>{const o={...s[x%s.length],id:f,timeAgo:"Just now"};n(t=>[...t.slice(-2),o]),g(t=>t+1),h(t=>t+1),setTimeout(()=>{n(t=>t.filter(a=>a.id!==o.id))},d)};return e.useEffect(()=>{const o=setTimeout(()=>{for(let a=0;a<p;a++)setTimeout(()=>r(),a*500)},c),t=setInterval(()=>{r()},l);return()=>{clearTimeout(o),clearInterval(t)}},[]),i.jsxs("div",{id:"signup-notifications",children:[i.jsx(u,{initial:!1,mode:"popLayout",children:m.map(o=>i.jsxs(b.div,{className:"notification-toast",layout:!0,initial:{opacity:0,x:50,scale:.9},animate:{opacity:1,x:0,scale:1},exit:{opacity:0,x:50,scale:.9,transition:{duration:.2}},children:[i.jsx("div",{className:"notification-avatar",children:i.jsxs("svg",{className:"avatar-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[i.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",strokeLinecap:"round",strokeLinejoin:"round"}),i.jsx("circle",{cx:"12",cy:"7",r:"4",strokeLinecap:"round",strokeLinejoin:"round"})]})}),i.jsxs("div",{className:"notification-content",children:[i.jsxs("div",{className:"notification-header",children:[i.jsx("span",{className:"notification-name",children:o.name}),i.jsx("span",{className:"notification-flag",children:v[o.location.split(", ")[1]]||o.flag})]}),i.jsxs("div",{className:"notification-message",children:["Applied for ",i.jsx("strong",{children:o.card})]}),i.jsxs("div",{className:"notification-location",children:[o.location," • ",o.timeAgo]})]}),i.jsx("button",{className:"notification-close",onClick:()=>n(t=>t.filter(a=>a.id!==o.id)),"aria-label":"Dismiss",children:i.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:i.jsx("path",{d:"M18 6L6 18M6 6l12 12",strokeLinecap:"round",strokeLinejoin:"round"})})})]},o.id))}),i.jsx("style",{children:`
                #signup-notifications {
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    pointer-events: none;
                    width: 100%;
                    max-width: 340px;
                }

                .notification-toast {
                    position: relative;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-radius: 14px;
                    padding: 14px 16px;
                    box-shadow: 
                        0 0 0 1px rgba(0, 0, 0, 0.04),
                        0 4px 20px rgba(0, 0, 0, 0.08),
                        0 12px 40px rgba(0, 0, 0, 0.12);
                    pointer-events: all;
                    width: 100%;
                    max-width: 340px;
                }

                .notification-avatar {
                    flex-shrink: 0;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .avatar-icon {
                    width: 20px;
                    height: 20px;
                    stroke: white;
                }

                .notification-content {
                    flex: 1;
                    min-width: 0;
                }

                .notification-header {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 2px;
                }

                .notification-name {
                    font-weight: 600;
                    font-size: 14px;
                    color: #0f172a;
                }

                .notification-flag {
                    font-size: 12px;
                }

                .notification-message {
                    font-size: 13px;
                    color: #334155;
                    line-height: 1.4;
                    margin-bottom: 4px;
                }

                .notification-message strong {
                    color: #0066B2;
                    font-weight: 600;
                }

                .notification-location {
                    font-size: 11px;
                    color: #64748b;
                }

                .notification-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 24px;
                    height: 24px;
                    border: none;
                    background: transparent;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    opacity: 0;
                    transition: all 0.2s ease;
                    color: #94a3b8;
                }

                .notification-toast:hover .notification-close {
                    opacity: 1;
                }

                .notification-close:hover {
                    background: #f1f5f9;
                    color: #64748b;
                }

                /* Mobile styles - top right */
                @media (max-width: 640px) {
                    #signup-notifications {
                        top: 70px;
                        right: 12px;
                        max-width: calc(100% - 24px);
                    }

                    .notification-toast {
                        max-width: 100%;
                        padding: 12px 14px;
                        border-radius: 12px;
                    }

                    .notification-avatar {
                        width: 36px;
                        height: 36px;
                    }

                    .avatar-icon {
                        width: 18px;
                        height: 18px;
                    }

                    .notification-name {
                        font-size: 13px;
                    }

                    .notification-message {
                        font-size: 12px;
                    }

                    .notification-close {
                        opacity: 1;
                    }
                }

                /* Dark mode support */
                @media (prefers-color-scheme: dark) {
                    .notification-toast {
                        background: rgba(30, 41, 59, 0.98);
                        box-shadow: 
                            0 0 0 1px rgba(255, 255, 255, 0.06),
                            0 4px 20px rgba(0, 0, 0, 0.3),
                            0 12px 40px rgba(0, 0, 0, 0.4);
                    }

                    .notification-name {
                        color: #f1f5f9;
                    }

                    .notification-message {
                        color: #cbd5e1;
                    }

                    .notification-message strong {
                        color: #60a5fa;
                    }

                    .notification-location {
                        color: #94a3b8;
                    }

                    .notification-close {
                        color: #64748b;
                    }

                    .notification-close:hover {
                        background: rgba(255, 255, 255, 0.1);
                        color: #94a3b8;
                    }
                }
            `})]})}export{y as default};
