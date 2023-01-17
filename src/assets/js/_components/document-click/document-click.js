import { enableScroll } from '../enable-scroll/enable-scroll.js';

export function documentClick() {
	'use strict';

	document.addEventListener('click', function (event) {
		const target = event.target;

		const ifBurger = target.closest('.header__burger');

		const ifNav = target.closest('.header__nav');

		if (!ifBurger && !ifNav) {
			burger.classList.remove('burger--active');

			nav.classList.remove('nav--visible');

			headerOverlay.classList.remove('header__overlay--visible');

			enableScroll();
		}
	});
}