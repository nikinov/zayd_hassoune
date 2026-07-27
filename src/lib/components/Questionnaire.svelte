<script lang="ts">
	import type { Questionnaire } from '$lib/data/site';

	let { questionnaire }: { questionnaire: Questionnaire } = $props();
</script>

<div class="dynamic-questionnaire">
	<div class="questionnaire-heading">
		<span>{questionnaire.eyebrow}</span>
		<h3>{questionnaire.title}</h3>
	</div>

	{#each questionnaire.fields as field (field.name)}
		<div class="field" class:field-full={field.full}>
			<label for={field.name}>{field.label}</label>

			{#if field.type === 'textarea'}
				<textarea
					id={field.name}
					name={field.name}
					rows="4"
					placeholder={field.placeholder}
					required={!field.optional}
				></textarea>
			{:else if field.type === 'select'}
				<select id={field.name} name={field.name} required={!field.optional}>
					<option value="">Select an option</option>
					{#each field.options ?? [] as option (option)}
						<option>{option}</option>
					{/each}
				</select>
			{:else}
				<input
					id={field.name}
					name={field.name}
					type={field.type}
					min={field.min}
					max={field.max}
					placeholder={field.placeholder}
					required={!field.optional}
				/>
			{/if}
		</div>
	{/each}
</div>

<style>
	.dynamic-questionnaire {
		grid-column: 1 / -1;
		display: grid;
		gap: 28px;
		padding: 36px 0 10px;
		margin-top: 8px;
		border-top: 1px solid var(--dark-line);
		animation: fade-field 0.4s ease;
	}

	.questionnaire-heading {
		grid-column: auto;
		margin-bottom: 10px;
	}

	.questionnaire-heading span {
		display: block;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		font-size: 10px;
		opacity: 0.5;
		margin-bottom: 10px;
	}

	.questionnaire-heading h3 {
		margin: 0;
		font-family: var(--serif);
		font-size: clamp(26px, 6.5vw, 32px);
		line-height: 1.05;
		font-weight: 500;
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
		.dynamic-questionnaire {
			grid-template-columns: 1fr 1fr;
			gap: 32px;
			padding-top: 42px;
		}

		.questionnaire-heading {
			grid-column: 1 / -1;
		}

		.questionnaire-heading h3 {
			font-size: clamp(32px, 4vw, 54px);
		}
	}
</style>
