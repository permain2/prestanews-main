/**
 * Fetch Extended Car Warranty Company Logos
 * 
 * Uses multiple logo APIs to find high-quality colored logos:
 * 1. Clearbit Logo API (free, no API key needed)
 * 2. Brandfetch API (requires API key for higher quality) - if available
 * 3. Fallback to Google favicon service
 * 
 * Run: node scripts/fetch-warranty-logos.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Try to load dotenv if available
try {
  const dotenv = await import('dotenv');
  dotenv.config();
} catch (e) {
  // dotenv not installed, continue without it
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Extended Car Warranty Companies with their domains
const warrantyCompanies = [
  { name: 'CARCHEX', domain: 'carchex.com', slug: 'carchex' },
  { name: 'Endurance', domain: 'endurancewarranty.com', slug: 'endurance' },
  { name: 'CarShield', domain: 'carshield.com', slug: 'carshield' },
  { name: 'Olive', domain: 'olive.com', slug: 'olive' },
  { name: 'Protect My Car', domain: 'protectmycar.com', slug: 'protect-my-car' },
  { name: 'autopom!', domain: 'autopom.com', slug: 'autopom' },
  { name: 'Warranty Direct', domain: 'warrantydirect.com', slug: 'warranty-direct' },
  { name: 'Route 66', domain: 'route66warranty.com', slug: 'route-66' },
  { name: 'American Auto Shield', domain: 'americanautoshield.com', slug: 'american-auto-shield' },
  { name: 'CARCHEX Titanium', domain: 'carchex.com', slug: 'carchex-titanium' },
];

const outputDir = path.join(__dirname, '../public/warranty-logos');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Fetch logo using Clearbit (free, no API key)
function fetchClearbitLogo(domain, outputPath) {
  return new Promise((resolve, reject) => {
    // Clearbit Logo API - returns PNG with transparent background
    const url = `https://logo.clearbit.com/${domain}?size=200&format=png`;
    
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        file.close();
        const redirectUrl = response.headers.location;
        https.get(redirectUrl, (res) => {
          if (res.statusCode === 200) {
            const newFile = fs.createWriteStream(outputPath);
            res.pipe(newFile);
            newFile.on('finish', () => {
              newFile.close();
              resolve(true);
            });
          } else {
            fs.unlink(outputPath, () => {});
            resolve(false);
          }
        });
      } else {
        file.close();
        fs.unlink(outputPath, () => {});
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

// Try Brandfetch API if key is available
async function fetchBrandfetchLogo(domain, outputPath) {
  const API_KEY = process.env.BRANDFETCH_API_KEY;
  if (!API_KEY) return false;
  
  try {
    const response = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    
    if (!response.ok) return false;
    
    const brandData = await response.json();
    const logos = brandData.logos || [];
    
    // Find best logo - prefer colored logo with transparent background
    let logo = logos.find(l => l.type === 'logo' && l.theme === 'dark');
    if (!logo) logo = logos.find(l => l.type === 'logo');
    if (!logo) logo = logos.find(l => l.type === 'symbol');
    if (!logo) logo = logos[0];
    
    if (!logo || !logo.formats) return false;
    
    // Prefer PNG with transparent background
    let format = logo.formats.find(f => f.format === 'png' && f.background === 'transparent');
    if (!format) format = logo.formats.find(f => f.format === 'png');
    if (!format) format = logo.formats.find(f => f.format === 'svg');
    if (!format) format = logo.formats[0];
    
    if (!format?.src) return false;
    
    // Download the logo
    const logoResponse = await fetch(format.src);
    if (!logoResponse.ok) return false;
    
    const buffer = await logoResponse.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.log(`   Brandfetch error: ${err.message}`);
    return false;
  }
}

// Fallback to Google favicon service
function fetchGoogleFavicon(domain, outputPath) {
  return new Promise((resolve, reject) => {
    const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        file.close();
        fs.unlink(outputPath, () => {});
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function downloadLogos() {
  console.log('🚗 Fetching Extended Car Warranty Company Logos...\n');
  console.log('=' .repeat(50) + '\n');
  
  let successCount = 0;
  let failCount = 0;
  const results = [];
  
  for (const company of warrantyCompanies) {
    const outputPath = path.join(outputDir, `${company.slug}.png`);
    
    console.log(`[${warrantyCompanies.indexOf(company) + 1}/${warrantyCompanies.length}] ${company.name} (${company.domain})`);
    
    // Skip CARCHEX Titanium - use same logo as CARCHEX
    if (company.slug === 'carchex-titanium') {
      const sourceFile = path.join(outputDir, 'carchex.png');
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, outputPath);
        console.log(`   ✅ Copied from CARCHEX\n`);
        successCount++;
        results.push({ company: company.name, slug: company.slug, success: true, source: 'copy' });
        continue;
      }
    }
    
    // Skip if already exists and force flag not set
    if (fs.existsSync(outputPath) && !process.argv.includes('--force')) {
      console.log(`   ⏭️  Already exists (use --force to re-download)\n`);
      successCount++;
      results.push({ company: company.name, slug: company.slug, success: true, source: 'existing' });
      continue;
    }
    
    try {
      let downloaded = false;
      
      // Try Brandfetch first (best quality)
      if (process.env.BRANDFETCH_API_KEY) {
        downloaded = await fetchBrandfetchLogo(company.domain, outputPath);
        if (downloaded) {
          console.log(`   ✅ Downloaded from Brandfetch (high quality)\n`);
        }
      }
      
      // Try Clearbit if Brandfetch failed
      if (!downloaded) {
        downloaded = await fetchClearbitLogo(company.domain, outputPath);
        if (downloaded) {
          console.log(`   ✅ Downloaded from Clearbit\n`);
        }
      }
      
      // Fallback to Google favicon
      if (!downloaded) {
        downloaded = await fetchGoogleFavicon(company.domain, outputPath);
        if (downloaded) {
          console.log(`   ✅ Downloaded from Google (favicon fallback)\n`);
        }
      }
      
      if (downloaded) {
        successCount++;
        results.push({ company: company.name, slug: company.slug, success: true });
      } else {
        console.log(`   ❌ Failed to download from all sources\n`);
        failCount++;
        results.push({ company: company.name, slug: company.slug, success: false });
      }
      
      // Rate limiting - wait 500ms between requests
      await new Promise(r => setTimeout(r, 500));
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
      failCount++;
      results.push({ company: company.name, slug: company.slug, success: false, error: error.message });
    }
  }
  
  console.log('=' .repeat(50));
  console.log(`\n📊 Summary: ${successCount} successful, ${failCount} failed`);
  console.log(`📁 Logos saved to: ${outputDir}\n`);
  
  // Generate a logo map file
  const logoMap = {};
  warrantyCompanies.forEach(company => {
    const logoPath = `/warranty-logos/${company.slug}.png`;
    logoMap[company.name] = logoPath;
    logoMap[company.slug] = logoPath;
    logoMap[company.name.toLowerCase()] = logoPath;
  });
  
  const mapPath = path.join(__dirname, '../src/utils/warrantyLogoMap.ts');
  const mapContent = `/**
 * Warranty Company Logo Map
 * Auto-generated by scripts/fetch-warranty-logos.js
 * 
 * Usage:
 *   import { getWarrantyLogo } from '../utils/warrantyLogoMap';
 *   const logoUrl = getWarrantyLogo('CARCHEX');
 */

export const warrantyLogos: Record<string, string> = ${JSON.stringify(logoMap, null, 2)};

export function getWarrantyLogo(nameOrSlug: string): string | null {
  const key = nameOrSlug.toLowerCase();
  return warrantyLogos[key] || null;
}

// Default export for convenience
export default warrantyLogos;
`;
  
  fs.writeFileSync(mapPath, mapContent);
  console.log(`📄 Logo map saved to: ${mapPath}`);
  
  // List failed companies if any
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    console.log('\n⚠️  Failed companies (may need manual logos):');
    failed.forEach(f => console.log(`   - ${f.company}`));
    console.log('\nTip: You can manually add logos to public/warranty-logos/ with the slug name');
  }
}

// Run the script
downloadLogos().catch(console.error);

