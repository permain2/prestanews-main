/**
 * Generate Images for Insurance & Guides Pages - PrestaNews
 * Uses Imagen 4.0 API with detailed brand-aligned prompts
 * 
 * BRAND GUIDELINES:
 * - Primary Colors: Navy blue (#0D2C4B), Light blue (#146aff), Teal accents
 * - Style: Clean, professional, modern, trustworthy
 * - Aesthetic: Premium financial publication, sophisticated yet approachable
 */

const fs = require('fs');
const path = require('path');

const API_KEY = "AIzaSyAsjaKCEKz5VHKq1s3eiF5E0fILJzDjj_M";

// ============ INSURANCE IMAGES (4) ============
const insuranceImages = [
  {
    filename: "car-insurance.jpeg",
    title: "Best Car Insurance",
    prompt: `Professional automotive photography for an insurance comparison website.

SCENE: A sleek modern sedan (silver/white) parked on a scenic coastal highway at golden hour. The car is positioned at a three-quarter angle showcasing its elegant lines. Behind it, a beautiful ocean vista with soft waves and a warm sunset sky. A subtle protective shield effect or soft glow surrounds the vehicle suggesting coverage and protection.

COMPOSITION: Car positioned in the lower two-thirds of frame, dramatic sky above. Rule of thirds with horizon line at upper third. Warm golden light reflecting off the car's surface.

STYLE: Premium automotive photography meets lifestyle imagery. Color palette: warm sunset oranges and golds, cool ocean blues, metallic silvers. Clean, aspirational, trustworthy aesthetic matching high-end insurance marketing.

MOOD: Protected, secure, premium. Conveys peace of mind and quality coverage.

TECHNICAL: 16:9 aspect ratio, golden hour lighting, shallow depth of field on background, sharp vehicle detail. No visible license plates, no brand logos, no people.`
  },
  {
    filename: "home-insurance.jpeg",
    title: "Best Home Insurance",
    prompt: `Professional real estate photography for homeowners insurance content.

SCENE: A beautiful modern craftsman-style home with warm exterior lighting at dusk (blue hour). The house features a welcoming front porch with soft ambient lighting, well-manicured landscaping, and a gently lit pathway leading to the entrance. The sky shows the transition from golden sunset to twilight blue.

COMPOSITION: House centered in frame with balanced landscaping on both sides. Warm interior lights visible through windows creating an inviting glow. Sky gradient from warm horizon to cool blue above.

STYLE: Premium real estate photography for financial publications. Color palette: warm amber home lighting, twilight blues, rich greens from landscaping, cream/white architectural elements. Cozy yet sophisticated aesthetic.

MOOD: Safe, protected, welcoming. The image conveys home as sanctuary and the importance of protecting it.

TECHNICAL: 16:9 aspect ratio, blue hour natural lighting combined with warm interior lights, architectural photography quality, sharp details throughout. No people, no visible addresses or house numbers.`
  },
  {
    filename: "renters-insurance.jpeg",
    title: "Best Renters Insurance",
    prompt: `Lifestyle interior photography for renters insurance content.

SCENE: A stylish modern apartment living room with large windows showing a city skyline view at sunset. The space features contemporary furniture including a comfortable sofa, a coffee table with a laptop and plants, and warm accent lighting. Personal belongings like books, decorative items, and electronics are tastefully arranged.

COMPOSITION: Wide angle interior shot with windows as backdrop. Living area occupies foreground and middle ground, city view creates depth. Warm evening light streaming through windows creates atmospheric glow.

STYLE: Modern lifestyle photography for millennial/Gen-Z audience. Color palette: warm neutrals, soft grays, pops of green from plants, warm orange sunset through windows, navy blue accent pieces. Urban, cozy, aspirational aesthetic.

MOOD: Comfortable, personal, protected. Conveys that renters have valuable belongings worth protecting.

TECHNICAL: 16:9 aspect ratio, mixed natural and interior lighting, interior photography quality with attention to styling. No people, no visible brand names on electronics.`
  },
  {
    filename: "life-insurance.jpeg",
    title: "Best Life Insurance",
    prompt: `Emotive lifestyle photography for life insurance content.

SCENE: A serene outdoor setting at golden hour - a beautiful park or garden with a decorative wooden bench positioned under a mature tree. Soft sunlight filters through leaves creating dappled light patterns. A peaceful pond or gentle rolling hills visible in soft focus background. The scene suggests contemplation, security, and the importance of planning for loved ones.

COMPOSITION: Bench positioned at lower right third, tree framing the upper portion. Soft bokeh background with warm golden light. Space in the frame suggests openness and future possibilities.

STYLE: Emotive editorial photography with fine art sensibilities. Color palette: warm golden sunlight, rich greens, soft earth tones, peaceful blues in distance. Thoughtful, peaceful, reassuring aesthetic.

MOOD: Peaceful, secure, thoughtful. Conveys planning for the future and protecting what matters most.

TECHNICAL: 16:9 aspect ratio, golden hour backlighting with lens flare, shallow depth of field, fine art photography quality. No people, natural setting only.`
  }
];

