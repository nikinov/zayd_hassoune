/**
 * Where the contact form posts. Validates the submission, turns it into one
 * readable mail and hands it to the Brevo client in $lib/server/email.
 *
 * The rest of the site is prerendered; this route is the one serverless
 * function in the deployment, so `prerender` is switched off for it.
 */

import { json, type RequestHandler } from '@sveltejs/kit';
import { contactAddress, enquiryMail, sendMail } from '$lib/server/email';
import { interestOptions, questionnaires, yachtingServices } from '$lib/data/site';

export const prerender = false;

/** Every field the form can send, by input name, with the label it carries. */
const LABELS: Record<string, string> = {
	name: 'Name',
	email: 'Email',
	interest: 'Area of interest',
	yachting_service: 'Yachting service',
	message: 'Message',
	...Object.fromEntries(
		Object.values(questionnaires).flatMap((q) => q.fields.map((f) => [f.name, f.label]))
	)
};

/** A select's stored value ("charter") read back as its label ("Chartering a yacht"). */
function optionLabel(list: Array<{ value: string; label: string }>, value: string): string {
	return list.find((o) => o.value === value)?.label ?? value;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** A form this large is still small; anything past this is not a person typing. */
const MAX_FIELD = 5000;

export const POST: RequestHandler = async ({ request }) => {
	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return json({ error: 'Could not read the form.' }, { status: 400 });
	}

	const value = (key: string) => (form.get(key) ?? '').toString().trim().slice(0, MAX_FIELD);

	// A hidden field no person fills in — a bot that fills everything gets a
	// 200 and no mail, so it has nothing to retry against.
	if (value('company_website')) return json({ ok: true });

	const name = value('name');
	const email = value('email');
	const interest = value('interest');

	if (!name) return json({ error: 'Please give your name.' }, { status: 400 });
	if (!EMAIL.test(email)) return json({ error: 'Please give a valid email address.' }, { status: 400 });
	if (!interest) return json({ error: 'Please choose an area of interest.' }, { status: 400 });

	// Everything the form actually sent, in the order the fields appear in it,
	// so a new questionnaire field needs no change here.
	const rows: Array<[string, string]> = [];
	for (const [key, raw] of form.entries()) {
		if (key === 'company_website' || typeof raw !== 'string') continue;
		const text = raw.trim().slice(0, MAX_FIELD);
		if (!text) continue;
		let shown = text;
		if (key === 'interest') shown = optionLabel(interestOptions, text);
		if (key === 'yachting_service') shown = optionLabel(yachtingServices, text);
		rows.push([LABELS[key] ?? key, shown]);
	}

	try {
		await sendMail(
			enquiryMail({
				to: contactAddress(),
				name,
				email,
				interest: optionLabel(interestOptions, interest),
				rows
			})
		);
	} catch (err) {
		console.error('[contact] send failed', err);
		return json({ error: 'The message could not be sent.' }, { status: 502 });
	}

	return json({ ok: true });
};
