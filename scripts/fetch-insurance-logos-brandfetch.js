import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.BRANDFETCH_API_KEY;
if (!API_KEY) {
  console.error('❌ Error: BRANDFETCH_API_KEY not set in .env file');
  process.exit(1);
}

// Insurance companies with their domains
const insuranceCompanies = [
  // Car Insurance
  { name: 'geico', domain: 'geico.com' },
  { name: 'progressive', domain: 'progressive.com' },
  { name: 'statefarm', domain: 'statefarm.com' },
  { name: 'allstate', domain: 'allstate.com' },
  { name: 'libertymutual', domain: 'libertymutual.com' },
  { name: 'nationwide', domain: 'nationwide.com' },
  { name: 'farmers', domain: 'farmers.com' },
  { name: 'usaa', domain: 'usaa.com' },
  
  // Life Insurance
  { name: 'prudential', domain: 'prudential.com' },
  { name: 'metlife', domain: 'metlife.com' },
  { name: 'newyorklife', domain: 'newyorklife.com' },
  { name: 'northwestern', domain: 'northwesternmutual.com' },
  { name: 'massmutual', domain: 'massmutual.com' },
  { name: 'havenlife', domain: 'havenlife.com' },
  
  // Home/Renters
  { name: 'travelers', domain: 'travelers.com' },
  { name: 'lemonade', domain: 'lemonade.com' },
  { name: 'amica', domain: 'amica.com' },
  { name: 'erie', domain: 'erieinsurance.com' },
  { name: 'chubb', domain: 'chubb.com' },
];

async function fetchBrandData(domain) {
  const url = `https://api.brandfetch.io/v2/brands/${domain}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error}`);
  }
  
  return response.json();
}

async function downloadImage(url, outputPath) {
  // Use fetch to handle redirects automatically
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  return true;
}

function findBestLogo(brandData) {
  // Priority: logo > symbol > icon
  // Format priority: svg > png
  // Theme priority: light (for white backgrounds)
  
  const logos = brandData.logos || [];
  
  // First try to find a "logo" type (full logo with text)
  let logo = logos.find(l => l.type === 'logo');
  if (!logo) {
    logo = logos.find(l => l.type === 'symbol');
  }
  if (!logo) {
    logo = logos[0];
  }
  
  if (!logo || !logo.formats) return null;
  
  // Find best format - prefer PNG for consistency
  const formats = logo.formats;
  
  // Try to find PNG first (easier to work with)
  let bestFormat = formats.find(f => f.format === 'png' && f.background === 'transparent');
  if (!bestFormat) {
    bestFormat = formats.find(f => f.format === 'png');
  }
  if (!bestFormat) {
    bestFormat = formats.find(f => f.format === 'svg');
  }
  if (!bestFormat) {
    bestFormat = formats[0];
  }
  
  return bestFormat?.src;
}

async function main() {
  const outputDir = path.join(__dirname, '../public/insurance-logos');
  
  // Create backup of existing logos
  const backupDir = path.join(__dirname, '../public/insurance-logos-ai-backup');
  if (fs.existsSync(outputDir) && !fs.existsSync(backupDir)) {
    fs.cpSync(outputDir, backupDir, { recursive: true });
    console.log('📁 Backed up existing AI logos to insurance-logos-ai-backup/\n');
  }
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('=== Fetching Real Insurance Logos via Brandfetch ===\n');
  
  let successCount = 0;
  let failedCompanies = [];
  
  for (let i = 0; i < insuranceCompanies.length; i++) {
    const company = insuranceCompanies[i];
    console.log(`[${i + 1}/${insuranceCompanies.length}] Fetching ${company.name} (${company.domain})...`);
    
    try {
      const brandData = await fetchBrandData(company.domain);
      const logoUrl = findBestLogo(brandData);
      
      if (logoUrl) {
        const ext = logoUrl.includes('.svg') ? 'svg' : 'png';
        const outputPath = path.join(outputDir, `${company.name}.${ext}`);
        
        await downloadImage(logoUrl, outputPath);
        console.log(`   ✓ Downloaded ${company.name}.${ext}`);
        successCount++;
      } else {
        console.log(`   ⚠ No suitable logo found for ${company.name}`);
        failedCompanies.push(company.name);
      }
    } catch (err) {
      console.log(`   ✗ Error: ${err.message}`);
      failedCompanies.push(company.name);
    }
    
    // Small delay to be nice to the API
    if (i < insuranceCompanies.length - 1) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log(`\n✅ Done! Downloaded ${successCount}/${insuranceCompanies.length} logos`);
  
  if (failedCompanies.length > 0) {
    console.log(`\n⚠ Failed companies: ${failedCompanies.join(', ')}`);
  }
}

main().catch(console.error);
