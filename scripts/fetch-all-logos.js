/**
 * Master Logo Fetcher for All Categories
 * 
 * Uses Brandfetch API (primary) with Clearbit and Google favicon fallbacks.
 * 
 * Run: node scripts/fetch-all-logos.js [category]
 * Example: node scripts/fetch-all-logos.js pet-insurance
 * 
 * Categories: pet-insurance, vpn, antivirus, password-manager, 
 *             meal-delivery, moving, security, mattress, savings
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Load environment variables
try {
  const dotenv = await import('dotenv');
  dotenv.config();
} catch (e) {
  console.log('Note: dotenv not installed, using process.env directly');
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// COMPANY DATABASES BY CATEGORY
// =============================================================================

const COMPANIES = {
  'pet-insurance': [
    { name: 'Lemonade', domain: 'lemonade.com', slug: 'lemonade' },
    { name: 'Healthy Paws', domain: 'healthypawspetinsurance.com', slug: 'healthy-paws' },
    { name: 'Embrace', domain: 'embracepetinsurance.com', slug: 'embrace' },
    { name: 'Spot', domain: 'spotpetins.com', slug: 'spot' },
    { name: 'ASPCA', domain: 'aspcapetinsurance.com', slug: 'aspca' },
    { name: 'Pets Best', domain: 'petsbest.com', slug: 'pets-best' },
    { name: 'Nationwide', domain: 'petinsurance.com', slug: 'nationwide' },
    { name: 'Figo', domain: 'figopetinsurance.com', slug: 'figo' },
    { name: 'Trupanion', domain: 'trupanion.com', slug: 'trupanion' },
    { name: 'Pumpkin', domain: 'pumpkin.care', slug: 'pumpkin' },
    { name: 'ManyPets', domain: 'manypets.com', slug: 'manypets' },
    { name: 'Fetch', domain: 'fetchpet.com', slug: 'fetch' },
  ],
  
  'vpn': [
    { name: 'NordVPN', domain: 'nordvpn.com', slug: 'nordvpn' },
    { name: 'ExpressVPN', domain: 'expressvpn.com', slug: 'expressvpn' },
    { name: 'Surfshark', domain: 'surfshark.com', slug: 'surfshark' },
    { name: 'CyberGhost', domain: 'cyberghostvpn.com', slug: 'cyberghost' },
    { name: 'Private Internet Access', domain: 'privateinternetaccess.com', slug: 'pia' },
    { name: 'ProtonVPN', domain: 'protonvpn.com', slug: 'protonvpn' },
    { name: 'IPVanish', domain: 'ipvanish.com', slug: 'ipvanish' },
    { name: 'Windscribe', domain: 'windscribe.com', slug: 'windscribe' },
    { name: 'Mullvad', domain: 'mullvad.net', slug: 'mullvad' },
    { name: 'TunnelBear', domain: 'tunnelbear.com', slug: 'tunnelbear' },
  ],
  
  'antivirus': [
    { name: 'Norton', domain: 'norton.com', slug: 'norton' },
    { name: 'McAfee', domain: 'mcafee.com', slug: 'mcafee' },
    { name: 'Bitdefender', domain: 'bitdefender.com', slug: 'bitdefender' },
    { name: 'Kaspersky', domain: 'kaspersky.com', slug: 'kaspersky' },
    { name: 'Avast', domain: 'avast.com', slug: 'avast' },
    { name: 'AVG', domain: 'avg.com', slug: 'avg' },
    { name: 'ESET', domain: 'eset.com', slug: 'eset' },
    { name: 'Malwarebytes', domain: 'malwarebytes.com', slug: 'malwarebytes' },
    { name: 'Trend Micro', domain: 'trendmicro.com', slug: 'trendmicro' },
    { name: 'Webroot', domain: 'webroot.com', slug: 'webroot' },
  ],
  
  'password-manager': [
    { name: '1Password', domain: '1password.com', slug: '1password' },
    { name: 'LastPass', domain: 'lastpass.com', slug: 'lastpass' },
    { name: 'Dashlane', domain: 'dashlane.com', slug: 'dashlane' },
    { name: 'Bitwarden', domain: 'bitwarden.com', slug: 'bitwarden' },
    { name: 'NordPass', domain: 'nordpass.com', slug: 'nordpass' },
    { name: 'Keeper', domain: 'keepersecurity.com', slug: 'keeper' },
    { name: 'RoboForm', domain: 'roboform.com', slug: 'roboform' },
    { name: 'Zoho Vault', domain: 'zoho.com', slug: 'zoho-vault' },
    { name: 'Enpass', domain: 'enpass.io', slug: 'enpass' },
    { name: 'Sticky Password', domain: 'stickypassword.com', slug: 'sticky-password' },
  ],
  
  'meal-delivery': [
    { name: 'HelloFresh', domain: 'hellofresh.com', slug: 'hellofresh' },
    { name: 'Blue Apron', domain: 'blueapron.com', slug: 'blue-apron' },
    { name: 'Home Chef', domain: 'homechef.com', slug: 'home-chef' },
    { name: 'Freshly', domain: 'freshly.com', slug: 'freshly' },
    { name: 'Factor', domain: 'factor75.com', slug: 'factor' },
    { name: 'Green Chef', domain: 'greenchef.com', slug: 'green-chef' },
    { name: 'Sunbasket', domain: 'sunbasket.com', slug: 'sunbasket' },
    { name: 'EveryPlate', domain: 'everyplate.com', slug: 'everyplate' },
    { name: 'Dinnerly', domain: 'dinnerly.com', slug: 'dinnerly' },
    { name: 'Gobble', domain: 'gobble.com', slug: 'gobble' },
    { name: 'Hungryroot', domain: 'hungryroot.com', slug: 'hungryroot' },
    { name: 'Marley Spoon', domain: 'marleyspoon.com', slug: 'marley-spoon' },
  ],
  
  'moving': [
    { name: 'International Van Lines', domain: 'internationalvanlines.com', slug: 'international-van-lines' },
    { name: 'United Van Lines', domain: 'unitedvanlines.com', slug: 'united-van-lines' },
    { name: 'Allied Van Lines', domain: 'allied.com', slug: 'allied' },
    { name: 'North American Van Lines', domain: 'northamerican.com', slug: 'north-american' },
    { name: 'Mayflower', domain: 'mayflower.com', slug: 'mayflower' },
    { name: 'Two Men and a Truck', domain: 'twomenandatruck.com', slug: 'two-men-truck' },
    { name: 'College Hunks', domain: 'collegehunkshaulingjunk.com', slug: 'college-hunks' },
    { name: 'PODS', domain: 'pods.com', slug: 'pods' },
    { name: 'U-Pack', domain: 'upack.com', slug: 'u-pack' },
    { name: 'JK Moving', domain: 'jkmoving.com', slug: 'jk-moving' },
  ],
  
  'security': [
    { name: 'ADT', domain: 'adt.com', slug: 'adt' },
    { name: 'SimpliSafe', domain: 'simplisafe.com', slug: 'simplisafe' },
    { name: 'Vivint', domain: 'vivint.com', slug: 'vivint' },
    { name: 'Ring', domain: 'ring.com', slug: 'ring' },
    { name: 'Frontpoint', domain: 'frontpointsecurity.com', slug: 'frontpoint' },
    { name: 'Abode', domain: 'goabode.com', slug: 'abode' },
    { name: 'Cove', domain: 'covesmart.com', slug: 'cove' },
    { name: 'Brinks Home', domain: 'brinkshome.com', slug: 'brinks' },
    { name: 'Wyze', domain: 'wyze.com', slug: 'wyze' },
    { name: 'Eufy', domain: 'eufylife.com', slug: 'eufy' },
  ],
  
  'mattress': [
    { name: 'Saatva', domain: 'saatva.com', slug: 'saatva' },
    { name: 'Casper', domain: 'casper.com', slug: 'casper' },
    { name: 'Purple', domain: 'purple.com', slug: 'purple' },
    { name: 'Tempur-Pedic', domain: 'tempurpedic.com', slug: 'tempurpedic' },
    { name: 'Nectar', domain: 'nectarsleep.com', slug: 'nectar' },
    { name: 'Helix', domain: 'helixsleep.com', slug: 'helix' },
    { name: 'DreamCloud', domain: 'dreamcloudsleep.com', slug: 'dreamcloud' },
    { name: 'Leesa', domain: 'leesa.com', slug: 'leesa' },
    { name: 'Brooklyn Bedding', domain: 'brooklynbedding.com', slug: 'brooklyn-bedding' },
    { name: 'Avocado', domain: 'avocadogreenmattress.com', slug: 'avocado' },
    { name: 'Bear', domain: 'bearmattress.com', slug: 'bear' },
    { name: 'Tuft & Needle', domain: 'tuftandneedle.com', slug: 'tuft-needle' },
  ],
  
  'savings': [
    { name: 'SoFi', domain: 'sofi.com', slug: 'sofi' },
    { name: 'Marcus by Goldman Sachs', domain: 'marcus.com', slug: 'marcus' },
    { name: 'Ally Bank', domain: 'ally.com', slug: 'ally' },
    { name: 'American Express', domain: 'americanexpress.com', slug: 'amex' },
    { name: 'Capital One', domain: 'capitalone.com', slug: 'capital-one' },
    { name: 'Discover', domain: 'discover.com', slug: 'discover' },
    { name: 'Synchrony', domain: 'synchrony.com', slug: 'synchrony' },
    { name: 'CIT Bank', domain: 'cit.com', slug: 'cit' },
    { name: 'Barclays', domain: 'barclays.com', slug: 'barclays' },
    { name: 'Wealthfront', domain: 'wealthfront.com', slug: 'wealthfront' },
    { name: 'Betterment', domain: 'betterment.com', slug: 'betterment' },
    { name: 'UFB Direct', domain: 'ufbdirect.com', slug: 'ufb-direct' },
  ],
  
  'home-warranty': [
    { name: 'American Home Shield', domain: 'ahs.com', slug: 'american-home-shield' },
    { name: 'Choice Home Warranty', domain: 'choicehomewarranty.com', slug: 'choice' },
    { name: 'Select Home Warranty', domain: 'selecthomewarranty.com', slug: 'select' },
    { name: 'First American Home Warranty', domain: 'firstam.com', slug: 'first-american' },
    { name: 'Liberty Home Guard', domain: 'libertyhomeguard.com', slug: 'liberty' },
    { name: 'Cinch Home Services', domain: 'cinchhomeservices.com', slug: 'cinch' },
    { name: 'AFC Home Club', domain: 'afchomeclub.com', slug: 'afc' },
    { name: 'Home Warranty of America', domain: 'hwahomewarranty.com', slug: 'hwa' },
    { name: '2-10 Home Buyers Warranty', domain: '2-10.com', slug: '2-10' },
    { name: 'Landmark Home Warranty', domain: 'landmarkhw.com', slug: 'landmark' },
  ],
};

// Output directories mapping
const OUTPUT_DIRS = {
  'pet-insurance': 'pet-insurance-logos',
  'vpn': 'vpn-logos',
  'antivirus': 'antivirus-logos',
  'password-manager': 'password-manager-logos',
  'meal-delivery': 'meal-delivery-logos',
  'moving': 'moving-logos',
  'security': 'security-logos',
  'mattress': 'mattress-logos',
  'savings': 'bank-logos',
  'home-warranty': 'home-warranty-logos',
};

// =============================================================================
// LOGO FETCHING FUNCTIONS
// =============================================================================

// Fetch from Brandfetch API (best quality)
async function fetchBrandfetchLogo(domain, outputPath) {
  const API_KEY = process.env.BRANDFETCH_API_KEY;
  if (!API_KEY) {
    console.log('   ⚠️  No BRANDFETCH_API_KEY found');
    return false;
  }
  
  try {
    const response = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    
    if (!response.ok) {
      console.log(`   Brandfetch: ${response.status} ${response.statusText}`);
      return false;
    }
    
    const brandData = await response.json();
    const logos = brandData.logos || [];
    
    // Find best logo - prefer colored logo with transparent background
    let logo = logos.find(l => l.type === 'logo' && l.theme === 'light');
    if (!logo) logo = logos.find(l => l.type === 'logo' && l.theme === 'dark');
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

// Fetch from Clearbit (free, good quality)
function fetchClearbitLogo(domain, outputPath) {
  return new Promise((resolve) => {
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
    }).on('error', () => {
      file.close();
      fs.unlink(outputPath, () => {});
      resolve(false);
    });
  });
}

// Fetch from Google favicon (fallback)
function fetchGoogleFavicon(domain, outputPath) {
  return new Promise((resolve) => {
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
    }).on('error', () => {
      file.close();
      fs.unlink(outputPath, () => {});
      resolve(false);
    });
  });
}

// =============================================================================
// MAIN DOWNLOAD FUNCTION
// =============================================================================

async function downloadLogos(category) {
  const companies = COMPANIES[category];
  const outputDirName = OUTPUT_DIRS[category];
  
  if (!companies) {
    console.error(`❌ Unknown category: ${category}`);
    console.log('\nAvailable categories:');
    Object.keys(COMPANIES).forEach(c => console.log(`  - ${c}`));
    process.exit(1);
  }
  
  const outputDir = path.join(__dirname, '../public', outputDirName);
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log(`\n🎯 Fetching ${category.toUpperCase()} logos...\n`);
  console.log('='.repeat(60) + '\n');
  
  let successCount = 0;
  let failCount = 0;
  const results = [];
  
  for (const company of companies) {
    const outputPath = path.join(outputDir, `${company.slug}.png`);
    
    console.log(`[${companies.indexOf(company) + 1}/${companies.length}] ${company.name} (${company.domain})`);
    
    // Skip if already exists
    if (fs.existsSync(outputPath) && !process.argv.includes('--force')) {
      console.log(`   ⏭️  Already exists (use --force to re-download)\n`);
      successCount++;
      results.push({ company: company.name, slug: company.slug, success: true, source: 'existing' });
      continue;
    }
    
    try {
      let downloaded = false;
      
      // Try Brandfetch first (best quality)
      downloaded = await fetchBrandfetchLogo(company.domain, outputPath);
      if (downloaded) {
        console.log(`   ✅ Downloaded from Brandfetch (high quality)\n`);
        successCount++;
        results.push({ company: company.name, slug: company.slug, success: true, source: 'brandfetch' });
        await new Promise(r => setTimeout(r, 300));
        continue;
      }
      
      // Try Clearbit
      downloaded = await fetchClearbitLogo(company.domain, outputPath);
      if (downloaded) {
        console.log(`   ✅ Downloaded from Clearbit\n`);
        successCount++;
        results.push({ company: company.name, slug: company.slug, success: true, source: 'clearbit' });
        await new Promise(r => setTimeout(r, 300));
        continue;
      }
      
      // Fallback to Google favicon
      downloaded = await fetchGoogleFavicon(company.domain, outputPath);
      if (downloaded) {
        console.log(`   ⚠️  Downloaded from Google (favicon only)\n`);
        successCount++;
        results.push({ company: company.name, slug: company.slug, success: true, source: 'google' });
        continue;
      }
      
      console.log(`   ❌ Failed from all sources\n`);
      failCount++;
      results.push({ company: company.name, slug: company.slug, success: false });
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
      failCount++;
      results.push({ company: company.name, slug: company.slug, success: false, error: error.message });
    }
  }
  
  // Generate logo map file
  const logoMap = {};
  companies.forEach(company => {
    const logoPath = `/${outputDirName}/${company.slug}.png`;
    logoMap[company.name] = logoPath;
    logoMap[company.slug] = logoPath;
    logoMap[company.name.toLowerCase()] = logoPath;
  });
  
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(/ /g, '');
  const mapPath = path.join(__dirname, `../src/utils/${categoryName}LogoMap.ts`);
  
  const mapContent = `/**
 * ${categoryName} Logo Map
 * Auto-generated by scripts/fetch-all-logos.js
 * 
 * Usage:
 *   import { get${categoryName}Logo } from '../utils/${categoryName}LogoMap';
 *   const logoUrl = get${categoryName}Logo('Company Name');
 */

