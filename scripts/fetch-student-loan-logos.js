import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRANDFETCH_API_KEY = process.env.BRANDFETCH_API_KEY;

const lenders = [
  { name: 'SoFi', domain: 'sofi.com', slug: 'sofi' },
  { name: 'Earnest', domain: 'earnest.com', slug: 'earnest' },
  { name: 'Discover Student Loans', domain: 'discover.com', slug: 'discover-student-loans' },
  { name: 'College Ave', domain: 'collegeavestudentloans.com', slug: 'college-ave' },
  { name: 'Sallie Mae', domain: 'salliemae.com', slug: 'sallie-mae' },
  { name: 'Citizens Bank', domain: 'citizensbank.com', slug: 'citizens-bank' },
  { name: 'Ascent', domain: 'ascentfunding.com', slug: 'ascent' },
  { name: 'MPOWER Financing', domain: 'mpowerfinancing.com', slug: 'mpower-financing' }
];

const outputDir = path.join(__dirname, '../public/student-loan-logos');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function fetchBrandData(domain) {
  const url = `https://api.brandfetch.io/v2/brands/${domain}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${BRANDFETCH_API_KEY}`
    }
  });
  if (!response.ok) throw new Error(`Brandfetch API error: ${response.status}`);
  return response.json();
}

async function download(url, filepath) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  const buf = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buf));
}

function findBestLogo(logos) {
  if (!logos || logos.length === 0) return null;
  const selected =
    logos.find(l => l.type === 'logo' && l.theme === 'dark') ||
    logos.find(l => l.type === 'logo') ||
    logos.find(l => l.type === 'symbol' && l.theme === 'dark') ||
    logos.find(l => l.type === 'symbol') ||
    logos[0];
  if (!selected?.formats?.length) return null;
  const formats = selected.formats;
  return (
    formats.find(f => f.format === 'png' && f.background === 'transparent') ||
    formats.find(f => f.format === 'png') ||
    formats.find(f => f.format === 'svg') ||
    formats[0]
  );
}

function escapeXml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function makeFallbackSvg({ name, slug, primary, secondary }) {
  const safeName = escapeXml(name);
  const short = safeName.length > 16 ? `${safeName.slice(0, 16)}…` : safeName;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="320" viewBox="0 0 640 320">
  <defs>
    <linearGradient id="bg-${slug}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${primary}"/>
      <stop offset="1" stop-color="${secondary}"/>
    </linearGradient>
    <filter id="shadow-${slug}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.22"/>
    </filter>
  </defs>
  <rect x="18" y="18" width="604" height="284" rx="28" fill="url(#bg-${slug})" filter="url(#shadow-${slug})"/>
  <rect x="18" y="18" width="604" height="284" rx="28" fill="rgba(255,255,255,0.06)"/>
  <g fill="#fff" opacity="0.9">
    <path d="M126 110c-10 0-18 8-18 18v74c0 10 8 18 18 18h74c10 0 18-8 18-18v-74c0-10-8-18-18-18h-74zm15 44h44c6 0 10 4 10 10s-4 10-10 10h-44c-6 0-10-4-10-10s4-10 10-10z"/>
  </g>
  <text x="250" y="168" font-family="Sora, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="44" font-weight="700" fill="#ffffff">
    ${short}
  </text>
  <text x="250" y="205" font-family="Lexend, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="16" font-weight="500" fill="rgba(255,255,255,0.85)">
    Student loan lender
  </text>
</svg>`;
}

const fallbackColors = {
  sofi: { primary: '#00A7E1', secondary: '#0057B7' },
  earnest: { primary: '#0EA5E9', secondary: '#1D4ED8' },
  'discover-student-loans': { primary: '#111827', secondary: '#F97316' },
  'college-ave': { primary: '#0F172A', secondary: '#2563EB' },
  'sallie-mae': { primary: '#7C3AED', secondary: '#5B21B6' },
  'citizens-bank': { primary: '#059669', secondary: '#047857' },
  ascent: { primary: '#0D2C4B', secondary: '#1a4a7a' },
  'mpower-financing': { primary: '#DC2626', secondary: '#B91C1C' }
};

async function main() {
  const useBrandfetch = !!BRANDFETCH_API_KEY;

  if (!useBrandfetch) {
    console.log('⚠️  BRANDFETCH_API_KEY not set - generating SVG fallbacks (no external requests).');
  } else {
    console.log('🎨 BRANDFETCH_API_KEY detected - fetching real colored logos from Brandfetch.');
  }

  const results = [];

  for (const lender of lenders) {
    console.log(`\n📥 Processing: ${lender.name} (${lender.domain})`);

    let logoPath = null;
    let source = 'fallback';

    if (useBrandfetch) {
      try {
        const brandData = await fetchBrandData(lender.domain);
        const best = findBestLogo(brandData.logos);
        if (best?.src) {
          const ext = best.format || (best.src.includes('.svg') ? 'svg' : 'png');
          const filename = `${lender.slug}.${ext}`;
          const filepath = path.join(outputDir, filename);
          await download(best.src, filepath);
          logoPath = `/student-loan-logos/${filename}`;
          source = 'brandfetch';
          console.log(`   ✅ Saved: ${filename} (Brandfetch)`);
        }
      } catch (err) {
        console.log(`   ⚠️  Brandfetch failed: ${err.message}`);
      }
    }

    if (!logoPath) {
      const colors = fallbackColors[lender.slug] || { primary: '#334155', secondary: '#1e293b' };
      const svg = makeFallbackSvg({ name: lender.name, slug: lender.slug, ...colors });
      const filename = `${lender.slug}.svg`;
      fs.writeFileSync(path.join(outputDir, filename), svg);
      logoPath = `/student-loan-logos/${filename}`;
      source = 'fallback-svg';
      console.log(`   ✅ Saved: ${filename} (Fallback SVG)`);
    }

    results.push({ ...lender, logoPath, source });

    // Be nice to Brandfetch rate limits
    if (useBrandfetch) await new Promise(r => setTimeout(r, 350));
  }

  const tsContent = `// Auto-generated student loan logo map
// Generated on ${new Date().toISOString()}

export const studentLoanLogos: Record<string, string> = {
${results
  .filter(r => r.logoPath)
  .map(
    r =>
      `  "${r.name}": "${r.logoPath}",
  "${r.slug}": "${r.logoPath}",`
  )
  .join('\n')}
};

export function getStudentLoanLogo(nameOrSlug: string): string | null {
  const key = nameOrSlug.toLowerCase();
  if (studentLoanLogos[nameOrSlug]) return studentLoanLogos[nameOrSlug];
  for (const [k, v] of Object.entries(studentLoanLogos)) {
    if (k.toLowerCase() === key) return v;
  }
  return null;
}
`;

  const tsPath = path.join(__dirname, '../src/utils/studentLoanLogoMap.ts');
  fs.writeFileSync(tsPath, tsContent);
  console.log(`\n✅ Generated: src/utils/studentLoanLogoMap.ts`);
}

main().catch(console.error);


