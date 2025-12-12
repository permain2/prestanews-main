// Auto-generated bank logo map
// Generated on 2025-12-12T07:14:10.011Z

export const bankLogos: Record<string, string> = {
  "Varo Bank": "/bank-logos/varo.png",
  "varo": "/bank-logos/varo.png",
  "Openbank": "/bank-logos/openbank.svg",
  "openbank": "/bank-logos/openbank.svg",
  "EverBank": "/bank-logos/everbank.png",
  "everbank": "/bank-logos/everbank.png",
  "Newtek Bank": "/bank-logos/newtek.png",
  "newtek": "/bank-logos/newtek.png",
  "Marcus by Goldman Sachs": "/bank-logos/marcus.png",
  "marcus": "/bank-logos/marcus.png",
  "Forbright Bank": "/bank-logos/forbright.png",
  "forbright": "/bank-logos/forbright.png",
  "Capital One 360": "/bank-logos/capital-one.png",
  "capital-one": "/bank-logos/capital-one.png",
  "American Express": "/bank-logos/amex.png",
  "amex": "/bank-logos/amex.png",
  "SoFi": "/bank-logos/sofi.png",
  "sofi": "/bank-logos/sofi.png",
  "Synchrony Bank": "/bank-logos/synchrony.png",
  "synchrony": "/bank-logos/synchrony.png",
};

export function getBankLogo(nameOrSlug: string): string | null {
  const key = nameOrSlug.toLowerCase();
  // Try exact match first
  if (bankLogos[nameOrSlug]) return bankLogos[nameOrSlug];
  // Try lowercase match
  for (const [k, v] of Object.entries(bankLogos)) {
    if (k.toLowerCase() === key) return v;
  }
  return null;
}
