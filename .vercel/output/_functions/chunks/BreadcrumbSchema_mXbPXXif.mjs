import { e as createAstro, c as createComponent, a as renderTemplate, u as unescapeHTML } from './astro/server_DKBvgln8.mjs';
import 'piccolore';
import 'clsx';
import { b as SITE_URL, e as SITE_LOGO, a as SITE_TITLE } from './consts_DF7oP30b.mjs';

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro("https://www.screened.com");
const $$ArticleSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ArticleSchema;
  const {
    title,
    description,
    url,
    image,
    datePublished,
    dateModified = datePublished,
    author = "Screened Editorial Team",
    authorUrl = SITE_URL,
    section = "Finance",
    tags = [],
    wordCount
  } = Astro2.props;
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const imageUrl = image ? image.startsWith("http") ? image : `${SITE_URL}${image}` : `${SITE_URL}${SITE_LOGO}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${fullUrl}#article`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "headline": title,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    },
    "datePublished": datePublished.toISOString(),
    "dateModified": dateModified.toISOString(),
    "author": {
      "@type": "Person",
      "name": author,
      "url": authorUrl
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": SITE_TITLE,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}${SITE_LOGO}`,
        "width": 512,
        "height": 512
      }
    },
    "articleSection": section,
    "keywords": tags.join(", "),
    "inLanguage": "en-US",
    ...wordCount && { "wordCount": wordCount }
  };
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/Users/permain2/affiliatewebsite/src/components/seo/ArticleSchema.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://www.screened.com");
const $$BreadcrumbSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BreadcrumbSchema;
  const { items } = Astro2.props;
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    ...items
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...item.url && {
        "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
      }
    }))
  };
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/Users/permain2/affiliatewebsite/src/components/seo/BreadcrumbSchema.astro", void 0);

export { $$ArticleSchema as $, $$BreadcrumbSchema as a };
