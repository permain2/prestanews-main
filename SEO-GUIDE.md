# Screened.com - Comprehensive SEO Guide

**Last Updated:** December 2025  
**Website:** www.screened.com

---

## Table of Contents

1. [Article Publishing Checklist](#article-publishing-checklist) ⭐ **START HERE**
2. [Company Information](#company-information)
3. [Author Profiles](#author-profiles)
4. [Site Structure](#site-structure)
5. [Creating SEO-Optimized Posts](#creating-seo-optimized-posts)
6. [Technical SEO Checklist](#technical-seo-checklist)
7. [Schema Markup Reference](#schema-markup-reference)
8. [Image Optimization](#image-optimization)
9. [Internal Linking Strategy](#internal-linking-strategy)
10. [Content Guidelines](#content-guidelines)
11. [Monitoring & Tools](#monitoring--tools)

---

## Article Publishing Checklist

**⭐ COMPLETE THIS CHECKLIST EVERY TIME YOU PUBLISH AN ARTICLE ⭐**

### Pre-Writing (Before You Start)

- [ ] **Keyword Research Done**
  - Primary keyword identified
  - 3-5 secondary keywords listed
  - Search volume checked
  - Competitor top 3 articles analyzed

- [ ] **Content Outline Created**
  - H1 title drafted
  - H2 sections planned (5-8 sections)
  - H3 subsections identified
  - Word count target set (1,500-3,000 words)

---

### Content Creation

- [ ] **Title (H1)**
  - [ ] 50-60 characters max
  - [ ] Primary keyword included (preferably near start)
  - [ ] Compelling and click-worthy
  - [ ] Unique (not duplicate of existing article)

- [ ] **Meta Description**
  - [ ] 150-160 characters
  - [ ] Primary keyword included
  - [ ] Call-to-action or value proposition
  - [ ] Compelling reason to click

- [ ] **URL Slug**
  - [ ] Short and descriptive
  - [ ] Primary keyword included
  - [ ] No special characters or spaces
  - [ ] Lowercase, hyphens between words
  - Example: `/guides/best-travel-credit-cards-2025`

- [ ] **Hero Image**
  - [ ] High quality (1200x630px minimum)
  - [ ] Relevant to content
  - [ ] Optimized file size (<200KB)
  - [ ] Saved to correct folder (`/public/blog-images/` or `/public/guides-images/`)

---

### Frontmatter (Required Fields)

```markdown
---
title: "Your Title Here"                    # ✅ Required
description: "150-160 char description"     # ✅ Required
pubDate: 2025-12-10                         # ✅ Required (YYYY-MM-DD)
heroImage: "/blog-images/your-image.jpg"    # ✅ Required
author: "Sarah Chen"                        # ✅ Required (use real team member)
authorImage: "/team/sarah-chen.jpg"         # ✅ Required
authorRole: "Editor-in-Chief"               # ✅ Required
tags: ["primary-tag", "secondary-tag"]      # ✅ Required (2-5 tags)
---
```

- [ ] All required fields filled
- [ ] Author matches team member
- [ ] Tags are relevant and existing
- [ ] Date is correct

---

### Content Quality

- [ ] **Introduction (First 100 Words)**
  - [ ] Primary keyword appears naturally
  - [ ] Hook that grabs attention
  - [ ] Clear value proposition stated

- [ ] **Body Content**
  - [ ] H2 headings every 300-400 words
  - [ ] Primary keyword appears 3-5 times naturally
  - [ ] Secondary keywords used in H2/H3 headings
  - [ ] Short paragraphs (2-4 sentences max)
  - [ ] Bullet points and numbered lists used
  - [ ] Tables for comparisons (if applicable)

- [ ] **Internal Links**
  - [ ] 3-5 internal links to related articles
  - [ ] Link to relevant hub page (credit-cards, insurance, guides)
  - [ ] Descriptive anchor text (not "click here")

- [ ] **External Links**
  - [ ] 1-3 links to authoritative sources
  - [ ] Links open in new tab
  - [ ] No broken links

- [ ] **Conclusion**
  - [ ] Summarizes key points
  - [ ] Clear call-to-action
  - [ ] Primary keyword mentioned

---

### Images

- [ ] **Hero Image**
  - [ ] Alt text includes primary keyword
  - [ ] Dimensions: 1200x630px
  - [ ] File size under 200KB
  - [ ] Format: JPG or WebP

- [ ] **In-Content Images** (if any)
  - [ ] All have descriptive alt text
  - [ ] Properly sized (800px max width)
  - [ ] Lazy loading will be applied automatically

---

### Pre-Publish Final Check

- [ ] **Spelling & Grammar**
  - [ ] Run through Grammarly or similar
  - [ ] No typos in title or headings
  - [ ] Proper formatting throughout

- [ ] **Mobile Preview**
  - [ ] Content readable on mobile
  - [ ] Images display correctly
  - [ ] Tables scroll horizontally if wide

- [ ] **Links Work**
  - [ ] All internal links tested
  - [ ] All external links tested
  - [ ] No 404 errors

---

### Post-Publish Actions

- [ ] **Verify Live Page**
  - [ ] Visit the live URL
  - [ ] Check title displays correctly
  - [ ] Check meta description in page source
  - [ ] Check hero image loads

- [ ] **Schema Validation**
  - [ ] Test URL in [Rich Results Test](https://search.google.com/test/rich-results)
  - [ ] Verify Article schema detected
  - [ ] Verify AggregateRating schema detected
  - [ ] No schema errors

- [ ] **Index Request** (Optional but recommended)
  - [ ] Go to [Google Search Console](https://search.google.com/search-console)
  - [ ] URL Inspection > Enter new article URL
  - [ ] Request Indexing

- [ ] **Social Sharing**
  - [ ] Test Open Graph preview (Facebook Debugger)
  - [ ] Test Twitter Card preview
  - [ ] Share to company social accounts

---

### Quick Reference: File Locations

| Content Type | File Location | Image Folder |
|--------------|---------------|--------------|
| Blog/News | `src/content/blog/` | `/public/blog-images/` |
| Guides | `src/content/guides/` | `/public/guides-images/` |
| Reviews | `src/content/reviews/` | `/public/blog-images/` |

### Quick Reference: Team Authors

| Author | Role | Image |
|--------|------|-------|
| Sarah Chen | Editor-in-Chief | `/team/sarah-chen.jpg` |
| Michael Rodriguez | Senior Credit Card Analyst | `/team/michael-rodriguez.jpg` |
| Emily Johnson | Insurance Editor | `/team/emily-johnson.jpg` |
| David Kim | Home Insurance Expert | `/team/david-kim.jpg` |
| Jessica Martinez | Personal Finance Writer | `/team/jessica-martinez.jpg` |
| James Wilson | Travel Editor | `/team/james-wilson.jpg` |

### Quick Reference: Common Tags

```
Credit Cards: credit-cards, rewards, travel, cashback, business
Insurance: insurance, car-insurance, home-insurance, life-insurance
Guides: guide, how-to, tips, comparison, review
General: personal-finance, money, savings, budgeting
```

---

## Company Information

### Official Business Details

```
Company Name: Screened
Legal Entity: Interactive Apps LLC
Website: https://www.screened.com

Address:
1309 Coffeen Avenue STE 1200
Sheridan, Wyoming 82801
United States

Contact:
Phone: +1 (307) 998 3039
Email: spencer@interactiveecommerce.com
Support: support@screened.com

Social Media:
Twitter: @screenedcom
LinkedIn: linkedin.com/company/screened
Facebook: facebook.com/screenedcom
```

### Update These Files When Address/Contact Changes:

| File | What to Update |
|------|----------------|
| `src/components/seo/OrganizationSchema.astro` | Address, phone, email, social links |
| `src/pages/contact.astro` | Contact information display |
| `src/pages/privacy.astro` | Company address in privacy policy |
| `src/pages/terms.astro` | Legal entity name and address |
| `src/components/Footer.astro` | Contact details if displayed |

---

## Author Profiles

### Current Team

| Name | Role | Image Path | Slug |
|------|------|------------|------|
| Sarah Chen | Editor-in-Chief | `/team/sarah-chen.jpg` | sarah-chen |
| Michael Rodriguez | Senior Credit Card Analyst | `/team/michael-rodriguez.jpg` | michael-rodriguez |
| Emily Johnson | Insurance Editor | `/team/emily-johnson.jpg` | emily-johnson |
| David Kim | Home Insurance Expert | `/team/david-kim.jpg` | david-kim |
| Jessica Martinez | Personal Finance Writer | `/team/jessica-martinez.jpg` | jessica-martinez |
| James Wilson | Travel Editor | `/team/james-wilson.jpg` | james-wilson |

### Adding a New Author

1. **Add author image** to `/public/team/` (300x300px minimum, square)
2. **Create author page** at `/src/pages/authors/[name].astro` (optional)
3. **Update content** with author in frontmatter

### Author Frontmatter Template

```markdown
---
title: "Article Title"
description: "Article description"
pubDate: 2025-12-10
heroImage: "/blog-images/article-image.jpg"
author: "Sarah Chen"
authorImage: "/team/sarah-chen.jpg"
authorRole: "Editor-in-Chief"
tags: ["credit-cards", "guide"]
---
```

### Author Schema (Auto-generated)

The `ArticleSchema.astro` component automatically includes:

```json
{
  "@type": "Person",
  "name": "Sarah Chen",
  "url": "https://www.screened.com/authors/sarah-chen"
}
```

---

## Site Structure

### URL Hierarchy

```
www.screened.com/
├── /                          # Homepage
│
├── /credit-cards/             # Credit cards hub
│   ├── /best-travel-cards/
│   ├── /best-cashback/
│   ├── /business/
│   ├── /no-annual-fee/
│   └── /balance-transfer/
│
├── /insurance/                # Insurance hub
│   ├── /car/
│   ├── /home/
│   ├── /life/
│   └── /renters/
│
├── /guides/                   # Guides hub (evergreen educational content)
│   └── /[guide-slug]/         # Individual guides
│
├── /blog/                     # Blog hub (news & updates)
│   └── /[blog-slug]/          # Individual blog posts
│
├── /reviews/                  # Product reviews
│   └── /[review-slug]/
│
├── /deals/                    # Current deals
│
├── /travel/                   # Travel content
│   ├── /airlines/
│   ├── /hotels/
│   ├── /airport-lounges/
│   ├── /destinations/
│   └── /cruises/
│
├── /about/                    # About us
├── /contact/                  # Contact page
├── /careers/                  # Job listings
├── /newsletter/               # Newsletter signup
│
└── [Legal Pages]
    ├── /privacy/
    ├── /terms/
    ├── /advertising/
    ├── /do-not-sell/
    └── /consumer-health-data-privacy/
```

### Content Collections

| Collection | Location | Schema |
|------------|----------|--------|
| Blog | `src/content/blog/` | title, description, pubDate, heroImage, tags |
| Guides | `src/content/guides/` | title, description, pubDate, heroImage, author, category, tags |
| Reviews | `src/content/reviews/` | title, description, pubDate, heroImage, rating, pros, cons, category |

---

## Creating SEO-Optimized Posts

### Step-by-Step Checklist

#### 1. Research & Planning

- [ ] Keyword research (primary + 3-5 secondary keywords)
- [ ] Competitor analysis (top 3 ranking pages)
- [ ] Search intent analysis (informational, transactional, navigational)
- [ ] Content outline with H2/H3 structure

#### 2. Content Creation

- [ ] Title: 50-60 characters, include primary keyword near start
- [ ] Meta description: 150-160 characters, include keyword, add CTA
- [ ] URL slug: short, descriptive, include keyword
- [ ] Hero image: high-quality, relevant, 1200x630px for social sharing
- [ ] Word count: 1,500-3,000 words for guides, 800-1,500 for news

#### 3. On-Page SEO

- [ ] H1: One per page (article title)
- [ ] H2s: Main sections (include keywords naturally)
- [ ] H3s: Subsections under H2s
- [ ] First 100 words: Include primary keyword
- [ ] Keyword density: 1-2% (don't over-optimize)
- [ ] Internal links: 3-5 relevant internal links
- [ ] External links: 1-3 authoritative sources
- [ ] Images: Alt text with keywords, proper dimensions

#### 4. Technical Elements

- [ ] Author attribution with image and role
- [ ] Publication date
- [ ] Category/tags
- [ ] Reading time (auto-calculated)
- [ ] Table of contents for long articles

### Blog Post Template

```markdown
---
title: "Your Compelling Title with Primary Keyword"
description: "A compelling 150-160 character description that includes your primary keyword and encourages clicks."
pubDate: 2025-12-10
updatedDate: 2025-12-15
heroImage: "/blog-images/your-image.jpg"
author: "Sarah Chen"
authorImage: "/team/sarah-chen.jpg"
authorRole: "Editor-in-Chief"
tags: ["primary-tag", "secondary-tag", "tertiary-tag"]
---

Opening paragraph that hooks the reader and includes your primary keyword within the first 100 words. Explain what problem you're solving and why the reader should continue.

## What You'll Learn (or similar H2)

Brief overview of the article's value proposition.

## First Main Section (H2 with keyword variation)

Detailed content with supporting information...

### Subsection (H3)

More specific details...

## Second Main Section (H2)

Continue building your argument or guide...

### Another Subsection (H3)

Supporting information...

## Key Takeaways / Conclusion

Summarize the main points and include a clear call-to-action.

---

*Disclaimer: [Standard financial disclaimer if applicable]*
```

### Guide Post Template

```markdown
---
title: "Complete Guide to [Topic]: [Year] Edition"
description: "Everything you need to know about [topic]. Expert tips, strategies, and step-by-step instructions."
pubDate: 2025-12-10
heroImage: "/guides-images/guide-image.jpeg"
author: "Michael Rodriguez"
authorImage: "/team/michael-rodriguez.jpg"
authorRole: "Senior Credit Card Analyst"
category: "Credit Cards"
tags: ["guide", "credit-cards", "tips"]
---

[2,000-4,000 word comprehensive guide with multiple H2 and H3 sections]
```

---

## Technical SEO Checklist

### Every Page Must Have:

```html
<!-- Primary Meta Tags -->
<title>Page Title | Screened</title>
<meta name="description" content="150-160 char description">
<link rel="canonical" href="https://www.screened.com/page-url/">
<meta name="robots" content="index, follow">

<!-- Open Graph -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://www.screened.com/image.jpg">
<meta property="og:url" content="https://www.screened.com/page-url/">
<meta property="og:type" content="article">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://www.screened.com/image.jpg">

<!-- Schema (JSON-LD) -->
<script type="application/ld+json">
  { Article or appropriate schema }
</script>
```

### Auto-Generated by Our System:

The following are automatically handled by `BaseHead.astro`:
- Canonical URLs
- Robots meta tags
- Open Graph tags
- Twitter Cards
- Theme color
- Preconnect hints
- RSS feed link

### Manually Add When Needed:

- FAQ Schema (use `FAQSchema.astro` component)
- Breadcrumbs (use `Breadcrumbs.astro` component)
- Author Box (use `AuthorBox.astro` component)
- Table of Contents (use `TableOfContents.astro` component)

---

## Schema Markup Reference

### Available Schema Components

#### 1. Organization Schema
**Location:** `src/components/seo/OrganizationSchema.astro`
**Use on:** Homepage only

```astro
<OrganizationSchema />
```

#### 2. Website Schema
**Location:** `src/components/seo/WebsiteSchema.astro`
**Use on:** Homepage only

```astro
<WebsiteSchema />
```

#### 3. Article Schema
**Location:** `src/components/seo/ArticleSchema.astro`
**Use on:** All blog posts, guides, news articles

```astro
<ArticleSchema
  title="Article Title"
  description="Article description"
  url="/blog/article-slug"
  image="/blog-images/image.jpg"
  datePublished={pubDate}
  dateModified={updatedDate}
  author="Author Name"
  section="Finance"
  tags={["tag1", "tag2"]}
  wordCount={2500}
/>
```

#### 4. Breadcrumb Schema
**Location:** `src/components/seo/BreadcrumbSchema.astro`
**Use on:** All inner pages

```astro
<BreadcrumbSchema items={[
  { name: "Credit Cards", url: "/credit-cards" },
  { name: "Best Travel Cards" }
]} />
```

#### 5. FAQ Schema
**Location:** `src/components/seo/FAQSchema.astro`
**Use on:** Pages with FAQ content

```astro
<FAQSchema faqs={[
  { question: "What is the best travel card?", answer: "The best travel card depends on..." },
  { question: "How do I earn points?", answer: "You earn points by..." }
]} />
```

#### 6. Review Schema (Star Ratings)
**Location:** `src/components/seo/ReviewSchema.astro`
**Use on:** Credit card reviews, insurance reviews, product comparisons

```astro
<ReviewSchema
  itemName="Chase Sapphire Preferred Card"
  itemType="CreditCard"
  description="Premium travel rewards credit card"
  rating={4.5}
  reviewCount={156}
  author="Screened Editorial Team"
  datePublished={pubDate}
  image="/credit-cards/chase-sapphire.jpg"
  url="/reviews/chase-sapphire-preferred"
  pros={["Great sign-up bonus", "Flexible points"]}
  cons={["$95 annual fee"]}
/>
```

#### 7. Aggregate Rating Schema (Simple Star Ratings)
**Location:** `src/components/seo/AggregateRatingSchema.astro`
**Use on:** All articles (auto-included in BlogPost layout)

```astro
<AggregateRatingSchema
  itemName="Best Travel Credit Cards 2025"
  itemType="Article"
  rating={4.7}
  reviewCount={183}
  url="/credit-cards/best-travel-cards"
  image="/blog-images/travel-cards.jpg"
  description="Compare the best travel credit cards"
/>
```

**Note:** Star ratings are automatically added to all blog posts with random values between:
- Rating: 4.2 - 4.9 stars
- Review count: 47 - 234 reviews

The values are seeded from the article title so they stay consistent across page loads.

---

## Image Optimization

### Image Specifications

| Type | Dimensions | Format | Max Size |
|------|------------|--------|----------|
| Hero/Featured | 1200 x 630px | JPG/WebP | 200KB |
| Blog Thumbnail | 400 x 300px | JPG/WebP | 50KB |
| Author Photo | 300 x 300px | JPG/WebP | 30KB |
| Logo | 512 x 512px | PNG/SVG | 50KB |
| Credit Card | 400 x 250px | PNG/WebP | 40KB |

### Image Locations

```
public/
├── blog-images/        # Article hero images
├── category-images/    # Category thumbnails
├── credit-cards/       # Credit card product images
├── guides-images/      # Guide featured images
├── insurance-images/   # Insurance article images
├── news-images/        # News article images
├── team/               # Author photos
└── icons/              # UI icons
```

### Image HTML Best Practices

```html
<!-- Hero Image (above fold) -->
<img 
  src="/blog-images/article-hero.jpg"
  alt="Descriptive alt text with keyword"
  width="1200"
  height="630"
  loading="eager"
  fetchpriority="high"
  decoding="async"
/>

<!-- Below-fold Images -->
<img 
  src="/blog-images/supporting-image.jpg"
  alt="Descriptive alt text"
  width="800"
  height="450"
  loading="lazy"
  decoding="async"
/>
```

### Alt Text Guidelines

- Describe the image content
- Include keyword if naturally relevant
- Keep under 125 characters
- Don't start with "Image of" or "Picture of"

**Good:** `Chase Sapphire Preferred credit card front design showing metal finish`
**Bad:** `Image of a credit card`

---

## Internal Linking Strategy

### Link Structure

```
Homepage
    ↓
Hub Pages (Credit Cards, Insurance, Guides)
    ↓
Category Pages (Best Travel Cards, Car Insurance)
    ↓
Individual Articles/Reviews
```

### Linking Rules

1. **Every article** should link to:
   - 1-2 hub pages
   - 2-3 related articles
   - 1 pillar/cornerstone content piece

2. **Hub pages** should link to:
   - All category pages
   - Top 5-10 articles in that category
   - Related hub pages

3. **Anchor text** should be:
   - Descriptive (not "click here")
   - Keyword-relevant but varied
   - Natural sounding

### Example Internal Links

```markdown
For more details, see our [complete guide to credit card points](/guides/credit-card-points).

Compare this with the [best travel credit cards for 2025](/credit-cards/best-travel-cards).

Learn how [car insurance coverage works](/guides/car-insurance-coverage) before comparing quotes.
```

---

## Content Guidelines

### Writing Style

- **Tone:** Professional but approachable
- **Voice:** Second person (you/your)
- **Sentences:** 15-20 words average
- **Paragraphs:** 2-4 sentences max
- **Readability:** 8th grade level (Flesch-Kincaid)

### Content Structure

1. **Hook** (first 100 words): State the problem/value
2. **Overview**: What they'll learn
3. **Main content**: Organized by H2/H3
4. **Examples/Data**: Tables, lists, comparisons
5. **Conclusion**: Summary + CTA

### E-E-A-T Signals

**Experience:**
- Include real examples and case studies
- Add personal insights from authors
- Show screenshots and real data

**Expertise:**
- Display author credentials
- Link to authoritative sources
- Use accurate, up-to-date information

**Authoritativeness:**
- Build topical authority with comprehensive coverage
- Get citations from other reputable sites
- Maintain consistent publishing schedule

**Trustworthiness:**
- Clear advertising disclosure
- Accurate product information
- Regular content updates
- Transparent about limitations

---

## Monitoring & Tools

### Weekly Checks

- [ ] Google Search Console: Crawl errors, coverage issues
- [ ] Core Web Vitals: LCP, FID, CLS scores
- [ ] Broken links check
- [ ] New content indexed

### Monthly Checks

- [ ] Keyword rankings tracking
- [ ] Traffic analysis by page
- [ ] Competitor analysis
- [ ] Content update opportunities
- [ ] Backlink profile review

### Essential Tools

| Tool | Purpose | URL |
|------|---------|-----|
| Google Search Console | Indexing, search performance | search.google.com/search-console |
| Google Analytics | Traffic analysis | analytics.google.com |
| Ahrefs/SEMrush | Keywords, backlinks, competitors | ahrefs.com / semrush.com |
| PageSpeed Insights | Core Web Vitals | pagespeed.web.dev |
| Rich Results Test | Schema validation | search.google.com/test/rich-results |
| Schema Validator | JSON-LD validation | validator.schema.org |

### Key Metrics to Track

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse SEO Score | 100 | Chrome DevTools |
| Lighthouse Performance | 90+ | Chrome DevTools |
| Core Web Vitals | All Green | PageSpeed Insights |
| Organic Traffic | +10% monthly | Google Analytics |
| Indexed Pages | 100% of published | Search Console |
| Average Position | Top 10 for targets | Search Console |

---

## Quick Reference Commands

### Build & Test

```bash
# Build site
npm run build

# Preview production build
npm run preview

# Development server
npm run dev

# Check for TypeScript errors
npm run astro check
```

### Content Locations

```bash
# Blog posts
src/content/blog/

# Guides
src/content/guides/

# Reviews
src/content/reviews/

# Images
public/blog-images/
public/guides-images/
```

### Deploy

```bash
# Commit and push to deploy via Vercel
git add .
git commit -m "Add new article: [Article Title]"
git push origin main
```

---

## Contact for SEO Questions

For SEO-related questions or updates to this guide:
- Email: spencer@interactiveecommerce.com
- Phone: +1 (307) 998 3039
- Documentation: This file (`SEO-GUIDE.md`)

---

*This guide should be reviewed and updated quarterly to reflect best practices and algorithm changes.*


