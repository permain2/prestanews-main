# PrestaNews - Financial Reviews & Guides

PrestaNews is a modern affiliate website for credit card reviews, insurance guides, and financial insights. Built with Astro, React, and Tailwind CSS.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/permain2/prestanews-main)

## 🚀 Features

- ✅ **Credit Card Reviews** - Comprehensive reviews with affiliate links
- ✅ **Insurance Guides** - Car, home, renters, and life insurance coverage
- ✅ **Financial News** - Latest industry updates and insights
- ✅ **SEO Optimized** - Sitemap, meta tags, and structured data
- ✅ **Fast & Modern** - Built with Astro for 100/100 Lighthouse scores
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **AI Content Generation** - Scripts to generate articles using Claude API

## 📦 Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: React for interactive elements
- **Content**: Markdown & MDX
- **Deployment**: Vercel

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/permain2/prestanews-main.git
cd prestanews-main

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Build for Production

```bash
npm run build
```

The static site will be generated in the `./dist/` directory.

## 🚀 Deployment to Vercel

### Option 1: One-Click Deploy

Click the "Deploy with Vercel" button above to deploy instantly.

### Option 2: Manual Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Astro and configure build settings
6. Click "Deploy"

### Environment Variables (Optional)

If using AI content generation, set these in Vercel:

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic/Claude API key |
| `SITE_URL` | Your production URL (e.g., https://prestanews.com) |

## 📁 Project Structure

```
├── public/              # Static assets (images, fonts)
│   ├── blog-images/     # Blog post featured images
│   ├── team/            # Team member photos
│   └── icons/           # Site icons
├── src/
│   ├── components/      # Astro & React components
│   ├── content/         # Markdown content (blog, reviews)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   └── styles/          # Global CSS
├── scripts/             # AI content generation scripts
├── astro.config.mjs     # Astro configuration
├── vercel.json          # Vercel configuration
└── package.json
```

## 📝 Content Management

### Adding Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
pubDate: 2025-01-01
heroImage: "/blog-images/your-image.jpg"
author: "Author Name"
authorImage: "/team/author.jpg"
authorRole: "Job Title"
tags: ["credit-cards", "guide"]
---

Your content here...
```

### Pages

- `/` - Homepage
- `/credit-cards` - Credit card reviews
- `/insurance` - Insurance guides hub
- `/guides` - Financial guides
- `/news` - Latest news
- `/about` - About us
- `/contact` - Contact form

## 🧞 Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview production build locally |

## 📄 License

MIT License - feel free to use this template for your own projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
