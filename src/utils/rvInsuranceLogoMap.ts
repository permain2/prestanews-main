// RV Insurance company logo map
// Uses existing insurance logos + SVG fallbacks for specialized companies

export const rvInsuranceLogos: Record<string, string> = {
  "Progressive": "/rv-insurance-logos/progressive.png",
  "progressive": "/rv-insurance-logos/progressive.png",
  "Good Sam Insurance": "/rv-insurance-logos/good-sam.svg",
  "good-sam": "/rv-insurance-logos/good-sam.svg",
  "National General": "/rv-insurance-logos/national-general.svg",
  "national-general": "/rv-insurance-logos/national-general.svg",
  "Foremost": "/rv-insurance-logos/foremost.svg",
  "foremost": "/rv-insurance-logos/foremost.svg",
  "Safeco": "/rv-insurance-logos/safeco.svg",
  "safeco": "/rv-insurance-logos/safeco.svg",
  "GEICO": "/rv-insurance-logos/geico.png",
  "geico": "/rv-insurance-logos/geico.png",
  "Roamly": "/rv-insurance-logos/roamly.svg",
  "roamly": "/rv-insurance-logos/roamly.svg",
  "State Farm": "/rv-insurance-logos/state-farm.png",
  "state-farm": "/rv-insurance-logos/state-farm.png",
};

export function getRVInsuranceLogo(nameOrSlug: string): string | null {
  // Try exact match first
  if (rvInsuranceLogos[nameOrSlug]) return rvInsuranceLogos[nameOrSlug];
  // Try lowercase match
  const key = nameOrSlug.toLowerCase();
  for (const [k, v] of Object.entries(rvInsuranceLogos)) {
    if (k.toLowerCase() === key) return v;
  }
  return null;
}

