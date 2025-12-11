import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../public/insurance-logos');
const smallDir = path.join(__dirname, '../public/insurance-logos-small');

// Create output directory
if (!fs.existsSync(smallDir)) {
  fs.mkdirSync(smallDir, { recursive: true });
}

async function optimizeLogos() {
  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'));
  
  console.log('=== Creating Optimized Small Insurance Logos ===\n');
  console.log(`Source: ${sourceDir}`);
  console.log(`Output: ${smallDir}\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    const outputPath = path.join(smallDir, file);
    
    const originalSize = fs.statSync(inputPath).size;
    totalOriginal += originalSize;
    
    try {
      // Resize to max 200px width, optimize with high compression
      await sharp(inputPath)
        .resize(200, null, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .png({ 
          quality: 80,
          compressionLevel: 9,
          palette: true // Use palette mode for smaller files
        })
        .toFile(outputPath);
      
      const newSize = fs.statSync(outputPath).size;
      totalOptimized += newSize;
      
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log(`✓ ${file}: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (${savings}% smaller)`);
    } catch (err) {
      console.log(`✗ ${file}: ${err.message}`);
    }
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Total original: ${(totalOriginal/1024).toFixed(1)}KB`);
  console.log(`Total optimized: ${(totalOptimized/1024).toFixed(1)}KB`);
  console.log(`Total savings: ${((totalOriginal - totalOptimized)/1024).toFixed(1)}KB (${((totalOriginal - totalOptimized)/totalOriginal * 100).toFixed(1)}%)`);
}

optimizeLogos().catch(console.error);


