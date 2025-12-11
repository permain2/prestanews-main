#!/usr/bin/env node
/**
 * Imagify Image Optimization Script
 * 
 * Uses Imagify Pro API to optimize all images in the public folder.
 * Run with: node scripts/optimize-images-imagify.js
 * 
 * Options:
 * - --dry-run: Show what would be optimized without making changes
 * - --aggressive: Use aggressive compression (smaller files, slight quality loss)
 * - --ultra: Use ultra compression (smallest files, noticeable quality loss)
 * - --webp: Also generate WebP versions of images
 * - --folder=<path>: Only optimize images in a specific folder
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - load from .env
const CONFIG = {
  apiKey: process.env.IMAGIFY_API_KEY || '',
  apiEndpoint: 'https://app.imagify.io/api/upload/',
  publicDir: path.join(__dirname, '..', 'public'),
  backupDir: path.join(__dirname, '..', 'public-backup'),
  supportedFormats: ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
  // Folders to optimize
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
  ],
};

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const generateWebP = args.includes('--webp');
const folderArg = args.find(arg => arg.startsWith('--folder='));
const specificFolder = folderArg ? folderArg.split('=')[1] : null;

// Compression level: normal (default), aggressive, or ultra
let compressionLevel = 'normal';
if (args.includes('--ultra')) compressionLevel = 'ultra';
else if (args.includes('--aggressive')) compressionLevel = 'aggressive';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatPercent(original, optimized) {
  const saved = ((original - optimized) / original) * 100;
  return saved.toFixed(1) + '%';
}

// Get all image files from specified folders
function getImageFiles() {
  const images = [];
  const folders = specificFolder ? [specificFolder] : CONFIG.imageFolders;

  for (const folder of folders) {
    const folderPath = path.join(CONFIG.publicDir, folder);
    
    if (!fs.existsSync(folderPath)) {
      log(`Folder not found: ${folder}`, 'yellow');
      continue;
    }

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (CONFIG.supportedFormats.includes(ext)) {
        images.push({
          folder,
          filename: file,
          fullPath: path.join(folderPath, file),
          relativePath: path.join(folder, file),
        });
      }
    }
  }

  return images;
}

// Optimize single image via Imagify API
async function optimizeImage(imagePath, level = 'normal') {
  return new Promise((resolve, reject) => {
    if (!CONFIG.apiKey) {
      reject(new Error('IMAGIFY_API_KEY environment variable not set'));
      return;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const filename = path.basename(imagePath);
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).slice(2);

    // Build multipart form data
    let body = '';
    
    // Add optimization level
    body += `--${boundary}\r\n`;
    body += 'Content-Disposition: form-data; name="optimization_level"\r\n\r\n';
    body += level + '\r\n';

    // Add image data
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="image"; filename="${filename}"\r\n`;
    body += 'Content-Type: application/octet-stream\r\n\r\n';

    const bodyStart = Buffer.from(body);
    const bodyEnd = Buffer.from(`\r\n--${boundary}--\r\n`);
    const fullBody = Buffer.concat([bodyStart, imageBuffer, bodyEnd]);

    const options = {
      hostname: 'app.imagify.io',
      port: 443,
      path: '/api/upload/',
      method: 'POST',
      headers: {
        'Authorization': `token ${CONFIG.apiKey}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': fullBody.length,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.success === false) {
            reject(new Error(result.message || 'Optimization failed'));
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(new Error(`Invalid API response: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(fullBody);
    req.end();
  });
}

// Download optimized image
async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

// Main optimization function
async function optimizeAllImages() {
  console.log('\n');
  log('╔═══════════════════════════════════════════════════════════╗', 'cyan');
  log('║          🖼️  IMAGIFY IMAGE OPTIMIZATION SCRIPT            ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════════╝', 'cyan');
  console.log('');

  if (!CONFIG.apiKey) {
    log('❌ Error: IMAGIFY_API_KEY environment variable not set', 'red');
    log('   Set it with: export IMAGIFY_API_KEY=your_api_key_here', 'dim');
    process.exit(1);
  }

  log(`📋 Settings:`, 'cyan');
  log(`   • Compression level: ${compressionLevel}`);
  log(`   • Generate WebP: ${generateWebP ? 'Yes' : 'No'}`);
  log(`   • Mode: ${dryRun ? 'DRY RUN (no changes)' : 'LIVE'}`);
  if (specificFolder) log(`   • Target folder: ${specificFolder}`);
  console.log('');

  const images = getImageFiles();
  
  if (images.length === 0) {
    log('No images found to optimize.', 'yellow');
    return;
  }

  log(`📁 Found ${images.length} images to optimize:`, 'green');
  
  // Group by folder for display
  const byFolder = images.reduce((acc, img) => {
    acc[img.folder] = (acc[img.folder] || 0) + 1;
    return acc;
  }, {});
  
  for (const [folder, count] of Object.entries(byFolder)) {
    log(`   • ${folder}: ${count} images`, 'dim');
  }
  console.log('');

  if (dryRun) {
    log('🔍 DRY RUN - No changes will be made', 'yellow');
    console.log('');
    for (const img of images) {
      const stats = fs.statSync(img.fullPath);
      log(`   Would optimize: ${img.relativePath} (${formatBytes(stats.size)})`);
    }
    return;
  }

  // Create backup directory
  if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    log(`📦 Created backup directory: ${CONFIG.backupDir}`, 'dim');
  }

  let totalOriginal = 0;
  let totalOptimized = 0;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const progress = `[${i + 1}/${images.length}]`;
    
    try {
      const originalStats = fs.statSync(img.fullPath);
      const originalSize = originalStats.size;
      totalOriginal += originalSize;

      process.stdout.write(`${progress} Optimizing ${img.relativePath}... `);

      // Backup original
      const backupPath = path.join(CONFIG.backupDir, img.folder);
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      fs.copyFileSync(img.fullPath, path.join(backupPath, img.filename));

      // Optimize via Imagify API
      const result = await optimizeImage(img.fullPath, compressionLevel);
      
      if (result.image) {
        // Download optimized image
        await downloadImage(result.image, img.fullPath);
        
        const newStats = fs.statSync(img.fullPath);
        const newSize = newStats.size;
        totalOptimized += newSize;
        
        const saved = formatPercent(originalSize, newSize);
        log(`✓ ${formatBytes(originalSize)} → ${formatBytes(newSize)} (-${saved})`, 'green');
        successCount++;

        // Generate WebP version if requested
        if (generateWebP && !img.filename.endsWith('.webp')) {
          const webpPath = img.fullPath.replace(/\.(png|jpg|jpeg|gif)$/i, '.webp');
          // Note: Imagify can generate WebP - would need additional API call
          // For now, could use sharp locally for WebP conversion
        }
      } else {
        log('✓ Already optimized', 'dim');
        totalOptimized += originalSize;
        successCount++;
      }

      // Small delay to avoid API rate limits
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      log(`✗ Error: ${error.message}`, 'red');
      errorCount++;
    }
  }

  // Summary
  console.log('');
  log('═══════════════════════════════════════════════════════════', 'cyan');
  log('📊 OPTIMIZATION SUMMARY', 'cyan');
  log('═══════════════════════════════════════════════════════════', 'cyan');
  log(`   ✅ Successful: ${successCount} images`);
  if (errorCount > 0) log(`   ❌ Failed: ${errorCount} images`, 'red');
  log(`   📦 Original size: ${formatBytes(totalOriginal)}`);
  log(`   📦 Optimized size: ${formatBytes(totalOptimized)}`);
  log(`   💾 Total saved: ${formatBytes(totalOriginal - totalOptimized)} (${formatPercent(totalOriginal, totalOptimized)})`);
  log(`   📁 Backups saved to: ${CONFIG.backupDir}`, 'dim');
  console.log('');
}

// Run the script
optimizeAllImages().catch(error => {
  log(`Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
