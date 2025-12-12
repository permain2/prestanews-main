import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const banks = [
  { name: 'Varo', slug: 'varo', color: '#00D09C', textColor: '#FFFFFF' },
  { name: 'Openbank', slug: 'openbank', color: '#EC0000', textColor: '#FFFFFF' },
  { name: 'EverBank', slug: 'everbank', color: '#003366', textColor: '#FFFFFF' },
  { name: 'Newtek', slug: 'newtek', color: '#0066CC', textColor: '#FFFFFF' },
  { name: 'Marcus', slug: 'marcus', color: '#000000', textColor: '#FFFFFF' },
  { name: 'Forbright', slug: 'forbright', color: '#2E7D32', textColor: '#FFFFFF' },
  { name: 'Capital One', slug: 'capital-one', color: '#004977', textColor: '#FFFFFF' },
  { name: 'Amex', slug: 'amex', color: '#006FCF', textColor: '#FFFFFF' },
  { name: 'SoFi', slug: 'sofi', color: '#00B8D9', textColor: '#FFFFFF' },
  { name: 'Synchrony', slug: 'synchrony', color: '#D4145A', textColor: '#FFFFFF' },
];

const outputDir = path.join(__dirname, '../public/bank-logos');

function generateSvgLogo(name, color, textColor) {
  const fontSize = name.length > 8 ? 22 : name.length > 6 ? 26 : 30;
  
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
  console.log('🏦 Generating bank logo SVGs...\n');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const bank of banks) {
    const svg = generateSvgLogo(bank.name, bank.color, bank.textColor);
    const filepath = path.join(outputDir, `${bank.slug}.svg`);
    fs.writeFileSync(filepath, svg);
    console.log(`   ✅ Created: ${bank.slug}.svg`);
  }
  
  console.log(`\n✅ Generated ${banks.length} bank logos`);
}

main().catch(console.error);

