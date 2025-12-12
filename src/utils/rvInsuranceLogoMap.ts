// Auto-generated RV insurance logo map
// Generated on 2025-12-12T07:14:25.710Z

export const rvInsuranceLogos: Record<string, string> = {
  "Progressive": "/rv-insurance-logos/progressive.png",
  "progressive": "/rv-insurance-logos/progressive.png",
  "Good Sam Insurance": "/rv-insurance-logos/good-sam.png",
  "good-sam": "/rv-insurance-logos/good-sam.png",
  "National General": "/rv-insurance-logos/national-general.png",
  "national-general": "/rv-insurance-logos/national-general.png",
  "Foremost": "/rv-insurance-logos/foremost.png",
  "foremost": "/rv-insurance-logos/foremost.png",
  "Safeco": "/rv-insurance-logos/safeco.png",
  "safeco": "/rv-insurance-logos/safeco.png",
  "GEICO": "/rv-insurance-logos/geico.png",
  "geico": "/rv-insurance-logos/geico.png",
  "Roamly": "/rv-insurance-logos/roamly.png",
  "roamly": "/rv-insurance-logos/roamly.png",
  "State Farm": "/rv-insurance-logos/state-farm.png",
  "state-farm": "/rv-insurance-logos/state-farm.png",
};

export function getRVInsuranceLogo(nameOrSlug: string): string | null {
  const key = nameOrSlug.toLowerCase();
  // Try exact match first
  if (rvInsuranceLogos[nameOrSlug]) return rvInsuranceLogos[nameOrSlug];
  // Try lowercase match
  for (const [k, v] of Object.entries(rvInsuranceLogos)) {
    if (k.toLowerCase() === key) return v;
  }
  return null;
}
