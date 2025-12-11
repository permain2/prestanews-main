import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BztIZ2OU.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const categories = [
    { name: "Airlines", slug: "airlines", description: "Airline news, reviews, and loyalty programs" },
    { name: "Hotels", slug: "hotels", description: "Hotel reviews and elite status guides" },
    { name: "Cruises", slug: "cruises", description: "Cruise line reviews and booking tips" },
    { name: "Destinations", slug: "destinations", description: "Travel guides for cities worldwide" },
    { name: "Airport Lounges", slug: "airport-lounges", description: "Lounge access and reviews" }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Travel", "description": "Travel news, guides, and tips.", "data-astro-cid-iudopeso": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="collection-page" data-astro-cid-iudopeso> <!-- Header --> <header class="page-header" data-astro-cid-iudopeso> <div class="container-main" data-astro-cid-iudopeso> <h1 data-astro-cid-iudopeso>Travel</h1> <p data-astro-cid-iudopeso>Breaking news and stories covering travel, hotels, and aviation.</p> </div> </header> <!-- Categories --> <section class="categories-section" data-astro-cid-iudopeso> <div class="container-main" data-astro-cid-iudopeso> <nav class="category-nav" data-astro-cid-iudopeso> ${categories.map((cat) => renderTemplate`<a${addAttribute(`/travel/${cat.slug}`, "href")} class="btn-filter" data-astro-cid-iudopeso>${cat.name}</a>`)} </nav> </div> </section> <!-- Content Area --> <section class="content-section" data-astro-cid-iudopeso> <div class="container-main" data-astro-cid-iudopeso> <p class="placeholder-text" data-astro-cid-iudopeso>Articles coming soon. Check back for the latest travel news and guides.</p> </div> </section> </div> ` })} `;
}, "/Users/permain2/affiliatewebsite/src/pages/travel/index.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/travel/index.astro";
const $$url = "/travel";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
