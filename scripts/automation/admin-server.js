/**
 * Admin Server - Local dashboard for article management
 * 
 * Provides:
 * - Static file serving for admin UI
 * - REST API for keywords and articles
 * - Image listing from public folders
 * - Page generation and publishing
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8050;

// Paths
const ROOT_DIR = path.join(__dirname, '../..');
const ADMIN_DIR = path.join(ROOT_DIR, 'admin');
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const PAGES_DIR = path.join(ROOT_DIR, 'src/pages');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files if they don't exist
const KEYWORDS_FILE = path.join(DATA_DIR, 'keywords.json');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');

if (!fs.existsSync(KEYWORDS_FILE)) {
  // Copy from sample-keywords.json and add status
  const sampleKeywordsPath = path.join(__dirname, 'config/sample-keywords.json');
  const sampleKeywords = JSON.parse(fs.readFileSync(sampleKeywordsPath, 'utf-8'));
  const keywordsWithStatus = sampleKeywords.keywords.map(k => ({
    ...k,
    status: 'not_started',
    slug: k.keyword.toLowerCase().replace(/\s+/g, '-'),
    lastModified: null
  }));
  fs.writeFileSync(KEYWORDS_FILE, JSON.stringify({ keywords: keywordsWithStatus }, null, 2));
}

if (!fs.existsSync(ARTICLES_FILE)) {
  fs.writeFileSync(ARTICLES_FILE, JSON.stringify({ articles: {} }, null, 2));
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(ADMIN_DIR));

// Helper functions
function loadKeywords() {
  const data = JSON.parse(fs.readFileSync(KEYWORDS_FILE, 'utf-8'));
  // Handle both 'keywords' and 'records' formats
  const keywords = data.keywords || data.records || [];
  // Add slug if missing
  return {
    keywords: keywords.map(k => ({
      ...k,
      slug: k.slug || k.keyword.toLowerCase().replace(/\s+/g, '-')
    }))
  };
}

function saveKeywords(data) {
  fs.writeFileSync(KEYWORDS_FILE, JSON.stringify(data, null, 2));
}

function loadArticles() {
  return JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf-8'));
}

function saveArticles(data) {
  fs.writeFileSync(ARTICLES_FILE, JSON.stringify(data, null, 2));
}

// ==================== API ROUTES ====================

// GET /api/keywords - List all keywords with status
app.get('/api/keywords', (req, res) => {
  try {
    const data = loadKeywords();
    const articles = loadArticles();
    
    // Enrich keywords with article status
    const enrichedKeywords = data.keywords.map(k => ({
      ...k,
      hasArticle: !!articles.articles[k.slug],
      status: articles.articles[k.slug]?.status || k.status || 'not_started'
    }));
    
    res.json({ keywords: enrichedKeywords });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/keywords/:slug - Get single keyword
app.get('/api/keywords/:slug', (req, res) => {
  try {
    const data = loadKeywords();
    const keyword = data.keywords.find(k => k.slug === req.params.slug);
    if (!keyword) {
      return res.status(404).json({ error: 'Keyword not found' });
    }
    res.json(keyword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/articles - List all articles
app.get('/api/articles', (req, res) => {
  try {
    const data = loadArticles();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/articles/:slug - Get single article
app.get('/api/articles/:slug', (req, res) => {
  try {
    const data = loadArticles();
    const article = data.articles[req.params.slug];
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/articles/:slug - Save article (draft)
app.post('/api/articles/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const articleData = req.body;
    
    const data = loadArticles();
    data.articles[slug] = {
      ...articleData,
      slug,
      status: articleData.status || 'draft',
      lastModified: new Date().toISOString()
    };
    
    saveArticles(data);
    
    // Update keyword status
    const keywordsData = loadKeywords();
    const keywordIndex = keywordsData.keywords.findIndex(k => k.slug === slug);
    if (keywordIndex !== -1) {
      keywordsData.keywords[keywordIndex].status = articleData.status || 'draft';
      keywordsData.keywords[keywordIndex].lastModified = new Date().toISOString();
      saveKeywords(keywordsData);
    }
    
    res.json({ success: true, article: data.articles[slug] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/publish/:slug - Generate Astro page and commit
app.post('/api/publish/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const data = loadArticles();
    const article = data.articles[slug];
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Generate the Astro page using page-publisher-v2
    const { default: PagePublisher } = await import('./page-publisher-v2.js');
    const publisher = new PagePublisher();
    const result = publisher.generatePage(article);
    
    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }
    
    // Update article status to published
    data.articles[slug] = {
      ...article,
      status: 'published',
      publishedAt: new Date().toISOString()
    };
    saveArticles(data);
    
    // Update keyword status
    const keywordsData = loadKeywords();
    const keywordIndex = keywordsData.keywords.findIndex(k => k.slug === slug);
    if (keywordIndex !== -1) {
      keywordsData.keywords[keywordIndex].status = 'published';
      saveKeywords(keywordsData);
    }
    
    // Git commit (optional - only if git is available)
    try {
      execSync(`git add "${result.filePath}"`, { cwd: ROOT_DIR });
      execSync(`git commit -m "Publish article: ${article.title}"`, { cwd: ROOT_DIR });
      console.log('Git commit successful');
    } catch (gitError) {
      console.log('Git commit skipped:', gitError.message);
    }
    
    res.json({ 
      success: true, 
      filePath: result.filePath,
      url: `/${article.category}/${slug}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/images/:folder - List images in public folder
app.get('/api/images/:folder', (req, res) => {
  try {
    const { folder } = req.params;
    const folderPath = path.join(PUBLIC_DIR, folder);
    
    if (!fs.existsSync(folderPath)) {
      return res.json({ images: [] });
    }
    
    const files = fs.readdirSync(folderPath)
      .filter(f => /\.(png|jpg|jpeg|svg|webp)$/i.test(f))
      .map(f => ({
        name: f,
        path: `/${folder}/${f}`,
        url: `/${folder}/${f}`
      }));
    
    res.json({ images: files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/image-folders - List all image folders in public
app.get('/api/image-folders', (req, res) => {
  try {
    const folders = fs.readdirSync(PUBLIC_DIR)
      .filter(f => {
        const fullPath = path.join(PUBLIC_DIR, f);
        return fs.statSync(fullPath).isDirectory() && 
               (f.includes('logo') || f.includes('image') || f.includes('hero') || f.includes('card'));
      })
      .map(f => ({
        name: f,
        path: `/${f}`
      }));
    
    res.json({ folders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/categories - Get category configuration
app.get('/api/categories', (req, res) => {
  try {
    const categoriesPath = path.join(__dirname, 'config/categories.json');
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/preview/:slug - Generate preview HTML
app.get('/api/preview/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const data = loadArticles();
    const article = data.articles[slug];
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Generate a simple preview HTML
    const { default: PagePublisher } = await import('./page-publisher-v2.js');
    const publisher = new PagePublisher();
    const previewHtml = publisher.generatePreviewHtml(article);
    
    res.send(previewHtml);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/stats - Dashboard statistics
app.get('/api/stats', (req, res) => {
  try {
    const keywords = loadKeywords();
    const articles = loadArticles();
    
    const stats = {
      totalKeywords: keywords.keywords.length,
      notStarted: keywords.keywords.filter(k => k.status === 'not_started' || !k.status).length,
      inProgress: keywords.keywords.filter(k => k.status === 'draft' || k.status === 'in_progress').length,
      published: keywords.keywords.filter(k => k.status === 'published').length,
      totalArticles: Object.keys(articles.articles).length,
      byCategory: {}
    };
    
    // Group by category
    keywords.keywords.forEach(k => {
      if (!stats.byCategory[k.category]) {
        stats.byCategory[k.category] = { total: 0, published: 0 };
      }
      stats.byCategory[k.category].total++;
      if (k.status === 'published') {
        stats.byCategory[k.category].published++;
      }
    });
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/articles/:slug - Delete article
app.delete('/api/articles/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const data = loadArticles();
    
    if (!data.articles[slug]) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    delete data.articles[slug];
    saveArticles(data);
    
    // Reset keyword status
    const keywordsData = loadKeywords();
    const keywordIndex = keywordsData.keywords.findIndex(k => k.slug === slug);
    if (keywordIndex !== -1) {
      keywordsData.keywords[keywordIndex].status = 'not_started';
      saveKeywords(keywordsData);
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== CSV UPLOAD API ====================

// POST /api/upload-keywords - Upload Ahrefs CSV
app.post('/api/upload-keywords', (req, res) => {
  try {
    const { csvData } = req.body;
    
    if (!csvData) {
      return res.status(400).json({ error: 'No CSV data provided' });
    }
    
    // Parse CSV (tab-separated from Ahrefs)
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split('\t').map(h => h.replace(/"/g, '').toLowerCase());
    
    const keywords = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split('\t').map(v => v.replace(/"/g, ''));
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });
      
      // Map to our format
      if (row.keyword) {
        keywords.push({
          id: `ahrefs_${Date.now()}_${i}`,
          keyword: row.keyword,
          category: detectCategory(row.keyword),
          priority: row.difficulty <= 10 ? 1 : row.difficulty <= 30 ? 2 : 3,
          status: 'not_started',
          search_volume: parseInt(row.volume) || 0,
          difficulty: parseInt(row.difficulty) || 0,
          cpc: parseFloat(row.cpc) || 0,
          slug: row.keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
          lastModified: null
        });
      }
    }
    
    // Save to keywords file
    const data = { keywords };
    saveKeywords(data);
    
    res.json({ success: true, count: keywords.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper to detect category from keyword
function detectCategory(keyword) {
  const kw = keyword.toLowerCase();
  if (kw.includes('credit card') || kw.includes('card')) return 'credit-cards';
  if (kw.includes('insurance')) return 'insurance';
  if (kw.includes('loan') || kw.includes('savings') || kw.includes('bank') || kw.includes('mortgage')) return 'finance';
  if (kw.includes('mattress') || kw.includes('furniture') || kw.includes('home')) return 'home';
  if (kw.includes('phone') || kw.includes('laptop') || kw.includes('headset') || kw.includes('monitor') || kw.includes('keyboard')) return 'tech';
  return 'lifestyle'; // Default
}

// ==================== SIMPLE PAGE CONTENT API ====================

const PAGE_CONTENT_DIR = path.join(DATA_DIR, 'page-content');
if (!fs.existsSync(PAGE_CONTENT_DIR)) {
  fs.mkdirSync(PAGE_CONTENT_DIR, { recursive: true });
}

// GET /api/page-content/:slug - Get page content
app.get('/api/page-content/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const filePath = path.join(PAGE_CONTENT_DIR, `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/page-content/:slug - Save page content
app.post('/api/page-content/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const { html, status } = req.body;
    
    const filePath = path.join(PAGE_CONTENT_DIR, `${slug}.json`);
    const content = {
      slug,
      html,
      status: status || 'draft',
      lastModified: new Date().toISOString()
    };
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/generate-article/:slug - Generate article with AI
app.post('/api/generate-article/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Get keyword info
    const keywordsData = loadKeywords();
    const keyword = keywordsData.keywords.find(k => k.slug === slug);
    
    if (!keyword) {
      return res.status(404).json({ error: 'Keyword not found' });
    }
    
    // Generate HTML content using the article template
    const html = generateArticleHtml(keyword);
    
    // Save the content
    const filePath = path.join(PAGE_CONTENT_DIR, `${slug}.json`);
    const content = {
      slug,
      html,
      status: 'draft',
      lastModified: new Date().toISOString()
    };
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    
    // Update keyword status
    const keywordIndex = keywordsData.keywords.findIndex(k => k.slug === slug);
    if (keywordIndex !== -1) {
      keywordsData.keywords[keywordIndex].status = 'draft';
      saveKeywords(keywordsData);
    }
    
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate article HTML from template
function generateArticleHtml(keyword) {
  const title = keyword.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const year = new Date().getFullYear();
  const category = keyword.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return `
<!-- Hero Section -->
<section style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 5rem 1.5rem; text-align: center;">
  <div style="max-width: 800px; margin: 0 auto;">
    <span style="display: inline-block; padding: 0.375rem 0.75rem; background: rgba(255,255,255,0.1); border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.5rem;" data-editable="text">${category.toUpperCase()}</span>
    <h1 style="font-family: 'Sora', sans-serif; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; letter-spacing: -0.02em;" data-editable="text">${title} ${year}: Top 10 Ranked</h1>
    <p style="font-size: 1.125rem; color: rgba(255,255,255,0.8); margin-bottom: 1.5rem;" data-editable="text">Compare the best options with comprehensive reviews, pricing analysis, and expert recommendations.</p>
    <div style="font-size: 0.875rem; color: rgba(255,255,255,0.6);" data-editable="text">By Sarah Chen | Updated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
  </div>
</section>

<!-- Disclosure -->
<div style="background: white; border-bottom: 1px solid #e2e8f0; padding: 1rem 1.5rem; font-size: 0.8rem; color: #64748b; text-align: center;">
  <span data-editable="text">We may receive compensation when you click on links. Our analysis is based on independent research.</span>
</div>

<!-- Research Intro -->
<section style="background: #f8fafc; padding: 2rem 1.5rem; text-align: center;">
  <p style="max-width: 800px; margin: 0 auto; color: #475569; font-size: 1.0625rem; line-height: 1.7;" data-editable="text">After analyzing over 50 options across 12 key metrics including price, quality, customer reviews, and value, we've identified the top 10 picks for ${year}.</p>
</section>

<!-- Provider Cards -->
<section style="max-width: 900px; margin: 0 auto; padding: 3rem 1.5rem;">
  
  <!-- Provider 1 -->
  <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; margin-bottom: 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 1.5rem; border-bottom: 1px solid #e2e8f0;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="/insurance-logos-small/allianz.png" alt="Logo" style="width: 48px; height: 48px; object-fit: contain; border-radius: 8px; background: #f8fafc; padding: 4px;" data-editable="image">
        <div>
          <h3 style="font-family: 'Lexend', sans-serif; font-size: 1.25rem; font-weight: 600; color: #0f172a; margin: 0;" data-editable="text">1. Top Rated Option</h3>
          <span style="font-size: 0.8rem; color: #64748b;" data-editable="text">Best Overall</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.25rem; font-family: 'Lexend', sans-serif; font-weight: 600; font-size: 1.125rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0f172a"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span data-editable="text">4.9</span>
      </div>
    </div>
    <div style="padding: 1.5rem;">
      <p style="color: #475569; margin-bottom: 1.25rem; line-height: 1.7;" data-editable="text">Industry-leading quality with excellent customer reviews. Offers the best combination of features, reliability, and value for most users.</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem;">
        <div style="text-align: center; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
          <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.25rem;">Price</div>
          <div style="font-family: 'Lexend', sans-serif; font-weight: 600;" data-editable="text">$49-$99</div>
        </div>
        <div style="text-align: center; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
          <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.25rem;">Rating</div>
          <div style="font-family: 'Lexend', sans-serif; font-weight: 600;" data-editable="text">4.9/5</div>
        </div>
        <div style="text-align: center; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
          <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.25rem;">Best For</div>
          <div style="font-family: 'Lexend', sans-serif; font-weight: 600;" data-editable="text">Most Users</div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div>
          <h4 style="font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem; color: #475569;">Pros</h4>
          <ul style="list-style: none; font-size: 0.875rem; color: #475569; padding: 0; margin: 0;">
            <li style="padding: 0.25rem 0;" data-editable="text">✓ Excellent quality and durability</li>
            <li style="padding: 0.25rem 0;" data-editable="text">✓ Great customer support</li>
            <li style="padding: 0.25rem 0;" data-editable="text">✓ Best value for money</li>
          </ul>
        </div>
        <div>
          <h4 style="font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem; color: #475569;">Cons</h4>
          <ul style="list-style: none; font-size: 0.875rem; color: #475569; padding: 0; margin: 0;">
            <li style="padding: 0.25rem 0;" data-editable="text">✗ Premium pricing</li>
            <li style="padding: 0.25rem 0;" data-editable="text">✗ Limited color options</li>
          </ul>
        </div>
      </div>
    </div>
    <div style="padding: 1rem 1.5rem; border-top: 1px solid #e2e8f0; background: #f8fafc;">
      <a href="#" style="display: block; text-align: center; padding: 0.875rem; background: #0f172a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.9rem;" data-editable="link">View Details →</a>
    </div>
  </div>
  
  <!-- Provider 2 -->
  <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; margin-bottom: 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 1.5rem; border-bottom: 1px solid #e2e8f0;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="/insurance-logos-small/worldnomads.png" alt="Logo" style="width: 48px; height: 48px; object-fit: contain; border-radius: 8px; background: #f8fafc; padding: 4px;" data-editable="image">
        <div>
          <h3 style="font-family: 'Lexend', sans-serif; font-size: 1.25rem; font-weight: 600; color: #0f172a; margin: 0;" data-editable="text">2. Best Value Pick</h3>
          <span style="font-size: 0.8rem; color: #64748b;" data-editable="text">Budget-Friendly</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.25rem; font-family: 'Lexend', sans-serif; font-weight: 600; font-size: 1.125rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0f172a"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span data-editable="text">4.7</span>
      </div>
    </div>
    <div style="padding: 1.5rem;">
      <p style="color: #475569; margin-bottom: 1.25rem; line-height: 1.7;" data-editable="text">Great balance of quality and affordability. Perfect for budget-conscious buyers who don't want to compromise on essential features.</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem;">
        <div style="text-align: center; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
          <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.25rem;">Price</div>
          <div style="font-family: 'Lexend', sans-serif; font-weight: 600;" data-editable="text">$29-$59</div>
        </div>
        <div style="text-align: center; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
          <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.25rem;">Rating</div>
          <div style="font-family: 'Lexend', sans-serif; font-weight: 600;" data-editable="text">4.7/5</div>
        </div>
        <div style="text-align: center; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
          <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.25rem;">Best For</div>
          <div style="font-family: 'Lexend', sans-serif; font-weight: 600;" data-editable="text">Budget</div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div>
          <h4 style="font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem; color: #475569;">Pros</h4>
          <ul style="list-style: none; font-size: 0.875rem; color: #475569; padding: 0; margin: 0;">
            <li style="padding: 0.25rem 0;" data-editable="text">✓ Affordable pricing</li>
            <li style="padding: 0.25rem 0;" data-editable="text">✓ Solid performance</li>
            <li style="padding: 0.25rem 0;" data-editable="text">✓ Good warranty</li>
          </ul>
        </div>
        <div>
          <h4 style="font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem; color: #475569;">Cons</h4>
          <ul style="list-style: none; font-size: 0.875rem; color: #475569; padding: 0; margin: 0;">
            <li style="padding: 0.25rem 0;" data-editable="text">✗ Fewer premium features</li>
            <li style="padding: 0.25rem 0;" data-editable="text">✗ Basic design</li>
          </ul>
        </div>
      </div>
    </div>
    <div style="padding: 1rem 1.5rem; border-top: 1px solid #e2e8f0; background: #f8fafc;">
      <a href="#" style="display: block; text-align: center; padding: 0.875rem; background: #0f172a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.9rem;" data-editable="link">View Details →</a>
    </div>
  </div>
  
  <!-- Provider 3 -->
  <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; margin-bottom: 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 1.5rem; border-bottom: 1px solid #e2e8f0;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="/insurance-logos-small/safetywing.png" alt="Logo" style="width: 48px; height: 48px; object-fit: contain; border-radius: 8px; background: #f8fafc; padding: 4px;" data-editable="image">
        <div>
          <h3 style="font-family: 'Lexend', sans-serif; font-size: 1.25rem; font-weight: 600; color: #0f172a; margin: 0;" data-editable="text">3. Premium Choice</h3>
          <span style="font-size: 0.8rem; color: #64748b;" data-editable="text">High-End Option</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.25rem; font-family: 'Lexend', sans-serif; font-weight: 600; font-size: 1.125rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0f172a"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span data-editable="text">4.8</span>
      </div>
    </div>
    <div style="padding: 1.5rem;">
      <p style="color: #475569; margin-bottom: 1.25rem; line-height: 1.7;" data-editable="text">Premium option with advanced features and exceptional build quality. Ideal for those who want the best of the best.</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem;">
        <div style="text-align: center; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
          <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.25rem;">Price</div>
          <div style="font-family: 'Lexend', sans-serif; font-weight: 600;" data-editable="text">$99-$199</div>
        </div>
        <div style="text-align: center; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
          <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.25rem;">Rating</div>
          <div style="font-family: 'Lexend', sans-serif; font-weight: 600;" data-editable="text">4.8/5</div>
        </div>
        <div style="text-align: center; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
          <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.25rem;">Best For</div>
          <div style="font-family: 'Lexend', sans-serif; font-weight: 600;" data-editable="text">Premium</div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div>
          <h4 style="font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem; color: #475569;">Pros</h4>
          <ul style="list-style: none; font-size: 0.875rem; color: #475569; padding: 0; margin: 0;">
            <li style="padding: 0.25rem 0;" data-editable="text">✓ Top-tier quality</li>
            <li style="padding: 0.25rem 0;" data-editable="text">✓ Advanced features</li>
            <li style="padding: 0.25rem 0;" data-editable="text">✓ Premium support</li>
          </ul>
        </div>
        <div>
          <h4 style="font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem; color: #475569;">Cons</h4>
          <ul style="list-style: none; font-size: 0.875rem; color: #475569; padding: 0; margin: 0;">
            <li style="padding: 0.25rem 0;" data-editable="text">✗ Higher price point</li>
            <li style="padding: 0.25rem 0;" data-editable="text">✗ May be overkill for basics</li>
          </ul>
        </div>
      </div>
    </div>
    <div style="padding: 1rem 1.5rem; border-top: 1px solid #e2e8f0; background: #f8fafc;">
      <a href="#" style="display: block; text-align: center; padding: 0.875rem; background: #0f172a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.9rem;" data-editable="link">View Details →</a>
    </div>
  </div>

</section>

<!-- FAQ Section -->
<section style="max-width: 800px; margin: 0 auto; padding: 3rem 1.5rem;">
  <h2 style="font-family: 'Sora', sans-serif; font-size: 1.75rem; font-weight: 700; text-align: center; margin-bottom: 2rem;" data-editable="text">Frequently Asked Questions</h2>
  <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
    <details style="border-bottom: 1px solid #e2e8f0;" open>
      <summary style="padding: 1rem 1.25rem; font-weight: 600; cursor: pointer;" data-editable="text">What should I look for when choosing?</summary>
      <div style="padding: 0 1.25rem 1rem; color: #475569; line-height: 1.7;" data-editable="text">Focus on quality, price, warranty, and customer reviews. Consider your specific needs and budget when making a decision.</div>
    </details>
    <details style="border-bottom: 1px solid #e2e8f0;">
      <summary style="padding: 1rem 1.25rem; font-weight: 600; cursor: pointer;" data-editable="text">How much should I expect to spend?</summary>
      <div style="padding: 0 1.25rem 1rem; color: #475569; line-height: 1.7;" data-editable="text">Prices range from $30 for budget options to $200+ for premium choices. Most people find good value in the $50-$100 range.</div>
    </details>
    <details>
      <summary style="padding: 1rem 1.25rem; font-weight: 600; cursor: pointer;" data-editable="text">Are there any warranties or guarantees?</summary>
      <div style="padding: 0 1.25rem 1rem; color: #475569; line-height: 1.7;" data-editable="text">Most reputable brands offer 1-2 year warranties. Premium options often include extended coverage and money-back guarantees.</div>
    </details>
  </div>
</section>

<!-- Author Box -->
<section style="max-width: 800px; margin: 0 auto; padding: 2rem 1.5rem 4rem;">
  <div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; display: flex; gap: 1rem; align-items: center;">
    <img src="/team/sarah-chen.jpg" alt="Author" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;" data-editable="image">
    <div>
      <div style="font-weight: 600; color: #0f172a;" data-editable="text">Sarah Chen</div>
      <div style="font-size: 0.875rem; color: #64748b;" data-editable="text">Expert reviewer with 10+ years of experience. Committed to helping readers make informed decisions.</div>
    </div>
  </div>
</section>
`;
}

// POST /api/publish-page/:slug - Publish page to live site
app.post('/api/publish-page/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { html } = req.body;
    
    // Get keyword info for category
    const keywordsData = loadKeywords();
    const keyword = keywordsData.keywords.find(k => k.slug === slug);
    const category = keyword?.category || 'general';
    
    // Create category directory
    const categoryDir = path.join(PAGES_DIR, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    // Generate Astro page
    const title = keyword?.keyword || slug;
    const astroContent = `---
/**
 * ${title}
 * Generated by Screened Page Editor
 * Published: ${new Date().toISOString()}
 */
