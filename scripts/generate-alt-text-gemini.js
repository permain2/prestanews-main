#!/usr/bin/env node
/**
 * Gemini Pro Vision Alt Text Generator
 * 
 * Analyzes all images using Google's Gemini Pro Vision API and generates
 * SEO-optimized alt text descriptions.
 * 
 * Usage: node scripts/generate-alt-text-gemini.js
 * 
 * Options:
 *   --dry-run     Preview without saving
 *   --folder=X    Only process specific folder
 *   --update      Update source files with new alt text
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  publicDir: path.join(__dirname, '..', 'public'),
  outputFile: path.join(__dirname, '..', 'src', 'utils', 'altTextMap.ts'),
  outputJson: path.join(__dirname, '..', 'alt-text-mapping.json'),
  imageFolders: [
    'credit-cards',
    'insurance-logos',
    'life-insurance-logos',
    'blog-images',
    'category-images',
    'guides-images',
    'insurance-images',
    'insurance-heroes',
    'news-images',
    'team',
    'icons',
    'logo',
  ],
  supportedFormats: ['.png', '.jpg', '.jpeg', '.webp'],
};

// Parse arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const updateFiles = args.includes('--update');
const folderArg = args.find(a => a.startsWith('--folder='));
const specificFolder = folderArg ? folderArg.split('=')[1] : null;

// Colors for console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Initialize Gemini - load from .env
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  log('❌ Error: GEMINI_API_KEY not set in .env file', 'red');
  log('   Add GEMINI_API_KEY=your_key to your .env file', 'dim');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Site context for better alt text
const SITE_CONTEXT = `
You are generating alt text for images on Screened.com, a financial website that reviews credit cards, 
compares insurance providers, and provides personal finance guides. The site helps users make smarter 
financial decisions with expert reviews and comparisons.

Key topics: credit cards, travel rewards, cash back, insurance (car, home, life, renters), 
points/miles optimization, financial guides.
`;

// Get all images
function getImageFiles() {
  const images = [];
  const folders = specificFolder ? [specificFolder] : CONFIG.imageFolders;

  for (const folder of folders) {
    const folderPath = path.join(CONFIG.publicDir, folder);
    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (CONFIG.supportedFormats.includes(ext)) {
        images.push({
          folder,
          filename: file,
          fullPath: path.join(folderPath, file),
          relativePath: `/${folder}/${file}`,
        });
      }
    }
  }
  return images;
}

// Generate alt text using Gemini
async function generateAltText(imagePath, folder, filename) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
  // Read image as base64
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';

  // Context-aware prompts based on folder
  let contextHint = '';
  switch (folder) {
    case 'credit-cards':
      contextHint = 'This is a credit card image. Include the card name, issuer, and any visible design elements.';
      break;
    case 'insurance-logos':
    case 'life-insurance-logos':
      contextHint = 'This is an insurance company logo. Identify the company name and describe the logo briefly.';
      break;
    case 'team':
      contextHint = 'This is a team member headshot for a professional website. Describe the person professionally.';
      break;
    case 'blog-images':
    case 'news-images':
      contextHint = 'This is an editorial/blog image. Describe what it depicts in context of personal finance or travel.';
      break;
    case 'category-images':
    case 'guides-images':
      contextHint = 'This is a category/guide header image. Describe the scene and its relevance to financial topics.';
      break;
    case 'insurance-images':
    case 'insurance-heroes':
      contextHint = 'This is an insurance category hero image. Describe the scene and its connection to insurance.';
      break;
    case 'icons':
      contextHint = 'This is a website icon/symbol. Describe what it represents.';
      break;
    case 'logo':
      contextHint = 'This is the Screened.com website logo or brand mark.';
      break;
  }

  const prompt = `${SITE_CONTEXT}

${contextHint}

Analyze this image and generate an SEO-optimized alt text that:
1. Is 10-15 words (max 125 characters)
2. Describes the image accurately and specifically
3. Includes relevant keywords naturally (don't keyword stuff)
4. Is useful for visually impaired users
5. Helps with Google Image search ranking

The filename is: ${filename}

Respond with ONLY the alt text, no quotes, no explanation, just the description.`;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
    ]);

    const response = await result.response;
    let altText = response.text().trim();
    
    // Clean up the response
    altText = altText.replace(/^["']|["']$/g, ''); // Remove quotes
    altText = altText.replace(/\n/g, ' ').trim(); // Remove newlines
    
    // Ensure it's not too long
    if (altText.length > 125) {
      altText = altText.substring(0, 122) + '...';
    }
    
    return altText;
  } catch (error) {
    console.error(`Error generating alt text for ${filename}:`, error.message);
    return null;
  }
}

// Generate TypeScript mapping file
function generateTypeScriptMapping(altTextMap) {
  const entries = Object.entries(altTextMap)
    .map(([path, alt]) => `  '${path}': '${alt.replace(/'/g, "\\'")}'`)
    .join(',\n');

  return `/**
 * Auto-generated Alt Text Mapping
 * Generated by: scripts/generate-alt-text-gemini.js
 * Last updated: ${new Date().toISOString()}
 * 
 * Usage:
 *   import { getAltText } from './altTextMap';
 *   <img src={imagePath} alt={getAltText(imagePath)} />
 */

