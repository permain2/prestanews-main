/**
 * Generate Professional SVG Logos for Warranty Companies
 * 
 * Creates branded placeholder SVG logos with proper colors and styling.
 * These can be replaced with official logos later.
 * 
 * Run: node scripts/generate-warranty-logos.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Extended Car Warranty Companies with brand colors
const warrantyCompanies = [
  { 
    name: 'CARCHEX', 
    slug: 'carchex',
    colors: { primary: '#1E3A5F', secondary: '#4A90D9', text: '#FFFFFF' },
    shortName: 'CARCHEX'
  },
  { 
    name: 'Endurance', 
    slug: 'endurance',
    colors: { primary: '#1A1A1A', secondary: '#FFD700', text: '#FFFFFF' },
    shortName: 'ENDURANCE'
  },
  { 
    name: 'CarShield', 
    slug: 'carshield',
    colors: { primary: '#B91C1C', secondary: '#FFFFFF', text: '#FFFFFF' },
    shortName: 'CARSHIELD'
  },
  { 
    name: 'Olive', 
    slug: 'olive',
    colors: { primary: '#065F46', secondary: '#10B981', text: '#FFFFFF' },
    shortName: 'OLIVE'
  },
  { 
    name: 'Protect My Car', 
    slug: 'protect-my-car',
    colors: { primary: '#7C3AED', secondary: '#A78BFA', text: '#FFFFFF' },
    shortName: 'PMC'
  },
  { 
    name: 'autopom!', 
    slug: 'autopom',
    colors: { primary: '#0369A1', secondary: '#38BDF8', text: '#FFFFFF' },
    shortName: 'AUTOPOM'
  },
  { 
    name: 'Warranty Direct', 
    slug: 'warranty-direct',
    colors: { primary: '#0F766E', secondary: '#2DD4BF', text: '#FFFFFF' },
    shortName: 'WD'
  },
  { 
    name: 'Route 66', 
    slug: 'route-66',
    colors: { primary: '#92400E', secondary: '#F59E0B', text: '#FFFFFF' },
    shortName: 'RT66'
  },
  { 
    name: 'American Auto Shield', 
    slug: 'american-auto-shield',
    colors: { primary: '#1E40AF', secondary: '#60A5FA', text: '#FFFFFF' },
    shortName: 'AAS'
  },
  { 
    name: 'CARCHEX Titanium', 
    slug: 'carchex-titanium',
    colors: { primary: '#374151', secondary: '#9CA3AF', text: '#FFFFFF' },
    shortName: 'CARCHEX'
  },
];

const outputDir = path.join(__dirname, '../public/warranty-logos');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate shield icon SVG
function generateShieldSVG(company) {
  const { colors, shortName, name, slug } = company;
  
  // Create a professional shield-style logo
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
  <defs>
    <linearGradient id="grad-${slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow-${slug}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <!-- Background rounded rectangle -->
  <rect x="5" y="5" width="190" height="70" rx="12" ry="12" fill="url(#grad-${slug})" filter="url(#shadow-${slug})"/>
  
  <!-- Shield icon on left -->
  <path d="M30 20 L45 15 L60 20 L60 40 C60 50 45 58 45 58 C45 58 30 50 30 40 Z" 
        fill="${colors.text}" fill-opacity="0.9"/>
  <path d="M40 35 L43 38 L52 28" 
        stroke="${colors.primary}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Company name text -->
  <text x="70" y="48" 
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        font-size="${name.length > 12 ? '16' : '20'}" 
        font-weight="700" 
        fill="${colors.text}"
        letter-spacing="0.5">${name.toUpperCase()}</text>
</svg>`;

  return svg;
}

// Generate rectangular badge logo
function generateBadgeSVG(company) {
  const { colors, name, slug } = company;
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 100" width="240" height="100">
  <defs>
    <linearGradient id="bg-${slug}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${adjustColor(colors.primary, -20)};stop-opacity:1" />
    </linearGradient>
    <filter id="glow-${slug}">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Main container -->
  <rect x="5" y="5" width="230" height="90" rx="16" ry="16" fill="url(#bg-${slug})" filter="url(#glow-${slug})"/>
  
  <!-- Accent stripe -->
  <rect x="5" y="5" width="8" height="90" rx="4" ry="4" fill="${colors.secondary}"/>
  
  <!-- Car icon -->
  <g transform="translate(25, 30)">
    <path d="M5 25 L10 15 L40 15 L45 25 L45 35 L5 35 Z" fill="${colors.text}" fill-opacity="0.15"/>
    <circle cx="15" cy="35" r="5" fill="${colors.secondary}"/>
    <circle cx="35" cy="35" r="5" fill="${colors.secondary}"/>
  </g>
  
  <!-- Company name -->
  <text x="75" y="45" 
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        font-size="${name.length > 15 ? '18' : name.length > 10 ? '22' : '26'}" 
        font-weight="800" 
        fill="${colors.text}"
        letter-spacing="1">${name.toUpperCase()}</text>
  
  <!-- Tagline -->
  <text x="75" y="68" 
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        font-size="11" 
        font-weight="500" 
        fill="${colors.text}"
        fill-opacity="0.7"
        letter-spacing="0.5">EXTENDED WARRANTY</text>
</svg>`;

  return svg;
}

// Helper to adjust color brightness
function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

async function generateLogos() {
  console.log('🎨 Generating Professional Warranty Company Logos...\n');
  console.log('=' .repeat(50) + '\n');
  
  let successCount = 0;
  
  for (const company of warrantyCompanies) {
    const outputPath = path.join(outputDir, `${company.slug}.svg`);
    
    console.log(`[${warrantyCompanies.indexOf(company) + 1}/${warrantyCompanies.length}] ${company.name}`);
    
    try {
      const svg = generateBadgeSVG(company);
      fs.writeFileSync(outputPath, svg);
      console.log(`   ✅ Generated ${company.slug}.svg\n`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
    }
  }
  
  console.log('=' .repeat(50));
  console.log(`\n📊 Summary: ${successCount}/${warrantyCompanies.length} logos generated`);
  console.log(`📁 Logos saved to: ${outputDir}\n`);
  
  // Update logo map to use SVG
  const logoMap = {};
  warrantyCompanies.forEach(company => {
    const logoPath = `/warranty-logos/${company.slug}.svg`;
    logoMap[company.name] = logoPath;
    logoMap[company.slug] = logoPath;
    logoMap[company.name.toLowerCase()] = logoPath;
  });
  
  const mapPath = path.join(__dirname, '../src/utils/warrantyLogoMap.ts');
  const mapContent = `/**
 * Warranty Company Logo Map
 * Auto-generated by scripts/generate-warranty-logos.js
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
  console.log(`📄 Logo map updated: ${mapPath}`);
  console.log('\n✨ Done! Replace these with official logos when available.');
}

// Run the script
generateLogos().catch(console.error);


