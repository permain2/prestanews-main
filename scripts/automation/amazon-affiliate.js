/**
 * Amazon Affiliate Link Generator
 * 
 * Generates Amazon affiliate links with your Associate tag.
 * Searches for products and creates tagged URLs.
 * 
 * Note: This uses web scraping for product search since Amazon's
 * Product Advertising API requires approval. For production, consider
 * using the official API.
 * 
 * Usage:
 *   import { AmazonAffiliate } from './amazon-affiliate.js';
 *   const affiliate = new AmazonAffiliate('your-tag');
 *   const link = await affiliate.generateLink('SteelSeries Arctis Nova Pro');
 */

import { ApifyClient } from 'apify-client';
import 'dotenv/config';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  associateTag: process.env.AMAZON_ASSOCIATE_TAG || 'screened0e-20',
  apifyToken: process.env.APIFY_API_TOKEN,
  amazonDomain: 'amazon.com',
  // Common ASIN patterns by category
  categoryPrefixes: {
    tech: 'B0',
    electronics: 'B0',
    home: 'B0',
    lifestyle: 'B0'
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// AMAZON AFFILIATE CLASS
// ═══════════════════════════════════════════════════════════════════════════

export class AmazonAffiliate {
  constructor(associateTag = null) {
    this.tag = associateTag || CONFIG.associateTag;
    
    if (CONFIG.apifyToken) {
      this.client = new ApifyClient({ token: CONFIG.apifyToken });
    }
    
    // Local cache to avoid duplicate searches
    this.cache = new Map();
  }

  /**
   * Generate affiliate link for a product
   */
  async generateLink(productName, options = {}) {
    console.log(`🔗 Generating affiliate link for: ${productName}`);

    // Check cache first
    const cacheKey = productName.toLowerCase();
    if (this.cache.has(cacheKey)) {
      console.log('   📦 Using cached result');
      return this.cache.get(cacheKey);
    }

    try {
      // Try to find ASIN through search
      const searchResult = await this._searchAmazon(productName, options);
      
      if (searchResult && searchResult.asin) {
        const link = this._buildAffiliateLink(searchResult.asin);
        const result = {
          productName,
          asin: searchResult.asin,
          affiliateLink: link,
          amazonTitle: searchResult.title,
          price: searchResult.price,
          rating: searchResult.rating,
          imageUrl: searchResult.imageUrl
        };
        
        this.cache.set(cacheKey, result);
        console.log(`   ✅ Found: ${searchResult.asin}`);
        return result;
      }

      // Fallback: Generate search link
      console.log('   ⚠️  No exact match, using search link');
      const searchLink = this._buildSearchLink(productName);
      const result = {
        productName,
        asin: null,
        affiliateLink: searchLink,
        isSearchLink: true
      };
      
      this.cache.set(cacheKey, result);
      return result;

    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
      // Return search link as fallback
      return {
        productName,
        asin: null,
        affiliateLink: this._buildSearchLink(productName),
        isSearchLink: true,
        error: error.message
      };
    }
  }

  /**
   * Generate affiliate links for multiple products
   */
  async generateLinksForProducts(products) {
    console.log(`\n🔗 Generating affiliate links for ${products.length} products...`);
    console.log('─'.repeat(50));

    const results = [];
    
    for (const product of products) {
      const result = await this.generateLink(product.name, {
        category: product.category
      });
      
      results.push({
        ...product,
        asin: result.asin,
        affiliateLink: result.affiliateLink,
        amazonPrice: result.price,
        amazonRating: result.rating,
        amazonImageUrl: result.imageUrl,
        isSearchLink: result.isSearchLink
      });

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    const withAsin = results.filter(r => r.asin).length;
    console.log(`\n✅ Generated ${results.length} links (${withAsin} with direct ASIN)`);
    
    return results;
  }

  /**
   * Search Amazon for a product
   */
  async _searchAmazon(productName, options = {}) {
    // If Apify is configured, use web scraping
    if (this.client) {
      return this._searchWithApify(productName);
    }
    
    // Otherwise, try to extract ASIN from known patterns or return null
    return this._tryExtractAsin(productName);
  }

  /**
   * Search Amazon using Apify's RAG Web Browser
   */
  async _searchWithApify(productName) {
    try {
      const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(productName)}`;
      
      const run = await this.client.actor('apify/rag-web-browser').call({
        query: searchUrl,
        maxResults: 1,
        outputFormats: ['markdown']
      }, {
        timeout: 60000
      });

      const { items } = await this.client.dataset(run.defaultDatasetId).listItems();
      
      if (items && items.length > 0) {
        const content = items[0].markdown || items[0].text || '';
        
        // Extract ASIN from Amazon URL pattern
        const asinMatch = content.match(/\/dp\/([A-Z0-9]{10})/);
        const titleMatch = content.match(/\[([^\]]+)\]\(https:\/\/www\.amazon\.com\/dp\//);
        const priceMatch = content.match(/\$[\d,]+\.?\d*/);
        const ratingMatch = content.match(/(\d\.?\d?)\s*out of 5/);
        
        if (asinMatch) {
          return {
            asin: asinMatch[1],
            title: titleMatch ? titleMatch[1] : productName,
            price: priceMatch ? priceMatch[0] : null,
            rating: ratingMatch ? parseFloat(ratingMatch[1]) : null
          };
        }
      }
      
      return null;
    } catch (error) {
      console.warn(`   ⚠️  Apify search failed: ${error.message}`);
      return null;
    }
  }

  /**
   * Try to extract ASIN from product name or known database
   */
  _tryExtractAsin(productName) {
    // Common product ASINs (you can expand this database)
    const knownProducts = {
      // Gaming Headsets
      'steelseries arctis nova pro': { asin: 'B09ZWMZ4W9', price: '$349.99' },
      'logitech g pro x 2': { asin: 'B0C9MFSSS6', price: '$229.99' },
      'hyperx cloud iii': { asin: 'B0CBQKZSLL', price: '$99.99' },
      'razer blackshark v2 pro': { asin: 'B0B77GFZBW', price: '$179.99' },
      'corsair virtuoso rgb': { asin: 'B08YDKZ2HY', price: '$179.99' },
      'sony inzone h9': { asin: 'B0B4P8H68N', price: '$299.99' },
      'astro a50': { asin: 'B08HMJY3FX', price: '$299.99' },
      
      // VPNs (software, link to guide pages)
      'nordvpn': { asin: null, affiliateLink: 'https://nordvpn.com' },
      'expressvpn': { asin: null, affiliateLink: 'https://expressvpn.com' },
      'surfshark': { asin: null, affiliateLink: 'https://surfshark.com' },
      
      // Mattresses
      'purple mattress': { asin: 'B08YRXZXFM', price: '$1,399.00' },
      'casper original': { asin: 'B0BPZ4KWTP', price: '$1,095.00' },
      'saatva classic': { asin: null, affiliateLink: 'https://saatva.com' },
      
      // Office Chairs
      'herman miller aeron': { asin: 'B01N0ZU5RY', price: '$1,395.00' },
      'secretlab titan': { asin: 'B0B8YDJD7F', price: '$519.00' },
      'steelcase leap': { asin: 'B006H1QYBA', price: '$1,189.00' }
    };

    const searchKey = productName.toLowerCase();
    
    for (const [name, data] of Object.entries(knownProducts)) {
      if (searchKey.includes(name) || name.includes(searchKey)) {
        return {
          asin: data.asin,
          price: data.price,
          title: productName,
          affiliateLink: data.affiliateLink // For non-Amazon products
        };
      }
    }

    return null;
  }

  /**
   * Build affiliate link from ASIN
   */
  _buildAffiliateLink(asin) {
    return `https://www.${CONFIG.amazonDomain}/dp/${asin}?tag=${this.tag}`;
  }

  /**
   * Build search affiliate link
   */
  _buildSearchLink(productName) {
    const searchQuery = encodeURIComponent(productName);
    return `https://www.${CONFIG.amazonDomain}/s?k=${searchQuery}&tag=${this.tag}`;
  }

  /**
   * Build link for non-Amazon products (redirects/comparison)
   */
  buildComparisonLink(category) {
    const categorySearches = {
      vpn: 'vpn+subscription',
      insurance: 'insurance+guide+book',
      finance: 'personal+finance+guide'
    };
    
    const search = categorySearches[category] || category;
    return `https://www.${CONFIG.amazonDomain}/s?k=${search}&tag=${this.tag}`;
  }

  /**
   * Validate an ASIN format
   */
  isValidAsin(asin) {
    return /^[A-Z0-9]{10}$/.test(asin);
  }

  /**
   * Get statistics
   */
  getStats() {
    const cached = Array.from(this.cache.values());
    return {
      totalCached: cached.length,
      withDirectAsin: cached.filter(r => r.asin).length,
      withSearchLink: cached.filter(r => r.isSearchLink).length
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// BULK OPERATIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Process products from article data and add affiliate links
 */
export async function addAffiliateLinksToProducts(products, associateTag = null) {
  const affiliate = new AmazonAffiliate(associateTag);
  return affiliate.generateLinksForProducts(products);
}

/**
 * Update article data with affiliate links
 */
export async function enrichArticleWithAffiliateLinks(articleData, associateTag = null) {
  const affiliate = new AmazonAffiliate(associateTag);
  const productsWithLinks = await affiliate.generateLinksForProducts(articleData.products);
  
  return {
    ...articleData,
    products: productsWithLinks
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// CLI INTERFACE
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║              Amazon Affiliate Link Generator                   ║
╠═══════════════════════════════════════════════════════════════╣
║ Usage:                                                         ║
║   node amazon-affiliate.js "Product Name"                      ║
║   node amazon-affiliate.js --batch products.json               ║
║                                                                ║
║ Environment:                                                   ║
║   AMAZON_ASSOCIATE_TAG=your-tag-20                             ║
║   APIFY_API_TOKEN=xxx (optional, for live search)              ║
╚═══════════════════════════════════════════════════════════════╝
    `);
    return;
  }

  const affiliate = new AmazonAffiliate();

  if (args[0] === '--batch') {
    // Process batch from JSON file
    const fs = await import('fs/promises');
    const products = JSON.parse(await fs.readFile(args[1], 'utf-8'));
    const results = await affiliate.generateLinksForProducts(products);
    
    console.log('\n📊 Results:');
    results.forEach(r => {
      console.log(`   ${r.name}: ${r.asin || 'search link'}`);
    });
  } else {
    // Single product
    const productName = args.join(' ');
    const result = await affiliate.generateLink(productName);
    
    console.log('\n📊 Result:');
    console.log(`   Product: ${result.productName}`);
    console.log(`   ASIN: ${result.asin || 'N/A'}`);
    console.log(`   Link: ${result.affiliateLink}`);
    if (result.price) console.log(`   Price: ${result.price}`);
  }
}

// Run if called directly
if (process.argv[1] && process.argv[1].includes('amazon-affiliate')) {
  main().catch(console.error);
}

export default AmazonAffiliate;

