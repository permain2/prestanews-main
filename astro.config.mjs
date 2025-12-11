import tailwind from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || 'https://www.screened.com',
	integrations: [mdx(), sitemap(), react()],
	vite: {
		plugins: [tailwind()],
	},
	// Hybrid: static pages + serverless API routes
	output: 'hybrid',
	adapter: vercel(),
	trailingSlash: 'ignore',
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
	compressHTML: true,
});
