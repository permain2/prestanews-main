/**
 * Fetch Company Logos Script
 * 
 * Uses multiple logo APIs to find high-quality colored logos:
 * 1. Clearbit Logo API (free, no API key needed)
 * 2. Brandfetch API (requires API key for higher quality)
 * 3. Fallback to Google favicon service
 * 
 * Run: node scripts/fetch-company-logos.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Companies to fetch logos for
const companies = [
  // Home Warranty Companies
  { name: 'American Home Shield', domain: 'ahs.com', slug: 'american-home-shield' },
  { name: 'Choice Home Warranty', domain: 'choicehomewarranty.com', slug: 'choice-home-warranty' },
  { name: 'Select Home Warranty', domain: 'selecthomewarranty.com', slug: 'select-home-warranty' },
  { name: 'First American Home Warranty', domain: 'firstamhomewarranty.com', slug: 'first-american' },
  { name: 'Liberty Home Guard', domain: 'libertyhomeguard.com', slug: 'liberty-home-guard' },
  
  // Car Transport Companies
  { name: 'Montway Auto Transport', domain: 'montway.com', slug: 'montway' },
  { name: 'Ship A Car Direct', domain: 'shipacardirect.com', slug: 'ship-a-car-direct' },
  { name: 'AmeriFreight', domain: 'amerifreight.net', slug: 'amerifreight' },
  { name: 'Sherpa Auto Transport', domain: 'sherpaautotransport.com', slug: 'sherpa' },
  
  // Gold IRA Companies
  { name: 'Augusta Precious Metals', domain: 'augustapreciousmetals.com', slug: 'augusta' },
  { name: 'Goldco', domain: 'goldco.com', slug: 'goldco' },
  { name: 'American Hartford Gold', domain: 'americanhartfordgold.com', slug: 'american-hartford' },
  { name: 'Birch Gold Group', domain: 'birchgold.com', slug: 'birch-gold' },
  
  // Student Loan Companies
  { name: 'SoFi', domain: 'sofi.com', slug: 'sofi' },
  { name: 'Earnest', domain: 'earnest.com', slug: 'earnest' },
  { name: 'College Ave', domain: 'collegeavestudentloans.com', slug: 'college-ave' },
  { name: 'Sallie Mae', domain: 'salliemae.com', slug: 'sallie-mae' },
  
  // Savings Accounts
  { name: 'Marcus by Goldman Sachs', domain: 'marcus.com', slug: 'marcus' },
  { name: 'Ally Bank', domain: 'ally.com', slug: 'ally' },
  { name: 'Discover Bank', domain: 'discover.com', slug: 'discover-bank' },
  { name: 'Capital One', domain: 'capitalone.com', slug: 'capital-one' },
  { name: 'American Express', domain: 'americanexpress.com', slug: 'american-express' },
  
  // Mortgage Companies
  { name: 'Rocket Mortgage', domain: 'rocketmortgage.com', slug: 'rocket-mortgage' },
  { name: 'Better.com', domain: 'better.com', slug: 'better' },
  { name: 'LoanDepot', domain: 'loandepot.com', slug: 'loandepot' },
  { name: 'Guaranteed Rate', domain: 'rate.com', slug: 'guaranteed-rate' },
  
  // Internet Providers
  { name: 'Xfinity', domain: 'xfinity.com', slug: 'xfinity' },
  { name: 'AT&T', domain: 'att.com', slug: 'att' },
  { name: 'Verizon', domain: 'verizon.com', slug: 'verizon' },
  { name: 'T-Mobile', domain: 't-mobile.com', slug: 't-mobile' },
  { name: 'Spectrum', domain: 'spectrum.com', slug: 'spectrum' },
  
  // Security Cameras
  { name: 'Ring', domain: 'ring.com', slug: 'ring' },
  { name: 'Arlo', domain: 'arlo.com', slug: 'arlo' },
  { name: 'Nest', domain: 'store.google.com/category/nest_cams', slug: 'nest' },
  { name: 'Wyze', domain: 'wyze.com', slug: 'wyze' },
  { name: 'Blink', domain: 'blinkforhome.com', slug: 'blink' },
];

const outputDir = path.join(__dirname, '../public/company-logos');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Fetch logo using Clearbit (free, no API key)
function fetchClearbitLogo(domain, outputPath) {
  return new Promise((resolve, reject) => {
    // Clearbit Logo API - returns PNG
    const url = `https://logo.clearbit.com/${domain}?size=200`;
    
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
  console.log('🎨 Fetching company logos...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const company of companies) {
    const outputPath = path.join(outputDir, `${company.slug}.png`);
    
    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  ${company.name} - Already exists`);
      successCount++;
      continue;
    }
    
    try {
      // Try Clearbit first
      const clearbitSuccess = await fetchClearbitLogo(company.domain, outputPath);
      
      if (clearbitSuccess) {
        console.log(`✅ ${company.name} - Downloaded from Clearbit`);
        successCount++;
      } else {
        // Fallback to Google favicon
        const googleSuccess = await fetchGoogleFavicon(company.domain, outputPath);
        
        if (googleSuccess) {
          console.log(`✅ ${company.name} - Downloaded from Google (favicon)`);
          successCount++;
        } else {
          console.log(`❌ ${company.name} - Failed to download`);
          failCount++;
        }
      }
      
      // Rate limiting - wait 500ms between requests
      await new Promise(r => setTimeout(r, 500));
      
    } catch (error) {
      console.log(`❌ ${company.name} - Error: ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\n📊 Summary: ${successCount} successful, ${failCount} failed`);
  console.log(`📁 Logos saved to: ${outputDir}`);
  
  // Generate a logo map file
  const logoMap = {};
  companies.forEach(company => {
    const logoPath = `/company-logos/${company.slug}.png`;
    logoMap[company.name] = logoPath;
    logoMap[company.slug] = logoPath;
    // Also add lowercase versions
    logoMap[company.name.toLowerCase()] = logoPath;
  });
  
  const mapPath = path.join(__dirname, '../src/utils/companyLogoMap.ts');
  const mapContent = `/**
 * Company Logo Map
 * Auto-generated by scripts/fetch-company-logos.js
 */

export const companyLogos: Record<string, string> = ${JSON.stringify(logoMap, null, 2)};

export function getCompanyLogo(nameOrSlug: string): string | null {
  const key = nameOrSlug.toLowerCase();
  return companyLogos[key] || null;
}

export default companyLogos;
`;
  
  fs.writeFileSync(mapPath, mapContent);
  console.log(`\n📄 Logo map saved to: ${mapPath}`);
}

// Run the script
downloadLogos().catch(console.error);

