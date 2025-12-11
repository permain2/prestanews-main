import { e as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate } from './astro/server_DKBvgln8.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://www.screened.com");
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostCard;
  const { title, description, href, category, image, author, date } = Astro2.props;
  const categoryGradients = {
    "Travel Rewards": "linear-gradient(135deg, #1a365d 0%, #2563eb 100%)",
    "Cash Back": "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
    "Business": "linear-gradient(135deg, #374151 0%, #6b7280 100%)",
    "No Annual Fee": "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
    "Balance Transfer": "linear-gradient(135deg, #0369a1 0%, #38bdf8 100%)",
    "Auto Insurance": "linear-gradient(135deg, #dc2626 0%, #f87171 100%)",
    "Homeowners Insurance": "linear-gradient(135deg, #ea580c 0%, #fb923c 100%)",
    "Renters Insurance": "linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)",
    "Life Insurance": "linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)",
    "Airlines": "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
    "Hotels": "linear-gradient(135deg, #b45309 0%, #fbbf24 100%)",
    "Credit Cards": "linear-gradient(135deg, #0d2c4b 0%, #1a4a7a 100%)",
    "Points & Miles": "linear-gradient(135deg, #9333ea 0%, #c084fc 100%)",
    "Personal Finance": "linear-gradient(135deg, #059669 0%, #34d399 100%)",
    "Credit Card Bonus": "linear-gradient(135deg, #f59e0b 0%, #fcd34d 100%)",
    "Flights": "linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%)",
    "Points Sale": "linear-gradient(135deg, #8b5cf6 0%, #c4b5fd 100%)"
  };
  const defaultGradient = "linear-gradient(135deg, #0D2C4B 0%, #1a3d5c 100%)";
  const gradient = category ? categoryGradients[category] || defaultGradient : defaultGradient;
  const categoryIcons = {
    "Travel Rewards": "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5",
    "Cash Back": "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    "Business": "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z",
    "Auto Insurance": "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
    "Homeowners Insurance": "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    "Renters Insurance": "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819",
    "Life Insurance": "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
  };
  const defaultIcon = "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z";
  const iconPath = category ? categoryIcons[category] || defaultIcon : defaultIcon;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="post-card" data-astro-cid-iyiqi2so> <!-- Image --> <div class="card-image" data-astro-cid-iyiqi2so> ${image && !image.includes("placeholder") ? renderTemplate`<img${addAttribute(image, "src")}${addAttribute(title, "alt")} data-astro-cid-iyiqi2so>` : renderTemplate`<div class="image-placeholder"${addAttribute(`background: ${gradient};`, "style")} data-astro-cid-iyiqi2so> <div class="placeholder-content" data-astro-cid-iyiqi2so> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="placeholder-icon" data-astro-cid-iyiqi2so> <path stroke-linecap="round" stroke-linejoin="round"${addAttribute(iconPath, "d")} data-astro-cid-iyiqi2so></path> </svg> ${category && renderTemplate`<span class="placeholder-label" data-astro-cid-iyiqi2so>${category}</span>`} </div> </div>`} </div> <!-- Content --> <div class="card-content" data-astro-cid-iyiqi2so> ${category && renderTemplate`<span class="card-category" data-astro-cid-iyiqi2so>${category}</span>`} <h3 class="card-title" data-astro-cid-iyiqi2so>${title}</h3> <p class="card-description" data-astro-cid-iyiqi2so>${description}</p> ${(author || date) && renderTemplate`<div class="card-meta" data-astro-cid-iyiqi2so> ${author && renderTemplate`<span class="card-author" data-astro-cid-iyiqi2so>${author}</span>`} ${author && date && renderTemplate`<span class="meta-separator" data-astro-cid-iyiqi2so>•</span>`} ${date && renderTemplate`<span class="card-date" data-astro-cid-iyiqi2so>${date}</span>`} </div>`} </div> </a> `;
}, "/Users/permain2/affiliatewebsite/src/components/PostCard.astro", void 0);

export { $$PostCard as $ };
