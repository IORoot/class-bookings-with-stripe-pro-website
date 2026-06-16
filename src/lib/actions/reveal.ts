import type { Action } from 'svelte/action';
import gsap from 'gsap';
import { prefersReducedMotion } from '$lib/utils';

type RevealOptions = {
	y?: number;
	duration?: number;
	delay?: number;
};

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, opts = {}) => {
	if (prefersReducedMotion()) return {};

	const { y = 20, duration = 0.55, delay = 0 } = opts;

	const animate = () => {
		gsap.fromTo(
			node,
			{ opacity: 0, y },
			{ opacity: 1, y: 0, duration, delay, ease: 'power2.out', clearProps: 'opacity,transform' }
		);
	};

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries.some((e) => e.isIntersecting)) {
				animate();
				observer.disconnect();
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
			gsap.killTweensOf(node);
		}
	};
};

export const revealHero: Action<HTMLElement> = (node) => {
	if (prefersReducedMotion()) return {};

	const children = node.querySelectorAll('[data-hero-item]');
	gsap.fromTo(
		children,
		{ opacity: 0, y: 24 },
		{
			opacity: 1,
			y: 0,
			duration: 0.65,
			stagger: 0.08,
			ease: 'power3.out',
			clearProps: 'opacity,transform'
		}
	);

	return {
		destroy() {
			gsap.killTweensOf(children);
		}
	};
};
