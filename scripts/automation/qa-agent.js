/**
 * QA Agent Module
 * 
 * Reviews generated articles for quality, SEO compliance, and style adherence.
 * Uses Claude for intelligent content review and automated checks.
 * 
 * Features:
 * - SEO score calculation
 * - TPG style compliance checking
 * - Vocabulary validation
 * - Readability analysis
 * - Broken link detection
 * - Content quality assessment
 * 
 * Usage:
 *   import { QAAgent } from './qa-agent.js';
 *   const qa = new QAAgent();
 *   const result = await qa.review(filePath, keyword);
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load style rules
let STYLE_RULES;
async function loadStyleRules() {
  if (!STYLE_RULES) {
    STYLE_RULES = JSON.parse(
      await fs.readFile(path.join(__dirname, 'config', 'style-rules.json'), 'utf-8')
    );
  }
  return STYLE_RULES;
}

// ═══════════════════════════════════════════════════════════════════════════
// QA AGENT CLASS
// ═══════════════════════════════════════════════════════════════════════════

export class QAAgent {
  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey) {
      this.client = new Anthropic({ apiKey });
      this.useAI = true;
    } else {
      console.warn('⚠️  ANTHROPIC_API_KEY not set. Using rule-based checks only.');
      this.useAI = false;
    }
  }

  /**
   * Perform comprehensive QA review
   */
  async review(filePath, keyword) {
    console.log(`\n🔍 QA Review: "${keyword}"`);
    console.log('─'.repeat(50));

    const styleRules = await loadStyleRules();
    
    // Read file content
    let content;
    try {
      content = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      return {
        passed: false,
        score: 0,
        issues: [`File not found: ${filePath}`],
        suggestions: ['Ensure the article file exists']
      };
    }

    // Run all checks
    const checks = {
      seo: await this._checkSEO(content, keyword, styleRules),
      style: await this._checkStyle(content, styleRules),
      vocabulary: await this._checkVocabulary(content, styleRules),
      readability: this._checkReadability(content),
      structure: this._checkStructure(content),
      links: this._checkLinks(content)
    };

    // Calculate overall score
    const weights = {
      seo: 0.30,
      style: 0.25,
      vocabulary: 0.15,
      readability: 0.10,
      structure: 0.15,
      links: 0.05
    };

    let totalScore = 0;
    for (const [check, result] of Object.entries(checks)) {
      totalScore += result.score * weights[check];
    }

    const passed = totalScore >= 70;

    // AI-powered content review (if available)
    let aiReview = null;
    if (this.useAI && totalScore >= 50) {
      console.log('🤖 Running AI content review...');
      aiReview = await this._aiContentReview(content, keyword);
    }

    // Compile results
    const result = {
      passed,
      score: Math.round(totalScore),
      grade: this._scoreToGrade(totalScore),
      checks,
      aiReview,
      issues: this._compileIssues(checks),
      suggestions: this._compileSuggestions(checks, aiReview),
      reviewedAt: new Date().toISOString()
    };

    // Print summary
    this._printSummary(result);

    return result;
  }

  /**
   * Check SEO compliance
   */
  async _checkSEO(content, keyword, styleRules) {
    const seoRules = styleRules.tpgStyle.seoRequirements;
    const issues = [];
    let score = 100;

    // Extract text content (strip frontmatter and JSX)
    const textContent = this._extractTextContent(content);
    const words = textContent.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    // Word count check
    if (wordCount < seoRules.minWordCount) {
      issues.push(`Word count (${wordCount}) below minimum (${seoRules.minWordCount})`);
      score -= 20;
    } else if (wordCount >= seoRules.targetWordCount) {
      // Bonus for meeting target
    }

    // Keyword in first 100 words
    const first100Words = words.slice(0, 100).join(' ').toLowerCase();
    if (!first100Words.includes(keyword.toLowerCase())) {
      issues.push('Primary keyword not found in first 100 words');
      score -= 15;
    }

    // Keyword in title
    const titleMatch = content.match(/title="([^"]+)"/);
    if (titleMatch && !titleMatch[1].toLowerCase().includes(keyword.toLowerCase())) {
      issues.push('Primary keyword not found in page title');
      score -= 10;
    }

    // H2 headings
    const h2Matches = content.match(/<h2[^>]*>|## /gi) || [];
    if (h2Matches.length < seoRules.minH2Count) {
      issues.push(`Only ${h2Matches.length} H2 headings (minimum ${seoRules.minH2Count})`);
      score -= 10;
    }

    // Keyword density
    const keywordCount = (textContent.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
    const density = (keywordCount / wordCount) * 100;
    if (density < seoRules.keywordDensity.min) {
      issues.push(`Keyword density (${density.toFixed(2)}%) below minimum (${seoRules.keywordDensity.min}%)`);
      score -= 10;
    } else if (density > seoRules.keywordDensity.max) {
      issues.push(`Keyword density (${density.toFixed(2)}%) above maximum (${seoRules.keywordDensity.max}%)`);
      score -= 15;
    }

    // Meta description
    const metaMatch = content.match(/description="([^"]+)"/);
    if (!metaMatch) {
      issues.push('Meta description not found');
      score -= 10;
    } else if (metaMatch[1].length < 100 || metaMatch[1].length > 160) {
      issues.push(`Meta description length (${metaMatch[1].length}) should be 100-160 chars`);
      score -= 5;
    }

    // FAQ section
    const hasFAQ = content.includes('id="faq"') || content.includes('FAQSchema');
    if (!hasFAQ) {
      issues.push('FAQ section not found');
      score -= 10;
    }

    return {
      score: Math.max(0, score),
      wordCount,
      keywordDensity: density.toFixed(2) + '%',
      h2Count: h2Matches.length,
      issues
    };
  }

  /**
   * Check TPG style compliance
   */
  async _checkStyle(content, styleRules) {
    const style = styleRules.tpgStyle;
    const issues = [];
    let score = 100;

    const textContent = this._extractTextContent(content);

    // Check for banned phrases
    for (const phrase of styleRules.bannedPhrases) {
      if (textContent.toLowerCase().includes(phrase.toLowerCase())) {
        issues.push(`Contains banned phrase: "${phrase}"`);
        score -= 5;
      }
    }

    // Check paragraph length
    const paragraphs = textContent.split(/\n\n+/).filter(p => p.trim().length > 0);
    const longParagraphs = paragraphs.filter(p => {
      const sentences = p.split(/[.!?]+/).filter(s => s.trim().length > 0);
      return sentences.length > style.formatting.maxParagraphSentences;
    });
    if (longParagraphs.length > 3) {
      issues.push(`${longParagraphs.length} paragraphs exceed ${style.formatting.maxParagraphSentences} sentences`);
      score -= 10;
    }

    // Check sentence length
    const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentences.length;
    if (avgSentenceLength > 30) {
      issues.push(`Average sentence length (${avgSentenceLength.toFixed(1)} words) is too high`);
      score -= 10;
    }

    // Check for passive voice (basic detection)
    const passiveIndicators = ['was', 'were', 'been', 'being', 'is being', 'are being'];
    let passiveCount = 0;
    for (const indicator of passiveIndicators) {
      const matches = textContent.match(new RegExp(`\\b${indicator}\\s+\\w+ed\\b`, 'gi')) || [];
      passiveCount += matches.length;
    }
    const passivePercent = (passiveCount / sentences.length) * 100;
    if (passivePercent > styleRules.qualityChecks.passivVoiceMaxPercent) {
      issues.push(`Passive voice usage (${passivePercent.toFixed(1)}%) exceeds limit`);
      score -= 10;
    }

    // Check for value statements
    const valueStatements = style.sentencePatterns.valueStatements;
    const hasValueStatements = valueStatements.some(vs => 
      textContent.toLowerCase().includes(vs.toLowerCase().replace('[product]', ''))
    );
    if (!hasValueStatements) {
      issues.push('Missing TPG-style value statements (e.g., "packs a ton of value")');
      score -= 5;
    }

    return {
      score: Math.max(0, score),
      avgSentenceLength: avgSentenceLength.toFixed(1),
      passiveVoice: passivePercent.toFixed(1) + '%',
      issues
    };
  }

  /**
   * Check vocabulary compliance
   */
  async _checkVocabulary(content, styleRules) {
    const vocab = styleRules.tpgStyle.vocabulary;
    const issues = [];
    let score = 100;

    const textContent = this._extractTextContent(content).toLowerCase();

    // Check for words to never use
    for (const badWord of vocab.neverUse) {
      if (textContent.includes(badWord.toLowerCase())) {
        issues.push(`Contains "${badWord}" - use "${vocab.replacements[badWord] || 'alternative'}" instead`);
        score -= 8;
      }
    }

    // Check for required vocabulary presence
    const mustUseFound = vocab.mustUse.filter(word => 
      textContent.includes(word.toLowerCase())
    );
    const mustUsePercent = (mustUseFound.length / vocab.mustUse.length) * 100;
    if (mustUsePercent < 30) {
      issues.push(`Only ${mustUseFound.length}/${vocab.mustUse.length} required terms used`);
      score -= 10;
    }

    return {
      score: Math.max(0, score),
      requiredTermsUsed: `${mustUseFound.length}/${vocab.mustUse.length}`,
      issues
    };
  }

  /**
   * Check readability metrics
   */
  _checkReadability(content) {
    const issues = [];
    let score = 100;

    const textContent = this._extractTextContent(content);
    const words = textContent.split(/\s+/).filter(w => w.length > 0);
    const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const syllables = this._countSyllables(textContent);

    // Flesch-Kincaid Grade Level
    const fkGrade = 0.39 * (words.length / sentences.length) + 
                    11.8 * (syllables / words.length) - 15.59;

    if (fkGrade > 12) {
      issues.push(`Reading level (Grade ${fkGrade.toFixed(1)}) too advanced - aim for Grade 8-10`);
      score -= 20;
    } else if (fkGrade > 10) {
      issues.push(`Reading level (Grade ${fkGrade.toFixed(1)}) slightly high`);
      score -= 10;
    }

    // Flesch Reading Ease
    const readingEase = 206.835 - 1.015 * (words.length / sentences.length) - 
                        84.6 * (syllables / words.length);
    
    if (readingEase < 50) {
      issues.push(`Reading ease score (${readingEase.toFixed(1)}) indicates difficult text`);
      score -= 15;
    }

    return {
      score: Math.max(0, score),
      gradeLevel: fkGrade.toFixed(1),
      readingEase: readingEase.toFixed(1),
      issues
    };
  }

  /**
   * Check page structure
   */
  _checkStructure(content) {
    const issues = [];
    let score = 100;

    // Required sections
    const requiredIds = ['cards', 'compare-table', 'how-it-works', 'how-to-choose', 'methodology', 'faq'];
    const missingIds = requiredIds.filter(id => !content.includes(`id="${id}"`));
    
    if (missingIds.length > 0) {
      issues.push(`Missing sections: ${missingIds.join(', ')}`);
      score -= missingIds.length * 10;
    }

    // Check for required components
    const requiredComponents = ['MainLayout', 'CursorTrailDark', 'TOCToggleGroup', 'FAQSchema'];
    const missingComponents = requiredComponents.filter(comp => !content.includes(comp));
    
    if (missingComponents.length > 0) {
      issues.push(`Missing components: ${missingComponents.join(', ')}`);
      score -= missingComponents.length * 5;
    }

    // Check for product data
    if (!content.includes('const products =')) {
      issues.push('Product data array not found');
      score -= 20;
    }

    return {
      score: Math.max(0, score),
      missingSections: missingIds,
      issues
    };
  }

  /**
   * Check links in content
   */
  _checkLinks(content) {
    const issues = [];
    let score = 100;

    // Extract all href values
    const hrefMatches = content.match(/href="([^"]+)"/g) || [];
    const hrefs = hrefMatches.map(m => m.replace('href="', '').replace('"', ''));

    // Check for affiliate links
    const affiliateLinks = hrefs.filter(h => h.includes('tag=') || h.includes('affiliate'));
    if (affiliateLinks.length === 0) {
      issues.push('No affiliate links found');
      score -= 10;
    }

    // Check for empty/placeholder links
    const emptyLinks = hrefs.filter(h => h === '#' || h === '');
    if (emptyLinks.length > 3) {
      issues.push(`${emptyLinks.length} placeholder/empty links found`);
      score -= 10;
    }

    // Check for internal links
    const internalLinks = hrefs.filter(h => h.startsWith('/') && !h.startsWith('//'));
    if (internalLinks.length < 3) {
      issues.push(`Only ${internalLinks.length} internal links (recommend 3+)`);
      score -= 5;
    }

    return {
      score: Math.max(0, score),
      totalLinks: hrefs.length,
      affiliateLinks: affiliateLinks.length,
      internalLinks: internalLinks.length,
      issues
    };
  }

  /**
   * AI-powered content review
   */
  async _aiContentReview(content, keyword) {
    if (!this.useAI) return null;

    try {
      const textContent = this._extractTextContent(content).substring(0, 8000);
      
      const prompt = `You are a senior editor reviewing a product review article for quality and style compliance.

KEYWORD: "${keyword}"

ARTICLE EXCERPT:
${textContent}

Review the article for:
1. TONE: Is it confident, expert, and friendly (not salesy)?
2. VALUE: Does it provide specific, actionable information with numbers?
3. STRUCTURE: Is it well-organized with clear headings?
4. ACCURACY: Are claims supported with specifics?
5. ENGAGEMENT: Is it easy to read and scannable?

Provide your review as JSON:
{
  "overallQuality": "excellent|good|fair|poor",
  "toneScore": 1-10,
  "valueScore": 1-10,
  "structureScore": 1-10,
  "topStrengths": ["...", "..."],
  "criticalIssues": ["...", "..."],
  "suggestedImprovements": ["...", "...", "..."],
  "verdict": "One sentence summary"
}`;

      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }]
      });

      const jsonMatch = response.content[0].text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.warn('   ⚠️  AI review failed:', error.message);
    }

    return null;
  }

  /**
   * Extract text content from Astro/JSX file
   */
  _extractTextContent(content) {
    return content
      // Remove frontmatter
      .replace(/---[\s\S]*?---/g, '')
      // Remove JSX/HTML tags
      .replace(/<[^>]+>/g, ' ')
      // Remove style blocks
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      // Remove script blocks
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      // Remove JSX expressions
      .replace(/\{[^}]+\}/g, ' ')
      // Clean up whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Count syllables in text (approximation)
   */
  _countSyllables(text) {
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    return words.reduce((total, word) => {
      // Simple syllable counting heuristic
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const matches = word.match(/[aeiouy]{1,2}/g);
      return total + (matches ? matches.length : 1);
    }, 0);
  }

  /**
   * Convert score to letter grade
   */
  _scoreToGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  /**
   * Compile all issues from checks
   */
  _compileIssues(checks) {
    const issues = [];
    for (const [checkName, result] of Object.entries(checks)) {
      if (result.issues && result.issues.length > 0) {
        issues.push(...result.issues.map(issue => `[${checkName.toUpperCase()}] ${issue}`));
      }
    }
    return issues;
  }

  /**
   * Compile suggestions
   */
  _compileSuggestions(checks, aiReview) {
    const suggestions = [];

    // From automated checks
    if (checks.seo.score < 80) {
      suggestions.push('Improve SEO: Add keyword to title, increase word count, or adjust keyword density');
    }
    if (checks.style.score < 80) {
      suggestions.push('Improve style: Shorten paragraphs, use more active voice, add value statements');
    }
    if (checks.readability.score < 80) {
      suggestions.push('Improve readability: Simplify sentences, use shorter words');
    }

    // From AI review
    if (aiReview && aiReview.suggestedImprovements) {
      suggestions.push(...aiReview.suggestedImprovements);
    }

    return suggestions;
  }

  /**
   * Print summary to console
   */
  _printSummary(result) {
    console.log('\n' + '═'.repeat(50));
    console.log(`📊 QA SCORE: ${result.score}/100 (Grade ${result.grade})`);
    console.log(`   Status: ${result.passed ? '✅ PASSED' : '❌ NEEDS REVISION'}`);
    console.log('═'.repeat(50));

    console.log('\nCheck Breakdown:');
    for (const [name, check] of Object.entries(result.checks)) {
      const icon = check.score >= 80 ? '✅' : check.score >= 60 ? '⚠️' : '❌';
      console.log(`   ${icon} ${name}: ${check.score}/100`);
    }

    if (result.issues.length > 0) {
      console.log('\n❗ Issues Found:');
      result.issues.slice(0, 5).forEach(issue => {
        console.log(`   • ${issue}`);
      });
      if (result.issues.length > 5) {
        console.log(`   ... and ${result.issues.length - 5} more`);
      }
    }

    if (result.aiReview) {
      console.log(`\n🤖 AI Review: ${result.aiReview.verdict}`);
    }

    if (result.suggestions.length > 0) {
      console.log('\n💡 Suggestions:');
      result.suggestions.slice(0, 3).forEach(s => {
        console.log(`   • ${s}`);
      });
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CLI INTERFACE
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║              QA Agent CLI                                      ║
╠═══════════════════════════════════════════════════════════════╣
║ Usage:                                                         ║
║   node qa-agent.js <file-path> <keyword>                       ║
║                                                                ║
║ Example:                                                       ║
║   node qa-agent.js src/pages/blog/best-headsets.astro \\        ║
║                    "best gaming headsets"                      ║
╚═══════════════════════════════════════════════════════════════╝
    `);
    return;
  }

  const filePath = args[0];
  const keyword = args.slice(1).join(' ');
  
  const qa = new QAAgent();
  const result = await qa.review(filePath, keyword);
  
  // Save report
  const reportPath = filePath.replace('.astro', '-qa-report.json');
  await fs.writeFile(reportPath, JSON.stringify(result, null, 2));
  console.log(`\n📄 Report saved: ${reportPath}`);
}

// Run if called directly
if (process.argv[1] && process.argv[1].includes('qa-agent')) {
  main().catch(console.error);
}

export default QAAgent;

