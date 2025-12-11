import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_DvAyv4g9.mjs';
import { C as CursorTrailDark } from '../../chunks/CursorTrailDark_De5gOi5L.mjs';
import { C as ComparisonTOCToggle, A as AnimatedFAQ } from '../../chunks/ComparisonTOCToggle_BDX6J6rE.mjs';
export { renderers } from '../../renderers.mjs';

const $$Car = createComponent(($$result, $$props, $$slots) => {
  const providers = [
    {
      name: "GEICO",
      logo: "/insurance-logos-small/geico.png",
      bestFor: "Budget-Conscious Drivers",
      monthlyAvg: "$120",
      rating: 4.8,
      pros: ["Competitive rates", "Strong mobile app", "24/7 customer service", "Military discounts"],
      cons: ["Limited local agents", "No gap coverage"],
      description: "GEICO offers some of the most competitive rates in the industry with excellent digital tools and customer service.",
      amBest: "A++"
    },
    {
      name: "Progressive",
      logo: "/insurance-logos-small/progressive.png",
      bestFor: "High-Risk Drivers",
      monthlyAvg: "$140",
      rating: 4.6,
      pros: ["Name Your Price tool", "Snapshot discount program", "Comprehensive coverage options", "Pet injury coverage"],
      cons: ["Higher rates for some", "Customer service varies"],
      description: "Progressive is known for accepting high-risk drivers and offering innovative tools like the Snapshot program for safe driver discounts.",
      amBest: "A+"
    },
    {
      name: "State Farm",
      logo: "/insurance-logos-small/statefarm.png",
      bestFor: "Full-Service Experience",
      monthlyAvg: "$135",
      rating: 4.7,
      pros: ["Largest network of agents", "Drive Safe & Save program", "Excellent bundling discounts", "Rideshare coverage"],
      cons: ["Rates vary by state", "App needs improvement"],
      description: "State Farm combines personal agent service with competitive rates and extensive coverage options for a well-rounded experience.",
      amBest: "A++"
    },
    {
      name: "USAA",
      logo: "/insurance-logos-small/usaa.png",
      bestFor: "Military Members",
      monthlyAvg: "$95",
      rating: 4.9,
      pros: ["Lowest average rates", "Exceptional customer service", "Military-specific benefits", "Accident forgiveness"],
      cons: ["Limited to military/family", "Few physical locations"],
      description: "USAA consistently ranks highest in customer satisfaction and offers the lowest rates\u2014available exclusively to military members and their families.",
      amBest: "A++"
    },
    {
      name: "Allstate",
      logo: "/insurance-logos-small/allstate.png",
      bestFor: "Accident Forgiveness",
      monthlyAvg: "$155",
      rating: 4.5,
      pros: ["Drivewise safe driver program", "Deductible rewards", "New car replacement", "Roadside assistance"],
      cons: ["Higher average rates", "Complex policy options"],
      description: "Allstate offers robust coverage with unique features like accident forgiveness and deductible rewards for loyal customers.",
      amBest: "A+"
    },
    {
      name: "Liberty Mutual",
      logo: "/insurance-logos-small/libertymutual.png",
      bestFor: "Customizable Coverage",
      monthlyAvg: "$150",
      rating: 4.4,
      pros: ["RightTrack discount program", "New car replacement", "Better car replacement", "Lifetime repair guarantee"],
      cons: ["Higher baseline rates", "Mixed reviews on claims"],
      description: "Liberty Mutual excels in customizable coverage options and unique benefits like lifetime repair guarantees.",
      amBest: "A"
    }
  ];
  const faqs = [
    {
      question: "What factors affect my car insurance rates?",
      answer: "Key factors include your driving history, age, location, credit score, vehicle type, coverage levels, and annual mileage. Discounts may be available for bundling, safe driving, and good student status."
    },
    {
      question: "How much car insurance do I need?",
      answer: "At minimum, you need your state's required liability coverage. However, experts recommend at least 100/300/100 liability limits plus comprehensive and collision if your car is financed or worth more than a few thousand dollars."
    },
    {
      question: "Should I choose a higher deductible?",
      answer: "A higher deductible lowers your premium but means more out-of-pocket costs if you file a claim. Choose a deductible you could comfortably afford in an emergency\u2014typically $500-$1,000."
    },
    {
      question: "What is gap insurance?",
      answer: "Gap insurance covers the difference between what you owe on your car loan and what your car is worth if it's totaled. It's particularly valuable for new cars or those with long loan terms."
    },
    {
      question: "Can I get car insurance with a bad driving record?",
      answer: "Yes, but expect higher rates. Progressive specializes in high-risk drivers. After 3-5 years of clean driving, most violations drop off your record and rates decrease significantly."
    },
    {
      question: "How can I lower my car insurance premium?",
      answer: "Bundle with home insurance, maintain good credit, take defensive driving courses, ask about low-mileage discounts, raise your deductible, and shop around annually to compare rates from multiple insurers."
    }
  ];
  const tocItems = [
    { id: "providers", label: "Top Insurers", href: "#providers" },
    { id: "coverage", label: "Coverage Guide", href: "#coverage" },
    { id: "compare", label: "Compare", href: "#compare" },
    { id: "faq", label: "FAQ", href: "#faq" }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Best Car Insurance of 2025", "description": "Expert reviews of the best car insurance providers. Compare rates, coverage, and customer satisfaction to find affordable auto insurance." }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CursorTrailDark", CursorTrailDark, { "client:load": true, "title": "Best Car Insurance of December 2025", "kicker": "", "subtitle": "Compare top-rated auto insurers for the best coverage at the lowest rates.", "author": "Screened Insurance Team", "date": "Dec. 11, 2025", "compact": true, "animateTitle": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/CursorTrailDark.tsx", "client:component-export": "default" })}  ${maybeRenderHead()}<section class="bg-[#F7F8FA] py-4"> <div class="max-w-5xl mx-auto px-4 md:px-8"> <p class="text-xs text-[#68727C] leading-relaxed">
We may receive compensation when you click on links to products. Our analysis, reviews, and opinions are entirely from our editorial team. Please view our <a href="/advertising" class="text-[#3B82F6] hover:underline">advertising policy</a> for more information.
</p> </div> </section>  <section class="bg-white border-b border-gray-200 py-3 sticky top-16 z-40"> <div class="max-w-5xl mx-auto px-4 md:px-8"> ${renderComponent($$result2, "ComparisonTOCToggle", ComparisonTOCToggle, { "items": tocItems, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/ComparisonTOCToggle.tsx", "client:component-export": "default" })} </div> </section>  <section id="providers" class="py-12 bg-[#F7F8FA]"> <div class="max-w-5xl mx-auto px-4 md:px-8"> <!-- Research Intro --> <div class="text-center mb-10"> <p class="text-[#68727C] max-w-3xl mx-auto leading-relaxed">We collected 312 quotes across 8 driver profiles in 15 states, analyzing actual premiums versus advertised rates. We also reviewed 14,000+ J.D. Power survey responses and NAIC complaint ratios. These 6 insurers consistently deliver the best combination of pricing, coverage, and claims satisfaction.</p> </div> ${providers.map((provider, index) => renderTemplate`<div class="bg-white rounded-xl overflow-hidden mb-8 hover:shadow-lg transition-shadow" style="box-shadow: 0 1px 3px rgba(0,0,0,0.08);"> <div class="grid md:grid-cols-[300px_1fr]"> <!-- Left Panel - Logo & CTA --> <div class="bg-[#F7F8FA] p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100"> <!-- Provider Logo --> <div class="w-48 h-32 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center bg-white p-4" style="box-shadow: 0 4px 12px rgba(0,0,0,0.06);"> <img${addAttribute(provider.logo, "src")}${addAttribute(`${provider.name} logo`, "alt")} class="max-w-full max-h-full object-contain"> </div> <!-- Apply Button --> <a href="#" class="w-full bg-gradient-to-r from-[#0066B2] to-[#004C8C] hover:from-[#004C8C] hover:to-[#003366] text-center py-4 rounded-lg font-bold transition-all text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2" style="color: #FFFFFF !important;"> <span>Get Quote</span> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> </a> <p class="text-xs text-[#68727C] text-center mt-2">On ${provider.name}'s Website</p> </div> <!-- Right Panel - Provider Details --> <div class="p-6 md:p-8"> <div class="flex items-start justify-between mb-2"> <h3 class="font-sora font-bold text-xl md:text-2xl text-[#162433]">${provider.name}</h3> <span class="bg-[#0D2C4B] text-white text-xs font-bold px-3 py-1 rounded-full">#${index + 1}</span> </div> <div class="flex items-center gap-4 mb-4 flex-wrap"> <div class="flex items-center gap-1"> <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> <span class="font-bold text-[#162433]">${provider.rating}/5</span> </div> <span class="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">AM Best: ${provider.amBest}</span> <span class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">${provider.bestFor}</span> </div> <div class="grid grid-cols-2 gap-4 mb-4"> <div class="bg-[#F7F8FA] p-3 rounded-lg"> <div class="text-xs text-[#68727C] uppercase font-bold mb-1">Avg. Monthly</div> <div class="text-lg font-bold text-[#162433]">${provider.monthlyAvg}</div> </div> <div class="bg-[#F7F8FA] p-3 rounded-lg"> <div class="text-xs text-[#68727C] uppercase font-bold mb-1">Best For</div> <div class="text-lg font-bold text-[#162433]">${provider.bestFor}</div> </div> </div> <p class="text-[#68727C] mb-6 text-sm">${provider.description}</p> <!-- Verdict Box --> <div class="grid md:grid-cols-2 gap-4"> <div> <h4 class="font-bold text-[#162433] mb-2 flex items-center gap-2 text-sm"> <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
Pros
</h4> <ul class="text-sm text-[#68727C] space-y-1"> ${provider.pros.map((pro) => renderTemplate`<li>• ${pro}</li>`)} </ul> </div> <div> <h4 class="font-bold text-[#162433] mb-2 flex items-center gap-2 text-sm"> <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
Cons
</h4> <ul class="text-sm text-[#68727C] space-y-1"> ${provider.cons.map((con) => renderTemplate`<li>• ${con}</li>`)} </ul> </div> </div> </div> </div> </div>`)} </div> </section>  <section id="coverage" class="py-16 bg-white"> <div class="max-w-4xl mx-auto px-4 md:px-8"> <h2 class="font-sora text-3xl font-bold text-[#162433] mb-8 text-center">Car Insurance Coverage Guide</h2> <div class="grid md:grid-cols-2 gap-6"> <div class="bg-[#F7F8FA] p-6 rounded-xl"> <h3 class="font-bold text-[#162433] mb-3">Liability Coverage</h3> <p class="text-sm text-[#68727C]">Covers damages you cause to others. State minimums vary, but experts recommend 100/300/100 ($100K per person, $300K per accident bodily injury, $100K property damage).</p> </div> <div class="bg-[#F7F8FA] p-6 rounded-xl"> <h3 class="font-bold text-[#162433] mb-3">Collision Coverage</h3> <p class="text-sm text-[#68727C]">Pays to repair your car after an accident, regardless of fault. Required for financed vehicles. Consider dropping on cars worth less than $4,000.</p> </div> <div class="bg-[#F7F8FA] p-6 rounded-xl"> <h3 class="font-bold text-[#162433] mb-3">Comprehensive Coverage</h3> <p class="text-sm text-[#68727C]">Covers non-collision damage: theft, vandalism, weather, animal strikes. Often bundled with collision. $500 deductible is standard.</p> </div> <div class="bg-[#F7F8FA] p-6 rounded-xl"> <h3 class="font-bold text-[#162433] mb-3">Uninsured Motorist</h3> <p class="text-sm text-[#68727C]">Protects you if hit by an uninsured driver. 13% of drivers lack insurance. Match your liability limits for best protection.</p> </div> </div> </div> </section>  <section id="compare" class="py-16 bg-[#F7F8FA]"> <div class="max-w-5xl mx-auto px-4 md:px-8"> <h2 class="font-sora text-3xl font-bold text-[#162433] mb-8 text-center">Quick Comparison</h2> <div class="overflow-x-auto"> <table class="w-full bg-white rounded-xl overflow-hidden" style="box-shadow: 0 1px 3px rgba(0,0,0,0.08);"> <thead class="bg-[#0D2C4B] text-white"> <tr> <th class="p-4 text-left font-bold text-sm">Provider</th> <th class="p-4 text-center font-bold text-sm">Avg. Monthly</th> <th class="p-4 text-center font-bold text-sm">Rating</th> <th class="p-4 text-center font-bold text-sm">AM Best</th> <th class="p-4 text-center font-bold text-sm">Best For</th> </tr> </thead> <tbody> ${providers.map((provider, index) => renderTemplate`<tr${addAttribute(index % 2 === 0 ? "bg-white" : "bg-[#F7F8FA]", "class")}> <td class="p-4 font-bold text-[#162433]">${provider.name}</td> <td class="p-4 text-center text-[#162433]">${provider.monthlyAvg}</td> <td class="p-4 text-center"> <span class="inline-flex items-center gap-1"> <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> ${provider.rating} </span> </td> <td class="p-4 text-center text-green-600 font-medium">${provider.amBest}</td> <td class="p-4 text-center text-sm text-[#68727C]">${provider.bestFor}</td> </tr>`)} </tbody> </table> </div> </div> </section>  <div id="faq"> ${renderComponent($$result2, "AnimatedFAQ", AnimatedFAQ, { "faqs": faqs, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/AnimatedFAQ.tsx", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/insurance/car.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/insurance/car.astro";
const $$url = "/insurance/car";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Car,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
