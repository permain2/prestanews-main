/**
 * SERP Research Module
 * 
 * Uses Apify to scrape Google search results and competitor content
 * to extract product information for review articles.
 * 
 * Features:
 * - Google SERP scraping
 * - Competitor page content extraction
 * - Product identification and ranking
 * - Data structuring for article generation
 * 
 * Usage:
 *   import { SerpResearch } from './serp-research.js';
 *   const research = new SerpResearch();
 *   const data = await research.research('best gaming headsets');
 */

import { ApifyClient } from 'apify-client';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  apifyToken: process.env.APIFY_API_TOKEN,
  googleSearchActorId: 'apify/google-search-scraper',
  webBrowserActorId: 'apify/rag-web-browser',
  maxCompetitorPages: 5,
  maxProductsToExtract: 10,
  timeout: 120000 // 2 minutes
};

// ═══════════════════════════════════════════════════════════════════════════
// SERP RESEARCH CLASS
// ═══════════════════════════════════════════════════════════════════════════

export class SerpResearch {
  constructor() {
    if (!CONFIG.apifyToken) {
      console.warn('⚠️  APIFY_API_TOKEN not configured. Using mock data.');
      this.useMockData = true;
    } else {
      this.useMockData = false;
      this.client = new ApifyClient({ token: CONFIG.apifyToken });
    }
  }

  /**
   * Main research method - orchestrates SERP scraping and content extraction
   */
  async research(keyword) {
    console.log(`\n🔍 Researching: "${keyword}"`);
    console.log('─'.repeat(50));

    if (this.useMockData) {
      return this._getMockResearchData(keyword);
    }

    try {
      // Step 1: Get Google SERP results
      console.log('📊 Step 1: Fetching Google SERP results...');
      const serpResults = await this._searchGoogle(keyword);
      console.log(`   Found ${serpResults.length} organic results`);

      // Step 2: Extract competitor URLs (review sites)
      console.log('🔗 Step 2: Identifying competitor review pages...');
      const competitorUrls = this._extractCompetitorUrls(serpResults);
      console.log(`   Found ${competitorUrls.length} competitor review pages`);

      // Step 3: Scrape competitor content
      console.log('📄 Step 3: Scraping competitor content...');
      const competitorContent = await this._scrapeCompetitorPages(competitorUrls);
      console.log(`   Extracted content from ${competitorContent.length} pages`);

      // Step 4: Extract products from content
      console.log('📦 Step 4: Extracting products...');
      const products = this._extractProducts(competitorContent, keyword);
      console.log(`   Found ${products.length} unique products`);

      // Step 5: Compile research data
      const researchData = {
        keyword,
        searchedAt: new Date().toISOString(),
        serpResults: serpResults.slice(0, 10),
        competitors: competitorContent.map(c => ({
          url: c.url,
          title: c.title,
          domain: new URL(c.url).hostname
        })),
        products,
        peopleAlsoAsk: serpResults.find(r => r.peopleAlsoAsk)?.peopleAlsoAsk || [],
        relatedSearches: serpResults.find(r => r.relatedSearches)?.relatedSearches || []
      };

      console.log('\n✅ Research complete!');
      return researchData;

    } catch (error) {
      console.error('❌ Research failed:', error.message);
      throw error;
    }
  }

  /**
   * Search Google using Apify's Google Search Scraper
   */
  async _searchGoogle(keyword) {
    try {
      const run = await this.client.actor(CONFIG.googleSearchActorId).call({
        queries: keyword,
        maxPagesPerQuery: 1,
        resultsPerPage: 20,
        languageCode: 'en',
        countryCode: 'us',
        mobileResults: false,
        saveHtml: false,
        saveHtmlToKeyValueStore: false
      }, {
        timeout: CONFIG.timeout
      });

      const { items } = await this.client.dataset(run.defaultDatasetId).listItems();
      
      if (!items || items.length === 0) {
        console.warn('⚠️  No SERP results returned');
        return [];
      }

      // Extract organic results
      const organicResults = items[0]?.organicResults || [];
      const peopleAlsoAsk = items[0]?.peopleAlsoAsk || [];
      const relatedSearches = items[0]?.relatedSearches || [];

      return organicResults.map(result => ({
        title: result.title,
        url: result.url,
        description: result.description,
        position: result.position,
        peopleAlsoAsk,
        relatedSearches
      }));
    } catch (error) {
      console.error('❌ Google search failed:', error.message);
      return [];
    }
  }

