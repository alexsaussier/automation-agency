/**
 * Google Sheets integration.
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_JSON  — raw JSON of service account key
 *   GOOGLE_SHEET_ID              — ID from sheet URL (/spreadsheets/d/<ID>/...)
 *
 * Expected sheet tabs (created by setup-sheets.mjs or manually):
 *   "Annonces"  — all scored listings (headers in row 1)
 *   "Seen"      — column A = processed IDs (dedup across runs)
 *   "Top5"      — latest top 5 (overwritten each run)
 */

import { google } from 'googleapis';

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON not set');
  const key = JSON.parse(raw);
  return new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: SCOPES,
  });
}

function sheets() {
  return google.sheets({ version: 'v4', auth: getAuth() });
}

// ── Headers ───────────────────────────────────────────────────────────────────

const ANNONCES_HEADERS = [
  'ID', 'Date', 'Source', 'Titre', 'Secteur', 'Localisation',
  'CA', 'Prix', 'URL', 'Score', 'Score Secteur', 'Score Digital',
  'Score Financier', 'Analyse', 'Opportunités', 'Red Flags', 'Statut',
];

const TOP5_HEADERS = [
  'Rang', 'Titre', 'Secteur', 'Localisation', 'CA', 'Prix', 'Score',
  'Score Secteur', 'Score Digital', 'Analyse', 'Opportunités', 'Red Flags', 'URL',
];

// ── Init (ensure headers exist) ───────────────────────────────────────────────

export async function ensureHeaders() {
  const api = sheets();
  try {
    await Promise.all([
      ensureSheetHeaders(api, 'Annonces!A1:Q1', [ANNONCES_HEADERS]),
      ensureSheetHeaders(api, 'Top5!A1:M1', [TOP5_HEADERS]),
      ensureSheetHeaders(api, 'Seen!A1:A1', [['ID']]),
    ]);
  } catch (err) {
    console.error('[sheets] ensureHeaders error:', err.message);
  }
}

async function ensureSheetHeaders(api, range, headers) {
  const res = await api.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range });
  if (!res.data.values || res.data.values.length === 0) {
    await api.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: headers },
    });
  }
}

// ── Seen IDs ──────────────────────────────────────────────────────────────────

export async function getSeenIds() {
  try {
    const api = sheets();
    const res = await api.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Seen!A:A',
    });
    const values = (res.data.values || []).flat().filter(v => v && v !== 'ID');
    return new Set(values);
  } catch (err) {
    console.error('[sheets] getSeenIds error:', err.message);
    return new Set();
  }
}

export async function markSeen(ids) {
  if (!ids.length) return;
  try {
    const api = sheets();
    await api.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Seen!A:A',
      valueInputOption: 'RAW',
      requestBody: { values: ids.map(id => [id]) },
    });
  } catch (err) {
    console.error('[sheets] markSeen error:', err.message);
  }
}

// ── Write listing ─────────────────────────────────────────────────────────────

export async function writeListing(listing) {
  try {
    const s = listing.scoring || {};
    const row = [
      listing.id || '',
      new Date().toLocaleDateString('fr-FR'),
      listing.source || '',
      listing.title || '',
      listing.sector || '',
      listing.location || '',
      listing.revenue || '',
      listing.price || '',
      listing.url || '',
      s.score ?? '',
      s.sector_score ?? '',
      s.digital_score ?? '',
      s.financial_score ?? '',
      s.reasoning || '',
      (s.opportunities || []).join(', '),
      (s.red_flags || []).join(', '),
      'Nouveau',
    ];

    const api = sheets();
    await api.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Annonces!A:Q',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });
  } catch (err) {
    console.error(`[sheets] writeListing error for "${listing.title}":`, err.message);
  }
}

// ── Write top 5 ───────────────────────────────────────────────────────────────

export async function writeTopFive(listings) {
  try {
    const api = sheets();

    // Clear previous top 5 data rows (keep header)
    await api.spreadsheets.values.clear({
      spreadsheetId: SHEET_ID,
      range: 'Top5!A2:M10',
    });

    if (!listings.length) return;

    const rows = listings.map((l, i) => {
      const s = l.scoring || {};
      return [
        i + 1,
        l.title || '',
        l.sector || '',
        l.location || '',
        l.revenue || '',
        l.price || '',
        s.score ?? '',
        s.sector_score ?? '',
        s.digital_score ?? '',
        s.reasoning || '',
        (s.opportunities || []).join(', '),
        (s.red_flags || []).join(', '),
        l.url || '',
      ];
    });

    await api.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `Top5!A2:M${rows.length + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: rows },
    });

    console.log(`[sheets] Top ${listings.length} written`);
  } catch (err) {
    console.error('[sheets] writeTopFive error:', err.message);
  }
}
