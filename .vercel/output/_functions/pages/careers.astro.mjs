import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BztIZ2OU.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Careers = createComponent(($$result, $$props, $$slots) => {
  const openings = [
    {
      id: "senior-content-writer",
      title: "Senior Content Writer - Credit Cards",
      department: "Editorial",
      location: "Remote",
      type: "Full-time",
      icon: "edit"
    },
    {
      id: "travel-editor",
      title: "Travel Editor",
      department: "Editorial",
      location: "Remote",
      type: "Full-time",
      icon: "airplane"
    },
    {
      id: "seo-specialist",
      title: "SEO Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      icon: "chart"
    },
    {
      id: "junior-developer",
      title: "Junior Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      icon: "code"
    }
  ];
  const benefits = [
    {
      icon: "globe",
      title: "Remote First",
      description: "Work from anywhere in the world with flexible hours."
    },
    {
      icon: "airplane",
      title: "Travel Perks",
      description: "Annual travel stipend and access to industry events."
    },
    {
      icon: "trending",
      title: "Growth",
      description: "Learning budget and career development opportunities."
    },
    {
      icon: "heart",
      title: "Benefits",
      description: "Comprehensive health insurance and 401(k) matching."
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Careers", "description": "Join the PrestaNews team and help millions make smarter financial decisions.", "data-astro-cid-2pjcwduj": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-[#0D2C4B] to-[#1A4A7A] py-16 md:py-24" data-astro-cid-2pjcwduj> <div class="max-w-4xl mx-auto px-4 md:px-8 text-center" data-astro-cid-2pjcwduj> <h1 class="font-sora text-4xl md:text-5xl font-bold text-white mb-6" style="color: white !important;" data-astro-cid-2pjcwduj>Join Our Team</h1> <p class="text-xl text-gray-300" data-astro-cid-2pjcwduj>
Help millions of readers make smarter financial decisions and travel better.
</p> </div> </section>  <section class="py-16 bg-white" data-astro-cid-2pjcwduj> <div class="max-w-4xl mx-auto px-4 md:px-8" data-astro-cid-2pjcwduj> <h2 class="font-sora text-3xl font-bold text-[#162433] mb-8 text-center" data-astro-cid-2pjcwduj>Why Work at PrestaNews</h2> <div class="grid md:grid-cols-2 gap-8" data-astro-cid-2pjcwduj> ${benefits.map((benefit) => renderTemplate`<div class="benefit-card" data-astro-cid-2pjcwduj> <div class="benefit-icon" data-astro-cid-2pjcwduj> ${benefit.icon === "globe" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-2pjcwduj> <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" data-astro-cid-2pjcwduj></path> </svg>`} ${benefit.icon === "airplane" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-2pjcwduj> <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" data-astro-cid-2pjcwduj></path> </svg>`} ${benefit.icon === "trending" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-2pjcwduj> <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" data-astro-cid-2pjcwduj></path> </svg>`} ${benefit.icon === "heart" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-2pjcwduj> <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" data-astro-cid-2pjcwduj></path> </svg>`} </div> <div data-astro-cid-2pjcwduj> <h3 class="font-bold text-[#162433] mb-2" data-astro-cid-2pjcwduj>${benefit.title}</h3> <p class="text-[#68727C]" data-astro-cid-2pjcwduj>${benefit.description}</p> </div> </div>`)} </div> </div> </section>  <section class="py-16 bg-[#F7F8FA]" data-astro-cid-2pjcwduj> <div class="max-w-4xl mx-auto px-4 md:px-8" data-astro-cid-2pjcwduj> <h2 class="font-sora text-3xl font-bold text-[#162433] mb-8 text-center" data-astro-cid-2pjcwduj>Open Positions</h2> <div class="space-y-4" data-astro-cid-2pjcwduj> ${openings.map((job) => renderTemplate`<a${addAttribute(`/careers/${job.id}`, "href")} class="job-card" data-astro-cid-2pjcwduj> <div class="job-icon" data-astro-cid-2pjcwduj> ${job.icon === "edit" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-2pjcwduj> <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" data-astro-cid-2pjcwduj></path> </svg>`} ${job.icon === "airplane" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-2pjcwduj> <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" data-astro-cid-2pjcwduj></path> </svg>`} ${job.icon === "chart" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-2pjcwduj> <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" data-astro-cid-2pjcwduj></path> </svg>`} ${job.icon === "code" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-2pjcwduj> <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" data-astro-cid-2pjcwduj></path> </svg>`} </div> <div class="job-content" data-astro-cid-2pjcwduj> <h3 class="job-title" data-astro-cid-2pjcwduj>${job.title}</h3> <p class="job-department" data-astro-cid-2pjcwduj>${job.department}</p> </div> <div class="job-meta" data-astro-cid-2pjcwduj> <span class="job-location" data-astro-cid-2pjcwduj>${job.location}</span> <span class="job-type" data-astro-cid-2pjcwduj>${job.type}</span> </div> <div class="job-arrow" data-astro-cid-2pjcwduj> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" data-astro-cid-2pjcwduj> <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" data-astro-cid-2pjcwduj></path> </svg> </div> </a>`)} </div> <p class="text-center text-[#68727C] mt-8" data-astro-cid-2pjcwduj>
Don't see a role that fits? Email us at <a href="mailto:careers@prestanews.com" class="text-[#3B82F6] hover:underline" data-astro-cid-2pjcwduj>careers@prestanews.com</a> </p> </div> </section> ` })} `;
}, "/Users/permain2/affiliatewebsite/src/pages/careers.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/careers.astro";
const $$url = "/careers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Careers,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
