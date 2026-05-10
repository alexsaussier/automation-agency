# PME Scout — Setup Guide

## What it does

Runs every 3 days via GitHub Actions:
1. Scrapes cession-commerce.com, fusacq.com, place-des-commerces.com
2. Runs a digital audit on each new listing (website probe + PageSpeed)
3. Scores each with Claude Haiku (sector digitalization gap + financials)
4. Writes all results to Google Sheets
5. Emails you the top 5 candidates

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Add **3 tabs** (click `+` at the bottom):
   - `Annonces`
   - `Seen`
   - `Top5`
3. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
   ```

---

## Step 2 — Create a Google Service Account

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create or select a project.
3. Enable the **Google Sheets API**:
   - APIs & Services → Enable APIs → search "Google Sheets API" → Enable
4. Create a Service Account:
   - APIs & Services → Credentials → Create Credentials → Service Account
   - Name: `brightbots-scout` (any name)
   - Role: not required (just click Continue)
5. Open the service account → Keys → Add Key → JSON → Download.
6. The downloaded file looks like:
   ```json
   {
     "type": "service_account",
     "project_id": "...",
     "private_key_id": "...",
     "private_key": "-----BEGIN RSA PRIVATE KEY-----\n...",
     "client_email": "brightbots-scout@your-project.iam.gserviceaccount.com",
     ...
   }
   ```

7. **Share your Google Sheet** with the service account email:
   - Open the sheet → Share → paste `client_email` from the JSON → Editor role.

---

## Step 3 — Add GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Value |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Paste the **full contents** of the JSON file downloaded above |
| `GOOGLE_SHEET_ID` | The Sheet ID from Step 1 |
| `ANTHROPIC_API_KEY` | Your Anthropic API key (already set if blog generation works) |
| `SCOUT_EMAIL_TO` | Your email address (e.g. `alex@brightbots.io`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | Reuse existing SMTP secrets — email is optional |

---

## Step 4 — First run

**Trigger manually** to validate setup:
- GitHub → Actions tab → "Scout PME" → Run workflow

Check the logs. On first run the script initialises sheet headers and processes all found listings.

---

## Step 5 — Adjust scrapers (if needed)

Each platform can redesign its HTML at any time. If a scraper returns 0 results:

```bash
DEBUG=1 node scripts/scout-pme/index.mjs
```

This dumps the first 2 000 chars of each scraped page so you can inspect the actual HTML and update the CSS selectors in `scrapers.mjs`.

---

## Schedule

The workflow runs on days 1, 4, 7, 10, 13, 16, 19, 22, 25, 28 of each month at 07:00 UTC (≈ 09:00 Paris). To change frequency, edit the `cron` field in `.github/workflows/scout-pme.yml`.

---

## Google Sheet structure

### `Annonces` tab — all listings with scores

| Column | Content |
|---|---|
| A | ID (MD5 hash of source+URL) |
| B | Date |
| C | Source platform |
| D | Titre |
| E | Secteur |
| F | Localisation |
| G | CA |
| H | Prix |
| I | URL |
| J | **Score global (0-100)** |
| K | Score secteur |
| L | Score digital |
| M | Score financier |
| N | Analyse Claude |
| O | Opportunités |
| P | Red flags |
| Q | Statut (Nouveau / En analyse / …) |

### `Top5` tab — latest top 5 (refreshed each run)

### `Seen` tab — processed IDs (prevents duplicates across runs)
