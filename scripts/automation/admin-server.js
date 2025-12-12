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

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║                                                      ║
║   📊 Screened Admin Dashboard                        ║
║                                                      ║
║   Dashboard:  http://localhost:${PORT}                 ║
║   Editor:     http://localhost:${PORT}/editor          ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
  `);
});

