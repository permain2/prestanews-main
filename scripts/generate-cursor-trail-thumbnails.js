import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Credit cards to include (8 total)
const creditCards = [
    'amex-platinum.png',
    'amex-gold.png',
    'chase-sapphire-preferred.png',
    'capital-one-venture-x.png',
    'citi-double-cash.png',
    'blue-cash-preferred.png',
    'discover-it-balance-transfer.png',
    'delta-skymiles-reserve.png',
];

// Insurance logos to include (7 total)
const insuranceLogos = [
    'geico.png',
    'progressive.png',
    'statefarm.png',
    'allstate.png',
    'lemonade.png',
    'nationwide.png',
    'prudential.png',
];

async function generateThumbnails() {
    const publicDir = path.join(process.cwd(), 'public');
    const outputDir = path.join(publicDir, 'cursor-trail');
    
    // Ensure output directories exist
    fs.mkdirSync(path.join(outputDir, 'cards'), { recursive: true });
    fs.mkdirSync(path.join(outputDir, 'insurance'), { recursive: true });
    
    console.log('Generating credit card thumbnails...');
    
    // Process credit cards - resize to 120px width (cards are rectangular)
    for (const card of creditCards) {
        const inputPath = path.join(publicDir, 'credit-cards', card);
        const outputPath = path.join(outputDir, 'cards', card);
        
        if (!fs.existsSync(inputPath)) {
            console.log(`  Skipping ${card} - not found`);
            continue;
        }
        
        try {
            await sharp(inputPath)
                .resize(120, null, { fit: 'inside' })
                .png({ quality: 80, compressionLevel: 9 })
                .toFile(outputPath);
            
            const stats = fs.statSync(outputPath);
            console.log(`  Created ${card} (${(stats.size / 1024).toFixed(1)}KB)`);
        } catch (err) {
            console.error(`  Error processing ${card}:`, err.message);
        }
    }
    
    console.log('\nGenerating insurance logo thumbnails...');
    
    // Process insurance logos - resize to 80px (logos are square-ish)
    for (const logo of insuranceLogos) {
        const inputPath = path.join(publicDir, 'insurance-logos', logo);
        const outputPath = path.join(outputDir, 'insurance', logo);
        
        if (!fs.existsSync(inputPath)) {
            console.log(`  Skipping ${logo} - not found`);
            continue;
        }
        
        try {
            await sharp(inputPath)
                .resize(80, 80, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                .png({ quality: 80, compressionLevel: 9 })
                .toFile(outputPath);
            
            const stats = fs.statSync(outputPath);
            console.log(`  Created ${logo} (${(stats.size / 1024).toFixed(1)}KB)`);
        } catch (err) {
            console.error(`  Error processing ${logo}:`, err.message);
        }
    }
    
    console.log('\nDone! Thumbnails saved to public/cursor-trail/');
}

generateThumbnails().catch(console.error);


