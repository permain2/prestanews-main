# 🚀 ULTIMATE AI ARTICLE GENERATION PROMPT
## For Creating Perfect Screened.com Comparison Pages

**Version:** 2.0 | **Last Updated:** December 2025  
**Use this prompt every time you create a new comparison article.**

---

## 📋 PRE-FLIGHT CHECKLIST

Before starting, ensure you have:
- [ ] Target keyword identified
- [ ] Number of providers/products to feature (8-15 recommended)
- [ ] Category type (credit-cards, insurance, finance, home, tech)
- [ ] Access to Clearbit/Brandfetch for logos

---

## 🎯 THE MASTER PROMPT

Copy and customize this prompt for each new article:

```
Create a comprehensive comparison article for "[TARGET KEYWORD]" following the Screened.com winning template.

## ARTICLE REQUIREMENTS:

### 1. FILE STRUCTURE
- Create as standalone .astro page at: src/pages/blog/best-[topic].astro
- Import: MainLayout, CursorTrailDark, TOCToggleGroup, FAQSchema, ArticleSchema, BreadcrumbSchema
- DO NOT use ComparisonLayout - use the full standalone template structure

### 2. DATA ARRAYS (Define at top of file)

**providers/items array** - Each item must include:
```typescript
{
  name: string,           // Full official name
  slug: string,           // URL-friendly: "chase-sapphire-preferred"
  bestFor: string,        // Category badge: "Best Overall", "Best Value", etc.
  [priceField]: string,   // Annual fee, monthly cost, APY, etc.
  bonus?: string,         // Welcome bonus or key benefit
  bonusValue?: string,    // Dollar value of bonus
  rating: number,         // 1-5 scale, one decimal (4.8)
  [metrics]: string,      // Category-specific metrics (rewards rate, APY, etc.)
  pros: string[],         // 4 specific, quantified pros
  cons: string[],         // 2-3 honest cons
  description: string,    // 2-3 sentences, value proposition focused
  bottomLine: string,     // 4-5 sentences deep analysis
  [details]: string[],    // 8-12 bullet points of key features
  editorChoice?: boolean  // Only for #1 pick
}
```

**faqs array** - 8-10 questions:
```typescript
{
  question: string,  // Target "People Also Ask" queries
  answer: string     // Use <strong> for emphasis, be comprehensive
}
```

### 3. PAGE STRUCTURE (In exact order)

1. **Schema Markup** (ArticleSchema, FAQSchema, BreadcrumbSchema)

2. **Hero Section** - CursorTrailDark component:
   - title: "Best [Category] of December 2025"
   - subtitle: One sentence value prop (under 100 chars)
   - author: Team member name
   - date: "Dec. 11, 2025"
   - compact={true}, animateTitle={true}

3. **Disclosure Section** - Standard affiliate disclaimer

4. **Sticky TOC Navigation** - TOCToggleGroup component

5. **Cards Section** (#cards):
   - Research intro paragraph (specific data points, methodology)
   - Provider cards with: rank badge, image/logo, rating, CTA button, stats grid, accordions

6. **Quick Comparison Table** (#compare-table):
   - Top 10 items in sortable table format

7. **SEO Content Section** - Rich content with:
   - "How [Category] Works" section with info-box
   - "How to Choose" section with decision table
   - "Best by Category" grid (6 picks)
   - "Methodology" section with weighted criteria table

8. **FAQ Section** (#faq) - Animated accordion

9. **Related Pages Section** (#related) - 3 related guides

10. **Author Box** - Writer bio with credentials

### 4. VOCABULARY GUIDELINES (Write like ThePointsGuy.com)

**USE THESE TERMS:**
| Industry | Preferred Terms |
|----------|-----------------|
| Credit Cards | welcome bonus, annual fee, earning rate, redemption value, transfer partners, lounge access, elite status, statement credit |
| Insurance | coverage options, premium costs, deductible amounts, policy benefits, claim process, liability limits, comprehensive protection |
| Finance | APY, compound interest, FDIC insured, no minimum balance, high-yield, annual percentage yield |
| General | value proposition, cost-benefit, ROI, bottom line, key takeaways |

**AVOID:**
- sign-up offer (use "welcome bonus")
- yearly cost (use "annual fee")
- cheap/cheapest (use "budget-friendly" or "value")
- best deal (use "optimal value" or "smart choice")
- free money (unprofessional)

**TONE & STYLE:**
- Professional but conversational (like a knowledgeable friend)
- Use "you/your" - second person
- Short paragraphs (2-4 sentences max)
- Specific numbers and percentages always
- Mention competitor comparisons naturally
- Include real examples and scenarios

### 5. SPECIFIC CONTENT REQUIREMENTS

**Research Intro** (after Cards heading):
"After analyzing [X] data points across [Y] [products]—including [metric1], [metric2], [metric3]—we've identified the [Z] [products] that deliver the highest real-world value. Our team [credibility statement with specific numbers]."

**Bottom Line** for each provider:
- Start with confident recommendation statement
- Include specific value calculations
- Compare to alternatives
- End with who should/shouldn't choose this

**Pros** (4 items each):
- Lead with specific benefit + quantified value
- Example: "5X on travel via Chase Travel℠" not "Good rewards"
- Example: "$300 annual travel credit (easy to use)" not "Has travel credit"

**Cons** (2-3 items each):
- Be honest but fair
- Example: "High $550 annual fee" not "Expensive"
- Example: "Requires portal booking for 10X" not "Limited earning"

### 6. SEO REQUIREMENTS

- Title: 50-60 chars with keyword near start
- Meta description: 150-160 chars with CTA
- H2s every 300-400 words
- Primary keyword 3-5x naturally
- 3-5 internal links to related pages
- Image alt text includes keywords

### 7. STYLING CLASSES (Already defined in template)

Use these CSS classes from the travel card template:
- `.apply-btn` - CTA buttons
- `.stat-box`, `.stat-label`, `.stat-value` - Stats grid
- `.accordion-item`, `.accordion-header`, `.accordion-content` - Expandable sections
- `.comparison-table` - Tables
- `.info-box`, `.warning-box`, `.key-takeaway` - Callout boxes
- `.category-picks`, `.category-card` - Best by category grid
- `.fee-breakdown`, `.comparison-boxes` - Value analysis
- `.faq-item`, `.faq-question`, `.faq-answer` - FAQ styling
- `.related-card`, `.related-icon` - Related content grid
- `.seo-content` - Article content wrapper

### 8. LOGO SOURCES

For provider logos, use in order of preference:
1. Local: `/insurance-logos-small/[slug].png` (if exists)
2. Clearbit: `https://logo.clearbit.com/[domain].com`
3. Brandfetch: Run fetch script (requires API key)
4. Generated SVG fallback

