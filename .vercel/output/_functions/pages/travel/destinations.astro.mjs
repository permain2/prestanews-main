import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_DvAyv4g9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Destinations = createComponent(($$result, $$props, $$slots) => {
  const regions = [
    { name: "Europe", emoji: "\u{1F1EA}\u{1F1FA}", destinations: ["Paris", "Rome", "Barcelona", "London", "Amsterdam"] },
    { name: "Asia", emoji: "\u{1F30F}", destinations: ["Tokyo", "Bali", "Bangkok", "Singapore", "Seoul"] },
    { name: "Caribbean", emoji: "\u{1F3DD}\uFE0F", destinations: ["Cancun", "Turks & Caicos", "Bahamas", "Aruba", "Jamaica"] },
    { name: "North America", emoji: "\u{1F1FA}\u{1F1F8}", destinations: ["Hawaii", "New York", "Las Vegas", "Miami", "Los Angeles"] }
  ];
  const featuredDestinations = [
    {
      name: "Maldives",
      description: "Overwater villas and crystal-clear waters in paradise.",
      image: "/blog-placeholder-1.jpg",
      category: "Luxury"
    },
    {
      name: "Japan",
      description: "Ancient temples, modern cities, and incredible cuisine.",
      image: "/blog-placeholder-2.jpg",
      category: "Culture"
    },
    {
      name: "Iceland",
      description: "Northern lights, hot springs, and dramatic landscapes.",
      image: "/blog-placeholder-3.jpg",
      category: "Adventure"
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Destinations - Travel Guides", "description": "Destination guides and travel tips for places around the world." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-[#0D2C4B] to-[#1A4A7A] py-16"> <div class="max-w-[90rem] mx-auto px-4 md:px-8"> <nav class="text-sm text-gray-400 mb-4"> <a href="/" class="hover:text-white">Home</a> /
<a href="/travel" class="hover:text-white">Travel</a> /
<span class="text-white">Destinations</span> </nav> <h1 class="font-sora text-4xl md:text-5xl font-bold text-white mb-4">Destinations</h1> <p class="text-xl text-gray-300 max-w-2xl">Discover your next adventure with our destination guides.</p> </div> </section>  <section class="py-12 bg-white"> <div class="max-w-[90rem] mx-auto px-4 md:px-8"> <h2 class="font-sora text-2xl font-bold text-[#162433] mb-8">Featured Destinations</h2> <div class="grid md:grid-cols-3 gap-6"> ${featuredDestinations.map((dest) => renderTemplate`<a href="#" class="group relative rounded-xl overflow-hidden aspect-[4/3]"> <img${addAttribute(dest.image, "src")}${addAttribute(dest.name, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-6"> <span class="inline-block bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full mb-2">${dest.category}</span> <h3 class="font-sora text-2xl font-bold text-white mb-1">${dest.name}</h3> <p class="text-gray-200 text-sm">${dest.description}</p> </div> </a>`)} </div> </div> </section>  <section class="py-12 bg-[#F7F8FA]"> <div class="max-w-[90rem] mx-auto px-4 md:px-8"> <h2 class="font-sora text-2xl font-bold text-[#162433] mb-8">Browse by Region</h2> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> ${regions.map((region) => renderTemplate`<div class="bg-white rounded-xl p-6 border border-gray-200"> <div class="text-4xl mb-3">${region.emoji}</div> <h3 class="font-sora text-xl font-bold text-[#162433] mb-4">${region.name}</h3> <ul class="space-y-2"> ${region.destinations.map((dest) => renderTemplate`<li> <a href="#" class="text-[#68727C] hover:text-[#3B82F6] transition-colors">${dest} →</a> </li>`)} </ul> </div>`)} </div> </div> </section> ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/travel/destinations.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/travel/destinations.astro";
const $$url = "/travel/destinations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Destinations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
