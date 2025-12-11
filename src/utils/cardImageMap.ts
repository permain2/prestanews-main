/**
 * Credit Card Image Mapping
 * Maps card names to their real image files in public/credit-cards/
 */

// Available card images in public/credit-cards/
const cardImages: Record<string, string> = {
  // Amex Cards
  "amex-platinum": "/credit-cards/amex-platinum.png",
  "amex-gold": "/credit-cards/amex-gold.png",
  "amex-green": "/credit-cards/amex-green.png",
  "amex-everyday": "/credit-cards/amex-everyday.png",
  "amex-cash-magnet": "/credit-cards/amex-cash-magnet.png",
  "blue-cash-preferred": "/credit-cards/blue-cash-preferred.png",
  "blue-cash-everyday": "/credit-cards/blue-cash-everyday.png",
  "amex-business-platinum": "/credit-cards/amex-business-platinum.png",
  "amex-business-gold": "/credit-cards/amex-business-gold.png",
  "amex-blue-business-cash": "/credit-cards/amex-blue-business-cash.png",
  "blue-business-plus": "/credit-cards/blue-business-plus.png",
  "delta-skymiles-reserve": "/credit-cards/delta-skymiles-reserve.png",
  "delta-skymiles-gold": "/credit-cards/delta-skymiles-gold.png",
  "hilton-honors-aspire": "/credit-cards/hilton-honors-aspire.png",
  
  // Chase Cards
  "chase-sapphire-preferred": "/credit-cards/chase-sapphire-preferred.png",
  "chase-slate-edge": "/credit-cards/chase-slate-edge.png",
  
  // Capital One Cards
  "capital-one-venture-x": "/credit-cards/capital-one-venture-x.png",
  
  // Citi Cards
  "citi-double-cash": "/credit-cards/citi-double-cash.png",
  "citi-diamond-preferred": "/credit-cards/citi-diamond-preferred.png",
  
  // Discover Cards
  "discover-it-balance-transfer": "/credit-cards/discover-it-balance-transfer.png",
  
  // Bank of America Cards
  "bankamericard": "/credit-cards/bankamericard.png",
  
  // Wells Fargo Cards
  "wells-fargo-reflect": "/credit-cards/wells-fargo-reflect.png",
  
  // US Bank Cards
  "us-bank-visa-platinum": "/credit-cards/us-bank-visa-platinum.png",
  
  // Amazon Cards
  "amazon-business-prime": "/credit-cards/amazon-business-prime.png",
};

// Name variations mapping to normalized keys
const nameVariations: Record<string, string> = {
  // Amex Platinum variations
  "american express platinum": "amex-platinum",
  "amex platinum card": "amex-platinum",
  "platinum card": "amex-platinum",
  "the platinum card": "amex-platinum",
  "platinum card from american express": "amex-platinum",
  
  // Amex Gold variations
  "american express gold": "amex-gold",
  "amex gold card": "amex-gold",
  "gold card": "amex-gold",
  "american express gold card": "amex-gold",
  "the gold card": "amex-gold",
  
  // Amex Green variations
  "american express green": "amex-green",
  "amex green card": "amex-green",
  "green card": "amex-green",
  
  // Amex EveryDay
  "amex everyday": "amex-everyday",
  "american express everyday": "amex-everyday",
  
  // Cash Magnet
  "amex cash magnet": "amex-cash-magnet",
  "cash magnet": "amex-cash-magnet",
  "cash magnet card": "amex-cash-magnet",
  
  // Blue Cash
  "blue cash preferred": "blue-cash-preferred",
  "amex blue cash preferred": "blue-cash-preferred",
  "blue cash preferred card": "blue-cash-preferred",
  "blue cash everyday": "blue-cash-everyday",
  "amex blue cash everyday": "blue-cash-everyday",
  "blue cash everyday card": "blue-cash-everyday",
  
  // Business Amex
  "amex business platinum": "amex-business-platinum",
  "business platinum": "amex-business-platinum",
  "amex business gold": "amex-business-gold",
  "business gold": "amex-business-gold",
  "business gold card": "amex-business-gold",
  "amex blue business cash": "amex-blue-business-cash",
  "blue business cash": "amex-blue-business-cash",
  "blue business plus": "blue-business-plus",
  "amex blue business plus": "blue-business-plus",
  
  // Delta Cards
  "delta skymiles reserve": "delta-skymiles-reserve",
  "delta reserve": "delta-skymiles-reserve",
  "delta skymiles gold": "delta-skymiles-gold",
  "delta gold": "delta-skymiles-gold",
  
  // Hilton Cards
  "hilton honors aspire": "hilton-honors-aspire",
  "hilton aspire": "hilton-honors-aspire",
  "hilton aspire card": "hilton-honors-aspire",
  
  // Chase Cards
  "chase sapphire preferred": "chase-sapphire-preferred",
  "sapphire preferred": "chase-sapphire-preferred",
  "chase sapphire preferred card": "chase-sapphire-preferred",
  "csp": "chase-sapphire-preferred",
  "chase slate edge": "chase-slate-edge",
  "slate edge": "chase-slate-edge",
  
  // Capital One
  "capital one venture x": "capital-one-venture-x",
  "venture x": "capital-one-venture-x",
  "venture x rewards": "capital-one-venture-x",
  
  // Citi Cards
  "citi double cash": "citi-double-cash",
  "double cash": "citi-double-cash",
  "citi double cash card": "citi-double-cash",
  "citi diamond preferred": "citi-diamond-preferred",
  "diamond preferred": "citi-diamond-preferred",
  
  // Discover
  "discover it balance transfer": "discover-it-balance-transfer",
  "discover it": "discover-it-balance-transfer",
  
  // Bank of America
  "bankamericard credit card": "bankamericard",
  "bank of america credit card": "bankamericard",
  
  // Wells Fargo
  "wells fargo reflect": "wells-fargo-reflect",
  "reflect card": "wells-fargo-reflect",
  
  // US Bank
  "us bank visa platinum": "us-bank-visa-platinum",
  "us bank platinum": "us-bank-visa-platinum",
  
  // Amazon
  "amazon business prime": "amazon-business-prime",
  "amazon prime business": "amazon-business-prime",
};

/**
 * Normalize a card name for lookup
 */
function normalizeCardName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[®™©]/g, '') // Remove trademark symbols
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

/**
 * Get the image path for a credit card by name
 * @param cardName - The card name (e.g., "Amex Gold Card", "Chase Sapphire Preferred")
 * @returns The image path or null if not found
 */
export function getCardImage(cardName: string): string | null {
  const normalized = normalizeCardName(cardName);
  
  // First, check direct slug match
  const slugified = normalized.replace(/\s+/g, '-');
  if (cardImages[slugified]) {
    return cardImages[slugified];
  }
  
  // Then check name variations
  if (nameVariations[normalized]) {
    const key = nameVariations[normalized];
    return cardImages[key] || null;
  }
  
  // Try partial matching for common patterns
  for (const [variation, key] of Object.entries(nameVariations)) {
    if (normalized.includes(variation) || variation.includes(normalized)) {
      return cardImages[key] || null;
    }
  }
  
  return null;
}

/**
 * Get all available card images
 */
export function getAllCardImages(): Record<string, string> {
  return { ...cardImages };
}

/**
 * Check if a card image exists
 */
export function hasCardImage(cardName: string): boolean {
  return getCardImage(cardName) !== null;
}

export default {
  getCardImage,
  getAllCardImages,
  hasCardImage,
};
