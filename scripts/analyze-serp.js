import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';

/**
 * SERP Analysis Tool using Apify
 * 
 * Scrapes Google search results for target keywords and analyzes
 * competitor content to inform article generation.
 * 
 * Usage:
 *   node scripts/analyze-serp.js "best small business insurance"
 *   node scripts/analyze-serp.js --batch keywords.csv
 * 
 * Requires: APIFY_API_TOKEN in .env file
 */

const APIFY_TOKEN = process.env.APIFY_API_TOKEN;

if (!APIFY_TOKEN) {
  console.error('❌ Error: APIFY_API_TOKEN not set in .env file');
  console.error('Get your token at: https://console.apify.com/account/integrations');
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  maxResults: 10, // Top 10 results
  countryCode: 'us',
  languageCode: 'en',
  outputDir: 'serp-data',
};

// ═══════════════════════════════════════════════════════════════════════════
// APIFY GOOGLE SEARCH SCRAPER
// ═══════════════════════════════════════════════════════════════════════════

async function scrapeGoogleSerp(keyword) {
  console.log(`🔍 Scraping Google for: "${keyword}"...`);

  const actorInput = {
    queries: keyword,
    maxPagesPerQuery: 1,
    resultsPerPage: CONFIG.maxResults,
    countryCode: CONFIG.countryCode,
    languageCode: CONFIG.languageCode,
    mobileResults: false,
    saveHtml: false,
    saveHtmlToKeyValueStore: false,
  };

  try {
    // Start the Actor run
    const runResponse = await fetch(
      `https://api.apify.com/v2/acts/apify~google-search-scraper/runs?token=${APIFY_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actorInput),
      }
    );

    if (!runResponse.ok) {
      throw new Error(`Failed to start Actor: ${runResponse.statusText}`);
    }

    const runData = await runResponse.json();
    const runId = runData.data.id;
    console.log(`   Started run: ${runId}`);

    // Wait for completion
    let status = 'RUNNING';
    while (status === 'RUNNING' || status === 'READY') {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const statusResponse = await fetch(
        `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`
      );
      const statusData = await statusResponse.json();
      status = statusData.data.status;
      process.stdout.write('.');
    }
    console.log(` ${status}`);

    if (status !== 'SUCCEEDED') {
      throw new Error(`Actor run failed with status: ${status}`);
    }

    // Get results from dataset
    const datasetId = runData.data.defaultDatasetId;
    const dataResponse = await fetch(
      `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}`
    );
    const results = await dataResponse.json();

    return results;

  } catch (error) {
    console.error(`❌ Error scraping SERP: ${error.message}`);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT EXTRACTION (from ranking pages)
// ═══════════════════════════════════════════════════════════════════════════

async function extractPageContent(url) {
  console.log(`   📄 Extracting: ${url}`);

  const actorInput = {
    query: url,
    maxResults: 1,
    outputFormats: ['markdown'],
  };

  try {
    const runResponse = await fetch(
      `https://api.apify.com/v2/acts/apify~rag-web-browser/runs?token=${APIFY_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actorInput),
      }
    );

    if (!runResponse.ok) return null;

    const runData = await runResponse.json();
    const runId = runData.data.id;

    // Wait for completion (max 60 seconds)
    let attempts = 0;
    while (attempts < 20) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const statusResponse = await fetch(
        `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`
      );
      const statusData = await statusResponse.json();
      
      if (statusData.data.status === 'SUCCEEDED') {
        const datasetId = runData.data.defaultDatasetId;
        const dataResponse = await fetch(
          `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}`
        );
        const results = await dataResponse.json();
        return results[0];
      }
      
      if (statusData.data.status === 'FAILED') break;
      attempts++;
    }
  } catch (error) {
    console.error(`   ⚠️ Could not extract: ${error.message}`);
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// SERP ANALYSIS
// ═══════════════════════════════════════════════════════════════════════════

function analyzeSerpResults(serpData, keyword) {
  if (!serpData || serpData.length === 0) {
    return { error: 'No SERP data available' };
  }

  const searchResult = serpData[0]; // First result contains the search data
  const organicResults = searchResult.organicResults || [];
  const paa = searchResult.peopleAlsoAsk || [];
  const relatedSearches = searchResult.relatedSearches || [];

  const analysis = {
    keyword,
    searchedAt: new Date().toISOString(),
    totalResults: searchResult.searchInformation?.totalResults || 0,
    
    // Top 10 Organic Results
    organicResults: organicResults.slice(0, 10).map((result, index) => ({
      position: index + 1,
      title: result.title,
      url: result.url,
      displayedUrl: result.displayedUrl,
      description: result.description,
      sitelinks: result.sitelinks?.length || 0,
    })),
    
    // People Also Ask
    peopleAlsoAsk: paa.map(q => ({
      question: q.question,
      snippet: q.snippet,
      source: q.source,
    })),
    
    // Related Searches
    relatedSearches: relatedSearches.map(s => s.query || s),
    
    // Analysis Insights
    insights: {
      avgTitleLength: Math.round(
        organicResults.reduce((acc, r) => acc + (r.title?.length || 0), 0) / organicResults.length
      ),
      domainsRanking: [...new Set(organicResults.map(r => {
        try {
          return new URL(r.url).hostname;
        } catch {
          return 'unknown';
        }
      }))],
      hasVideoResults: searchResult.videoResults?.length > 0,
      hasFeaturedSnippet: !!searchResult.featuredSnippet,
      hasKnowledgePanel: !!searchResult.knowledgeGraph,
    },
    
    // Content Patterns
    contentPatterns: {
      commonTitlePatterns: extractTitlePatterns(organicResults),
      yearInTitles: organicResults.filter(r => 
        r.title?.includes('2025') || r.title?.includes('2024')
      ).length,
      questionTitles: organicResults.filter(r => 
        r.title?.includes('?') || r.title?.toLowerCase().startsWith('how') || 
        r.title?.toLowerCase().startsWith('what')
      ).length,
      listTitles: organicResults.filter(r => 
        /\d+\s+(best|top|ways|tips)/i.test(r.title || '')
      ).length,
    },
  };

  return analysis;
}

function extractTitlePatterns(results) {
  const patterns = [];
  
  // Check for "Best X" pattern
  if (results.some(r => r.title?.toLowerCase().includes('best'))) {
    patterns.push('"Best X" comparison format');
  }
  
  // Check for "Top X" pattern
  if (results.some(r => /top\s+\d+/i.test(r.title || ''))) {
    patterns.push('"Top N" list format');
  }
  
  // Check for "X vs Y" pattern
  if (results.some(r => /\bvs\.?\b/i.test(r.title || ''))) {
    patterns.push('"X vs Y" comparison format');
  }
  
  // Check for year pattern
  if (results.some(r => /20\d{2}/i.test(r.title || ''))) {
    patterns.push('Year included in title');
  }
  
  // Check for "Guide" pattern
  if (results.some(r => r.title?.toLowerCase().includes('guide'))) {
    patterns.push('"Complete Guide" format');
  }
  
  // Check for "Review" pattern
  if (results.some(r => r.title?.toLowerCase().includes('review'))) {
    patterns.push('Review format');
  }

  return patterns;
}

// ═══════════════════════════════════════════════════════════════════════════
// GENERATE CONTENT RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════════════════════

function generateRecommendations(analysis) {
  const recs = {
    titleRecommendations: [],
    contentRecommendations: [],
    structureRecommendations: [],
  };

  // Title recommendations
  if (analysis.contentPatterns.yearInTitles > 3) {
    recs.titleRecommendations.push('Include "2025" in your title - competitors are doing this');
  }
  if (analysis.contentPatterns.listTitles > 3) {
    recs.titleRecommendations.push('Use a numbered list format (e.g., "10 Best...")');
  }
  if (analysis.insights.avgTitleLength > 0) {
    recs.titleRecommendations.push(`Aim for ~${analysis.insights.avgTitleLength} characters in title`);
  }

  // Content recommendations based on PAA
  if (analysis.peopleAlsoAsk.length > 0) {
    recs.contentRecommendations.push(
      `Answer these "People Also Ask" questions:\n${analysis.peopleAlsoAsk.slice(0, 5).map(p => `  • ${p.question}`).join('\n')}`
    );
  }

  // Related searches as subtopics
  if (analysis.relatedSearches.length > 0) {
    recs.contentRecommendations.push(
      `Cover these related topics:\n${analysis.relatedSearches.slice(0, 5).map(s => `  • ${s}`).join('\n')}`
    );
  }

  // Structure recommendations
  if (analysis.insights.hasFeaturedSnippet) {
    recs.structureRecommendations.push('Optimize for featured snippet - use concise definitions, lists, or tables');
  }
  if (analysis.contentPatterns.commonTitlePatterns.includes('"X vs Y" comparison format')) {
    recs.structureRecommendations.push('Include a comparison table/section');
  }

  return recs;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN WORKFLOW
// ═══════════════════════════════════════════════════════════════════════════

async function analyzeKeyword(keyword) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`🎯 ANALYZING: "${keyword}"`);
  console.log(`${'═'.repeat(60)}\n`);

  // Step 1: Scrape SERP
  const serpData = await scrapeGoogleSerp(keyword);
  
  if (!serpData) {
    console.error('❌ Failed to get SERP data');
    return null;
  }

  // Step 2: Analyze results
  const analysis = analyzeSerpResults(serpData, keyword);
  
  // Step 3: Generate recommendations
  const recommendations = generateRecommendations(analysis);

  // Combine into report
  const report = {
    ...analysis,
    recommendations,
    generatedAt: new Date().toISOString(),
  };

  // Display summary
  console.log('\n📊 SERP ANALYSIS SUMMARY\n');
  console.log(`Total results: ${analysis.totalResults?.toLocaleString()}`);
  console.log(`\nTop 5 Ranking Domains:`);
  analysis.insights.domainsRanking.slice(0, 5).forEach((d, i) => {
    console.log(`  ${i + 1}. ${d}`);
  });
  
  console.log(`\nPeople Also Ask (${analysis.peopleAlsoAsk.length} questions):`);
  analysis.peopleAlsoAsk.slice(0, 5).forEach(p => {
    console.log(`  • ${p.question}`);
  });

  console.log(`\nRelated Searches:`);
  analysis.relatedSearches.slice(0, 5).forEach(s => {
    console.log(`  • ${s}`);
  });

  console.log('\n📝 CONTENT RECOMMENDATIONS:');
  recommendations.titleRecommendations.forEach(r => console.log(`  ✓ ${r}`));
  recommendations.structureRecommendations.forEach(r => console.log(`  ✓ ${r}`));

  // Save report
  const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const outputPath = path.join(process.cwd(), CONFIG.outputDir, `${slug}-serp.json`);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ Full report saved: ${outputPath}`);

  return report;
}

// ═══════════════════════════════════════════════════════════════════════════
// BATCH PROCESSING FROM CSV
// ═══════════════════════════════════════════════════════════════════════════

async function processBatchFromCsv(csvPath) {
  const content = await fs.readFile(csvPath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim());
  
  // Parse CSV - extract keywords from "Current top keyword" column
  const keywords = [];
  const isHeader = lines[0].includes('URL') || lines[0].includes('keyword');
  
  for (let i = isHeader ? 1 : 0; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    // Try to find the keyword column (usually "Current top keyword")
    if (cols.length >= 16) {
      const keyword = cols[15]?.replace(/"/g, '').trim(); // Current top keyword column
      if (keyword && !keywords.includes(keyword)) {
        keywords.push(keyword);
      }
    }
  }

  console.log(`📦 Found ${keywords.length} unique keywords in CSV\n`);

  const results = [];
  for (const keyword of keywords.slice(0, 50)) { // Limit to 50
    const result = await analyzeKeyword(keyword);
    if (result) {
      results.push(result);
    }
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  // Save batch summary
  const summaryPath = path.join(process.cwd(), CONFIG.outputDir, 'batch-summary.json');
  await fs.writeFile(summaryPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Batch summary saved: ${summaryPath}`);

  return results;
}

// ═══════════════════════════════════════════════════════════════════════════
// CLI
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║        SERP Analysis Tool for SEO Content Strategy             ║
╠═══════════════════════════════════════════════════════════════╣
║ Usage:                                                         ║
║   Single keyword:                                              ║
║   node scripts/analyze-serp.js "best pet insurance"            ║
║                                                                ║
║   Batch from CSV:                                              ║
║   node scripts/analyze-serp.js --batch keywords.csv            ║
╚═══════════════════════════════════════════════════════════════╝
    `);
    process.exit(0);
  }

  if (args[0] === '--batch') {
    const csvPath = args[1];
    if (!csvPath) {
      console.error('❌ Please provide a CSV file path');
      process.exit(1);
    }
    await processBatchFromCsv(csvPath);
  } else {
    const keyword = args.join(' ');
    await analyzeKeyword(keyword);
  }
}

main().catch(console.error);

