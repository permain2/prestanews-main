import Anthropic from '@anthropic-ai/sdk';
import slugify from 'slugify';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

/**
 * SEO-Optimized Article Generator for Screened/PrestaNews
 * 
 * Workflow:
 * 1. Analyze SERP data (from Apify)
 * 2. Generate content brief
 * 3. Create SEO-optimized article
 * 4. Output with proper schema markup
 * 
 * Usage:
 *   node scripts/seo-article-generator.js "best small business insurance"
 *   node scripts/seo-article-generator.js --batch keywords.json
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  // Claude model
  model: "claude-sonnet-4-20250514",
  
  // Content settings
  targetWordCount: 2500, // Aim for 2500+ words to beat competitors
  minWordCount: 2000,
  maxWordCount: 4000,
  
  // SEO settings
  keywordDensity: { min: 0.5, max: 2.5 }, // Percentage
  minHeadings: 6,
  minFAQs: 5,
  
  // Output
  outputDir: 'src/content/blog',
};

// ═══════════════════════════════════════════════════════════════════════════
// VOCABULARY SYSTEM (from your PROJECT-DOCS)
// ═══════════════════════════════════════════════════════════════════════════

const VOCABULARY = {
  // Insurance terms
  insurance: {
    use: ['coverage options', 'policy benefits', 'premium costs', 'deductible amounts', 
          'claim process', 'underwriting', 'risk assessment', 'coverage limits'],
    avoid: ['cheap insurance', 'free quotes', 'best deal'],
  },
  
  // Finance terms  
  finance: {
    use: ['annual percentage rate (APR)', 'compound interest', 'credit utilization',
          'debt-to-income ratio', 'amortization', 'refinancing options'],
    avoid: ['get rich quick', 'guaranteed returns', 'no risk'],
  },
  
  // Credit cards
  creditCards: {
    use: ['welcome bonus', 'annual fee', 'earning rate', 'redemption value',
          'transfer partners', 'lounge access', 'elite status', 'points valuation'],
    avoid: ['sign-up offer', 'yearly cost', 'how much you get back'],
  },
  
  // General
  general: {
    use: ['comprehensive analysis', 'in-depth review', 'expert recommendation',
          'data-driven insights', 'comparative analysis'],
    avoid: ['best ever', 'amazing deal', 'you won\'t believe'],
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY DETECTION
// ═══════════════════════════════════════════════════════════════════════════

const CATEGORY_KEYWORDS = {
  insurance: ['insurance', 'coverage', 'policy', 'premium', 'deductible', 'claim'],
  finance: ['loan', 'mortgage', 'refinance', 'savings', 'banking', 'ira', 'annuity', 'credit'],
  home: ['home warranty', 'home security', 'gutter', 'window replacement', 'moving'],
  tech: ['vpn', 'antivirus', 'password manager', 'software', 'ai'],
  lifestyle: ['meal delivery', 'pet', 'electric bike', 'mattress', 'cold plunge'],
};

function detectCategory(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  for (const [category, terms] of Object.entries(CATEGORY_KEYWORDS)) {
    if (terms.some(term => lowerKeyword.includes(term))) {
      return category;
    }
  }
  return 'general';
}

// ═══════════════════════════════════════════════════════════════════════════
// API SETUP
// ═══════════════════════════════════════════════════════════════════════════

const anthropicKey = process.env.ANTHROPIC_API_KEY;
if (!anthropicKey) {
  console.error('❌ Error: ANTHROPIC_API_KEY not set in .env file');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: anthropicKey });

// ═══════════════════════════════════════════════════════════════════════════
// STEP 1: SERP DATA ANALYSIS
// ═══════════════════════════════════════════════════════════════════════════

async function analyzeSerpData(serpResults) {
  /**
   * Analyzes SERP data from Apify Google Search Scraper
   * Returns structured insights about competing content
   */
  
  if (!serpResults || serpResults.length === 0) {
    return null;
  }

  const analysis = {
    avgWordCount: 0,
    commonHeadings: [],
    topicsCovered: [],
    questionsAnswered: [],
    contentGaps: [],
  };

  // Extract patterns from top results
  const titles = serpResults.map(r => r.title).filter(Boolean);
  const descriptions = serpResults.map(r => r.description).filter(Boolean);

  return {
    titles,
    descriptions,
    totalResults: serpResults.length,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// STEP 2: CONTENT BRIEF GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function generateContentBrief(keyword, serpData = null) {
  console.log(`📋 Generating content brief for: "${keyword}"...`);
  
  const category = detectCategory(keyword);
  const vocab = VOCABULARY[category] || VOCABULARY.general;

  const briefPrompt = `You are an SEO content strategist. Analyze this keyword and create a comprehensive content brief.

KEYWORD: "${keyword}"
CATEGORY: ${category}

${serpData ? `
COMPETITOR ANALYSIS (Top Google Results):
${serpData.titles?.map((t, i) => `${i+1}. ${t}`).join('\n') || 'No data'}
` : ''}

Create a detailed content brief with:

1. SEARCH INTENT:
   - What is the user looking for?
   - Are they comparing, buying, or learning?
   - What stage of the buyer journey?

2. RECOMMENDED TITLE (60 chars max):
   - Include primary keyword
   - Add power word or year
   - Make it click-worthy but accurate

3. META DESCRIPTION (155 chars max):
   - Include keyword naturally
   - Add a call-to-action
   - Mention a key benefit

4. REQUIRED H2 HEADINGS (6-10):
   - Include keyword variations
   - Cover all aspects users search for
   - Add comparison/vs sections if relevant

5. PEOPLE ALSO ASK (5-8 questions):
   - Questions users commonly ask
   - Long-tail keyword opportunities

6. SEMANTIC KEYWORDS (15-20):
   - Related terms to include naturally
   - LSI keywords for topic authority

7. CONTENT REQUIREMENTS:
   - Minimum word count: ${CONFIG.targetWordCount}
   - Key points to cover
   - Data/statistics to include
   - Expert insights needed

8. INTERNAL LINKING OPPORTUNITIES:
   - Related topics on the site
   - Supporting articles to create

Output as JSON format.`;

  const response = await anthropic.messages.create({
    model: CONFIG.model,
    max_tokens: 2000,
    temperature: 0.3,
    messages: [{ role: "user", content: briefPrompt }]
  });

  try {
    // Extract JSON from response
    const text = response.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.log('⚠️ Could not parse brief as JSON, using raw response');
  }

  return { raw: response.content[0].text };
}

