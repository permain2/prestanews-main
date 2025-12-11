# Comparison Page Design Guide

> Creating premium, Apple-quality comparison pages

## Overview

This guide documents the standards for creating beautiful, high-converting comparison pages on Screened. Our goal is to deliver a **$100K page experience** - clean, fast, elegant, and restrained.

---

## Design Philosophy

### 1. **Restraint is Sophistication**
- No emojis in UI elements
- No gradient backgrounds on cards
- No colorful badges or labels
- Monochromatic palette (black, white, gray)
- Color only for interactive elements (links, buttons)

### 2. **Motion is Subtle**
- Animations should be almost invisible
- Short durations (0.2-0.4s max)
- Minimal stagger delays (0.05s between items)
- Avoid bouncy/springy effects - keep it smooth

### 3. **Typography is Hierarchy**
- Let font weight and size do the work
- Avoid uppercase text (except small labels)
- Generous line height (1.6-1.8)
- Tight letter spacing for headings

### 4. **Density Over Decoration**
- Pack information tightly
- Remove visual separators where possible
- Let content breathe, not ornaments

---

## Page Structure

```
┌──────────────────────────────────────┐
│              HERO                    │
│  - Full-width image with overlay     │
│  - Title, subtitle                   │
│  - Author & date (subtle)            │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│           DISCLOSURE                 │
│  - Single line, muted                │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│        PROVIDER SHOWCASE             │
│  - One-line summary                  │
│  - Minimal sort toggle               │
│  - Clean provider cards              │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│          CONTENT SECTION             │
│  - Key takeaways (subtle)            │
│  - Clean formatted content           │
│  - Tables with dark headers          │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│              FAQ                     │
│  - Simple accordion                  │
│  - No numbers, just + / -            │
└──────────────────────────────────────┘
```

---

## Components Reference

### ComparisonShowcase.tsx
The main container for provider cards with filtering.

```tsx
<ComparisonShowcase 
  providers={providers}    // Array of Provider objects
  showFilters={true}       // Show sort/filter pills
  client:load              // Load immediately
/>
```

### ComparisonProviderCard.tsx
Individual provider card with animations.

**Provider Interface:**
```typescript
interface Provider {
  name: string;           // "American Home Shield"
  logo: string;           // "/insurance-logos-small/ahs.png"
  bestFor: string;        // "Overall Coverage"
  monthlyAvg: string;     // "$49-$59"
  serviceFee?: string;    // "$125"
  rating: number;         // 4.7 (out of 5)
  amBest?: string;        // "A+" (optional rating badge)
  pros: string[];         // ["Pro 1", "Pro 2", ...]
  cons: string[];         // ["Con 1", "Con 2", ...]
  description: string;    // One paragraph description
  affiliateUrl?: string;  // CTA link
}
```

### AnimatedFAQ.tsx
Elegant accordion for frequently asked questions.

```tsx
<AnimatedFAQ faqs={faqs} client:visible />
```

**FAQ Interface:**
```typescript
interface FAQ {
  question: string;
  answer: string;
}
```

### PremiumContentSection.tsx
Wrapper for rich SEO content with premium formatting.

```tsx
<PremiumContentSection client:visible>
  <!-- Your content here -->
</PremiumContentSection>
```

---

## Content Formatting

### Key Takeaways Box
Always start your content with key takeaways:

```html
<div class="key-takeaways">
  <h3>📋 Key Takeaways</h3>
  <ul>
    <li><strong>Top Pick:</strong> Description here</li>
    <li><strong>Budget Choice:</strong> Description here</li>
    <!-- 3-5 items max -->
  </ul>
</div>
```

### Info Box (Blue)
For tips, additional information:

```html
<div class="info-box">
  <h4>💡 Pro Tip</h4>
  <p>Your helpful tip or additional context here.</p>
</div>
```

### Success Box (Green)
For wins, recommendations:

```html
<div class="success-box">
  <h4>✅ Why [Provider] Wins</h4>
  <ul>
    <li>Reason one</li>
    <li>Reason two</li>
  </ul>
</div>
```

### Warning Box (Yellow)
For cautions, red flags:

```html
<div class="warning-box">
  <h4>⚠️ Red Flags to Watch For</h4>
  <ul>
    <li>Warning one</li>
    <li>Warning two</li>
  </ul>
</div>
```

### Premium Tables
Tables automatically get premium styling:

```html
<table>
  <thead>
    <tr>
      <th>Provider</th>
      <th>Monthly</th>
      <th>Annual Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Provider Name</strong></td>
      <td>$35</td>
      <td>$420</td>
    </tr>
  </tbody>
</table>
```

---

## Animation Guidelines

### Keep it Subtle
Apple animations are almost invisible - you feel them more than see them.

