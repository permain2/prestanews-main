import Anthropic from '@anthropic-ai/sdk';
import slugify from 'slugify';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

// Initialize Anthropic Client
// Set ANTHROPIC_API_KEY in your .env file
const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is not set.');
  console.error('Please create a .env file with: ANTHROPIC_API_KEY=your_key_here');
  process.exit(1);
}

const anthropic = new Anthropic({
  apiKey: apiKey,
});

async function generateArticle(topic, type = 'blog') {
  console.log(`🤖 Generating ${type} article for: "${topic}"...`);

  const isReview = type === 'review';
  
  const systemPrompt = `You are an expert financial and travel writer for "Prestanews". 
  Your tone is authoritative, helpful, and clear. 
  You write in Markdown format with Frontmatter.
  
  BRAND GUIDELINES:
  - Use clear headings (##, ###).
  - Paragraphs should be short and readable.
  - Use bullet points for lists.
  - For "Review" articles, you MUST include a 'pros' and 'cons' list in the frontmatter.
  - For "Review" articles, provide a realistic rating (3.5 to 5.0).
  
  OUTPUT FORMAT:
  Return ONLY the raw Markdown file content, starting with '---' and ending with the article text. Do not wrap in backticks.
  `;

  const userPrompt = `Write a high-quality ${type === 'review' ? 'product review' : 'informational guide'} about: "${topic}".
  
  FRONTMATTER REQUIREMENTS:
  - title: Engaging headline
  - description: SEO meta description (150 chars)
  - pubDate: Current date (YYYY-MM-DD)
  - heroImage: "/blog-placeholder-3.jpg" (default)
  ${isReview ? `
  - rating: Number (0-5)
  - pros: [Array of 3-5 strings]
  - cons: [Array of 3-5 strings]
  - affiliateLink: "https://example.com/apply" (placeholder)
  - category: "credit_cards" or "electronics" or "general"
  ` : ''}
  
  ARTICLE STRUCTURE:
  1. Introduction (Hook the reader)
  2. ${isReview ? 'Key Features / Benefits' : 'Main Points'}
  3. ${isReview ? 'Who is this for?' : 'Detailed Explanation'}
  4. ${isReview ? 'Verdict / Conclusion' : 'Conclusion'}
  `;

  try {
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 4000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        { role: "user", content: userPrompt }
      ]
    });

    const content = message.content[0].text;
    
    // Extract Title for Slug
    const titleMatch = content.match(/title:\s*(["']?)(.*?)\1\s*\n/);
    const title = titleMatch ? titleMatch[2] : topic;
    const slug = slugify(title, { lower: true, strict: true });

    // Determine Output Path
    const outputDir = isReview ? 'src/content/reviews' : 'src/content/blog';
    const outputPath = path.join(process.cwd(), outputDir, `${slug}.md`);

    await fs.writeFile(outputPath, content, 'utf-8');
    console.log(`✅ Saved article to: ${outputPath}`);

  } catch (error) {
    console.error('Error generating article:', error);
  }
}

// Command Line Arguments
const args = process.argv.slice(2);
const type = args[0] === 'review' ? 'review' : 'blog';
const topic = args.slice(1).join(' ');

if (!topic) {
  console.log('Usage: node scripts/generate-article.js [blog|review] "Your Topic Here"');
  process.exit(1);
}

generateArticle(topic, type);
