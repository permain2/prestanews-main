import 'dotenv/config';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load API key from environment
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY not set in .env file');
  process.exit(1);
}

// Category definitions with image prompts
const categories = [
  {
    name: "travel-rewards",
    title: "Travel Rewards",
    prompt: "Create a stunning modern minimalist featured image for a Travel Rewards Credit Cards category. Show a stylized airplane taking off against a beautiful gradient blue sky with subtle clouds, golden travel icons like a passport and globe floating elegantly. Professional financial website aesthetic, clean design, no text, high quality, vibrant blue and gold color scheme, 16:9 aspect ratio"
  },
  {
    name: "cash-back",
    title: "Cash Back", 
    prompt: "Create a stunning modern minimalist featured image for a Cash Back Credit Cards category. Show elegant floating dollar bills and coins with a green gradient background, subtle sparkles and light effects suggesting savings and rewards. Professional financial website aesthetic, clean design, no text, high quality, vibrant green and gold color scheme, 16:9 aspect ratio"
  },
  {
    name: "business",
    title: "Business",
    prompt: "Create a stunning modern minimalist featured image for a Business Credit Cards category. Show a sleek modern office desk with elegant business elements like a briefcase silhouette, charts trending upward, professional gray and navy blue gradient. Professional financial website aesthetic, clean design, no text, high quality, sophisticated gray and blue color scheme, 16:9 aspect ratio"
  },
  {
    name: "no-annual-fee",
    title: "No Annual Fee",
    prompt: "Create a stunning modern minimalist featured image for a No Annual Fee Credit Cards category. Show a stylized credit card with a checkmark or zero dollar sign, purple and lavender gradient background with subtle geometric patterns suggesting value and savings. Professional financial website aesthetic, clean design, no text, high quality, vibrant purple color scheme, 16:9 aspect ratio"
  },
  {
    name: "balance-transfer",
    title: "Balance Transfer",
    prompt: "Create a stunning modern minimalist featured image for a Balance Transfer Credit Cards category. Show an elegant visual of balance scales or arrows transferring between stylized cards, teal and cyan gradient background with subtle flowing lines. Professional financial website aesthetic, clean design, no text, high quality, vibrant teal and turquoise color scheme, 16:9 aspect ratio"
  }
];

// Try Gemini 2.5 Flash Image model
async function generateWithGeminiImage(category) {
  try {
    console.log(`\n🎨 [Gemini 2.5 Flash Image] Generating: ${category.title}...`);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: category.prompt
            }]
          }],
          generationConfig: {
            responseModalities: ["image", "text"]
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || JSON.stringify(error));
    }

    const data = await response.json();
    
    // Look for image data in response
    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const imageData = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          const ext = mimeType.split('/')[1] || 'png';
          
          const outputDir = path.join(__dirname, '..', 'public', 'category-images');
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          const outputPath = path.join(outputDir, `${category.name}.${ext}`);
          fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
          
          console.log(`✅ Saved: ${outputPath}`);
          return outputPath;
        }
      }
    }
    
    console.log(`⚠️ No image in response`);
    return null;
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

// Try Imagen 4 model
async function generateWithImagen4(category) {
  try {
    console.log(`\n🎨 [Imagen 4] Generating: ${category.title}...`);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:generateImages?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: category.prompt,
          number_of_images: 1,
          aspect_ratio: "16:9",
          safety_filter_level: "BLOCK_MEDIUM_AND_ABOVE"
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || JSON.stringify(error));
    }

    const data = await response.json();
    
    if (data.images?.[0]?.bytesBase64Encoded) {
      const imageData = data.images[0].bytesBase64Encoded;
      
      const outputDir = path.join(__dirname, '..', 'public', 'category-images');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputPath = path.join(outputDir, `${category.name}.png`);
      fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
      
      console.log(`✅ Saved: ${outputPath}`);
      return outputPath;
    }
    
    console.log(`⚠️ No image in response`);
    return null;
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

// Try Gemini 3 Pro Image model
async function generateWithGemini3ProImage(category) {
  try {
    console.log(`\n🎨 [Gemini 3 Pro Image] Generating: ${category.title}...`);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: category.prompt
            }]
          }],
          generationConfig: {
            responseModalities: ["image"]
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || JSON.stringify(error));
    }

    const data = await response.json();
    
    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const imageData = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          const ext = mimeType.split('/')[1] || 'png';
          
          const outputDir = path.join(__dirname, '..', 'public', 'category-images');
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          const outputPath = path.join(outputDir, `${category.name}.${ext}`);
          fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
          
          console.log(`✅ Saved: ${outputPath}`);
          return outputPath;
        }
      }
    }
    
    console.log(`⚠️ No image in response`);
    return null;
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting category image generation with Gemini/Imagen API...\n');
  console.log('Categories to generate:');
  categories.forEach((cat, i) => console.log(`  ${i + 1}. ${cat.title}`));
  
  const results = [];
  
  for (const category of categories) {
    let result = null;
    
    // Try different models in order of preference
    result = await generateWithGemini3ProImage(category);
    
    if (!result) {
      result = await generateWithGeminiImage(category);
    }
    
    if (!result) {
      result = await generateWithImagen4(category);
    }
    
    results.push({ 
      category: category.title, 
      path: result, 
      success: !!result 
    });
    
    // Delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n\n📊 Generation Summary:');
  console.log('='.repeat(50));
  results.forEach(r => {
    const status = r.success ? '✅' : '❌';
    console.log(`${status} ${r.category}: ${r.path || 'Not generated'}`);
  });
  
  const successCount = results.filter(r => r.success).length;
  console.log(`\n✨ Successfully generated ${successCount}/${results.length} images`);
  
  if (successCount > 0) {
    console.log(`\n📁 Images saved to: public/category-images/`);
  }
}

main().catch(console.error);







