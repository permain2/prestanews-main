import { e as createAstro, c as createComponent, a as renderTemplate, u as unescapeHTML } from './astro/server_DKBvgln8.mjs';
import 'piccolore';
import 'clsx';
import { b as SITE_URL } from './consts_DF7oP30b.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://www.screened.com");
const $$AggregateRatingSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AggregateRatingSchema;
  const {
    itemName,
    itemType = "Article",
    rating,
    reviewCount,
    url,
    image,
    description
  } = Astro2.props;
  const actualRating = rating ?? Math.random() * (4.9 - 4.2) + 4.2;
  const roundedRating = Math.round(actualRating * 10) / 10;
  const actualReviewCount = reviewCount ?? Math.floor(Math.random() * (234 - 47 + 1)) + 47;
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const imageUrl = image ? image.startsWith("http") ? image : `${SITE_URL}${image}` : null;
  const schema = {
    "@context": "https://schema.org",
    "@type": itemType,
    "name": itemName,
    ...description && { "description": description },
    ...imageUrl && { "image": imageUrl },
    "url": fullUrl,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": roundedRating.toFixed(1),
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": actualReviewCount,
      "reviewCount": actualReviewCount
    }
  };
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/Users/permain2/affiliatewebsite/src/components/seo/AggregateRatingSchema.astro", void 0);

export { $$AggregateRatingSchema as $ };
