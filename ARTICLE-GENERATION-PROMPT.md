# 🚀 THE ULTIMATE SCREENED.COM ARTICLE GENERATION PROMPT

**Copy this entire prompt and paste it to the AI when creating a new comparison article.**

---

## THE PROMPT (Copy Everything Below This Line)

```
I need you to create a comparison article for Screened.com. 

## TARGET ARTICLE:
- **Keyword:** [INSERT KEYWORD - e.g., "best rv insurance"]
- **URL:** /blog/best-[topic].astro
- **Category:** [insurance / finance / credit-cards / home / tech]
- **Number of Providers:** [8-15 recommended]

## CRITICAL REQUIREMENTS:

### 1. USE THE WINNING TEMPLATE STRUCTURE
Copy the EXACT structure from src/pages/credit-cards/best-travel-cards.astro:
- Standalone .astro file (NOT ComparisonLayout)
- Import: MainLayout, CursorTrailDark, TOCToggleGroup, FAQSchema, ArticleSchema, BreadcrumbSchema
- Same card container structure with grid layout
- Same accordion system (Bottom Line, Pros/Cons, Details)
- Same stats grid with 4 metrics
- Same comparison table
- Same SEO content section with info-box, warning-box, key-takeaway, category-picks
- Same FAQ accordion styling
- Same author box

### 2. PROVIDER DATA STRUCTURE
Each provider needs:
```typescript
{
  name: string,           // Full official name
  slug: string,           // URL-friendly lowercase
  bestFor: string,        // "Best Overall", "Best Value", etc.
  [priceMetric]: string,  // Annual fee, monthly cost, APY, etc.
  rating: number,         // 4.0-5.0 scale
  [categoryMetrics],      // APY, coverage, rewards rate, etc.
  pros: string[],         // 4 items - SPECIFIC and QUANTIFIED
  cons: string[],         // 2-3 items - HONEST
  description: string,    // 2-3 sentences
  bottomLine: string,     // 4-5 sentences deep analysis
  [details]: string[],    // 8-12 bullet points
  editorChoice?: boolean  // true for #1 only
}
```

### 3. WRITE LIKE THEPOINTSGUY.COM - USE THIS VOCABULARY:

| ✅ USE THESE | ❌ NOT THESE |
|-------------|-------------|
| welcome bonus | sign-up offer |
| annual fee | yearly cost |
| earning rate | how much you get back |
| redemption value | what points are worth |
| premium coverage | expensive insurance |
| coverage options | what you get |
| policy benefits | insurance perks |
| APY (Annual Percentage Yield) | interest rate |
| FDIC insured | safe |
| comprehensive protection | full coverage |
| budget-friendly | cheap |
| optimal value | best deal |

**TONE:** Professional but conversational, like a knowledgeable friend. Use "you/your". Be specific with numbers. Short paragraphs (2-4 sentences).

### 4. REQUIRED SECTIONS (IN ORDER):

1. **Schema Markup** - ArticleSchema, FAQSchema, BreadcrumbSchema
2. **CursorTrailDark Hero** - Animated title, subtitle, author, date
3. **Disclosure** - Affiliate disclaimer
4. **Sticky TOC** - TOCToggleGroup component
5. **Provider Cards Section** (#cards)
   - Research intro with specific data points
   - Cards with: rank badge, logo, rating, CTA, stats grid, accordions
6. **Comparison Table** (#compare-table)
7. **SEO Content** - 4 subsections:
   - "How [Topic] Works" with info-box
   - "How to Choose" with decision table + warning-box
   - "Best by Category" - 6 category cards
   - "Methodology" - weighted ranking factors table
8. **FAQ Section** (#faq) - 8-10 questions
9. **Related Pages** - 3 related guides
10. **Author Box** - Real team member with credentials

### 5. RESEARCH INTRO FORMAT:
"After analyzing [X] data points across [Y] [products]—including [metric1], [metric2], [metric3]—we've identified the [Z] [products] that deliver the highest real-world value. Our team [credibility statement with specific numbers]."

### 6. BOTTOM LINE FORMAT (for each provider):
- Start with confident recommendation
- Include specific value calculations  
- Compare to alternatives
- End with who should/shouldn't choose this

### 7. PROS FORMAT (4 items each):
- Lead with specific benefit + quantified value
- Good: "5.00% APY on balances up to $5,000"
- Bad: "High interest rate"

### 8. CONS FORMAT (2-3 items each):
- Be honest but fair
- Good: "Requires $1,000 monthly direct deposit for top rate"
- Bad: "Has requirements"

### 9. STYLING - Use category-appropriate colors:
- Credit Cards: Blue (#0066B2 → #004C8C)
- Insurance: Blue (#0D2C4B → #1a4a7a)  
- Finance/Savings: Green (#059669 → #047857)
- Home: Slate (#334155 → #1e293b)

### 10. LOGOS:
Use Clearbit API: `https://logo.clearbit.com/[company-domain].com`

