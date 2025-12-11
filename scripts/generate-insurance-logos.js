import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = "AIzaSyAsjaKCEKz5VHKq1s3eiF5E0fILJzDjj_M";

// 20 Insurance company logos to generate
const insuranceLogos = [
  // Car Insurance Companies
  { name: "geico", prompt: "Simple flat logo design for 'GEICO' insurance company, gecko mascot, green color scheme, clean minimal corporate logo, white background, professional, no shadows" },
  { name: "progressive", prompt: "Simple flat logo design for 'Progressive' insurance company, blue color scheme, clean minimal corporate logo, white background, professional, modern" },
  { name: "statefarm", prompt: "Simple flat logo design for 'State Farm' insurance company, red color scheme with three ovals, clean minimal corporate logo, white background, professional" },
  { name: "allstate", prompt: "Simple flat logo design for 'Allstate' insurance company, blue hands cupping shape, clean minimal corporate logo, white background, professional" },
  { name: "libertymutual", prompt: "Simple flat logo design for 'Liberty Mutual' insurance company, statue of liberty torch icon, yellow and blue colors, clean minimal corporate logo, white background" },
  
  // Life Insurance Companies  
  { name: "prudential", prompt: "Simple flat logo design for 'Prudential' insurance company, rock of gibraltar icon, blue color scheme, clean minimal corporate logo, white background, professional" },
  { name: "metlife", prompt: "Simple flat logo design for 'MetLife' insurance company, modern green and blue colors, clean minimal corporate logo, white background, professional" },
  { name: "newyorklife", prompt: "Simple flat logo design for 'New York Life' insurance company, blue color scheme, clean minimal corporate logo, white background, professional, established look" },
  { name: "northwestern", prompt: "Simple flat logo design for 'Northwestern Mutual' insurance company, blue color scheme, clean minimal corporate logo, white background, professional" },
  { name: "massmutual", prompt: "Simple flat logo design for 'MassMutual' insurance company, blue color scheme, clean minimal corporate logo, white background, professional" },
  
  // Home/Renters Insurance
  { name: "nationwide", prompt: "Simple flat logo design for 'Nationwide' insurance company, eagle icon, blue color scheme, clean minimal corporate logo, white background, professional" },
  { name: "travelers", prompt: "Simple flat logo design for 'Travelers' insurance company, red umbrella icon, red color scheme, clean minimal corporate logo, white background, professional" },
  { name: "farmers", prompt: "Simple flat logo design for 'Farmers' insurance company, shield icon, red and blue colors, clean minimal corporate logo, white background, professional" },
  { name: "usaa", prompt: "Simple flat logo design for 'USAA' insurance company, eagle and shield, blue and gold colors, clean minimal corporate logo, white background, military style" },
  { name: "lemonade", prompt: "Simple flat logo design for 'Lemonade' insurance company, pink color scheme, modern minimal style, clean corporate logo, white background, tech startup feel" },
  
  // Additional Insurance Companies
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
  
  // Clear and recreate directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  console.log("=== Generating 20 Insurance Company Logos ===\n");
  
  let successCount = 0;
  for (let i = 0; i < insuranceLogos.length; i++) {
    const logo = insuranceLogos[i];
    console.log(`[${i + 1}/${insuranceLogos.length}] Generating ${logo.name}...`);
    
    const success = await generateLogo(logo, outputDir);
    if (success) successCount++;
    
    // Delay between requests to avoid rate limiting
    if (i < insuranceLogos.length - 1) {
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\n✅ Done! Generated ${successCount}/${insuranceLogos.length} logos`);
}

main().catch(console.error);
