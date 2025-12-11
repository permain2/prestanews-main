import 'dotenv/config';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load API key from .env file
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY not set in .env file');
  console.error('');
  console.error('Add to your .env file:');
  console.error('  GEMINI_API_KEY=your_key_here');
  console.error('');
  process.exit(1);
}

// Base style prompt for consistency across all headshots
const baseStyle = `Hyper-realistic professional corporate headshot photography. Modern corporate office background with soft natural light through blurred glass windows, neutral gray and beige tones. Professional studio lighting with soft key light from left side, fill light from right, subtle rim light. Head and shoulders portrait, subject centered, looking slightly off-camera with warm genuine expression. 8K resolution, photorealistic, professional business portrait style. Square 1:1 aspect ratio.`;

// Team members with detailed appearance prompts
const teamMembers = [
  {
    filename: "sarah-chen",
    name: "Sarah Chen",
    role: "Editor-in-Chief",
    prompt: `${baseStyle} Portrait of an Asian-American woman in her late 40s. She has an authoritative yet approachable presence, shoulder-length black hair with subtle gray highlights styled professionally, minimal elegant makeup, and warm intelligent brown eyes conveying expertise and leadership. Wearing a tailored navy blue blazer over a cream silk blouse. Confident warm smile. Executive presence.`
  },
  {
    filename: "michael-rodriguez",
    name: "Michael Rodriguez", 
    role: "Senior Credit Card Analyst",
    prompt: `${baseStyle} Portrait of a Hispanic-American man in his mid-30s. He has a friendly analytical demeanor with short dark brown hair neatly styled, clean-shaven face, and alert dark eyes suggesting attention to detail. Wearing a charcoal gray suit jacket over a light blue dress shirt, no tie for modern professional look. Genuine friendly smile conveying trustworthiness and approachability.`
  },
  {
    filename: "emily-johnson",
    name: "Emily Johnson",
    role: "Insurance Editor", 
    prompt: `${baseStyle} Portrait of a Caucasian woman in her early 40s. She has a warm trustworthy appearance with medium-length auburn hair, light natural freckles, and kind blue-green eyes. Wearing a soft sage green blazer over a white blouse, subtle pearl earrings. Approachable confident smile suggesting consumer advocacy expertise and warmth.`
  },
  {
    filename: "david-kim",
    name: "David Kim",
    role: "Personal Finance Writer (CFP®)",
    prompt: `${baseStyle} Portrait of a Korean-American man in his early 50s. He has a warm professorial appearance with salt-and-pepper hair neatly combed, wire-rimmed glasses, and intelligent dark eyes conveying wisdom and approachability. Wearing a classic navy blue blazer over a crisp white oxford shirt. Thoughtful welcoming smile of someone who loves teaching and helping others understand finance.`
  },
  {
    filename: "jessica-martinez",
    name: "Jessica Martinez",
    role: "Research Director",
    prompt: `${baseStyle} Portrait of a Latina woman in her mid-30s. She has a sharp intellectual presence with long dark brown hair pulled back in a professional low ponytail, minimal modern makeup, and perceptive brown eyes. Wearing a structured black blazer over a burgundy top, small geometric earrings. Confident analytical smile suggesting data expertise and strong leadership.`
  },
  {
    filename: "james-wilson",
    name: "James Wilson",
    role: "Senior Content Strategist",
    prompt: `${baseStyle} Portrait of a Caucasian man in his mid-40s. He has a seasoned creative-professional appearance with medium brown hair with slight gray at temples, well-groomed short beard, and thoughtful hazel eyes. Wearing smart casual look with textured dark gray sport coat over deep teal dress shirt, no tie. Engaging strategic smile of a digital publishing veteran.`
  }
];

