/**
 * Migration script to move existing credit cards to Sanity
 * 
 * Run with: SANITY_TOKEN=your_token node scripts/migrate-cards-to-sanity.js
 * 
 * Get your token from: https://www.sanity.io/manage/project/zhn3pkul/api#tokens
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'zhn3pkul',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // Get from Sanity dashboard
  useCdn: false,
})

// Helper to create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[®™]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Travel Cards (from best-travel-cards.astro)
const travelCards = [
  {
    name: "American Express Platinum Card®",
    bestFor: "Premium Travel",
    annualFee: "$895",
    welcomeBonus: "80,000 Membership Rewards points",
    rating: 4.9,
    pros: ["5X points on flights & prepaid hotels", "Premium lounge access", "$200 airline fee credit", "$200 hotel credit"],
    cons: ["High annual fee", "Amex acceptance limitations"],
    description: "The premier travel rewards card with extensive lounge access, elite status, and premium travel benefits.",
    category: "travel",
    displayOrder: 1,
  },
  {
    name: "The Business Platinum Card® from American Express",
    bestFor: "Business Travel",
    annualFee: "$895",
    welcomeBonus: "200,000 Membership Rewards points",
    rating: 4.8,
    pros: ["Massive welcome bonus", "5X on flights & hotels", "35% points rebate on Pay with Points", "Dell and Indeed credits"],
    cons: ["High annual fee", "Complex benefits structure"],
    description: "A premium business card packed with travel benefits and elevated earning rates for business spending.",
    category: "travel",
    displayOrder: 2,
  },
  {
    name: "American Express® Gold Card",
    bestFor: "Travel & Dining",
    annualFee: "$325",
    welcomeBonus: "60,000 Membership Rewards points",
    rating: 4.9,
    pros: ["4X at restaurants worldwide", "3X on flights", "$120 dining credit", "$120 Uber Cash"],
    cons: ["Annual fee increased", "Supermarket cap of $25K/year"],
    description: "Outstanding travel and dining card with valuable Membership Rewards points and monthly credits.",
    category: "travel",
    displayOrder: 3,
  },
  {
    name: "Delta SkyMiles® Reserve American Express Card",
    bestFor: "Premium Delta Status",
    annualFee: "$650",
    welcomeBonus: "90,000 bonus miles",
    rating: 4.6,
    pros: ["3X miles on Delta", "Delta Sky Club access", "MQD waiver up to $25K", "Companion certificate"],
    cons: ["High annual fee", "Limited earning outside Delta"],
    description: "The ultimate Delta card with Sky Club access and accelerated path to elite status.",
    category: "travel",
    displayOrder: 4,
  },
  {
    name: "Delta SkyMiles® Gold American Express Card",
    bestFor: "Delta Flyers",
    annualFee: "$0 intro, then $150",
    welcomeBonus: "50,000 bonus miles",
    rating: 4.5,
    pros: ["2X miles on Delta", "2X at restaurants", "Free checked bag", "Priority boarding"],
    cons: ["Limited earning outside Delta", "Annual fee after year 1"],
    description: "The go-to card for casual Delta flyers with free checked bags and priority boarding.",
    category: "travel",
    displayOrder: 5,
  },
  {
    name: "Hilton Honors American Express Aspire Card",
    bestFor: "Hilton Loyalty",
    annualFee: "$550",
    welcomeBonus: "175,000 Hilton Honors points",
    rating: 4.7,
    pros: ["Automatic Diamond status", "Free weekend night yearly", "$400 Hilton resort credit", "14X at Hilton properties"],
    cons: ["High annual fee", "Benefits tied to Hilton"],
    description: "The pinnacle Hilton card with automatic Diamond status and incredible earning rates.",
    category: "travel",
    displayOrder: 6,
  },
  {
    name: "American Express® Green Card",
    bestFor: "Everyday Travel",
    annualFee: "$150",
    welcomeBonus: "40,000 Membership Rewards points",
    rating: 4.3,
    pros: ["3X on travel & transit", "3X at restaurants", "$189 CLEAR credit", "LoungeBuddy credit"],
    cons: ["Lower earning than Gold", "Fewer premium benefits"],
    description: "An affordable entry into Membership Rewards with solid travel and dining earning.",
    category: "travel",
    displayOrder: 7,
  },
]

// Cash Back Cards (from best-cashback.astro)
const cashbackCards = [
  {
    name: "Blue Cash Preferred® Card from American Express",
    bestFor: "Cash Back on Groceries",
    annualFee: "$0 intro, then $95",
    welcomeBonus: "$350 statement credit",
    rating: 4.7,
    pros: ["6% at U.S. supermarkets (up to $6K)", "6% on streaming", "3% at U.S. gas stations", "3% on transit"],
    cons: ["$6K supermarket cap", "Annual fee after first year"],
    description: "Industry-leading 6% cash back at U.S. supermarkets makes this ideal for families.",
    category: "cashback",
    displayOrder: 1,
  },
  {
    name: "Blue Cash Everyday® Card from American Express",
    bestFor: "No Annual Fee Cash Back",
    annualFee: "$0",
    welcomeBonus: "$200 statement credit",
    rating: 4.5,
    pros: ["3% at U.S. supermarkets", "3% at U.S. gas stations", "3% on online retail", "No annual fee"],
    cons: ["$6K supermarket cap", "Lower rates than Blue Cash Preferred"],
    description: "Solid cash back with no annual fee, perfect for everyday spending at supermarkets and gas stations.",
    category: "cashback",
    displayOrder: 2,
  },
  {
    name: "American Express Cash Magnet® Card",
    bestFor: "Flat-Rate Cash Back",
    annualFee: "$0",
    welcomeBonus: "$200 statement credit",
    rating: 4.3,
    pros: ["Unlimited 1.5% cash back on all purchases", "No annual fee", "Intro 0% APR", "Simple rewards structure"],
    cons: ["Lower earning than category cards", "No bonus categories"],
    description: "Simple, straightforward card for those who want cash back on everything without tracking categories.",
    category: "cashback",
    displayOrder: 3,
  },
  {
    name: "American Express® Green Card",
    bestFor: "Travel Cash Back",
    annualFee: "$150",
    welcomeBonus: "40,000 Membership Rewards points",
    rating: 4.3,
    pros: ["3X on travel & transit", "3X at restaurants", "$189 CLEAR credit", "Convertible to cash back"],
    cons: ["Has annual fee", "Points vs direct cash back"],
    description: "Earn valuable points that can be redeemed for cash back or transferred to travel partners.",
    category: "cashback",
    displayOrder: 4,
  },
]

// Combine all cards
const allCards = [...travelCards, ...cashbackCards]

async function migrateCards() {
  console.log('🚀 Starting migration to Sanity...\n')
  
  for (const card of allCards) {
    const doc = {
      _type: 'creditCard',
      name: card.name,
      slug: { _type: 'slug', current: createSlug(card.name) },
      category: card.category,
      bestFor: card.bestFor,
      annualFee: card.annualFee,
      welcomeBonus: card.welcomeBonus,
      rating: card.rating,
      description: card.description,
      pros: card.pros,
      cons: card.cons,
      issuer: 'amex',
      displayOrder: card.displayOrder,
      isActive: true,
      // affiliateLink will be empty - your team will add these!
    }
    
    try {
      const result = await client.create(doc)
      console.log(`✅ Created: ${card.name} (${result._id})`)
    } catch (error) {
      console.error(`❌ Failed: ${card.name}`, error.message)
    }
  }
  
  console.log('\n🎉 Migration complete!')
  console.log('Now open your Sanity Studio to add affiliate links and images.')
}

migrateCards()


