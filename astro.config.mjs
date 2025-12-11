import tailwind from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || 'https://www.screened.com',
	integrations: [
		mdx(), 
		sitemap({
			// Exclude admin pages from sitemap
			filter: (page) => !page.includes('/admin'),
		}), 
		react({
			// Include Sanity packages for JSX transformation
			include: ['**/sanity/**', '**/node_modules/sanity/**', '**/node_modules/@sanity/**'],
		}),
	],
	vite: {
		plugins: [tailwind()],
		// Optimize Sanity Studio dependencies
		optimizeDeps: {
			include: ['sanity', '@sanity/vision', 'react', 'react-dom'],
		},
		ssr: {
			// These packages should not be externalized during SSR
			noExternal: ['sanity', '@sanity/vision', '@sanity/client'],
		},
	},
	// Server mode with static prerendering for most pages, serverless for API routes
	output: 'server',
	adapter: vercel(),
	trailingSlash: 'ignore',
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
	compressHTML: true,
});