### 9. QUALITY CHECKS

Before finalizing, verify:
- [ ] All 8-15 providers have complete data
- [ ] Editor's Choice badge on #1 pick only
- [ ] All logos load correctly
- [ ] Rating out of 5 with one decimal
- [ ] Stats grid shows 4 relevant metrics
- [ ] Bottom Line for top 5 providers minimum
- [ ] FAQ answers are comprehensive (50+ words each)
- [ ] Comparison table shows top 10
- [ ] Methodology explains ranking factors
- [ ] Author box with real team member
- [ ] All internal links valid

## OUTPUT FORMAT:

Provide the complete .astro file ready to save, including:
1. Full frontmatter imports
2. Complete data arrays
3. Full HTML structure
4. All <style> blocks
5. Any <script> for interactivity
```

---

## 🎨 QUICK REFERENCE: COMPONENT STRUCTURE

### Card Container Structure
```html
<div class="card-container">
  <!-- Editor's Choice Badge (if applicable) -->
  <div class="bg-gradient-to-r from-[#F59E0B]...">EDITOR'S CHOICE</div>
  
  <div class="grid md:grid-cols-[320px_1fr]">
    <!-- Left Panel: Image, Rating, CTA -->
    <!-- Right Panel: Header, Description, Stats, Accordions -->
  </div>
