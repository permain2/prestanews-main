import Anthropic from '@anthropic-ai/sdk';
import slugify from 'slugify';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

// API Key - Set ANTHROPIC_API_KEY in your .env file
const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is not set.');
  console.error('Please create a .env file with: ANTHROPIC_API_KEY=your_key_here');
  process.exit(1);
}

const anthropic = new Anthropic({
  apiKey: apiKey,
});

// Articles from The Points Guy to rewrite (based on RSS feed)
const articleTopics = [
  {
    title: "American Airlines Brings New Flagship Suites to JFK",
    category: "news",
    tags: ["airlines", "travel"],
    type: "blog"
  },
  {
    title: "Best Travel Credit Cards for 2025",
    category: "guide",
    tags: ["credit-cards", "guide", "travel"],
    type: "blog"
  },
  {
    title: "Chase Sapphire Preferred vs Sapphire Reserve: Which Is Better?",
    category: "guide",
    tags: ["credit-cards", "guide"],
    type: "blog"
  },
  {
    title: "Delta Free Wi-Fi Now Available on 1000 Planes",
    category: "news",
    tags: ["airlines", "travel"],
    type: "blog"
  },
  {
    title: "Hilton Expands Loyalty Program with Hilton Honors Adventures",
    category: "news",
    tags: ["hotels", "travel"],
    type: "blog"
  },
  {
    title: "Best Airport Lounges in America According to JD Power",
    category: "guide",
    tags: ["travel", "airport-lounges", "guide"],
    type: "blog"
  },
  {
    title: "How to Maximize Chase Ultimate Rewards Points",
    category: "guide",
    tags: ["credit-cards", "guide"],
    type: "blog"
  },
  {
    title: "Park Hyatt Tokyo Officially Reopens After Renovation",
    category: "news",
    tags: ["hotels", "travel"],
    type: "blog"
  },
  {
    title: "Fly to Hawaii from Just 9000 Points - Limited Time Deal",
    category: "deal",
    tags: ["deal", "travel", "airlines"],
    type: "blog"
  },
  {
    title: "Capital One Venture X Review: Is It Worth the Annual Fee?",
    category: "review",
    tags: ["credit-cards"],
    type: "review"
  },
  {
    title: "Amex Platinum vs Chase Sapphire Reserve Comparison",
    category: "guide",
    tags: ["credit-cards", "guide"],
    type: "blog"
  },
  {
    title: "Best Credit Cards for Extended Warranties",
    category: "guide",
    tags: ["credit-cards", "guide"],
    type: "blog"
  }
];

async function generateArticle(topic) {
  console.log(`🤖 Generating: "${topic.title}"...`);

  const isReview = topic.type === 'review';
  
  const systemPrompt = `You are an expert financial and travel writer for "PrestaNews", a premium affiliate website. 
Your tone is authoritative, helpful, engaging, and clear.
You write in Markdown format with proper Frontmatter.

BRAND VOICE:
- Professional but approachable
- Data-driven insights
- Actionable advice
- Trustworthy and transparent

STRUCTURE GUIDELINES:
- Use clear headings (##, ###)
- Short, scannable paragraphs
- Bullet points for lists
- Include key takeaways

For REVIEWS: Include rating (3.5-5), pros array, cons array, affiliateLink placeholder
For BLOG: Include tags array matching the category

OUTPUT: Return ONLY raw Markdown starting with --- frontmatter and ending with article text. No backticks wrapper.`;

  const userPrompt = `Write a comprehensive, original ${topic.type === 'review' ? 'product review' : 'article'} about: "${topic.title}"

IMPORTANT: This must be COMPLETELY ORIGINAL content. Do not copy from any source. Create fresh, unique insights.

FRONTMATTER (YAML format):
---
title: "${topic.title}"
description: "150 character SEO description"
pubDate: ${new Date().toISOString().split('T')[0]}
heroImage: "/blog-placeholder-3.jpg"
tags: ${JSON.stringify(topic.tags)}
${isReview ? `rating: 4.5
pros:
  - "Pro 1"
  - "Pro 2"
  - "Pro 3"
cons:
  - "Con 1"
  - "Con 2"
affiliateLink: "https://example.com/apply"
category: "credit_cards"` : ''}
---

ARTICLE REQUIREMENTS:
- 800-1200 words
- Original, unique content
- Expert insights and analysis
- Practical tips and recommendations
- SEO-optimized headings
- Engaging introduction
- Clear conclusion with call-to-action`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        { role: "user", content: userPrompt }
      ]
    });

    const content = message.content[0].text;
    
    // Generate slug
    const slug = slugify(topic.title, { lower: true, strict: true });

    // Determine output directory
    const outputDir = isReview ? 'src/content/reviews' : 'src/content/blog';
    const outputPath = path.join(process.cwd(), outputDir, `${slug}.md`);

    // Ensure directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    await fs.writeFile(outputPath, content, 'utf-8');
    console.log(`✅ Saved: ${outputPath}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error generating "${topic.title}":`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting article generation...\n');
  console.log(`📝 Generating ${articleTopics.length} articles\n`);

  let success = 0;
  let failed = 0;

  for (const topic of articleTopics) {
    const result = await generateArticle(topic);
    if (result) {
      success++;
    } else {
      failed++;
    }
    // Rate limiting - wait between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n✨ Done! Generated ${success} articles, ${failed} failed.`);
}

main();

