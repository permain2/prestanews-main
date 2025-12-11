import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BztIZ2OU.mjs';
export { renderers } from '../renderers.mjs';

const $$Advertising = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Advertising Disclosure", "description": "How PrestaNews earns money and maintains editorial independence." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-[#0D2C4B] to-[#1A4A7A] py-12"> <div class="max-w-4xl mx-auto px-4 md:px-8 text-center"> <h1 class="font-sora text-4xl font-bold mb-4" style="color: #FFFFFF !important;">Advertising Disclosure</h1> <p style="color: rgba(255,255,255,0.8) !important;">How we make money while keeping our recommendations honest</p> </div> </section>  <section class="py-16 bg-white"> <div class="max-w-3xl mx-auto px-4 md:px-8 prose prose-lg"> <h2>How We Make Money</h2> <p>
PrestaNews is a free resource that provides credit card reviews, travel guides, and financial education. We earn money through affiliate partnerships with credit card issuers and other financial institutions.
</p> <p>
When you click on certain links on our site and apply for a credit card or other financial product, we may receive compensation from the issuer. This compensation helps us continue to provide free, high-quality content.
</p> <h2>Editorial Independence</h2> <p> <strong>Our editorial content is not influenced by our advertisers.</strong> We maintain strict separation between our editorial team and business team. Our reviews, ratings, and recommendations are based on our own research and analysis.
</p> <p>
The compensation we receive may affect:
</p> <ul> <li>Which products we choose to review</li> <li>Where products appear on our site</li> <li>Whether a product is featured or highlighted</li> </ul> <p>
It does <strong>not</strong> affect:
</p> <ul> <li>Our ratings or reviews</li> <li>Our recommendations</li> <li>The accuracy of our information</li> </ul> <h2>Our Review Process</h2> <p>
Every product we review goes through a rigorous evaluation process. We analyze:
</p> <ul> <li>Sign-up bonuses and earning rates</li> <li>Annual fees and other costs</li> <li>Benefits and perks</li> <li>Redemption options and value</li> <li>Overall value proposition</li> </ul> <h2>Transparency Commitment</h2> <p>
We believe in transparency. When you see a "Apply Now" button or similar call-to-action, you should assume we may earn compensation if you apply and are approved. We clearly label sponsored content and advertisements.
</p> <h2>Questions?</h2> <p>
If you have questions about our advertising practices, please contact us at advertising@prestanews.com.
</p> </div> </section> ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/advertising.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/advertising.astro";
const $$url = "/advertising";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Advertising,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