import MainLayout from '../../layouts/MainLayout.astro';

const title = "${title.replace(/"/g, '\\"')}";
const description = "Compare and review the best options with expert analysis.";
---

<MainLayout title={title} description={description}>
  <Fragment set:html={\`${html.replace(/`/g, '\\`')}\`} />
</MainLayout>
`;
    
    const filePath = path.join(categoryDir, `${slug}.astro`);
    fs.writeFileSync(filePath, astroContent);
    
    // Update page content status
    const contentPath = path.join(PAGE_CONTENT_DIR, `${slug}.json`);
    if (fs.existsSync(contentPath)) {
      const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
      content.status = 'published';
      content.publishedAt = new Date().toISOString();
      fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
    }
    
    // Update keyword status
    if (keyword) {
      const keywordIndex = keywordsData.keywords.findIndex(k => k.slug === slug);
      if (keywordIndex !== -1) {
        keywordsData.keywords[keywordIndex].status = 'published';
        saveKeywords(keywordsData);
      }
    }
    
    // Git commit
    try {
      execSync(`git add "${filePath}"`, { cwd: ROOT_DIR });
      execSync(`git commit -m "Publish: ${title}"`, { cwd: ROOT_DIR });
    } catch (gitError) {
      console.log('Git commit skipped:', gitError.message);
    }
    
    res.json({ 
      success: true, 
      filePath,
      url: `/${category}/${slug}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== VISUAL EDITOR API ====================

const VISUAL_CONTENT_DIR = path.join(DATA_DIR, 'visual-content');
if (!fs.existsSync(VISUAL_CONTENT_DIR)) {
  fs.mkdirSync(VISUAL_CONTENT_DIR, { recursive: true });
}

// GET /api/visual-content/:slug - Get saved visual content
app.get('/api/visual-content/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const filePath = path.join(VISUAL_CONTENT_DIR, `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/visual-content/:slug - Save visual content
app.post('/api/visual-content/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const { html, css } = req.body;
    
    const filePath = path.join(VISUAL_CONTENT_DIR, `${slug}.json`);
    const content = {
      slug,
      html,
      css,
      lastModified: new Date().toISOString()
    };
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/visual-publish/:slug - Publish visual page to Astro
app.post('/api/visual-publish/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { html, css } = req.body;
    
    // Determine category from keywords
    const keywordsData = loadKeywords();
    const keyword = keywordsData.keywords.find(k => k.slug === slug);
    const category = keyword?.category || 'general';
    
    // Create category directory if needed
    const categoryDir = path.join(PAGES_DIR, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    // Generate Astro page with visual content
    const astroContent = `---
/**
 * Visual Editor Page: ${slug}
 * Generated by Screened Visual Editor
 * Last updated: ${new Date().toISOString()}
 */
import MainLayout from '../../layouts/MainLayout.astro';

const title = "${keyword?.keyword || slug}";
const description = "Comparison and review article";
---

<MainLayout title={title} description={description}>
  <style set:html={\`${css.replace(/`/g, '\\`')}\`}></style>
  <Fragment set:html={\`${html.replace(/`/g, '\\`')}\`} />
</MainLayout>
`;
    
    const filePath = path.join(categoryDir, `${slug}.astro`);
    fs.writeFileSync(filePath, astroContent);
    
    // Save visual content
    const visualPath = path.join(VISUAL_CONTENT_DIR, `${slug}.json`);
    fs.writeFileSync(visualPath, JSON.stringify({ slug, html, css, lastModified: new Date().toISOString() }, null, 2));
    
    // Update keyword status
    if (keyword) {
      const keywordIndex = keywordsData.keywords.findIndex(k => k.slug === slug);
      if (keywordIndex !== -1) {
        keywordsData.keywords[keywordIndex].status = 'published';
        saveKeywords(keywordsData);
      }
    }
    
    // Git commit (optional)
    try {
      execSync(`git add "${filePath}"`, { cwd: ROOT_DIR });
      execSync(`git commit -m "Publish visual page: ${slug}"`, { cwd: ROOT_DIR });
    } catch (gitError) {
      console.log('Git commit skipped:', gitError.message);
    }
    
    res.json({ 
      success: true, 
      filePath,
      url: `/${category}/${slug}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve admin pages
app.get('/', (req, res) => {
  res.sendFile(path.join(ADMIN_DIR, 'index.html'));
});

app.get('/editor', (req, res) => {
  res.sendFile(path.join(ADMIN_DIR, 'editor.html'));
});

app.get('/preview', (req, res) => {
  res.sendFile(path.join(ADMIN_DIR, 'preview.html'));
});

app.get('/visual-editor.html', (req, res) => {
  res.sendFile(path.join(ADMIN_DIR, 'visual-editor.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   📊 Screened Admin Dashboard                            ║
║                                                          ║
║   Dashboard:      http://localhost:${PORT}                   ║
║   Visual Editor:  http://localhost:${PORT}/visual-editor.html║
║   Form Editor:    http://localhost:${PORT}/editor            ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);
});

