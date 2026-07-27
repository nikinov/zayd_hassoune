<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { process } from '$lib/data/site';
</script>

<section id="process" class="process">
	<div class="process-heading" use:reveal>
		<p class="eyebrow">Process</p>
		<h2>Five steps, start to delivery.</h2>
	</div>

	<ol class="steps" use:reveal={{ delay: true }}>
		{#each process as step (step.number)}
			<li>
				<span class="step-number">{step.number}</span>
				<h3>{step.title}</h3>
				<p>{step.body}</p>
			</li>
		{/each}
	</ol>
</section>

<style>
	.process {
		padding: 100px 24px;
		border-bottom: 1px solid var(--line);
	}

	.process-heading h2 {
		margin: 0 0 48px;
		font-family: var(--serif);
		font-weight: 500;
		line-height: 1;
		letter-spacing: -0.035em;
		font-size: clamp(34px, 8vw, 46px);
	}

	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
	}

	.steps li {
		background: var(--black);
		padding: 30px 24px 36px;
	}

	.step-number {
		font-size: 10px;
		letter-spacing: 0.15em;
		color: var(--grey);
	}

	.steps h3 {
		font-family: var(--serif);
		font-weight: 500;
		font-size: 26px;
		line-height: 1.15;
		margin: 34px 0 14px;
	}

	.steps p {
		margin: 0;
		font-size: 14px;
		color: var(--grey);
	}

	@media (min-width: 681px) {
		.process {
			padding: 140px 7vw;
		}

		.process-heading h2 {
			margin-bottom: 70px;
			line-height: 0.98;
			font-size: clamp(42px, 5vw, 76px);
		}

		.steps {
			grid-template-columns: repeat(2, 1fr);
		}

		.steps li {
			padding: 36px 30px 44px;
		}
	}

	/* Five across only once each column can still hold a readable measure. */
	@media (min-width: 1181px) {
		.steps {
			grid-template-columns: repeat(5, 1fr);
		}
	}
</style>
