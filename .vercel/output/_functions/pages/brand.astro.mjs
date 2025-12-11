import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BztIZ2OU.mjs';
export { renderers } from '../renderers.mjs';

const $$Brand = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Brand Guidelines", "description": "Internal Brand Guidelines for Prestanews" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gray-100 min-h-screen py-12"> <div class="container mx-auto px-4 max-w-5xl"> <div class="bg-white rounded-xl shadow-lg p-12"> <h1 class="text-4xl font-sora font-bold text-[#162433] mb-8 border-b pb-4">Brand Guidelines</h1> <!-- Colors --> <section class="mb-12"> <h2 class="text-2xl font-sora font-bold mb-6">Colors</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-6"> <div class="space-y-2"> <div class="h-24 bg-[#006056] rounded-lg shadow-sm"></div> <p class="font-bold text-[#162433]">Primary</p> <code class="text-sm bg-gray-100 p-1 rounded">#006056</code> </div> <div class="space-y-2"> <div class="h-24 bg-[#77CB25] rounded-lg shadow-sm"></div> <p class="font-bold text-[#162433]">Secondary</p> <code class="text-sm bg-gray-100 p-1 rounded">#77CB25</code> </div> <div class="space-y-2"> <div class="h-24 bg-[#146aff] rounded-lg shadow-sm"></div> <p class="font-bold text-[#162433]">Accent (Link)</p> <code class="text-sm bg-gray-100 p-1 rounded">#146aff</code> </div> <div class="space-y-2"> <div class="h-24 bg-[#162433] rounded-lg shadow-sm"></div> <p class="font-bold text-[#162433]">Dark Text</p> <code class="text-sm bg-gray-100 p-1 rounded">#162433</code> </div> </div> </section> <!-- Typography --> <section class="mb-12"> <h2 class="text-2xl font-sora font-bold mb-6">Typography</h2> <div class="space-y-6"> <div> <p class="text-sm text-gray-500 mb-2">Headings (Sora)</p> <h1 class="text-5xl font-sora font-bold text-[#162433]">Heading 1</h1> <h2 class="text-4xl font-sora font-bold text-[#162433]">Heading 2</h2> <h3 class="text-3xl font-sora font-bold text-[#162433]">Heading 3</h3> </div> <div> <p class="text-sm text-gray-500 mb-2">Body (Poppins)</p> <p class="font-poppins text-[#162433]">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</p> </div> </div> </section> <!-- UI Elements --> <section> <h2 class="text-2xl font-sora font-bold mb-6">UI Elements</h2> <div class="flex flex-wrap gap-4"> <button class="bg-[#146aff] hover:bg-[#0040B1] text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors">
Primary Button
</button> <button class="bg-[#77CB25] hover:opacity-90 text-[#162433] font-bold py-3 px-6 rounded-lg shadow-md transition-opacity">
Secondary Button
</button> <button class="border-2 border-[#162433] text-[#162433] font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
Outline Button
</button> </div> </section> </div> </div> </div> ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/brand.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/brand.astro";
const $$url = "/brand";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Brand,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
