import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_BztIZ2OU.mjs';
export { renderers } from '../../renderers.mjs';

const $$Cruises = createComponent(($$result, $$props, $$slots) => {
  const cruiseLines = [
    { name: "Royal Caribbean", logo: "RC", color: "#002B5C" },
    { name: "Norwegian", logo: "NCL", color: "#00244C" },
    { name: "Carnival", logo: "CCL", color: "#003087" },
    { name: "Celebrity", logo: "CEL", color: "#1A1A1A" },
    { name: "Princess", logo: "PCL", color: "#003366" },
    { name: "MSC", logo: "MSC", color: "#00205B" }
  ];
  const articles = [
    {
      title: "Best Cruise Deals for 2025: Where to Book Now",
      excerpt: "Score amazing cruise deals with our top picks for the upcoming year.",
      category: "Deals",
      date: "Dec 8, 2025",
      readTime: "8 min"
    },
    {
      title: "Royal Caribbean Icon of the Seas: Complete Review",
      excerpt: "Everything you need to know about the world's largest cruise ship.",
      category: "Reviews",
      date: "Dec 5, 2025",
      readTime: "15 min"
    },
    {
      title: "First-Time Cruiser's Guide: Everything You Need to Know",
      excerpt: "A comprehensive guide for anyone planning their first cruise vacation.",
      category: "Guides",
      date: "Dec 2, 2025",
      readTime: "12 min"
    },
    {
      title: "Best Credit Cards for Cruise Bookings in 2025",
      excerpt: "Maximize rewards on your cruise with these top credit cards.",
      category: "Credit Cards",
      date: "Nov 30, 2025",
      readTime: "10 min"
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Cruises - Travel Guides", "description": "Cruise reviews, booking tips, and deals for all major cruise lines." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-[#0D2C4B] to-[#1A4A7A] py-16"> <div class="max-w-[90rem] mx-auto px-4 md:px-8"> <nav class="text-sm text-gray-400 mb-4"> <a href="/" class="hover:text-white">Home</a> /
<a href="/travel" class="hover:text-white">Travel</a> /
<span class="text-white">Cruises</span> </nav> <h1 class="font-sora text-4xl md:text-5xl font-bold text-white mb-4">Cruises</h1> <p class="text-xl text-gray-300 max-w-2xl">Expert cruise reviews, itinerary guides, and booking strategies.</p> </div> </section>  <section class="py-12 bg-white border-b border-gray-200"> <div class="max-w-[90rem] mx-auto px-4 md:px-8"> <h2 class="font-sora text-2xl font-bold text-[#162433] mb-6">Browse by Cruise Line</h2> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> ${cruiseLines.map((line) => renderTemplate`<a href="#" class="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-[#3B82F6] hover:shadow-lg transition-all"> <div class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3"${addAttribute(`background-color: ${line.color}`, "style")}> ${line.logo} </div> <span class="font-bold text-[#162433] text-center text-sm group-hover:text-[#3B82F6]">${line.name}</span> </a>`)} </div> </div> </section>  <section class="py-12 bg-[#F7F8FA]"> <div class="max-w-[90rem] mx-auto px-4 md:px-8"> <h2 class="font-sora text-2xl font-bold text-[#162433] mb-8">Latest Cruise Articles</h2> <div class="grid md:grid-cols-2 gap-6"> ${articles.map((article) => renderTemplate`<article class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"> <span class="inline-block bg-[#DCFCE7] text-[#166534] text-xs font-bold px-3 py-1 rounded-full mb-3">${article.category}</span> <h3 class="font-sora text-xl font-bold text-[#162433] mb-2 hover:text-[#3B82F6]"> <a href="#">${article.title}</a> </h3> <p class="text-[#68727C] mb-4">${article.excerpt}</p> <div class="flex items-center gap-4 text-sm text-[#68727C]"> <span>${article.date}</span> <span>•</span> <span>${article.readTime} read</span> </div> </article>`)} </div> </div> </section> ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/travel/cruises.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/travel/cruises.astro";
const $$url = "/travel/cruises";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cruises,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
