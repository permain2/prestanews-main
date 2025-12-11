import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).optional(),
		// Optional fields from guide content
		author: z.string().optional(),
		authorImage: z.string().optional(),
		authorRole: z.string().optional(),
		category: z.string().optional(),
	}),
});

const reviews = defineCollection({
    loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        // Review specific fields
        rating: z.number().min(0).max(5).optional(),
        affiliateLink: z.string().url().optional(),
        pros: z.array(z.string()).optional(),
        cons: z.array(z.string()).optional(),
        category: z.enum(['electronics', 'credit_cards', 'software', 'general']).default('general'),
    }),
});

export const collections = { blog, reviews };
