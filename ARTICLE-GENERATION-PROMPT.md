# 🚀 THE ULTIMATE SCREENED.COM ARTICLE GENERATION SOP

**Your complete system for creating perfect comparison articles.**

---

## TABLE OF CONTENTS
1. [The Master Prompt](#the-master-prompt)
2. [Writing Style Guide (TPG Style)](#writing-style-guide)
3. [Technical Template (Astro)](#technical-template)
4. [Logo Workflow](#logo-workflow)
5. [Image Workflow](#image-workflow)
6. [Vocabulary Reference](#vocabulary-reference)
7. [Complete Checklist](#complete-checklist)

---

# THE MASTER PROMPT

**Copy this entire prompt block and customize the [BRACKETS] for your article:**

```
I need you to create a comparison article for Screened.com.

## TARGET ARTICLE:
- **Keyword:** [INSERT KEYWORD - e.g., "best rv insurance", "best gaming headsets", "best online savings accounts"]
- **URL:** /blog/best-[topic].astro
- **Category:** [insurance / finance / credit-cards / home / tech / lifestyle]
- **Number of Items:** [8-15 recommended]

---

## 1. TECHNICAL REQUIREMENTS (ASTRO PAGE)

### File Location:
Create: src/pages/blog/best-[topic].astro

### Required Imports:
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

### Section IDs (Required for TOC):
These MUST exist exactly as shown:
- #cards (main item list)
- #compare-table (comparison table)
- #how-it-works (or #how-rewards-work for credit cards)
- #how-to-choose
- #best-by-category
- #methodology
- #faq

### Page Structure (In Exact Order):
1. Schema markup (ArticleSchema, FAQSchema, BreadcrumbSchema)
2. CursorTrailDark hero (compact={true}, animateTitle={true})
3. Advertiser disclosure block
4. Sticky TOCToggleGroup
5. #cards - Ranked item cards
6. #compare-table - Comparison table
7. SEO content sections (#how-it-works, #how-to-choose, #best-by-category, #methodology)
8. #faq - FAQ accordions
9. Related pages grid
10. Author box

---

## 2. DATA STRUCTURE

### Items Array (Customize fields per category):

**For Credit Cards:**
```typescript
{
  name: string,
  slug: string,
  bestFor: string,           // "Best Overall", "Best Value"
  annualFee: string,         // "$95"
  bonus: string,             // "75,000 points"
  bonusValue: string,        // "$937"
  rating: number,            // 4.8
  rewardsRate: string,       // "5X/3X/2X/1X"
  foreignFee: string,        // "$0"
  introAPR: string,
  regularAPR: string,
  pros: string[],            // 4 items
  cons: string[],            // 2-3 items
  description: string,
  bottomLine: string,
  cardDetails: string[],     // 8-12 bullet points
  editorChoice?: boolean     // true for #1 only
}
```

**For Insurance:**
```typescript
{
  name: string,
  slug: string,
  bestFor: string,
  monthlyAvg: string,        // "$125-$250/mo"
  rating: number,
  amBest: string,            // "A+", "A++"
  pros: string[],
  cons: string[],
  description: string,
  bottomLine: string,
  coverageDetails: string[],
  editorChoice?: boolean
}
```

**For Finance/Savings:**
```typescript
{
  name: string,
  slug: string,
  bestFor: string,
  apy: string,               // "5.00%"
  apyNote: string,           // "up to $5K"
  minBalance: string,        // "$0"
  requirements: string,      // "None" or "DD Required"
  rating: number,
  fdic: boolean,
  pros: string[],
  cons: string[],
  description: string,
  bottomLine: string,
  accountDetails: string[],
  editorChoice?: boolean
}
```

**For Tech/Products:**
```typescript
{
  name: string,
  slug: string,
  bestFor: string,
  price: string,             // "$299"
  rating: number,
  specs: {                   // Category-specific
    [key]: string
  },
  pros: string[],
  cons: string[],
  description: string,
  bottomLine: string,
  features: string[],
  editorChoice?: boolean
}
```

### Stats Grid (4 metrics - customize per category):

| Category | Stat 1 | Stat 2 | Stat 3 | Stat 4 |
|----------|--------|--------|--------|--------|
| Credit Cards | Annual Fee | Welcome Bonus | Rewards Rate | Foreign Fees |
| Insurance | Monthly Cost | AM Best Rating | Deductible | Full-Timer (Y/N) |
| Savings | APY | Min for APY | Requirements | $10K Earns |
| Tech | Price | Rating | Key Spec | Warranty |
| Home Services | Monthly Cost | Service Fee | Coverage | Rating |

### FAQs Array:
```typescript
{
  question: string,  // Target "People Also Ask"
  answer: string     // 50-75 words, use <strong> for emphasis
}
```
Include 8-10 FAQs minimum.

---

## 3. WRITING STYLE (TPG STYLE - GENERIC)

### Voice & Tone:
- **Authority:** Expert friend who's done the research
- **Perspective:** First-person plural ("We chose...", "Our testing showed...")
- **Reader Address:** Second-person ("You'll get...", "If you're looking for...")
- **Confidence:** Direct recommendations, never wishy-washy

### Language Patterns:

**Opening Statements:**
- "The [Product] is one of the most [superlative] [category] on the market."
- "[Product] stands out from competitors with its [key differentiator]."
- "If you're looking for [benefit], [Product] delivers."

**Value Statements:**
- "packs a ton of value"
- "easily justifies the [cost/fee]"
- "a solid choice for [user type]"
- "a top pick for [use case]"
- "delivers excellent value for [audience]"

**Comparison Statements:**
- "compared to others in its class"
- "while competitors charge [X], this offers [Y]"
- "unlike most [products]..."
- "stands out from the competition by..."

**Closing Statements:**
- "Read our full review of [Product]."
- "[Product] is ideal for [specific user type]."
- "If [condition], this is the one to get."

### Formatting Rules:

**Rewards/Rates (use this format):**
```
5x — Earn 5x on travel purchased through [Portal].
3x — Earn 3x on dining and streaming.
1x — Earn 1x on all other purchases.
```

**Pros (complete sentences with specifics):**
✅ "You'll earn 5% cash back on the first $25,000 spent at office supply stores each year"
✅ "Includes a $300 annual travel credit that applies automatically"
❌ "Good rewards"
❌ "Has perks"

**Cons (honest tradeoffs with numbers):**
✅ "The $795 annual fee may be hard to justify without heavy travel spending"
✅ "Some credits require activation and are split across the year"
❌ "Expensive"
❌ "Not for everyone"

**Research Intro (use this template):**
"After analyzing [X] data points across [Y] [products]—including [metric1], [metric2], and [metric3]—we've identified the [Z] [products] that deliver the highest real-world value. Our team [credibility statement with specific numbers]."

**Bottom Line (use this structure):**
1. Confident recommendation statement
2. Specific value calculation or comparison
3. Who this is ideal for
4. Who should look elsewhere (optional)

### Numbers & Specifics:
- Always include exact numbers ("$95 annual fee" not "low fee")
- Use percentages ("5%" not "good rate")
- Include time frames ("in the first 3 months")
- Reference caps and limits ("up to $25,000 per year")

### Things to NEVER Write:
❌ "sign-up bonus" (use "welcome bonus")
❌ "best deal" or "amazing value" (too salesy)
❌ "you won't believe" (clickbait)
❌ "cheap" (use "budget-friendly" or "no annual fee")
❌ Vague claims without numbers
❌ "In order to" (just say "to")
❌ "Due to the fact that" (just say "because")
❌ Long paragraphs (4 sentences max)

---

## 4. COLOR THEMES BY CATEGORY

| Category | Primary Gradient | Accent |
|----------|-----------------|--------|
| Credit Cards | #0066B2 → #004C8C | Blue |
| Insurance | #0D2C4B → #1a4a7a | Navy |
| Finance/Savings | #059669 → #047857 | Green |
| Home Services | #334155 → #1e293b | Slate |
| Tech/Products | #7C3AED → #5B21B6 | Purple |
| Lifestyle | #DC2626 → #B91C1C | Red |

---

## 5. REQUIRED CONTENT SECTIONS

### SEO Content (4 sections minimum):

**Section 1: How [Category] Works**
- Explain the basics for newcomers
- Include an info-box with key insight
- Use a comparison table if helpful

**Section 2: How to Choose**
- Decision factors table
- Warning-box with common mistakes
- Key questions to ask yourself

**Section 3: Best by Category**
- 6 category cards in a grid
- Each with: icon, title, winner name, 1-2 sentence why

**Section 4: Methodology**
- Weighted factors table (should total 100%)
- What you evaluated
- Last updated date

---

## 6. OUTPUT FORMAT

Provide the COMPLETE .astro file including:
- Full frontmatter with all imports
- Complete data arrays
- Full HTML/JSX structure matching best-travel-cards.astro
- All <style> blocks
- Client-side <script> for animations

DO NOT:
- Invent new components
- Change section IDs
- Alter the TOCToggleGroup behavior
- Remove required sections
```

---

# WRITING STYLE GUIDE

## Quick Reference: TPG Voice

### Sentence Starters
```
"The [Product] is one of the most..."
"[Brand] delivers..."
"You'll earn/get/receive..."
"If you're looking for..."
"With its strong [feature]..."
"Cardholders/Members can..."
"While the [product] carries..."
"On top of that..."
```

### Transition Phrases
```
"On top of that,"
"While other [products]..."
"Unlike most [competitors],"
"With its strong [feature],"
"That said,"
"If you're [user type],"
"For those who [condition],"
```

### Value Descriptors
```
"packs a ton of value"
"easily offsets/justifies the [cost]"
"a solid choice for"
"a top pick for"
"remains one of the most rewarding"
"delivers excellent value"
"a surprisingly powerful [product]"
"stands out from competitors"
```

---

# TECHNICAL TEMPLATE

## Astro Page Structure Reference

```astro
---
// 1. IMPORTS (do not change)
import MainLayout from '../../layouts/MainLayout.astro';
import CursorTrailDark from '../../components/CursorTrailDark.tsx';
import TOCToggleGroup from '../../components/TOCToggleGroup.tsx';
import FAQSchema from '../../components/seo/FAQSchema.astro';
import ArticleSchema from '../../components/seo/ArticleSchema.astro';
import BreadcrumbSchema from '../../components/seo/BreadcrumbSchema.astro';

// 2. DATA ARRAYS
const items = [/* your items */];
const faqs = [/* your FAQs */];
---

<!-- 3. MAIN LAYOUT -->
<MainLayout 
  title="[Title] | Screened" 
  description="[150-160 char description]"
>

  <!-- 4. SCHEMA -->
  <ArticleSchema ... />
  <FAQSchema faqs={faqs} />
  <BreadcrumbSchema items={[...]} />

  <!-- 5. HERO -->
  <CursorTrailDark 
    client:load
    title="[Page Title]"
    subtitle="[One line description]"
    author="[Team Member]"
    date="Dec. 12, 2025"
    compact={true}
    animateTitle={true}
  />

  <!-- 6. DISCLOSURE -->
  <section class="bg-[#F7F8FA] py-4 border-b">...</section>

  <!-- 7. STICKY TOC -->
  <section class="sticky top-16 z-40">
    <TOCToggleGroup client:load />
  </section>

  <!-- 8. CARDS SECTION -->
  <section id="cards">...</section>

  <!-- 9. COMPARISON TABLE -->
  <section id="compare-table">...</section>

  <!-- 10. SEO CONTENT -->
  <section>
    <div id="how-it-works">...</div>
    <div id="how-to-choose">...</div>
    <div id="best-by-category">...</div>
    <div id="methodology">...</div>
  </section>

  <!-- 11. FAQ -->
  <section id="faq">...</section>

  <!-- 12. RELATED -->
  <section id="related">...</section>

  <!-- 13. AUTHOR BOX -->
  <section>...</section>

</MainLayout>

<style>
  /* Copy styles from best-travel-cards.astro */
</style>

<script>
  /* Copy script from best-travel-cards.astro */
</script>
```

---

# LOGO WORKFLOW

> ⚠️ **CRITICAL WARNING**: Many API-fetched logos are **WHITE on TRANSPARENT** backgrounds!  
> These are **INVISIBLE** on white card backgrounds. Always verify visibility after fetching!

## Step 1: Choose Strategy

**Option A: Clearbit URLs (Quick)**
```html
<img src="https://logo.clearbit.com/[domain].com" alt="[Company] logo" />
```

**Option B: Local Logos (Better)**
```bash
# Create fetch script
cp scripts/fetch-warranty-logos.js scripts/fetch-[category]-logos.js

# Edit company array, then run:
node scripts/fetch-[category]-logos.js
```

## Step 2: Company Array Template
```javascript
const companies = [
  { name: 'Company Name', domain: 'company.com', slug: 'company-name' },
  // Add all companies...
];
const outputDir = path.join(__dirname, '../public/[category]-logos');
```

## Step 3: ⚠️ CRITICAL - Verify Logo Visibility
```bash
# Many API logos are WHITE on TRANSPARENT = INVISIBLE on white cards!

# Method 1: Ask Cursor AI to visually inspect
"Read public/[category]-logos/[company].png - is it visible on white background?"

# Method 2: Check in browser with dark background
# Open logo file, if it appears white/light = problem!

# Method 3: Check on actual page
npm run dev
# Visit page, if logo area is blank = white logo problem
```

**Fix White Logos:**
- Re-fetch with `theme: "dark"` parameter
- Download colored version from company website
- Use logo.dev with different token/params
- Generate SVG fallback with colored text

## Step 4: Handle Failed/White Logos
```bash
# Generate SVG fallbacks
node scripts/generate-[category]-logos.js

# Or download manually from:
# - brandfetch.com
# - Company press/media pages
# - seeklogo.com
```

## Step 4: Use in Article
```javascript
// Import auto-generated map
import { get[Category]Logo } from '../../utils/[category]LogoMap';

// In template
<img src={get[Category]Logo(item.slug)} alt={`${item.name} logo`} />
```

---

# IMAGE WORKFLOW

## Hero Images

**Option 1: Freepik**
1. Search "[topic] hero banner"
2. Download 1200x630px minimum
3. Save to: `/public/blog-images/best-[topic].jpg`

**Option 2: Gemini AI**
```bash
node scripts/generate-insurance-hero.js "[topic]"
```

**Option 3: Stock Photos**
- unsplash.com
- pexels.com

## Optimization
```bash
# Preview
npm run optimize:images:dry

# Normal compression (logos)
npm run optimize:images

# Aggressive (photos)
npm run optimize:images:aggressive
```

**Target Sizes:**
- Hero: < 200KB
- Logos: < 50KB
- In-content: < 100KB

---

# VOCABULARY REFERENCE

**📄 Full list: vocabulary-guide.csv**

## Quick Reference by Category

### Credit Cards
| ✅ Use | ❌ Avoid |
|--------|---------|
| welcome bonus | sign-up bonus |
| annual fee | yearly cost |
| earning rate | rewards rate |
| transfer partners | airline partners |
| cardholders | card owners |

### Insurance
| ✅ Use | ❌ Avoid |
|--------|---------|
| coverage options | what's covered |
| premium costs | insurance price |
| deductible | out-of-pocket |
| AM Best rating | company rating |
| policy benefits | insurance perks |

### Finance
| ✅ Use | ❌ Avoid |
|--------|---------|
| APY | interest rate |
| compound interest | interest on interest |
| FDIC insured | federally protected |
| high-yield | high-interest |
| principal | amount |

### General
| ✅ Use | ❌ Avoid |
|--------|---------|
| budget-friendly | cheap |
| premium | expensive |
| optimal value | best deal |
| we recommend | you should |
| based on our analysis | we think |

### Never Use
- "best ever", "amazing deal"
- "you won't believe", "secret"
- "hack", "trick", "loophole"
- "free money", "guaranteed"
- "act now", "limited time"

---

# COMPLETE CHECKLIST

## Phase 1: Generation
- [ ] Copy master prompt, fill in [BRACKETS]
- [ ] Paste to AI, receive complete .astro file
- [ ] Save to src/pages/blog/best-[topic].astro

## Phase 2: Logos
- [ ] Create/run logo fetch script
- [ ] Check for failed logos
- [ ] ⚠️ **VERIFY VISIBILITY: Ask Cursor "Read [logo].png - is it visible on white?"**
- [ ] Fix white/invisible logos (re-fetch dark theme or download colored)
- [ ] Generate SVG fallbacks for remaining failures
- [ ] Update article with local paths

## Phase 3: Hero Image
- [ ] Download from Freepik OR generate with Gemini
- [ ] Save to /public/blog-images/best-[topic].jpg
- [ ] Verify 1200x630px minimum

## Phase 4: Optimization
- [ ] Run: npm run optimize:images
- [ ] Verify file sizes under targets

## Phase 5: Verification
- [ ] npm run dev
- [ ] Visit /blog/best-[topic]
- [ ] **All logos VISIBLE (not white/blank)** ✓
- [ ] All logos load ✓
- [ ] Hero displays ✓
- [ ] Accordions work ✓
- [ ] Mobile responsive ✓
- [ ] TOC scroll/highlight works ✓

## Phase 6: Internal Linking
- [ ] Add 3 links FROM existing pages TO new article
- [ ] Verify 3 links FROM new article TO existing pages

## Phase 7: Finalize
- [ ] Update scripts/article-progress.csv
- [ ] Commit and push

---

# TEAM AUTHORS

| Name | Specialization | Image Path |
|------|---------------|------------|
| Sarah Chen | Credit Cards, Travel | /team/sarah-chen.jpg |
| Emily Johnson | Insurance | /team/emily-johnson.jpg |
| Jessica Martinez | Banking, Savings | /team/jessica-martinez.jpg |
| Michael Rodriguez | Credit Card Analysis | /team/michael-rodriguez.jpg |
| David Kim | Home Insurance | /team/david-kim.jpg |
| James Wilson | Travel | /team/james-wilson.jpg |

---

# API KEYS (.env)

```bash
BRANDFETCH_API_KEY=     # Logo fetching (better quality)
IMAGIFY_API_KEY=        # Image optimization
GEMINI_API_KEY=         # Hero image generation
FREEPIK_API_KEY=        # Background removal
ANTHROPIC_API_KEY=      # Article generation
```

---

*This SOP covers everything needed to create perfect comparison articles for ANY category.*
