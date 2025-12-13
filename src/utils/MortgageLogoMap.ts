// Mortgage Lender Logo Map - Maps lender slugs to logo paths
const mortgageLogoMap: Record<string, string> = {
  'rocket-mortgage': '/mortgage-logos/rocket-mortgage.png',
  'rocketmortgage': '/mortgage-logos/rocket-mortgage.png',
  'better': '/mortgage-logos/better.png',
  'better-mortgage': '/mortgage-logos/better.png',
  'veterans-united': '/mortgage-logos/veterans-united.png',
  'veteransunited': '/mortgage-logos/veterans-united.png',
  'loandepot': '/mortgage-logos/loandepot.png',
  'loan-depot': '/mortgage-logos/loandepot.png',
  'guaranteed-rate': '/mortgage-logos/guaranteed-rate.png',
  'guaranteedrate': '/mortgage-logos/guaranteed-rate.png',
  'pennymac': '/mortgage-logos/pennymac.png',
  'chase': '/mortgage-logos/chase.png',
  'credible': '/mortgage-logos/credible.png',
};

export function getMortgageLogo(lenderName: string): string | undefined {
  // Try exact match first
  const slug = lenderName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  if (mortgageLogoMap[slug]) {
    return mortgageLogoMap[slug];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(mortgageLogoMap)) {
    if (slug.includes(key) || key.includes(slug)) {
      return value;
    }
  }
  
  return undefined;
}

export default mortgageLogoMap;

