<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ContactForm from './ContactForm.svelte';
	import { site } from '$lib/data/site';
</script>

<section id="contact" class="contact" use:reveal>
	<div>
		<p class="eyebrow">Contact</p>
		<h2>Let’s discuss your project.</h2>
	</div>

	<div class="contact-grid">
		<a href="mailto:{site.email}">
			<span>Email</span>
			{site.email}
		</a>
		<a href="tel:{site.phoneHref}">
			<span>Phone</span>
			{site.phone}
		</a>
		<div>
			<span>Location</span>
			{site.location}
		</div>
	</div>

	<ContactForm />
</section>

<style>
	.contact {
		background: var(--white);
		color: var(--black);
		padding: 120px 7vw;
		border-top: 1px solid var(--dark-line);
	}

	.contact h2 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 500;
		line-height: 0.98;
		letter-spacing: -0.035em;
		font-size: clamp(48px, 6vw, 86px);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin: 70px 0;
		border-top: 1px solid var(--dark-line);
		border-bottom: 1px solid var(--dark-line);
	}

	.contact-grid > :global(*) {
		padding: 30px 20px 30px 0;
		font-size: 18px;
	}

	.contact-grid > :global(*:not(:last-child)) {
		border-right: 1px solid var(--dark-line);
	}

	.contact-grid > :global(*:not(:first-child)) {
		padding-left: 30px;
	}

	.contact-grid span {
		display: block;
		text-transform: uppercase;
		font-size: 10px;
		letter-spacing: 0.14em;
		opacity: 0.5;
		margin-bottom: 8px;
	}

	@media (max-width: 680px) {
		.contact {
			padding: 100px 24px;
		}

		.contact-grid {
			grid-template-columns: 1fr;
		}

		.contact-grid > :global(*) {
			border-right: 0;
			border-bottom: 1px solid var(--dark-line);
			padding: 22px 0;
		}

		.contact-grid > :global(*:last-child) {
			border-bottom: 0;
		}
	}
</style>