// ============ GUIDES IMAGES (9) ============
const guidesImages = [
  {
    filename: "credit-card-points-guide.jpeg",
    title: "Complete Guide to Credit Card Points",
    prompt: `Creative conceptual photography for credit card rewards content.

SCENE: An artistic flat-lay composition on a marble surface featuring a sleek navy blue credit card surrounded by miniature travel icons: tiny model airplane, Eiffel Tower figurine, tropical palm tree, shopping bags, and scattered gold/silver dots representing points. Soft directional lighting creates elegant shadows.

COMPOSITION: Overhead flat-lay with credit card as central focal point. Travel icons arranged in artistic spiral pattern around the card. Negative space at edges for clean composition.

STYLE: Premium product photography with whimsical editorial touch. Color palette: navy blue (#0D2C4B), gold accents, white marble, pops of color from travel miniatures. Sophisticated yet playful aesthetic.

MOOD: Exciting, rewarding, aspirational. Conveys the possibilities unlocked by credit card points.

TECHNICAL: 16:9 aspect ratio, soft studio lighting, sharp details on objects, subtle shadows for depth. No readable text on card, miniatures should look premium not cheap.`
  },
  {
    filename: "choose-credit-card.jpeg",
    title: "How to Choose the Right Credit Card",
    prompt: `Conceptual photography representing credit card decision-making.

SCENE: An elegant desk setup with three premium credit cards (different colors: navy blue, silver metallic, rose gold) fanned out on a clean white surface. A minimalist hand-drawn style flowchart or decision tree is visible in soft focus on paper nearby. Subtle lighting creates depth and sophistication.

COMPOSITION: Cards arranged in elegant fan pattern at center, supporting elements (pen, paper) at edges. Clean negative space emphasizes the cards. Soft directional light from upper left.

STYLE: Minimalist product photography for financial decision content. Color palette: navy blue, silver, rose gold on crisp white background. Clean, professional, decision-focused aesthetic.

MOOD: Clear, helpful, empowering. Conveys making informed financial decisions with confidence.

TECHNICAL: 16:9 aspect ratio, clean studio lighting, sharp card details, minimal props. No readable text or brand logos on cards, no people.`
  },
  {
    filename: "car-insurance-coverage-guide.jpeg",
    title: "Understanding Car Insurance Coverage",
    prompt: `Educational conceptual photography for insurance coverage explanation.

SCENE: A creative split composition showing a miniature toy car on one side and protective elements on the other (umbrella, shield icon representation, safety symbols). The background transitions from warm (unprotected) to cool blue (protected). Soft studio lighting creates professional look.

COMPOSITION: Diagonal split with toy car on warm side, protective elements on cool side. Visual metaphor of coverage protecting the vehicle. Clean, infographic-style aesthetic.

STYLE: Educational product photography with conceptual elements. Color palette: warm oranges/reds on one side transitioning to cool blues/teals on protected side. Clear, informative, trustworthy aesthetic.

MOOD: Educational, reassuring, clear. Conveys understanding of coverage types and their importance.

TECHNICAL: 16:9 aspect ratio, studio lighting, conceptual but clean execution. Stylized miniatures, no real vehicles, no brand logos.`
  },
  {
    filename: "home-insurance-coverage-guide.jpeg",
    title: "Home Insurance: What's Covered?",
    prompt: `Conceptual photography illustrating home insurance coverage.

SCENE: A charming miniature house model (modern craftsman style) placed under a transparent protective dome or umbrella, sitting on a wooden surface. Around the house, small icons or miniatures represent coverage: tiny furniture, electronics, a water droplet, a small flame symbol - all in an organized, infographic-style arrangement.

COMPOSITION: House under protective element as central focus. Coverage icons arranged around it in a circular pattern. Clean background with subtle gradient.

STYLE: Editorial product photography with educational purpose. Color palette: warm wood tones, cool protective blues, white/cream house model. Clear, organized, informative aesthetic.

MOOD: Protected, comprehensive, reassuring. Conveys thorough understanding of what's covered.

TECHNICAL: 16:9 aspect ratio, soft studio lighting, sharp miniature details, clean background. High-quality miniatures, no brand logos.`
  },
  {
    filename: "credit-score-101.jpeg",
    title: "Credit Score 101: What You Need to Know",
    prompt: `Modern conceptual photography for credit score education.

SCENE: A clean, modern workspace with a digital tablet or screen showing a stylized credit score meter/gauge graphic (abstract, no real numbers). Surrounding the device: ascending stair-step blocks representing score improvement, a small plant symbolizing growth, and geometric shapes in green gradient tones.

COMPOSITION: Tablet/screen at center-right showing abstract score graphic. Growth elements arranged on left side creating visual narrative of improvement. Clean white/light gray background.

STYLE: Modern tech-forward educational photography. Color palette: fresh greens representing good scores, clean whites, soft grays, navy blue accents. Contemporary, optimistic, educational aesthetic.

MOOD: Empowering, educational, optimistic. Conveys that credit scores are understandable and improvable.

TECHNICAL: 16:9 aspect ratio, bright even lighting, modern minimal style. Abstract graphics only - no real credit score numbers, no brand logos.`
  },
  {
    filename: "life-insurance-explained.jpeg",
    title: "Life Insurance Explained",
    prompt: `Warm conceptual photography for life insurance education.

SCENE: A meaningful still life on a warm wooden desk featuring: an open notebook or document with abstract financial planning sketches, a family photo frame (photo intentionally blurred/abstract), a small tree sapling in a pot representing growth, and soft ambient lighting creating a thoughtful atmosphere.

COMPOSITION: Items arranged in natural grouping suggesting planning and family. Warm side lighting creates depth and emotion. Frame with abstract family image adds human element without showing faces.

STYLE: Warm editorial photography with emotional resonance. Color palette: warm woods, soft creams, green from plant, soft golden light. Thoughtful, meaningful, accessible aesthetic.

MOOD: Caring, protective, forward-thinking. Conveys the importance of planning for loved ones' futures.

TECHNICAL: 16:9 aspect ratio, warm directional lighting, intimate still-life style. Blurred photo in frame (shapes only, no identifiable faces), no readable text.`
  },
  {
    filename: "maximize-cashback.jpeg",
    title: "Maximizing Cash Back Rewards",
    prompt: `Dynamic conceptual photography for cash back rewards content.

SCENE: A creative composition featuring a sleek cash back credit card with stylized dollar signs and coin icons floating/rising from it in a dynamic upward pattern. Clean white background with subtle green gradient suggesting money and growth. Modern, energetic feel.

COMPOSITION: Card at bottom-center as source, dollars/coins rising upward in dynamic pattern. Movement suggested through positioning. Plenty of negative space for clean look.

STYLE: Modern fintech-style product photography. Color palette: fresh greens for money, clean white, silver card tones, subtle gold accents. Energetic, rewarding, modern aesthetic.

MOOD: Rewarding, exciting, achievable. Conveys the tangible benefits of cash back optimization.

TECHNICAL: 16:9 aspect ratio, bright studio lighting, stylized money icons (not photorealistic currency), dynamic composition. No readable text, no brand logos, no real currency.`
  },
  {
    filename: "renters-insurance-guide.jpeg",
    title: "Renters Insurance Guide",
    prompt: `Lifestyle flat-lay photography for renters insurance education.

SCENE: A bird's-eye view flat-lay on a light wood surface showing items a renter would want to protect: a laptop, smartphone, camera, jewelry in a small dish, keys with a keychain, sunglasses, and a small potted plant. A subtle outline or soft glow suggests a protective boundary around these items.

COMPOSITION: Items arranged in organized grid pattern with natural groupings. Protective element (subtle circle or soft vignette) encompasses items. Clean, lifestyle aesthetic.

STYLE: Modern lifestyle flat-lay photography. Color palette: warm wood tones, tech silver/black, green plant accent, subtle teal protective glow. Urban, relatable, practical aesthetic.

MOOD: Protected, valuable, relatable. Conveys that everyday items are worth protecting.

TECHNICAL: 16:9 aspect ratio, soft overhead lighting, lifestyle photography quality. Generic devices (no brand logos visible), organized but natural arrangement.`
  },
  {
    filename: "building-credit.jpeg",
    title: "Building Credit From Scratch",
    prompt: `Optimistic conceptual photography for credit building content.

SCENE: A symbolic composition showing building blocks or steps ascending from bottom-left to upper-right, with a small flag or marker at the top. The blocks transition from basic/foundation at bottom to refined/polished at top. Soft gradient background from cool to warm tones suggesting progress and achievement.

COMPOSITION: Ascending diagonal arrangement creating visual journey. Foundation blocks solid and basic, upper blocks more refined and premium. Celebratory element at peak.

STYLE: Inspirational conceptual photography. Color palette: foundation in soft blues/grays, transitioning to warmer tones and gold at top. Optimistic, achievable, progressive aesthetic.

MOOD: Hopeful, achievable, empowering. Conveys that building credit is a step-by-step journey anyone can take.

TECHNICAL: 16:9 aspect ratio, soft studio lighting, clean background gradient. Abstract representation - blocks can be geometric shapes, no literal credit cards needed.`
  }
];

