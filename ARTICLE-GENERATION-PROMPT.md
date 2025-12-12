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

### 10. FAQs - Target "People Also Ask":
- 8-10 questions minimum
- Each answer 50+ words
- Use <strong> for emphasis
- Answer comprehensively

### 11. WORD COUNT:
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
```

---

## 🖼️ LOGO WORKFLOW (CRITICAL - DO THIS AFTER ARTICLE GENERATION)

### STEP 1: Choose Your Logo Strategy

**Option A: Quick Start - Use Clearbit URLs (No Downloads)**
```html
<!-- In your article, use this format for logos: -->
<img src="https://logo.clearbit.com/[company-domain].com" alt="Company logo" />

<!-- Examples: -->
<img src="https://logo.clearbit.com/progressive.com" alt="Progressive logo" />
<img src="https://logo.clearbit.com/geico.com" alt="GEICO logo" />
<img src="https://logo.clearbit.com/varo.com" alt="Varo Bank logo" />
```

**Option B: Better Quality - Download & Store Locally**

### STEP 2: Create Logo Fetch Script for Your Category

Copy and customize the script template:

```bash
# Copy existing script as template
cp scripts/fetch-warranty-logos.js scripts/fetch-[category]-logos.js
```

Edit the new script - update the company array:

```javascript
// Example for RV Insurance
const companies = [
  { name: 'Progressive', domain: 'progressive.com', slug: 'progressive' },
  { name: 'Good Sam Insurance', domain: 'goodsam.com', slug: 'good-sam' },
  { name: 'National General', domain: 'nationalgeneral.com', slug: 'national-general' },
  { name: 'Foremost', domain: 'foremost.com', slug: 'foremost' },
  { name: 'Safeco', domain: 'safeco.com', slug: 'safeco' },
  { name: 'GEICO', domain: 'geico.com', slug: 'geico' },
  { name: 'Roamly', domain: 'roamly.com', slug: 'roamly' },
  { name: 'State Farm', domain: 'statefarm.com', slug: 'state-farm' },
  // Add all your providers here
];

// Update output directory
const outputDir = path.join(__dirname, '../public/rv-insurance-logos');
```

### STEP 3: Run the Logo Fetch Script

```bash
# Without Brandfetch API key (uses Clearbit + Google favicon)
node scripts/fetch-[category]-logos.js

# With Brandfetch API key (best quality)
# Add to .env: BRANDFETCH_API_KEY=your_key_here
node scripts/fetch-[category]-logos.js

# Force re-download all logos
node scripts/fetch-[category]-logos.js --force
```

### STEP 4: Check Results & Handle Failures

The script will:
1. ✅ Download logos to `/public/[category]-logos/`
2. ✅ Generate TypeScript map at `src/utils/[category]LogoMap.ts`
3. ⚠️ List any failed companies that need manual logos

For failed logos, you have 3 options:

**Option 1: Generate SVG Fallback**
```bash
# Copy and customize the SVG generator
cp scripts/generate-warranty-logos.js scripts/generate-[category]-logos.js
# Edit with your company colors, then run:
node scripts/generate-[category]-logos.js
```

**Option 2: Manual Download**
- Brandfetch.com - Search company, download logo
- Company website - Check press/media page
- Seeklogo.com - Search for company logos

**Option 3: Background Removal (if logo has white background)**
```bash
# Use Freepik API (requires FREEPIK_API_KEY in .env)
# Or use online tool: remove.bg
```

### STEP 5: Use Logos in Your Article

**Option A: Local logos (recommended)**
```javascript
// Import the auto-generated logo map
import { getRVInsuranceLogo } from '../../utils/rvInsuranceLogoMap';

// In your template
<img src={getRVInsuranceLogo(provider.slug)} alt={`${provider.name} logo`} />
```

**Option B: Clearbit URLs (quick but less reliable)**
```javascript
// In your template - build URL from domain
<img 
  src={`https://logo.clearbit.com/${provider.domain}`}
  alt={`${provider.name} logo`}
  onerror="this.onerror=null; this.src='/fallback-logo.png'"
