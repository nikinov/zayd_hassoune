import type { Action } from 'svelte/action';

/**
 * Fades an element in the first time it scrolls into view.
 * Replaces the global IntersectionObserver loop of the static prototype.
 */
export const reveal: Action<HTMLElement, { delay?: boolean } | undefined> = (node, params) => {
	node.classList.add('reveal');
	if (params?.delay) node.classList.add('delay-1');

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('visible');
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.14 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
