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
		padding: 100px 24px;
		border-top: 1px solid var(--dark-line);
	}

	.contact h2 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 500;
		line-height: 1;
		letter-spacing: -0.035em;
		font-size: clamp(36px, 8vw, 48px);
	}

	.contact-grid {
		display: grid;
		margin: 50px 0;
		border-top: 1px solid var(--dark-line);
		border-bottom: 1px solid var(--dark-line);
	}

	.contact-grid > :global(*) {
		padding: 22px 0;
		font-size: 17px;
		/* Long addresses must not force the page to scroll sideways. */
		overflow-wrap: anywhere;
	}

	.contact-grid > :global(*:not(:last-child)) {
		border-bottom: 1px solid var(--dark-line);
	}

	.contact-grid span {
		display: block;
		text-transform: uppercase;
		font-size: 10px;
		letter-spacing: 0.14em;
		opacity: 0.5;
		margin-bottom: 8px;
	}

	@media (min-width: 681px) {
		.contact {
			padding: 120px 7vw;
		}

		.contact h2 {
			line-height: 0.98;
			font-size: clamp(48px, 6vw, 86px);
		}

		.contact-grid {
			margin: 70px 0;
		}

		.contact-grid > :global(*) {
			padding: 26px 0;
			font-size: 18px;
		}
	}

	/* Three across only once the columns are wide enough for an email address to
	   sit on one line. */
	@media (min-width: 981px) {
		.contact-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.contact-grid > :global(*) {
			padding: 30px 20px 30px 0;
		}

		.contact-grid > :global(*:not(:last-child)) {
			border-bottom: 0;
			border-right: 1px solid var(--dark-line);
		}

		.contact-grid > :global(*:not(:first-child)) {
			padding-left: 30px;
		}
	}
</style>
