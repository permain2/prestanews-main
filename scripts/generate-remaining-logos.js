import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = "AIzaSyAsjaKCEKz5VHKq1s3eiF5E0fILJzDjj_M";

// Remaining logos to generate
const remainingLogos = [
  { name: "newyorklife", prompt: "Simple flat logo design for 'New York Life' insurance company, blue color scheme, clean minimal corporate logo, white background, professional, established look" },
  { name: "farmers", prompt: "Simple flat logo design for 'Farmers' insurance company, shield icon, red and blue colors, clean minimal corporate logo, white background, professional" },
  { name: "usaa", prompt: "Simple flat logo design for 'USAA' insurance company, eagle and shield, blue and gold colors, clean minimal corporate logo, white background, military style" },
  { name: "lemonade", prompt: "Simple flat logo design for 'Lemonade' insurance company, pink color scheme, modern minimal style, clean corporate logo, white background, tech startup feel" },
  { name: "amica", prompt: "Simple flat logo design for 'Amica' insurance company, blue color scheme, clean minimal corporate logo, white background, professional, friendly" },
  { name: "erie", prompt: "Simple flat logo design for 'Erie Insurance' company, blue color scheme, clean minimal corporate logo, white background, professional" },
  { name: "thehartford", prompt: "Simple flat logo design for 'The Hartford' insurance company, stag deer icon, red color scheme, clean minimal corporate logo, white background, professional" },
  { name: "aflac", prompt: "Simple flat logo design for 'Aflac' insurance company, white duck mascot, blue color scheme, clean minimal corporate logo, white background, friendly" },
  { name: "chubb", prompt: "Simple flat logo design for 'Chubb' insurance company, gold and black colors, clean minimal corporate logo, white background, professional, premium feel" }
];

async function generateLogo(logoData, outputDir) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt: logoData.prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: "1:1"
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Error for ${logoData.name}:`, error.substring(0, 200));
      return false;
    }

    const data = await response.json();
    
    if (data.predictions?.[0]?.bytesBase64Encoded) {
      const outputPath = path.join(outputDir, `${logoData.name}.png`);
      fs.writeFileSync(outputPath, Buffer.from(data.predictions[0].bytesBase64Encoded, "base64"));
      console.log(`✓ Generated ${logoData.name}.png`);
      return true;
    }
    
    console.error(`✗ No image data for ${logoData.name}`);
    return false;
  } catch (err) {
    console.error(`✗ Error for ${logoData.name}:`, err.message);
    return false;
  }
}

async function main() {
  const outputDir = path.join(__dirname, "../public/insurance-logos");
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("=== Generating Remaining Insurance Logos ===\n");
  
  let successCount = 0;
  for (let i = 0; i < remainingLogos.length; i++) {
    const logo = remainingLogos[i];
    console.log(`[${i + 1}/${remainingLogos.length}] Generating ${logo.name}...`);
    
    const success = await generateLogo(logo, outputDir);
    if (success) successCount++;
    
    // Delay between requests
    if (i < remainingLogos.length - 1) {
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\n✅ Done! Generated ${successCount}/${remainingLogos.length} logos`);
}

main().catch(console.error);






