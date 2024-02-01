import disableScroll from '../disable-scroll/disable-scroll-func.js';

import enableScroll from '../enable-scroll/enable-scroll-func.js';

function burger() {
	'use strict';

	const nav = document?.querySelector('[data-nav]');

	const navItems = document?.querySelectorAll('[data-nav-item]');

	const burger = document?.querySelector('[data-burger]');

	const overlay = document?.querySelector('[data-nav-overlay]');

	burger?.addEventListener('click', () => {
		burger?.classList.toggle('burger--is-active');

		nav?.classList.toggle('nav--is-active');

		if (nav?.classList.contains('nav--is-active')) {
			burger?.setAttribute('aria-expanded', 'true');

			burger?.setAttribute('aria-label', 'Закрыть меню');

			disableScroll();
		} else {
			burger?.setAttribute('aria-expanded', 'false');

			burger?.setAttribute('aria-label', 'Открыть меню');

			enableScroll();
		}
	});

	navItems?.forEach((el) => {
		el.addEventListener('click', () => {
			enableScroll();

			burger?.setAttribute('aria-expanded', 'false');

			burger?.setAttribute('aria-label', 'Открыть меню');

			burger.classList.remove('burger--is-active');

			menu.classList.remove('nav--is-active');
		});
	});

	overlay?.addEventListener('click', () => {
		burger?.setAttribute('aria-expanded', 'false');

		burger?.setAttribute('aria-label', 'Открыть меню');

		burger.classList.remove('burger--is-active');

		menu.classList.remove('nav--is-active');

		enableScroll();
	});
}

export default burger;
