import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_DvAyv4g9.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Editor-in-Chief",
      bio: "Former financial advisor with 12+ years of experience in credit card rewards optimization.",
      image: "/team/sarah-chen.jpg"
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Credit Card Analyst",
      bio: "Previously worked at two major credit card issuers, now dedicated to helping consumers find the best cards.",
      image: "/team/michael-rodriguez.jpg"
    },
    {
      name: "Emily Johnson",
      role: "Insurance Editor",
      bio: "Licensed insurance agent turned consumer advocate with expertise in auto, home, and life insurance.",
      image: "/team/emily-johnson.jpg"
    },
    {
      name: "David Kim",
      role: "Personal Finance Writer",
      bio: "CFP\xAE professional passionate about making complex financial topics accessible to everyone.",
      image: "/team/david-kim.jpg"
    },
    {
      name: "Jessica Martinez",
      role: "Research Director",
      bio: "Data scientist who leads our card comparison methodology and ensures unbiased analysis.",
      image: "/team/jessica-martinez.jpg"
    },
    {
      name: "James Wilson",
      role: "Senior Content Strategist",
      bio: "10+ years in digital publishing, focused on delivering actionable financial guidance.",
      image: "/team/james-wilson.jpg"
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "About Us", "description": "PrestaNews helps you make smarter financial decisions. Meet our team of experts.", "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="about-hero" data-astro-cid-kh7btl4r> <div class="container-main" data-astro-cid-kh7btl4r> <div class="hero-content" data-astro-cid-kh7btl4r> <span class="kicker" data-astro-cid-kh7btl4r>ABOUT US</span> <h1 class="title" data-astro-cid-kh7btl4r>Your Trusted Guide to<br data-astro-cid-kh7btl4r>Smarter Financial Decisions</h1> <p class="intro" data-astro-cid-kh7btl4r>
PrestaNews was created to help everyday people navigate the complex world of personal finance. 
          We're passionate about helping you find the best credit cards, insurance, and financial products 
          to save money and reach your goals.
</p> </div> </div> </section>  <section class="section-white py-16 md:py-24" data-astro-cid-kh7btl4r> <div class="container-main" data-astro-cid-kh7btl4r> <div class="max-w-3xl" data-astro-cid-kh7btl4r> <h2 class="text-3xl md:text-4xl font-sora font-bold text-[#162433] mb-6" data-astro-cid-kh7btl4r>Our Mission</h2> <p class="text-lg text-[#68727C] leading-relaxed mb-6" data-astro-cid-kh7btl4r>
We believe everyone deserves access to expert financial guidance. Our team of industry experts 
          dedicates thousands of hours each year to researching credit cards, insurance policies, 
          and financial products so you don't have to.
</p> <p class="text-lg text-[#68727C] leading-relaxed mb-8" data-astro-cid-kh7btl4r>
Whether you're looking for your first credit card, shopping for auto insurance, 
          or trying to maximize your rewards, we're here to help you make informed decisions 
          about your finances.
</p> <a href="/contact" class="btn-primary" data-astro-cid-kh7btl4r>Get in Touch</a> </div> </div> </section>  <section class="team-section" data-astro-cid-kh7btl4r> <div class="container-main" data-astro-cid-kh7btl4r> <div class="text-center mb-12" data-astro-cid-kh7btl4r> <h2 class="text-3xl md:text-4xl font-sora font-bold text-[#162433] mb-4" data-astro-cid-kh7btl4r>Meet Our Team</h2> <p class="text-lg text-[#68727C] max-w-2xl mx-auto" data-astro-cid-kh7btl4r>
Our expert team combines decades of experience in finance, insurance, and journalism to bring you trustworthy advice.
</p> </div> <div class="team-grid" data-astro-cid-kh7btl4r> ${teamMembers.map((member) => renderTemplate`<div class="team-card" data-astro-cid-kh7btl4r> <div class="team-image" data-astro-cid-kh7btl4r> <img${addAttribute(member.image, "src")}${addAttribute(member.name, "alt")} loading="lazy" data-astro-cid-kh7btl4r> </div> <div class="team-info" data-astro-cid-kh7btl4r> <h3 class="team-name" data-astro-cid-kh7btl4r>${member.name}</h3> <p class="team-role" data-astro-cid-kh7btl4r>${member.role}</p> <p class="team-bio" data-astro-cid-kh7btl4r>${member.bio}</p> </div> </div>`)} </div> </div> </section>  <section class="section-light py-16 md:py-24" data-astro-cid-kh7btl4r> <div class="container-main" data-astro-cid-kh7btl4r> <h2 class="text-3xl md:text-4xl font-sora font-bold text-[#162433] mb-12 text-center" data-astro-cid-kh7btl4r>What We Cover</h2> <div class="grid md:grid-cols-3 gap-8" data-astro-cid-kh7btl4r> <div class="feature-card" data-astro-cid-kh7btl4r> <div class="feature-icon credit-card-icon" data-astro-cid-kh7btl4r> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-kh7btl4r> <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" data-astro-cid-kh7btl4r></path> </svg> </div> <h3 class="text-xl font-sora font-bold text-[#162433] mb-3" data-astro-cid-kh7btl4r>Credit Cards</h3> <p class="text-[#68727C]" data-astro-cid-kh7btl4r>In-depth, unbiased reviews of every major credit card to help you find the perfect fit for your lifestyle and spending habits.</p> </div> <div class="feature-card" data-astro-cid-kh7btl4r> <div class="feature-icon insurance-icon" data-astro-cid-kh7btl4r> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-kh7btl4r> <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" data-astro-cid-kh7btl4r></path> </svg> </div> <h3 class="text-xl font-sora font-bold text-[#162433] mb-3" data-astro-cid-kh7btl4r>Insurance</h3> <p class="text-[#68727C]" data-astro-cid-kh7btl4r>Expert comparisons of auto, home, renters, and life insurance to help you protect what matters most at the best rates.</p> </div> <div class="feature-card" data-astro-cid-kh7btl4r> <div class="feature-icon guides-icon" data-astro-cid-kh7btl4r> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-kh7btl4r> <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" data-astro-cid-kh7btl4r></path> </svg> </div> <h3 class="text-xl font-sora font-bold text-[#162433] mb-3" data-astro-cid-kh7btl4r>Guides & Resources</h3> <p class="text-[#68727C]" data-astro-cid-kh7btl4r>Step-by-step guides and educational content to help you understand complex financial topics and make smarter decisions.</p> </div> </div> </div> </section>  <section class="section-white py-16 md:py-24" data-astro-cid-kh7btl4r> <div class="container-main" data-astro-cid-kh7btl4r> <h2 class="text-3xl md:text-4xl font-sora font-bold text-[#162433] mb-12 text-center" data-astro-cid-kh7btl4r>Our Values</h2> <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" data-astro-cid-kh7btl4r> <div class="value-item" data-astro-cid-kh7btl4r> <h3 class="text-xl font-sora font-bold text-[#162433] mb-3" data-astro-cid-kh7btl4r>Independence</h3> <p class="text-[#68727C]" data-astro-cid-kh7btl4r>Our reviews are unbiased and independent. We never let advertising influence our editorial content or recommendations.</p> </div> <div class="value-item" data-astro-cid-kh7btl4r> <h3 class="text-xl font-sora font-bold text-[#162433] mb-3" data-astro-cid-kh7btl4r>Transparency</h3> <p class="text-[#68727C]" data-astro-cid-kh7btl4r>We clearly disclose how we make money and always put our readers' interests first in every piece of content.</p> </div> <div class="value-item" data-astro-cid-kh7btl4r> <h3 class="text-xl font-sora font-bold text-[#162433] mb-3" data-astro-cid-kh7btl4r>Expertise</h3> <p class="text-[#68727C]" data-astro-cid-kh7btl4r>Our team includes financial experts, former industry insiders, and experienced researchers dedicated to accuracy.</p> </div> <div class="value-item" data-astro-cid-kh7btl4r> <h3 class="text-xl font-sora font-bold text-[#162433] mb-3" data-astro-cid-kh7btl4r>Accessibility</h3> <p class="text-[#68727C]" data-astro-cid-kh7btl4r>We break down complex financial topics into clear, actionable advice that anyone can understand and apply.</p> </div> </div> </div> </section>  <section class="section-dark py-16 md:py-24" data-astro-cid-kh7btl4r> <div class="container-main text-center" data-astro-cid-kh7btl4r> <h2 class="text-3xl md:text-4xl font-sora font-bold mb-6" style="color: #ffffff !important;" data-astro-cid-kh7btl4r>Stay Connected</h2> <p class="text-lg text-white/80 mb-8 max-w-2xl mx-auto" data-astro-cid-kh7btl4r>
Subscribe to our newsletter for the latest reviews, guides, and financial insights delivered to your inbox.
</p> <a href="/newsletter" class="btn-primary" style="background-color: #146aff;" data-astro-cid-kh7btl4r>Subscribe Now</a> </div> </section> ` })} `;
}, "/Users/permain2/affiliatewebsite/src/pages/about.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
