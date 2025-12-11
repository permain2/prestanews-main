import { defineField, defineType } from 'sanity'

export const insuranceProviderType = defineType({
  name: 'insuranceProvider',
  title: 'Insurance Provider',
  type: 'document',
  icon: () => '🛡️',
  fields: [
    defineField({
      name: 'name',
      title: 'Provider Name',
      type: 'string',
      description: 'e.g., "State Farm", "GEICO", "Lemonade"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      description: 'URL-friendly identifier (click Generate)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Insurance Category',
      type: 'string',
      description: 'What type of insurance?',
      options: {
        list: [
          { title: '🏠 Renters Insurance', value: 'renters' },
          { title: '❤️ Life Insurance', value: 'life' },
          { title: '🚗 Car Insurance', value: 'car' },
          { title: '🏡 Home Insurance', value: 'home' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'string',
      description: 'e.g., "Budget-Conscious Drivers", "Military Members"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'monthlyAvg',
      title: 'Monthly Average Cost',
      type: 'string',
      description: 'e.g., "$120" - for Car and Renters insurance',
    }),
    defineField({
      name: 'annualAvg',
      title: 'Annual Average Cost',
      type: 'string',
      description: 'e.g., "$1,680" - for Home insurance',
    }),
    defineField({
      name: 'coverage',
      title: 'Coverage Amount',
      type: 'string',
      description: 'e.g., "$30,000+" - for Renters insurance',
    }),
    defineField({
      name: 'policyTypes',
      title: 'Policy Types',
      type: 'string',
      description: 'e.g., "Term, Whole, Universal" - for Life insurance',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5 (e.g., 4.9)',
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'amBest',
      title: 'AM Best Rating',
      type: 'string',
      description: 'e.g., "A++", "A+", "A"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short description of the provider',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'affiliateLink',
      title: 'Affiliate/Quote Link',
      type: 'url',
      description: 'The link to get a quote or apply',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'logo',
      title: 'Provider Logo',
      type: 'image',
      description: 'Upload the insurance provider logo',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoPath',
      title: 'Logo Path (Legacy)',
      type: 'string',
      description: 'Path to existing logo in /public folder',
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of provider benefits',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of provider drawbacks',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3...)',
      initialValue: 100,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide this provider',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Rating (Highest)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
      rating: 'rating',
    },
    prepare({ title, subtitle, media, rating }) {
      const categoryLabels: Record<string, string> = {
        renters: '🏠 Renters',
        life: '❤️ Life',
        car: '🚗 Car',
        home: '🏡 Home',
      }
      return {
        title,
        subtitle: `${categoryLabels[subtitle] || subtitle} • ⭐ ${rating || 'N/A'}`,
        media,
      }
    },
  },
})