async function generateImage(item, index, total, outputDir) {
  console.log(`\n[${index + 1}/${total}] Generating: ${item.title}`);
  console.log(`   Filename: ${item.filename}`);
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;
  
  const requestBody = {
    instances: [{ prompt: item.prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "16:9",
      outputMimeType: "image/jpeg"
    }
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`   ❌ API Error: ${response.status}`);
      console.error(`   ${errorText.slice(0, 200)}`);
      return false;
    }
    
    const data = await response.json();
    
    if (data.predictions?.[0]?.bytesBase64Encoded) {
      const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
      const outputPath = path.join(outputDir, item.filename);
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`   ✅ Saved: ${item.filename} (${(imageBuffer.length / 1024).toFixed(1)} KB)`);
      return true;
    } else {
      console.error(`   ❌ No image data in response`);
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║     PrestaNews - Insurance & Guides Image Generator               ║');
  console.log('║     Using Imagen 4.0 with Brand-Aligned Prompts                   ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');
  
  const insuranceDir = path.join(__dirname, '../public/insurance-images');
  const guidesDir = path.join(__dirname, '../public/guides-images');
  
  // Create/clear directories
  for (const dir of [insuranceDir, guidesDir]) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true });
    }
    fs.mkdirSync(dir, { recursive: true });
  }
  
  console.log(`\n📁 Insurance output: ${insuranceDir}`);
  console.log(`📁 Guides output: ${guidesDir}`);
  
  const total = insuranceImages.length + guidesImages.length;
  let successful = 0;
  let current = 0;
  
  // Generate insurance images
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  INSURANCE IMAGES (4)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  for (const item of insuranceImages) {
    current++;
    const success = await generateImage(item, current - 1, total, insuranceDir);
    if (success) successful++;
    await new Promise(r => setTimeout(r, 2000)); // Rate limit delay
  }
  
  // Generate guides images
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  GUIDES IMAGES (9)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  for (const item of guidesImages) {
    current++;
    const success = await generateImage(item, current - 1, total, guidesDir);
    if (success) successful++;
    await new Promise(r => setTimeout(r, 2000)); // Rate limit delay
  }
  
  console.log('\n═══════════════════════════════════════════════════════════════════');
  console.log(`  ✅ Successfully generated: ${successful}/${total} images`);
  console.log('═══════════════════════════════════════════════════════════════════');
}

main().catch(console.error);






