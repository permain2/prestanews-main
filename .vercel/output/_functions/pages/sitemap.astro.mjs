import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BztIZ2OU.mjs';
export { renderers } from '../renderers.mjs';

const $$Sitemap = createComponent(($$result, $$props, $$slots) => {
  const sections = [
    {
      title: "Credit Cards",
      links: [
        { name: "All Credit Cards", href: "/credit-cards" },
        { name: "Best Travel Cards", href: "/credit-cards/best-travel-cards" },
        { name: "Best Cash Back Cards", href: "/credit-cards/best-cashback" },
        { name: "Business Cards", href: "/credit-cards/business" },
        { name: "No Annual Fee Cards", href: "/credit-cards/no-annual-fee" }
      ]
    },
    {
      title: "Insurance",
      links: [
        { name: "All Insurance", href: "/insurance" },
        { name: "Car Insurance", href: "/insurance/car" },
        { name: "Home Insurance", href: "/insurance/home" },
        { name: "Renters Insurance", href: "/insurance/renters" },
        { name: "Life Insurance", href: "/insurance/life" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Reviews", href: "/reviews" },
        { name: "Newsletter", href: "/newsletter" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Newsletter", href: "/newsletter" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Use", href: "/terms" },
        { name: "Advertising", href: "/advertising" }
      ]
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Sitemap", "description": "Browse all pages on PrestaNews." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-[#0D2C4B] to-[#1A4A7A] py-12"> <div class="max-w-4xl mx-auto px-4 md:px-8 text-center"> <h1 class="font-sora text-4xl font-bold mb-4" style="color: #FFFFFF !important;">Sitemap</h1> <p style="color: rgba(255,255,255,0.8) !important;">Browse all pages on PrestaNews</p> </div> </section>  <section class="py-16 bg-white"> <div class="max-w-[90rem] mx-auto px-4 md:px-8"> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12"> ${sections.map((section) => renderTemplate`<div> <h2 class="font-sora font-bold text-xl text-[#162433] mb-4 pb-2 border-b border-gray-200">${section.title}</h2> <ul class="space-y-3"> ${section.links.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-[#68727C] hover:text-[#3B82F6] transition-colors">${link.name}</a> </li>`)} </ul> </div>`)} </div> </div> </section> ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/sitemap.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/sitemap.astro";
const $$url = "/sitemap";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Sitemap,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
