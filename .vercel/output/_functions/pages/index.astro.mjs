import { e as createAstro, c as createComponent, a as renderTemplate, u as unescapeHTML, r as renderComponent, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BztIZ2OU.mjs';
import { g as getCollection } from '../chunks/_astro_content_Tnc-eghr.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { delay, wrap } from 'motion';
import { Typewriter } from 'motion-plus/react';
import { useState } from 'react';
import 'clsx';
import { d as SITE_DESCRIPTION, a as SITE_TITLE, b as SITE_URL, e as SITE_LOGO } from '../chunks/consts_DF7oP30b.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function HeroTypewriter({
  words = ["Financial", "Insurance", "Credit", "Investment", "Money"]
}) {
  const [index, setIndex] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "hero-typewriter-container", children: [
    /* @__PURE__ */ jsxs("h1", { className: "hero-typewriter-title", children: [
      /* @__PURE__ */ jsx("span", { className: "hero-static-text", children: "Make Smarter" }),
      /* @__PURE__ */ jsx("span", { className: "hero-dynamic-line", children: /* @__PURE__ */ jsx(
        Typewriter,
        {
          as: "span",
          cursorStyle,
          onComplete: () => {
            delay(() => setIndex(wrap(0, words.length, index + 1)), 1.5);
          },
          textStyle,
          children: words[index]
        }
      ) }),
      /* @__PURE__ */ jsx("span", { className: "hero-static-text hero-decisions", children: "Decisions" })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        .hero-typewriter-container {
          text-align: center;
          max-width: 48rem;
          margin: 0 auto;
        }

        .hero-typewriter-title {
          font-family: 'Lexend', sans-serif;
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          font-weight: 600;
          color: #162433;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .hero-static-text {
          display: block;
        }

        .hero-dynamic-line {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 1.2em;
          background: linear-gradient(135deg, #146aff 0%, #0D2C4B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-decisions {
          color: #162433;
        }

        @media (max-width: 768px) {
          .hero-typewriter-title {
            font-size: clamp(1.75rem, 6vw, 2.5rem);
          }
        }
      ` })
  ] });
}
const textStyle = {
  fontSize: "inherit",
  fontWeight: 700,
  lineHeight: 1.15,
  fontFamily: "'Lexend', sans-serif"
};
const cursorStyle = {
  background: "linear-gradient(135deg, #146aff 0%, #0D2C4B 100%)",
  width: 4,
  borderRadius: 2,
  marginLeft: 2
};

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro("https://www.screened.com");
const $$OrganizationSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$OrganizationSchema;
  const {
    name = SITE_TITLE,
    url = SITE_URL,
    logo = `${SITE_URL}${SITE_LOGO}`,
    description = SITE_DESCRIPTION
  } = Astro2.props;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    "name": name,
    "legalName": "Interactive Apps LLC",
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "@id": `${url}/#logo`,
      "url": logo,
      "width": 512,
      "height": 512,
      "caption": name
    },
    "image": logo,
    "description": description,
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/screenedcom",
      "https://www.facebook.com/screenedcom",
      "https://www.linkedin.com/company/screened"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+1-307-998-3039",
      "email": "spencer@interactiveecommerce.com",
      "availableLanguage": ["English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1309 Coffeen Avenue STE 1200",
      "addressLocality": "Sheridan",
      "addressRegion": "WY",
      "postalCode": "82801",
      "addressCountry": "US"
    }
  };
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/Users/permain2/affiliatewebsite/src/components/seo/OrganizationSchema.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://www.screened.com");
const $$WebsiteSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WebsiteSchema;
  const {
    name = SITE_TITLE,
    url = SITE_URL,
    description = SITE_DESCRIPTION
  } = Astro2.props;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    "name": name,
    "url": url,
    "description": description,
    "publisher": {
      "@id": `${url}/#organization`
    },
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/Users/permain2/affiliatewebsite/src/components/seo/WebsiteSchema.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("blog");
  const latestPosts = allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 8);
  const featuredPost = latestPosts[0];
  const sidePosts = latestPosts.slice(1, 4);
  const authors = [
    { name: "Sarah Chen", role: "Editor-in-Chief", image: "/team/sarah-chen.jpg", slug: "sarah-chen" },
    { name: "Michael Rodriguez", role: "Senior Credit Card Analyst", image: "/team/michael-rodriguez.jpg", slug: "michael-rodriguez" },
    { name: "Emily Johnson", role: "Insurance Editor", image: "/team/emily-johnson.jpg", slug: "emily-johnson" }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "OrganizationSchema", $$OrganizationSchema, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "WebsiteSchema", $$WebsiteSchema, { "data-astro-cid-j7pv25f6": true })}  ${maybeRenderHead()}<section class="hero-section" data-astro-cid-j7pv25f6> <div class="hero-container" data-astro-cid-j7pv25f6> <div class="hero-content" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "HeroTypewriter", HeroTypewriter, { "client:load": true, "words": ["Financial", "Insurance", "Credit", "Investment", "Money"], "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/HeroTypewriter.tsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} <p class="hero-subtitle" data-astro-cid-j7pv25f6>
Expert reviews and unbiased comparisons on credit cards, insurance, and personal finance — helping you save money and choose with confidence.
</p> </div> </div> </section>  <section class="quick-links-section" data-astro-cid-j7pv25f6> <div class="quick-links-container" data-astro-cid-j7pv25f6> <div class="quick-links-scroll" data-astro-cid-j7pv25f6> <a href="/credit-cards" class="quick-link-pill" data-astro-cid-j7pv25f6> <svg class="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <rect x="1" y="4" width="22" height="16" rx="2" ry="2" data-astro-cid-j7pv25f6></rect> <line x1="1" y1="10" x2="23" y2="10" data-astro-cid-j7pv25f6></line> </svg>
Credit Cards
</a> <a href="/insurance" class="quick-link-pill" data-astro-cid-j7pv25f6> <svg class="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-j7pv25f6></path> </svg>
Insurance
</a> <a href="/insurance/car" class="quick-link-pill" data-astro-cid-j7pv25f6> <svg class="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" data-astro-cid-j7pv25f6></path> <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" data-astro-cid-j7pv25f6></path> <path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0H9" data-astro-cid-j7pv25f6></path> </svg>
Car Insurance
</a> <a href="/insurance/home" class="quick-link-pill" data-astro-cid-j7pv25f6> <svg class="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" data-astro-cid-j7pv25f6></path> <polyline points="9 22 9 12 15 12 15 22" data-astro-cid-j7pv25f6></polyline> </svg>
Home Insurance
</a> <a href="/blog" class="quick-link-pill" data-astro-cid-j7pv25f6> <svg class="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-j7pv25f6></path> <polyline points="14 2 14 8 20 8" data-astro-cid-j7pv25f6></polyline> <line x1="16" y1="13" x2="8" y2="13" data-astro-cid-j7pv25f6></line> <line x1="16" y1="17" x2="8" y2="17" data-astro-cid-j7pv25f6></line> </svg>
Blog
</a> </div> </div> </section>  <section class="breaking-section" data-astro-cid-j7pv25f6> <div class="breaking-container" data-astro-cid-j7pv25f6> <h2 class="section-title" data-astro-cid-j7pv25f6>Latest Financial News & Insights</h2> <div class="breaking-grid" data-astro-cid-j7pv25f6> <!-- Featured Article --> ${featuredPost && renderTemplate`<a${addAttribute(`/blog/${featuredPost.id}`, "href")} class="featured-article" data-astro-cid-j7pv25f6> <div class="featured-image-wrap" data-astro-cid-j7pv25f6> ${featuredPost.data.heroImage && renderTemplate`<img${addAttribute(featuredPost.data.heroImage, "src")}${addAttribute(featuredPost.data.title, "alt")} class="featured-img" data-astro-cid-j7pv25f6>`} <div class="featured-overlay" data-astro-cid-j7pv25f6></div> </div> <div class="featured-content" data-astro-cid-j7pv25f6> <span class="article-category" data-astro-cid-j7pv25f6>FEATURED</span> <h3 class="featured-title" data-astro-cid-j7pv25f6>${featuredPost.data.title}</h3> <div class="featured-meta" data-astro-cid-j7pv25f6> <span class="meta-date" data-astro-cid-j7pv25f6>${featuredPost.data.pubDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span> <span class="meta-arrow" data-astro-cid-j7pv25f6> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <circle cx="12" cy="12" r="10" data-astro-cid-j7pv25f6></circle> <path d="M12 8l4 4-4 4" data-astro-cid-j7pv25f6></path> <line x1="8" y1="12" x2="16" y2="12" data-astro-cid-j7pv25f6></line> </svg> </span> </div> </div> </a>`} <!-- Side Articles --> <div class="side-articles" data-astro-cid-j7pv25f6> ${sidePosts.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.id}`, "href")} class="side-article" data-astro-cid-j7pv25f6> <div class="side-article-content" data-astro-cid-j7pv25f6> <span class="article-category-small" data-astro-cid-j7pv25f6>NEWS</span> <h4 class="side-article-title" data-astro-cid-j7pv25f6>${post.data.title}</h4> <span class="side-article-date" data-astro-cid-j7pv25f6>${post.data.pubDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span> </div> ${post.data.heroImage && renderTemplate`<div class="side-article-image" data-astro-cid-j7pv25f6> <img${addAttribute(post.data.heroImage, "src")}${addAttribute(post.data.title, "alt")} data-astro-cid-j7pv25f6> </div>`} </a>`)} </div> </div> </div> </section>  <section class="offers-section" data-astro-cid-j7pv25f6> <div class="offers-container" data-astro-cid-j7pv25f6> <h2 class="offers-title" data-astro-cid-j7pv25f6>Great offers from our partners</h2> <div class="offers-grid" data-astro-cid-j7pv25f6> <!-- Card 1 --> <div class="offer-card" data-astro-cid-j7pv25f6> <div class="offer-badge" data-astro-cid-j7pv25f6>Best for Travel</div> <div class="offer-card-image" data-astro-cid-j7pv25f6> <img src="/credit-cards/chase-sapphire-preferred.png" alt="Chase Sapphire Preferred" data-astro-cid-j7pv25f6> </div> <div class="offer-content" data-astro-cid-j7pv25f6> <h3 class="offer-name" data-astro-cid-j7pv25f6>Chase Sapphire Preferred®</h3> <p class="offer-description" data-astro-cid-j7pv25f6>Earn 75,000 bonus points after qualifying spend.</p> <div class="offer-highlight" data-astro-cid-j7pv25f6> <span class="highlight-number" data-astro-cid-j7pv25f6>75,000</span> <span class="highlight-label" data-astro-cid-j7pv25f6>bonus points</span> </div> <a href="https://www.chase.com/personal/credit-cards/sapphire/sapphire-preferred?utm_source=prestanews&utm_medium=affiliate" class="offer-cta" target="_blank" rel="noopener noreferrer" data-astro-cid-j7pv25f6>Apply Now</a> </div> </div> <!-- Card 2 --> <div class="offer-card" data-astro-cid-j7pv25f6> <div class="offer-badge" data-astro-cid-j7pv25f6>Best for Miles</div> <div class="offer-card-image" data-astro-cid-j7pv25f6> <img src="/credit-cards/capital-one-venture-x.png" alt="Capital One Venture X" data-astro-cid-j7pv25f6> </div> <div class="offer-content" data-astro-cid-j7pv25f6> <h3 class="offer-name" data-astro-cid-j7pv25f6>Capital One Venture X</h3> <p class="offer-description" data-astro-cid-j7pv25f6>Earn 100,000 bonus miles with limited-time offer.</p> <div class="offer-highlight" data-astro-cid-j7pv25f6> <span class="highlight-number" data-astro-cid-j7pv25f6>100,000</span> <span class="highlight-label" data-astro-cid-j7pv25f6>bonus miles</span> </div> <a href="https://www.capitalone.com/credit-cards/venture-x/?utm_source=prestanews&utm_medium=affiliate" class="offer-cta" target="_blank" rel="noopener noreferrer" data-astro-cid-j7pv25f6>Apply Now</a> </div> </div> <!-- Card 3 --> <div class="offer-card" data-astro-cid-j7pv25f6> <div class="offer-badge" data-astro-cid-j7pv25f6>Best for Cash Back</div> <div class="offer-card-image" data-astro-cid-j7pv25f6> <img src="/credit-cards/citi-double-cash.png" alt="Citi Double Cash" data-astro-cid-j7pv25f6> </div> <div class="offer-content" data-astro-cid-j7pv25f6> <h3 class="offer-name" data-astro-cid-j7pv25f6>Citi Double Cash® Card</h3> <p class="offer-description" data-astro-cid-j7pv25f6>Earn 2% cash back on every purchase, everywhere.</p> <div class="offer-highlight" data-astro-cid-j7pv25f6> <span class="highlight-number" data-astro-cid-j7pv25f6>2%</span> <span class="highlight-label" data-astro-cid-j7pv25f6>unlimited cash back</span> </div> <a href="https://www.citi.com/credit-cards/citi-double-cash-credit-card?utm_source=prestanews&utm_medium=affiliate" class="offer-cta" target="_blank" rel="noopener noreferrer" data-astro-cid-j7pv25f6>Apply Now</a> </div> </div> </div> <div class="offers-footer" data-astro-cid-j7pv25f6> <a href="/credit-cards" class="see-all-btn" data-astro-cid-j7pv25f6>See All Credit Cards →</a> </div> </div> </section>  <section class="categories-section" data-astro-cid-j7pv25f6> <div class="categories-container" data-astro-cid-j7pv25f6> <h2 class="categories-title" data-astro-cid-j7pv25f6>Explore Our Coverage</h2> <p class="categories-subtitle" data-astro-cid-j7pv25f6>Find the best financial products for your needs</p> <div class="categories-grid" data-astro-cid-j7pv25f6> <a href="/credit-cards" class="category-card credit-cards-cat" data-astro-cid-j7pv25f6> <div class="category-icon" data-astro-cid-j7pv25f6> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-j7pv25f6> <rect x="1" y="4" width="22" height="16" rx="2" ry="2" data-astro-cid-j7pv25f6></rect> <line x1="1" y1="10" x2="23" y2="10" data-astro-cid-j7pv25f6></line> </svg> </div> <h3 data-astro-cid-j7pv25f6>Credit Cards</h3> <p data-astro-cid-j7pv25f6>Compare rewards, cash back, travel & business cards</p> <span class="category-arrow" data-astro-cid-j7pv25f6>→</span> </a> <a href="/insurance" class="category-card insurance-cat" data-astro-cid-j7pv25f6> <div class="category-icon" data-astro-cid-j7pv25f6> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-j7pv25f6> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-j7pv25f6></path> </svg> </div> <h3 data-astro-cid-j7pv25f6>Insurance</h3> <p data-astro-cid-j7pv25f6>Auto, home, renters & life insurance guides</p> <span class="category-arrow" data-astro-cid-j7pv25f6>→</span> </a> <a href="/blog" class="category-card news-cat" data-astro-cid-j7pv25f6> <div class="category-icon" data-astro-cid-j7pv25f6> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-j7pv25f6> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-j7pv25f6></path> <polyline points="14 2 14 8 20 8" data-astro-cid-j7pv25f6></polyline> </svg> </div> <h3 data-astro-cid-j7pv25f6>Blog</h3> <p data-astro-cid-j7pv25f6>Latest industry updates & insights</p> <span class="category-arrow" data-astro-cid-j7pv25f6>→</span> </a> <a href="/reviews" class="category-card reviews-cat" data-astro-cid-j7pv25f6> <div class="category-icon" data-astro-cid-j7pv25f6> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-j7pv25f6> <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-astro-cid-j7pv25f6></polygon> </svg> </div> <h3 data-astro-cid-j7pv25f6>Reviews</h3> <p data-astro-cid-j7pv25f6>In-depth product reviews & ratings</p> <span class="category-arrow" data-astro-cid-j7pv25f6>→</span> </a> </div> </div> </section>  <section class="latest-section" data-astro-cid-j7pv25f6> <div class="latest-container" data-astro-cid-j7pv25f6> <div class="latest-header" data-astro-cid-j7pv25f6> <h2 class="latest-title" data-astro-cid-j7pv25f6>Latest Articles</h2> <a href="/blog" class="view-all-link" data-astro-cid-j7pv25f6>View All →</a> </div> <div class="latest-grid" data-astro-cid-j7pv25f6> ${latestPosts.slice(0, 8).map((post) => renderTemplate`<a${addAttribute(`/blog/${post.id}`, "href")} class="latest-card" data-astro-cid-j7pv25f6> <div class="latest-card-image" data-astro-cid-j7pv25f6> <img${addAttribute(post.data.heroImage || "/blog-images/default-article.jpg", "src")}${addAttribute(post.data.title, "alt")} loading="lazy" data-astro-cid-j7pv25f6> </div> <div class="latest-card-content" data-astro-cid-j7pv25f6> <span class="latest-category" data-astro-cid-j7pv25f6>${post.data.tags?.[0] || "News"}</span> <h3 class="latest-card-title" data-astro-cid-j7pv25f6>${post.data.title}</h3> <p class="latest-card-excerpt" data-astro-cid-j7pv25f6>${post.data.description}</p> ${post.data.author && renderTemplate`<div class="latest-card-author" data-astro-cid-j7pv25f6> ${post.data.authorImage && renderTemplate`<img${addAttribute(post.data.authorImage, "src")}${addAttribute(post.data.author, "alt")} class="author-avatar" data-astro-cid-j7pv25f6>`} <span class="author-name" data-astro-cid-j7pv25f6>${post.data.author}</span> </div>`} </div> </a>`)} </div> </div> </section>  <section class="authors-section" data-astro-cid-j7pv25f6> <div class="authors-container" data-astro-cid-j7pv25f6> <h2 class="authors-title" data-astro-cid-j7pv25f6>Meet Our Experts</h2> <p class="authors-subtitle" data-astro-cid-j7pv25f6>Industry professionals dedicated to helping you make smarter financial decisions</p> <div class="authors-grid" data-astro-cid-j7pv25f6> ${authors.map((author) => renderTemplate`<div class="author-card" data-astro-cid-j7pv25f6> <div class="author-image" data-astro-cid-j7pv25f6> <img${addAttribute(author.image, "src")}${addAttribute(author.name, "alt")} loading="lazy" data-astro-cid-j7pv25f6> </div> <div class="author-info" data-astro-cid-j7pv25f6> <h3 class="author-card-name" data-astro-cid-j7pv25f6>${author.name}</h3> <p class="author-card-role" data-astro-cid-j7pv25f6>${author.role}</p> </div> </div>`)} </div> <div class="authors-cta" data-astro-cid-j7pv25f6> <a href="/about" class="meet-team-btn" data-astro-cid-j7pv25f6>Meet the Full Team →</a> </div> </div> </section> ` })} `;
}, "/Users/permain2/affiliatewebsite/src/pages/index.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
