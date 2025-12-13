// Security Camera Logo Map - Maps brand slugs to logo paths
const securityCameraLogoMap: Record<string, string> = {
  'ring': '/security-camera-logos/ring.png',
  'arlo': '/security-camera-logos/arlo.png',
  'google-nest': '/security-camera-logos/google-nest.png',
  'nest': '/security-camera-logos/google-nest.png',
  'googlenest': '/security-camera-logos/google-nest.png',
  'wyze': '/security-camera-logos/wyze.png',
  'eufy': '/security-camera-logos/eufy.png',
  'blink': '/security-camera-logos/blink.png',
  'simplisafe': '/security-camera-logos/simplisafe.png',
  'reolink': '/security-camera-logos/reolink.png',
};

export function getSecurityCameraLogo(brandName: string): string | undefined {
  // Try exact match first
  const slug = brandName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  if (securityCameraLogoMap[slug]) {
    return securityCameraLogoMap[slug];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(securityCameraLogoMap)) {
    if (slug.includes(key) || key.includes(slug)) {
      return value;
    }
  }
  
  return undefined;
}

export default securityCameraLogoMap;

