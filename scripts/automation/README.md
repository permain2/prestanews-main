# Article Generation Pipeline

Automated review article generation system for Screened.com. Generates high-quality, SEO-optimized review articles at scale using AI.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp scripts/automation/.env.example .env
# Edit .env with your API keys

# 3. Import sample keywords (uses local JSON if Airtable not configured)
npm run pipeline:import

# 4. Generate a single article
npm run pipeline "best gaming headsets"

# 5. Batch generate articles
npm run pipeline:batch -- --limit 5
```

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Airtable DB   │───►│  SERP Research   │───►│ Article Gen     │
│   (Keywords)    │    │  (Apify)         │    │ (Claude)        │
└─────────────────┘    └──────────────────┘    └────────┬────────┘
                                                        │
┌─────────────────┐    ┌──────────────────┐    ┌────────▼────────┐
│   Published!    │◄───│   QA Agent       │◄───│ Affiliate Links │
│   (Astro Page)  │    │   (Review)       │    │ (Amazon)        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Pipeline Components

| Script | Purpose |
|--------|---------|
| `run-pipeline.js` | Master orchestrator CLI |
| `airtable-sync.js` | Database CRUD operations |
| `serp-research.js` | Google SERP + competitor scraping |
| `article-generator.js` | Claude-powered content generation |
| `amazon-affiliate.js` | Amazon affiliate link generation |
| `page-publisher.js` | Astro page generation |
| `qa-agent.js` | Quality assurance review |

## Commands

### Single Article
```bash
node scripts/automation/run-pipeline.js "best gaming headsets"
```

### Batch Processing
```bash
# Process next 5 keywords from database
node scripts/automation/run-pipeline.js --batch --limit 5

# Generate without auto-publishing
node scripts/automation/run-pipeline.js "best vpn services" --no-publish
```

### Database Operations
```bash
# Import sample keywords
node scripts/automation/airtable-sync.js import

# Check statistics
node scripts/automation/airtable-sync.js stats

# Get next keyword in queue
node scripts/automation/airtable-sync.js next
```

### Individual Components
```bash
# Research only
node scripts/automation/serp-research.js "best mattresses" --save

# Generate article from research data
node scripts/automation/article-generator.js --from-research research-data/best-mattresses-research.json

# Generate affiliate links
node scripts/automation/amazon-affiliate.js "SteelSeries Arctis Nova Pro"

# QA review existing article
node scripts/automation/qa-agent.js src/pages/blog/best-headsets.astro "best gaming headsets"
```

## Environment Variables

Create a `.env` file in the project root:

```bash
# Required for article generation
ANTHROPIC_API_KEY=sk-ant-...

# Required for SERP research (optional: falls back to mock data)
APIFY_API_TOKEN=apify_api_...

# Required for database (optional: falls back to local JSON)
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=app...

# Amazon affiliate tag
AMAZON_ASSOCIATE_TAG=screened0e-20
```

### Getting API Keys

| Service | URL | Required |
|---------|-----|----------|
| Anthropic | [console.anthropic.com](https://console.anthropic.com) | Yes |
| Apify | [apify.com/account](https://apify.com/account) | Optional |
| Airtable | [airtable.com/create/tokens](https://airtable.com/create/tokens) | Optional |
| Amazon Associates | [affiliate-program.amazon.com](https://affiliate-program.amazon.com) | Optional |

## Airtable Setup

If using Airtable, follow the setup guide in `AIRTABLE-SETUP.md`.

## Configuration Files

### `config/categories.json`
Category-specific settings including:
- Colors and styling
- Default authors
- URL prefixes
- Stats grid layout
- Logo folder paths

### `config/style-rules.json`
TPG writing style rules including:
- Voice and tone guidelines
- Required vocabulary
- Banned phrases
- SEO requirements
- Quality checks

### `config/sample-keywords.json`
50 sample keywords to start with, covering:
- Tech (headsets, VPNs, monitors)
- Insurance (car, home, pet)
- Finance (savings, loans)
- Credit Cards (travel, cashback)
- Home (warranty, security)
- Lifestyle (meal delivery, mattresses)

## Output

Generated articles are saved to:
- **Astro pages**: `src/pages/{category}/{slug}.astro`
- **Research data**: `scripts/automation/research-data/`
- **Article data**: `scripts/automation/article-data/`
- **Local DB**: `scripts/automation/data/` (when Airtable not configured)

## QA Scoring

Articles are automatically reviewed for:

| Check | Weight | What's Evaluated |
|-------|--------|------------------|
| SEO | 30% | Keyword density, word count, headings, meta description |
| Style | 25% | Sentence length, passive voice, TPG patterns |
| Vocabulary | 15% | Required terms, banned phrases |
| Structure | 15% | Required sections, components |
| Readability | 10% | Flesch-Kincaid grade level |
| Links | 5% | Affiliate links, internal links |

**Pass threshold**: 70/100

## Extending the Pipeline

### Adding New Categories

1. Add category config to `config/categories.json`:
```json
{
  "newcategory": {
    "name": "New Category",
    "primaryColor": "#123456",
    "defaultAuthor": "Author Name",
    "urlPrefix": "/newcategory",
    "statsGrid": ["Stat 1", "Stat 2", "Stat 3", "Stat 4"],
    "keywords": ["relevant", "keywords"]
  }
}
```

2. Create logo folder: `public/newcategory-logos/`
3. Add team author image: `public/team/author-name.jpg`

### Customizing Templates

The page publisher uses a template defined in `page-publisher.js`. To customize:

1. Modify the `_generatePage()` method
2. Update styles in `_generateStyles()`
3. Adjust component imports as needed

## Troubleshooting

### "ANTHROPIC_API_KEY not configured"
Set your API key in `.env` file.

### "No pending keywords in queue"
Run `npm run pipeline:import` to import sample keywords.

### "QA Failed"
Check the QA report saved alongside the article. Common issues:
- Word count too low (< 2500)
- Missing required sections
- Too many banned phrases

### Rate Limits
The pipeline includes built-in delays:
- 2s between Apify requests
- 1.5s between Amazon searches
- 10s between batch articles

## License

MIT

