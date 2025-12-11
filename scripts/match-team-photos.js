import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = "AIzaSyCajW_O9-rBlnKr4c24OT60rCi0XZhSNKo";

// Team members with their characteristics for matching
const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Editor-in-Chief",
    filename: "sarah-chen.jpg",
    matchCriteria: "Asian female, professional appearance, leadership presence"
  },
  {
    name: "Michael Rodriguez",
    role: "Senior Credit Card Analyst",
    filename: "michael-rodriguez.jpg",
    matchCriteria: "Hispanic male, professional business appearance"
  },
  {
    name: "Emily Johnson",
    role: "Insurance Editor",
    filename: "emily-johnson.jpg",
    matchCriteria: "Caucasian female, approachable, professional"
  },
  {
    name: "David Kim",
    role: "Personal Finance Writer",
    filename: "david-kim.jpg",
    matchCriteria: "Asian male, young professional appearance"
  },
  {
    name: "Jessica Martinez",
    role: "Research Director",
    filename: "jessica-martinez.jpg",
    matchCriteria: "Hispanic female, analytical/professional appearance"
  },
  {
    name: "James Wilson",
    role: "Senior Content Strategist",
    filename: "james-wilson.jpg",
    matchCriteria: "Caucasian male, experienced professional, mature"
  }
];

async function analyzeImageWithGemini(imagePath) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  
  // Read image and convert to base64
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");
  const mimeType = "image/jpeg";
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: `Analyze this professional headshot photo and describe the person in JSON format with these fields:
- gender: "male" or "female"
- ethnicity: best estimate (e.g., "caucasian", "asian", "hispanic", "african-american", etc.)
- age_range: approximate age range (e.g., "25-35", "35-45", "45-55")
- appearance: brief description of professional appearance
- hair_color: hair color if visible
- demeanor: professional demeanor (e.g., "confident", "approachable", "authoritative")

Return ONLY valid JSON, no markdown or extra text.`
          }
        ]
      }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Gemini error for ${imagePath}:`, error);
    return null;
  }

  const data = await response.json();
  
  if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
    try {
      const text = data.candidates[0].content.parts[0].text;
      // Clean up potential markdown formatting
      const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (e) {
      console.error(`Failed to parse JSON for ${imagePath}:`, data.candidates[0].content.parts[0].text);
      return null;
    }
  }
  
  return null;
}

function matchImageToTeamMember(imageAnalysis, imageFile, assignedImages) {
  // Matching logic based on gender and ethnicity
  const { gender, ethnicity } = imageAnalysis;
  
  // Find unassigned team members that match the criteria
  const potentialMatches = teamMembers.filter(member => {
    // Skip already assigned members
    if (assignedImages.has(member.name)) return false;
    
    const criteria = member.matchCriteria.toLowerCase();
    const genderMatch = criteria.includes(gender.toLowerCase());
    
    // Check ethnicity match
    let ethnicityMatch = false;
    if (ethnicity) {
      const eth = ethnicity.toLowerCase();
      if (criteria.includes("asian") && (eth.includes("asian") || eth.includes("east asian"))) {
        ethnicityMatch = true;
      } else if (criteria.includes("hispanic") && (eth.includes("hispanic") || eth.includes("latin"))) {
        ethnicityMatch = true;
      } else if (criteria.includes("caucasian") && (eth.includes("caucasian") || eth.includes("white") || eth.includes("european"))) {
        ethnicityMatch = true;
      }
    }
    
    return genderMatch && ethnicityMatch;
  });
  
  if (potentialMatches.length > 0) {
    return potentialMatches[0];
  }
  
  // If no ethnicity match, try gender-only match for remaining unassigned
  const genderMatches = teamMembers.filter(member => {
    if (assignedImages.has(member.name)) return false;
    const criteria = member.matchCriteria.toLowerCase();
    return criteria.includes(gender.toLowerCase());
  });
  
  if (genderMatches.length > 0) {
    return genderMatches[0];
  }
  
  return null;
}

async function main() {
  const inputDir = path.join(__dirname, "../aboutusphoto");
  const outputDir = path.join(__dirname, "../public/team");
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Get all image files
  const imageFiles = fs.readdirSync(inputDir).filter(file => 
    file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')
  );
  
  console.log(`Found ${imageFiles.length} images to analyze...\n`);
  
  const imageAnalyses = [];
  
  // Analyze each image
  for (const imageFile of imageFiles) {
    const imagePath = path.join(inputDir, imageFile);
    console.log(`Analyzing ${imageFile}...`);
    
    const analysis = await analyzeImageWithGemini(imagePath);
    
    if (analysis) {
      console.log(`  Gender: ${analysis.gender}, Ethnicity: ${analysis.ethnicity}, Age: ${analysis.age_range}`);
      imageAnalyses.push({ file: imageFile, path: imagePath, analysis });
    } else {
      console.log(`  Failed to analyze`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log("\n--- Matching images to team members ---\n");
  
  const assignedImages = new Map();
  const mapping = {};
  
  // First pass: match by both gender and ethnicity
  for (const { file, path: imagePath, analysis } of imageAnalyses) {
    const match = matchImageToTeamMember(analysis, file, new Set(assignedImages.keys()));
    
    if (match && !assignedImages.has(match.name)) {
      assignedImages.set(match.name, { file, path: imagePath, analysis });
      mapping[match.name] = file;
      console.log(`✓ ${file} → ${match.name} (${match.role})`);
    }
  }
  
  // Check for unassigned team members
  const unassigned = teamMembers.filter(m => !assignedImages.has(m.name));
  if (unassigned.length > 0) {
    console.log(`\nUnassigned team members: ${unassigned.map(m => m.name).join(', ')}`);
  }
  
  // Check for unused images
  const usedFiles = new Set(Array.from(assignedImages.values()).map(v => v.file));
  const unusedImages = imageFiles.filter(f => !usedFiles.has(f));
  if (unusedImages.length > 0) {
    console.log(`Unused images: ${unusedImages.join(', ')}`);
    
    // Assign remaining images to remaining team members
    for (let i = 0; i < Math.min(unusedImages.length, unassigned.length); i++) {
      const member = unassigned[i];
      const imageFile = unusedImages[i];
      assignedImages.set(member.name, { 
        file: imageFile, 
        path: path.join(inputDir, imageFile),
        analysis: imageAnalyses.find(a => a.file === imageFile)?.analysis 
      });
      mapping[member.name] = imageFile;
      console.log(`✓ ${imageFile} → ${member.name} (fallback assignment)`);
    }
  }
  
  console.log("\n--- Copying images to public/team ---\n");
  
  // Copy images with correct naming
  for (const [memberName, data] of assignedImages) {
    const member = teamMembers.find(m => m.name === memberName);
    if (member) {
      const sourcePath = data.path;
      const destPath = path.join(outputDir, member.filename);
      
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✓ Copied to ${member.filename}`);
    }
  }
  
  console.log("\n--- Final Mapping ---\n");
  console.log(JSON.stringify(mapping, null, 2));
  
  // Save mapping to file for reference
  fs.writeFileSync(
    path.join(__dirname, "team-photo-mapping.json"),
    JSON.stringify(mapping, null, 2)
  );
  
  console.log("\n✓ Mapping saved to scripts/team-photo-mapping.json");
}

main().catch(console.error);

