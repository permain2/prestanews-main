import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity client configuration
export const sanityClient = createClient({
  projectId: 'zhn3pkul',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for faster reads in production
})

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// TypeScript types for Credit Card
export interface CreditCard {
  _id: string
  name: string
  slug: { current: string }
  category: 'travel' | 'cashback' | 'business' | 'no-annual-fee'
  bestFor: string
  annualFee: string
  welcomeBonus: string
  rating: number
  description: string
  affiliateLink?: string
  cardImage?: SanityImageSource
  pros: string[]
  cons: string[]
  issuer?: string
  displayOrder: number
  isActive: boolean
}

// GROQ Queries
export const CREDIT_CARDS_BY_CATEGORY = `
  *[_type == "creditCard" && category == $category && isActive == true] | order(displayOrder asc) {
    _id,
    name,
    slug,
    category,
    bestFor,
    annualFee,
    welcomeBonus,
    rating,
    description,
    affiliateLink,
    cardImage,
    pros,
    cons,
    issuer,
    displayOrder
  }
`

export const ALL_CREDIT_CARDS = `
  *[_type == "creditCard" && isActive == true] | order(displayOrder asc) {
    _id,
    name,
    slug,
    category,
    bestFor,
    annualFee,
    welcomeBonus,
    rating,
    description,
    affiliateLink,
    cardImage,
    pros,
    cons,
    issuer,
    displayOrder
  }
`

// Fetch functions
export async function getCreditCardsByCategory(category: string): Promise<CreditCard[]> {
  return sanityClient.fetch(CREDIT_CARDS_BY_CATEGORY, { category })
}

export async function getAllCreditCards(): Promise<CreditCard[]> {
  return sanityClient.fetch(ALL_CREDIT_CARDS)
}


