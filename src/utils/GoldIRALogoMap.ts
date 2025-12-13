// Gold IRA Company Logo Map - Maps company slugs to logo paths
const goldIRALogoMap: Record<string, string> = {
  'augusta-precious-metals': '/gold-ira-logos/augusta.png',
  'augusta': '/gold-ira-logos/augusta.png',
  'goldco': '/gold-ira-logos/goldco.png',
  'american-hartford-gold': '/gold-ira-logos/american-hartford.png',
  'american-hartford': '/gold-ira-logos/american-hartford.png',
  'birch-gold-group': '/gold-ira-logos/birch-gold.png',
  'birch-gold': '/gold-ira-logos/birch-gold.png',
  'noble-gold-investments': '/gold-ira-logos/noble-gold.png',
  'noble-gold': '/gold-ira-logos/noble-gold.png',
  'advantage-gold': '/gold-ira-logos/advantage-gold.png',
  'lear-capital': '/gold-ira-logos/lear-capital.png',
  'oxford-gold-group': '/gold-ira-logos/oxford-gold.png',
  'oxford-gold': '/gold-ira-logos/oxford-gold.png',
};

export function getGoldIRALogo(companyName: string): string | undefined {
  // Try exact match first
  const slug = companyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  if (goldIRALogoMap[slug]) {
    return goldIRALogoMap[slug];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(goldIRALogoMap)) {
    if (slug.includes(key) || key.includes(slug)) {
      return value;
    }
  }
  
  return undefined;
}

export default goldIRALogoMap;