### Smooth Easing
```typescript
const smoothEase = [0.25, 0.46, 0.45, 0.94];
```

### Short Durations
```typescript
transition={{
  duration: 0.4,      // Max 0.4s for most animations
  delay: index * 0.05, // Minimal stagger
  ease: smoothEase,
}}
```

### Hover States
Barely perceptible shadow change:

```typescript
animate={{
  boxShadow: isHovered
    ? "0 8px 30px rgba(0, 0, 0, 0.08)"
    : "0 1px 3px rgba(0, 0, 0, 0.04)",
}}
```

### What NOT to Do
- ❌ Bouncy spring animations
- ❌ Large scale transforms (1.1x+)
- ❌ Long delays (>0.1s between items)
- ❌ Multiple animated properties
- ❌ Rotation effects
- ❌ Shine/shimmer effects

---

## Color Palette

### Monochromatic Base
```css
--black: #0f172a;        /* Headings, buttons, emphasis */
--dark-gray: #64748b;    /* Secondary text, labels */
--light-gray: #94a3b8;   /* Muted text, dividers */
--background: #f8fafc;   /* Page background */
--white: #ffffff;        /* Cards */
```

### Accent (Use Sparingly)
```css
--link: #0f172a;         /* Links - just make them bold */
--link-hover: #3b82f6;   /* Hover state only */
```

### Rules
- Pros/cons use the same gray tones, not green/red
- Stars use black fills, not yellow
- No gradient backgrounds
- No colored badges

---

## Typography

### Fonts
- **Sora** - Hero titles, section headings
- **Lexend** - Card titles, labels, numbers
- **System/Poppins** - Body text

### Scale
```css
h1: clamp(2rem, 5vw, 3rem)     /* Hero */
h2: 1.875rem                    /* Section */
h3: 1.375rem                    /* Subsection */
h4: 1.125rem                    /* Card title */
body: 1.0625rem                 /* Content */
small: 0.875rem                 /* Meta, labels */
```

---

## Creating a New Comparison Page

### Step 1: Prepare Data

Create your provider array with all required fields:

```typescript
const providers = [
  {
    name: "Provider Name",
    logo: "/insurance-logos-small/provider.png",
    bestFor: "Specific Use Case",
    monthlyAvg: "$XX-$XX",
    serviceFee: "$XX",
    rating: 4.5,
    pros: ["Pro 1", "Pro 2", "Pro 3", "Pro 4"],
    cons: ["Con 1", "Con 2"],
    description: "One compelling paragraph about this provider.",
    affiliateUrl: "https://..."
  },
  // ... more providers (recommend 8-12)
];
```

### Step 2: Create FAQ Array

```typescript
const faqs = [
  {
    question: "Common question about this topic?",
    answer: "Clear, helpful answer that provides real value."
  },
  // ... 6-10 FAQs recommended
];
```

### Step 3: Use the Layout

```astro
---
import ComparisonLayout from '../../layouts/ComparisonLayout.astro';

const providers = [...];
const faqs = [...];
---

<ComparisonLayout
  title="Best [Category] Companies 2024: Top 10 Ranked"
  description="Short description for SEO and hero."
  category="category-slug"
  categoryLabel="CATEGORY LABEL"
  heroImage="/insurance-heroes/category.jpeg"
  author="Screened Editorial Team"
  date="Dec. 11, 2025"
  providers={providers}
  faqs={faqs}
>
  <!-- Your SEO content goes here -->
  <div class="key-takeaways">
    ...
  </div>
  
  <h2>How We Ranked...</h2>
  <p>...</p>
  
  <!-- Continue with rich content -->
</ComparisonLayout>
```

---

## Performance Checklist

- [ ] Hero image is optimized (WebP, <200KB)
- [ ] Logo images are small (<50KB each)
- [ ] Components use `client:visible` where possible
- [ ] No layout shift on load
- [ ] Core Web Vitals passing

## Accessibility Checklist

- [ ] All images have alt text
- [ ] Color contrast ≥4.5:1
- [ ] Interactive elements have focus states
- [ ] FAQ accordions are keyboard navigable
- [ ] Semantic HTML throughout

## SEO Checklist

- [ ] Unique, compelling title
- [ ] Meta description <160 characters
- [ ] H1 matches title
- [ ] H2s create logical structure
- [ ] Internal links to related content
- [ ] Schema markup (if applicable)

---

## Example Implementation

See the home warranty page for a complete reference:
- **Page:** `src/pages/blog/best-home-warranty-companies.astro`
- **Layout:** `src/layouts/ComparisonLayout.astro`

---

## Support

Questions about implementation? Check:
1. This guide
2. Existing comparison pages
3. Component source files in `src/components/`

---

*Last updated: December 11, 2025*