  /**
   * Extract competitor URLs from SERP results
   * Prioritizes review sites and comparison articles
   */
  _extractCompetitorUrls(serpResults) {
    const reviewIndicators = [
      'best', 'top', 'review', 'compare', 'comparison', 'vs', 'guide',
      'rated', 'ranking', 'picks', 'recommendations'
    ];

    const trustedDomains = [
      'wirecutter.com', 'cnet.com', 'techradar.com', 'tomsguide.com',
      'pcmag.com', 'forbes.com', 'businessinsider.com', 'nerdwallet.com',
      'bankrate.com', 'investopedia.com', 'consumerreports.org',
      'goodhousekeeping.com', 'reviewed.com', 'thespruce.com'
    ];

    return serpResults
      .filter(result => {
        const titleLower = result.title.toLowerCase();
        const urlLower = result.url.toLowerCase();
        const domain = new URL(result.url).hostname;

        // Check if it's a review/comparison page
        const isReviewPage = reviewIndicators.some(indicator => 
          titleLower.includes(indicator) || urlLower.includes(indicator)
        );

        // Check if it's from a trusted domain
        const isTrustedDomain = trustedDomains.some(d => domain.includes(d));

        // Exclude product pages, forums, and social media
        const excludePatterns = [
          'amazon.com/dp/', 'amazon.com/gp/', '/product/', '/item/',
          'reddit.com', 'quora.com', 'facebook.com', 'twitter.com',
          'youtube.com/watch', 'pinterest.com'
        ];
        const isExcluded = excludePatterns.some(p => result.url.includes(p));

        return (isReviewPage || isTrustedDomain) && !isExcluded;
      })
      .slice(0, CONFIG.maxCompetitorPages)
      .map(r => r.url);
  }

  /**
   * Scrape competitor pages using Apify's RAG Web Browser
   */
  async _scrapeCompetitorPages(urls) {
    const results = [];

    for (const url of urls) {
      try {
        console.log(`   Scraping: ${new URL(url).hostname}...`);
        
        const run = await this.client.actor(CONFIG.webBrowserActorId).call({
          query: url,
          maxResults: 1,
          outputFormats: ['markdown']
        }, {
          timeout: CONFIG.timeout
        });

        const { items } = await this.client.dataset(run.defaultDatasetId).listItems();
        
        if (items && items.length > 0) {
          results.push({
            url,
            title: items[0].metadata?.title || '',
            content: items[0].markdown || items[0].text || '',
            crawledAt: new Date().toISOString()
          });
        }

        // Rate limiting between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.warn(`   ⚠️  Failed to scrape ${url}: ${error.message}`);
      }
    }

    return results;
  }

