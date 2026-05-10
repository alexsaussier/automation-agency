/**
 * Platform scrapers for French PME cession listings.
 *
 * Each scraper targets a public listing page with cheerio HTML parsing.
 * CSS selectors may need adjustment if a site redesigns — enable DEBUG=1
 * to dump raw HTML for inspection.
 *
 * Platforms:
 *   1. cession-commerce.com
 *   2. fusacq.com
 *   3. place-des-commerces.com
 */

import * as cheerio from 'cheerio';
import crypto from 'crypto';

const DEBUG = process.env.DEBUG === '1';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
};

function makeId(source, url, title) {
  const raw = `${source}:${url || title}`;
  return crypto.createHash('md5').update(raw).digest('hex').slice(0, 12);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchHtml(url) {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, { headers: HEADERS, signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    if (DEBUG) console.log(`[DEBUG] ${url}\n${html.slice(0, 2000)}`);
    return html;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── 1. cession-commerce.com ──────────────────────────────────────────────────

export async function scrapeCessionCommerce() {
  const listings = [];
  const BASE = 'https://www.cession-commerce.com';

  // Sectors with low digitalization — filter by those categories
  const targetCategories = [
    'artisanat-service',
    'batiment-btp',
    'pressing-blanchisserie',
    'transports',
    'alimentation-epicerie',
    'boulangerie-patisserie',
    'boucherie-charcuterie',
    'garage-mecanique',
    'imprimerie-photocopie',
  ];

  for (const cat of targetCategories.slice(0, 5)) {
    try {
      const url = `${BASE}/annonces/${cat}.html?nb=30`;
      const html = await fetchHtml(url);
      const $ = cheerio.load(html);

      // Try multiple selector patterns (sites often vary by page type)
      const items = $('.annonce-item, .annonce, .listing-annonce, article[class*="annonce"], .item-annonce');

      if (items.length === 0 && DEBUG) {
        console.log(`[cession-commerce] No items matched for ${cat}. Check selectors.`);
      }

      items.each((_, el) => {
        const $el = $(el);
        const linkEl = $el.find('a[href]').first();
        const href = linkEl.attr('href') || '';
        const fullUrl = href.startsWith('http') ? href : BASE + href;

        const title =
          $el.find('h2, h3, .titre, .title, [class*="title"]').first().text().trim() ||
          linkEl.text().trim();

        const price =
          $el.find('.prix, .price, [class*="prix"], [class*="price"]').first().text().trim();

        const revenue =
          $el.find('.ca, .chiffre-affaires, [class*="ca-"], [class*="chiffre"]').first().text().trim();

        const location =
          $el.find('.localisation, .ville, .lieu, [class*="local"], [class*="ville"]').first().text().trim();

        const description =
          $el.find('.description, .texte, p').first().text().trim();

        if (!title) return;

        listings.push({
          id: makeId('cession-commerce', fullUrl, title),
          title,
          sector: cat.replace(/-/g, ' '),
          location,
          price,
          revenue,
          description,
          url: fullUrl,
          source: 'cession-commerce.com',
          scrapedAt: new Date().toISOString(),
        });
      });

      await sleep(800);
    } catch (err) {
      console.error(`[cession-commerce] Error on ${cat}:`, err.message);
    }
  }

  console.log(`[cession-commerce] ${listings.length} listings found`);
  return listings;
}

// ─── 2. fusacq.com ────────────────────────────────────────────────────────────

export async function scrapeFusacq() {
  const listings = [];
  const BASE = 'https://www.fusacq.com';

  try {
    // Fusacq "buzz" = recent M&A news/listings
    const html = await fetchHtml(`${BASE}/buzz/w/all/france`);
    const $ = cheerio.load(html);

    // Fusacq typically renders cards with class buzz-item or similar
    $('.buzz-item, .affaire, .annonce-card, article, .item').each((_, el) => {
      const $el = $(el);
      const linkEl = $el.find('a[href]').first();
      const href = linkEl.attr('href') || '';
      if (!href) return;

      const fullUrl = href.startsWith('http') ? href : BASE + href;

      const title =
        $el.find('h2, h3, h4, .titre, .title, [class*="titre"]').first().text().trim() ||
        linkEl.text().trim();

      const sector =
        $el.find('.secteur, .activite, .categorie, [class*="secteur"]').first().text().trim();

      const location =
        $el.find('.region, .localisation, .lieu, [class*="region"]').first().text().trim();

      const price =
        $el.find('.prix, .valorisation, [class*="prix"]').first().text().trim();

      const revenue =
        $el.find('.ca, .chiffre-affaires, [class*="ca"]').first().text().trim();

      const description =
        $el.find('p, .description, .resume').first().text().trim();

      if (!title || title.length < 5) return;

      listings.push({
        id: makeId('fusacq', fullUrl, title),
        title,
        sector,
        location,
        price,
        revenue,
        description,
        url: fullUrl,
        source: 'fusacq.com',
        scrapedAt: new Date().toISOString(),
      });
    });
  } catch (err) {
    console.error('[fusacq] Error:', err.message);
  }

  console.log(`[fusacq] ${listings.length} listings found`);
  return listings;
}

// ─── 3. place-des-commerces.com ───────────────────────────────────────────────

export async function scalePlaceDesCommerces() {
  const listings = [];
  const BASE = 'https://www.place-des-commerces.com';

  const sectors = [
    'artisanat',
    'batiment',
    'pressing',
    'transport',
    'alimentation',
  ];

  for (const sector of sectors.slice(0, 3)) {
    try {
      const url = `${BASE}/vente-fonds-de-commerce/${sector}`;
      const html = await fetchHtml(url);
      const $ = cheerio.load(html);

      $('.annonce, .commerce-item, .listing-item, article, [class*="annonce"]').each((_, el) => {
        const $el = $(el);
        const linkEl = $el.find('a[href]').first();
        const href = linkEl.attr('href') || '';
        if (!href) return;

        const fullUrl = href.startsWith('http') ? href : BASE + href;

        const title =
          $el.find('h2, h3, .titre, [class*="title"]').first().text().trim() ||
          linkEl.text().trim();

        const price =
          $el.find('.prix, [class*="prix"], [class*="price"]').first().text().trim();

        const location =
          $el.find('.ville, .localisation, [class*="local"]').first().text().trim();

        const revenue =
          $el.find('.ca, [class*="ca-"]').first().text().trim();

        if (!title || title.length < 5) return;

        listings.push({
          id: makeId('place-des-commerces', fullUrl, title),
          title,
          sector,
          location,
          price,
          revenue,
          description: '',
          url: fullUrl,
          source: 'place-des-commerces.com',
          scrapedAt: new Date().toISOString(),
        });
      });

      await sleep(800);
    } catch (err) {
      console.error(`[place-des-commerces] Error on ${sector}:`, err.message);
    }
  }

  console.log(`[place-des-commerces] ${listings.length} listings found`);
  return listings;
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────

export async function scrapeAll() {
  const [a, b, c] = await Promise.allSettled([
    scrapeCessionCommerce(),
    scrapeFusacq(),
    scalePlaceDesCommerces(),
  ]);

  const results = [
    ...(a.status === 'fulfilled' ? a.value : []),
    ...(b.status === 'fulfilled' ? b.value : []),
    ...(c.status === 'fulfilled' ? c.value : []),
  ];

  // Deduplicate by id within this run
  const seen = new Set();
  return results.filter(l => {
    if (seen.has(l.id)) return false;
    seen.add(l.id);
    return true;
  });
}
