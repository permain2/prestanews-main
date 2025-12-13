// Business Insurance Logo Map - Maps provider slugs to logo paths
const businessInsuranceLogoMap: Record<string, string> = {
  'the-hartford': '/business-insurance-logos/hartford.png',
  'hartford': '/business-insurance-logos/hartford.png',
  'state-farm': '/business-insurance-logos/state-farm.png',
  'statefarm': '/business-insurance-logos/state-farm.png',
  'progressive': '/business-insurance-logos/progressive.png',
  'travelers': '/business-insurance-logos/travelers.png',
  'nationwide': '/business-insurance-logos/nationwide.png',
  'liberty-mutual': '/business-insurance-logos/liberty-mutual.png',
  'libertymutual': '/business-insurance-logos/liberty-mutual.png',
  'hiscox': '/business-insurance-logos/hiscox.png',
  'geico-business': '/business-insurance-logos/geico.png',
  'geico': '/business-insurance-logos/geico.png',
  'cna': '/business-insurance-logos/cna.png',
  'next-insurance': '/business-insurance-logos/next-insurance.png',
  'nextinsurance': '/business-insurance-logos/next-insurance.png',
};

export function getBusinessInsuranceLogo(providerName: string): string | undefined {
  // Try exact match first
  const slug = providerName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  if (businessInsuranceLogoMap[slug]) {
    return businessInsuranceLogoMap[slug];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(businessInsuranceLogoMap)) {
    if (slug.includes(key) || key.includes(slug)) {
      return value;
    }
  }
  
  return undefined;
}

export default businessInsuranceLogoMap;

