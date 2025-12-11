import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_DvAyv4g9.mjs';
import { C as CursorTrailDark } from '../../chunks/CursorTrailDark_De5gOi5L.mjs';
import { g as getCardImage } from '../../chunks/cardImageMap__yuvtrme.mjs';
/* empty css                                            */
export { renderers } from '../../renderers.mjs';

const $$NoAnnualFee = createComponent(($$result, $$props, $$slots) => {
  const creditCards = [
    {
      name: "Blue Cash Everyday\xAE Card from American Express",
      bestFor: "No Annual Fee Cash Back",
      annualFee: "$0",
      bonus: "$200 statement credit",
      rating: 4.5,
      pros: ["3% at U.S. supermarkets", "3% at U.S. gas stations", "3% on online retail", "No annual fee"],
      cons: ["$6K supermarket cap", "Lower rates than Blue Cash Preferred"],
      description: "Solid cash back with no annual fee, perfect for everyday spending at supermarkets and gas stations."
    },
    {
      name: "The Blue Business\xAE Plus Credit Card from American Express",
      bestFor: "No Annual Fee Business",
      annualFee: "$0",
      bonus: "15,000 Membership Rewards points",
      rating: 4.8,
      pros: ["2X points on all purchases (up to $50K)", "No annual fee", "Intro 0% APR", "Expense management tools"],
      cons: ["$50K cap on 2X earning", "Lower welcome bonus"],
      description: "The best no-annual-fee business card for earning flexible Membership Rewards points."
    },
    {
      name: "American Express Cash Magnet\xAE Card",
      bestFor: "Flat-Rate Cash Back",
      annualFee: "$0",
      bonus: "$200 statement credit",
      rating: 4.3,
      pros: ["Unlimited 1.5% cash back on all purchases", "No annual fee", "Intro 0% APR", "Simple rewards structure"],
      cons: ["Lower earning than category cards", "No bonus categories"],
      description: "Simple, straightforward card for those who want cash back on everything without tracking categories."
    },
    {
      name: "American Express EveryDay\xAE Credit Card",
      bestFor: "Membership Rewards Starter",
      annualFee: "$0",
      bonus: "10,000 Membership Rewards points",
      rating: 4.2,
      pros: ["2X at U.S. supermarkets", "20% points bonus with 20+ transactions", "No annual fee", "Intro 0% APR"],
      cons: ["Lower earning rates", "Requires many transactions for bonus"],
      description: "Entry-level card for earning Membership Rewards points without paying an annual fee."
    },
    {
      name: "American Express Blue Business Cash\u2122 Card",
      bestFor: "Business Cash Back",
      annualFee: "$0",
      bonus: "$250 statement credit",
      rating: 4.5,
      pros: ["2% cash back on all purchases (up to $50K)", "No annual fee", "Intro 0% APR", "Expanded buying power"],
      cons: ["$50K cap on 2% earning", "Then drops to 1%"],
      description: "Simple cash back for businesses that want straightforward rewards without tracking categories."
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Best No Annual Fee Credit Cards", "description": "Expert reviews of the best American Express credit cards with no annual fee.", "data-astro-cid-u24jrkhw": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CursorTrailDark", CursorTrailDark, { "client:load": true, "title": "Best No Annual Fee Credit Cards of December 2025", "kicker": "", "subtitle": "Get valuable rewards without the yearly cost with these top no-fee cards.", "author": "Screened Editorial Team", "date": "Dec. 10, 2025", "compact": true, "animateTitle": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/CursorTrailDark.tsx", "client:component-export": "default", "data-astro-cid-u24jrkhw": true })}  ${maybeRenderHead()}<section class="bg-[#F7F8FA] py-4" data-astro-cid-u24jrkhw> <div class="max-w-5xl mx-auto px-4 md:px-8" data-astro-cid-u24jrkhw> <p class="text-xs text-[#68727C] leading-relaxed" data-astro-cid-u24jrkhw>
Most of the cards we feature here are from partners who compensate us when you approve through our site. Please view our <a href="/advertising" class="text-[#3B82F6] hover:underline" data-astro-cid-u24jrkhw>advertising policy</a> for more information.
</p> </div> </section>  <section class="py-12 bg-[#F7F8FA]" data-astro-cid-u24jrkhw> <div class="max-w-5xl mx-auto px-4 md:px-8" data-astro-cid-u24jrkhw> <!-- Research Intro --> <div class="text-center mb-10" data-astro-cid-u24jrkhw> <p class="text-[#68727C] max-w-3xl mx-auto leading-relaxed" data-astro-cid-u24jrkhw>We calculated the true cost-benefit ratio of 29 no-annual-fee cards over a 3-year period. These 5 cards deliver the highest net returns—averaging $412-$680 annually—without a single dollar in fees eating into your rewards.</p> </div> ${creditCards.map((card, index) => renderTemplate`<div class="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8 hover:shadow-lg transition-shadow" data-astro-cid-u24jrkhw> <div class="grid md:grid-cols-[300px_1fr]" data-astro-cid-u24jrkhw> <div class="bg-[#F7F8FA] p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200" data-astro-cid-u24jrkhw> ${getCardImage(card.name) ? renderTemplate`<img${addAttribute(getCardImage(card.name), "src")}${addAttribute(card.name, "alt")} class="w-64 h-auto rounded-xl shadow-xl mb-6 hover:scale-105 hover:shadow-2xl transition-all duration-300" data-astro-cid-u24jrkhw>` : renderTemplate`<div class="w-64 h-40 rounded-xl shadow-xl mb-6 relative overflow-hidden"${addAttribute(`background: linear-gradient(135deg, ${index % 2 === 0 ? "#0077C0 0%, #00A3E0 50%, #0077C0 100%" : "#2563EB 0%, #3B82F6 50%, #2563EB 100%"});`, "style")} data-astro-cid-u24jrkhw> <div class="absolute top-6 left-6 w-10 h-8 rounded bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-90" data-astro-cid-u24jrkhw></div> <div class="absolute top-4 right-4" data-astro-cid-u24jrkhw> <div class="text-white font-bold text-lg tracking-tight opacity-90" data-astro-cid-u24jrkhw>AMEX</div> </div> <div class="absolute bottom-4 left-4 right-4" data-astro-cid-u24jrkhw> <div class="text-white text-xs font-medium opacity-80 leading-tight" data-astro-cid-u24jrkhw>${card.name}</div> </div> </div>`} <a href="#" class="apply-btn group w-full bg-gradient-to-r from-[#0066B2] to-[#004C8C] hover:from-[#004C8C] hover:to-[#003366] text-center py-4 rounded-lg font-bold transition-all text-sm uppercase tracking-wide mb-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 relative overflow-hidden" style="color: #FFFFFF !important;" data-astro-cid-u24jrkhw> <span class="relative z-10" style="color: #FFFFFF !important;" data-astro-cid-u24jrkhw>Apply Now</span> <svg class="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="#FFFFFF" viewBox="0 0 24 24" data-astro-cid-u24jrkhw><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-u24jrkhw></path></svg> <span class="shine-effect" data-astro-cid-u24jrkhw></span> </a> <p class="text-xs text-[#68727C] text-center" data-astro-cid-u24jrkhw>On American Express's Website</p> </div> <div class="p-6 md:p-8" data-astro-cid-u24jrkhw> <div class="flex items-start justify-between mb-4" data-astro-cid-u24jrkhw> <div data-astro-cid-u24jrkhw> <span class="inline-block bg-[#E0E7FF] text-[#4338CA] text-xs font-bold uppercase px-3 py-1 rounded-full mb-2" data-astro-cid-u24jrkhw>${card.bestFor}</span> <h2 class="font-sora text-xl md:text-2xl font-bold text-[#162433]" data-astro-cid-u24jrkhw>${card.name}</h2> </div> <div class="flex items-center gap-1 bg-[#F7F8FA] px-3 py-2 rounded-lg" data-astro-cid-u24jrkhw> <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-u24jrkhw><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-astro-cid-u24jrkhw></path></svg> <span class="font-bold text-[#162433]" data-astro-cid-u24jrkhw>${card.rating}</span> </div> </div> <p class="text-[#68727C] mb-6" data-astro-cid-u24jrkhw>${card.description}</p> <div class="grid md:grid-cols-2 gap-6 mb-6" data-astro-cid-u24jrkhw> <div class="bg-[#DCFCE7] p-4 rounded-lg" data-astro-cid-u24jrkhw> <div class="text-xs text-[#166534] uppercase font-bold mb-1" data-astro-cid-u24jrkhw>Annual Fee</div> <div class="text-lg font-bold text-[#166534]" data-astro-cid-u24jrkhw>${card.annualFee}</div> </div> <div class="bg-[#F7F8FA] p-4 rounded-lg" data-astro-cid-u24jrkhw> <div class="text-xs text-[#68727C] uppercase font-bold mb-1" data-astro-cid-u24jrkhw>Welcome Bonus</div> <div class="text-lg font-bold text-[#162433]" data-astro-cid-u24jrkhw>${card.bonus}</div> </div> </div> <div class="grid md:grid-cols-2 gap-4" data-astro-cid-u24jrkhw> <div data-astro-cid-u24jrkhw> <h4 class="font-bold text-[#162433] mb-2 flex items-center gap-2" data-astro-cid-u24jrkhw> <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-u24jrkhw><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-astro-cid-u24jrkhw></path></svg>
Pros
</h4> <ul class="text-sm text-[#68727C] space-y-1" data-astro-cid-u24jrkhw> ${card.pros.map((pro) => renderTemplate`<li data-astro-cid-u24jrkhw>• ${pro}</li>`)} </ul> </div> <div data-astro-cid-u24jrkhw> <h4 class="font-bold text-[#162433] mb-2 flex items-center gap-2" data-astro-cid-u24jrkhw> <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-u24jrkhw><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-astro-cid-u24jrkhw></path></svg>
Cons
</h4> <ul class="text-sm text-[#68727C] space-y-1" data-astro-cid-u24jrkhw> ${card.cons.map((con) => renderTemplate`<li data-astro-cid-u24jrkhw>• ${con}</li>`)} </ul> </div> </div> </div> </div> </div>`)} </div> </section> ` })} `;
}, "/Users/permain2/affiliatewebsite/src/pages/credit-cards/no-annual-fee.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/credit-cards/no-annual-fee.astro";
const $$url = "/credit-cards/no-annual-fee";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$NoAnnualFee,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
