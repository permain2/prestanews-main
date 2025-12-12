# Ultimate Screened.com Brand Checklist

**Last Updated:** December 12, 2025  
**Purpose:** Ensure 100% consistency across all pages, articles, and content

---

## Table of Contents

1. [Navigation Structure](#1-navigation-structure-menu-footer-sitemap)
2. [Color System](#2-color-system-by-category)
3. [Comparison Table Structure](#3-comparison-table-structure)
4. [SEO Checklist](#4-seo-checklist)
5. [Internal Linking](#5-internal-linking-3-in-3-out-rule)
6. [Image Requirements](#6-image-requirements)
7. [Article Page Structure](#7-article-page-structure)
8. [Copywriting Standards](#8-copywriting-standards-tpg-style)
9. [Accessibility Checklist](#9-accessibility-checklist)
10. [Menu/Footer Access Verification](#10-menufooter-access-verification)
11. [Pre-Publish Final Checklist](#11-pre-publish-final-checklist)
12. [Team Authors](#12-team-authors)
13. [SCREAMING EAGLE Steps](#13-screaming-eagle-steps-all-8-required)

---

## 1. Navigation Structure (Menu, Footer, Sitemap)

### Header Menu Links

| Category | Dropdown Items | URLs |
|----------|---------------|------|
| **Credit Cards** | Best Travel Cards, Best Cash Back, Business Cards, No Annual Fee, Balance Transfer | `/credit-cards/best-travel-cards`, `/credit-cards/best-cashback`, `/credit-cards/business`, `/credit-cards/no-annual-fee`, `/credit-cards/balance-transfer` |
| **Insurance** | Car, Home, Life, Pet, Renters | `/insurance/car`, `/insurance/home`, `/insurance/life`, `/insurance/pet`, `/insurance/renters` |
| **Insurance (Blog)** | RV Insurance, Disability Insurance, Business Insurance | `/blog/best-rv-insurance`, `/blog/best-disability-insurance`, `/blog/best-small-business-insurance` |
| **Finance** | Savings Accounts, Student Loans, Auto Refinance, Mortgage Refinance, Gold IRA | `/finance/best-online-savings-accounts`, `/blog/best-student-loans`, `/blog/best-auto-refinance-lenders`, `/blog/best-mortgage-refinance-companies`, `/blog/best-gold-ira-companies` |
| **Home** | Home Warranties, Extended Car Warranty, Security Cameras, Internet Providers, Car Transport | `/home/best-home-warranties`, `/blog/best-extended-car-warranty`, `/blog/best-home-security-cameras`, `/blog/best-internet-providers`, `/blog/best-car-transport-companies` |
| **Software** | Best VPN Services | `/software/best-vpn-services` |
| **Blog** | Direct link | `/blog` |

### Footer Links

**Credit Cards:**
- Best Travel Cards → `/credit-cards/best-travel-cards`
- Best Cash Back Cards → `/credit-cards/best-cashback`
- Business Cards → `/credit-cards/business`
- No Annual Fee → `/credit-cards/no-annual-fee`
- Balance Transfer → `/credit-cards/balance-transfer`

**Insurance:**
- Car Insurance → `/insurance/car`
- Home Insurance → `/insurance/home`
- Renters Insurance → `/insurance/renters`
- Life Insurance → `/insurance/life`

**Software:**
- Best VPN Services → `/software/best-vpn-services`

**Resources:**
- Blog → `/blog`
- Reviews → `/reviews`
- Newsletter → `/newsletter`

**Company:**
- About Us → `/about`
- Contact → `/contact`
- Careers → `/careers`
- Sitemap → `/sitemap`

**Legal (Bottom Bar):**
- Privacy → `/privacy`
- Terms → `/terms`
- Do Not Sell → `/do-not-sell`
- Advertising → `/advertising`

### Sitemap Page Sections

| Section | Pages |
|---------|-------|
| Credit Cards | All Credit Cards, Best Travel Cards, Best Cash Back Cards, Business Cards, No Annual Fee Cards, Balance Transfer |
| Insurance | All Insurance, Car Insurance, Home Insurance, Renters Insurance, Life Insurance |
| Software | Best VPN Services |
| Travel | Airlines, Hotels, Airport Lounges, Cruises, Destinations |
| Resources | Blog, Reviews, Newsletter |
| Company | About Us, Contact, Careers, Privacy Policy, Terms of Use, Advertising |

### File Locations for Navigation

```
src/components/Header.astro    → Main navigation menu
src/components/Footer.astro    → Footer links
src/pages/sitemap.astro        → Sitemap page
```

---

## 2. Color System by Category

### Category-Specific Gradients

| Category | Primary Gradient | CSS Variables |
|----------|-----------------|---------------|
| **Credit Cards** | `#0066B2 → #004C8C` | Blue |
| **Insurance** | `#0D2C4B → #1a4a7a` | Navy |
| **Finance/Savings** | `#059669 → #047857` | Green |
| **Home Services** | `#334155 → #1e293b` | Slate |
| **Tech/Software** | `#7C3AED → #5B21B6` | Purple |
| **Lifestyle** | `#DC2626 → #B91C1C` | Red |

### Core Brand Colors

| Purpose | Hex Code | Usage |
|---------|----------|-------|
| **Dark Navy (Primary)** | `#0D2C4B` | Headers, footer, primary brand |
| **Blue Accent** | `#3B82F6` | Links, highlights, interactive |
| **Green CTA** | `#22C55E` | Apply Now buttons, success states |
| **Blue CTA Gradient** | `#0066B2 → #004C8C` | Primary action buttons |
| **Text Primary** | `#162433` | Headings, important text |
| **Text Secondary** | `#68727C` | Body text, descriptions |
| **Text Tertiary** | `#4B5563` | Supporting text |
| **Background Light** | `#F7F8FA` | Section backgrounds |
| **Background White** | `#FFFFFF` | Card backgrounds |
| **Border Light** | `#E5E7EB` | Card borders, dividers |
| **Footer Background** | `#0D2C4B` | Footer section |

### Typography

| Font Family | Usage | CSS Class |
|-------------|-------|-----------|
| **Sora** | Page titles, major headings | `font-sora` |
| **Lexend** | Subheadings, section titles, category labels | `font-lexend` |
| **Poppins** | Body text, descriptions, paragraphs | `font-poppins` |
| **Roboto** | Navigation, uppercase labels, buttons | `font-roboto` |

### Button Styles

```css
/* Primary Apply Button */
.apply-btn {
  background: linear-gradient(135deg, #0066B2 0%, #004C8C 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 102, 178, 0.3);
}

/* Green Apply Now (Tables) */
.apply-now-btn {
  background: #22C55E;
  color: white;
  border-radius: 24px;
}

/* Subscribe Button */
.bottom-newsletter-btn {
  background: linear-gradient(135deg, #146aff 0%, #0040B1 100%);
}
```

---

## 3. Comparison Table Structure

### Required Components

1. **Stats Grid (4 metrics)** - Category-specific metrics
2. **Provider Cards** - Ranked items with accordions
3. **Premium Comparison Table** - Side-by-side comparison

### Stats Grid by Category

| Category | Stat 1 | Stat 2 | Stat 3 | Stat 4 |
|----------|--------|--------|--------|--------|
| Credit Cards | Annual Fee | Welcome Bonus | Rewards Rate | Foreign Fees |
| Insurance | Monthly Cost | AM Best Rating | Deductible | Full-Timer (Y/N) |
| Savings | APY | Min for APY | Requirements | $10K Earns |
| Tech | Price | Rating | Key Spec | Warranty |
| Home Services | Monthly Cost | Service Fee | Coverage | Rating |

### Provider Card Structure

```html
<div class="card-container">
  <!-- Editor's Choice Badge (optional, #1 only) -->
  <div class="bg-gradient-to-r from-[#F59E0B] to-[#D97706]">
    EDITOR'S CHOICE
  </div>
  
  <div class="grid md:grid-cols-[320px_1fr]">
    <!-- Left Panel -->
    <div class="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
      - Rank Badge (#1, #2, etc.)
      - Card/Logo Image
      - Floating Rating Badge
      - Apply Button
    </div>
    
    <!-- Right Panel -->
    <div>
      - Best For Badge
      - Card Name (H3)
      - Description
      - Stats Grid (4 metrics)
      - Accordion: Bottom Line
      - Accordion: Pros/Cons
      - Accordion: Details
    </div>
  </div>
</div>
```

### Comparison Table Styling

```css
/* Table Header */
.premium-comparison-table thead th {
  background: linear-gradient(135deg, #0D2C4B 0%, #1a4a7a 100%);
  color: white;
}

/* Row Hover */
.comparison-row:hover {
  background: #FAFBFC;
}

/* Star Ratings */
.star-filled { fill: #22C55E; }
.star-half { fill: #86EFAC; }
.star-empty { fill: #D1D5DB; }

/* Card Badges */
.card-badge-new { background: #22C55E; color: white; }
.card-badge-premium { background: #0066B2; color: white; }
```

---

## 4. SEO Checklist

### Title Tags
- [ ] 50-60 characters maximum
- [ ] Primary keyword near the start
- [ ] Format: `"Page Title | Screened"`
- [ ] Unique across all pages

### Meta Description
- [ ] 150-160 characters
- [ ] Primary keyword included naturally
- [ ] Call-to-action or value proposition
- [ ] Compelling reason to click

### URL Slug
- [ ] Short and descriptive
- [ ] Primary keyword included
- [ ] All lowercase
- [ ] Hyphens between words (no underscores)
- [ ] No special characters or spaces
- [ ] Example: `/blog/best-travel-credit-cards`

### Schema Markup (Required)

```astro
<!-- All comparison articles need these -->
<ArticleSchema
  title="Page Title"
  description="Meta description"
  url="/page-url"
  image="/blog-images/hero.jpg"
  datePublished={new Date('2025-12-01')}
  dateModified={new Date('2025-12-12')}
  author="Author Name"
  section="Category"
  tags={['tag1', 'tag2']}
  wordCount={4500}
/>

<FAQSchema faqs={faqs} />

<BreadcrumbSchema items={[
  { name: 'Category', url: '/category' },
  { name: 'Page Name' }
]} />
```

### Content Requirements
- [ ] H1: One per page (matches title)
- [ ] H2: Every 300-400 words
- [ ] H3: Subsections under H2s
- [ ] Primary keyword in first 100 words
- [ ] Keyword density: 1-2% (don't over-optimize)
- [ ] 3-5 internal links to related content
- [ ] 1-3 external authoritative links

### Required Section IDs for TOC

```html
<section id="cards">...</section>
<section id="compare-table">...</section>
<div id="how-it-works">...</div>  <!-- or #how-rewards-work -->
<div id="how-to-choose">...</div>
<div id="best-by-category">...</div>
<div id="methodology">...</div>
<section id="faq">...</section>
```

---

## 5. Internal Linking (3-in, 3-out Rule)

### Links INTO New Article (from existing pages)

| New Article Category | Link FROM These Pages |
|---------------------|----------------------|
| Finance (savings, loans, IRA) | `src/pages/credit-cards/index.astro`, `src/content/blog/credit-card-points.md` |
| Insurance (disability, RV, auto) | `src/pages/insurance/index.astro`, `src/content/blog/car-insurance-coverage.md` |
| Home (security, warranty, internet) | `src/content/blog/home-insurance-coverage.md` |
| General | `src/pages/blog/index.astro` (auto via content collection) |

### Links FROM New Article (to existing pages)

Every new article must include:
- [ ] 1 link to relevant hub page (`/insurance`, `/credit-cards`, `/finance`)
- [ ] 2-3 links to related guide articles
- [ ] Links in SEO content section (natural placement)

### How to Add Links to Hub Pages

For `.astro` hub pages, add to the posts array:

```javascript
// Example: src/pages/insurance/index.astro
const insurancePosts = [
  // ... existing posts ...
  {
    title: "Best Disability Insurance",
    description: "Protect your income with top providers.",
    href: "/blog/best-disability-insurance",
    category: "Disability Insurance",
    image: "/insurance-images/disability.jpeg"
  }
];
```

### Recent Link Integrations Reference

| New Article | Linked FROM |
|-------------|-------------|
| best-online-savings-accounts | credit-cards/index, credit-card-points.md |
| best-student-loans | credit-cards/index, credit-card-points.md |
| best-disability-insurance | insurance/index.astro |
| best-rv-insurance | insurance/index, car-insurance-coverage.md |
| best-auto-refinance-lenders | car-insurance-coverage.md |
| best-home-security-cameras | home-insurance-coverage.md |
| best-home-warranty-companies | home-insurance-coverage.md |

---

## 6. Image Requirements

### Specifications

| Type | Dimensions | Format | Max Size | Location |
|------|------------|--------|----------|----------|
| Hero/Featured | 1200x630px | JPG/WebP | 200KB | `/public/blog-images/` |
| Blog Thumbnail | 400x300px | JPG/WebP | 50KB | `/public/blog-images/` |
| Author Photo | 300x300px (square) | JPG/WebP | 30KB | `/public/team/` |
| Company Logos | Variable | PNG/SVG | 50KB | `/public/[category]-logos/` |
| Credit Card Images | 400x250px | PNG/WebP | 40KB | `/public/credit-cards/` |
| Category Headers | 1200x400px | JPG/WebP | 150KB | `/public/category-images/` |

### Image Folder Structure

```
public/
├── blog-images/           # Article hero images
├── category-images/       # Category page headers
├── credit-cards/          # Credit card product images
├── guides-images/         # Guide featured images
├── insurance-images/      # Insurance article images
├── insurance-logos/       # Full-size insurance logos
├── insurance-logos-small/ # Optimized small logos
├── news-images/           # News article images
├── team/                  # Author photos
├── home-warranty-logos/   # Home warranty company logos
├── vpn-logos/             # VPN service logos
├── student-loan-logos/    # Student loan company logos
├── rv-insurance-logos/    # RV insurance logos
└── icons/                 # UI icons
```

### Alt Text Guidelines

- [ ] Describe the image content specifically
- [ ] Include keyword naturally if relevant
- [ ] Keep under 125 characters
- [ ] Don't start with "Image of" or "Picture of"
- [ ] Be specific about card/company names

**Good Examples:**
- `Chase Sapphire Preferred credit card front design showing metal finish`
- `State Farm insurance company logo`
- `Comparison chart of top travel rewards cards for 2025`

**Bad Examples:**
- `Image of a credit card`
- `logo`
- `picture`

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

### Optimization Commands

```bash
# Preview what would be optimized
npm run optimize:images:dry

# Normal compression (logos, icons)
npm run optimize:images

# Aggressive compression (photos)
npm run optimize:images:aggressive

# Local fallback for large files
node scripts/optimize-large-images-sharp.js
```

---

## 7. Article Page Structure

### Required Sections (In Order)

1. **Schema Markup** - ArticleSchema, FAQSchema, BreadcrumbSchema
2. **CursorTrailDark Hero** - `compact={true}`, `animateTitle={true}`
3. **Advertiser Disclosure** - Standard disclosure block
4. **Sticky TOCToggleGroup** - Table of contents navigation
5. **#cards Section** - Ranked provider/item cards
6. **#compare-table Section** - Premium comparison table
7. **SEO Content Section** - Educational content with subsections:
   - `#how-it-works` (or `#how-rewards-work` for credit cards)
   - `#how-to-choose`
   - `#best-by-category`
   - `#methodology`
8. **#faq Section** - FAQ accordions (8-10 questions)
9. **Related Pages Grid** - 3 related article cards
10. **Author Box** - Author info with photo and credentials

### Template Imports

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
import CursorTrailDark from '../../components/CursorTrailDark.tsx';
import TOCToggleGroup from '../../components/TOCToggleGroup.tsx';
import FAQSchema from '../../components/seo/FAQSchema.astro';
import ArticleSchema from '../../components/seo/ArticleSchema.astro';
import BreadcrumbSchema from '../../components/seo/BreadcrumbSchema.astro';
---
```

### Data Arrays Structure

```typescript
// Items array (customize fields per category)
const items = [
  {
    name: string,
    slug: string,
    bestFor: string,
    rating: number,           // 4.8
    pros: string[],           // 4 items
    cons: string[],           // 2-3 items
    description: string,
    bottomLine: string,
    details: string[],        // 8-12 bullet points
    editorChoice?: boolean    // true for #1 only
    // + category-specific fields
  }
];

// FAQs array
const faqs = [
  {
    question: string,  // Target "People Also Ask"
    answer: string     // 50-75 words, use <strong> for emphasis
  }
];
```

---

## 8. Copywriting Standards (TPG Style)

### Voice & Tone

| Aspect | Guideline |
|--------|-----------|
| **Authority** | Expert friend who's done the research |
| **Perspective** | First-person plural ("We chose...", "Our testing showed...") |
| **Reader Address** | Second-person ("You'll get...", "If you're looking for...") |
| **Confidence** | Direct recommendations, never wishy-washy |

### Opening Statement Patterns

```
"The [Product] is one of the most [superlative] [category] on the market."
"[Product] stands out from competitors with its [key differentiator]."
"If you're looking for [benefit], [Product] delivers."
```

### Value Statement Patterns

```
"packs a ton of value"
"easily justifies the [cost/fee]"
"a solid choice for [user type]"
"a top pick for [use case]"
"delivers excellent value for [audience]"
```

### Comparison Statement Patterns

```
"compared to others in its class"
"while competitors charge [X], this offers [Y]"
"unlike most [products]..."
"stands out from the competition by..."
```

### Vocabulary Rules

| ✅ Use This | ❌ Avoid This |
|------------|--------------|
| welcome bonus | sign-up bonus |
| annual fee | yearly cost |
| earning rate | rewards rate |
| premium | expensive |
| budget-friendly | cheap |
| cardholders | card owners |
| coverage options | what's covered |
| APY | interest rate |
| we recommend | you should |
| based on our analysis | we think |

### Never Use

- "best ever", "amazing deal", "incredible value"
- "you won't believe", "secret", "hack"
- "trick", "loophole", "free money"
- "guaranteed", "act now", "limited time"
- Vague claims without specific numbers
- "In order to" (just say "to")
- "Due to the fact that" (just say "because")

### Formatting Rules

**Rewards/Rates Format:**
```
5x — Earn 5x on travel purchased through [Portal].
3x — Earn 3x on dining and streaming.
1x — Earn 1x on all other purchases.
```

**Pros (complete sentences with specifics):**
- ✅ "You'll earn 5% cash back on the first $25,000 spent at office supply stores each year"
- ❌ "Good rewards"

**Cons (honest tradeoffs with numbers):**
- ✅ "The $795 annual fee may be hard to justify without heavy travel spending"
- ❌ "Expensive"

**Paragraph Length:** 4 sentences maximum

---

## 9. Accessibility Checklist

### Required Elements

- [ ] Skip link to main content at top of page
- [ ] ARIA labels on all interactive elements
- [ ] Role attributes on landmarks (`role="banner"`, `role="contentinfo"`, `role="navigation"`)
- [ ] Alt text on ALL images (no empty alt="" except decorative)
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Keyboard navigable accordions and menus
- [ ] Visible focus states on all interactive elements
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Form labels associated with inputs
- [ ] External links indicate they open in new tab

### Current Implementation Examples

```html
<!-- Skip Link -->
<a href="#main-content" class="skip-link sr-only focus:not-sr-only">
  Skip to main content
</a>

<!-- Social Link with ARIA -->
<a href="https://twitter.com/screenedcom" 
   class="social-link" 
   aria-label="Follow us on X/Twitter" 
   target="_blank" 
   rel="noopener">

<!-- Footer with Role -->
<footer class="footer-section" 
        role="contentinfo" 
        itemscope 
        itemtype="https://schema.org/WPFooter">
```

---

## 10. Menu/Footer Access Verification

### Before Publishing Any New Article

Verify the new article is accessible from:

- [ ] **Relevant Header Dropdown** - Add to appropriate category dropdown if it's a main page
- [ ] **Footer Link Section** - Add to footer if it's a primary category page
- [ ] **Sitemap Page** - Update `src/pages/sitemap.astro` sections array
- [ ] **Hub Page** - Add to relevant index page (insurance, credit-cards, finance)
- [ ] **Blog Index** - Automatic for blog posts via content collection

### Files to Update for New Main Pages

| Location | File | What to Add |
|----------|------|-------------|
| Header Menu | `src/components/Header.astro` | Add to dropdown-menu items |
| Footer | `src/components/Footer.astro` | Add to footer-links list |
| Sitemap | `src/pages/sitemap.astro` | Add to sections array |
| Hub Page | `src/pages/[category]/index.astro` | Add to posts array |

---

## 11. Pre-Publish Final Checklist

### Content

- [ ] All frontmatter fields complete (title, description, pubDate, heroImage, author, tags)
- [ ] Author matches a team member from the list
- [ ] Date is correct and current
- [ ] Spelling and grammar checked (run through Grammarly)
- [ ] Mobile responsive (test at 375px width)
- [ ] No typos in titles, headings, or provider names

### Technical

- [ ] All internal links work (test each one)
- [ ] All external links work (test each one)
- [ ] Images optimized (under target file sizes)
- [ ] Images have proper alt text
- [ ] Page loads under 3 seconds
- [ ] No console errors

### SEO

- [ ] Title: 50-60 characters with primary keyword
- [ ] Meta description: 150-160 characters with keyword
- [ ] URL slug: short, keyword-rich, lowercase, hyphens
- [ ] Schema validated with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Internal links added (3-in, 3-out rule)
- [ ] FAQ Schema with 8-10 questions
- [ ] H1 matches page title
- [ ] Primary keyword in first 100 words

### Visual

- [ ] Hero image displays correctly
- [ ] All provider logos load
- [ ] Cards are properly formatted
- [ ] Ratings display with stars
- [ ] Pros/Cons render in columns
- [ ] FAQs expand/collapse properly
- [ ] Comparison table scrolls on mobile

---

## 12. Team Authors

| Name | Role | Specialization | Image Path |
|------|------|----------------|------------|
| Sarah Chen | Editor-in-Chief | Credit Cards, Travel | `/team/sarah-chen.jpg` |
| Michael Rodriguez | Senior Credit Card Analyst | Credit Card Analysis | `/team/michael-rodriguez.jpg` |
| Emily Johnson | Insurance Editor | Insurance | `/team/emily-johnson.jpg` |
| David Kim | Home Insurance Expert | Home Insurance | `/team/david-kim.jpg` |
| Jessica Martinez | Personal Finance Writer | Banking, Savings | `/team/jessica-martinez.jpg` |
| James Wilson | Travel Editor | Travel | `/team/james-wilson.jpg` |

### Frontmatter Author Format

```yaml
---
author: "Sarah Chen"
authorImage: "/team/sarah-chen.jpg"
authorRole: "Editor-in-Chief"
---
```

---

## 13. SCREAMING EAGLE Steps (All 8 Required)

**No article goes live until ALL 8 steps are complete.**

### Step 1: Article Structure
- [ ] Use correct template (ComparisonLayout or MainLayout)
- [ ] File location: `src/pages/blog/best-[topic].astro`
- [ ] 8-10 providers with complete data
- [ ] 8-10 FAQs targeting "People Also Ask"
- [ ] 1500+ words SEO content

### Step 2: Logo Integration
- [ ] All provider logos load correctly
- [ ] Use Clearbit: `https://logo.clearbit.com/company.com`
- [ ] Or Brandfetch API for higher quality
- [ ] Or local logos in `/public/[category]-logos/`

### Step 3: Visual Verification
- [ ] Start dev server: `npm run dev`
- [ ] Navigate to article URL
- [ ] All logos load
- [ ] Cards formatted correctly
- [ ] Mobile responsive (resize to 375px)
- [ ] Take screenshot for documentation

### Step 4: Hero Image
- [ ] Source from Freepik or create custom
- [ ] Dimensions: 1200x630px minimum
- [ ] Save to `/public/blog-images/best-[topic].jpg`
- [ ] Update heroImage prop in article

### Step 5: Image Optimization
- [ ] Run Imagify or Sharp optimization
- [ ] Hero image under 200KB
- [ ] Logos under 50KB
- [ ] In-content images under 100KB

### Step 6: Internal Linking
- [ ] 3 links FROM existing pages TO new article
- [ ] 3 links FROM new article TO existing pages
- [ ] Update hub pages (insurance/index, credit-cards/index)
- [ ] Add to related guides sections

### Step 7: Sitemap & Final Checks
- [ ] SEO elements verified (title, description, slug)
- [ ] Schema validated
- [ ] Mobile test passed
- [ ] All links work
- [ ] Spelling/grammar checked

### Step 8: Update Progress Tracking
- [ ] Update `scripts/article-progress.csv`
- [ ] Set status to "completed"
- [ ] Record SCREAMING EAGLE completion: "1-8 done"

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build

# Image Optimization
npm run optimize:images:dry        # Preview changes
npm run optimize:images            # Normal compression
npm run optimize:images:aggressive # Aggressive compression

# Check TypeScript
npm run astro check
```

---

## File Locations Quick Reference

| Content Type | File Location | Image Folder |
|--------------|---------------|--------------|
| Blog/News | `src/pages/blog/` | `/public/blog-images/` |
| Guides | `src/content/guides/` | `/public/guides-images/` |
| Reviews | `src/content/reviews/` | `/public/blog-images/` |
| Credit Cards Hub | `src/pages/credit-cards/` | `/public/credit-cards/` |
| Insurance Hub | `src/pages/insurance/` | `/public/insurance-logos/` |
| Team Photos | N/A | `/public/team/` |

---

*This checklist should be reviewed before publishing ANY content to ensure 100% brand consistency.*

*Last Updated: December 12, 2025*