export const ${categoryName.charAt(0).toLowerCase() + categoryName.slice(1)}Logos: Record<string, string> = ${JSON.stringify(logoMap, null, 2)};

export function get${categoryName}Logo(nameOrSlug: string): string | null {
  const key = nameOrSlug.toLowerCase();
  return ${categoryName.charAt(0).toLowerCase() + categoryName.slice(1)}Logos[key] || null;
}

export default ${categoryName.charAt(0).toLowerCase() + categoryName.slice(1)}Logos;
`;
  
  fs.writeFileSync(mapPath, mapContent);
  
  console.log('='.repeat(60));
  console.log(`\n📊 Summary: ${successCount} successful, ${failCount} failed`);
  console.log(`📁 Logos saved to: public/${outputDirName}/`);
  console.log(`📄 Logo map saved to: src/utils/${categoryName}LogoMap.ts`);
  
  // List failed companies if any
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    console.log('\n⚠️  Failed companies (need manual logos):');
    failed.forEach(f => console.log(`   - ${f.company}`));
  }
  
  return results;
}

// =============================================================================
// CLI
// =============================================================================

const category = process.argv[2];

if (!category) {
  console.log('\n📦 Master Logo Fetcher');
  console.log('='.repeat(40));
  console.log('\nUsage: node scripts/fetch-all-logos.js [category]');
  console.log('\nAvailable categories:');
  Object.keys(COMPANIES).forEach(c => {
    console.log(`  - ${c} (${COMPANIES[c].length} companies)`);
  });
  console.log('\nOptions:');
  console.log('  --force    Re-download existing logos');
  console.log('\nExample:');
  console.log('  node scripts/fetch-all-logos.js pet-insurance');
  console.log('  node scripts/fetch-all-logos.js vpn --force');
} else {
  downloadLogos(category).catch(console.error);
}

