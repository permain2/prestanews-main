#!/usr/bin/env node

/**
 * Article Generation Pipeline Orchestrator
 * 
 * Master CLI that orchestrates the full article generation pipeline:
 * 1. Fetch keyword from database
 * 2. Research SERP and competitors
 * 3. Generate article content
 * 4. Create affiliate links
 * 5. Publish Astro page
 * 6. QA review
 * 7. Update database
 * 
 * Usage:
 *   node run-pipeline.js "best gaming headsets"              # Single keyword
 *   node run-pipeline.js --batch --limit 5                   # Batch from database
 *   node run-pipeline.js --keyword "best vpn" --no-publish   # Generate without publishing
 */

import { AirtableSync } from './airtable-sync.js';
import { SerpResearch } from './serp-research.js';
import { ArticleGenerator } from './article-generator.js';
import { AmazonAffiliate, enrichArticleWithAffiliateLinks } from './amazon-affiliate.js';
import { PagePublisher } from './page-publisher.js';
import { QAAgent } from './qa-agent.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  maxRetries: 2,
  retryDelay: 5000,
  qaPassThreshold: 70,
  autoPublish: true,
  saveIntermediateData: true,
  logLevel: 'info' // 'debug', 'info', 'warn', 'error'
};

// ═══════════════════════════════════════════════════════════════════════════
// PIPELINE CLASS
// ═══════════════════════════════════════════════════════════════════════════

class ArticlePipeline {
  constructor(options = {}) {
    this.options = { ...CONFIG, ...options };
    
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/40b69330-b35b-40d3-90e4-c27983ad40d7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'run-pipeline.js:52',message:'ArticlePipeline constructor - initializing components',data:{options:this.options},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    
    // Initialize components
    this.db = new AirtableSync();
    this.research = new SerpResearch();
    this.generator = new ArticleGenerator();
    this.affiliate = new AmazonAffiliate();
    this.publisher = new PagePublisher();
    this.qa = new QAAgent();
    
    // Stats tracking
    this.stats = {
      started: 0,
      completed: 0,
      failed: 0,
      qaPassed: 0,
      qaFailed: 0
    };
  }

