import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_DvAyv4g9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Airlines = createComponent(($$result, $$props, $$slots) => {
  const airlines = [
    { name: "American Airlines", logo: "AA", color: "#0078D2", articles: 28 },
    { name: "Delta Air Lines", logo: "DL", color: "#003366", articles: 32 },
    { name: "United Airlines", logo: "UA", color: "#002244", articles: 25 },
    { name: "Southwest Airlines", logo: "WN", color: "#304CB2", articles: 18 },
    { name: "JetBlue Airways", logo: "B6", color: "#003087", articles: 15 },
    { name: "Alaska Airlines", logo: "AS", color: "#01426A", articles: 12 }
  ];
  const articles = [
    {
      title: "American Airlines AAdvantage Program: Complete Guide 2025",
      excerpt: "Everything you need to know about earning and redeeming AAdvantage miles.",
      category: "Loyalty Programs",
      date: "Dec 8, 2025",
      readTime: "12 min"
    },
    {
      title: "Best Ways to Earn Delta SkyMiles in 2025",
      excerpt: "Maximize your Delta SkyMiles earning with these proven strategies.",
      category: "Earning Miles",
      date: "Dec 6, 2025",
      readTime: "8 min"
    },
    {
      title: "United Polaris Business Class Review",
      excerpt: "An in-depth look at United's premium international business class product.",
      category: "Reviews",
      date: "Dec 4, 2025",
      readTime: "10 min"
    },
    {
      title: "Southwest Companion Pass: How to Earn It in 2025",
      excerpt: "The ultimate guide to earning Southwest's valuable Companion Pass.",
      category: "Guides",
      date: "Dec 2, 2025",
      readTime: "15 min"
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Airlines - Travel Guides", "description": "Airline reviews, loyalty program guides, and flight booking tips." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-[#0D2C4B] to-[#1A4A7A] py-16"> <div class="max-w-[90rem] mx-auto px-4 md:px-8"> <nav class="text-sm text-gray-400 mb-4"> <a href="/" class="hover:text-white">Home</a> /
<a href="/travel" class="hover:text-white">Travel</a> /
<span class="text-white">Airlines</span> </nav> <h1 class="font-sora text-4xl md:text-5xl font-bold text-white mb-4">Airlines</h1> <p class="text-xl text-gray-300 max-w-2xl">Reviews, loyalty programs, and booking strategies for all major airlines.</p> </div> </section>  <section class="py-12 bg-white border-b border-gray-200"> <div class="max-w-[90rem] mx-auto px-4 md:px-8"> <h2 class="font-sora text-2xl font-bold text-[#162433] mb-6">Browse by Airline</h2> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> ${airlines.map((airline) => renderTemplate`<a${addAttribute(`/travel/airlines/${airline.name.toLowerCase().replace(/\s+/g, "-")}`, "href")} class="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-[#3B82F6] hover:shadow-lg transition-all"> <div class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3"${addAttribute(`background-color: ${airline.color}`, "style")}> ${airline.logo} </div> <span class="font-bold text-[#162433] text-center text-sm group-hover:text-[#3B82F6]">${airline.name}</span> <span class="text-xs text-[#68727C]">${airline.articles} articles</span> </a>`)} </div> </div> </section>  <section class="py-12 bg-[#F7F8FA]"> <div class="max-w-[90rem] mx-auto px-4 md:px-8"> <h2 class="font-sora text-2xl font-bold text-[#162433] mb-8">Latest Airline Articles</h2> <div class="grid md:grid-cols-2 gap-6"> ${articles.map((article) => renderTemplate`<article class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"> <span class="inline-block bg-[#EBF5FF] text-[#0066B2] text-xs font-bold px-3 py-1 rounded-full mb-3">${article.category}</span> <h3 class="font-sora text-xl font-bold text-[#162433] mb-2 hover:text-[#3B82F6]"> <a href="#">${article.title}</a> </h3> <p class="text-[#68727C] mb-4">${article.excerpt}</p> <div class="flex items-center gap-4 text-sm text-[#68727C]"> <span>${article.date}</span> <span>•</span> <span>${article.readTime} read</span> </div> </article>`)} </div> </div> </section> ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/travel/airlines.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/travel/airlines.astro";
const $$url = "/travel/airlines";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Airlines,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
