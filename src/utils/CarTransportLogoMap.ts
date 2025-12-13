// Car Transport Company Logo Map - Maps company slugs to logo paths
const carTransportLogoMap: Record<string, string> = {
  'montway-auto-transport': '/car-transport-logos/montway.png',
  'montway': '/car-transport-logos/montway.png',
  'sherpa-auto-transport': '/car-transport-logos/sherpa.png',
  'sherpa': '/car-transport-logos/sherpa.png',
  'amerifreight': '/car-transport-logos/amerifreight.png',
  'sgt-auto-transport': '/car-transport-logos/sgt-auto.png',
  'sgt-auto': '/car-transport-logos/sgt-auto.png',
  'bargain-auto-transport': '/car-transport-logos/bargain-auto.png',
  'bargain-auto': '/car-transport-logos/bargain-auto.png',
  'ship-a-car-direct': '/car-transport-logos/ship-a-car-direct.png',
  'uship': '/car-transport-logos/uship.png',
  'easy-auto-ship': '/car-transport-logos/easy-auto-ship.png',
};

export function getCarTransportLogo(companyName: string): string | undefined {
  // Try exact match first
  const slug = companyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  if (carTransportLogoMap[slug]) {
    return carTransportLogoMap[slug];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(carTransportLogoMap)) {
    if (slug.includes(key) || key.includes(slug)) {
      return value;
    }
  }
  
  return undefined;
}

export default carTransportLogoMap;