</div>
```

### Stats Grid Structure
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
  <div class="stat-box">
    <div class="stat-label">Label</div>
    <div class="stat-value">Value</div>
  </div>
  <!-- 4 stat boxes total -->
</div>
```

### Accordion Structure
```html
<details class="accordion-item">
  <summary class="accordion-header">
    <span>Section Title</span>
    <svg class="accordion-icon">...</svg>
  </summary>
  <div class="accordion-content">
    <!-- Content -->
  </div>
</details>
```

---

## 📁 FILE NAMING CONVENTIONS

| Type | Pattern | Example |
|------|---------|---------|
| Page | `best-[topic].astro` | `best-rv-insurance.astro` |
| Hero Image | `/blog-images/best-[topic].jpg` | `/blog-images/best-rv-insurance.jpg` |
| Logo Folder | `/[category]-logos/` | `/insurance-logos-small/` |

---

## 🔧 POST-GENERATION WORKFLOW

After generating the article:

1. **Run Logo Fetch Script** (if needed):
   ```bash
   node scripts/fetch-[category]-logos.js
   ```

2. **Generate Featured Image** (Gemini):
   ```bash
   node scripts/generate-insurance-hero.js "[topic]"
   ```

3. **Optimize Images** (Imagify):
   ```bash
   npm run optimize:images
   ```

4. **Visual Verification**:
   ```bash
   npm run dev
   # Visit http://localhost:4321/blog/best-[topic]
   ```

5. **Update Progress CSV**:
   Edit `scripts/article-progress.csv`

---

## ✅ SCREAMING EAGLE CHECKLIST

```
□ Step 1: Article Structure (Standalone template, not ComparisonLayout)
□ Step 2: Logo Integration (Clearbit/Brandfetch/Local)
□ Step 3: Visual Verification (Screenshot Test)
□ Step 4: Hero Image (Full-width, topic-relevant)
□ Step 5: Image Optimization (Imagify)
□ Step 6: Internal Linking (3-in, 3-out Rule)
□ Step 7: Sitemap & Final Checks
□ Step 8: Update Progress CSV
```

---

## 📊 EXAMPLE DATA STRUCTURES

### Credit Card Provider
```typescript
{
  name: "Chase Sapphire Preferred® Card",
  slug: "chase-sapphire-preferred",
  bestFor: "Best Overall",
  annualFee: "$95",
  bonus: "75,000 Ultimate Rewards® points",
  bonusValue: "$937",
  rating: 4.9,
  rewardsRate: "5X/3X/2X/1X",
  foreignFee: "$0",
  pros: ["5X on travel via Chase Travel℠", "3X on dining, streaming & online groceries", ...],
  cons: ["$95 annual fee", "No airport lounge access"],
  description: "The gold standard for travel rewards...",
  bottomLine: "This is one of our favorite credit cards—period...",
  cardDetails: ["Earn 75,000 bonus points after...", ...],
  editorChoice: true
}
```

### Insurance Provider
```typescript
{
  name: "Progressive",
  slug: "progressive",
  bestFor: "Full-Time RVers",
  monthlyAvg: "$125-$250/mo",
  rating: 4.7,
  amBest: "A+",
  pros: ["Full-timer coverage available", "Total loss replacement option", ...],
  cons: ["Higher premiums for full-timers", "Deductibles can be high"],
  description: "Progressive leads the RV insurance market...",
  bottomLine: "For full-time RVers who need comprehensive coverage..."
}
```

### Finance Provider
```typescript
{
  name: "Varo Bank",
  slug: "varo-bank",
  bestFor: "Highest APY",
  apy: "5.00% APY*",
  fees: "$0",
  minBalance: "$0",
  rating: 4.8,
  pros: ["Highest APY at 5.00% on balances up to $5,000", ...],
  cons: ["Requirements needed to earn top rate", ...],
  description: "Varo Bank offers the highest APY...",
  bottomLine: "If you can meet the direct deposit requirements..."
}
```

---

*Document maintained by Screened.com Editorial Team*

