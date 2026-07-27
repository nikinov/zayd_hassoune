<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<section class="statement" use:reveal>
	<p class="eyebrow">Positioning</p>
	<blockquote>
		“The role is not simply to introduce people. It is to understand the objective, identify the
		right counterpart and create the conditions for a meaningful transaction.”
	</blockquote>
</section>

<style>
	.statement {
		padding: 160px 10vw;
		border-bottom: 1px solid var(--line);
	}

	.statement blockquote {
		margin: 0;
		max-width: 1220px;
		font-family: var(--serif);
		font-size: clamp(38px, 5.3vw, 86px);
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	@media (max-width: 680px) {
		.statement {
			padding: 110px 24px;
		}
	}
</style>