// ═══════════════════════════════════════════════════════════════════════════
// STEP 3: SEO-OPTIMIZED ARTICLE GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function generateSEOArticle(keyword, brief) {
  console.log(`✍️ Generating SEO-optimized article...`);

  const category = detectCategory(keyword);
  const vocab = VOCABULARY[category] || VOCABULARY.general;
  const today = new Date().toISOString().split('T')[0];

  const systemPrompt = `You are an expert content writer for Screened.com, a premium consumer comparison and review website.

YOUR EXPERTISE:
- ${category === 'insurance' ? 'Insurance industry expert with 15+ years experience' : ''}
- ${category === 'finance' ? 'Certified Financial Planner with deep knowledge of consumer finance' : ''}
- ${category === 'home' ? 'Home improvement expert and consumer advocate' : ''}
- ${category === 'tech' ? 'Technology analyst specializing in consumer software' : ''}
- ${category === 'lifestyle' ? 'Consumer products researcher and reviewer' : ''}

WRITING GUIDELINES:
1. AUTHORITY: Write with expert confidence. Use specific data, percentages, and facts.
2. E-E-A-T: Demonstrate Experience, Expertise, Authoritativeness, and Trust.
3. READABILITY: Grade 8 reading level. Short paragraphs (2-3 sentences max).
4. STRUCTURE: Clear hierarchy with H2s and H3s. Scannable content.
5. VALUE: Every section must provide actionable value.

VOCABULARY TO USE:
${vocab.use.map(w => `• ${w}`).join('\n')}

AVOID THESE PHRASES:
${vocab.avoid.map(w => `• ${w}`).join('\n')}

SEO REQUIREMENTS:
- Primary keyword in first 100 words
- Keyword in at least 2 H2 headings
- Natural keyword density (1-2%)
- Include semantic variations
- Answer "People Also Ask" questions

OUTPUT FORMAT:
Return ONLY the Markdown file starting with --- frontmatter. No code blocks or explanations.`;

  const userPrompt = `Write a comprehensive, SEO-optimized article for this content brief:

PRIMARY KEYWORD: "${keyword}"

CONTENT BRIEF:
${JSON.stringify(brief, null, 2)}

ARTICLE REQUIREMENTS:
1. Word count: ${CONFIG.targetWordCount}-${CONFIG.maxWordCount} words
2. Include FAQ section with schema-ready Q&A format
3. Add a "Key Takeaways" or "Quick Summary" box at the top
4. Include comparison table if relevant
5. End with clear call-to-action

FRONTMATTER TEMPLATE:
---
title: "[SEO Title - 60 chars max]"
description: "[Meta description - 155 chars max]"
pubDate: ${today}
updatedDate: ${today}
heroImage: "/blog-images/${slugify(keyword, { lower: true, strict: true })}.jpg"
author: "Screened Editorial Team"
category: "${category}"
tags: ["${category}", "${keyword.split(' ')[0]}"]
schema:
  type: "Article"
  faqPage: true
---

Write the complete article now.`;

  const response = await anthropic.messages.create({
    model: CONFIG.model,
    max_tokens: 8000,
    temperature: 0.7,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }]
  });

  return response.content[0].text;
}

