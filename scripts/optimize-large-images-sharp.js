#!/usr/bin/env node
/**
 * Sharp Image Optimization Script
 * 
 * Uses Sharp to optimize large images that failed with Imagify API.
 * Resizes images to max 2000px width and compresses with quality 80.
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  publicDir: path.join(__dirname, '..', 'public'),
  backupDir: path.join(__dirname, '..', 'public-backup'),
  // Folders with large images that failed Imagify
  imageFolders: [
    'guides-images',
    'insurance-images',
    'insurance-heroes',
    'news-images',
    'credit-cards', // Small PNGs that failed
  ],
  // Optimization settings
  maxWidth: 1920,
  jpegQuality: 80,
  pngQuality: 80,
};

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

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const originalStats = fs.statSync(filePath);
  const originalSize = originalStats.size;

  let image = sharp(filePath);
  const metadata = await image.metadata();

  // Resize if wider than maxWidth
  if (metadata.width > CONFIG.maxWidth) {
    image = image.resize(CONFIG.maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside',
    });
  }

  // Apply format-specific optimization
  if (ext === '.jpg' || ext === '.jpeg') {
    image = image.jpeg({
      quality: CONFIG.jpegQuality,
      mozjpeg: true,
    });
  } else if (ext === '.png') {
    image = image.png({
      quality: CONFIG.pngQuality,
      compressionLevel: 9,
      palette: true,
    });
  } else if (ext === '.webp') {
    image = image.webp({
      quality: CONFIG.jpegQuality,
    });
  }

  // Write to buffer first
  const buffer = await image.toBuffer();
  
  // Only save if smaller
  if (buffer.length < originalSize) {
    fs.writeFileSync(filePath, buffer);
    return { originalSize, newSize: buffer.length, optimized: true };
  }
  
  return { originalSize, newSize: originalSize, optimized: false };
}

async function main() {
  console.log('\n');
  log('╔═══════════════════════════════════════════════════════════╗', 'cyan');
  log('║        🖼️  SHARP LOCAL IMAGE OPTIMIZATION SCRIPT          ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════════╝', 'cyan');
  console.log('');

  const images = [];
  
  for (const folder of CONFIG.imageFolders) {
    const folderPath = path.join(CONFIG.publicDir, folder);
    if (!fs.existsSync(folderPath)) continue;
    
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        images.push({
          folder,
          filename: file,
          fullPath: path.join(folderPath, file),
          relativePath: path.join(folder, file),
        });
      }
    }
  }

  log(`📁 Found ${images.length} images to optimize`, 'green');
  console.log('');

  let totalOriginal = 0;
  let totalOptimized = 0;
  let successCount = 0;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const progress = `[${i + 1}/${images.length}]`;
    
    try {
      process.stdout.write(`${progress} Optimizing ${img.relativePath}... `);
      
      // Backup if not already backed up
      const backupPath = path.join(CONFIG.backupDir, img.folder);
      const backupFile = path.join(backupPath, img.filename);
      if (!fs.existsSync(backupFile)) {
        if (!fs.existsSync(backupPath)) {
          fs.mkdirSync(backupPath, { recursive: true });
        }
        fs.copyFileSync(img.fullPath, backupFile);
      }
      
      const result = await optimizeImage(img.fullPath);
      totalOriginal += result.originalSize;
      totalOptimized += result.newSize;
      
      if (result.optimized) {
        const saved = formatPercent(result.originalSize, result.newSize);
        log(`✓ ${formatBytes(result.originalSize)} → ${formatBytes(result.newSize)} (-${saved})`, 'green');
        successCount++;
      } else {
        log(`✓ Already optimized`, 'dim');
        successCount++;
      }
    } catch (error) {
      log(`✗ Error: ${error.message}`, 'red');
    }
  }

  // Summary
  console.log('');
  log('═══════════════════════════════════════════════════════════', 'cyan');
  log('📊 OPTIMIZATION SUMMARY', 'cyan');
  log('═══════════════════════════════════════════════════════════', 'cyan');
  log(`   ✅ Processed: ${successCount} images`);
  log(`   📦 Original size: ${formatBytes(totalOriginal)}`);
  log(`   📦 Optimized size: ${formatBytes(totalOptimized)}`);
  log(`   💾 Total saved: ${formatBytes(totalOriginal - totalOptimized)} (${formatPercent(totalOriginal, totalOptimized)})`);
  console.log('');
}

main().catch(console.error);
