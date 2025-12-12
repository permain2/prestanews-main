/**
 * Page Publisher Module
 * 
 * Generates complete Astro pages from article data.
 * Uses the best-travel-cards.astro template structure.
 * 
 * Features:
 * - Full Astro page generation
 * - Component integration
 * - Schema markup
 * - Styling consistency
 * - Image/logo handling
 * 
 * Usage:
 *   import { PagePublisher } from './page-publisher.js';
 *   const publisher = new PagePublisher();
 *   await publisher.publish(articleData);
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..', '..');

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PUBLISHER CLASS
// ═══════════════════════════════════════════════════════════════════════════

export class PagePublisher {
  constructor() {
    this.outputDir = path.join(PROJECT_ROOT, 'src', 'pages');
  }

  /**
   * Publish article as Astro page
   */
  async publish(articleData) {
    console.log(`\n📄 Publishing article: "${articleData.title}"`);
    console.log('─'.repeat(50));

    const { category, categoryConfig, slug } = articleData;

    // Determine output path based on category
    const outputPath = this._getOutputPath(categoryConfig.urlPrefix, slug);
    console.log(`📁 Output: ${outputPath}`);

    // Generate the Astro page content
    const pageContent = this._generatePage(articleData);

    // Ensure directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Write the file
    await fs.writeFile(outputPath, pageContent, 'utf-8');

    console.log(`✅ Page published: ${outputPath}`);

    return {
      filePath: outputPath,
      url: `${categoryConfig.urlPrefix}/${slug}`,
      wordCount: this._countWords(pageContent)
    };
  }

  /**
   * Get output file path
   */
  _getOutputPath(urlPrefix, slug) {
    const relativePath = urlPrefix.startsWith('/') ? urlPrefix.slice(1) : urlPrefix;
    return path.join(this.outputDir, relativePath, `${slug}.astro`);
  }

  /**
   * Generate complete Astro page
   */
  _generatePage(data) {
    const {
      keyword,
      category,
      categoryConfig,
      title,
      metaDescription,
      slug,
      products,
      faqs,
      seoContent,
      contentBrief
    } = data;

    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    }).replace(',', '.');

    return `---
import MainLayout from '../../layouts/MainLayout.astro';
import CursorTrailDark from '../../components/CursorTrailDark.tsx';
import TOCToggleGroup from '../../components/TOCToggleGroup.tsx';
import FAQSchema from '../../components/seo/FAQSchema.astro';
import ArticleSchema from '../../components/seo/ArticleSchema.astro';
import BreadcrumbSchema from '../../components/seo/BreadcrumbSchema.astro';

// Product data - ${products.length} items
const products = ${JSON.stringify(products, null, 2)};

// FAQ data
const faqs = ${JSON.stringify(faqs, null, 2)};
---

<MainLayout 
  title="${this._escapeHtml(title)} | Screened" 
  description="${this._escapeHtml(metaDescription)}"
>
  
  <!-- Schema Markup for Rich Snippets -->
  <ArticleSchema
    title="${this._escapeHtml(title)}"
    description="${this._escapeHtml(metaDescription)}"
    url="${categoryConfig.urlPrefix}/${slug}"
    image="/blog-images/${slug}.jpg"
    datePublished={new Date('${currentDate.toISOString().split('T')[0]}')}
    dateModified={new Date('${currentDate.toISOString().split('T')[0]}')}
    author="${categoryConfig.defaultAuthor}"
    section="${categoryConfig.name}"
    tags={['${keyword}', '${category}', 'reviews', 'comparison']}
    wordCount={${data.estimatedWordCount || 3500}}
  />
  <FAQSchema faqs={faqs} />
  <BreadcrumbSchema items={[
    { name: '${categoryConfig.name}', url: '${categoryConfig.urlPrefix}' },
    { name: '${title.split(' | ')[0]}' }
  ]} />
  
  <!-- Compact Header with Cursor Trail & Animated Title -->
  <CursorTrailDark 
    client:load
    title="${this._escapeHtml(title.replace(' | Screened', ''))}"
    kicker=""
    subtitle="${this._escapeHtml(contentBrief.introHook || `Compare the top ${products.length} ${keyword} with expert reviews and ratings.`)}"
    author="${categoryConfig.defaultAuthor}"
    date="${dateStr}"
    compact={true}
    animateTitle={true}
  />

  <!-- Disclosure -->
  <section class="bg-[#F7F8FA] py-4 border-b border-gray-200">
    <div class="max-w-5xl mx-auto px-4 md:px-8">
      <p class="text-xs text-[#68727C] leading-relaxed">
        <strong>Advertiser Disclosure:</strong> Some of the offers on this page are from partners who compensate us when you click through. This doesn't affect our rankings, ratings, or editorial content. Our opinions are our own. View our <a href="/advertising" class="text-[${categoryConfig.primaryColor}] hover:underline">advertising policy</a>.
      </p>
    </div>
  </section>

  <!-- TOC Toggle Navigation -->
  <section class="bg-white border-b border-gray-200 py-3 sticky top-16 z-40">
    <div class="max-w-5xl mx-auto px-4 md:px-8">
      <TOCToggleGroup client:load />
    </div>
  </section>

  <!-- Products Section -->
  <section id="cards" class="py-16 bg-[#F7F8FA]">
    <div class="max-w-5xl mx-auto px-4 md:px-8">
      <div class="text-center mb-12">
        <p class="text-[#68727C] max-w-3xl mx-auto leading-relaxed">${this._escapeHtml(seoContent.intro || contentBrief.introHook)}</p>
      </div>
      
      {products.map((product, index) => (
        <div class="card-container bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8 hover:shadow-2xl transition-all duration-500 hover:border-gray-300 group" style={\`animation-delay: \${index * 50}ms\`}>
          
          {/* Editor's Choice Badge */}
          {product.editorChoice && (
            <div class="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white text-center py-2 text-sm font-bold tracking-wide flex items-center justify-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              EDITOR'S CHOICE — Best Overall
            </div>
          )}
          
          <div class="grid md:grid-cols-[320px_1fr]">
            <!-- Left Panel -->
            <div class="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 relative">
              
              {/* Rank Badge */}
              <div class="absolute top-4 left-4 flex items-center gap-2">
                <span class="w-10 h-10 rounded-full bg-[${categoryConfig.primaryColor}] text-white flex items-center justify-center font-bold shadow-lg">#{index + 1}</span>
              </div>

              {/* Product Image Placeholder */}
              <div class="card-image-wrapper relative mt-8 mb-6">
                <div class="w-72 h-44 rounded-xl shadow-2xl bg-gradient-to-br from-[${categoryConfig.primaryColor}] to-[${categoryConfig.secondaryColor}] relative overflow-hidden group-hover:scale-105 transition-all duration-500">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-white/90 text-sm font-medium text-center px-4">{product.name}</span>
                  </div>
                  <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                </div>
                
                {/* Floating Rating */}
                <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-lg border border-gray-100">
                  <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span class="font-bold text-[#162433] text-sm">{product.rating}</span>
                  <span class="text-[#68727C] text-xs">/5</span>
                </div>
              </div>
              
              {/* CTA Button */}
              <a href={product.affiliateLink || '#'} class="apply-btn w-full" target="_blank" rel="nofollow noopener">
                <span>View Deal</span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <p class="text-xs text-[#68727C] text-center mt-2">On partner's website</p>
            </div>

            <!-- Right Panel -->
            <div class="p-6 md:p-8">
              {/* Header */}
              <div class="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span class="inline-block bg-gradient-to-r from-[${categoryConfig.primaryColor}15] to-[${categoryConfig.primaryColor}10] text-[${categoryConfig.primaryColor}] text-xs font-bold uppercase px-3 py-1 rounded-full mb-2">
                    {product.bestFor}
                  </span>
                  <h3 class="font-sora text-xl md:text-2xl font-bold text-[#162433] leading-tight">{product.name}</h3>
                </div>
              </div>
              
              {/* Description */}
              <p class="text-[#4B5563] mb-6 leading-relaxed">{product.description}</p>

              {/* Key Stats Grid */}
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                ${categoryConfig.statsGrid.map((stat, i) => `
                <div class="stat-box">
                  <div class="stat-label">${stat}</div>
                  <div class="stat-value">{product.${this._statToKey(stat)} || 'N/A'}</div>
                </div>`).join('')}
              </div>

              {/* Accordion Sections */}
              <div class="accordion-container border-t border-gray-100 mt-4 pt-4">
                
                {/* Bottom Line Accordion */}
                {product.bottomLine && (
                  <details class="accordion-item">
                    <summary class="accordion-header">
                      <span>Bottom Line</span>
                      <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </summary>
                    <div class="accordion-content">
                      <p>{product.bottomLine}</p>
                    </div>
                  </details>
                )}
                
                {/* Pros/Cons Accordion */}
                <details class="accordion-item">
                  <summary class="accordion-header">
                    <span>Pros/Cons</span>
                    <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </summary>
                  <div class="accordion-content">
                    <div class="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 class="font-bold text-[#162433] mb-3 flex items-center gap-2 text-sm">
                          <span class="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          </span>
                          Pros
                        </h4>
                        <ul class="space-y-2">
                          {product.pros?.map(pro => (
                            <li class="flex items-start gap-2 text-sm text-[#4B5563]">
                              <span class="text-green-500 mt-0.5">•</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 class="font-bold text-[#162433] mb-3 flex items-center gap-2 text-sm">
                          <span class="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          </span>
                          Cons
                        </h4>
                        <ul class="space-y-2">
                          {product.cons?.map(con => (
                            <li class="flex items-start gap-2 text-sm text-[#4B5563]">
                              <span class="text-red-500 mt-0.5">•</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </details>
                
                {/* Details Accordion */}
                {product.details && (
                  <details class="accordion-item">
                    <summary class="accordion-header">
                      <span>Key Features</span>
                      <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </summary>
                    <div class="accordion-content">
                      <ul class="space-y-3">
                        {product.details?.map(detail => (
                          <li class="flex items-start gap-3 text-sm text-[#4B5563]">
                            <span class="w-1.5 h-1.5 rounded-full bg-[${categoryConfig.primaryColor}] mt-2 flex-shrink-0"></span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>

  <!-- Comparison Table -->
  <section id="compare-table" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <h2 class="font-sora text-3xl font-bold text-[#162433] mb-10 text-center">Compare the best ${keyword}</h2>
      
      <div class="overflow-x-auto">
        <table class="comparison-table w-full min-w-[700px]">
          <thead>
            <tr>
              <th class="text-left pl-4">Product</th>
              <th class="text-left">Best for</th>
              ${categoryConfig.statsGrid.slice(0, 3).map(stat => `<th class="text-left">${stat}</th>`).join('')}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 7).map((product, index) => (
              <tr>
                <td class="pl-4">
                  <div class="font-semibold text-[${categoryConfig.primaryColor}]">{product.name}</div>
                  <div class="text-sm text-gray-500">{product.rating}/5 rating</div>
                </td>
                <td>{product.bestFor}</td>
                ${categoryConfig.statsGrid.slice(0, 3).map((stat, i) => `<td>{product.${this._statToKey(stat)} || 'N/A'}</td>`).join('')}
                <td>
                  <a href={product.affiliateLink || '#'} class="inline-block px-4 py-2 bg-[${categoryConfig.primaryColor}] text-white text-sm font-medium rounded-lg hover:opacity-90 transition" target="_blank" rel="nofollow noopener">
                    View →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- SEO Content -->
  <section class="py-16 bg-[#F7F8FA]">
    <div class="max-w-4xl mx-auto px-4 md:px-8">
      <div class="seo-content bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm">
        
        <!-- How It Works -->
        <div id="how-it-works" class="scroll-mt-24">
          <h2>How to Evaluate ${categoryConfig.name}</h2>
          <p>${this._escapeHtml(seoContent.howItWorks?.content || `Understanding ${keyword} can help you make a more informed decision. Here's what you need to know.`)}</p>
          
          ${seoContent.howItWorks?.infoBox ? `
          <div class="info-box">
            <h4><svg class="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg> ${this._escapeHtml(seoContent.howItWorks.infoBox.title)}</h4>
            <p>${this._escapeHtml(seoContent.howItWorks.infoBox.content)}</p>
          </div>
          ` : ''}
        </div>

        <!-- How to Choose -->
        <div id="how-to-choose" class="scroll-mt-24">
          <h2>How to Choose the Best ${keyword.replace('best ', '')}</h2>
          <p>${this._escapeHtml(seoContent.howToChoose?.content || `Choosing the right option depends on your specific needs and budget.`)}</p>
          
          ${seoContent.howToChoose?.warningBox ? `
          <div class="warning-box">
            <h4>${this._escapeHtml(seoContent.howToChoose.warningBox.title)}</h4>
            <p>${this._escapeHtml(seoContent.howToChoose.warningBox.content)}</p>
          </div>
          ` : ''}
        </div>

        <!-- Best by Category -->
        <div id="best-by-category" class="scroll-mt-24">
          <h2>Best ${keyword.replace('best ', '')} by Category</h2>
          <div class="category-picks">
            ${(seoContent.bestByCategory || []).slice(0, 6).map(cat => `
            <div class="category-card">
              <h3>${this._escapeHtml(cat.category)}</h3>
              <p class="card-name">${this._escapeHtml(cat.winner)}</p>
              <p>${this._escapeHtml(cat.reason)}</p>
            </div>
            `).join('')}
          </div>
        </div>

        <!-- Methodology -->
        <div id="methodology" class="scroll-mt-24">
          <h2>Our Ranking Methodology</h2>
          <p>${this._escapeHtml(seoContent.methodology?.content || `Our editorial team evaluates products based on multiple weighted factors.`)}</p>
          
          <table>
            <thead>
              <tr>
                <th>Factor</th>
                <th>Weight</th>
                <th>What We Evaluate</th>
              </tr>
            </thead>
            <tbody>
              ${(seoContent.methodology?.factors || []).map(f => `
              <tr>
                <td>${this._escapeHtml(f.name)}</td>
                <td>${this._escapeHtml(f.weight)}</td>
                <td>${this._escapeHtml(f.description)}</td>
              </tr>
              `).join('')}
            </tbody>
          </table>
          
          <p>Last updated: <strong>${dateStr}</strong></p>
        </div>

      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq" class="py-16 bg-white scroll-mt-24">
    <div class="max-w-4xl mx-auto px-4 md:px-8">
      <div class="text-center mb-12">
        <h2 class="font-sora text-3xl md:text-4xl font-bold text-[#162433] mb-4">Frequently Asked Questions</h2>
        <p class="text-[#68727C]">Expert answers to common questions about ${keyword}.</p>
      </div>
      
      <div class="space-y-4">
        {faqs.map((faq, index) => (
          <details class="faq-item group" style={\`animation-delay: \${index * 50}ms\`}>
            <summary class="faq-question">
              <span class="pr-4" set:html={faq.question}></span>
              <svg class="faq-icon w-5 h-5 text-[#68727C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </summary>
            <div class="faq-answer" set:html={faq.answer}></div>
          </details>
        ))}
      </div>
    </div>
  </section>

  <!-- Author Box -->
  <section class="py-12 bg-white border-t border-gray-200">
    <div class="max-w-4xl mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row gap-6 items-start bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 md:p-8">
        <img src="${categoryConfig.authorImage}" alt="${categoryConfig.defaultAuthor}" class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
        <div>
          <div class="text-xs text-[${categoryConfig.primaryColor}] font-bold uppercase tracking-wide mb-1">Written by</div>
          <h3 class="font-sora text-xl font-bold text-[#162433] mb-2">${categoryConfig.defaultAuthor}</h3>
          <p class="text-[#4B5563] text-sm leading-relaxed mb-3">
            Expert reviewer at Screened with extensive experience in ${categoryConfig.name.toLowerCase()}. Committed to helping readers make informed decisions through thorough research and testing.
          </p>
          <div class="flex items-center gap-4 text-sm text-[#68727C]">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Updated: ${dateStr}
            </span>
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              ${Math.ceil((data.estimatedWordCount || 3500) / 250)} min read
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

</MainLayout>

<style>
${this._generateStyles(categoryConfig)}
</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card-container, .faq-item').forEach(el => {
      observer.observe(el);
    });
  });
</script>
`;
  }

  /**
   * Generate CSS styles - Apple-quality mobile-first
   */
  _generateStyles(categoryConfig) {
    return `
  /* ═══════════════════════════════════════════════════════════════
     APPLE-QUALITY MOBILE-FIRST STYLES
     Refined spacing, typography, and micro-interactions
  ═══════════════════════════════════════════════════════════════ */

  /* Card Container - Mobile First */
  .card-container {
    animation: fadeInUp 0.6s ease-out both;
    border-radius: 20px;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .card-container {
      border-radius: 16px;
      margin-left: -0.5rem;
      margin-right: -0.5rem;
    }
  }

  /* Apply Button - Refined */
  .apply-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.625rem;
    width: 100%;
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, ${categoryConfig.primaryColor} 0%, ${categoryConfig.secondaryColor} 100%);
    color: white;
    font-weight: 600;
    font-size: 0.9375rem;
    letter-spacing: 0.02em;
    border-radius: 14px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 14px ${categoryConfig.primaryColor}35, 0 2px 6px ${categoryConfig.primaryColor}20;
    -webkit-tap-highlight-color: transparent;
  }
  
  .apply-btn:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 8px 24px ${categoryConfig.primaryColor}40, 0 4px 12px ${categoryConfig.primaryColor}30;
  }

  .apply-btn:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 2px 8px ${categoryConfig.primaryColor}35;
  }

  @media (max-width: 768px) {
    .apply-btn {
      padding: 0.9375rem 1.25rem;
      font-size: 0.875rem;
      border-radius: 12px;
    }
  }

  /* Stat Boxes - Apple-style cards */
  .stat-box {
    background: linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%);
    border-radius: 14px;
    padding: 0.875rem 0.75rem;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;
  }

  .stat-box:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  .stat-label {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #6B7280;
    font-weight: 600;
    margin-bottom: 0.375rem;
    line-height: 1.2;
  }

  .stat-value {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.3;
    word-break: break-word;
    hyphens: auto;
  }

  @media (max-width: 768px) {
    .stat-box {
      padding: 0.75rem 0.5rem;
      border-radius: 12px;
    }
    .stat-label {
      font-size: 0.625rem;
      margin-bottom: 0.25rem;
    }
    .stat-value {
      font-size: 0.75rem;
    }
  }

  /* Card Image Wrapper - Refined sizing */
  .card-image-wrapper {
    transform: perspective(1000px) rotateX(2deg);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-container:hover .card-image-wrapper {
    transform: perspective(1000px) rotateX(0deg) scale(1.02);
  }

  @media (max-width: 768px) {
    .card-image-wrapper > div {
      width: 16rem !important;
      height: 10rem !important;
    }
  }

  /* Comparison Table - Mobile optimized */
  .comparison-table {
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.875rem;
  }

  .comparison-table th {
    background: linear-gradient(135deg, ${categoryConfig.primaryColor} 0%, ${categoryConfig.secondaryColor} 100%);
    color: white;
    padding: 1rem 0.875rem;
    font-weight: 600;
    text-align: left;
    font-size: 0.8125rem;
  }

  .comparison-table th:first-child { border-radius: 12px 0 0 0; }
  .comparison-table th:last-child { border-radius: 0 12px 0 0; }

  .comparison-table td {
    padding: 1rem 0.875rem;
    border-bottom: 1px solid #F3F4F6;
    font-size: 0.8125rem;
    vertical-align: middle;
  }

  .comparison-table tbody tr {
    transition: background 0.15s ease;
  }

  .comparison-table tbody tr:hover td {
    background: #F9FAFB;
  }

  /* SEO Content - Refined typography */
  .seo-content h2 {
    font-family: 'Sora', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 700;
    font-size: 1.625rem;
    color: #111827;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.625rem;
    border-bottom: 2px solid #E5E7EB;
    letter-spacing: -0.02em;
  }

  .seo-content h2:first-of-type { margin-top: 0; }

  .seo-content p {
    color: #374151;
    line-height: 1.75;
    margin-bottom: 1.125rem;
    font-size: 0.9375rem;
  }

  @media (max-width: 768px) {
    .seo-content { padding: 1.5rem !important; }
    .seo-content h2 { font-size: 1.375rem; margin-top: 2rem; }
    .seo-content p { font-size: 0.9375rem; line-height: 1.7; }
  }

  .seo-content table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 1.5rem 0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  }

  .seo-content th {
    background: linear-gradient(135deg, ${categoryConfig.primaryColor} 0%, ${categoryConfig.secondaryColor} 100%);
    color: white;
    padding: 0.875rem 1rem;
    text-align: left;
    font-size: 0.8125rem;
    font-weight: 600;
  }

  .seo-content td {
    padding: 0.875rem 1rem;
    border-bottom: 1px solid #F3F4F6;
    font-size: 0.875rem;
  }

  /* Info & Warning Boxes - Apple-style */
  .info-box {
    background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
    border: 1px solid #BFDBFE;
    border-radius: 14px;
    padding: 1.25rem;
    margin: 1.5rem 0;
  }
  .info-box h4 { color: #1D4ED8; margin: 0 0 0.5rem 0; font-size: 0.9375rem; font-weight: 600; }
  .info-box p { margin: 0; color: #1E40AF; font-size: 0.875rem; line-height: 1.6; }

  .warning-box {
    background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
    border: 1px solid #FCD34D;
    border-radius: 14px;
    padding: 1.25rem;
    margin: 1.5rem 0;
  }
  .warning-box h4 { color: #B45309; margin: 0 0 0.5rem 0; font-size: 0.9375rem; font-weight: 600; }
  .warning-box p { margin: 0; color: #92400E; font-size: 0.875rem; line-height: 1.6; }

  @media (max-width: 768px) {
    .info-box, .warning-box { padding: 1rem; border-radius: 12px; margin: 1.25rem 0; }
  }

  /* Category Picks Grid */
  .category-picks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .category-card {
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 14px;
    padding: 1.25rem;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .category-card:hover {
    border-color: ${categoryConfig.primaryColor};
    box-shadow: 0 8px 24px ${categoryConfig.primaryColor}18;
    transform: translateY(-2px);
  }

  .category-card h3 { font-size: 0.875rem; font-weight: 700; color: #111827; margin: 0 0 0.375rem 0; }
  .category-card .card-name { color: ${categoryConfig.primaryColor}; font-weight: 600; margin-bottom: 0.375rem; font-size: 0.9375rem; }
  .category-card p:last-of-type { color: #6B7280; font-size: 0.8125rem; margin: 0; line-height: 1.5; }

  @media (max-width: 768px) {
    .category-picks { grid-template-columns: 1fr; gap: 0.75rem; }
    .category-card { padding: 1rem; border-radius: 12px; }
  }

  /* Accordion - Refined interactions */
  .accordion-container { border-top: 1px solid #F3F4F6; margin-top: 1.25rem; padding-top: 0.5rem; }
  .accordion-item { border-bottom: 1px solid #F3F4F6; }
  .accordion-item:last-child { border-bottom: none; }

  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 0;
    font-weight: 600;
    font-size: 0.9375rem;
    color: #111827;
    cursor: pointer;
    list-style: none;
    transition: color 0.15s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .accordion-header::-webkit-details-marker { display: none; }
  .accordion-header:hover { color: ${categoryConfig.primaryColor}; }

  .accordion-icon { 
    width: 18px; height: 18px; color: #9CA3AF; 
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.15s ease;
    flex-shrink: 0;
  }
  .accordion-item[open] .accordion-icon { transform: rotate(180deg); color: ${categoryConfig.primaryColor}; }
  .accordion-item[open] .accordion-header { color: ${categoryConfig.primaryColor}; }
  .accordion-content { padding: 0 0 1.25rem 0; color: #4B5563; line-height: 1.65; font-size: 0.875rem; }

  @media (max-width: 768px) {
    .accordion-header { padding: 0.875rem 0; font-size: 0.875rem; }
    .accordion-content { padding-bottom: 1rem; font-size: 0.8125rem; }
  }

  /* FAQ - Apple-style cards */
  .faq-item {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 14px;
    overflow: hidden;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .faq-item:hover { border-color: #CBD5E1; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06); }
  .faq-item[open] { border-color: ${categoryConfig.primaryColor}; box-shadow: 0 4px 20px ${categoryConfig.primaryColor}18; }

  .faq-question {
    font-weight: 600;
    color: #111827;
    cursor: pointer;
    padding: 1.125rem 1.25rem;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9375rem;
    gap: 1rem;
    transition: background 0.15s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .faq-question:hover { background: #F9FAFB; }
  .faq-question::-webkit-details-marker { display: none; }

  .faq-icon { 
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0; width: 20px; height: 20px; color: #9CA3AF;
  }
  .faq-item[open] .faq-icon { transform: rotate(180deg); color: ${categoryConfig.primaryColor}; }

  .faq-answer {
    padding: 0 1.25rem 1.25rem;
    color: #4B5563;
    line-height: 1.7;
    border-top: 1px solid #F3F4F6;
    padding-top: 1rem;
    font-size: 0.9375rem;
  }

  @media (max-width: 768px) {
    .faq-item { border-radius: 12px; }
    .faq-question { padding: 1rem; font-size: 0.875rem; }
    .faq-answer { padding: 0 1rem 1rem; padding-top: 0.875rem; font-size: 0.875rem; }
  }

  /* Utility */
  .inline-icon { display: inline-block; width: 18px; height: 18px; vertical-align: middle; margin-right: 0.375rem; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Mobile section padding */
  @media (max-width: 768px) {
    section { padding-top: 2.5rem !important; padding-bottom: 2.5rem !important; }
    section .max-w-5xl, section .max-w-4xl, section .max-w-7xl {
      padding-left: 1rem !important; padding-right: 1rem !important;
    }
    .grid.md\\:grid-cols-\\[320px_1fr\\] { display: flex; flex-direction: column; }
    .grid.md\\:grid-cols-\\[320px_1fr\\] > div:first-child { padding: 1.5rem 1.25rem !important; }
    .grid.md\\:grid-cols-\\[320px_1fr\\] > div:last-child { padding: 1.25rem !important; }
    .grid.grid-cols-2.md\\:grid-cols-4 { gap: 0.5rem !important; }
  }

  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

  @media (max-width: 768px) {
    a, button, summary { min-height: 44px; display: flex; align-items: center; }
  }
`;
  }

  /**
   * Convert stat name to object key
   */
  _statToKey(statName) {
    return statName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .replace(/\s+/g, '');
  }

  /**
   * Escape HTML
   */
  _escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Count words in content
   */
  _countWords(content) {
    return content.split(/\s+/).filter(w => w.length > 0).length;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CLI INTERFACE
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] !== '--from-data') {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║              Page Publisher CLI                                ║
╠═══════════════════════════════════════════════════════════════╣
║ Usage:                                                         ║
║   node page-publisher.js --from-data article-data.json         ║
╚═══════════════════════════════════════════════════════════════╝
    `);
    return;
  }

  const dataPath = args[1];
  const articleData = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
  
  const publisher = new PagePublisher();
  const result = await publisher.publish(articleData);
  
  console.log('\n📊 Result:');
  console.log(`   File: ${result.filePath}`);
  console.log(`   URL: ${result.url}`);
  console.log(`   Words: ${result.wordCount}`);
}

// Run if called directly
if (process.argv[1] && process.argv[1].includes('page-publisher')) {
  main().catch(console.error);
}

export default PagePublisher;