/>
```

### STEP 6: Verify All Logos Load

```bash
npm run dev
# Visit http://localhost:4321/blog/best-[topic]
# Check every provider card - all logos should display
```

---

## 🎨 LOGO FETCH SCRIPT TEMPLATE

Create `scripts/fetch-[category]-logos.js`:

```javascript
/**
 * Fetch [CATEGORY] Company Logos
 * Run: node scripts/fetch-[category]-logos.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

try {
  const dotenv = await import('dotenv');
  dotenv.config();
} catch (e) {}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========== CUSTOMIZE THIS ARRAY ==========
const companies = [
  { name: 'Company Name', domain: 'company.com', slug: 'company-name' },
  // Add all your companies here
];

// ========== CUSTOMIZE OUTPUT DIRECTORY ==========
const outputDir = path.join(__dirname, '../public/[category]-logos');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Fetch from Clearbit (free)
function fetchClearbitLogo(domain, outputPath) {
  return new Promise((resolve, reject) => {
    const url = `https://logo.clearbit.com/${domain}?size=200&format=png`;
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      } else {
        file.close();
        fs.unlink(outputPath, () => {});
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

// Brandfetch API (best quality - requires API key)
async function fetchBrandfetchLogo(domain, outputPath) {
  const API_KEY = process.env.BRANDFETCH_API_KEY;
  if (!API_KEY) return false;
  
  try {
    const response = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });
    if (!response.ok) return false;
    
    const brandData = await response.json();
    const logos = brandData.logos || [];
    
    let logo = logos.find(l => l.type === 'logo' && l.theme === 'dark');
    if (!logo) logo = logos.find(l => l.type === 'logo');
    if (!logo) logo = logos[0];
    if (!logo?.formats) return false;
    
    let format = logo.formats.find(f => f.format === 'png' && f.background === 'transparent');
    if (!format) format = logo.formats.find(f => f.format === 'png');
    if (!format) format = logo.formats[0];
    if (!format?.src) return false;
    
    const logoResponse = await fetch(format.src);
    if (!logoResponse.ok) return false;
    
    const buffer = await logoResponse.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    return true;
  } catch (err) {
    return false;
  }
}

// Google favicon fallback
function fetchGoogleFavicon(domain, outputPath) {
  return new Promise((resolve, reject) => {
    const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      } else {
        file.close();
        fs.unlink(outputPath, () => {});
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function downloadLogos() {
  console.log('🎨 Fetching logos...\\n');
  
  let successCount = 0;
  let failCount = 0;
  const results = [];
  
  for (const company of companies) {
    const outputPath = path.join(outputDir, `${company.slug}.png`);
    console.log(`[${companies.indexOf(company) + 1}/${companies.length}] ${company.name}`);
    
    if (fs.existsSync(outputPath) && !process.argv.includes('--force')) {
      console.log('   ⏭️  Already exists\\n');
      successCount++;
      continue;
    }
    
    try {
      let downloaded = false;
      
      // Try Brandfetch first
      if (process.env.BRANDFETCH_API_KEY) {
        downloaded = await fetchBrandfetchLogo(company.domain, outputPath);
        if (downloaded) console.log('   ✅ Brandfetch\\n');
      }
      
      // Try Clearbit
      if (!downloaded) {
        downloaded = await fetchClearbitLogo(company.domain, outputPath);
        if (downloaded) console.log('   ✅ Clearbit\\n');
      }
      
      // Fallback to Google favicon
      if (!downloaded) {
        downloaded = await fetchGoogleFavicon(company.domain, outputPath);
        if (downloaded) console.log('   ✅ Google favicon\\n');
      }
      
      if (downloaded) {
        successCount++;
        results.push({ company: company.name, success: true });
      } else {
        console.log('   ❌ Failed\\n');
        failCount++;
        results.push({ company: company.name, success: false });
      }
      
      await new Promise(r => setTimeout(r, 500));
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\\n`);
      failCount++;
    }
  }
  
  console.log(`\\n📊 Summary: ${successCount} successful, ${failCount} failed`);
  console.log(`📁 Logos saved to: ${outputDir}`);
  
  // Generate TypeScript logo map
  const logoMap = {};
  companies.forEach(company => {
    const logoPath = `/[category]-logos/${company.slug}.png`;
    logoMap[company.slug] = logoPath;
    logoMap[company.name.toLowerCase()] = logoPath;
  });
  
  // ========== CUSTOMIZE MAP PATH ==========
  const mapPath = path.join(__dirname, '../src/utils/[category]LogoMap.ts');
  const mapContent = `export const logos: Record<string, string> = ${JSON.stringify(logoMap, null, 2)};

export function get[Category]Logo(nameOrSlug: string): string | null {
  return logos[nameOrSlug.toLowerCase()] || null;
}

export default logos;
`;
  
  fs.writeFileSync(mapPath, mapContent);
  console.log(`\\n📄 Logo map saved to: ${mapPath}`);
  
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    console.log('\\n⚠️  Failed (need manual logos):');
    failed.forEach(f => console.log(`   - ${f.company}`));
  }
}

downloadLogos().catch(console.error);
```

---

## 📸 HERO IMAGE WORKFLOW

### Option 1: Freepik (Recommended)
1. Go to [freepik.com](https://freepik.com)
2. Search: "[topic] hero banner" or "[topic] header"
3. Download high-res (1200x630px minimum)
4. Save to: `/public/blog-images/best-[topic].jpg`

### Option 2: Generate with Gemini AI
```bash
node scripts/generate-insurance-hero.js "[topic]"
# Example: node scripts/generate-insurance-hero.js "rv insurance"
```

### Option 3: Unsplash/Pexels
- [unsplash.com](https://unsplash.com) - Free high-quality photos
- [pexels.com](https://pexels.com) - Free stock photos

---

## 🗜️ IMAGE OPTIMIZATION (Imagify)

After adding all images, optimize them:

```bash
# Preview what will be optimized
npm run optimize:images:dry

# Optimize all images (normal compression - good for logos)
npm run optimize:images

# Aggressive compression (for photos/hero images)
npm run optimize:images:aggressive

# Specific folder only
IMAGIFY_API_KEY=your_key node scripts/optimize-images-imagify.js --folder=blog-images
```

**Target file sizes:**
- Hero images: < 200KB
- Logos: < 50KB
- In-content images: < 100KB

---

## 🎯 QUICK CATEGORY TEMPLATES

### For Insurance Articles:
```
Metrics: monthlyAvg, rating, amBest (A++, A+, A, etc.)
Stats Grid: Monthly Cost, AM Best Rating, Deductible, Claims Rating
Color Theme: Blue (#0D2C4B)
Logos: /public/insurance-logos-small/ or Clearbit
```

### For Finance/Savings Articles:
```
Metrics: apy, monthlyFee, minBalance, fdic
Stats Grid: APY, Monthly Fee, Min Balance, FDIC Insured
Color Theme: Green (#059669)
Logos: /public/company-logos/ or Clearbit
```

### For Credit Card Articles:
```
Metrics: annualFee, bonus, bonusValue, rewardsRate, foreignFee
Stats Grid: Annual Fee, Welcome Bonus, Rewards Rate, Foreign Fees
Color Theme: Blue (#0066B2)
Logos: Use cardImageMap.ts for card images
```

### For Home/Services Articles:
```
Metrics: monthlyAvg, serviceFee, rating, coverage
Stats Grid: Monthly Cost, Service Fee, Coverage, Rating
Color Theme: Slate (#334155)
Logos: /public/company-logos/ or Clearbit
```

---

## 📋 COMPLETE WORKFLOW CHECKLIST

### Phase 1: Article Generation
- [ ] Copy THE PROMPT above and fill in details
- [ ] Paste to AI and generate article
- [ ] Save as `src/pages/blog/best-[topic].astro`

### Phase 2: Logo Setup
- [ ] Create logo fetch script for your category
- [ ] Run: `node scripts/fetch-[category]-logos.js`
- [ ] Check for failed logos
- [ ] Generate SVG fallbacks or download manually
- [ ] Update article to use local logo paths

### Phase 3: Hero Image
- [ ] Download from Freepik or generate with Gemini
- [ ] Save to `/public/blog-images/best-[topic].jpg`
- [ ] Ensure 1200x630px minimum

### Phase 4: Optimization
- [ ] Run: `npm run optimize:images`
- [ ] Verify file sizes are under targets

### Phase 5: Verification
- [ ] Run: `npm run dev`
- [ ] Visit article URL
- [ ] Check all logos load
- [ ] Check hero image displays
- [ ] Test accordion expand/collapse
- [ ] Test on mobile (resize browser)

### Phase 6: Internal Linking
- [ ] Add 3 links FROM existing pages TO new article
- [ ] Verify 3 links FROM new article TO existing pages

### Phase 7: Finalize
- [ ] Update `scripts/article-progress.csv`
- [ ] Commit and push

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

## 🔑 API KEYS NEEDED (in .env file)

```bash
# Logo fetching (optional but better quality)
BRANDFETCH_API_KEY=your_key

# Image optimization
IMAGIFY_API_KEY=your_key

# Hero image generation
GEMINI_API_KEY=your_key

# Background removal (if needed)
FREEPIK_API_KEY=your_key
```

---

## 📁 FILE LOCATIONS REFERENCE

| Type | Location |
|------|----------|
| Articles | `src/pages/blog/best-[topic].astro` |
| Hero Images | `/public/blog-images/best-[topic].jpg` |
| Insurance Logos | `/public/insurance-logos-small/` |
| Company Logos | `/public/company-logos/` |
| Warranty Logos | `/public/warranty-logos/` |
| Logo Maps | `src/utils/[category]LogoMap.ts` |
| Logo Scripts | `scripts/fetch-[category]-logos.js` |
| Progress CSV | `scripts/article-progress.csv` |

---

*Use this prompt + workflow every time you generate a comparison article for consistent, high-quality results with proper logos and images.*
