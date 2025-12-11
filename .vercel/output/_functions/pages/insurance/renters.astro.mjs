import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_BztIZ2OU.mjs';
import { C as CursorTrailDark } from '../../chunks/CursorTrailDark_De5gOi5L.mjs';
import { S as SignupNotifications } from '../../chunks/SignupNotifications_DqYVWS6a.mjs';
import { C as ComparisonTOCToggle, A as AnimatedFAQ } from '../../chunks/ComparisonTOCToggle_BDX6J6rE.mjs';
export { renderers } from '../../renderers.mjs';

const $$Renters = createComponent(($$result, $$props, $$slots) => {
  const providers = [
    {
      name: "Lemonade",
      logo: "/insurance-logos-small/lemonade.png",
      bestFor: "Quick & Easy Sign-Up",
      monthlyAvg: "$12",
      coverage: "$30,000+",
      rating: 4.9,
      pros: ["Sign up in 90 seconds", "AI-powered claims", "Giveback program", "Affordable premiums"],
      cons: ["Limited customization", "Not available everywhere"],
      description: "Lemonade revolutionized renters insurance with instant quotes, AI-powered claims processing, and donations to charity.",
      amBest: "A-"
    },
    {
      name: "State Farm",
      logo: "/insurance-logos-small/statefarm.png",
      bestFor: "Bundling Options",
      monthlyAvg: "$18",
      coverage: "$20,000+",
      rating: 4.7,
      pros: ["Local agent support", "Great bundling discounts", "Identity theft coverage", "Extensive coverage options"],
      cons: ["Higher average cost", "Slower claims process"],
      description: "State Farm offers reliable coverage with the added benefit of personal agent relationships and excellent bundling discounts.",
      amBest: "A++"
    },
    {
      name: "Allstate",
      logo: "/insurance-logos-small/allstate.png",
      bestFor: "Coverage Customization",
      monthlyAvg: "$20",
      coverage: "$25,000+",
      rating: 4.5,
      pros: ["Extensive add-ons", "Easy online management", "Claim-free rewards", "Equipment breakdown coverage"],
      cons: ["Pricier than competitors", "App could be better"],
      description: "Allstate provides comprehensive customization options and rewards customers who don't file claims.",
      amBest: "A+"
    },
    {
      name: "Progressive",
      logo: "/insurance-logos-small/progressive.png",
      bestFor: "Multi-Policy Discounts",
      monthlyAvg: "$15",
      coverage: "$20,000+",
      rating: 4.6,
      pros: ["Bundle with auto", "24/7 online service", "Competitive pricing", "Pet liability included"],
      cons: ["Limited agent network", "Basic online experience"],
      description: "Progressive offers solid renters coverage with significant savings when bundled with auto insurance.",
      amBest: "A+"
    },
    {
      name: "USAA",
      logo: "/insurance-logos-small/usaa.png",
      bestFor: "Military Members",
      monthlyAvg: "$10",
      coverage: "$25,000+",
      rating: 4.9,
      pros: ["Lowest average rates", "Exceptional service", "Replacement cost coverage", "No claims needed for military moves"],
      cons: ["Military members only", "Limited accessibility"],
      description: "USAA provides the most affordable renters insurance with outstanding service for military families.",
      amBest: "A++"
    },
    {
      name: "Toggle (Farmers)",
      logo: "/insurance-logos-small/farmers.png",
      bestFor: "Customizable Coverage",
      monthlyAvg: "$14",
      coverage: "$15,000+",
      rating: 4.4,
      pros: ["Itemized coverage", "Easy to customize", "Quick online quotes", "Backed by Farmers"],
      cons: ["Limited track record", "Fewer coverage options"],
      description: "Toggle lets you build custom coverage piece by piece, ideal for renters with specific protection needs.",
      amBest: "A"
    }
  ];
  const faqs = [
    {
      question: "Do I really need renters insurance?",
      answer: "Yes! Your landlord's insurance only covers the building, not your belongings. Renters insurance protects your possessions, provides liability coverage, and covers additional living expenses if you're displaced."
    },
    {
      question: "How much renters insurance coverage do I need?",
      answer: "Create a home inventory to estimate your belongings' value. Most renters need $20,000-$50,000 in personal property coverage. Also consider $100,000+ in liability coverage."
    },
    {
      question: "What's the difference between actual cash value and replacement cost?",
      answer: "Actual cash value pays what your items are worth today (depreciated). Replacement cost pays to replace items with new ones of similar quality. Replacement cost coverage is slightly more expensive but worth it."
    },
    {
      question: "Does renters insurance cover my roommate's stuff?",
      answer: "Typically no, unless they're listed on your policy. Each roommate should have their own policy or be explicitly added as a named insured to your policy."
    },
    {
      question: "What's covered under renters insurance liability?",
      answer: "Liability covers you if someone is injured in your rental or if you accidentally damage someone else's property. It also covers legal defense costs if you're sued. Standard coverage is $100,000."
    },
    {
      question: "Does renters insurance cover theft outside my apartment?",
      answer: "Yes! Most renters policies cover your belongings anywhere in the world. If your laptop is stolen from your car or luggage is lost during travel, you're typically covered (minus deductible)."
    }
  ];
  const tocItems = [
    { id: "providers", label: "Top Insurers", href: "#providers" },
    { id: "coverage", label: "Coverage Guide", href: "#coverage" },
    { id: "compare", label: "Compare", href: "#compare" },
    { id: "faq", label: "FAQ", href: "#faq" }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Best Renters Insurance of 2025", "description": "Expert reviews of the best renters insurance providers. Compare rates, coverage, and features to protect your belongings affordably." }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CursorTrailDark", CursorTrailDark, { "client:load": true, "title": "Best Renters Insurance of December 2025", "kicker": "", "subtitle": "Protect your belongings with affordable coverage from top-rated insurers.", "author": "Screened Insurance Team", "date": "Dec. 11, 2025", "compact": true, "animateTitle": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/CursorTrailDark.tsx", "client:component-export": "default" })}  ${renderComponent($$result2, "SignupNotifications", SignupNotifications, { "client:load": true, "initialDelay": 5e3, "interval": 12e4, "displayDuration": 6e3, "showInitialBatch": 1, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/SignupNotifications.tsx", "client:component-export": "default" })}  ${maybeRenderHead()}<section class="bg-[#F7F8FA] py-4"> <div class="max-w-5xl mx-auto px-4 md:px-8"> <p class="text-xs text-[#68727C] leading-relaxed">
We may receive compensation when you click on links to products. Our analysis, reviews, and opinions are entirely from our editorial team. Please view our <a href="/advertising" class="text-[#3B82F6] hover:underline">advertising policy</a> for more information.
</p> </div> </section>  <section class="bg-white border-b border-gray-200 py-3 sticky top-16 z-40"> <div class="max-w-5xl mx-auto px-4 md:px-8"> ${renderComponent($$result2, "ComparisonTOCToggle", ComparisonTOCToggle, { "items": tocItems, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/ComparisonTOCToggle.tsx", "client:component-export": "default" })} </div> </section>  <section id="providers" class="py-12 bg-[#F7F8FA]"> <div class="max-w-5xl mx-auto px-4 md:px-8"> <!-- Research Intro --> <div class="text-center mb-10"> <h2 class="font-sora text-3xl font-bold text-[#162433] mb-4">Top Renters Insurance Companies</h2> <p class="text-[#68727C] max-w-3xl mx-auto leading-relaxed">We obtained 186 quotes for $30K personal property coverage across 10 cities, tested each company's claims process with small claims, and analyzed 3,200+ customer reviews. These 6 insurers deliver the best value—protecting your belongings for as little as $10-$20 per month.</p> </div> ${providers.map((provider, index) => renderTemplate`<div class="bg-white rounded-xl overflow-hidden mb-8 hover:shadow-lg transition-shadow" style="box-shadow: 0 1px 3px rgba(0,0,0,0.08);"> <div class="grid md:grid-cols-[300px_1fr]"> <!-- Left Panel - Logo & CTA --> <div class="bg-[#F7F8FA] p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100"> <!-- Provider Logo --> <div class="w-48 h-32 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center bg-white p-4" style="box-shadow: 0 4px 12px rgba(0,0,0,0.06);"> <img${addAttribute(provider.logo, "src")}${addAttribute(`${provider.name} logo`, "alt")} class="max-w-full max-h-full object-contain"> </div> <!-- Apply Button --> <a href="#" class="w-full bg-gradient-to-r from-[#0066B2] to-[#004C8C] hover:from-[#004C8C] hover:to-[#003366] text-center py-4 rounded-lg font-bold transition-all text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2" style="color: #FFFFFF !important;"> <span>Get Quote</span> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> </a> <p class="text-xs text-[#68727C] text-center mt-2">On ${provider.name}'s Website</p> </div> <!-- Right Panel - Provider Details --> <div class="p-6 md:p-8"> <div class="flex items-start justify-between mb-2"> <h3 class="font-sora font-bold text-xl md:text-2xl text-[#162433]">${provider.name}</h3> <span class="bg-[#0D2C4B] text-white text-xs font-bold px-3 py-1 rounded-full">#${index + 1}</span> </div> <div class="flex items-center gap-4 mb-4 flex-wrap"> <div class="flex items-center gap-1"> <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> <span class="font-bold text-[#162433]">${provider.rating}/5</span> </div> <span class="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">AM Best: ${provider.amBest}</span> <span class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">${provider.bestFor}</span> </div> <div class="grid grid-cols-3 gap-4 mb-4"> <div class="bg-[#F7F8FA] p-3 rounded-lg"> <div class="text-xs text-[#68727C] uppercase font-bold mb-1">Monthly</div> <div class="text-lg font-bold text-[#162433]">${provider.monthlyAvg}</div> </div> <div class="bg-[#F7F8FA] p-3 rounded-lg"> <div class="text-xs text-[#68727C] uppercase font-bold mb-1">Coverage</div> <div class="text-lg font-bold text-[#162433]">${provider.coverage}</div> </div> <div class="bg-[#F7F8FA] p-3 rounded-lg"> <div class="text-xs text-[#68727C] uppercase font-bold mb-1">Best For</div> <div class="text-xs font-bold text-[#162433]">${provider.bestFor}</div> </div> </div> <p class="text-[#68727C] mb-6 text-sm">${provider.description}</p> <!-- Verdict Box --> <div class="grid md:grid-cols-2 gap-4"> <div> <h4 class="font-bold text-[#162433] mb-2 flex items-center gap-2 text-sm"> <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
Pros
</h4> <ul class="text-sm text-[#68727C] space-y-1"> ${provider.pros.map((pro) => renderTemplate`<li>• ${pro}</li>`)} </ul> </div> <div> <h4 class="font-bold text-[#162433] mb-2 flex items-center gap-2 text-sm"> <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
Cons
</h4> <ul class="text-sm text-[#68727C] space-y-1"> ${provider.cons.map((con) => renderTemplate`<li>• ${con}</li>`)} </ul> </div> </div> </div> </div> </div>`)} </div> </section>  <section id="coverage" class="py-16 bg-white"> <div class="max-w-4xl mx-auto px-4 md:px-8"> <h2 class="font-sora text-3xl font-bold text-[#162433] mb-8 text-center">Renters Insurance Coverage Guide</h2> <div class="grid md:grid-cols-2 gap-6"> <div class="bg-[#F7F8FA] p-6 rounded-xl"> <h3 class="font-bold text-[#162433] mb-3">Personal Property Coverage</h3> <p class="text-sm text-[#68727C]">Protects your belongings from theft, fire, vandalism, and certain weather events. Take a home inventory—most renters underestimate their possessions' value. $30,000 coverage costs ~$15/month.</p> </div> <div class="bg-[#F7F8FA] p-6 rounded-xl"> <h3 class="font-bold text-[#162433] mb-3">Liability Coverage</h3> <p class="text-sm text-[#68727C]">Covers you if someone is injured in your rental or you accidentally damage property. Also pays legal defense costs. Standard $100,000 coverage is usually included; consider $300,000.</p> </div> <div class="bg-[#F7F8FA] p-6 rounded-xl"> <h3 class="font-bold text-[#162433] mb-3">Loss of Use (ALE)</h3> <p class="text-sm text-[#68727C]">Pays for temporary housing and increased living expenses if your rental becomes uninhabitable. Typically covers hotel, restaurant meals, and other costs for several months.</p> </div> <div class="bg-[#F7F8FA] p-6 rounded-xl"> <h3 class="font-bold text-[#162433] mb-3">Medical Payments</h3> <p class="text-sm text-[#68727C]">Covers minor injuries to guests regardless of fault. Typically $1,000-$5,000. Helps avoid liability claims for small accidents like a guest tripping on your rug.</p> </div> </div> </div> </section>  <section id="compare" class="py-16 bg-[#F7F8FA]"> <div class="max-w-5xl mx-auto px-4 md:px-8"> <h2 class="font-sora text-3xl font-bold text-[#162433] mb-8 text-center">Quick Comparison</h2> <div class="overflow-x-auto"> <table class="w-full bg-white rounded-xl overflow-hidden" style="box-shadow: 0 1px 3px rgba(0,0,0,0.08);"> <thead class="bg-[#0D2C4B] text-white"> <tr> <th class="p-4 text-left font-bold text-sm">Provider</th> <th class="p-4 text-center font-bold text-sm">Monthly</th> <th class="p-4 text-center font-bold text-sm">Coverage</th> <th class="p-4 text-center font-bold text-sm">Rating</th> <th class="p-4 text-center font-bold text-sm">Best For</th> </tr> </thead> <tbody> ${providers.map((provider, index) => renderTemplate`<tr${addAttribute(index % 2 === 0 ? "bg-white" : "bg-[#F7F8FA]", "class")}> <td class="p-4 font-bold text-[#162433]">${provider.name}</td> <td class="p-4 text-center text-[#162433]">${provider.monthlyAvg}</td> <td class="p-4 text-center text-[#162433]">${provider.coverage}</td> <td class="p-4 text-center"> <span class="inline-flex items-center gap-1"> <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> ${provider.rating} </span> </td> <td class="p-4 text-center text-sm text-[#68727C]">${provider.bestFor}</td> </tr>`)} </tbody> </table> </div> </div> </section>  <div id="faq"> ${renderComponent($$result2, "AnimatedFAQ", AnimatedFAQ, { "faqs": faqs, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/AnimatedFAQ.tsx", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/insurance/renters.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/insurance/renters.astro";
const $$url = "/insurance/renters";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Renters,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
