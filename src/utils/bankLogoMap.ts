// Bank logo map - using SVG fallbacks
// High-quality SVG logos generated for each bank

export const bankLogos: Record<string, string> = {
  "Varo Bank": "/bank-logos/varo.svg",
  "varo": "/bank-logos/varo.svg",
  "Openbank": "/bank-logos/openbank.svg",
  "openbank": "/bank-logos/openbank.svg",
  "EverBank": "/bank-logos/everbank.svg",
  "everbank": "/bank-logos/everbank.svg",
  "Newtek Bank": "/bank-logos/newtek.svg",
  "newtek": "/bank-logos/newtek.svg",
  "Marcus by Goldman Sachs": "/bank-logos/marcus.svg",
  "marcus": "/bank-logos/marcus.svg",
  "Forbright Bank": "/bank-logos/forbright.svg",
  "forbright": "/bank-logos/forbright.svg",
  "Capital One 360": "/bank-logos/capital-one.svg",
  "capital-one": "/bank-logos/capital-one.svg",
  "American Express": "/bank-logos/amex.svg",
  "amex": "/bank-logos/amex.svg",
  "SoFi": "/bank-logos/sofi.svg",
  "sofi": "/bank-logos/sofi.svg",
  "Synchrony Bank": "/bank-logos/synchrony.svg",
  "synchrony": "/bank-logos/synchrony.svg",
};

export function getBankLogo(nameOrSlug: string): string | null {
  // Try exact match first
  if (bankLogos[nameOrSlug]) return bankLogos[nameOrSlug];
  // Try lowercase match
  const key = nameOrSlug.toLowerCase();
  for (const [k, v] of Object.entries(bankLogos)) {
    if (k.toLowerCase() === key) return v;
  }
  return null;
}
