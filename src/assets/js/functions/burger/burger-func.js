import disableScroll from '../disable-scroll/disable-scroll-func.js';

import enableScroll from '../enable-scroll/enable-scroll-func.js';

function burger() {
	'use strict';

	const burger = document?.querySelector('[data-burger]');

	const nav = document?.querySelector('[data-nav]');
	const navItems = document?.querySelectorAll('[data-nav-item]');

	const overlay = document?.querySelector('[data-nav-overlay]');

	if (burger && nav) {
		burger.addEventListener('click', () => {
			burger.classList.toggle('burger--is-active');

			nav.classList.toggle('nav--is-visible');

			if (burger.getAttribute('aria-expanded') === 'false') {
				burger.setAttribute('aria-expanded', 'true');

				burger.setAttribute('aria-label', 'Закрыть меню');

				disableScroll();
			} else {
				burger.setAttribute('aria-expanded', 'false');

				burger.setAttribute('aria-label', 'Открыть меню');

				enableScroll();
			}
		});
	}

	if (navItems) {
		navItems.forEach((el) => {
			el.addEventListener('click', () => {
				enableScroll();

				if (burger) {
					burger.setAttribute('aria-expanded', 'false');

					burger.setAttribute('aria-label', 'Открыть меню');

					burger.classList.remove('burger--is-active');
				}

				if (nav) {
					nav.classList.remove('nav--is-active');
				}
			});
		});
	}

	if (overlay) {
		overlay.addEventListener('click', () => {
			if (burger) {
				burger.setAttribute('aria-expanded', 'false');

				burger.setAttribute('aria-label', 'Открыть меню');

				burger.classList.remove('burger--is-active');
			}

			if (nav) {
				nav.classList.remove('nav--is-active');
			}

			enableScroll();
		});
	}
}

export default burger;
