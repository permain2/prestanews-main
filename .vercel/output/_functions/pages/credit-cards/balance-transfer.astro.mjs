import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_DvAyv4g9.mjs';
import { C as CursorTrailDark } from '../../chunks/CursorTrailDark_De5gOi5L.mjs';
import { g as getCardImage } from '../../chunks/cardImageMap__yuvtrme.mjs';
/* empty css                                               */
export { renderers } from '../../renderers.mjs';

const $$BalanceTransfer = createComponent(($$result, $$props, $$slots) => {
  const creditCards = [
    {
      name: "Citi\xAE Diamond Preferred\xAE Card",
      bestFor: "Long 0% APR",
      annualFee: "$0",
      bonus: "0% intro APR for 21 months on balance transfers",
      rating: 4.7,
      pros: ["21 months 0% APR on transfers", "No annual fee", "Fast balance transfer", "Citi Entertainment access"],
      cons: ["No rewards program", "3% balance transfer fee", "Foreign transaction fees"],
      description: "One of the longest 0% intro APR periods available, perfect for paying down existing debt.",
      introApr: "0% for 21 months",
      transferFee: "3% or $5 minimum"
    },
    {
      name: "Wells Fargo Reflect\xAE Card",
      bestFor: "Extended 0% Period",
      annualFee: "$0",
      bonus: "0% intro APR for up to 21 months",
      rating: 4.6,
      pros: ["Up to 21 months 0% APR", "No annual fee", "Cell phone protection", "My Wells Fargo Deals"],
      cons: ["No rewards", "Intro period requires on-time payments", "Variable APR after intro"],
      description: "Get up to 21 months of 0% APR with on-time payments, ideal for large balance transfers.",
      introApr: "0% for up to 21 months",
      transferFee: "3% intro, then 5%"
    },
    {
      name: "BankAmericard\xAE Credit Card",
      bestFor: "Simple Balance Transfer",
      annualFee: "$0",
      bonus: "0% intro APR for 18 billing cycles",
      rating: 4.5,
      pros: ["18 months 0% APR", "No annual fee", "No penalty APR", "Access to Bank of America benefits"],
      cons: ["No rewards program", "Shorter intro period than competitors", "3% transfer fee"],
      description: "A straightforward balance transfer card with solid 0% APR period and no penalty APR.",
      introApr: "0% for 18 months",
      transferFee: "3% or $10 minimum"
    },
    {
      name: "Discover it\xAE Balance Transfer",
      bestFor: "Transfer + Rewards",
      annualFee: "$0",
      bonus: "0% intro APR for 18 months + Cash back rewards",
      rating: 4.8,
      pros: ["18 months 0% APR", "5% rotating categories", "Cash back match first year", "No annual fee"],
      cons: ["3% transfer fee", "Must activate rotating categories", "Discover acceptance"],
      description: "The rare balance transfer card that also earns rewards, with cashback match doubling your first year.",
      introApr: "0% for 18 months",
      transferFee: "3%"
    },
    {
      name: "U.S. Bank Visa\xAE Platinum Card",
      bestFor: "Purchases & Transfers",
      annualFee: "$0",
      bonus: "0% intro APR on both purchases and transfers",
      rating: 4.4,
      pros: ["20 billing cycles 0% APR", "Cell phone protection", "No annual fee", "Visa benefits"],
      cons: ["No rewards", "3% transfer fee", "Limited perks"],
      description: "Long 0% intro period on both purchases and balance transfers with useful cell phone protection.",
      introApr: "0% for 20 billing cycles",
      transferFee: "3% or $5 minimum"
    },
    {
      name: "Chase Slate Edge\u2120",
      bestFor: "Low Ongoing APR",
      annualFee: "$0",
      bonus: "0% intro APR for 18 months",
      rating: 4.3,
      pros: ["Intro APR on purchases & transfers", "Automatic APR reduction", "No annual fee", "Chase benefits"],
      cons: ["No rewards", "5% transfer fee", "Limited bonus features"],
      description: "Solid intro APR with the unique perk of automatic APR reduction when you pay on time.",
      introApr: "0% for 18 months",
      transferFee: "5% or $5 minimum"
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Best Balance Transfer Credit Cards", "description": "Compare the best balance transfer credit cards with 0% intro APR to pay off debt faster.", "data-astro-cid-vj7tawrt": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CursorTrailDark", CursorTrailDark, { "client:load": true, "title": "Best Balance Transfer Cards of December 2025", "kicker": "", "subtitle": "Eliminate high-interest debt with cards offering up to 21 months of 0% APR.", "author": "Screened Editorial Team", "date": "Dec. 10, 2025", "compact": true, "animateTitle": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/CursorTrailDark.tsx", "client:component-export": "default", "data-astro-cid-vj7tawrt": true })}  ${maybeRenderHead()}<section class="bg-[#F7F8FA] py-8" data-astro-cid-vj7tawrt> <div class="max-w-3xl mx-auto px-4 md:px-8 text-center" data-astro-cid-vj7tawrt> <p class="text-[#68727C] leading-relaxed" data-astro-cid-vj7tawrt>We analyzed 24 balance transfer offers, comparing intro APR lengths, transfer fees, and post-intro rates. For a $7,500 balance (the U.S. average), these cards can save you $1,847-$2,340 in interest compared to paying the national average 20.7% APR.</p> </div> </section>  <section class="bg-white py-8 border-b border-gray-200" data-astro-cid-vj7tawrt> <div class="max-w-5xl mx-auto px-4 md:px-8" data-astro-cid-vj7tawrt> <div class="grid md:grid-cols-3 gap-6" data-astro-cid-vj7tawrt> <div class="text-center p-4" data-astro-cid-vj7tawrt> <div class="w-12 h-12 bg-[#EBF5FF] rounded-full flex items-center justify-center mx-auto mb-3" data-astro-cid-vj7tawrt> <svg class="w-6 h-6 text-[#0066B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-vj7tawrt> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-vj7tawrt></path> </svg> </div> <h3 class="font-bold text-[#162433] mb-1" data-astro-cid-vj7tawrt>Save on Interest</h3> <p class="text-sm text-[#68727C]" data-astro-cid-vj7tawrt>0% APR means every payment goes toward your balance</p> </div> <div class="text-center p-4" data-astro-cid-vj7tawrt> <div class="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-3" data-astro-cid-vj7tawrt> <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-vj7tawrt> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-vj7tawrt></path> </svg> </div> <h3 class="font-bold text-[#162433] mb-1" data-astro-cid-vj7tawrt>Pay Off Faster</h3> <p class="text-sm text-[#68727C]" data-astro-cid-vj7tawrt>Clear your debt in 18-21 months interest-free</p> </div> <div class="text-center p-4" data-astro-cid-vj7tawrt> <div class="w-12 h-12 bg-[#FEF3C7] rounded-full flex items-center justify-center mx-auto mb-3" data-astro-cid-vj7tawrt> <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-vj7tawrt> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-astro-cid-vj7tawrt></path> </svg> </div> <h3 class="font-bold text-[#162433] mb-1" data-astro-cid-vj7tawrt>Improve Credit</h3> <p class="text-sm text-[#68727C]" data-astro-cid-vj7tawrt>Lower utilization can boost your credit score</p> </div> </div> </div> </section>  <section class="bg-white border-b border-gray-200 py-4 sticky top-16 z-40" data-astro-cid-vj7tawrt> <div class="max-w-[90rem] mx-auto px-4 md:px-8" data-astro-cid-vj7tawrt> <div class="flex gap-4 overflow-x-auto pb-2" data-astro-cid-vj7tawrt> <a href="/credit-cards" class="filter-btn" data-astro-cid-vj7tawrt>All Cards</a> <a href="/credit-cards/best-travel-cards" class="filter-btn" data-astro-cid-vj7tawrt>Travel Cards</a> <a href="/credit-cards/best-cashback" class="filter-btn" data-astro-cid-vj7tawrt>Cash Back</a> <a href="/credit-cards/business" class="filter-btn" data-astro-cid-vj7tawrt>Business</a> <a href="/credit-cards/no-annual-fee" class="filter-btn" data-astro-cid-vj7tawrt>No Annual Fee</a> <a href="/credit-cards/balance-transfer" class="filter-btn active" style="color: #FFFFFF !important;" data-astro-cid-vj7tawrt>Balance Transfer</a> </div> </div> </section>  <section class="py-12 bg-[#F7F8FA]" data-astro-cid-vj7tawrt> <div class="max-w-5xl mx-auto px-4 md:px-8" data-astro-cid-vj7tawrt> ${creditCards.map((card, index) => renderTemplate`<div class="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8 hover:shadow-lg transition-shadow" data-astro-cid-vj7tawrt> <div class="grid md:grid-cols-[300px_1fr]" data-astro-cid-vj7tawrt> <!-- Left Panel - Card Image & CTA --> <div class="bg-[#F7F8FA] p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200" data-astro-cid-vj7tawrt> ${getCardImage(card.name) ? renderTemplate`<img${addAttribute(getCardImage(card.name), "src")}${addAttribute(card.name, "alt")} class="w-64 h-auto rounded-xl shadow-xl mb-6 hover:scale-105 hover:shadow-2xl transition-all duration-300" data-astro-cid-vj7tawrt>` : renderTemplate`<div class="w-64 h-40 rounded-xl shadow-xl mb-6 relative overflow-hidden"${addAttribute(`background: linear-gradient(135deg, ${index % 4 === 0 ? "#1E40AF 0%, #3B82F6 50%, #1E40AF 100%" : index % 4 === 1 ? "#065F46 0%, #10B981 50%, #065F46 100%" : index % 4 === 2 ? "#7C3AED 0%, #A78BFA 50%, #7C3AED 100%" : "#DC2626 0%, #EF4444 50%, #DC2626 100%"});`, "style")} data-astro-cid-vj7tawrt> <div class="absolute top-6 left-6 w-10 h-8 rounded bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-90" data-astro-cid-vj7tawrt></div> <div class="absolute top-4 right-4" data-astro-cid-vj7tawrt> <div class="text-white font-bold text-sm tracking-tight opacity-90" data-astro-cid-vj7tawrt>0% APR</div> </div> <div class="absolute bottom-4 left-4 right-4" data-astro-cid-vj7tawrt> <div class="text-white text-xs font-medium opacity-80 leading-tight" data-astro-cid-vj7tawrt>${card.name}</div> </div> </div>`} <!-- Key Stats --> <div class="w-full grid grid-cols-2 gap-2 mb-4" data-astro-cid-vj7tawrt> <div class="bg-white p-2 rounded-lg text-center" data-astro-cid-vj7tawrt> <div class="text-xs text-[#68727C]" data-astro-cid-vj7tawrt>Intro APR</div> <div class="text-sm font-bold text-green-600" data-astro-cid-vj7tawrt>${card.introApr}</div> </div> <div class="bg-white p-2 rounded-lg text-center" data-astro-cid-vj7tawrt> <div class="text-xs text-[#68727C]" data-astro-cid-vj7tawrt>Transfer Fee</div> <div class="text-sm font-bold text-[#162433]" data-astro-cid-vj7tawrt>${card.transferFee}</div> </div> </div> <a href="#" class="apply-btn group w-full bg-[#E68A00] hover:bg-[#B87400] text-center py-4 rounded-lg font-bold transition-all text-sm uppercase tracking-wide mb-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-white" data-astro-cid-vj7tawrt> <span data-astro-cid-vj7tawrt>Apply Now</span> <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-vj7tawrt><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-vj7tawrt></path></svg> </a> <p class="text-xs text-[#68727C] text-center" data-astro-cid-vj7tawrt>On issuer's secure website</p> </div> <!-- Right Panel - Card Details --> <div class="p-6 md:p-8" data-astro-cid-vj7tawrt> <div class="flex items-start justify-between mb-4" data-astro-cid-vj7tawrt> <div data-astro-cid-vj7tawrt> <span class="inline-block bg-[#DCFCE7] text-green-700 text-xs font-bold uppercase px-3 py-1 rounded-full mb-2" data-astro-cid-vj7tawrt>${card.bestFor}</span> <h2 class="font-sora text-xl md:text-2xl font-bold text-[#162433]" data-astro-cid-vj7tawrt>${card.name}</h2> </div> <div class="flex items-center gap-1 bg-[#F7F8FA] px-3 py-2 rounded-lg" data-astro-cid-vj7tawrt> <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-vj7tawrt><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-astro-cid-vj7tawrt></path></svg> <span class="font-bold text-[#162433]" data-astro-cid-vj7tawrt>${card.rating}</span> </div> </div> <p class="text-[#68727C] mb-6" data-astro-cid-vj7tawrt>${card.description}</p> <div class="grid md:grid-cols-2 gap-6 mb-6" data-astro-cid-vj7tawrt> <div class="bg-[#F7F8FA] p-4 rounded-lg" data-astro-cid-vj7tawrt> <div class="text-xs text-[#68727C] uppercase font-bold mb-1" data-astro-cid-vj7tawrt>Annual Fee</div> <div class="text-lg font-bold text-green-600" data-astro-cid-vj7tawrt>${card.annualFee}</div> </div> <div class="bg-[#DCFCE7] p-4 rounded-lg" data-astro-cid-vj7tawrt> <div class="text-xs text-green-700 uppercase font-bold mb-1" data-astro-cid-vj7tawrt>Intro Offer</div> <div class="text-lg font-bold text-green-700" data-astro-cid-vj7tawrt>${card.bonus}</div> </div> </div> <div class="grid md:grid-cols-2 gap-4" data-astro-cid-vj7tawrt> <div data-astro-cid-vj7tawrt> <h4 class="font-bold text-[#162433] mb-2 flex items-center gap-2" data-astro-cid-vj7tawrt> <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-vj7tawrt><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-astro-cid-vj7tawrt></path></svg>
Pros
</h4> <ul class="text-sm text-[#68727C] space-y-1" data-astro-cid-vj7tawrt> ${card.pros.map((pro) => renderTemplate`<li data-astro-cid-vj7tawrt>• ${pro}</li>`)} </ul> </div> <div data-astro-cid-vj7tawrt> <h4 class="font-bold text-[#162433] mb-2 flex items-center gap-2" data-astro-cid-vj7tawrt> <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-vj7tawrt><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-astro-cid-vj7tawrt></path></svg>
Cons
</h4> <ul class="text-sm text-[#68727C] space-y-1" data-astro-cid-vj7tawrt> ${card.cons.map((con) => renderTemplate`<li data-astro-cid-vj7tawrt>• ${con}</li>`)} </ul> </div> </div> </div> </div> </div>`)} </div> </section>  <section class="py-12 bg-white" data-astro-cid-vj7tawrt> <div class="max-w-3xl mx-auto px-4 md:px-8" data-astro-cid-vj7tawrt> <h2 class="font-sora text-3xl font-bold text-[#162433] text-center mb-8" data-astro-cid-vj7tawrt>Frequently Asked Questions</h2> <div class="space-y-6" data-astro-cid-vj7tawrt> <div class="border border-gray-200 rounded-xl p-6" data-astro-cid-vj7tawrt> <h3 class="font-bold text-[#162433] mb-2" data-astro-cid-vj7tawrt>What is a balance transfer?</h3> <p class="text-[#68727C]" data-astro-cid-vj7tawrt>A balance transfer moves existing credit card debt to a new card, typically one with a 0% intro APR. This allows you to pay down your balance without accruing interest during the promotional period.</p> </div> <div class="border border-gray-200 rounded-xl p-6" data-astro-cid-vj7tawrt> <h3 class="font-bold text-[#162433] mb-2" data-astro-cid-vj7tawrt>How much can I save with a balance transfer?</h3> <p class="text-[#68727C]" data-astro-cid-vj7tawrt>If you have $5,000 in credit card debt at 20% APR, transferring to a 0% APR card for 18 months could save you over $1,500 in interest, assuming you pay off the balance during the intro period.</p> </div> <div class="border border-gray-200 rounded-xl p-6" data-astro-cid-vj7tawrt> <h3 class="font-bold text-[#162433] mb-2" data-astro-cid-vj7tawrt>What's a balance transfer fee?</h3> <p class="text-[#68727C]" data-astro-cid-vj7tawrt>Most cards charge 3-5% of the transferred amount as a fee. For a $5,000 transfer at 3%, that's $150. This is usually much less than the interest you'd pay without transferring.</p> </div> <div class="border border-gray-200 rounded-xl p-6" data-astro-cid-vj7tawrt> <h3 class="font-bold text-[#162433] mb-2" data-astro-cid-vj7tawrt>Will a balance transfer hurt my credit?</h3> <p class="text-[#68727C]" data-astro-cid-vj7tawrt>Opening a new card causes a small, temporary dip. However, if the transfer lowers your credit utilization ratio, your score may actually improve over time.</p> </div> </div> </div> </section> ` })} `;
}, "/Users/permain2/affiliatewebsite/src/pages/credit-cards/balance-transfer.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/credit-cards/balance-transfer.astro";
const $$url = "/credit-cards/balance-transfer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$BalanceTransfer,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
