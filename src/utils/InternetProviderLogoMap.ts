// Internet Provider Logo Map - Maps provider slugs to logo paths
const internetProviderLogoMap: Record<string, string> = {
  'xfinity': '/internet-provider-logos/xfinity.png',
  'verizon-fios': '/internet-provider-logos/verizon.png',
  'verizon': '/internet-provider-logos/verizon.png',
  'att-fiber': '/internet-provider-logos/att.png',
  'att': '/internet-provider-logos/att.png',
  'at-t': '/internet-provider-logos/att.png',
  'google-fiber': '/internet-provider-logos/google-fiber.png',
  'googlefiber': '/internet-provider-logos/google-fiber.png',
  'spectrum': '/internet-provider-logos/spectrum.png',
  't-mobile-5g-home-internet': '/internet-provider-logos/tmobile.png',
  't-mobile': '/internet-provider-logos/tmobile.png',
  'tmobile': '/internet-provider-logos/tmobile.png',
  'cox': '/internet-provider-logos/cox.png',
  'frontier-fiber': '/internet-provider-logos/frontier.png',
  'frontier': '/internet-provider-logos/frontier.png',
  'starlink': '/internet-provider-logos/starlink.png',
  'centurylink-lumen': '/internet-provider-logos/centurylink.png',
  'centurylink': '/internet-provider-logos/centurylink.png',
  'lumen': '/internet-provider-logos/centurylink.png',
};

export function getInternetProviderLogo(providerName: string): string | undefined {
  // Try exact match first
  const slug = providerName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  if (internetProviderLogoMap[slug]) {
    return internetProviderLogoMap[slug];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(internetProviderLogoMap)) {
    if (slug.includes(key) || key.includes(slug)) {
      return value;
    }
  }
  
  return undefined;
}

export default internetProviderLogoMap;

