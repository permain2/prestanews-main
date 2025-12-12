/**
 * Article Generator Module
 * 
 * Uses Claude to generate TPG-style review articles based on SERP research.
 * Outputs product data arrays and article content formatted for Astro pages.
 * 
 * Features:
 * - TPG writing style enforcement
 * - SEO optimization
 * - Product data enrichment
 * - FAQ generation
 * - Content brief creation
 * 
 * Usage:
 *   import { ArticleGenerator } from './article-generator.js';
 *   const generator = new ArticleGenerator();
 *   const article = await generator.generate(keyword, researchData, category);
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  model: 'claude-sonnet-4-20250514',
  maxTokens: 8000,
  temperature: 0.7
};

// Load style rules
let STYLE_RULES;
let CATEGORIES;

async function loadConfigs() {
  if (!STYLE_RULES) {
    STYLE_RULES = JSON.parse(
      await fs.readFile(path.join(__dirname, 'config', 'style-rules.json'), 'utf-8')
    );
  }
  if (!CATEGORIES) {
    CATEGORIES = JSON.parse(
      await fs.readFile(path.join(__dirname, 'config', 'categories.json'), 'utf-8')
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ARTICLE GENERATOR CLASS
// ═══════════════════════════════════════════════════════════════════════════

export class ArticleGenerator {
  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured in .env');
    }
    this.client = new Anthropic({ apiKey });
  }

  /**
   * Generate complete article data from research
   */
  async generate(keyword, researchData, category = null) {
    await loadConfigs();

    console.log(`\n✍️  Generating article for: "${keyword}"`);
    console.log('─'.repeat(50));

    // Detect category if not provided
    if (!category) {
      category = this._detectCategory(keyword);
    }
    console.log(`📁 Category: ${category}`);

    const categoryConfig = CATEGORIES.categories[category] || CATEGORIES.categories.lifestyle;

    try {
      // Step 1: Generate content brief
      console.log('📋 Step 1: Creating content brief...');
      const contentBrief = await this._generateContentBrief(keyword, researchData, categoryConfig);

      // Step 2: Enrich product data
      console.log('📦 Step 2: Enriching product data...');
      const enrichedProducts = await this._enrichProducts(
        keyword, 
        researchData.products, 
        categoryConfig,
        contentBrief
      );

      // Step 3: Generate FAQs
      console.log('❓ Step 3: Generating FAQs...');
      const faqs = await this._generateFAQs(keyword, researchData, categoryConfig);

      // Step 4: Generate SEO content sections
      console.log('📝 Step 4: Generating SEO content...');
      const seoContent = await this._generateSEOContent(keyword, categoryConfig, contentBrief);

      // Compile final article data
      const articleData = {
        keyword,
        category,
        categoryConfig,
        title: contentBrief.title,
        metaDescription: contentBrief.metaDescription,
        slug: this._generateSlug(keyword),
        products: enrichedProducts,
        faqs,
        seoContent,
        contentBrief,
        researchData: {
          competitors: researchData.competitors,
          peopleAlsoAsk: researchData.peopleAlsoAsk,
          relatedSearches: researchData.relatedSearches
        },
        generatedAt: new Date().toISOString()
      };

      // Calculate word count estimate
      articleData.estimatedWordCount = this._estimateWordCount(articleData);

      console.log(`\n✅ Article generation complete!`);
      console.log(`   Products: ${enrichedProducts.length}`);
      console.log(`   FAQs: ${faqs.length}`);
      console.log(`   Est. Word Count: ${articleData.estimatedWordCount}`);

      return articleData;

    } catch (error) {
      console.error('❌ Article generation failed:', error.message);
      throw error;
    }
  }

  /**
   * Generate content brief
   */
  async _generateContentBrief(keyword, researchData, categoryConfig) {
    const prompt = `You are an SEO content strategist creating a content brief for a review article.

KEYWORD: "${keyword}"
CATEGORY: ${categoryConfig.name}
TOP COMPETITORS: ${researchData.competitors.map(c => c.domain).join(', ')}
PRODUCTS FOUND: ${researchData.products.slice(0, 7).map(p => p.name).join(', ')}
PEOPLE ALSO ASK: ${researchData.peopleAlsoAsk?.slice(0, 5).join('; ') || 'N/A'}

Create a content brief with:

1. TITLE (60 chars max): Include keyword, current month/year, number of items
2. META_DESCRIPTION (155 chars max): Include keyword, value prop, CTA
3. INTRO_HOOK: Data-driven opening statement (e.g., "After analyzing X data points...")
4. KEY_ANGLES: 3-4 unique angles to differentiate from competitors
5. TARGET_AUDIENCE: Who is this for?
6. SEARCH_INTENT: What does the searcher want to accomplish?

Return as JSON:
{
  "title": "...",
  "metaDescription": "...",
  "introHook": "...",
  "keyAngles": ["...", "..."],
  "targetAudience": "...",
  "searchIntent": "..."
}`;

    const response = await this._callClaude(prompt, 0.3);
    return this._parseJSON(response);
  }

  /**
   * Enrich product data with descriptions, pros/cons
   */
  async _enrichProducts(keyword, products, categoryConfig, contentBrief) {
    const systemPrompt = this._buildTPGSystemPrompt(categoryConfig);
    
    const prompt = `${systemPrompt}

TASK: Enrich the following products with detailed information for a "${keyword}" review article.

PRODUCTS TO ENRICH:
${products.slice(0, 7).map((p, i) => `${i + 1}. ${p.name} (${p.bestFor})`).join('\n')}

CATEGORY STATS TO INCLUDE: ${categoryConfig.statsGrid.join(', ')}

For EACH product, provide:

1. name: Full product name
2. slug: URL-friendly slug
3. bestFor: Category label (e.g., "Best Overall", "Best Value")
4. description: 2-3 sentence TPG-style description highlighting key value
5. bottomLine: 3-4 sentence detailed recommendation (TPG style)
6. pros: Array of 4 specific pros (complete sentences with numbers)
7. cons: Array of 2-3 honest cons (specific tradeoffs)
8. rating: 4.0-5.0 based on value proposition
9. ${categoryConfig.statsGrid[0].toLowerCase().replace(/\s/g, '')}: Realistic value
10. ${categoryConfig.statsGrid[1].toLowerCase().replace(/\s/g, '')}: Realistic value
11. ${categoryConfig.statsGrid[2].toLowerCase().replace(/\s/g, '')}: Realistic value
12. ${categoryConfig.statsGrid[3].toLowerCase().replace(/\s/g, '')}: Realistic value
13. details: Array of 8-10 key features/benefits

Mark the first product as editorChoice: true

Return as JSON array of product objects.`;

    const response = await this._callClaude(prompt, CONFIG.temperature);
    const enrichedProducts = this._parseJSON(response);

    // Ensure we have an array
    if (!Array.isArray(enrichedProducts)) {
      throw new Error('Product enrichment did not return an array');
    }

    return enrichedProducts.map((product, idx) => ({
      ...product,
      position: idx + 1,
      affiliateLink: '', // Will be filled by amazon-affiliate.js
      asin: ''
    }));
  }

  /**
   * Generate FAQ section
   */
  async _generateFAQs(keyword, researchData, categoryConfig) {
    const prompt = `Generate 10 FAQs for a "${keyword}" review article.

PEOPLE ALSO ASK (from Google):
${researchData.peopleAlsoAsk?.slice(0, 8).join('\n') || 'N/A'}

RELATED SEARCHES:
${researchData.relatedSearches?.slice(0, 5).join('\n') || 'N/A'}

Requirements:
- Include the People Also Ask questions (rephrased if needed)
- Add 3-4 additional common questions about ${categoryConfig.name}
- Answers should be 50-100 words
- Use <strong> for emphasis on key points
- Be specific with numbers and facts
- TPG voice: confident, expert friend

Return as JSON array:
[
  { "question": "...", "answer": "..." },
  ...
]`;

    const response = await this._callClaude(prompt, 0.5);
    return this._parseJSON(response);
  }

  /**
   * Generate SEO content sections
   */
  async _generateSEOContent(keyword, categoryConfig, contentBrief) {
    const systemPrompt = this._buildTPGSystemPrompt(categoryConfig);

    const prompt = `${systemPrompt}

TASK: Write the SEO content sections for a "${keyword}" review article.

CONTENT BRIEF:
- Title: ${contentBrief.title}
- Target Audience: ${contentBrief.targetAudience}
- Key Angles: ${contentBrief.keyAngles?.join(', ')}

Generate these sections:

1. INTRO (50-75 words):
Start with: "${contentBrief.introHook || 'After analyzing...'}"
Include keyword in first sentence.
End with what readers will learn.

2. HOW_IT_WORKS (200-300 words):
Explain the basics of ${categoryConfig.name} for newcomers.
Include an "info box" insight.
Use bullet points for key concepts.

3. HOW_TO_CHOOSE (250-350 words):
Decision factors as a comparison table concept.
Include a "warning box" with common mistakes.
5-6 key questions to consider.

4. BEST_BY_CATEGORY (6 categories):
Each with: categoryName, winnerName, shortReason (1-2 sentences)
Categories should match ${categoryConfig.name} use cases.

5. METHODOLOGY (150-200 words):
Weighted factors table (should total 100%)
What was evaluated
Include "Last updated: [current date]"

Return as JSON:
{
  "intro": "...",
  "howItWorks": { "content": "...", "infoBox": { "title": "...", "content": "..." } },
  "howToChoose": { "content": "...", "warningBox": { "title": "...", "content": "..." }, "factors": [...] },
  "bestByCategory": [ { "category": "...", "winner": "...", "reason": "..." }, ... ],
  "methodology": { "content": "...", "factors": [ { "name": "...", "weight": "...", "description": "..." } ] }
}`;

    const response = await this._callClaude(prompt, CONFIG.temperature);
    return this._parseJSON(response);
  }

  /**
   * Build TPG system prompt
   */
  _buildTPGSystemPrompt(categoryConfig) {
    const style = STYLE_RULES.tpgStyle;
    
    return `You are a senior writer for Screened.com, writing in ThePointsGuy.com's exact editorial style.

VOICE & TONE:
- ${style.voice.authority}
- ${style.voice.perspective}
- ${style.voice.readerAddress}
- ${style.voice.confidence}

VOCABULARY RULES:
ALWAYS USE: ${style.vocabulary.mustUse.join(', ')}
NEVER USE: ${style.vocabulary.neverUse.join(', ')}

SENTENCE PATTERNS:
Openers: ${style.sentencePatterns.openers.slice(0, 3).join(' | ')}
Value statements: ${style.sentencePatterns.valueStatements.slice(0, 4).join(' | ')}

FORMATTING:
- Max ${style.formatting.maxParagraphSentences} sentences per paragraph
- Average ${style.formatting.avgSentenceWords} words per sentence
- Use dashes — not parentheses for asides
- Always include specific numbers

CATEGORY: ${categoryConfig.name}
AUTHOR: ${categoryConfig.defaultAuthor}

BANNED PHRASES: ${STYLE_RULES.bannedPhrases.slice(0, 10).join(', ')}`;
  }

  /**
   * Call Claude API
   */
  async _callClaude(prompt, temperature = CONFIG.temperature) {
    const response = await this.client.messages.create({
      model: CONFIG.model,
      max_tokens: CONFIG.maxTokens,
      temperature,
      messages: [{ role: 'user', content: prompt }]
    });

    return response.content[0].text;
  }

  /**
   * Parse JSON from Claude response
   */
  _parseJSON(text) {
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        // Try to fix common JSON issues
        let fixed = jsonMatch[0]
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']')
          .replace(/'/g, '"');
        return JSON.parse(fixed);
      }
    }
    throw new Error('Could not parse JSON from response');
  }

  /**
   * Detect category from keyword
   */
  _detectCategory(keyword) {
    const lk = keyword.toLowerCase();
    for (const [cat, config] of Object.entries(CATEGORIES.categories)) {
      if (config.keywords.some(k => lk.includes(k))) {
        return cat;
      }
    }
    return 'lifestyle';
  }

  /**
   * Generate URL slug
   */
  _generateSlug(keyword) {
    return keyword
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Estimate word count
   */
  _estimateWordCount(articleData) {
    let count = 0;
    
    // Intro ~75 words
    count += 75;
    
    // Products (each ~150 words)
    count += articleData.products.length * 150;
    
    // SEO content ~800 words
    count += 800;
    
    // FAQs (~75 words each)
    count += articleData.faqs.length * 75;
    
    // Methodology ~200 words
    count += 200;
    
    return count;
  }

  /**
   * Save article data to file
   */
  async saveArticleData(articleData) {
    const outputDir = path.join(__dirname, 'article-data');
    await fs.mkdir(outputDir, { recursive: true });
    
    const filePath = path.join(outputDir, `${articleData.slug}-data.json`);
    await fs.writeFile(filePath, JSON.stringify(articleData, null, 2));
    console.log(`💾 Article data saved to: ${filePath}`);
    
    return filePath;
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
║              Article Generator CLI                             ║
╠═══════════════════════════════════════════════════════════════╣
║ Usage:                                                         ║
║   node article-generator.js "best gaming headsets"             ║
║   node article-generator.js --from-research research-file.json ║
╚═══════════════════════════════════════════════════════════════╝
    `);
    return;
  }

  const generator = new ArticleGenerator();

  if (args[0] === '--from-research') {
    // Load research data from file
    const researchPath = args[1];
    const researchData = JSON.parse(await fs.readFile(researchPath, 'utf-8'));
    const articleData = await generator.generate(researchData.keyword, researchData);
    await generator.saveArticleData(articleData);
  } else {
    // Quick test with mock research data
    const keyword = args[0];
    const mockResearch = {
      keyword,
      competitors: [{ domain: 'wirecutter.com' }, { domain: 'cnet.com' }],
      products: [
        { name: 'Product Alpha', bestFor: 'Best Overall' },
        { name: 'Product Beta', bestFor: 'Best Value' },
        { name: 'Product Gamma', bestFor: 'Best Budget' },
        { name: 'Product Delta', bestFor: 'Best Premium' },
        { name: 'Product Epsilon', bestFor: 'Best Features' }
      ],
      peopleAlsoAsk: [
        `What is the best ${keyword}?`,
        `Are expensive ${keyword} worth it?`,
        `How to choose ${keyword}?`
      ],
      relatedSearches: [`${keyword} 2025`, `${keyword} reviews`]
    };
    
    const articleData = await generator.generate(keyword, mockResearch);
    await generator.saveArticleData(articleData);
  }
}

// Run if called directly
if (process.argv[1] && process.argv[1].includes('article-generator')) {
  main().catch(console.error);
}

export default ArticleGenerator;

