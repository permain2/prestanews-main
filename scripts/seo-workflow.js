import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';

/**
 * SEO Content Workflow Orchestrator
 * 
 * Complete workflow for generating ranking content:
 * 1. Load keywords from CSV or JSON
 * 2. Analyze SERP for each keyword (Apify)
 * 3. Generate SEO-optimized articles (Claude)
 * 4. Score and validate output
 * 5. Generate batch report
 * 
 * Usage:
 *   # Process single keyword
 *   node scripts/seo-workflow.js "best small business insurance"
 * 
 *   # Process from your competitor CSV
 *   node scripts/seo-workflow.js --csv path/to/keywords.csv
 * 
 *   # Process from keywords JSON
 *   node scripts/seo-workflow.js --json scripts/target-keywords.json
 * 
 *   # Skip SERP analysis (faster, for testing)
 *   node scripts/seo-workflow.js --no-serp "best pet insurance"
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  // Processing limits
  maxKeywordsPerBatch: 10,
  delayBetweenArticles: 5000, // 5 seconds
  
  // Output directories
  outputDirs: {
    articles: 'src/content/blog',
    briefs: 'content-briefs',
    serp: 'serp-data',
    reports: 'seo-reports',
  },
  
  // Keyword prioritization
  minTraffic: 100,
  maxDifficulty: 60,
};

// ═══════════════════════════════════════════════════════════════════════════
// KEYWORD EXTRACTION FROM CSV
// ═══════════════════════════════════════════════════════════════════════════

async function extractKeywordsFromCsv(csvPath) {
  console.log(`📂 Reading keywords from: ${csvPath}\n`);
  
  const content = await fs.readFile(csvPath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim());
  
  const keywords = [];
  
  for (let i = 1; i < lines.length; i++) { // Skip header
    const cols = lines[i].split('\t').map(c => c.replace(/"/g, '').trim());
    
    if (cols.length >= 20) {
      const url = cols[0];
      const traffic = parseInt(cols[2]) || 0;
      const trafficCost = parseFloat(cols[5]) || 0;
      const keyword = cols[15]; // "Current top keyword"
      const volume = parseInt(cols[19]) || 0;
      
      if (keyword && !keywords.find(k => k.keyword === keyword)) {
        // Extract topic from URL for categorization
        const urlPath = url.split('/').pop() || '';
        const topic = urlPath.replace('top-', '').replace(/-/g, ' ');
        
        keywords.push({
          keyword,
          volume,
          traffic,
          trafficCost,
          topic,
          url,
          priority: calculatePriority(traffic, trafficCost, volume),
        });
      }
    }
  }
  
  // Sort by priority (highest first)
  keywords.sort((a, b) => b.priority - a.priority);
  
  return keywords;
}

function calculatePriority(traffic, trafficCost, volume) {
  // Higher traffic cost = more valuable
  // Higher traffic = proven demand
  // Higher volume = more opportunity
  return (trafficCost * 0.5) + (traffic * 0.3) + (volume * 0.2);
}

// ═══════════════════════════════════════════════════════════════════════════
// SERP ANALYSIS (calls analyze-serp.js)
// ═══════════════════════════════════════════════════════════════════════════

async function runSerpAnalysis(keyword) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['scripts/analyze-serp.js', keyword], {
      cwd: process.cwd(),
      stdio: 'pipe',
    });
    
    let output = '';
    child.stdout.on('data', (data) => { output += data; });
    child.stderr.on('data', (data) => { output += data; });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`SERP analysis failed: ${output}`));
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// ARTICLE GENERATION (calls seo-article-generator.js)
// ═══════════════════════════════════════════════════════════════════════════

async function runArticleGeneration(keyword) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['scripts/seo-article-generator.js', keyword], {
      cwd: process.cwd(),
      stdio: 'pipe',
    });
    
    let output = '';
    child.stdout.on('data', (data) => { 
      output += data;
      process.stdout.write(data); // Echo to console
    });
    child.stderr.on('data', (data) => { 
      output += data;
      process.stderr.write(data);
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`Article generation failed`));
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// WORKFLOW EXECUTION
// ═══════════════════════════════════════════════════════════════════════════

async function processKeyword(keywordData, options = {}) {
  const keyword = typeof keywordData === 'string' ? keywordData : keywordData.keyword;
  const startTime = Date.now();
  
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🎯 PROCESSING: "${keyword}"`);
  if (keywordData.volume) {
    console.log(`   Volume: ${keywordData.volume.toLocaleString()} | Traffic: ${keywordData.traffic?.toLocaleString()}`);
  }
  console.log(`${'═'.repeat(70)}\n`);
  
  const result = {
    keyword,
    startTime: new Date().toISOString(),
    serpAnalysis: null,
    articleGeneration: null,
    success: false,
  };
  
  try {
    // Step 1: SERP Analysis (optional)
    if (!options.skipSerp) {
      console.log('📊 Step 1: Running SERP analysis...\n');
      await runSerpAnalysis(keyword);
      result.serpAnalysis = 'completed';
    } else {
      console.log('⏭️ Skipping SERP analysis (--no-serp flag)\n');
    }
    
    // Step 2: Article Generation
    console.log('✍️ Step 2: Generating SEO article...\n');
    await runArticleGeneration(keyword);
    result.articleGeneration = 'completed';
    
    result.success = true;
    result.duration = Date.now() - startTime;
    
    console.log(`\n✅ Completed "${keyword}" in ${Math.round(result.duration / 1000)}s`);
    
  } catch (error) {
    result.error = error.message;
    result.duration = Date.now() - startTime;
    console.error(`\n❌ Failed: ${error.message}`);
  }
  
  return result;
}

async function processBatch(keywords, options = {}) {
  const limit = options.limit || CONFIG.maxKeywordsPerBatch;
  const keywordsToProcess = keywords.slice(0, limit);
  
  console.log(`\n╔${'═'.repeat(68)}╗`);
  console.log(`║  SEO CONTENT WORKFLOW - BATCH PROCESSING                              ║`);
  console.log(`╠${'═'.repeat(68)}╣`);
  console.log(`║  Keywords to process: ${keywordsToProcess.length.toString().padEnd(45)}║`);
  console.log(`║  SERP Analysis: ${options.skipSerp ? 'Disabled' : 'Enabled'.padEnd(50)}║`);
  console.log(`╚${'═'.repeat(68)}╝\n`);
  
  const results = [];
  
  for (let i = 0; i < keywordsToProcess.length; i++) {
    const kw = keywordsToProcess[i];
    console.log(`\n[${i + 1}/${keywordsToProcess.length}] Processing...`);
    
    const result = await processKeyword(kw, options);
    results.push(result);
    
    // Rate limiting between keywords
    if (i < keywordsToProcess.length - 1) {
      console.log(`\n⏳ Waiting ${CONFIG.delayBetweenArticles / 1000}s before next keyword...`);
      await new Promise(r => setTimeout(r, CONFIG.delayBetweenArticles));
    }
  }
  
  // Generate batch report
  const report = generateBatchReport(results);
  await saveBatchReport(report);
  
  return results;
}

// ═══════════════════════════════════════════════════════════════════════════
// REPORTING
// ═══════════════════════════════════════════════════════════════════════════

function generateBatchReport(results) {
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  return {
    generatedAt: new Date().toISOString(),
    summary: {
      total: results.length,
      successful: successful.length,
      failed: failed.length,
      successRate: `${Math.round((successful.length / results.length) * 100)}%`,
      totalDuration: results.reduce((acc, r) => acc + (r.duration || 0), 0),
    },
    successful: successful.map(r => ({
      keyword: r.keyword,
      duration: `${Math.round(r.duration / 1000)}s`,
    })),
    failed: failed.map(r => ({
      keyword: r.keyword,
      error: r.error,
    })),
  };
}

async function saveBatchReport(report) {
  const reportDir = path.join(process.cwd(), CONFIG.outputDirs.reports);
  await fs.mkdir(reportDir, { recursive: true });
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(reportDir, `batch-report-${timestamp}.json`);
  
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  
  // Print summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('📊 BATCH COMPLETION REPORT');
  console.log(`${'═'.repeat(70)}`);
  console.log(`\n✅ Successful: ${report.summary.successful}/${report.summary.total}`);
  console.log(`❌ Failed: ${report.summary.failed}`);
  console.log(`⏱️ Total time: ${Math.round(report.summary.totalDuration / 1000)}s`);
  console.log(`📁 Report saved: ${reportPath}\n`);
  
  if (report.failed.length > 0) {
    console.log('Failed keywords:');
    report.failed.forEach(f => console.log(`  • ${f.keyword}: ${f.error}`));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CLI
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║           SEO CONTENT WORKFLOW ORCHESTRATOR                            ║
║           Generate Ranking Blog Posts at Scale                         ║
╠═══════════════════════════════════════════════════════════════════════╣
║ USAGE:                                                                 ║
║                                                                        ║
║   Single keyword:                                                      ║
║   node scripts/seo-workflow.js "best small business insurance"         ║
║                                                                        ║
║   From competitor CSV (your ConsumerVoice data):                       ║
║   node scripts/seo-workflow.js --csv keywords.csv                      ║
║                                                                        ║
║   From JSON file:                                                      ║
║   node scripts/seo-workflow.js --json target-keywords.json             ║
║                                                                        ║
║ OPTIONS:                                                               ║
║   --no-serp     Skip SERP analysis (faster, use existing data)         ║
║   --limit N     Process only N keywords from batch                     ║
║                                                                        ║
║ EXAMPLES:                                                              ║
║   node scripts/seo-workflow.js --csv data.csv --limit 5                ║
║   node scripts/seo-workflow.js --no-serp "pet insurance"               ║
╚═══════════════════════════════════════════════════════════════════════╝
    `);
    process.exit(0);
  }
  
  // Parse options
  const options = {
    skipSerp: args.includes('--no-serp'),
    limit: args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) : undefined,
  };
  
  // Remove option flags from args
  const cleanArgs = args.filter(a => !a.startsWith('--') && !parseInt(a));
  
  // Determine mode
  if (args.includes('--csv')) {
    const csvIndex = args.indexOf('--csv');
    const csvPath = args[csvIndex + 1];
    
    if (!csvPath) {
      console.error('❌ Please provide a CSV file path');
      process.exit(1);
    }
    
    const keywords = await extractKeywordsFromCsv(csvPath);
    console.log(`\n📊 Top keywords by priority:\n`);
    keywords.slice(0, 10).forEach((k, i) => {
      console.log(`  ${i + 1}. "${k.keyword}" (vol: ${k.volume?.toLocaleString()}, traffic: ${k.traffic?.toLocaleString()})`);
    });
    
    await processBatch(keywords, options);
    
  } else if (args.includes('--json')) {
    const jsonIndex = args.indexOf('--json');
    const jsonPath = args[jsonIndex + 1];
    
    if (!jsonPath) {
      console.error('❌ Please provide a JSON file path');
      process.exit(1);
    }
    
    const keywords = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
    await processBatch(keywords, options);
    
  } else {
    // Single keyword mode
    const keyword = cleanArgs.join(' ');
    if (!keyword) {
      console.error('❌ Please provide a keyword');
      process.exit(1);
    }
    await processKeyword(keyword, options);
  }
}

main().catch(console.error);