### 11. FAQs - Target "People Also Ask":
- 8-10 questions minimum
- Each answer 50+ words
- Use <strong> for emphasis
- Answer comprehensively

### 12. WORD COUNT:
- Total article: 4,000-5,000 words
- Research intro: 50-75 words
- Provider description: 30-50 words
- Bottom line: 75-100 words
- FAQ answers: 50-75 words each
- SEO content sections: 200-400 words each

## OUTPUT:
Provide the COMPLETE .astro file ready to save, including:
- Full frontmatter with all imports
- Complete data arrays  
- Full HTML structure
- All <style> blocks (copy from travel cards template)
- Client-side <script> for animations

## AFTER GENERATION, RUN THESE COMMANDS:

1. **Verify Logos Load:**
   npm run dev → check /blog/best-[topic]

2. **Generate Hero Image (if needed):**
   node scripts/generate-insurance-hero.js "[topic]"

3. **Optimize Images:**
   npm run optimize:images

4. **Update Progress:**
   Edit scripts/article-progress.csv
```

---

## 🎯 QUICK CATEGORY TEMPLATES

### For Insurance Articles:
```
Metrics: monthlyAvg, rating, amBest (A++, A+, A, etc.)
Stats Grid: Monthly Cost, AM Best Rating, Deductible, Claims Rating
Color Theme: Blue (#0D2C4B)
```

### For Finance/Savings Articles:
```
Metrics: apy, monthlyFee, minBalance, fdic
Stats Grid: APY, Monthly Fee, Min Balance, FDIC Insured
Color Theme: Green (#059669)
```

### For Credit Card Articles:
```
Metrics: annualFee, bonus, bonusValue, rewardsRate, foreignFee
Stats Grid: Annual Fee, Welcome Bonus, Rewards Rate, Foreign Fees
Color Theme: Blue (#0066B2)
```

### For Home/Services Articles:
```
Metrics: monthlyAvg, serviceFee, rating, coverage
Stats Grid: Monthly Cost, Service Fee, Coverage, Rating
Color Theme: Slate (#334155)
```

---

## 📋 PRE-FLIGHT CHECKLIST

Before starting, verify:
- [ ] Target keyword identified
- [ ] Competitor articles analyzed (check top 3 Google results)
- [ ] Number of providers decided (8-15)
- [ ] Category type confirmed
- [ ] Author assigned (Sarah Chen, Emily Johnson, Jessica Martinez, etc.)

---

## ✅ POST-GENERATION CHECKLIST

After receiving the article:
- [ ] All provider data complete (no placeholders)
- [ ] Editor's Choice on #1 pick only
- [ ] Logos use Clearbit URLs correctly
- [ ] Stats grid shows 4 relevant metrics
- [ ] All 10 sections present
- [ ] 8-10 FAQs included
- [ ] Color theme matches category
- [ ] Author box uses real team member
- [ ] Internal links to related pages

---

## 🔧 SCREAMING EAGLE WORKFLOW (After Generation)

```
□ Step 1: Save article file
□ Step 2: Check logos load (npm run dev)
□ Step 3: Visual verification (screenshot test)
□ Step 4: Add hero image (Freepik or Gemini)
□ Step 5: Optimize images (Imagify)
□ Step 6: Internal linking (3-in, 3-out)
□ Step 7: Final SEO check
□ Step 8: Update progress CSV
```

---

## 📁 FILE LOCATIONS

| Type | Location |
|------|----------|
| Article | `src/pages/blog/best-[topic].astro` |
| Hero Image | `/public/blog-images/best-[topic].jpg` |
| Logos | `/public/[category]-logos/` or Clearbit URL |
| Progress | `scripts/article-progress.csv` |

---

## 👥 TEAM AUTHORS

| Name | Specialization | Image |
|------|---------------|-------|
| Sarah Chen | Credit Cards, Travel | /team/sarah-chen.jpg |
| Emily Johnson | Insurance | /team/emily-johnson.jpg |
| Jessica Martinez | Banking, Savings | /team/jessica-martinez.jpg |
| Michael Rodriguez | Credit Card Analysis | /team/michael-rodriguez.jpg |
| David Kim | Home Insurance | /team/david-kim.jpg |
| James Wilson | Travel | /team/james-wilson.jpg |

---

*Use this prompt every time you generate a comparison article for consistent, high-quality results.*
