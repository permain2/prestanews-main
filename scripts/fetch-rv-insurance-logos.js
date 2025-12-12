import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRANDFETCH_API_KEY = process.env.BRANDFETCH_API_KEY;

const companies = [
  { name: 'Progressive', domain: 'progressive.com', slug: 'progressive' },
  { name: 'Good Sam Insurance', domain: 'goodsam.com', slug: 'good-sam' },
  { name: 'National General', domain: 'nationalgeneral.com', slug: 'national-general' },
  { name: 'Foremost', domain: 'foremost.com', slug: 'foremost' },
  { name: 'Safeco', domain: 'safeco.com', slug: 'safeco' },
  { name: 'GEICO', domain: 'geico.com', slug: 'geico' },
  { name: 'Roamly', domain: 'roamly.com', slug: 'roamly' },
  { name: 'State Farm', domain: 'statefarm.com', slug: 'state-farm' },
];

const outputDir = path.join(__dirname, '../public/rv-insurance-logos');

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
  
  const priorities = [
    logos.find(l => l.type === 'logo' && l.theme === 'dark'),
    logos.find(l => l.type === 'logo'),
    logos.find(l => l.type === 'symbol' && l.theme === 'dark'),
    logos.find(l => l.type === 'symbol'),
    logos[0]
  ];
  
  const selectedLogo = priorities.find(l => l !== undefined);
  if (!selectedLogo || !selectedLogo.formats) return null;
  
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
  
  console.log('🚐 Fetching RV insurance company logos...\n');
  
  const results = [];
  
  for (const company of companies) {
    console.log(`📥 Fetching: ${company.name} (${company.domain})...`);
    
    let success = false;
    
    // Try Brandfetch first if API key available
    if (useBrandfetch && !success) {
      try {
        const brandData = await fetchBrandData(company.domain);
        const bestLogo = findBestLogo(brandData.logos);
        
        if (bestLogo && bestLogo.src) {
          const ext = bestLogo.format || 'png';
          const filename = `${company.slug}.${ext}`;
          const filepath = path.join(outputDir, filename);
          
          await downloadImage(bestLogo.src, filepath);
          console.log(`   ✅ Saved: ${filename} (Brandfetch)`);
          results.push({ ...company, logoPath: `/rv-insurance-logos/${filename}`, source: 'brandfetch' });
          success = true;
        }
      } catch (error) {
        console.log(`   ⚠️  Brandfetch failed: ${error.message}`);
      }
    }
    
    // Try Clearbit as fallback
    if (!success) {
      try {
        const clearbitUrl = `https://logo.clearbit.com/${company.domain}`;
        const filename = `${company.slug}.png`;
        const filepath = path.join(outputDir, filename);
        await downloadImage(clearbitUrl, filepath);
        console.log(`   ✅ Saved: ${filename} (Clearbit)`);
        results.push({ ...company, logoPath: `/rv-insurance-logos/${filename}`, source: 'clearbit' });
        success = true;
      } catch (clearbitError) {
        console.log(`   ❌ Clearbit failed: ${clearbitError.message}`);
      }
    }
    
    if (!success) {
      console.log(`   ❌ All sources failed. Will need manual logo.`);
      results.push({ ...company, logoPath: null, source: 'fallback' });
    }
    
    // Rate limiting
    await new Promise(r => setTimeout(r, 300));
  }
  
  // Generate TypeScript utility file
  const tsContent = `// Auto-generated RV insurance logo map
// Generated on ${new Date().toISOString()}

export const rvInsuranceLogos: Record<string, string> = {
${results.filter(r => r.logoPath).map(r => `  "${r.name}": "${r.logoPath}",
  "${r.slug}": "${r.logoPath}",`).join('\n')}
};

export function getRVInsuranceLogo(nameOrSlug: string): string | null {
  const key = nameOrSlug.toLowerCase();
  // Try exact match first
  if (rvInsuranceLogos[nameOrSlug]) return rvInsuranceLogos[nameOrSlug];
  // Try lowercase match
  for (const [k, v] of Object.entries(rvInsuranceLogos)) {
    if (k.toLowerCase() === key) return v;
  }
  return null;
}
`;

  const tsPath = path.join(__dirname, '../src/utils/rvInsuranceLogoMap.ts');
  fs.writeFileSync(tsPath, tsContent);
  console.log(`\n✅ Generated: src/utils/rvInsuranceLogoMap.ts`);
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Total: ${companies.length}`);
  console.log(`   Success: ${results.filter(r => r.logoPath).length}`);
  console.log(`   Failed: ${results.filter(r => !r.logoPath).length}`);
}

main().catch(console.error);

