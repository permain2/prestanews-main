/**
 * Vpn Logo Map
 * Uses local file for Bamboo VPN and Clearbit for others
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
  
  // NordVPN - Clearbit
  "NordVPN": "https://logo.clearbit.com/nordvpn.com",
  "nordvpn": "https://logo.clearbit.com/nordvpn.com",
  
  // ExpressVPN - Clearbit
  "ExpressVPN": "https://logo.clearbit.com/expressvpn.com",
  "expressvpn": "https://logo.clearbit.com/expressvpn.com",
  
  // Surfshark - Clearbit
  "Surfshark": "https://logo.clearbit.com/surfshark.com",
  "surfshark": "https://logo.clearbit.com/surfshark.com",
  
  // CyberGhost - Clearbit
  "CyberGhost": "https://logo.clearbit.com/cyberghostvpn.com",
  "cyberghost": "https://logo.clearbit.com/cyberghostvpn.com",
  
  // Private Internet Access - Clearbit
  "Private Internet Access": "https://logo.clearbit.com/privateinternetaccess.com",
  "pia": "https://logo.clearbit.com/privateinternetaccess.com",
  "private internet access": "https://logo.clearbit.com/privateinternetaccess.com",
  
  // ProtonVPN - Clearbit
  "ProtonVPN": "https://logo.clearbit.com/protonvpn.com",
  "protonvpn": "https://logo.clearbit.com/protonvpn.com",
  
  // IPVanish - Clearbit
  "IPVanish": "https://logo.clearbit.com/ipvanish.com",
  "ipvanish": "https://logo.clearbit.com/ipvanish.com",
  
  // Windscribe - Clearbit
  "Windscribe": "https://logo.clearbit.com/windscribe.com",
  "windscribe": "https://logo.clearbit.com/windscribe.com",
  
  // Mullvad - Clearbit
  "Mullvad": "https://logo.clearbit.com/mullvad.net",
  "mullvad": "https://logo.clearbit.com/mullvad.net",
  
  // TunnelBear - Clearbit
  "TunnelBear": "https://logo.clearbit.com/tunnelbear.com",
  "tunnelbear": "https://logo.clearbit.com/tunnelbear.com"
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
