/**
 * Digital audit for a PME listing.
 *
 * Tries to find + probe the company website, then returns a digitalScore
 * where higher = less digitalized = more interesting acquisition target.
 */

const TIMEOUT_MS = 8000;

function extractUrl(text) {
  if (!text) return null;
  const match = text.match(/https?:\/\/[^\s,)>"]+/);
  return match ? match[0] : null;
}

async function probeWebsite(url) {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BrightBots-Audit/1.0)',
      },
    });
    clearTimeout(timeout);

    const poweredBy = res.headers.get('x-powered-by') || '';
    const server = res.headers.get('server') || '';
    const generator = res.headers.get('x-generator') || '';
    const tech = [poweredBy, server, generator].filter(Boolean).join(' ').toLowerCase();

    return {
      status: res.status,
      reachable: res.status < 400,
      // Modern CMS = somewhat digitalized already
      hasModernCms: /wordpress|wix|shopify|squarespace|webflow|prestashop|magento/i.test(tech),
      // Very old stacks = extra points for digitalization gap
      hasLegacyStack: /php\/[45]\.|iis\/[56789]\.|apache\/1\./i.test(tech),
      techHint: tech.slice(0, 80),
    };
  } catch {
    clearTimeout(timeout);
    return { status: null, reachable: false, hasModernCms: false, hasLegacyStack: false, techHint: '' };
  }
}

async function checkPageSpeed(url) {
  // Google PageSpeed Insights free tier — no API key needed for occasional calls
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&fields=lighthouseResult.categories.performance.score,lighthouseResult.audits.speed-index.displayValue`;

  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch(apiUrl, { signal: ctrl.signal });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = await res.json();
    const perfScore = data?.lighthouseResult?.categories?.performance?.score;
    return perfScore !== undefined ? Math.round(perfScore * 100) : null;
  } catch {
    return null;
  }
}

export async function auditListing(listing) {
  const result = {
    hasWebsite: false,
    websiteUrl: null,
    websiteReachable: false,
    hasModernCms: false,
    hasLegacyStack: false,
    techHint: '',
    mobileScore: null,
    digitalScore: 75, // default: assume low digitalization
  };

  // 1. Try to extract website URL from listing data
  const candidateUrl =
    extractUrl(listing.description) ||
    extractUrl(listing.title);

  if (candidateUrl) {
    result.websiteUrl = candidateUrl;
    result.hasWebsite = true;

    const probe = await probeWebsite(candidateUrl);
    result.websiteReachable = probe.reachable;
    result.hasModernCms = probe.hasModernCms;
    result.hasLegacyStack = probe.hasLegacyStack;
    result.techHint = probe.techHint;

    if (probe.reachable) {
      result.mobileScore = await checkPageSpeed(candidateUrl);
    }
  }

  // 2. Compute digitalScore
  // Starts at 75 (assume poorly digitalized)
  // Subtract when we find digital evidence, add when we find gaps
  let score = 75;

  if (result.hasWebsite) {
    score -= 15; // Has a website → somewhat digital
    if (result.websiteReachable) score -= 5;
    if (result.hasModernCms) score -= 10;
    if (result.hasLegacyStack) score += 10; // Old stack = bigger gap
    if (result.mobileScore !== null) {
      if (result.mobileScore < 30) score += 10; // Terrible mobile = big gap
      else if (result.mobileScore > 70) score -= 10; // Good mobile = more digital
    }
  }

  // Clamp 0–100
  result.digitalScore = Math.max(0, Math.min(100, score));

  return result;
}
