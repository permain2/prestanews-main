/**
 * Warranty Company Logo Map
 * Updated with real Brandfetch logos (PNG) and SVG fallbacks
 * 
 * Usage:
 *   import { getWarrantyLogo } from '../utils/warrantyLogoMap';
 *   const logoUrl = getWarrantyLogo('CARCHEX');
 */

export const warrantyLogos: Record<string, string> = {
  "CARCHEX": "/warranty-logos/carchex.png",
  "carchex": "/warranty-logos/carchex.png",
  "Endurance": "/warranty-logos/endurance.png",
  "endurance": "/warranty-logos/endurance.png",
  "CarShield": "/warranty-logos/carshield.png",
  "carshield": "/warranty-logos/carshield.png",
  "Olive": "/warranty-logos/olive.png",
  "olive": "/warranty-logos/olive.png",
  "Protect My Car": "/warranty-logos/protect-my-car.png",
  "protect-my-car": "/warranty-logos/protect-my-car.png",
  "protect my car": "/warranty-logos/protect-my-car.png",
  "autopom!": "/warranty-logos/autopom.png",
  "autopom": "/warranty-logos/autopom.png",
  "Warranty Direct": "/warranty-logos/warranty-direct.svg",
  "warranty-direct": "/warranty-logos/warranty-direct.svg",
  "warranty direct": "/warranty-logos/warranty-direct.svg",
  "Route 66": "/warranty-logos/route-66.png",
  "route-66": "/warranty-logos/route-66.png",
  "route 66": "/warranty-logos/route-66.png",
  "American Auto Shield": "/warranty-logos/american-auto-shield.png",
  "american-auto-shield": "/warranty-logos/american-auto-shield.png",
  "american auto shield": "/warranty-logos/american-auto-shield.png",
  "CARCHEX Titanium": "/warranty-logos/carchex-titanium.png",
  "carchex-titanium": "/warranty-logos/carchex-titanium.png",
  "carchex titanium": "/warranty-logos/carchex-titanium.png"
};

export function getWarrantyLogo(nameOrSlug: string): string | null {
  const key = nameOrSlug.toLowerCase();
  return warrantyLogos[key] || warrantyLogos[nameOrSlug] || null;
}

// Default export for convenience
export default warrantyLogos;