  /**
   * Extract products from competitor content
   */
  _extractProducts(competitorContent, keyword) {
    const productMap = new Map();
    const productPatterns = this._getProductPatterns(keyword);

    for (const page of competitorContent) {
      const content = page.content;
      if (!content) continue;

      // Extract product mentions using patterns
      for (const pattern of productPatterns) {
        const matches = content.match(pattern.regex);
        if (matches) {
          for (const match of matches) {
            const productName = this._cleanProductName(match);
            if (productName && productName.length > 3 && productName.length < 100) {
              if (!productMap.has(productName.toLowerCase())) {
                productMap.set(productName.toLowerCase(), {
                  name: productName,
                  mentions: 1,
                  sources: [page.url]
                });
              } else {
                const existing = productMap.get(productName.toLowerCase());
                existing.mentions++;
                if (!existing.sources.includes(page.url)) {
                  existing.sources.push(page.url);
                }
              }
            }
          }
        }
      }

      // Extract from markdown headers (## Product Name)
      const headerMatches = content.match(/^##\s+(?:\d+\.\s+)?([A-Z][^#\n]+)/gm);
      if (headerMatches) {
        for (const header of headerMatches) {
          const productName = header.replace(/^##\s+(?:\d+\.\s+)?/, '').trim();
          if (this._looksLikeProductName(productName)) {
            if (!productMap.has(productName.toLowerCase())) {
              productMap.set(productName.toLowerCase(), {
                name: productName,
                mentions: 1,
                sources: [page.url],
                isHeader: true
              });
            } else {
              const existing = productMap.get(productName.toLowerCase());
              existing.mentions++;
              existing.isHeader = true;
            }
          }
        }
      }
    }

    // Sort by mentions and header priority, then limit
    const products = Array.from(productMap.values())
      .sort((a, b) => {
        if (a.isHeader && !b.isHeader) return -1;
        if (!a.isHeader && b.isHeader) return 1;
        return b.mentions - a.mentions;
      })
      .slice(0, CONFIG.maxProductsToExtract)
      .map((product, idx) => ({
        name: product.name,
        position: idx + 1,
        mentions: product.mentions,
        sources: product.sources,
        bestFor: this._suggestBestFor(product.name, idx),
        // These will be filled in by article generator
        description: '',
        pros: [],
        cons: [],
        rating: 0,
        price: 0
      }));

    return products;
  }

  /**
   * Get regex patterns for product extraction based on keyword category
   */
  _getProductPatterns(keyword) {
    const patterns = [
      // Brand + Product patterns
      { regex: /(?:the\s+)?([A-Z][a-zA-Z0-9]+(?:\s+[A-Z]?[a-zA-Z0-9]+){1,5})\s+(?:is|was|has|offers|provides|delivers)/gi },
      // Numbered list patterns
      { regex: /(?:^|\n)\s*\d+\.\s+\*?\*?([A-Z][^.\n]{5,60}?)(?:\*?\*?\s*[-–—]|\s+\()/gm },
      // Bold product names
      { regex: /\*\*([A-Z][^*]{5,60}?)\*\*/g },
      // "Best X: Product" pattern
      { regex: /Best\s+\w+(?:\s+\w+)?:\s+([A-Z][^.\n]{5,60})/gi }
    ];

    // Add keyword-specific patterns
    if (keyword.toLowerCase().includes('headset') || keyword.toLowerCase().includes('headphone')) {
      patterns.push({ regex: /([A-Z][a-zA-Z0-9]+(?:\s+[A-Z]?[a-zA-Z0-9]+){0,3}\s+(?:Pro|Max|Elite|Gaming|Wireless|Bluetooth)[^\n,]{0,30})/g });
    }

    if (keyword.toLowerCase().includes('insurance')) {
      patterns.push({ regex: /([A-Z][a-zA-Z]+(?:\s+[A-Z]?[a-zA-Z]+){0,2})\s+(?:Insurance|Coverage|Policy)/gi });
    }

    return patterns;
  }

  /**
   * Clean extracted product name
   */
  _cleanProductName(name) {
    return name
      .replace(/^\d+\.\s*/, '')
      .replace(/\*\*/g, '')
      .replace(/^(?:the|a|an)\s+/i, '')
      .replace(/\s+[-–—]\s+.*$/, '')
      .replace(/\s*\([^)]*\)$/, '')
      .replace(/\s+$/, '')
      .trim();
  }

  /**
   * Check if a string looks like a product name
   */
  _looksLikeProductName(name) {
    if (!name || name.length < 3 || name.length > 80) return false;
    
    const excludeWords = [
      'best', 'top', 'review', 'guide', 'how to', 'what is', 'why', 'when',
      'conclusion', 'summary', 'introduction', 'overview', 'comparison',
      'faq', 'frequently asked', 'our pick', 'editor', 'bottom line',
      'pros and cons', 'verdict', 'rating', 'score', 'table of contents'
    ];
    
    const nameLower = name.toLowerCase();
    return !excludeWords.some(word => nameLower.includes(word));
  }

  /**
   * Suggest a "Best For" label based on position
   */
  _suggestBestFor(productName, position) {
    const labels = [
      'Best Overall',
      'Best Value',
      'Best Premium',
      'Best Budget',
      'Best for Beginners',
      'Best for Professionals',
      'Best Features',
      'Most Popular',
      'Editor\'s Choice',
      'Best Runner-Up'
    ];
    return labels[position] || `#${position + 1} Pick`;
  }

  /**
   * Get mock research data for testing without Apify
   */
  _getMockResearchData(keyword) {
    console.log('   ⚠️  Using mock data (Apify not configured)');
    
    const mockProducts = [
      { name: 'SteelSeries Arctis Nova Pro', bestFor: 'Best Overall' },
      { name: 'Logitech G Pro X 2', bestFor: 'Best Value' },
      { name: 'HyperX Cloud III', bestFor: 'Best Budget' },
      { name: 'Razer BlackShark V2 Pro', bestFor: 'Best Wireless' },
      { name: 'Corsair Virtuoso RGB', bestFor: 'Best Premium' },
      { name: 'Sony INZONE H9', bestFor: 'Best for PlayStation' },
      { name: 'Astro A50 Gen 4', bestFor: 'Best for Xbox' }
    ];

    return {
      keyword,
      searchedAt: new Date().toISOString(),
      serpResults: [
        { title: `Best ${keyword} 2025 - Wirecutter`, url: 'https://wirecutter.com/', position: 1 },
        { title: `Top ${keyword} Reviewed - CNET`, url: 'https://cnet.com/', position: 2 }
      ],
      competitors: [
        { url: 'https://wirecutter.com/', title: 'Wirecutter Review', domain: 'wirecutter.com' },
        { url: 'https://cnet.com/', title: 'CNET Review', domain: 'cnet.com' }
      ],
      products: mockProducts.map((p, idx) => ({
        name: p.name,
        position: idx + 1,
        mentions: 5 - idx,
        sources: ['https://wirecutter.com/', 'https://cnet.com/'],
        bestFor: p.bestFor,
        description: '',
        pros: [],
        cons: [],
        rating: 4.5 - (idx * 0.1),
        price: 150 + (idx * 25)
      })),
      peopleAlsoAsk: [
        `What is the best ${keyword.split(' ').pop()} for gaming?`,
        `Are expensive ${keyword.split(' ').pop()}s worth it?`,
        `What ${keyword.split(' ').pop()} do pros use?`
      ],
      relatedSearches: [
        `${keyword} under $100`,
        `${keyword} wireless`,
        `${keyword} with microphone`
      ]
    };
  }

  /**
   * Save research data to file for reference
   */
  async saveResearchData(keyword, data) {
    const slug = keyword.toLowerCase().replace(/\s+/g, '-');
    const outputDir = path.join(__dirname, 'research-data');
    await fs.mkdir(outputDir, { recursive: true });
    
    const filePath = path.join(outputDir, `${slug}-research.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`💾 Research data saved to: ${filePath}`);
    
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
║              SERP Research CLI                                 ║
╠═══════════════════════════════════════════════════════════════╣
║ Usage:                                                         ║
║   node serp-research.js "best gaming headsets"                 ║
║   node serp-research.js "best pet insurance" --save            ║
╚═══════════════════════════════════════════════════════════════╝
    `);
    return;
  }

  const keyword = args[0];
  const shouldSave = args.includes('--save');
  
  const research = new SerpResearch();
  const data = await research.research(keyword);
  
  console.log('\n📊 Research Summary:');
  console.log(`   Products found: ${data.products.length}`);
  console.log(`   Competitors analyzed: ${data.competitors.length}`);
  console.log(`   People Also Ask: ${data.peopleAlsoAsk.length}`);
  
  console.log('\n📦 Top Products:');
  data.products.slice(0, 5).forEach((p, i) => {
    console.log(`   ${i + 1}. ${p.name} (${p.bestFor})`);
  });

  if (shouldSave) {
    await research.saveResearchData(keyword, data);
  }
}

// Run if called directly
if (process.argv[1] && process.argv[1].includes('serp-research')) {
  main().catch(console.error);
}

export default SerpResearch;