export const altTextMap: Record<string, string> = {
${entries}
};

/**
 * Get optimized alt text for an image path
 * Falls back to extracting name from filename if not found
 */
export function getAltText(imagePath: string, fallback?: string): string {
  if (altTextMap[imagePath]) {
    return altTextMap[imagePath];
  }
  
  // Fallback: extract readable name from filename
  if (fallback) return fallback;
  
  const filename = imagePath.split('/').pop() || '';
  const name = filename.replace(/\\.(png|jpg|jpeg|webp)$/i, '');
  return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
`;
}

// Main function
async function main() {
  console.log('\n');
  log('╔═══════════════════════════════════════════════════════════╗', 'cyan');
  log('║     🖼️  GEMINI PRO ALT TEXT GENERATOR FOR SCREENED.COM    ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════════╝', 'cyan');
  console.log('');

  log(`📋 Settings:`, 'cyan');
  log(`   • Mode: ${dryRun ? 'DRY RUN (preview only)' : 'LIVE'}`);
  log(`   • Update source files: ${updateFiles ? 'Yes' : 'No'}`);
  if (specificFolder) log(`   • Target folder: ${specificFolder}`);
  console.log('');

  const images = getImageFiles();
  
  if (images.length === 0) {
    log('No images found to process.', 'yellow');
    return;
  }

  log(`📁 Found ${images.length} images to analyze:`, 'green');
  
  // Group by folder
  const byFolder = images.reduce((acc, img) => {
    acc[img.folder] = (acc[img.folder] || 0) + 1;
    return acc;
  }, {});
  
  for (const [folder, count] of Object.entries(byFolder)) {
    log(`   • ${folder}: ${count} images`, 'dim');
  }
  console.log('');

  if (dryRun) {
    log('🔍 DRY RUN - Showing first 3 images only', 'yellow');
    console.log('');
  }

  const altTextMap = {};
  const limit = dryRun ? 3 : images.length;

  for (let i = 0; i < Math.min(limit, images.length); i++) {
    const img = images[i];
    const progress = `[${i + 1}/${dryRun ? limit : images.length}]`;
    
    process.stdout.write(`${progress} Analyzing ${img.relativePath}... `);
    
    const altText = await generateAltText(img.fullPath, img.folder, img.filename);
    
    if (altText) {
      altTextMap[img.relativePath] = altText;
      log(`✓`, 'green');
      log(`   📝 "${altText}"`, 'magenta');
    } else {
      log(`✗ Failed`, 'red');
    }

    // Rate limiting - small delay between requests
    if (i < limit - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log('');

  if (!dryRun && Object.keys(altTextMap).length > 0) {
    // Save JSON mapping
    fs.writeFileSync(CONFIG.outputJson, JSON.stringify(altTextMap, null, 2));
    log(`📄 Saved JSON mapping to: alt-text-mapping.json`, 'green');

    // Generate and save TypeScript file
    const tsContent = generateTypeScriptMapping(altTextMap);
    
    // Ensure utils directory exists
    const utilsDir = path.dirname(CONFIG.outputFile);
    if (!fs.existsSync(utilsDir)) {
      fs.mkdirSync(utilsDir, { recursive: true });
    }
    
    fs.writeFileSync(CONFIG.outputFile, tsContent);
    log(`📄 Saved TypeScript mapping to: src/utils/altTextMap.ts`, 'green');
  }

  // Summary
  console.log('');
  log('═══════════════════════════════════════════════════════════', 'cyan');
  log('📊 SUMMARY', 'cyan');
  log('═══════════════════════════════════════════════════════════', 'cyan');
  log(`   ✅ Processed: ${Object.keys(altTextMap).length} images`);
  log(`   📝 Alt texts generated: ${Object.keys(altTextMap).length}`);
  
  if (!dryRun) {
    log(`   📁 Output: alt-text-mapping.json`, 'dim');
    log(`   📁 Output: src/utils/altTextMap.ts`, 'dim');
  }
  
  console.log('');
  log('💡 Next steps:', 'yellow');
  log('   1. Review generated alt texts in alt-text-mapping.json');
  log('   2. Import getAltText from src/utils/altTextMap.ts in components');
  log('   3. Use: <img src={path} alt={getAltText(path)} />');
  console.log('');
}

main().catch(error => {
  log(`Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
