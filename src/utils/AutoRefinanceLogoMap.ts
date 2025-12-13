// Auto Refinance Logo Map - Maps lender slugs to logo paths
const autoRefinanceLogoMap: Record<string, string> = {
  'auto-approve': '/auto-refinance-logos/auto-approve.png',
  'autoapprove': '/auto-refinance-logos/auto-approve.png',
  'capital-one': '/auto-refinance-logos/capital-one.png',
  'capitalone': '/auto-refinance-logos/capital-one.png',
  'lightstream': '/auto-refinance-logos/lightstream.png',
  'penfed': '/auto-refinance-logos/penfed.png',
  'penfed-credit-union': '/auto-refinance-logos/penfed.png',
  'bank-of-america': '/auto-refinance-logos/bank-of-america.png',
  'bankofamerica': '/auto-refinance-logos/bank-of-america.png',
  'myautoloan': '/auto-refinance-logos/myautoloan.png',
  'consumers-credit-union': '/auto-refinance-logos/consumers-credit-union.png',
  'consumerscreditunion': '/auto-refinance-logos/consumers-credit-union.png',
  'rategenius': '/auto-refinance-logos/rategenius.png',
};

export function getAutoRefinanceLogo(lenderName: string): string | undefined {
  // Try exact match first
  const slug = lenderName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  if (autoRefinanceLogoMap[slug]) {
    return autoRefinanceLogoMap[slug];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(autoRefinanceLogoMap)) {
    if (slug.includes(key) || key.includes(slug)) {
      return value;
    }
  }
  
  return undefined;
}

export default autoRefinanceLogoMap;

