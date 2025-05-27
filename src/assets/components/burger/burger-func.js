import disableScroll from '../disable-scroll/disable-scroll-func.js';

import enableScroll from '../enable-scroll/enable-scroll-func.js';

function burger() {
	'use strict';

	const burger = document?.querySelector('[data-burger]');

	const nav = document?.querySelector('[data-nav]');
	const navItems = document?.querySelectorAll('[data-nav-item]');

	const fixedEls = document?.querySelectorAll('[data-fixed');

	const burgerSetAttributes = (expanded, pressed, label) => {
		burger.setAttribute('aria-expanded', expanded);

		burger.setAttribute('aria-pressed', pressed);

		burger.setAttribute('aria-label', label);
	};

	const toggleClasses = () => {
		burger.classList.toggle('burger--is-active');

		header.classList.toggle('header--open-nav');

		nav.classList.toggle('nav--is-visible');

		fixedEls.forEach(function (el) {
			el.classList.toggle('not-leap');
		});

		if (burger && burger.getAttribute('aria-expanded') === 'false') {
			burgerSetAttributes('true', 'true', 'Закрыть меню');

			disableScroll();
		} else {
			burgerSetAttributes('false', 'false', 'Открыть меню');

			enableScroll();
		}
	};

	if (burger && nav) {
		burger.addEventListener('click', toggleClasses);
	}

	if (navItems) {
		navItems.forEach(el => {
			el.addEventListener('click', () => {
				if (burger) {
					burgerSetAttributes('false', 'false', 'Открыть меню');

					burger.classList.remove('burger--is-active');
				}

				if (nav) {
					nav.classList.remove('nav--is-active');
				}

				enableScroll();
			});
		});
	}

	if (overlay) {
		overlay.addEventListener('click', () => {
			if (burger) {
				burgerSetAttributes('false', 'false', 'Открыть меню');

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