// Generate with Gemini 2.5 Flash Image (best option)
async function generateWithGemini25FlashImage(member) {
  try {
    console.log(`\n🎨 [Gemini 2.5 Flash Image] Generating: ${member.name}...`);
    
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
              text: member.prompt
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
    
    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const imageData = part.inlineData.data;
          
          const outputDir = path.join(__dirname, '..', 'public', 'team');
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          // Always save as .jpg for consistency with about.astro
          const outputPath = path.join(outputDir, `${member.filename}.jpg`);
          fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
          
          console.log(`✅ Saved: ${outputPath}`);
          return outputPath;
        }
      }
    }
    
    console.log(`⚠️ No image in response`);
    return null;
    
  } catch (error) {
    console.error(`❌ Gemini 2.5 Flash Image Error: ${error.message}`);
    return null;
  }
}

// Generate with Gemini 3 Pro Image (backup)
async function generateWithGemini3ProImage(member) {
  try {
    console.log(`\n🎨 [Gemini 3 Pro Image] Generating: ${member.name}...`);
    
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
              text: member.prompt
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
          
          const outputDir = path.join(__dirname, '..', 'public', 'team');
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          // Always save as .jpg for consistency with about.astro
          const outputPath = path.join(outputDir, `${member.filename}.jpg`);
          fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
          
          console.log(`✅ Saved: ${outputPath}`);
          return outputPath;
        }
      }
    }
    
    console.log(`⚠️ No image in response`);
    return null;
    
  } catch (error) {
    console.error(`❌ Gemini 3 Pro Image Error: ${error.message}`);
    return null;
  }
}

// Generate with Imagen 4 (fallback for photorealistic)
async function generateWithImagen4(member) {
  try {
    console.log(`\n🎨 [Imagen 4] Generating: ${member.name}...`);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:generateImages?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: member.prompt,
          number_of_images: 1,
          aspect_ratio: "1:1",
          safety_filter_level: "BLOCK_ONLY_HIGH",
          person_generation: "ALLOW_ADULT"
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
      
      const outputDir = path.join(__dirname, '..', 'public', 'team');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputPath = path.join(outputDir, `${member.filename}.jpg`);
      fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
      
      console.log(`✅ Saved: ${outputPath}`);
      return outputPath;
    }
    
    console.log(`⚠️ No image in Imagen 4 response`);
    return null;
    
  } catch (error) {
    console.error(`❌ Imagen 4 Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting Team Headshot Generation with Gemini/Imagen API...\n');
  console.log('='.repeat(60));
  console.log('Team Members to generate:');
  teamMembers.forEach((m, i) => console.log(`  ${i + 1}. ${m.name} - ${m.role}`));
  console.log('='.repeat(60));
  
  const results = [];
  
  for (const member of teamMembers) {
    let result = null;
    
    // Try Gemini 2.5 Flash Image first
    result = await generateWithGemini25FlashImage(member);
    
    // Fallback to Gemini 3 Pro Image
    if (!result) {
      result = await generateWithGemini3ProImage(member);
    }
    
    // Fallback to Imagen 4
    if (!result) {
      result = await generateWithImagen4(member);
    }
    
    results.push({ 
      name: member.name,
      role: member.role,
      path: result, 
      success: !!result 
    });
    
    // Delay between requests to avoid rate limiting
    console.log('⏳ Waiting 3 seconds before next generation...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  console.log('\n\n📊 Generation Summary:');
  console.log('='.repeat(60));
  results.forEach(r => {
    const status = r.success ? '✅' : '❌';
    console.log(`${status} ${r.name} (${r.role})`);
    if (r.path) console.log(`   → ${r.path}`);
  });
  
  const successCount = results.filter(r => r.success).length;
  console.log('='.repeat(60));
  console.log(`\n✨ Successfully generated ${successCount}/${results.length} headshots`);
  
  if (successCount > 0) {
    console.log(`\n📁 Images saved to: public/team/`);
    console.log(`🌐 View on About page: /about`);
  }
  
  if (successCount < results.length) {
    console.log(`\n⚠️ Note: Some images failed to generate.`);
    console.log(`   This may be due to content policy restrictions on generating realistic human faces.`);
    console.log(`   Consider using alternative prompts or manual generation.`);
  }
}

main().catch(console.error);





