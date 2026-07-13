/**
 * Cloudflare Pages Function – POST /api/contact
 *
 * Sends contact form submissions to info@elexons.com via the
 * Cloudflare Email Service REST API (public beta).
 *
 * Required environment variable (set in Cloudflare Pages dashboard as Secret):
 *   CF_EMAIL_TOKEN  – API token with "Email Sending: Edit" permission
 *
 * Account ID is hardcoded below; change if needed or move to env.CF_ACCOUNT_ID.
 */

const CF_ACCOUNT_ID = '0030d29de84182a509982e4c96a05606';
const CF_EMAIL_URL  = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/email/sending/send`;

const RECIPIENT  = 'info@elexons.com';
const FROM_EMAIL = 'noreply@elexons.ch';
const FROM_NAME  = 'elexons.ch Kontaktformular';
const SITE_URL   = 'https://elexons.ch';

// ─────────────────────────────────────────────────────────────────────────────
// POST handler
// ─────────────────────────────────────────────────────────────────────────────
export async function onRequestPost({ request, env }) {

  /* 1 ── Parse body (JSON or FormData) ── */
  let d = {};
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      d = await request.json();
    } else {
      const fd = await request.formData();
      fd.forEach((v, k) => { d[k] = v; });
    }
  } catch {
    return json({ ok: false, error: 'Ungültige Anfrage.' }, 400);
  }

  /* 2 ── Validate required fields ── */
  const { name, email, phone, location, service, budget, message, contact_method } = d;

  if (!name?.trim() || !email?.trim()) {
    return json({ ok: false, error: 'Name und E-Mail sind Pflichtfelder.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Ungültige E-Mail-Adresse.' }, 400);
  }
  if (!env.CF_EMAIL_TOKEN) {
    console.error('CF_EMAIL_TOKEN is not configured');
    return json({ ok: false, error: 'Serverkonfigurationsfehler.' }, 500);
  }

  /* 3 ── Build email content ── */
  const subject  = `Neue Anfrage von ${name.trim()} – elexons.ch`;
  const htmlBody = buildHtml({ name, email, phone, location, service, budget, message, contact_method });
  const textBody = buildText({ name, email, phone, location, service, budget, message, contact_method });

  /* 4 ── Call Cloudflare Email Service API ── */
  let cfRes;
  try {
    cfRes = await fetch(CF_EMAIL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.CF_EMAIL_TOKEN}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        to:      RECIPIENT,
        from:    { address: FROM_EMAIL, name: FROM_NAME },
        replyTo: { address: email.trim(), name: name.trim() },
        subject,
        html:    htmlBody,
        text:    textBody,
      }),
    });
  } catch (err) {
    console.error('CF Email API fetch error:', err);
    return json({ ok: false, error: 'E-Mail konnte nicht gesendet werden.' }, 502);
  }

  /* 5 ── Handle API response ── */
  let body;
  try { body = await cfRes.json(); } catch { body = {}; }

  if (body.success === true) {
    return json({ ok: true });
  }

  // Log error details for debugging in Cloudflare Workers logs
  const errMsg = body.errors?.[0]?.message || `HTTP ${cfRes.status}`;
  console.error('CF Email API error:', JSON.stringify(body));
  return json(
    { ok: false, error: `E-Mail konnte nicht gesendet werden (${errMsg}). Bitte schreiben Sie direkt an info@elexons.com.` },
    502,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OPTIONS – CORS preflight
// ─────────────────────────────────────────────────────────────────────────────
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin':  SITE_URL,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function row(label, value, top = false) {
  const va = top ? 'top' : 'middle';
  return `
  <tr>
    <td style="padding:10px 16px;background:#f7f7f7;font-weight:600;width:38%;
               vertical-align:${va};border-bottom:1px solid #e8e8e8;font-size:13px;
               color:#444;">${esc(label)}</td>
    <td style="padding:10px 16px;vertical-align:${va};border-bottom:1px solid #e8e8e8;
               font-size:13px;color:#222;">${value}</td>
  </tr>`;
}

function buildHtml({ name, email, phone, location, service, budget, message, contact_method }) {
  const dash = '<span style="color:#bbb;">–</span>';
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>Neue Kontaktanfrage – elexons.ch</title></head>
<body style="margin:0;padding:0;background:#efefef;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:36px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0"
           style="background:#fff;border-radius:6px;overflow:hidden;
                  box-shadow:0 2px 12px rgba(0,0,0,.1);">

      <!-- Header -->
      <tr><td style="background:#1a1a1a;padding:24px 32px;">
        <p style="margin:0 0 6px;color:#B89A5C;font-size:10px;
                  letter-spacing:.28em;text-transform:uppercase;">elexons.ch</p>
        <h1 style="margin:0;color:#fff;font-size:20px;font-weight:400;">
          Neue Kontaktanfrage</h1>
      </td></tr>

      <!-- Fields -->
      <tr><td style="padding:28px 32px 8px;">
        <table width="100%" cellpadding="0" cellspacing="0"
               style="border-top:1px solid #e8e8e8;">
          ${row('Name',
            `<a href="mailto:${esc(email)}" style="color:#B89A5C;text-decoration:none;">${esc(name)}</a>`)}
          ${row('E-Mail', esc(email))}
          ${row('Telefon / WhatsApp', esc(phone) || dash)}
          ${row('Projektstandort',    esc(location) || dash)}
          ${row('Gewünschte Leistung', esc(service) || dash)}
          ${row('Budgetrahmen',        esc(budget) || dash)}
          ${row('Kontaktmethode',      esc(contact_method) || dash)}
          ${row('Nachricht',
            (esc(message) || dash).replace(/\n/g, '<br>'), true)}
        </table>
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:16px 32px 20px;border-top:1px solid #e8e8e8;background:#f9f9f9;">
        <p style="margin:0;font-size:11px;color:#aaa;">
          Automatisch gesendet über
          <a href="${SITE_URL}/kontakt.html" style="color:#B89A5C;">${SITE_URL}</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function buildText({ name, email, phone, location, service, budget, message, contact_method }) {
  const v = (x) => x?.trim() || '–';
  return [
    'Neue Kontaktanfrage – elexons.ch',
    '================================',
    `Name:                  ${v(name)}`,
    `E-Mail:                ${v(email)}`,
    `Telefon / WhatsApp:    ${v(phone)}`,
    `Projektstandort:       ${v(location)}`,
    `Gewünschte Leistung:   ${v(service)}`,
    `Budgetrahmen:          ${v(budget)}`,
    `Kontaktmethode:        ${v(contact_method)}`,
    '',
    'Nachricht:',
    v(message),
    '',
    `-- Gesendet über ${SITE_URL}/kontakt.html`,
  ].join('\n');
}
