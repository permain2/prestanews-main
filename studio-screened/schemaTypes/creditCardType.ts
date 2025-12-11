import {defineField, defineType} from 'sanity'

export const creditCardType = defineType({
  name: 'creditCard',
  title: 'Credit Card',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Card Name',
      type: 'string',
      description: 'e.g., "American Express Platinum Card®"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      description: 'URL-friendly identifier (auto-generated from name)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Which page should this card appear on?',
      options: {
        list: [
          {title: 'Travel Cards', value: 'travel'},
          {title: 'Cash Back', value: 'cashback'},
          {title: 'Business', value: 'business'},
          {title: 'No Annual Fee', value: 'no-annual-fee'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'string',
      description: 'e.g., "Premium Travel", "Cash Back on Groceries"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'annualFee',
      title: 'Annual Fee',
      type: 'string',
      description: 'e.g., "$895" or "$0 intro, then $95"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'welcomeBonus',
      title: 'Welcome Bonus',
      type: 'string',
      description: 'e.g., "80,000 Membership Rewards points"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5 (e.g., 4.9)',
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short description of the card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
      description: 'The affiliate application link (e.g., https://americanexpress.com/apply?ref=...)',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      description: 'Upload an image of the credit card',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of card benefits/advantages',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of card drawbacks',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'issuer',
      title: 'Card Issuer',
      type: 'string',
      description: 'e.g., "American Express", "Chase", "Capital One"',
      options: {
        list: [
          {title: 'American Express', value: 'amex'},
          {title: 'Chase', value: 'chase'},
          {title: 'Capital One', value: 'capital-one'},
          {title: 'Citi', value: 'citi'},
          {title: 'Bank of America', value: 'bofa'},
          {title: 'Wells Fargo', value: 'wells-fargo'},
          {title: 'Discover', value: 'discover'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first on the page (e.g., 1, 2, 3...)',
      initialValue: 100,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide this card from the website',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
    {
      title: 'Rating (Highest First)',
      name: 'ratingDesc',
      by: [{field: 'rating', direction: 'desc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'cardImage',
    },
    prepare({title, subtitle, media}) {
      const categoryLabels: Record<string, string> = {
        travel: '✈️ Travel',
        cashback: '💵 Cash Back',
        business: '💼 Business',
        'no-annual-fee': '🆓 No Annual Fee',
      }
      return {
        title,
        subtitle: categoryLabels[subtitle] || subtitle,
        media,
      }
    },
  },
})


