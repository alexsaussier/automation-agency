/**
 * Score listings using Claude Haiku.
 *
 * Returns each listing enriched with a `scoring` object:
 * {
 *   score: 0-100,        overall acquisition attractiveness
 *   sector_score: 0-100, how under-digitalized the sector is
 *   digital_score: 0-100, how under-digitalized THIS company seems
 *   financial_score: 0-100, financial quality estimate
 *   reasoning: string,
 *   target_sector: boolean,
 *   opportunities: string[],
 *   red_flags: string[],
 * }
 */

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Tu es un expert en acquisition de PME françaises peu digitalisées.
L'acquéreur cherche des PME dans des secteurs traditionnels pour les transformer via l'IA et les outils modernes.

Secteurs prioritaires (très peu digitalisés): BTP/artisanat, pressing/blanchisserie, pompes funèbres, transport routier, agriculture, négoce de matériaux, imprimerie, boulangerie/boucherie/épicerie, garage/carrosserie.

Pour chaque annonce, retourne un JSON UNIQUE valide avec ces clés EXACTES:
{
  "score": <0-100>,
  "sector_score": <0-100>,
  "digital_score": <0-100>,
  "financial_score": <0-100>,
  "reasoning": "<2-3 phrases>",
  "target_sector": <true|false>,
  "opportunities": ["<outil/processus à digitaliser>", ...],
  "red_flags": ["<point négatif>", ...]
}

score = attractivité globale pour l'acquéreur (haut = bonne cible).
sector_score = à quel point le secteur résiste à la digitalisation (haut = secteur arriéré).
digital_score = à quel point CETTE entreprise semble non-digitalisée (haut = pas du tout digitalisée).
financial_score = qualité financière (CA stable, rentabilité probable, prix raisonnable).

IMPORTANT: réponds UNIQUEMENT avec le JSON, zéro autre texte.`;

function buildPrompt(listing) {
  const a = listing.audit || {};
  return `Annonce:
Titre: ${listing.title || 'N/A'}
Secteur déclaré: ${listing.sector || 'N/A'}
Localisation: ${listing.location || 'N/A'}
Prix demandé: ${listing.price || 'N/A'}
CA annoncé: ${listing.revenue || 'N/A'}
Description: ${(listing.description || '').slice(0, 500)}
Source: ${listing.source}

Audit digital:
- Site web trouvé: ${a.hasWebsite ? 'Oui' : 'Non'}
- Site accessible: ${a.websiteReachable ? 'Oui' : 'Non'}
- CMS moderne détecté: ${a.hasModernCms ? 'Oui' : 'Non'}
- Stack ancienne détectée: ${a.hasLegacyStack ? 'Oui' : 'Non'}
- Score mobile PageSpeed: ${a.mobileScore !== null && a.mobileScore !== undefined ? a.mobileScore + '/100' : 'N/A'}`;
}

function fallbackScore(listing) {
  const SECTOR_MAP = [
    [/pompe.fun/i, 94],
    [/press|blanch|laverie/i, 90],
    [/btp|batiment|bâtiment|construct|artisan|plomb|electri|menuis|maçon|couvert/i, 87],
    [/imprim/i, 84],
    [/transport|demenag/i, 81],
    [/agric|agro/i, 79],
    [/negoce|négoce|materiau/i, 76],
    [/boulang|boucheri|charcut|epicerie|alimentation/i, 73],
    [/garage|carrosserie/i, 80],
    [/restaurant|restau/i, 62],
    [/coiffure|esthetique/i, 58],
  ];

  const text = `${listing.title || ''} ${listing.sector || ''}`.toLowerCase();
  let sectorScore = 52;
  for (const [re, s] of SECTOR_MAP) {
    if (re.test(text)) { sectorScore = s; break; }
  }

  const digitalScore = listing.audit?.digitalScore ?? 65;
  const overall = Math.round(sectorScore * 0.35 + digitalScore * 0.45 + 50 * 0.20);

  return {
    score: overall,
    sector_score: sectorScore,
    digital_score: digitalScore,
    financial_score: 50,
    reasoning: 'Score calculé par formule de secours (Claude indisponible).',
    target_sector: sectorScore > 65,
    opportunities: [],
    red_flags: ['Analyse Claude non disponible'],
  };
}

async function scoreSingle(listing) {
  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM,
      messages: [{ role: 'user', content: buildPrompt(listing) }],
    });

    const text = message.content[0]?.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error(`No JSON in response: ${text.slice(0, 200)}`);

    const scoring = JSON.parse(jsonMatch[0]);
    return { ...listing, scoring };
  } catch (err) {
    console.error(`[scoring] Failed for "${listing.title}": ${err.message}`);
    return { ...listing, scoring: fallbackScore(listing) };
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export async function scoreListings(listings) {
  const results = [];
  // Batches of 5 to stay within rate limits
  for (let i = 0; i < listings.length; i += 5) {
    const batch = listings.slice(i, i + 5);
    const settled = await Promise.allSettled(batch.map(scoreSingle));
    for (const r of settled) {
      results.push(r.status === 'fulfilled' ? r.value : r.reason);
    }
    if (i + 5 < listings.length) await sleep(1200);
  }
  return results;
}
