/**
 * Send a styled HTML email with the top 5 PME targets.
 * Uses the SMTP config already defined for this project.
 */

import nodemailer from 'nodemailer';

export async function sendTopFiveEmail(listings) {
  if (!process.env.SMTP_HOST) {
    console.log('[email] No SMTP_HOST set — skipping email.');
    return;
  }
  if (!listings.length) {
    console.log('[email] No listings to send.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = process.env.SCOUT_EMAIL_TO || process.env.SMTP_FROM;
  const date = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  try {
    await transporter.sendMail({
      from: `BrightBots PME Scout <${process.env.SMTP_FROM}>`,
      to,
      subject: `🎯 Top ${listings.length} PME à reprendre — ${date}`,
      html: buildHtml(listings, date),
    });
    console.log(`[email] Sent top ${listings.length} to ${to}`);
  } catch (err) {
    console.error('[email] Send error:', err.message);
  }
}

function scoreBar(score) {
  const filled = Math.round((score / 100) * 10);
  return '█'.repeat(filled) + '░'.repeat(10 - filled) + ` ${score}/100`;
}

function buildHtml(listings, date) {
  const cards = listings.map((l, i) => {
    const s = l.scoring || {};
    const score = s.score ?? 0;
    const color = score >= 80 ? '#00a550' : score >= 65 ? '#e68a00' : '#888';

    const opportunities = (s.opportunities || []).length
      ? `<p style="margin:8px 0 0;font-size:13px;color:#00a550;">
           💡 <strong>Opportunités:</strong> ${(s.opportunities || []).join(' · ')}
         </p>`
      : '';

    const redFlags = (s.red_flags || []).length
      ? `<p style="margin:6px 0 0;font-size:12px;color:#c53030;">
           ⚠️ ${(s.red_flags || []).join(' · ')}
         </p>`
      : '';

    const link = l.url
      ? `<a href="${l.url}" style="display:inline-block;margin-top:12px;padding:8px 16px;background:#4d65ff;color:white;text-decoration:none;border-radius:6px;font-size:13px;font-family:Arial,sans-serif;">Voir l'annonce →</a>`
      : '';

    return `
      <div style="background:white;border-radius:10px;padding:22px;margin-bottom:16px;border-left:4px solid ${color};box-shadow:0 1px 8px rgba(0,0,0,0.07);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <span style="font-size:13px;font-weight:700;color:${color};font-family:monospace;letter-spacing:1px;">#${i + 1} · SCORE ${score}/100</span>
            <h2 style="margin:6px 0;font-size:17px;color:#0f1419;font-family:Arial,sans-serif;">${l.title || 'Sans titre'}</h2>
          </div>
        </div>

        <p style="margin:6px 0;font-size:13px;color:#666;font-family:Arial,sans-serif;">
          📍 ${l.location || '—'}
          &nbsp;·&nbsp;
          🏭 ${l.sector || '—'}
          &nbsp;·&nbsp;
          💰 ${l.price || '—'}
          ${l.revenue ? `&nbsp;·&nbsp; 📊 CA: ${l.revenue}` : ''}
        </p>

        <div style="margin:10px 0;display:flex;gap:8px;flex-wrap:wrap;">
          <span style="background:#eef1ff;color:#4d65ff;padding:3px 10px;border-radius:12px;font-size:12px;font-family:Arial,sans-serif;">Secteur: ${s.sector_score ?? '?'}/100</span>
          <span style="background:#e8faf0;color:#00a550;padding:3px 10px;border-radius:12px;font-size:12px;font-family:Arial,sans-serif;">Digital gap: ${s.digital_score ?? '?'}/100</span>
          <span style="background:#fff7e6;color:#e68a00;padding:3px 10px;border-radius:12px;font-size:12px;font-family:Arial,sans-serif;">Financier: ${s.financial_score ?? '?'}/100</span>
        </div>

        ${s.reasoning ? `<p style="margin:8px 0 0;font-size:13px;color:#444;font-style:italic;font-family:Arial,sans-serif;">"${s.reasoning}"</p>` : ''}
        ${opportunities}
        ${redFlags}
        ${link}
      </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,sans-serif;">
  <div style="max-width:620px;margin:24px auto;">

    <!-- Header -->
    <div style="background:#0f1419;border-radius:10px 10px 0 0;padding:28px 28px 22px;">
      <p style="margin:0;color:#4d65ff;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">BrightBots PME Scout</p>
      <h1 style="margin:8px 0 4px;color:white;font-size:24px;">🎯 Top ${listings.length} cibles acquisition</h1>
      <p style="margin:0;color:#8899aa;font-size:13px;">Run automatique du ${date} · Secteurs peu digitalisés</p>
    </div>

    <!-- Cards -->
    <div style="background:#f0f2f5;padding:16px 12px;">
      ${cards}
    </div>

    <!-- Footer -->
    <div style="background:#0f1419;border-radius:0 0 10px 10px;padding:16px 28px;text-align:center;">
      <p style="margin:0;color:#556677;font-size:12px;">
        Automatisé toutes les 72h · BrightBots ·
        <a href="https://brightbots.io" style="color:#4d65ff;">brightbots.io</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}
