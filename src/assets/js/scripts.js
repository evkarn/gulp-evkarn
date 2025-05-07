document.addEventListener('DOMContentLoaded', () => {
	(function getScrollWidth() {
		'use strict';

		const body = document.body;

		const documentRoot = document.documentElement;

		const scrollWidth = window.innerWidth - body.offsetWidth;

		documentRoot.style.setProperty('--scroll-width', `${scrollWidth}px`);
	})();

	function disableScroll() {
		const html = document.documentElement;

		const body = document.body;

		const documentRoot = document.querySelector(':root');

		let pagePosition = window.scrollY;

		body.classList.add('stop-scroll');

		body.dataset.position = pagePosition;

		documentRoot.style.setProperty('--top-position', `-${pagePosition}px`);

		html.style.scrollBehavior = 'unset';
	}

	function enableScroll() {
		const html = document.documentElement;

		const body = document.body;

		const documentRoot = document.querySelector(':root');

		let pagePosition = parseInt(body.dataset.position, 10);

		body.classList.remove('stop-scroll');

		window.scroll({
			top: pagePosition,

			left: 0,
		});

		body.removeAttribute('data-position');

		documentRoot.style.setProperty('--top-position', 'auto');

		html.style.scrollBehavior = '';
	}

	(function burger() {
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
			navItems.forEach((el) => {
				el.addEventListener('click', () => {
					enableScroll();

					if (burger) {
						burger.setAttribute('aria-expanded', 'false');

						burger.setAttribute('aria-pressed', 'false');

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

					burger.setAttribute('aria-pressed', 'false');

					burger.setAttribute('aria-label', 'Открыть меню');

					burger.classList.remove('burger--is-active');
				}

				if (nav) {
					nav.classList.remove('nav--is-active');
				}

				enableScroll();
			});
		}
	})();
});
