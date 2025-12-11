import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_Tnc-eghr.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_DvAyv4g9.mjs';
import { $ as $$FormattedDate } from '../chunks/FormattedDate_Bx-VE8tZ.mjs';
import { g as getCardImage } from '../chunks/cardImageMap__yuvtrme.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const reviews = (await getCollection("reviews")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  function getReviewImage(title, heroImage) {
    const cardName = title.replace(/\s*(Card\s*)?Review.*$/i, "").trim();
    const cardImage = getCardImage(cardName);
    return cardImage || heroImage || null;
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Reviews - Prestanews", "description": "In-depth reviews of credit cards, insurance, and more." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container mx-auto px-4 py-12 max-w-6xl"> <h1 class="text-4xl font-sora font-bold text-[#162433] mb-8 border-b pb-4">Product Reviews</h1> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${reviews.map((post) => {
    const reviewImage = getReviewImage(post.data.title, post.data.heroImage);
    return renderTemplate`<a${addAttribute(`/reviews/${post.id}/`, "href")} class="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow no-underline"> <div class="aspect-video relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center"> ${reviewImage ? renderTemplate`<img${addAttribute(reviewImage, "src")}${addAttribute(post.data.title, "alt")}${addAttribute(
      reviewImage.includes("/credit-cards/") ? "max-w-[200px] w-full h-auto drop-shadow-lg group-hover:scale-105 transition-transform duration-300" : "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
      "class"
    )}>` : renderTemplate`<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>`} <div class="absolute top-2 right-2 bg-[#162433] text-white text-xs font-bold px-2 py-1 rounded"> ${post.data.rating}/5
</div> </div> <div class="p-6"> <span class="text-xs text-primary font-bold uppercase tracking-wide mb-2 block">${post.data.category || "General"}</span> <h2 class="font-sora font-bold text-xl text-[#162433] mb-2 group-hover:text-accent transition-colors">${post.data.title}</h2> <p class="text-sm text-gray-500 mb-4 font-poppins line-clamp-2"> ${post.data.description} </p> <p class="text-xs text-gray-400 font-poppins"> ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate })} </p> </div> </a>`;
  })} </div> </section> ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/reviews/index.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/reviews/index.astro";
const $$url = "/reviews";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
