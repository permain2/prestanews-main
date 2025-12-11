import { c as createComponent, d as renderHead, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="referrer" content="same-origin"><meta name="robots" content="noindex, nofollow"><title>Screened Admin | Content Management</title><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Custom fonts for branding --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Lexend:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body> <div id="studio-root"> ${renderComponent($$result, "Studio", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/admin/Studio", "client:component-export": "default" })} </div> </body></html>`;
}, "/Users/permain2/affiliatewebsite/src/pages/admin/[...index].astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/admin/[...index].astro";
const $$url = "/admin/[...index]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