// ═══════════════════════════════════════════════════════════════════════════
// STEP 4: SEO SCORING
// ═══════════════════════════════════════════════════════════════════════════

function scoreSEO(content, keyword) {
  const scores = {
    wordCount: 0,
    keywordInTitle: 0,
    keywordInFirstParagraph: 0,
    keywordDensity: 0,
    headingStructure: 0,
    hasFAQ: 0,
    hasMetaDescription: 0,
    total: 0,
  };

  // Word count (max 25 points)
  const words = content.split(/\s+/).length;
  if (words >= CONFIG.targetWordCount) scores.wordCount = 25;
  else if (words >= CONFIG.minWordCount) scores.wordCount = 20;
  else if (words >= 1500) scores.wordCount = 15;
  else scores.wordCount = 10;

  // Keyword in title (15 points)
  const titleMatch = content.match(/title:\s*["'](.+?)["']/i);
  if (titleMatch && titleMatch[1].toLowerCase().includes(keyword.toLowerCase())) {
    scores.keywordInTitle = 15;
  }

  // Keyword in first paragraph (10 points)
  const contentBody = content.split('---')[2] || '';
  const firstParagraph = contentBody.substring(0, 500).toLowerCase();
  if (firstParagraph.includes(keyword.toLowerCase())) {
    scores.keywordInFirstParagraph = 10;
  }

  // Keyword density (15 points)
  const keywordCount = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
  const density = (keywordCount / words) * 100;
  if (density >= CONFIG.keywordDensity.min && density <= CONFIG.keywordDensity.max) {
    scores.keywordDensity = 15;
  } else if (density > 0) {
    scores.keywordDensity = 8;
  }

  // Heading structure (15 points)
  const h2Count = (content.match(/^##\s/gm) || []).length;
  const h3Count = (content.match(/^###\s/gm) || []).length;
  if (h2Count >= 5 && h3Count >= 3) scores.headingStructure = 15;
  else if (h2Count >= 3) scores.headingStructure = 10;
  else scores.headingStructure = 5;

  // FAQ section (10 points)
  if (content.toLowerCase().includes('## faq') || content.toLowerCase().includes('## frequently asked')) {
    scores.hasFAQ = 10;
  }

  // Meta description (10 points)
  const descMatch = content.match(/description:\s*["'](.+?)["']/i);
  if (descMatch && descMatch[1].length >= 100 && descMatch[1].length <= 160) {
    scores.hasMetaDescription = 10;
  } else if (descMatch) {
    scores.hasMetaDescription = 5;
  }

  scores.total = Object.values(scores).reduce((a, b) => a + b, 0) - scores.total;

  return {
    scores,
    wordCount: words,
    keywordDensity: density.toFixed(2) + '%',
    headings: { h2: h2Count, h3: h3Count },
    grade: scores.total >= 80 ? 'A' : scores.total >= 60 ? 'B' : scores.total >= 40 ? 'C' : 'D',
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN WORKFLOW
// ═══════════════════════════════════════════════════════════════════════════

async function generateArticleForKeyword(keyword, serpData = null) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`🎯 TARGET KEYWORD: "${keyword}"`);
  console.log(`${'═'.repeat(60)}\n`);

  try {
    // Step 1: Analyze SERP data (if available)
    const serpAnalysis = serpData ? await analyzeSerpData(serpData) : null;

    // Step 2: Generate content brief
    const brief = await generateContentBrief(keyword, serpAnalysis);
    console.log('✅ Content brief generated');

    // Step 3: Generate SEO article
    const article = await generateSEOArticle(keyword, brief);
    console.log('✅ Article generated');

    // Step 4: Score SEO
    const seoScore = scoreSEO(article, keyword);
    console.log(`\n📊 SEO SCORE: ${seoScore.scores.total}/100 (Grade: ${seoScore.grade})`);
    console.log(`   Word Count: ${seoScore.wordCount}`);
    console.log(`   Keyword Density: ${seoScore.keywordDensity}`);
    console.log(`   Headings: ${seoScore.headings.h2} H2s, ${seoScore.headings.h3} H3s`);

    // Save article
    const slug = slugify(keyword, { lower: true, strict: true });
    const outputPath = path.join(process.cwd(), CONFIG.outputDir, `${slug}.md`);
    
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, article, 'utf-8');
    
    console.log(`\n✅ Article saved: ${outputPath}`);

    // Save brief for reference
    const briefPath = path.join(process.cwd(), 'content-briefs', `${slug}-brief.json`);
    await fs.mkdir(path.dirname(briefPath), { recursive: true });
    await fs.writeFile(briefPath, JSON.stringify({ keyword, brief, seoScore }, null, 2));
    
    return { success: true, slug, seoScore };

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CLI INTERFACE
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║        SEO Article Generator for Screened.com                  ║
╠═══════════════════════════════════════════════════════════════╣
║ Usage:                                                         ║
║   Single keyword:                                              ║
║   node scripts/seo-article-generator.js "best pet insurance"   ║
║                                                                ║
║   Batch from file:                                             ║
║   node scripts/seo-article-generator.js --batch keywords.json  ║
║                                                                ║
║   With SERP data:                                              ║
║   node scripts/seo-article-generator.js --serp serp-data.json  ║
╚═══════════════════════════════════════════════════════════════╝
    `);
    process.exit(0);
  }

  // Batch mode
  if (args[0] === '--batch') {
    const batchFile = args[1];
    if (!batchFile) {
      console.error('❌ Please provide a batch file path');
      process.exit(1);
    }

    const keywords = JSON.parse(await fs.readFile(batchFile, 'utf-8'));
    console.log(`📦 Batch mode: ${keywords.length} keywords\n`);

    const results = [];
    for (const kw of keywords) {
      const keyword = typeof kw === 'string' ? kw : kw.keyword;
      const result = await generateArticleForKeyword(keyword);
      results.push({ keyword, ...result });
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Summary
    console.log(`\n${'═'.repeat(60)}`);
    console.log('📊 BATCH SUMMARY');
    console.log(`${'═'.repeat(60)}`);
    const success = results.filter(r => r.success).length;
    console.log(`✅ Success: ${success}/${results.length}`);
    results.forEach(r => {
      const status = r.success ? `✅ Grade ${r.seoScore?.grade}` : '❌ Failed';
      console.log(`   ${status} - ${r.keyword}`);
    });

  } else {
    // Single keyword mode
    const keyword = args.join(' ');
    await generateArticleForKeyword(keyword);
  }
}

main().catch(console.error);

