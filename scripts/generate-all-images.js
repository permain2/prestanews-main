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

// Insurance category images
const insuranceImages = [
  {
    name: "car-insurance",
    prompt: "Modern car driving on highway with protective shield icon overlay, blue and teal gradient, professional financial website style, clean minimalist design, no text, high quality"
  },
  {
    name: "home-insurance", 
    prompt: "Beautiful modern house with protective shield overlay, warm sunset lighting, professional financial website style, clean minimalist design, orange and gold accents, no text, high quality"
  },
  {
    name: "renters-insurance",
    prompt: "Modern apartment building interior with cozy furniture and protective elements, professional financial website style, purple and blue gradient, clean minimalist design, no text, high quality"
  },
  {
    name: "life-insurance",
    prompt: "Family silhouette with protective umbrella or shield, warm caring atmosphere, professional financial website style, green and teal gradient, clean minimalist design, no text, high quality"
  }
];

// Guides images
const guidesImages = [
  {
    name: "credit-card-points",
    prompt: "Credit card with floating reward points and stars, blue gradient background, professional financial website style, clean 3D illustration, no text, high quality"
  },
  {
    name: "choose-credit-card",
    prompt: "Multiple credit cards fanned out with selection checkmark, indigo purple gradient, professional financial website style, clean 3D illustration, no text, high quality"
  },
  {
    name: "car-insurance-coverage",
    prompt: "Car with protective bubble shield around it, red gradient background, professional financial website style, clean 3D illustration, no text, high quality"
  },
  {
    name: "home-insurance-coverage",
    prompt: "House with protective dome and insurance document, orange gradient background, professional financial website style, clean 3D illustration, no text, high quality"
  },
  {
    name: "credit-score",
    prompt: "Credit score gauge meter showing excellent score with upward arrow, green gradient background, professional financial website style, clean 3D illustration, no text, high quality"
  },
  {
    name: "life-insurance-guide",
    prompt: "Family protected under umbrella with heart symbol, purple gradient background, professional financial website style, clean 3D illustration, no text, high quality"
  },
  {
    name: "maximize-cashback",
    prompt: "Cash bills and coins with percentage symbols floating, emerald green gradient, professional financial website style, clean 3D illustration, no text, high quality"
  },
  {
    name: "renters-insurance-guide",
    prompt: "Apartment keys with shield protection symbol, cyan blue gradient, professional financial website style, clean 3D illustration, no text, high quality"
  },
  {
    name: "building-credit",
    prompt: "Building blocks stacking up with credit card, teal gradient background, growth and progress theme, professional financial website style, clean 3D illustration, no text, high quality"
  }
];

async function generateWithImagen(imageData, outputDir) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: imageData.prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "16:9"
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Error for ${imageData.name}:`, error);
    return false;
  }

  const data = await response.json();
  
  if (data.predictions?.[0]?.bytesBase64Encoded) {
    const outputPath = path.join(outputDir, `${imageData.name}.jpeg`);
    fs.writeFileSync(outputPath, Buffer.from(data.predictions[0].bytesBase64Encoded, "base64"));
    console.log(`✓ Saved ${imageData.name}.jpeg`);
    return true;
  }
  
  console.error(`✗ No image data for ${imageData.name}`);
  return false;
}

async function main() {
  // Create output directories
  const insuranceDir = path.join(__dirname, "../public/insurance-images");
  const guidesDir = path.join(__dirname, "../public/guides-images");
  
  if (!fs.existsSync(insuranceDir)) fs.mkdirSync(insuranceDir, { recursive: true });
  if (!fs.existsSync(guidesDir)) fs.mkdirSync(guidesDir, { recursive: true });

  console.log("=== Generating Insurance Images ===");
  for (const img of insuranceImages) {
    console.log(`Generating ${img.name}...`);
    await generateWithImagen(img, insuranceDir);
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log("\n=== Generating Guides Images ===");
  for (const img of guidesImages) {
    console.log(`Generating ${img.name}...`);
    await generateWithImagen(img, guidesDir);
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log("\n✅ Done generating all images!");
}

main().catch(console.error);






