import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BztIZ2OU.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Contact Us", "description": "Get in touch with the PrestaNews team.", "data-astro-cid-uw5kdbxl": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="page-header" data-astro-cid-uw5kdbxl> <div class="container-main" data-astro-cid-uw5kdbxl> <h1 data-astro-cid-uw5kdbxl>Contact Us</h1> <p data-astro-cid-uw5kdbxl>Have a question or feedback? We'd love to hear from you.</p> </div> </section>  <section class="section-white py-16 md:py-24" data-astro-cid-uw5kdbxl> <div class="container-main" data-astro-cid-uw5kdbxl> <div class="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto" data-astro-cid-uw5kdbxl> <!-- Form --> <div data-astro-cid-uw5kdbxl> <h2 class="text-2xl font-sora font-bold text-[#162433] mb-6" data-astro-cid-uw5kdbxl>Send Us a Message</h2> <form class="contact-form" data-astro-cid-uw5kdbxl> <div class="form-group" data-astro-cid-uw5kdbxl> <label for="name" data-astro-cid-uw5kdbxl>Name</label> <input type="text" id="name" name="name" placeholder="Your name" required data-astro-cid-uw5kdbxl> </div> <div class="form-group" data-astro-cid-uw5kdbxl> <label for="email" data-astro-cid-uw5kdbxl>Email</label> <input type="email" id="email" name="email" placeholder="your@email.com" required data-astro-cid-uw5kdbxl> </div> <div class="form-group" data-astro-cid-uw5kdbxl> <label for="subject" data-astro-cid-uw5kdbxl>Subject</label> <select id="subject" name="subject" required data-astro-cid-uw5kdbxl> <option value="" data-astro-cid-uw5kdbxl>Select a topic</option> <option value="general" data-astro-cid-uw5kdbxl>General Inquiry</option> <option value="editorial" data-astro-cid-uw5kdbxl>Editorial/Content</option> <option value="advertising" data-astro-cid-uw5kdbxl>Advertising</option> <option value="partnerships" data-astro-cid-uw5kdbxl>Partnerships</option> <option value="technical" data-astro-cid-uw5kdbxl>Technical Issue</option> </select> </div> <div class="form-group" data-astro-cid-uw5kdbxl> <label for="message" data-astro-cid-uw5kdbxl>Message</label> <textarea id="message" name="message" rows="5" placeholder="How can we help you?" required data-astro-cid-uw5kdbxl></textarea> </div> <button type="submit" class="btn-primary" data-astro-cid-uw5kdbxl>Send Message</button> </form> </div> <!-- Contact Info --> <div data-astro-cid-uw5kdbxl> <h2 class="text-2xl font-sora font-bold text-[#162433] mb-6" data-astro-cid-uw5kdbxl>Other Ways to Reach Us</h2> <div class="contact-info" data-astro-cid-uw5kdbxl> <div class="info-item" data-astro-cid-uw5kdbxl> <h3 data-astro-cid-uw5kdbxl>Email</h3> <p data-astro-cid-uw5kdbxl><a href="mailto:hello@prestanews.com" data-astro-cid-uw5kdbxl>hello@prestanews.com</a></p> </div> <div class="info-item" data-astro-cid-uw5kdbxl> <h3 data-astro-cid-uw5kdbxl>Press Inquiries</h3> <p data-astro-cid-uw5kdbxl><a href="mailto:press@prestanews.com" data-astro-cid-uw5kdbxl>press@prestanews.com</a></p> </div> <div class="info-item" data-astro-cid-uw5kdbxl> <h3 data-astro-cid-uw5kdbxl>Advertising</h3> <p data-astro-cid-uw5kdbxl><a href="mailto:ads@prestanews.com" data-astro-cid-uw5kdbxl>ads@prestanews.com</a></p> </div> <div class="info-item" data-astro-cid-uw5kdbxl> <h3 data-astro-cid-uw5kdbxl>Follow Us</h3> <div class="social-links" data-astro-cid-uw5kdbxl> <a href="#" class="social-link" data-astro-cid-uw5kdbxl>Twitter</a> <a href="#" class="social-link" data-astro-cid-uw5kdbxl>Instagram</a> <a href="#" class="social-link" data-astro-cid-uw5kdbxl>Facebook</a> </div> </div> </div> </div> </div> </div> </section> ` })} `;
}, "/Users/permain2/affiliatewebsite/src/pages/contact.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
