import tailwind from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || 'https://www.screened.com',
	integrations: [mdx(), sitemap(), react()],
	vite: {
		plugins: [tailwind()],
	},
	output: 'static',
	trailingSlash: 'ignore',
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
	compressHTML: true,
});
