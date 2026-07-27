<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Questionnaire from './Questionnaire.svelte';
	import { interestOptions, questionnaires, yachtingServices } from '$lib/data/site';

	let interest = $state('');
	let yachtingService = $state('');
	let status = $state('');
	let sending = $state(false);

	const isYachting = $derived(interest === 'yachting');
	const activeQuestionnaire = $derived(isYachting ? questionnaires[yachtingService] : undefined);

	function onInterestChange() {
		if (!isYachting) yachtingService = '';
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const endpoint = env.PUBLIC_FORM_ENDPOINT;

		if (!endpoint) {
			status =
				'Thank you. Your enquiry has been prepared. The form still needs to be connected to a mail service or CRM (set PUBLIC_FORM_ENDPOINT).';
			return;
		}

		sending = true;
		status = '';

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new FormData(form)
			});

			if (!response.ok) throw new Error(String(response.status));

			form.reset();
			interest = '';
			yachtingService = '';
			status = 'Thank you. Your enquiry has been sent — you will receive a reply shortly.';
		} catch {
			status = `Something went wrong. Please email contact@zaydhassoune.com directly.`;
		} finally {
			sending = false;
		}
	}
</script>

<form class="contact-form" onsubmit={handleSubmit}>
	<div class="field">
		<label for="name">Name</label>
		<input id="name" name="name" type="text" required />
	</div>

	<div class="field">
		<label for="email">Email</label>
		<input id="email" name="email" type="email" required />
	</div>

	<div class="field field-full">
		<label for="interest">Area of interest</label>
		<select id="interest" name="interest" bind:value={interest} onchange={onInterestChange} required>
			<option value="">Select an option</option>
			{#each interestOptions as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>

	{#if isYachting}
		<div class="field field-full conditional-field">
			<label for="yachting-service">Yachting service</label>
			<select
				id="yachting-service"
				name="yachting_service"
				bind:value={yachtingService}
				required
			>
				<option value="">Select a service</option>
				{#each yachtingServices as service (service.value)}
					<option value={service.value}>{service.label}</option>
				{/each}
			</select>
		</div>
	{/if}

	{#if activeQuestionnaire}
		<Questionnaire questionnaire={activeQuestionnaire} />
	{:else if !isYachting}
		<div class="field field-full">
			<label for="message">Message</label>
			<textarea id="message" name="message" rows="4" required></textarea>
		</div>
	{/if}

	<button class="button button-dark" type="submit" disabled={sending}>
		{sending ? 'Sending…' : 'Send enquiry'}
	</button>
	<p class="form-status" aria-live="polite">{status}</p>
</form>

<style>
	.contact-form {
		display: grid;
		gap: 28px;
		max-width: 1000px;
	}

	.contact-form .button {
		justify-self: stretch;
		margin-top: 14px;
	}

	.contact-form .button:disabled {
		opacity: 0.5;
		cursor: default;
	}

	.conditional-field {
		animation: fade-field 0.35s ease;
	}

	.form-status {
		align-self: center;
		margin: 14px 0 0;
		font-size: 13px;
	}

	@keyframes fade-field {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (min-width: 681px) {
		.contact-form {
			grid-template-columns: 1fr 1fr;
			gap: 32px;
		}

		.contact-form .button {
			justify-self: start;
		}
	}
</style>
