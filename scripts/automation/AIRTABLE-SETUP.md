# Airtable Setup Guide

## Step 1: Create a New Airtable Base

1. Go to [airtable.com](https://airtable.com) and sign in
2. Click "Add a base" → "Start from scratch"
3. Name it: **Screened Article Pipeline**

## Step 2: Create the Tables

### Table 1: Keywords

| Field Name | Field Type | Options |
|------------|-----------|---------|
| keyword | Single line text | Primary field |
| category | Single select | tech, insurance, finance, home, lifestyle, credit-cards |
| priority | Number | 1-10 (1 = highest) |
| status | Single select | pending, researching, writing, reviewing, published, failed |
| search_volume | Number | Monthly search volume |
| difficulty | Number | Keyword difficulty 0-100 |
| assigned_date | Date | |
| published_date | Date | |
| article_url | URL | |
| serp_data | Long text | JSON of SERP research |
| notes | Long text | |

### Table 2: Products

| Field Name | Field Type | Options |
|------------|-----------|---------|
| product_name | Single line text | Primary field |
| keyword | Link to Keywords | |
| amazon_asin | Single line text | |
| affiliate_link | URL | |
| price | Currency | |
| rating | Number | 1-5 |
| review_count | Number | |
| position | Number | Rank 1-10 |
| best_for | Single line text | "Best Overall", "Best Value" etc |
| pros | Long text | JSON array |
| cons | Long text | JSON array |
| description | Long text | |
| image_url | URL | |

### Table 3: Articles

| Field Name | Field Type | Options |
|------------|-----------|---------|
| title | Single line text | Primary field |
| keyword | Link to Keywords | |
| slug | Single line text | |
| file_path | Single line text | |
| word_count | Number | |
| seo_score | Number | 0-100 |
| qa_status | Single select | pending, passed, failed, needs_revision |
| qa_notes | Long text | |
| published | Checkbox | |
| created_at | Date | |
| updated_at | Date | |
| content_brief | Long text | JSON |

## Step 3: Get Your API Credentials

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Name: "Screened Pipeline"
4. Scopes: `data.records:read`, `data.records:write`, `schema.bases:read`
5. Access: Add your "Screened Article Pipeline" base
6. Copy the token

## Step 4: Get Your Base ID

1. Open your Airtable base
2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
3. The `appXXXXXXXXXXXXXX` part is your Base ID

## Step 5: Add to .env

```bash
AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
```

## Step 6: Import Sample Keywords

Run the following to import 50 sample keywords:

```bash
node scripts/automation/import-sample-keywords.js
```

## Table Views (Optional but Recommended)

Create these views in Airtable for easier management:

### Keywords Table Views:
- **Pipeline Queue**: Filter by status = "pending", Sort by priority ASC
- **In Progress**: Filter by status IN ("researching", "writing", "reviewing")
- **Published**: Filter by status = "published"
- **Failed**: Filter by status = "failed"

### Articles Table Views:
- **QA Review**: Filter by qa_status = "pending"
- **Needs Revision**: Filter by qa_status = "needs_revision"
- **Ready to Publish**: Filter by qa_status = "passed" AND published = false

