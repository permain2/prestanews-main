import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = "AIzaSyCajW_O9-rBlnKr4c24OT60rCi0XZhSNKo";

const insurancePages = [
  {
    name: "car-insurance",
    prompt: "Create a professional, modern hero image for a car insurance comparison website. Show a sleek modern car on a scenic road with soft blue and teal gradient overlay. Clean, minimalist style with subtle geometric patterns. Professional financial website aesthetic. Colors should include navy blue (#0D2C4B), light blue (#146aff), and white accents. No text in image. 16:9 aspect ratio, high quality."
  }
];

async function generateWithGemini(page) {
  // Try the image generation model
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${API_KEY}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: page.prompt }]
      }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"]
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Gemini image gen error for ${page.name}:`, error);
    return null;
  }

  const data = await response.json();
  
  if (data.candidates?.[0]?.content?.parts) {
    for (const part of data.candidates[0].content.parts) {
      if (part.inlineData?.data) {
        return part.inlineData.data;
      }
    }
  }
  
  return null;
}

async function generateWithImagen(page) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: page.prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "16:9"
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Imagen error for ${page.name}:`, error);
    return null;
  }

  const data = await response.json();
  
  if (data.predictions?.[0]?.bytesBase64Encoded) {
    return data.predictions[0].bytesBase64Encoded;
  }
  
  return null;
}

async function main() {
  const outputDir = path.join(__dirname, "../public/insurance-heroes");
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const page of insurancePages) {
    console.log(`Generating image for ${page.name}...`);
    
    // Try Gemini 2.0 Flash first
    let imageData = await generateWithGemini(page);
    
    if (!imageData) {
      console.log(`Trying Imagen for ${page.name}...`);
      imageData = await generateWithImagen(page);
    }
    
    if (imageData) {
      const outputPath = path.join(outputDir, `${page.name}.jpeg`);
      fs.writeFileSync(outputPath, Buffer.from(imageData, "base64"));
      console.log(`✓ Saved ${page.name}.jpeg`);
    } else {
      console.error(`✗ Failed to generate image for ${page.name}`);
    }
  }
}

main().catch(console.error);







