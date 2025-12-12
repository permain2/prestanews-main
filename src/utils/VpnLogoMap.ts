/**
 * Vpn Logo Map
 * Uses local files for Bamboo VPN and Brandfetch CDN for others
 * 
 * Usage:
 *   import { getVpnLogo } from '../utils/VpnLogoMap';
 *   const logoUrl = getVpnLogo('Company Name');
 */

export const vpnLogos: Record<string, string> = {
  // Bamboo VPN - Local logo (user provided)
  "Bamboo VPN": "/vpn-logos/bamboo-vpn.webp",
  "bamboo-vpn": "/vpn-logos/bamboo-vpn.webp",
  "bamboovpn": "/vpn-logos/bamboo-vpn.webp",
  
  // NordVPN - Brandfetch
  "NordVPN": "https://cdn.brandfetch.io/idPhnhFqWu/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "nordvpn": "https://cdn.brandfetch.io/idPhnhFqWu/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  
  // ExpressVPN - Brandfetch
  "ExpressVPN": "https://cdn.brandfetch.io/id_KsIGT_o/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "expressvpn": "https://cdn.brandfetch.io/id_KsIGT_o/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  
  // Surfshark - Brandfetch
  "Surfshark": "https://cdn.brandfetch.io/idD62_6P6x/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "surfshark": "https://cdn.brandfetch.io/idD62_6P6x/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  
  // CyberGhost - Brandfetch
  "CyberGhost": "https://cdn.brandfetch.io/idxBHnKmgU/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "cyberghost": "https://cdn.brandfetch.io/idxBHnKmgU/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  
  // Private Internet Access - Brandfetch
  "Private Internet Access": "https://cdn.brandfetch.io/iduS-B8h2w/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "pia": "https://cdn.brandfetch.io/iduS-B8h2w/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "private internet access": "https://cdn.brandfetch.io/iduS-B8h2w/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  
  // ProtonVPN - Brandfetch
  "ProtonVPN": "https://cdn.brandfetch.io/idaXGCYW-C/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "protonvpn": "https://cdn.brandfetch.io/idaXGCYW-C/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  
  // IPVanish - Brandfetch
  "IPVanish": "https://cdn.brandfetch.io/idj2wOH0Cz/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "ipvanish": "https://cdn.brandfetch.io/idj2wOH0Cz/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  
  // Windscribe - Brandfetch
  "Windscribe": "https://cdn.brandfetch.io/idnSz3JYFV/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "windscribe": "https://cdn.brandfetch.io/idnSz3JYFV/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  
  // Mullvad - Brandfetch
  "Mullvad": "https://cdn.brandfetch.io/idiCIYbxBD/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "mullvad": "https://cdn.brandfetch.io/idiCIYbxBD/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  
  // TunnelBear - Brandfetch
  "TunnelBear": "https://cdn.brandfetch.io/idwWJPVf7h/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "tunnelbear": "https://cdn.brandfetch.io/idwWJPVf7h/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
};

export function getVpnLogo(nameOrSlug: string): string | null {
  // First try exact match
  if (vpnLogos[nameOrSlug]) {
    return vpnLogos[nameOrSlug];
  }
  
  // Try lowercase
  const key = nameOrSlug.toLowerCase();
  if (vpnLogos[key]) {
    return vpnLogos[key];
  }
  
  // Try with hyphens removed
  const noHyphens = key.replace(/-/g, '');
  if (vpnLogos[noHyphens]) {
    return vpnLogos[noHyphens];
  }
  
  return null;
}

export default vpnLogos;