  /**
   * Run pipeline for a single keyword
   */
  async runSingle(keyword, keywordId = null) {
    const startTime = Date.now();
    this.stats.started++;

    console.log('\n' + '═'.repeat(60));
    console.log(`🚀 ARTICLE PIPELINE: "${keyword}"`);
    console.log('═'.repeat(60));

    const state = {
      keyword,
      keywordId,
      step: 'init',
      data: {}
    };

    try {
      // ─────────────────────────────────────────────────────────────
      // STEP 1: Update status to researching
      // ─────────────────────────────────────────────────────────────
      state.step = 'status_update';
      if (keywordId) {
        await this.db.updateKeywordStatus(keywordId, 'researching');
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 2: SERP Research
      // ─────────────────────────────────────────────────────────────
      state.step = 'research';
      console.log('\n📊 STEP 1/6: SERP Research');
      
      const researchData = await this._withRetry(
        () => this.research.research(keyword),
        'SERP Research'
      );
      state.data.research = researchData;

      if (this.options.saveIntermediateData) {
        await this.research.saveResearchData(keyword, researchData);
      }

      // Store SERP data in database
      if (keywordId) {
        await this.db.storeSerpData(keywordId, researchData);
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 3: Article Generation
      // ─────────────────────────────────────────────────────────────
      state.step = 'generation';
      console.log('\n✍️  STEP 2/6: Article Generation');
      
      const articleData = await this._withRetry(
        () => this.generator.generate(keyword, researchData),
        'Article Generation'
      );
      state.data.article = articleData;

      if (this.options.saveIntermediateData) {
        await this.generator.saveArticleData(articleData);
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 4: Affiliate Links
      // ─────────────────────────────────────────────────────────────
      state.step = 'affiliate';
      console.log('\n🔗 STEP 3/6: Affiliate Link Generation');
      
      const articleWithLinks = await enrichArticleWithAffiliateLinks(articleData);
      state.data.article = articleWithLinks;

      // Store products in database
      if (keywordId) {
        await this.db.createProducts(keywordId, articleWithLinks.products);
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 5: Page Publishing
      // ─────────────────────────────────────────────────────────────
      state.step = 'publishing';
      console.log('\n📄 STEP 4/6: Page Publishing');
      
      const publishResult = await this.publisher.publish(articleWithLinks);
      state.data.published = publishResult;

      // Create article record in database
      if (keywordId) {
        state.data.articleId = await this.db.createArticle(keywordId, {
          title: articleWithLinks.title,
          slug: articleWithLinks.slug,
          filePath: publishResult.filePath,
          wordCount: publishResult.wordCount,
          contentBrief: articleWithLinks.contentBrief
        });
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 6: QA Review
      // ─────────────────────────────────────────────────────────────
      state.step = 'qa';
      console.log('\n🔍 STEP 5/6: QA Review');
      
      const qaResult = await this.qa.review(publishResult.filePath, keyword);
      state.data.qa = qaResult;

      // Update database with QA results
      if (state.data.articleId) {
        await this.db.updateArticleQA(
          state.data.articleId,
          qaResult.passed ? 'passed' : 'needs_revision',
          JSON.stringify(qaResult.issues.slice(0, 5)),
          qaResult.score
        );
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 7: Finalize
      // ─────────────────────────────────────────────────────────────
      state.step = 'finalize';
      console.log('\n✅ STEP 6/6: Finalizing');

      if (qaResult.passed) {
        this.stats.qaPassed++;
        
        if (this.options.autoPublish && keywordId && state.data.articleId) {
          const articleUrl = `https://www.screened.com${publishResult.url}`;
          await this.db.publishArticle(state.data.articleId, articleUrl);
          console.log(`   🌐 Published: ${articleUrl}`);
        }
      } else {
        this.stats.qaFailed++;
        console.log(`   ⚠️  QA failed (${qaResult.score}/100) - needs revision`);
        
        if (keywordId) {
          await this.db.updateKeywordStatus(keywordId, 'reviewing');
        }
      }

      // ─────────────────────────────────────────────────────────────
      // Complete
      // ─────────────────────────────────────────────────────────────
      this.stats.completed++;
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      
      console.log('\n' + '═'.repeat(60));
      console.log(`✅ PIPELINE COMPLETE: "${keyword}"`);
      console.log(`   Duration: ${duration}s | QA: ${qaResult.score}/100 | Status: ${qaResult.passed ? 'PASSED' : 'NEEDS REVISION'}`);
      console.log('═'.repeat(60));

      return {
        success: true,
        keyword,
        filePath: publishResult.filePath,
        url: publishResult.url,
        qaScore: qaResult.score,
        qaPassed: qaResult.passed,
        duration: parseFloat(duration)
      };

    } catch (error) {
      this.stats.failed++;
      
      console.error('\n' + '═'.repeat(60));
      console.error(`❌ PIPELINE FAILED at step "${state.step}": ${error.message}`);
      console.error('═'.repeat(60));

      // Update database with failure
      if (keywordId) {
        await this.db.updateKeywordStatus(keywordId, 'failed', {
          notes: `Failed at ${state.step}: ${error.message}`
        });
      }

      return {
        success: false,
        keyword,
        error: error.message,
        failedStep: state.step
      };
    }
  }

  /**
   * Run pipeline in batch mode
   */
  async runBatch(limit = 10) {
    console.log('\n' + '═'.repeat(60));
    console.log(`🚀 BATCH PIPELINE: Processing up to ${limit} keywords`);
    console.log('═'.repeat(60));

    // Get pending keywords from database
    const keywords = await this.db.getPendingKeywords(limit);
    
    if (keywords.length === 0) {
      console.log('📭 No pending keywords in queue');
      return [];
    }

    console.log(`📋 Found ${keywords.length} keywords to process:\n`);
    keywords.forEach((kw, i) => {
      console.log(`   ${i + 1}. ${kw.keyword} (priority: ${kw.priority})`);
    });

    const results = [];
    
    for (const kw of keywords) {
      const result = await this.runSingle(kw.keyword, kw.id);
      results.push(result);
      
      // Delay between articles to avoid rate limits
      if (keywords.indexOf(kw) < keywords.length - 1) {
        console.log('\n⏳ Waiting 10s before next article...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }

    // Print batch summary
    this._printBatchSummary(results);

    return results;
  }

  /**
   * Retry wrapper for operations
   */
  async _withRetry(operation, operationName) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.options.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        console.warn(`   ⚠️  ${operationName} attempt ${attempt} failed: ${error.message}`);
        
        if (attempt < this.options.maxRetries) {
          console.log(`   ⏳ Retrying in ${this.options.retryDelay / 1000}s...`);
          await new Promise(resolve => setTimeout(resolve, this.options.retryDelay));
        }
      }
    }
    
    throw lastError;
  }

  /**
   * Print batch summary
   */
  _printBatchSummary(results) {
    console.log('\n' + '═'.repeat(60));
    console.log('📊 BATCH SUMMARY');
    console.log('═'.repeat(60));
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    const passed = results.filter(r => r.qaPassed);
    
    console.log(`\n   Total processed: ${results.length}`);
    console.log(`   ✅ Successful: ${successful.length}`);
    console.log(`   ❌ Failed: ${failed.length}`);
    console.log(`   🎯 QA Passed: ${passed.length}`);
    
    if (successful.length > 0) {
      const avgDuration = successful.reduce((sum, r) => sum + r.duration, 0) / successful.length;
      const avgScore = successful.reduce((sum, r) => sum + (r.qaScore || 0), 0) / successful.length;
      console.log(`\n   Avg Duration: ${avgDuration.toFixed(1)}s`);
      console.log(`   Avg QA Score: ${avgScore.toFixed(0)}/100`);
    }

    if (failed.length > 0) {
      console.log('\n   Failed keywords:');
      failed.forEach(r => {
        console.log(`     • ${r.keyword}: ${r.error}`);
      });
    }

    console.log('\n' + '═'.repeat(60));
  }

  /**
   * Get pipeline stats
   */
  getStats() {
    return { ...this.stats };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CLI INTERFACE
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  
  // Parse arguments
  const options = {
    keyword: null,
    batch: false,
    limit: 10,
    publish: true,
    save: true
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--batch') {
      options.batch = true;
    } else if (args[i] === '--limit' && args[i + 1]) {
      options.limit = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--no-publish') {
      options.publish = false;
    } else if (args[i] === '--no-save') {
      options.save = false;
    } else if (args[i] === '--keyword' && args[i + 1]) {
      options.keyword = args[i + 1];
      i++;
    } else if (!args[i].startsWith('--')) {
      options.keyword = args.slice(i).join(' ');
      break;
    }
  }

  // Show help if no arguments
  if (!options.keyword && !options.batch) {
    console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║   █████╗ ██████╗ ████████╗██╗ ██████╗██╗     ███████╗                 ║
║  ██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██║     ██╔════╝                 ║
║  ███████║██████╔╝   ██║   ██║██║     ██║     █████╗                   ║
║  ██╔══██║██╔══██╗   ██║   ██║██║     ██║     ██╔══╝                   ║
║  ██║  ██║██║  ██║   ██║   ██║╚██████╗███████╗███████╗                 ║
║  ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝╚══════╝╚══════╝                 ║
║                                                                       ║
║  ██████╗ ██╗██████╗ ███████╗██╗     ██╗███╗   ██╗███████╗             ║
║  ██╔══██╗██║██╔══██╗██╔════╝██║     ██║████╗  ██║██╔════╝             ║
║  ██████╔╝██║██████╔╝█████╗  ██║     ██║██╔██╗ ██║█████╗               ║
║  ██╔═══╝ ██║██╔═══╝ ██╔══╝  ██║     ██║██║╚██╗██║██╔══╝               ║
║  ██║     ██║██║     ███████╗███████╗██║██║ ╚████║███████╗             ║
║  ╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝             ║
║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  USAGE                                                                ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  Single keyword:                                                      ║
║    node run-pipeline.js "best gaming headsets"                        ║
║                                                                       ║
║  Batch from database:                                                 ║
║    node run-pipeline.js --batch --limit 5                             ║
║                                                                       ║
║  Without publishing:                                                  ║
║    node run-pipeline.js "best vpn services" --no-publish              ║
║                                                                       ║
║  OPTIONS                                                              ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║    --batch              Run batch processing from database            ║
║    --limit <n>          Limit batch to n keywords (default: 10)       ║
║    --no-publish         Generate but don't publish to database        ║
║    --no-save            Don't save intermediate data files            ║
║    --keyword <kw>       Specify keyword (alternative to positional)   ║
║                                                                       ║
║  ENVIRONMENT VARIABLES                                                ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║    ANTHROPIC_API_KEY     Required for article generation              ║
║    APIFY_API_TOKEN       Required for SERP research                   ║
║    AIRTABLE_API_KEY      Required for database (optional: local)      ║
║    AIRTABLE_BASE_ID      Required for database (optional: local)      ║
║    AMAZON_ASSOCIATE_TAG  Your Amazon affiliate tag                    ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
    `);

    // Show current configuration
    console.log('\n📋 Current Configuration:');
    console.log(`   ANTHROPIC_API_KEY: ${process.env.ANTHROPIC_API_KEY ? '✅ Set' : '❌ Missing'}`);
    console.log(`   APIFY_API_TOKEN: ${process.env.APIFY_API_TOKEN ? '✅ Set' : '⚠️  Not set (using mock data)'}`);
    console.log(`   AIRTABLE_API_KEY: ${process.env.AIRTABLE_API_KEY ? '✅ Set' : '⚠️  Not set (using local JSON)'}`);
    console.log(`   AMAZON_ASSOCIATE_TAG: ${process.env.AMAZON_ASSOCIATE_TAG || 'screened0e-20 (default)'}`);
    
    return;
  }

  // Create pipeline
  const pipeline = new ArticlePipeline({
    autoPublish: options.publish,
    saveIntermediateData: options.save
  });

  // Run pipeline
  if (options.batch) {
    await pipeline.runBatch(options.limit);
  } else {
    await pipeline.runSingle(options.keyword);
  }
}

// Run if called directly
main().catch(error => {
  console.error('\n💥 Fatal error:', error);
  process.exit(1);
});

export { ArticlePipeline };
export default ArticlePipeline;

