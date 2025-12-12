import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Only generate SVGs for companies we don't have PNG logos for
const companies = [
  { name: 'Good Sam', slug: 'good-sam', color: '#1E3A8A', textColor: '#FFFFFF' },
  { name: 'National General', slug: 'national-general', color: '#0F172A', textColor: '#FFFFFF' },
  { name: 'Foremost', slug: 'foremost', color: '#B91C1C', textColor: '#FFFFFF' },
  { name: 'Safeco', slug: 'safeco', color: '#1D4ED8', textColor: '#FFFFFF' },
  { name: 'Roamly', slug: 'roamly', color: '#059669', textColor: '#FFFFFF' },
];

const outputDir = path.join(__dirname, '../public/rv-insurance-logos');

function generateSvgLogo(name, color, textColor) {
  const fontSize = name.length > 12 ? 18 : name.length > 8 ? 22 : 26;
  
  return `<svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${name.toLowerCase().replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${adjustColor(color, -20)};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="200" height="80" rx="12" fill="url(#grad-${name.toLowerCase().replace(/\s/g, '')})" filter="url(#shadow)"/>
  <text x="100" y="48" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${fontSize}" font-weight="700" fill="${textColor}" text-anchor="middle" letter-spacing="-0.5">${name}</text>
</svg>`;
}

function adjustColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

async function main() {
  console.log('🚐 Generating RV insurance logo SVGs...\n');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const company of companies) {
    const svg = generateSvgLogo(company.name, company.color, company.textColor);
    const filepath = path.join(outputDir, `${company.slug}.svg`);
    fs.writeFileSync(filepath, svg);
    console.log(`   ✅ Created: ${company.slug}.svg`);
  }
  
  console.log(`\n✅ Generated ${companies.length} RV insurance logos`);
}

main().catch(console.error);

