/**
 * Vpn Logo Map
 * All logos stored locally for reliability
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
  
  // NordVPN
  "NordVPN": "/vpn-logos/nordvpn.png",
  "nordvpn": "/vpn-logos/nordvpn.png",
  
  // ExpressVPN
  "ExpressVPN": "/vpn-logos/expressvpn.png",
  "expressvpn": "/vpn-logos/expressvpn.png",
  
  // Surfshark
  "Surfshark": "/vpn-logos/surfshark.png",
  "surfshark": "/vpn-logos/surfshark.png",
  
  // CyberGhost
  "CyberGhost": "/vpn-logos/cyberghost.png",
  "cyberghost": "/vpn-logos/cyberghost.png",
  
  // Private Internet Access
  "Private Internet Access": "/vpn-logos/pia.png",
  "pia": "/vpn-logos/pia.png",
  "private internet access": "/vpn-logos/pia.png",
  
  // ProtonVPN
  "ProtonVPN": "/vpn-logos/protonvpn.png",
  "protonvpn": "/vpn-logos/protonvpn.png",
  
  // IPVanish
  "IPVanish": "/vpn-logos/ipvanish.png",
  "ipvanish": "/vpn-logos/ipvanish.png",
  
  // Windscribe
  "Windscribe": "/vpn-logos/windscribe.png",
  "windscribe": "/vpn-logos/windscribe.png",
  
  // Mullvad
  "Mullvad": "/vpn-logos/mullvad.png",
  "mullvad": "/vpn-logos/mullvad.png",
  
  // TunnelBear
  "TunnelBear": "/vpn-logos/tunnelbear.png",
  "tunnelbear": "/vpn-logos/tunnelbear.png"
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
