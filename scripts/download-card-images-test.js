/**
 * Credit Card Image Downloader - TEST (1 card only)
 * Uses Apify Google Images Scraper + Freepik Background Removal
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load API Keys from .env file
const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;

if (!APIFY_TOKEN || !FREEPIK_API_KEY) {
  console.error('❌ Error: Missing API keys in .env file');
  console.error('   Required: APIFY_API_TOKEN, FREEPIK_API_KEY');
  process.exit(1);
}

// Test with just one card
const CREDIT_CARDS = [
  { name: 'chase-sapphire-preferred', search: 'Chase Sapphire Preferred credit card image PNG transparent' },
];

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'credit-cards');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Run Apify Google Images Scraper
 */
async function searchGoogleImages(keyword, maxItems = 5) {
  console.log(`🔍 Searching Google Images for: ${keyword}`);
  
  const input = {
    keyword: keyword,
    size: 'All size 📏',
    color: 'Transparent 🔲',
    type: 'All type 🖼️',
    license: 'Unfiltered images by license 📜',
    time_filter: 'Date indifferent 📅',
    language: 'English',
    country: 'United States 🇺🇸',
    maxitems: maxItems
  };

  const response = await fetch(
    `https://api.apify.com/v2/acts/scrapestorm~google-images-scraper---cheapest-pay-per-results/runs?token=${APIFY_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    }
  );

  const runData = await response.json();
  
  if (!runData.data || !runData.data.id) {
    console.log('Response:', JSON.stringify(runData, null, 2));
    throw new Error('Failed to start Apify run');
  }
  
  const runId = runData.data.id;
  const datasetId = runData.data.defaultDatasetId;
  
  console.log(`   Started run: ${runId}`);
  
  // Wait for run to complete
  let status = 'RUNNING';
  let attempts = 0;
  while ((status === 'RUNNING' || status === 'READY') && attempts < 60) {
    await new Promise(r => setTimeout(r, 3000));
    attempts++;
    const statusRes = await fetch(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`
    );
    const statusData = await statusRes.json();
    status = statusData.data.status;
    console.log(`   Status: ${status} (attempt ${attempts})`);
  }

  if (status !== 'SUCCEEDED') {
    throw new Error(`Run failed with status: ${status}`);
  }

  // Get results
  const resultsRes = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}`
  );
  const results = await resultsRes.json();
  
  console.log(`   Found ${results.length} images`);
  return results;
}

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(filepath);
    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

/**
 * Remove background using Freepik API
 */
async function removeBackground(imageUrl) {
  console.log(`   🎨 Removing background from: ${imageUrl.substring(0, 80)}...`);
  
  const response = await fetch('https://api.freepik.com/v1/ai/beta/remove-background', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-freepik-api-key': FREEPIK_API_KEY
    },
    body: `image_url=${encodeURIComponent(imageUrl)}`
  });

  const responseText = await response.text();
  
  if (!response.ok) {
    throw new Error(`Freepik API error: ${response.status} - ${responseText}`);
  }

  const result = JSON.parse(responseText);
  console.log(`   Freepik response keys:`, Object.keys(result));
  return result.url || result.high_resolution || result.data?.base64;
}

/**
 * Process a single credit card
 */
async function processCard(card) {
  console.log(`\n📇 Processing: ${card.name}`);
  
  try {
    // Search for images
    const images = await searchGoogleImages(card.search, 5);
    
    if (!images || images.length === 0) {
      console.log(`   ❌ No images found`);
      return null;
    }

    // Log all found images
    console.log('\n   Found images:');
    images.forEach((img, i) => {
      const url = img.image_url || '';
      const isBase64 = url.startsWith('data:');
      console.log(`   ${i + 1}. ${isBase64 ? '[BASE64]' : url.substring(0, 80)}... from ${img.source_name || 'Unknown'}`);
    });

    // Try to find the best image (prefer non-base64 URLs from good sources)
    let selectedImage = null;
    const preferredSources = ['chase.com', 'creditcards.com', 'nerdwallet', 'bankrate', 'valuepenguin'];
    
    // First try preferred sources
    for (const img of images) {
      if (img.image_url && !img.image_url.startsWith('data:')) {
        const url = img.source_url || img.image_url;
        if (preferredSources.some(s => url.toLowerCase().includes(s))) {
          selectedImage = img;
          break;
        }
      }
    }
    
    // Fall back to any non-base64 URL
    if (!selectedImage) {
      for (const img of images) {
        if (img.image_url && !img.image_url.startsWith('data:')) {
          selectedImage = img;
          break;
        }
      }
    }
    
    // Last resort: use base64
    if (!selectedImage && images[0]) {
      selectedImage = images[0];
    }
    
    if (!selectedImage) {
      console.log(`   ❌ No usable image found`);
      return null;
    }

    const imageUrl = selectedImage.image_url;
    console.log(`\n   Selected: ${selectedImage.source_name || 'Unknown'}`);

    // If it's a base64 image, save directly
    if (imageUrl.startsWith('data:')) {
      const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
      const outputPath = path.join(OUTPUT_DIR, `${card.name}.png`);
      fs.writeFileSync(outputPath, Buffer.from(base64Data, 'base64'));
      console.log(`   ✅ Saved (base64): ${outputPath}`);
      return outputPath;
    }

    // Try to remove background with Freepik
    try {
      const result = await removeBackground(imageUrl);
      
      // Check if it's a URL response
      if (result && typeof result === 'string' && (result.startsWith('http') || result.startsWith('//'))) {
        const outputPath = path.join(OUTPUT_DIR, `${card.name}.png`);
        await downloadImage(result.startsWith('//') ? 'https:' + result : result, outputPath);
        console.log(`   ✅ Saved with transparent background: ${outputPath}`);
        return outputPath;
      } else if (result && typeof result === 'string') {
        // It might be base64
        const outputPath = path.join(OUTPUT_DIR, `${card.name}.png`);
        const base64Data = result.replace(/^data:image\/\w+;base64,/, '');
        fs.writeFileSync(outputPath, Buffer.from(base64Data, 'base64'));
        console.log(`   ✅ Saved with transparent background (base64): ${outputPath}`);
        return outputPath;
      }
    } catch (bgError) {
      console.log(`   ⚠️ Background removal failed: ${bgError.message}`);
    }
    
    // Download original as fallback
    console.log(`   📥 Downloading original image...`);
    const ext = imageUrl.match(/\.(png|jpg|jpeg|webp|gif)/i)?.[1] || 'png';
    const outputPath = path.join(OUTPUT_DIR, `${card.name}.${ext}`);
    await downloadImage(imageUrl, outputPath);
    console.log(`   ✅ Saved original: ${outputPath}`);
    return outputPath;

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Credit Card Image Download (TEST - 1 card)');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`📇 Processing ${CREDIT_CARDS.length} cards\n`);

  for (const card of CREDIT_CARDS) {
    await processCard(card);
  }

  console.log('\n✅ Test complete!');
}

main().catch(console.error);




