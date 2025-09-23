import disableScroll from '../disable-scroll/disable-scroll-func.js';

import enableScroll from '../enable-scroll/enable-scroll-func.js';

export function burger() {
	'use strict';

	const burger = document?.querySelector('[data-burger]');

	const nav = document?.querySelector('[data-nav]');
	const navItems = document?.querySelectorAll('[data-nav-item]');

	const overlay = document?.querySelector('[data-nav-overlay]');

	const fixedEls = document?.querySelectorAll('[data-fixed');

	if (burger && nav) {
		burger.addEventListener('click', () => {
			burger.classList.toggle('burger--is-active');

			nav.classList.toggle('nav--is-visible');

			fixedEls.forEach(function (el) {
				el.classList.toggle('not-leap');
			});

			if (burger.getAttribute('aria-expanded') === 'false') {
				burger.setAttribute('aria-expanded', 'true');

				burger.setAttribute('aria-pressed', 'true');

				burger.setAttribute('aria-label', 'Закрыть меню');

				disableScroll();
			} else {
				burger.setAttribute('aria-expanded', 'false');

				burger.setAttribute('aria-pressed', 'false');

				burger.setAttribute('aria-label', 'Открыть меню');

				enableScroll();
			}
		});
	}

	if (navItems) {
		navItems.forEach(el => {
			el.addEventListener('click', () => {
				enableScroll();

				if (burger) {
					burger.setAttribute('aria-expanded', 'false');

					burger.setAttribute('aria-pressed', 'false');

					burger.setAttribute('aria-label', 'Открыть меню');

					burger.classList.remove('burger--is-active');
				}

				if (nav) {
					nav.classList.remove('nav--is-visible');
				}
			});
		});
	}

	if (overlay) {
		overlay.addEventListener('click', () => {
			if (burger) {
				burger.setAttribute('aria-expanded', 'false');

				burger.setAttribute('aria-pressed', 'false');

				burger.setAttribute('aria-label', 'Открыть меню');

				burger.classList.remove('burger--is-active');
			}

			if (nav) {
				nav.classList.remove('nav--is-visible');
			}

			enableScroll();
		});
	}
}
