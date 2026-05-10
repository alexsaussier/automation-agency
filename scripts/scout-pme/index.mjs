#!/usr/bin/env node
/**
 * PME Scout — orchestrator
 *
 * Usage:
 *   node scripts/scout-pme/index.mjs          # normal run
 *   DEBUG=1 node scripts/scout-pme/index.mjs  # dump raw HTML from scrapers
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY
 *   GOOGLE_SERVICE_ACCOUNT_JSON
 *   GOOGLE_SHEET_ID
 *
 * Optional (email):
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM
 *   SCOUT_EMAIL_TO  (defaults to SMTP_FROM)
 */

import { scrapeAll } from './scrapers.mjs';
import { auditListing } from './audit.mjs';
import { scoreListings } from './scoring.mjs';
import { ensureHeaders, getSeenIds, writeListing, writeTopFive, markSeen } from './sheets.mjs';
import { sendTopFiveEmail } from './email.mjs';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const startedAt = new Date();
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`[scout-pme] Run started at ${startedAt.toISOString()}`);
  console.log('─'.repeat(60));

  // ── Step 1: ensure Google Sheet tabs have headers ──────────────────────────
  console.log('\n[1/6] Initialising Google Sheet headers…');
  await ensureHeaders();

  // ── Step 2: load already-seen IDs ─────────────────────────────────────────
  console.log('[2/6] Loading seen IDs…');
  const seenIds = await getSeenIds();
  console.log(`      ${seenIds.size} listings already processed`);

  // ── Step 3: scrape all platforms ──────────────────────────────────────────
  console.log('[3/6] Scraping platforms…');
  const allListings = await scrapeAll();
  const newListings = allListings.filter(l => l.id && !seenIds.has(l.id));
  console.log(`      ${allListings.length} total scraped, ${newListings.length} new`);

  if (newListings.length === 0) {
    console.log('\n[scout-pme] No new listings. Exiting cleanly.');
    return;
  }

  // ── Step 4: digital audit ─────────────────────────────────────────────────
  console.log(`[4/6] Running digital audit on ${newListings.length} listings…`);
  const audited = [];
  for (const listing of newListings) {
    const audit = await auditListing(listing);
    audited.push({ ...listing, audit });
    process.stdout.write('.');
    await sleep(300);
  }
  console.log(' done');

  // ── Step 5: score with Claude ─────────────────────────────────────────────
  console.log('[5/6] Scoring with Claude Haiku…');
  const scored = await scoreListings(audited);
  scored.sort((a, b) => (b.scoring?.score ?? 0) - (a.scoring?.score ?? 0));

  const top5 = scored.slice(0, 5);
  console.log('\n      Top 5:');
  top5.forEach((l, i) => {
    const s = l.scoring?.score ?? '?';
    console.log(`      ${i + 1}. [${s}] ${l.title?.slice(0, 60) || 'N/A'}`);
  });

  // ── Step 6: persist results ───────────────────────────────────────────────
  console.log('\n[6/6] Persisting to Google Sheets…');
  for (const listing of scored) {
    await writeListing(listing);
    await sleep(100); // avoid Sheets API rate limit
  }
  await writeTopFive(top5);
  await markSeen(newListings.map(l => l.id));

  // ── Send email ─────────────────────────────────────────────────────────────
  await sendTopFiveEmail(top5);

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`[scout-pme] Run complete in ${elapsed}s · ${scored.length} listings processed`);
  console.log('─'.repeat(60));
}

main().catch(err => {
  console.error('\n[scout-pme] FATAL:', err.message);
  console.error(err.stack);
  process.exit(1);
});
