/**
 * Airtable Sync Module
 * 
 * Handles all CRUD operations for the article generation pipeline.
 * Tables: Keywords, Products, Articles
 * 
 * Usage:
 *   import { AirtableSync } from './airtable-sync.js';
 *   const db = new AirtableSync();
 *   await db.getNextKeyword();
 */

import Airtable from 'airtable';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  apiKey: process.env.AIRTABLE_API_KEY,
  baseId: process.env.AIRTABLE_BASE_ID,
  tables: {
    keywords: 'Keywords',
    products: 'Products',
    articles: 'Articles'
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// AIRTABLE SYNC CLASS
// ═══════════════════════════════════════════════════════════════════════════

export class AirtableSync {
  constructor() {
    if (!CONFIG.apiKey || !CONFIG.baseId) {
      console.warn('⚠️  Airtable credentials not configured. Using local JSON fallback.');
      this.useLocalFallback = true;
      this.localDataPath = path.join(__dirname, 'data');
    } else {
      this.useLocalFallback = false;
      Airtable.configure({ apiKey: CONFIG.apiKey });
      this.base = Airtable.base(CONFIG.baseId);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // KEYWORDS TABLE OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Get the next keyword in queue (status = 'pending', sorted by priority)
   */
  async getNextKeyword() {
    if (this.useLocalFallback) {
      return this._getNextKeywordLocal();
    }

    try {
      const records = await this.base(CONFIG.tables.keywords)
        .select({
          filterByFormula: "{status} = 'pending'",
          sort: [{ field: 'priority', direction: 'asc' }],
          maxRecords: 1
        })
        .firstPage();

      if (records.length === 0) {
        console.log('📭 No pending keywords in queue');
        return null;
      }

      const record = records[0];
      return {
        id: record.id,
        keyword: record.get('keyword'),
        category: record.get('category'),
        priority: record.get('priority'),
        searchVolume: record.get('search_volume'),
        difficulty: record.get('difficulty')
      };
    } catch (error) {
      console.error('❌ Error fetching keyword:', error.message);
      throw error;
    }
  }

  /**
   * Get multiple pending keywords
   */
  async getPendingKeywords(limit = 10) {
    if (this.useLocalFallback) {
      return this._getPendingKeywordsLocal(limit);
    }

    try {
      const records = await this.base(CONFIG.tables.keywords)
        .select({
          filterByFormula: "{status} = 'pending'",
          sort: [{ field: 'priority', direction: 'asc' }],
          maxRecords: limit
        })
        .firstPage();

      return records.map(record => ({
        id: record.id,
        keyword: record.get('keyword'),
        category: record.get('category'),
        priority: record.get('priority'),
        searchVolume: record.get('search_volume'),
        difficulty: record.get('difficulty')
      }));
    } catch (error) {
      console.error('❌ Error fetching keywords:', error.message);
      throw error;
    }
  }

  /**
   * Update keyword status
   */
  async updateKeywordStatus(keywordId, status, additionalFields = {}) {
    if (this.useLocalFallback) {
      return this._updateKeywordStatusLocal(keywordId, status, additionalFields);
    }

    try {
      const fields = { status, ...additionalFields };
      
      if (status === 'researching') {
        fields.assigned_date = new Date().toISOString().split('T')[0];
      }
      
      if (status === 'published') {
        fields.published_date = new Date().toISOString().split('T')[0];
      }

      await this.base(CONFIG.tables.keywords).update(keywordId, fields);
      console.log(`✅ Updated keyword ${keywordId} to status: ${status}`);
    } catch (error) {
      console.error('❌ Error updating keyword:', error.message);
      throw error;
    }
  }

  /**
   * Store SERP research data for a keyword
   */
  async storeSerpData(keywordId, serpData) {
    if (this.useLocalFallback) {
      return this._storeSerpDataLocal(keywordId, serpData);
    }

    try {
      await this.base(CONFIG.tables.keywords).update(keywordId, {
        serp_data: JSON.stringify(serpData),
        status: 'writing'
      });
      console.log(`✅ Stored SERP data for keyword ${keywordId}`);
    } catch (error) {
      console.error('❌ Error storing SERP data:', error.message);
      throw error;
    }
  }

  /**
   * Import keywords from JSON file
   */
  async importKeywords(keywords) {
    if (this.useLocalFallback) {
      return this._importKeywordsLocal(keywords);
    }

    console.log(`📥 Importing ${keywords.length} keywords...`);
    
    // Airtable batch limit is 10 records
    const batches = [];
    for (let i = 0; i < keywords.length; i += 10) {
      batches.push(keywords.slice(i, i + 10));
    }

    let imported = 0;
    for (const batch of batches) {
      try {
        const records = batch.map(kw => ({
          fields: {
            keyword: kw.keyword,
            category: kw.category,
            priority: kw.priority || 5,
            status: 'pending',
            search_volume: kw.search_volume || 0,
            difficulty: kw.difficulty || 50
          }
        }));

        await this.base(CONFIG.tables.keywords).create(records);
        imported += batch.length;
        console.log(`   Imported ${imported}/${keywords.length}...`);
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error('❌ Error importing batch:', error.message);
      }
    }

    console.log(`✅ Successfully imported ${imported} keywords`);
    return imported;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCTS TABLE OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Create products for a keyword
   */
  async createProducts(keywordId, products) {
    if (this.useLocalFallback) {
      return this._createProductsLocal(keywordId, products);
    }

    console.log(`📦 Creating ${products.length} products...`);

    const batches = [];
    for (let i = 0; i < products.length; i += 10) {
      batches.push(products.slice(i, i + 10));
    }

    const createdIds = [];
    for (const batch of batches) {
      try {
        const records = batch.map((product, idx) => ({
          fields: {
            product_name: product.name,
            keyword: [keywordId],
            amazon_asin: product.asin || '',
            affiliate_link: product.affiliateLink || '',
            price: product.price || 0,
            rating: product.rating || 0,
            review_count: product.reviewCount || 0,
            position: product.position || idx + 1,
            best_for: product.bestFor || '',
            pros: JSON.stringify(product.pros || []),
            cons: JSON.stringify(product.cons || []),
            description: product.description || '',
            image_url: product.imageUrl || ''
          }
        }));

        const created = await this.base(CONFIG.tables.products).create(records);
        createdIds.push(...created.map(r => r.id));
        
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error('❌ Error creating products:', error.message);
      }
    }

    console.log(`✅ Created ${createdIds.length} products`);
    return createdIds;
  }

  /**
   * Get products for a keyword
   */
  async getProductsForKeyword(keywordId) {
    if (this.useLocalFallback) {
      return this._getProductsForKeywordLocal(keywordId);
    }

    try {
      const records = await this.base(CONFIG.tables.products)
        .select({
          filterByFormula: `FIND("${keywordId}", ARRAYJOIN({keyword}))`,
          sort: [{ field: 'position', direction: 'asc' }]
        })
        .firstPage();

      return records.map(record => ({
        id: record.id,
        name: record.get('product_name'),
        asin: record.get('amazon_asin'),
        affiliateLink: record.get('affiliate_link'),
        price: record.get('price'),
        rating: record.get('rating'),
        reviewCount: record.get('review_count'),
        position: record.get('position'),
        bestFor: record.get('best_for'),
        pros: JSON.parse(record.get('pros') || '[]'),
        cons: JSON.parse(record.get('cons') || '[]'),
        description: record.get('description'),
        imageUrl: record.get('image_url')
      }));
    } catch (error) {
      console.error('❌ Error fetching products:', error.message);
      throw error;
    }
  }

  /**
   * Update product with affiliate link
   */
  async updateProductAffiliateLink(productId, asin, affiliateLink) {
    if (this.useLocalFallback) {
      return this._updateProductAffiliateLinkLocal(productId, asin, affiliateLink);
    }

    try {
      await this.base(CONFIG.tables.products).update(productId, {
        amazon_asin: asin,
        affiliate_link: affiliateLink
      });
      console.log(`✅ Updated affiliate link for product ${productId}`);
    } catch (error) {
      console.error('❌ Error updating affiliate link:', error.message);
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICLES TABLE OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Create article record
   */
  async createArticle(keywordId, articleData) {
    if (this.useLocalFallback) {
      return this._createArticleLocal(keywordId, articleData);
    }

    try {
      const record = await this.base(CONFIG.tables.articles).create({
        title: articleData.title,
        keyword: [keywordId],
        slug: articleData.slug,
        file_path: articleData.filePath,
        word_count: articleData.wordCount,
        seo_score: articleData.seoScore || 0,
        qa_status: 'pending',
        published: false,
        created_at: new Date().toISOString().split('T')[0],
        content_brief: JSON.stringify(articleData.contentBrief || {})
      });

      console.log(`✅ Created article record: ${record.id}`);
      return record.id;
    } catch (error) {
      console.error('❌ Error creating article:', error.message);
      throw error;
    }
  }

  /**
   * Update article QA status
   */
  async updateArticleQA(articleId, qaStatus, qaNotes = '', seoScore = null) {
    if (this.useLocalFallback) {
      return this._updateArticleQALocal(articleId, qaStatus, qaNotes, seoScore);
    }

    try {
      const fields = {
        qa_status: qaStatus,
        qa_notes: qaNotes,
        updated_at: new Date().toISOString().split('T')[0]
      };

      if (seoScore !== null) {
        fields.seo_score = seoScore;
      }

      await this.base(CONFIG.tables.articles).update(articleId, fields);
      console.log(`✅ Updated article ${articleId} QA status: ${qaStatus}`);
    } catch (error) {
      console.error('❌ Error updating article QA:', error.message);
      throw error;
    }
  }

  /**
   * Mark article as published
   */
  async publishArticle(articleId, articleUrl) {
    if (this.useLocalFallback) {
      return this._publishArticleLocal(articleId, articleUrl);
    }

    try {
      await this.base(CONFIG.tables.articles).update(articleId, {
        published: true,
        updated_at: new Date().toISOString().split('T')[0]
      });

      // Also update the keyword with the article URL
      const article = await this.base(CONFIG.tables.articles).find(articleId);
      const keywordIds = article.get('keyword');
      
      if (keywordIds && keywordIds.length > 0) {
        await this.base(CONFIG.tables.keywords).update(keywordIds[0], {
          status: 'published',
          article_url: articleUrl,
          published_date: new Date().toISOString().split('T')[0]
        });
      }

      console.log(`✅ Published article ${articleId}`);
    } catch (error) {
      console.error('❌ Error publishing article:', error.message);
      throw error;
    }
  }

  /**
   * Get articles pending QA review
   */
  async getArticlesPendingQA() {
    if (this.useLocalFallback) {
      return this._getArticlesPendingQALocal();
    }

    try {
      const records = await this.base(CONFIG.tables.articles)
        .select({
          filterByFormula: "{qa_status} = 'pending'",
          sort: [{ field: 'created_at', direction: 'asc' }]
        })
        .firstPage();

      return records.map(record => ({
        id: record.id,
        title: record.get('title'),
        slug: record.get('slug'),
        filePath: record.get('file_path'),
        wordCount: record.get('word_count'),
        seoScore: record.get('seo_score'),
        createdAt: record.get('created_at')
      }));
    } catch (error) {
      console.error('❌ Error fetching articles:', error.message);
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LOCAL FALLBACK METHODS (for development/testing without Airtable)
  // ─────────────────────────────────────────────────────────────────────────

  async _ensureLocalDataDir() {
    await fs.mkdir(this.localDataPath, { recursive: true });
  }

  async _loadLocalData(table) {
    await this._ensureLocalDataDir();
    const filePath = path.join(this.localDataPath, `${table}.json`);
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return { records: [] };
    }
  }

  async _saveLocalData(table, data) {
    await this._ensureLocalDataDir();
    const filePath = path.join(this.localDataPath, `${table}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  async _getNextKeywordLocal() {
    const data = await this._loadLocalData('keywords');
    const pending = data.records
      .filter(r => r.status === 'pending')
      .sort((a, b) => (a.priority || 5) - (b.priority || 5));
    
    return pending.length > 0 ? pending[0] : null;
  }

  async _getPendingKeywordsLocal(limit) {
    const data = await this._loadLocalData('keywords');
    return data.records
      .filter(r => r.status === 'pending')
      .sort((a, b) => (a.priority || 5) - (b.priority || 5))
      .slice(0, limit);
  }

  async _updateKeywordStatusLocal(keywordId, status, additionalFields) {
    const data = await this._loadLocalData('keywords');
    const record = data.records.find(r => r.id === keywordId);
    if (record) {
      record.status = status;
      Object.assign(record, additionalFields);
      if (status === 'researching') record.assigned_date = new Date().toISOString().split('T')[0];
      if (status === 'published') record.published_date = new Date().toISOString().split('T')[0];
      await this._saveLocalData('keywords', data);
    }
  }

  async _storeSerpDataLocal(keywordId, serpData) {
    const data = await this._loadLocalData('keywords');
    const record = data.records.find(r => r.id === keywordId);
    if (record) {
      record.serp_data = serpData;
      record.status = 'writing';
      await this._saveLocalData('keywords', data);
    }
  }

  async _importKeywordsLocal(keywords) {
    const data = await this._loadLocalData('keywords');
    const newRecords = keywords.map((kw, idx) => ({
      id: `local_${Date.now()}_${idx}`,
      keyword: kw.keyword,
      category: kw.category,
      priority: kw.priority || 5,
      status: 'pending',
      search_volume: kw.search_volume || 0,
      difficulty: kw.difficulty || 50
    }));
    data.records.push(...newRecords);
    await this._saveLocalData('keywords', data);
    return newRecords.length;
  }

  async _createProductsLocal(keywordId, products) {
    const data = await this._loadLocalData('products');
    const newRecords = products.map((product, idx) => ({
      id: `local_product_${Date.now()}_${idx}`,
      keyword_id: keywordId,
      ...product
    }));
    data.records.push(...newRecords);
    await this._saveLocalData('products', data);
    return newRecords.map(r => r.id);
  }

  async _getProductsForKeywordLocal(keywordId) {
    const data = await this._loadLocalData('products');
    return data.records
      .filter(r => r.keyword_id === keywordId)
      .sort((a, b) => (a.position || 0) - (b.position || 0));
  }

  async _updateProductAffiliateLinkLocal(productId, asin, affiliateLink) {
    const data = await this._loadLocalData('products');
    const record = data.records.find(r => r.id === productId);
    if (record) {
      record.asin = asin;
      record.affiliateLink = affiliateLink;
      await this._saveLocalData('products', data);
    }
  }

  async _createArticleLocal(keywordId, articleData) {
    const data = await this._loadLocalData('articles');
    const record = {
      id: `local_article_${Date.now()}`,
      keyword_id: keywordId,
      ...articleData,
      qa_status: 'pending',
      published: false,
      created_at: new Date().toISOString().split('T')[0]
    };
    data.records.push(record);
    await this._saveLocalData('articles', data);
    return record.id;
  }

  async _updateArticleQALocal(articleId, qaStatus, qaNotes, seoScore) {
    const data = await this._loadLocalData('articles');
    const record = data.records.find(r => r.id === articleId);
    if (record) {
      record.qa_status = qaStatus;
      record.qa_notes = qaNotes;
      if (seoScore !== null) record.seo_score = seoScore;
      record.updated_at = new Date().toISOString().split('T')[0];
      await this._saveLocalData('articles', data);
    }
  }

  async _publishArticleLocal(articleId, articleUrl) {
    const data = await this._loadLocalData('articles');
    const record = data.records.find(r => r.id === articleId);
    if (record) {
      record.published = true;
      record.updated_at = new Date().toISOString().split('T')[0];
      await this._saveLocalData('articles', data);

      // Update keyword
      const kwData = await this._loadLocalData('keywords');
      const kwRecord = kwData.records.find(r => r.id === record.keyword_id);
      if (kwRecord) {
        kwRecord.status = 'published';
        kwRecord.article_url = articleUrl;
        kwRecord.published_date = new Date().toISOString().split('T')[0];
        await this._saveLocalData('keywords', kwData);
      }
    }
  }

  async _getArticlesPendingQALocal() {
    const data = await this._loadLocalData('articles');
    return data.records
      .filter(r => r.qa_status === 'pending')
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UTILITY METHODS
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Get pipeline statistics
   */
  async getStats() {
    if (this.useLocalFallback) {
      const kwData = await this._loadLocalData('keywords');
      const articleData = await this._loadLocalData('articles');
      
      const statusCounts = {};
      kwData.records.forEach(r => {
        statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
      });

      return {
        totalKeywords: kwData.records.length,
        byStatus: statusCounts,
        totalArticles: articleData.records.length,
        publishedArticles: articleData.records.filter(r => r.published).length
      };
    }

    try {
      const keywords = await this.base(CONFIG.tables.keywords).select().all();
      const articles = await this.base(CONFIG.tables.articles).select().all();

      const statusCounts = {};
      keywords.forEach(r => {
        const status = r.get('status') || 'unknown';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });

      return {
        totalKeywords: keywords.length,
        byStatus: statusCounts,
        totalArticles: articles.length,
        publishedArticles: articles.filter(r => r.get('published')).length
      };
    } catch (error) {
      console.error('❌ Error getting stats:', error.message);
      throw error;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CLI INTERFACE
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  const db = new AirtableSync();

  if (args[0] === 'import') {
    // Import sample keywords
    const samplePath = path.join(__dirname, 'config', 'sample-keywords.json');
    const data = JSON.parse(await fs.readFile(samplePath, 'utf-8'));
    await db.importKeywords(data.keywords);
  } else if (args[0] === 'stats') {
    const stats = await db.getStats();
    console.log('\n📊 Pipeline Statistics:');
    console.log(`   Total Keywords: ${stats.totalKeywords}`);
    console.log(`   By Status:`, stats.byStatus);
    console.log(`   Total Articles: ${stats.totalArticles}`);
    console.log(`   Published: ${stats.publishedArticles}`);
  } else if (args[0] === 'next') {
    const keyword = await db.getNextKeyword();
    if (keyword) {
      console.log('\n📋 Next keyword in queue:');
      console.log(`   Keyword: ${keyword.keyword}`);
      console.log(`   Category: ${keyword.category}`);
      console.log(`   Priority: ${keyword.priority}`);
    }
  } else {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║              Airtable Sync CLI                                 ║
╠═══════════════════════════════════════════════════════════════╣
║ Commands:                                                      ║
║   node airtable-sync.js import   - Import sample keywords      ║
║   node airtable-sync.js stats    - Show pipeline statistics    ║
║   node airtable-sync.js next     - Show next keyword in queue  ║
╚═══════════════════════════════════════════════════════════════╝
    `);
  }
}

// Run if called directly
if (process.argv[1] && process.argv[1].includes('airtable-sync')) {
  main().catch(console.error);
}

export default AirtableSync;

