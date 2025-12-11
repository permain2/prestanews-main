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
12. [🦅 SCREAMING EAGLE System](#-the-screaming-eagle-content-launch-system) ⭐ **NEW: Comparison Articles**
13. [Comparison Pages Template](#comparison-pages-comparisonlayout-template)
14. [Automated Article Generation](#automated-article-generation)

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
├── /blog/                     # Blog hub (news, guides & articles)
│   └── /[blog-slug]/          # Individual blog posts
│
├── /reviews/                  # Product reviews
│   └── /[review-slug]/
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

---

## 🚀 The "SCREAMING EAGLE" Content Launch System

**System Name:** SCREAMING EAGLE *(SEO Content Review, Enhancement, Assembly, Media Imaging, Networking, and Go-live Excellence)*

> **Use this SOP every single time you publish a comparison or review article.**

### 🏃 Quick Start (5-Minute Version)

```bash
# 1. Create article file
touch src/pages/blog/best-[topic].astro

# 2. Copy template from existing comparison page
cat src/pages/blog/best-disability-insurance.astro > src/pages/blog/best-[topic].astro

# 3. Edit providers, FAQs, SEO content

# 4. Add logos using Clearbit
# logo: "https://logo.clearbit.com/company.com"

# 5. Start dev server & verify
npm run dev
# Visit http://localhost:4322/blog/best-[topic]

# 6. Add hero image from Freepik to:
# /public/blog-images/best-[topic].jpg

# 7. Add internal links (see Step 6 below)

# 8. Update progress CSV
# scripts/article-progress.csv
```

### Quick Reference Checklist

```
□ Step 1: Article Structure (ComparisonLayout)
□ Step 2: Logo Integration (Clearbit/Brandfetch)
□ Step 3: Visual Verification (Screenshot Test)
□ Step 4: Hero Image (Freepik Full-Width)
□ Step 5: Image Optimization (Imagify)
□ Step 6: Internal Linking (3-in, 3-out Rule)
□ Step 7: Sitemap & Final Checks
□ Step 8: Update Progress CSV
```

---

### Step 1: Article Structure ✅

**Use ComparisonLayout.astro for all comparison/review articles**

| Requirement | Check |
|-------------|-------|
| File location | `src/pages/blog/[slug].astro` |
| Template import | `import ComparisonLayout from '../../layouts/ComparisonLayout.astro'` |
| 8-10 providers | Each with name, logo, bestFor, pricing, rating, pros, cons |
| 5-8 FAQs | Targeting "People Also Ask" queries |
| 1500+ words SEO content | Below provider cards |
| Tables included | For easy comparison scanning |

---

### Step 2: Logo Integration 🖼️

**Provider logos must look professional and load reliably**

**Option A: Clearbit Logo API (Quick, No Key)**
```
https://logo.clearbit.com/companyname.com
```

**Option B: Brandfetch API (Higher Quality)**
```bash
# Requires BRANDFETCH_API_KEY in .env
node scripts/fetch-insurance-logos-brandfetch.js
```

**Option C: Local Logos (Best Performance)**
1. Download logos from Brandfetch or company sites
2. Save to `/public/insurance-logos-small/` or category folder
3. Optimize with Imagify (Step 5)
4. Use local path: `/insurance-logos-small/companyname.png`

---

### Step 3: Visual Verification 👀

**REQUIRED: Visually confirm the page looks correct**

1. Start dev server: `npm run dev`
2. Navigate to new article URL
3. **Verify these elements:**
   - [ ] Hero image displays full-width
   - [ ] All provider logos load correctly
   - [ ] Cards are properly formatted
   - [ ] Ratings display with stars
   - [ ] Pros/Cons render in columns
   - [ ] FAQs expand/collapse
   - [ ] Mobile responsive (resize browser)

**Take screenshot for documentation if needed**

---

### Step 4: Hero Image (Full-Width) 🌄

**Every article needs a beautiful, relevant hero image**

**Source: Freepik.com**
1. Go to [freepik.com](https://www.freepik.com)
2. Search for topic-related images (e.g., "online banking", "car insurance")
3. Download high-resolution image (1200x630px minimum)
4. Choose landscape orientation for full-width display

**Or Create Custom:**
- Use Canva, Figma, or AI tools
- Dimensions: 1200x630px (OG image standard)
- Include subtle text overlay if needed

**File Naming:**
```
/public/blog-images/[article-slug].jpg

Examples:
- /public/blog-images/best-online-savings-accounts.jpg
- /public/blog-images/best-rv-insurance.jpg
- /public/blog-images/best-internet-providers.jpg
```

**Update article heroImage prop:**
```astro
heroImage="/blog-images/best-online-savings-accounts.jpg"
```

---

### Step 5: Image Optimization (Imagify) 📉

**All images must be optimized before deployment**

**Using Imagify:**
1. Go to [imagify.io](https://app.imagify.io/bulk-optimization)
2. Upload all new images for the article:
   - Hero image
   - Any custom logos
   - In-content images
3. Select "Ultra" compression
4. Download optimized versions
5. Replace original files

**Target Sizes:**
| Image Type | Max Size |
|------------|----------|
| Hero | <200KB |
| Logo | <50KB |
| In-content | <100KB |

**Alternative CLI (if Imagify unavailable):**
```bash
# Using ImageMagick
convert input.jpg -quality 85 -resize 1200x630 output.jpg

# Using cwebp for WebP
cwebp -q 80 input.png -o output.webp
```

---

### Step 6: Internal Linking (3-in, 3-out Rule) 🔗

**Every new article needs strategic internal links**

#### 3 Links INTO the New Article (from existing pages)

**Strategy: Match new article category to existing hub pages and guides**

| New Article Category | Best Pages to Link FROM |
|---------------------|-------------------------|
| Finance (savings, loans) | `src/pages/credit-cards/index.astro`, `src/content/blog/credit-card-points.md` |
| Insurance | `src/pages/insurance/index.astro`, `src/content/blog/*-insurance-coverage.md` |
| Home (security, internet) | `src/content/blog/home-insurance-coverage.md` |
| Auto (refinance, transport) | `src/content/blog/car-insurance-coverage.md` |

**How to Add Links to Hub Pages:**

For `.astro` hub pages (insurance, credit-cards), add to the `const` array:
```javascript
// Example: Adding to insurance/index.astro
const insurancePosts = [
  // ... existing posts ...
  {
    title: "Best Disability Insurance",
    description: "Protect your income with top disability insurance providers.",
    href: "/blog/best-disability-insurance",
    category: "Disability Insurance",
    image: "/insurance-images/life-insurance.jpeg"
  }
];
```

**How to Add Links to Markdown Content:**

Add a "Related Guides" section at the end:
```markdown
## Related Guides

Looking for more ways to protect your finances? Check out these guides:

- **[Best Auto Refinance Lenders](/blog/best-auto-refinance-lenders)** - Lower your car payment
- **[Best RV Insurance](/blog/best-rv-insurance)** - Coverage for motorhomes and campers
- **[Best Car Transport Companies](/blog/best-car-transport-companies)** - Ship your vehicle safely
```

**Quick Commands to Find Related Pages:**
```bash
# Find pages mentioning insurance
rg -l "insurance" src/content/ src/pages/

# Find pages mentioning finance/banking
rg -l "savings|banking|loan" src/content/ src/pages/

# Find hub pages (astro files with arrays)
rg "const.*Posts\s*=" src/pages/
```

#### 3 Links FROM the New Article (to existing pages)

These should already be in your SEO content. Verify:

- [ ] **Hub page link**: Link to `/insurance`, `/credit-cards`, or relevant category
- [ ] **Related guide #1**: Link to complementary topic (e.g., savings → credit cards)
- [ ] **Related guide #2**: Link to adjacent topic (e.g., insurance → coverage guide)

**Example SEO Content Links:**
```markdown
## How to Choose the Right Provider

When comparing providers, consider your overall financial picture. 
If you're also looking to optimize your credit card rewards, see our 
[guide to credit card points](/blog/credit-card-points) for strategies 
that pair well with high-yield savings.

For homeowners, combining savings with proper [home insurance coverage](/blog/home-insurance-coverage) 
creates a comprehensive financial safety net.
```

#### Link Audit Checklist

After adding internal links, verify:

| Check | How |
|-------|-----|
| Links TO new article work | Navigate from existing pages |
| Links FROM new article work | Click all links in new article |
| Hub pages updated | Check `/insurance`, `/credit-cards`, etc. |
| Related sections added | Check guide articles for "Related" section |

**Recent Link Integrations (December 2025):**

| New Article | Linked FROM |
|-------------|-------------|
| best-online-savings-accounts | credit-cards/index, credit-card-points.md |
| best-student-loans | credit-cards/index, credit-card-points.md |
| best-disability-insurance | insurance/index.astro |
| best-rv-insurance | insurance/index, car-insurance-coverage.md |
| best-auto-refinance-lenders | car-insurance-coverage.md |
| best-car-transport-companies | car-insurance-coverage.md |
| best-home-security-cameras | home-insurance-coverage.md |
| best-home-warranty-companies | home-insurance-coverage.md |
| best-internet-providers | home-insurance-coverage.md |
| best-mortgage-refinance-companies | credit-card-points.md |

---

### Step 7: Final Pre-Launch Checks ✅

**Before marking complete:**

- [ ] **SOP Checklist** - All previous steps done
- [ ] **SEO Elements**
  - Title: 50-60 characters with keyword
  - Description: 150-160 characters with keyword
  - URL slug: short, keyword-rich, lowercase
- [ ] **Schema** - FAQs will auto-generate FAQ schema
- [ ] **Mobile Test** - Resize browser to 375px width
- [ ] **Links Test** - All internal/external links work
- [ ] **Spell Check** - No typos in titles or provider names

---

### Step 8: Update Progress Tracking 📊

**After completing article, update the CSV:**

```bash
# Edit scripts/article-progress.csv
```

**CSV Columns:**
| Column | Values | Description |
|--------|--------|-------------|
| keyword | text | Target keyword |
| slug | text | URL slug |
| volume | number | Monthly search volume |
| traffic_cost | number | Estimated traffic value |
| category | finance/insurance/home/tech/lifestyle | Content category |
| status | pending/needs-images/completed | Current status |
| created_date | YYYY-MM-DD | Completion date |
| seo_score | A/B/C/D or empty | Quality grade |
| screaming_eagle | "1-3,6 done" or "1-8 done" | Steps completed |
| notes | text | Additional notes |

**Status Values:**
- `pending` - Not started
- `needs-images` - Article created, needs hero image + Imagify
- `completed` - All 8 SCREAMING EAGLE steps done

**SCREAMING EAGLE Column Format:**
```
"1-3 done"      = Steps 1-3 complete (structure, logos, visual)
"1-3,6 done"    = Steps 1-3 + internal linking done
"1-8 done"      = ALL steps complete, ready to publish
```

**Example:**
```csv
"keyword","slug","volume","traffic_cost","category","status","created_date","seo_score","screaming_eagle","notes"
"online savings accounts","best-online-savings-accounts",7700,69771,"finance","needs-images","2025-12-11","","1-3,6 done","Need: hero from freepik, Imagify"
"disability insurance","best-disability-insurance",32000,6411,"insurance","completed","2025-12-11","A","1-8 done","Linked from insurance/index"
```

---

### 🦅 SCREAMING EAGLE Summary

| Step | Action | Tool/Resource | Time Est. |
|------|--------|---------------|-----------|
| 1 | Use ComparisonLayout | `src/layouts/ComparisonLayout.astro` | 30-60 min |
| 2 | Add provider logos | `https://logo.clearbit.com/domain.com` | 10 min |
| 3 | Visual verification | `npm run dev` + browser screenshots | 5 min |
| 4 | Full-width hero image | [freepik.com](https://freepik.com) | 10 min |
| 5 | Optimize images | [imagify.io](https://app.imagify.io) | 5 min |
| 6 | Internal linking | Update hub pages + guide articles | 15 min |
| 7 | Final SEO checks | Manual review of meta, links, mobile | 5 min |
| 8 | Update progress CSV | `scripts/article-progress.csv` | 2 min |

**Total Time per Article:** ~1.5-2 hours

### Quick Internal Linking Reference

| Article Type | Link FROM These Pages |
|--------------|----------------------|
| Finance (savings, loans, IRA) | `credit-cards/index.astro`, `credit-card-points.md` |
| Insurance (disability, RV, auto) | `insurance/index.astro`, `car-insurance-coverage.md` |
| Home (security, warranty, internet) | `home-insurance-coverage.md` |
| General | `blog/index.astro` (auto via content collection) |

### Files to Edit for Internal Links

```
src/pages/insurance/index.astro        → insurancePosts array
src/pages/credit-cards/index.astro     → creditCardPosts + relatedFinance arrays
src/content/blog/car-insurance-coverage.md    → "Related Guides" section
src/content/blog/home-insurance-coverage.md   → "Related Guides" section
src/content/blog/credit-card-points.md        → "Related Guides" section
```

**Remember:** No article goes live until ALL 8 SCREAMING EAGLE steps are complete! 🚀

---

## Comparison Pages (ComparisonLayout Template)

**NEW: December 2025** - For product/service comparison articles, use the `ComparisonLayout.astro` template.

### When to Use ComparisonLayout

Use this template for:
- "Best X" comparison articles
- Provider/company comparisons (insurance, finance, services)
- Product roundup articles
- Any article comparing multiple options with ratings

### File Location

Create comparison pages as `.astro` files in: `src/pages/blog/`

Example: `src/pages/blog/best-home-warranty-companies.astro`

### Template Structure

```astro
---
import ComparisonLayout from '../../layouts/ComparisonLayout.astro';

const providers = [
  {
    name: "Company Name",
    logo: "https://logo.clearbit.com/company.com",  // Clearbit Logo API
    bestFor: "Category/Use Case",
    monthlyAvg: "$XX-$XX/mo",
    serviceFee: "$XX",
    rating: 4.5,                    // 1-5 scale
    amBest: "A++",                  // Optional - for insurance
    pros: ["Pro 1", "Pro 2", "Pro 3", "Pro 4"],
    cons: ["Con 1", "Con 2"],
    description: "Brief description of company/product.",
    affiliateUrl: "#"               // Affiliate link
  },
  // Add 8-10 providers for comprehensive coverage
];

const faqs = [
  {
    question: "Common question about the topic?",
    answer: "Comprehensive answer providing value to readers."
  },
  // Add 5-8 FAQs for SEO
];
---

<ComparisonLayout
  title="Best X Companies of 2025"
  description="Compare the best X providers including Y, Z. Expert reviews of pricing, features, and ratings."
  category="insurance"              // finance, home, tech, lifestyle, insurance
  categoryLabel="CATEGORY NAME"     // Display label in hero
  heroImage="/blog-images/topic.jpg"
  author="Team Member Name"
  date="Dec 11, 2025"
  providers={providers}
  faqs={faqs}
>

## SEO Content Section

Write 1500-2500 words of valuable content below the provider cards.
Include tables, bullet points, and clear headings.

### Key Topics to Cover

- Industry overview
- Buyer's guide/how to choose
- Cost analysis
- Common questions answered
- Tips and recommendations

</ComparisonLayout>
```

### Logo Sources

For provider logos, use one of these methods:

1. **Clearbit Logo API** (Recommended - No API key needed):
   ```
   https://logo.clearbit.com/company.com
   ```

2. **Brandfetch API** (Higher quality, requires API key):
   ```bash
   # Set BRANDFETCH_API_KEY in .env
   node scripts/fetch-insurance-logos-brandfetch.js
   ```
   Logos saved to: `/public/insurance-logos/`

3. **Local logos**: Save to `/public/insurance-logos-small/` or category folder

### Progress Tracking

Track article creation progress in: `scripts/article-progress.csv`

CSV columns:
- keyword: Target keyword
- slug: URL slug  
- volume: Monthly search volume
- traffic_cost: Estimated traffic value
- category: Content category
- status: pending/in_progress/completed
- created_date: Completion date
- seo_score: A/B/C/D grade
- notes: Additional notes

### Best Practices for Comparison Pages

1. **Providers**: Include 8-10 options for comprehensive coverage
2. **FAQs**: Add 5-8 questions targeting "People Also Ask" queries
3. **SEO Content**: Write 1500+ words covering buyer's guide topics
4. **Tables**: Include comparison tables for easy scanning
5. **Internal Links**: Link to related articles and category pages
6. **Update dates**: Keep "Updated" date current for freshness signals

---

## Automated Article Generation

### SEO Article Generator Script

Generate SEO-optimized articles with:

```bash
# Single article
node scripts/seo-article-generator.js "target keyword"

# Batch from CSV
node scripts/seo-workflow.js --csv path/to/keywords.csv --limit 10

# Skip SERP analysis (faster)
node scripts/seo-workflow.js --no-serp "target keyword"
```

### SERP Analysis with Apify

Analyze competitors before writing:

```bash
# Requires APIFY_API_TOKEN in .env
node scripts/analyze-serp.js "target keyword"
```

Output saved to: `serp-data/[keyword]-serp.json`

---

## Contact for SEO Questions

For SEO-related questions or updates to this guide:
- Email: spencer@interactiveecommerce.com
- Phone: +1 (307) 998 3039
- Documentation: This file (`SEO-GUIDE.md`)

---

*This guide should be reviewed and updated quarterly to reflect best practices and algorithm changes.*








