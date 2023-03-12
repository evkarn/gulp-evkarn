import { disableScroll } from '../disable-scroll/disable-scroll-func.js';

import { enableScroll } from '../enable-scroll/enable-scroll-func.js';

export function header() {
	'use strict';

	const nav = document?.querySelector('[data-nav]');

	const navLinks = nav?.querySelectorAll('a');

	const burger = document?.querySelector('[data-burger]');

	const navBtnClose = document?.querySelector('[data-nav-close]');

	const headerHeight = document?.querySelector('header').offsetHeight;

	document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);

	window.addEventListener("resize", (event) => {
		const headerHeight = document.querySelector('header').offsetHeight;

		document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
	});

	if (burger) {
		burger.addEventListener('click', () => {
			if (!burger.classList.contains('burger--active')) {
				burger.classList.add('burger--active');

				nav.classList.add('nav--visible');

				disableScroll();
			} else {
				burger.classList.remove('burger--active');

				nav.classList.remove('nav--visible');

				enableScroll();
			}
		});
	}

	if (navBtnClose) {
		navBtnClose.addEventListener('click', () => {
			burger.classList.remove('burger--active');

			nav.classList.remove('nav--visible');

			enableScroll();
		});
	}

	navLinks.forEach(el => {
		el.addEventListener('click', () => {
			burger.classList.remove('burger--active');

			nav.classList.remove('nav--visible');

			enableScroll();
		});
	});
}
