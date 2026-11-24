/**
 * Outbound mail through Brevo's transactional API — the same client the boat
 * management app uses, with this site's sender and templates.
 *
 * One function sends; the template below is the only mail the site writes.
 * Without an API key (local development, a preview deploy) nothing is sent and
 * the message is printed to the server log instead, so a contact submission
 * can still be walked through end to end without a live key.
 *
 * Configuration (environment, or .env.local):
 *   BREVO_SMTP_LOGIN  SMTP login (Brevo > SMTP & API > SMTP), e.g. 1234@smtp-brevo.com
 *   BREVO_SMTP_KEY    SMTP key ("xsmtpsib-…"); with the login, mail goes via SMTP
 *   BREVO_API_KEY     or a v3 API key ("xkeysib-…") to send through the REST API
 *   EMAIL_FROM      "Zayd Hassoune <no-reply@boat.nicholasnovelle.com>" by
 *                   default — the domain must be authenticated in Brevo, and
 *                   boat.nicholasnovelle.com is the one that already is
 *   CONTACT_TO      where enquiries land; defaults to contact@zaydhassoune.com
 */

import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import { site } from '$lib/data/site';

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
// The Brevo account's authenticated sending domain is boat.nicholasnovelle.com,
// so that is the envelope sender; the reply-to on each mail is the enquirer.
const DEFAULT_FROM = `${site.name} <no-reply@boat.nicholasnovelle.com>`;

export type Mail = { to: string; subject: string; text: string; html: string; replyTo?: string };

const SMTP_HOST = 'smtp-relay.brevo.com';
const SMTP_PORT = 587;

type Transport =
	| { kind: 'smtp'; login: string; key: string }
	| { kind: 'api'; key: string }
	| null;

/**
 * How mail leaves: Brevo's SMTP relay when an SMTP login and key are set
 * (keys starting "xsmtpsib-"), otherwise the REST API when an API key is set
 * ("xkeysib-"). The two kinds of key are not interchangeable. Null when
 * neither is configured.
 */
function transport(): Transport {
	// A checkout may carry a real key, so a test that finishes a mail run would
	// post to Brevo for real. EMAIL_DISABLED is how a test or preview
	// environment says "log it, do not send it".
	if (env.EMAIL_DISABLED === '1') return null;
	const login = env.BREVO_SMTP_LOGIN?.trim();
	const smtpKey = env.BREVO_SMTP_KEY?.trim();
	if (login && smtpKey) return { kind: 'smtp', login, key: smtpKey };
	const apiKey = env.BREVO_API_KEY?.trim();
	if (apiKey) return { kind: 'api', key: apiKey };
	return null;
}

/** True when mail will actually leave the box (a key is configured). */
export function emailConfigured(): boolean {
	return transport() !== null;
}

/** Where enquiries are delivered. */
export function contactAddress(): string {
	return env.CONTACT_TO?.trim() || site.email;
}

function sender(): { name: string; email: string } {
	const raw = env.EMAIL_FROM?.trim() || DEFAULT_FROM;
	const m = raw.match(/^\s*(?:"?([^"<]*?)"?\s*)?<([^>]+)>\s*$/);
	return m
		? { name: (m[1] || site.name).trim(), email: m[2].trim() }
		: { name: site.name, email: raw.trim() };
}

/**
 * Sends one message. Throws on a Brevo error so the caller can decide whether
 * the request that triggered it should fail.
 */
export async function sendMail(mail: Mail): Promise<void> {
	const t = transport();
	if (!t) {
		console.log(
			`[email] not configured — would send to ${mail.to}: ${mail.subject}\n${mail.text}`
		);
		return;
	}
	if (t.kind === 'smtp') {
		const from = sender();
		const smtp = nodemailer.createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			secure: false, // STARTTLS on 587
			requireTLS: true,
			auth: { user: t.login, pass: t.key }
		});
		await smtp.sendMail({
			from: { name: from.name, address: from.email },
			to: mail.to,
			...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
			subject: mail.subject,
			text: mail.text,
			html: mail.html
		});
		return;
	}
	const res = await fetch(BREVO_ENDPOINT, {
		method: 'POST',
		headers: { 'api-key': t.key, 'content-type': 'application/json', accept: 'application/json' },
		body: JSON.stringify({
			sender: sender(),
			to: [{ email: mail.to }],
			...(mail.replyTo ? { replyTo: { email: mail.replyTo } } : {}),
			subject: mail.subject,
			textContent: mail.text,
			htmlContent: mail.html
		})
	});
	if (!res.ok) {
		const body = await res.text().catch(() => '');
		throw new Error(`Brevo ${res.status}: ${body.slice(0, 300)}`);
	}
}

/* ------------------------------------------------------------------ */
/* Templates                                                           */
/* ------------------------------------------------------------------ */

function escapeHtml(s: string): string {
	return s.replace(
		/[&<>"']/g,
		(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
	);
}

/** The one layout every mail shares: a black header and a table of answers. */
function layout(opts: { title: string; intro: string; rows: Array<[string, string]> }): {
	text: string;
	html: string;
} {
	const text = [
		opts.title,
		'',
		opts.intro,
		'',
		...opts.rows.map(([label, value]) => `${label}: ${value}`)
	].join('\n');

	const cells = opts.rows
		.map(
			([label, value]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #ececea;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8a84;width:40%;vertical-align:top">${escapeHtml(label)}</td>
            <td style="padding:10px 0;border-bottom:1px solid #ececea;font-size:15px;line-height:1.5;color:#111111;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`
		)
		.join('');

	const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f5f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#111111">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f2;padding:32px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:2px;overflow:hidden">
        <tr><td style="background:#050505;color:#f5f5f2;padding:22px 28px;font-size:15px;letter-spacing:0.22em;text-transform:uppercase">${escapeHtml(site.name)}</td></tr>
        <tr><td style="padding:28px">
          <h1 style="margin:0 0 12px;font-size:21px;font-weight:500;color:#111111">${escapeHtml(opts.title)}</h1>
          <p style="margin:0 0 22px;font-size:15px;line-height:1.55;color:#55554f">${escapeHtml(opts.intro)}</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${cells}
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
	return { text, html };
}

/** The enquiry as it reaches the inbox: every answered field, in form order. */
export function enquiryMail(opts: {
	to: string;
	name: string;
	email: string;
	interest: string;
	rows: Array<[string, string]>;
}): Mail {
	return {
		to: opts.to,
		replyTo: opts.email,
		subject: `${opts.interest} — ${opts.name}`,
		...layout({
			title: 'New enquiry',
			intro: `${opts.name} (${opts.email}) submitted the contact form. Reply to this mail to answer them directly.`,
			rows: opts.rows
		})
	};
}

/**
 * The acknowledgement sent back to the person who filled in the form, with a
 * copy of their answers. Replies go to the contact inbox.
 */
export function confirmationMail(opts: {
	to: string;
	name: string;
	replyTo: string;
	rows: Array<[string, string]>;
}): Mail {
	return {
		to: opts.to,
		replyTo: opts.replyTo,
		subject: `We received your enquiry — ${site.name}`,
		...layout({
			title: 'Thank you for your enquiry',
			intro: `Dear ${opts.name}, thank you for getting in touch. We have received your message and will reply shortly. A copy of what you sent is below.`,
			rows: opts.rows
		})
	};
}
