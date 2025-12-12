import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRANDFETCH_API_KEY = process.env.BRANDFETCH_API_KEY;

const banks = [
  { name: 'Varo Bank', domain: 'varo.com', slug: 'varo' },
  { name: 'Openbank', domain: 'openbank.com', slug: 'openbank' },
  { name: 'EverBank', domain: 'everbank.com', slug: 'everbank' },
  { name: 'Newtek Bank', domain: 'newtekbank.com', slug: 'newtek' },
  { name: 'Marcus by Goldman Sachs', domain: 'marcus.com', slug: 'marcus' },
  { name: 'Forbright Bank', domain: 'forbrightbank.com', slug: 'forbright' },
  { name: 'Capital One 360', domain: 'capitalone.com', slug: 'capital-one' },
  { name: 'American Express', domain: 'americanexpress.com', slug: 'amex' },
  { name: 'SoFi', domain: 'sofi.com', slug: 'sofi' },
  { name: 'Synchrony Bank', domain: 'synchrony.com', slug: 'synchrony' },
];

const outputDir = path.join(__dirname, '../public/bank-logos');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function fetchBrandData(domain) {
  const url = `https://api.brandfetch.io/v2/brands/${domain}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${BRANDFETCH_API_KEY}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Brandfetch API error: ${response.status}`);
  }
  
  return response.json();
}

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }
  
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
  return true;
}

function findBestLogo(logos) {
  if (!logos || logos.length === 0) return null;
  
  // Priority: 1) logo type with dark theme (colored for light backgrounds)
  //           2) logo type any theme
  //           3) symbol type with dark theme
  //           4) symbol type any
  //           5) first available
  
  const priorities = [
    logos.find(l => l.type === 'logo' && l.theme === 'dark'),
    logos.find(l => l.type === 'logo'),
    logos.find(l => l.type === 'symbol' && l.theme === 'dark'),
    logos.find(l => l.type === 'symbol'),
    logos[0]
  ];
  
  const selectedLogo = priorities.find(l => l !== undefined);
  if (!selectedLogo || !selectedLogo.formats) return null;
  
  // Find best format: prefer PNG with transparent background, then PNG, then SVG
  const formats = selectedLogo.formats;
  const pngTransparent = formats.find(f => f.format === 'png' && f.background === 'transparent');
  const png = formats.find(f => f.format === 'png');
  const svg = formats.find(f => f.format === 'svg');
  
  return pngTransparent || png || svg || formats[0];
}

async function main() {
  const useBrandfetch = !!BRANDFETCH_API_KEY;
  
  if (!useBrandfetch) {
    console.log('⚠️  BRANDFETCH_API_KEY not set - using Clearbit fallback');
  }
  
  console.log('🏦 Fetching bank logos...\n');
  
  const results = [];
  
  for (const bank of banks) {
    console.log(`📥 Fetching: ${bank.name} (${bank.domain})...`);
    
    let success = false;
    
    // Try Brandfetch first if API key available
    if (useBrandfetch && !success) {
      try {
        const brandData = await fetchBrandData(bank.domain);
        const bestLogo = findBestLogo(brandData.logos);
        
        if (bestLogo && bestLogo.src) {
          const ext = bestLogo.format || 'png';
          const filename = `${bank.slug}.${ext}`;
          const filepath = path.join(outputDir, filename);
          
          await downloadImage(bestLogo.src, filepath);
          console.log(`   ✅ Saved: ${filename} (Brandfetch)`);
          results.push({ ...bank, logoPath: `/bank-logos/${filename}`, source: 'brandfetch' });
          success = true;
        }
      } catch (error) {
        console.log(`   ⚠️  Brandfetch failed: ${error.message}`);
      }
    }
    
    // Try Clearbit as fallback
    if (!success) {
      try {
        const clearbitUrl = `https://logo.clearbit.com/${bank.domain}`;
        const filename = `${bank.slug}.png`;
        const filepath = path.join(outputDir, filename);
        await downloadImage(clearbitUrl, filepath);
        console.log(`   ✅ Saved: ${filename} (Clearbit)`);
        results.push({ ...bank, logoPath: `/bank-logos/${filename}`, source: 'clearbit' });
        success = true;
      } catch (clearbitError) {
        console.log(`   ❌ Clearbit failed: ${clearbitError.message}`);
      }
    }
    
    if (!success) {
      console.log(`   ❌ All sources failed. Will need manual logo.`);
      results.push({ ...bank, logoPath: null, source: 'fallback' });
    }
    
    // Rate limiting
    await new Promise(r => setTimeout(r, 300));
  }
  
  // Generate TypeScript utility file
  const tsContent = `// Auto-generated bank logo map
// Generated on ${new Date().toISOString()}

export const bankLogos: Record<string, string> = {
${results.filter(r => r.logoPath).map(r => `  "${r.name}": "${r.logoPath}",
  "${r.slug}": "${r.logoPath}",`).join('\n')}
};

export function getBankLogo(nameOrSlug: string): string | null {
  const key = nameOrSlug.toLowerCase();
  // Try exact match first
  if (bankLogos[nameOrSlug]) return bankLogos[nameOrSlug];
  // Try lowercase match
  for (const [k, v] of Object.entries(bankLogos)) {
    if (k.toLowerCase() === key) return v;
  }
  return null;
}
`;

  const tsPath = path.join(__dirname, '../src/utils/bankLogoMap.ts');
  fs.writeFileSync(tsPath, tsContent);
  console.log(`\n✅ Generated: src/utils/bankLogoMap.ts`);
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Total: ${banks.length}`);
  console.log(`   Success: ${results.filter(r => r.logoPath).length}`);
  console.log(`   Failed: ${results.filter(r => !r.logoPath).length}`);
}

main().catch(console.error);

