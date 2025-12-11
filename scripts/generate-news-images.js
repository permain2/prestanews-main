/**
 * Generate News Article Images for PrestaNews
 * Uses Imagen 4.0 API with detailed prompts matching brand guidelines
 * 
 * BRAND GUIDELINES:
 * - Primary Colors: Navy blue (#0D2C4B), Light blue (#146aff), Teal accents
 * - Style: Clean, professional, modern, trustworthy
 * - Aesthetic: Premium financial publication, sophisticated yet approachable
 * - Visual Elements: Subtle gradients, soft lighting, geometric patterns
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Load API key from environment
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY not set in .env file');
  process.exit(1);
}

const newsImages = [
  {
    filename: "american-airlines-flagship-suites.jpeg",
    title: "American Airlines Unveils New Flagship Suites",
    prompt: `Professional editorial photograph of a luxurious airline business class cabin interior. 

SCENE: A premium lie-flat suite with elegant privacy doors partially open, revealing plush cream-colored leather seating, warm ambient lighting, and a sleek entertainment screen. The suite features polished wood-grain accents and brass trim details.

COMPOSITION: Shot from a 45-degree angle showing depth of the cabin, with soft bokeh effect on background seats. Natural light streaming through aircraft windows creates a warm, inviting glow.

STYLE: High-end travel magazine aesthetic, clean and sophisticated. Colors emphasize navy blue cabin walls, cream leather, warm amber lighting. Professional airline photography style similar to Condé Nast Traveler.

MOOD: Luxurious, aspirational, exclusive. The image conveys premium travel experience and comfort.

TECHNICAL: 16:9 aspect ratio, shallow depth of field, editorial photography quality, no people visible, magazine-worthy composition. No text or logos.`
  },
  {
    filename: "chase-sapphire-reserve-benefits.jpeg",
    title: "Chase Sapphire Reserve Adds New Travel Benefits",
    prompt: `Professional lifestyle photograph representing premium credit card travel benefits.

SCENE: An elegant airport lounge setting with a sleek navy blue premium credit card resting on a polished marble table. In the soft-focus background, floor-to-ceiling windows reveal aircraft on the tarmac during golden hour. A crystal glass and premium leather passport holder complement the scene.

COMPOSITION: Overhead angle at 30 degrees, card as focal point, depth created by lounge furniture and runway view. Warm sunset light creates sophisticated atmosphere.

STYLE: Luxury lifestyle photography for financial publications. Color palette: deep navy blue (#0D2C4B), warm golds, cream marble, sophisticated neutrals. Clean, aspirational, premium aesthetic matching high-end finance magazines.

MOOD: Sophisticated, exclusive, rewarding. Conveys the premium lifestyle associated with elite travel cards.

TECHNICAL: 16:9 aspect ratio, soft natural lighting, bokeh background, editorial quality. No readable text on card, no brand logos visible, no people.`
  },
  {
    filename: "marriott-bonvoy-elite-status.jpeg",
    title: "Marriott Bonvoy Elite Status Changes for 2026",
    prompt: `Professional hospitality photograph of a luxury hotel lobby and reception area.

SCENE: Grand hotel lobby with modern elegance - soaring ceilings, contemporary chandeliers, polished marble floors with subtle geometric patterns. An elegant check-in desk with warm wood accents and fresh floral arrangements. Behind the desk, a sophisticated wall feature with amber and gold accent lighting.

COMPOSITION: Wide establishing shot showcasing the scale and grandeur of the space. Leading lines from floor patterns draw eye toward the reception. Warm evening lighting creates an inviting atmosphere.

STYLE: High-end hospitality photography for luxury travel publications. Color palette: warm golds, deep browns, cream marble, subtle amber lighting against cool neutrals. Sophisticated and welcoming aesthetic.

MOOD: Prestigious, welcoming, exclusive. Conveys the experience of arriving at an elite-status hotel stay.

TECHNICAL: 16:9 aspect ratio, architectural photography style, warm balanced lighting, sharp throughout, no people, no visible brand names or logos.`
  },
  {
    filename: "delta-skymiles-award-chart.jpeg",
    title: "Delta SkyMiles Announces Award Chart Updates",
    prompt: `Professional aviation photograph capturing the essence of airline loyalty rewards.

SCENE: A sleek commercial aircraft tail fin and wing photographed at sunset from an interesting angle on the tarmac. The plane's metallic surface reflects the warm orange and purple sky. Soft runway lights beginning to glow in the background, creating depth and atmosphere.

COMPOSITION: Dynamic angle shooting upward at the aircraft tail, capturing the sweep of the wing and the dramatic sky. Golden hour lighting creates stunning reflections and silhouettes.

STYLE: Premium aviation photography suitable for travel industry publications. Color palette: sunset oranges, deep purples, metallic silvers and grays, warm highlights against cool shadows. Dramatic yet refined aesthetic.

MOOD: Aspirational, dynamic, rewarding. Suggests the exciting possibilities of airline miles and award travel.

TECHNICAL: 16:9 aspect ratio, golden hour natural lighting, sharp aircraft details with dreamy sky bokeh, professional aviation photography quality. No airline branding visible, no people.`
  },
  {
    filename: "amex-platinum-annual-fee.jpeg",
    title: "Amex Platinum Annual Fee Increase Coming",
    prompt: `Sophisticated still life photograph representing premium credit card value proposition.

SCENE: An elegant flat-lay composition on a rich navy blue velvet surface. A gleaming metallic credit card (silver/platinum finish) is artfully placed alongside premium items: a leather-bound notebook, designer sunglasses, a premium watch, and scattered travel ephemera like boarding pass stubs and a boutique hotel key card.

COMPOSITION: Overhead flat-lay style with careful arrangement creating visual flow. Soft directional lighting from top-left creates subtle shadows and highlights on the metallic card surface.

STYLE: Luxury product photography for financial lifestyle publications. Color palette: navy blue (#0D2C4B), silver metallics, warm leather browns, sophisticated neutrals. Premium editorial aesthetic.

MOOD: Exclusive, valuable, premium. Conveys that premium cards are worth the investment through lifestyle benefits.

TECHNICAL: 16:9 aspect ratio, studio lighting quality, rich textures visible, sharp product details. No readable text on any items, no brand logos, no people.`
  },
  {
    filename: "hilton-honors-devaluation.jpeg",
    title: "Hilton Honors Devaluation: What You Need to Know",
    prompt: `Professional hotel photography showcasing luxury accommodation value.

SCENE: Stunning hotel room with floor-to-ceiling windows revealing a dramatic city skyline at blue hour (just after sunset). The room features a perfectly made king bed with crisp white linens and accent pillows, elegant bedside lighting, and a sophisticated seating area with plush armchairs.

COMPOSITION: Shot from room entrance looking toward the window, bed in middle ground, spectacular view as backdrop. City lights just beginning to twinkle create magical atmosphere. Room lighting warm and inviting.

STYLE: Luxury hospitality photography for travel and lifestyle publications. Color palette: warm whites, soft creams, deep blues from the twilight sky, warm amber accent lighting. Clean, aspirational hotel photography.

MOOD: Luxurious, valuable, aspirational. Conveys what hotel points can unlock - premium experiences and stunning properties.

TECHNICAL: 16:9 aspect ratio, twilight natural lighting combined with room ambient, sharp interior with slightly soft exterior view, professional real estate photography quality. No people, no brand markings visible.`
  }
];

const outputDir = path.join(__dirname, '../public/news-images');

async function generateImage(newsItem, index) {
  console.log(`\n[${index + 1}/${newsImages.length}] Generating: ${newsItem.title}`);
  console.log(`Filename: ${newsItem.filename}`);
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;
  
  const requestBody = {
    instances: [
      {
        prompt: newsItem.prompt
      }
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: "16:9",
      outputMimeType: "image/jpeg"
    }
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`  ❌ API Error: ${response.status}`);
      console.error(`  ${errorText}`);
      return false;
    }
    
    const data = await response.json();
    
    if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
      const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
      const outputPath = path.join(outputDir, newsItem.filename);
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`  ✅ Saved: ${newsItem.filename} (${(imageBuffer.length / 1024).toFixed(1)} KB)`);
      return true;
    } else {
      console.error(`  ❌ No image data in response`);
      console.error(`  Response:`, JSON.stringify(data, null, 2).slice(0, 500));
      return false;
    }
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     PrestaNews - News Article Image Generator              ║');
  console.log('║     Using Imagen 4.0 with Brand-Aligned Prompts            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  
  // Create output directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`\n📁 Output directory: ${outputDir}`);
  
  let successful = 0;
  let failed = 0;
  
  // Generate images sequentially to avoid rate limits
  for (let i = 0; i < newsImages.length; i++) {
    const success = await generateImage(newsImages[i], i);
    if (success) {
      successful++;
    } else {
      failed++;
    }
    
    // Small delay between requests
    if (i < newsImages.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n══════════════════════════════════════════════════════════════');
  console.log(`✅ Successfully generated: ${successful} images`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed} images`);
  }
  console.log('══════════════════════════════════════════════════════════════');
}

main().catch(console.error);







