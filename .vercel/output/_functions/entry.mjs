import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_yVw-26EO.mjs';
import { manifest } from './manifest_1rpl9FkQ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/_---index_.astro.mjs');
const _page3 = () => import('./pages/advertising.astro.mjs');
const _page4 = () => import('./pages/api/subscribe.astro.mjs');
const _page5 = () => import('./pages/api/subscribers.astro.mjs');
const _page6 = () => import('./pages/blog/best-auto-refinance-lenders.astro.mjs');
const _page7 = () => import('./pages/blog/best-car-transport-companies.astro.mjs');
const _page8 = () => import('./pages/blog/best-disability-insurance.astro.mjs');
const _page9 = () => import('./pages/blog/best-gold-ira-companies.astro.mjs');
const _page10 = () => import('./pages/blog/best-home-security-cameras.astro.mjs');
const _page11 = () => import('./pages/blog/best-home-warranty-companies.astro.mjs');
const _page12 = () => import('./pages/blog/best-internet-providers.astro.mjs');
const _page13 = () => import('./pages/blog/best-mortgage-refinance-companies.astro.mjs');
const _page14 = () => import('./pages/blog/best-online-savings-accounts.astro.mjs');
const _page15 = () => import('./pages/blog/best-rv-insurance.astro.mjs');
const _page16 = () => import('./pages/blog/best-small-business-insurance.astro.mjs');
const _page17 = () => import('./pages/blog/best-student-loans.astro.mjs');
const _page18 = () => import('./pages/blog.astro.mjs');
const _page19 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page20 = () => import('./pages/brand.astro.mjs');
const _page21 = () => import('./pages/careers/junior-developer.astro.mjs');
const _page22 = () => import('./pages/careers/senior-content-writer.astro.mjs');
const _page23 = () => import('./pages/careers/seo-specialist.astro.mjs');
const _page24 = () => import('./pages/careers/travel-editor.astro.mjs');
const _page25 = () => import('./pages/careers.astro.mjs');
const _page26 = () => import('./pages/consumer-health-data-privacy.astro.mjs');
const _page27 = () => import('./pages/contact.astro.mjs');
const _page28 = () => import('./pages/credit-cards/balance-transfer.astro.mjs');
const _page29 = () => import('./pages/credit-cards/best-cashback.astro.mjs');
const _page30 = () => import('./pages/credit-cards/best-travel-cards.astro.mjs');
const _page31 = () => import('./pages/credit-cards/business.astro.mjs');
const _page32 = () => import('./pages/credit-cards/no-annual-fee.astro.mjs');
const _page33 = () => import('./pages/credit-cards.astro.mjs');
const _page34 = () => import('./pages/credit-cards-motion.astro.mjs');
const _page35 = () => import('./pages/do-not-sell.astro.mjs');
const _page36 = () => import('./pages/homepage.astro.mjs');
const _page37 = () => import('./pages/index_replicated.astro.mjs');
const _page38 = () => import('./pages/info_replicated.astro.mjs');
const _page39 = () => import('./pages/info-page.astro.mjs');
const _page40 = () => import('./pages/insurance/car.astro.mjs');
const _page41 = () => import('./pages/insurance/home.astro.mjs');
const _page42 = () => import('./pages/insurance/life.astro.mjs');
const _page43 = () => import('./pages/insurance/renters.astro.mjs');
const _page44 = () => import('./pages/insurance.astro.mjs');
const _page45 = () => import('./pages/newsletter.astro.mjs');
const _page46 = () => import('./pages/privacy.astro.mjs');
const _page47 = () => import('./pages/review-page.astro.mjs');
const _page48 = () => import('./pages/reviews.astro.mjs');
const _page49 = () => import('./pages/reviews/_---slug_.astro.mjs');
const _page50 = () => import('./pages/reviews_replicated.astro.mjs');
const _page51 = () => import('./pages/rss.xml.astro.mjs');
const _page52 = () => import('./pages/sitemap.astro.mjs');
const _page53 = () => import('./pages/terms.astro.mjs');
const _page54 = () => import('./pages/travel/airlines.astro.mjs');
const _page55 = () => import('./pages/travel/airport-lounges.astro.mjs');
const _page56 = () => import('./pages/travel/cruises.astro.mjs');
const _page57 = () => import('./pages/travel/destinations.astro.mjs');
const _page58 = () => import('./pages/travel/hotels.astro.mjs');
const _page59 = () => import('./pages/travel.astro.mjs');
const _page60 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/[...index].astro", _page2],
    ["src/pages/advertising.astro", _page3],
    ["src/pages/api/subscribe.ts", _page4],
    ["src/pages/api/subscribers.ts", _page5],
    ["src/pages/blog/best-auto-refinance-lenders.astro", _page6],
    ["src/pages/blog/best-car-transport-companies.astro", _page7],
    ["src/pages/blog/best-disability-insurance.astro", _page8],
    ["src/pages/blog/best-gold-ira-companies.astro", _page9],
    ["src/pages/blog/best-home-security-cameras.astro", _page10],
    ["src/pages/blog/best-home-warranty-companies.astro", _page11],
    ["src/pages/blog/best-internet-providers.astro", _page12],
    ["src/pages/blog/best-mortgage-refinance-companies.astro", _page13],
    ["src/pages/blog/best-online-savings-accounts.astro", _page14],
    ["src/pages/blog/best-rv-insurance.astro", _page15],
    ["src/pages/blog/best-small-business-insurance.astro", _page16],
    ["src/pages/blog/best-student-loans.astro", _page17],
    ["src/pages/blog/index.astro", _page18],
    ["src/pages/blog/[...slug].astro", _page19],
    ["src/pages/brand.astro", _page20],
    ["src/pages/careers/junior-developer.astro", _page21],
    ["src/pages/careers/senior-content-writer.astro", _page22],
    ["src/pages/careers/seo-specialist.astro", _page23],
    ["src/pages/careers/travel-editor.astro", _page24],
    ["src/pages/careers.astro", _page25],
    ["src/pages/consumer-health-data-privacy.astro", _page26],
    ["src/pages/contact.astro", _page27],
    ["src/pages/credit-cards/balance-transfer.astro", _page28],
    ["src/pages/credit-cards/best-cashback.astro", _page29],
    ["src/pages/credit-cards/best-travel-cards.astro", _page30],
    ["src/pages/credit-cards/business.astro", _page31],
    ["src/pages/credit-cards/no-annual-fee.astro", _page32],
    ["src/pages/credit-cards/index.astro", _page33],
    ["src/pages/credit-cards-motion.astro", _page34],
    ["src/pages/do-not-sell.astro", _page35],
    ["src/pages/homepage.html", _page36],
    ["src/pages/index_replicated.astro", _page37],
    ["src/pages/info_replicated.astro", _page38],
    ["src/pages/info-page.html", _page39],
    ["src/pages/insurance/car.astro", _page40],
    ["src/pages/insurance/home.astro", _page41],
    ["src/pages/insurance/life.astro", _page42],
    ["src/pages/insurance/renters.astro", _page43],
    ["src/pages/insurance/index.astro", _page44],
    ["src/pages/newsletter.astro", _page45],
    ["src/pages/privacy.astro", _page46],
    ["src/pages/review-page.html", _page47],
    ["src/pages/reviews/index.astro", _page48],
    ["src/pages/reviews/[...slug].astro", _page49],
    ["src/pages/reviews_replicated.astro", _page50],
    ["src/pages/rss.xml.js", _page51],
    ["src/pages/sitemap.astro", _page52],
    ["src/pages/terms.astro", _page53],
    ["src/pages/travel/airlines.astro", _page54],
    ["src/pages/travel/airport-lounges.astro", _page55],
    ["src/pages/travel/cruises.astro", _page56],
    ["src/pages/travel/destinations.astro", _page57],
    ["src/pages/travel/hotels.astro", _page58],
    ["src/pages/travel/index.astro", _page59],
    ["src/pages/index.astro", _page60]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a52aecbd-e2f5-4682-b752-bfffae9d74af",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
