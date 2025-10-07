import vars from '@/assets/components/vars.js';

document.addEventListener('DOMContentLoaded', () => {
	(function getScrollbarWidth() {
		'use strict';

		const scrollbarWidth = window.innerWidth - vars.bodyEl.offsetWidth;

		vars.htmlEl.style.setProperty('--scroll-width', `${scrollbarWidth}px`);

		return scrollbarWidth;
	})();

	function disableScroll() {
		'use strict';

		let pagePosition = window.scrollY;

		vars.bodyEl.classList.add('stop-scroll');

		vars.bodyEl.dataset.position = pagePosition;

		vars.htmlEl.style.setProperty('--top-position', `-${pagePosition}px`);

		vars.htmlEl.style.scrollBehavior = 'unset';
	}

	function enableScroll() {
		'use strict';
		let pagePosition = parseInt(vars.bodyEl.dataset.position, 10);

		vars.bodyEl.classList.remove('stop-scroll');

		window.scroll({
			top: pagePosition,

			left: 0,
		});

		vars.bodyEl.removeAttribute('data-position');

		vars.htmlEl.style.setProperty('--top-position', 'auto');

		vars.htmlEl.style.scrollBehavior = '';
	}

	(function burgerInit() {
		'use strict';

		if (vars.burger && vars.nav) {
			vars.burger.addEventListener('click', () => {
				vars.burger.classList.toggle('burger--is-active');

				vars.nav.classList.toggle('nav--is-visible');

				vars.fixedEls.forEach(function (el) {
					el.classList.toggle('not-leap');
				});

				if (vars.burger.getAttribute('aria-expanded') === 'false') {
					vars.burger.setAttribute('aria-expanded', 'true');

					vars.burger.setAttribute('aria-pressed', 'true');

					vars.burger.setAttribute('aria-label', 'Закрыть меню');

					disableScroll();
				} else {
					vars.burger.setAttribute('aria-expanded', 'false');

					vars.burger.setAttribute('aria-pressed', 'false');

					vars.burger.setAttribute('aria-label', 'Открыть меню');

					enableScroll();
				}
			});
		}

		if (vars.navItems) {
			vars.navItems.forEach(el => {
				el.addEventListener('click', () => {
					enableScroll();

					if (vars.burger) {
						vars.burger.setAttribute('aria-expanded', 'false');

						vars.burger.setAttribute('aria-pressed', 'false');

						vars.burger.setAttribute('aria-label', 'Открыть меню');

						vars.burger.classList.remove('burger--is-active');
					}

					if (vars.nav) {
						vars.nav.classList.remove('nav--is-active');
					}
				});
			});
		}

		if (vars.overlay) {
			vars.overlay.addEventListener('click', () => {
				if (vars.burger) {
					vars.burger.setAttribute('aria-expanded', 'false');

					vars.burger.setAttribute('aria-pressed', 'false');

					vars.burger.setAttribute('aria-label', 'Открыть меню');

					vars.burger.classList.remove('burger--is-active');
				}

				if (vars.nav) {
					vars.nav.classList.remove('nav--is-active');
				}

				enableScroll();
			});
		}
	})();

	(function getFullYear(selector) {
		'use strict';

		const currentYear = new Date().getFullYear();

		const yearEl = document?.querySelector(selector);

		const metaYear = document?.querySelector('[itemprop="copyrightYear"]');

		if (yearEl) {
			yearEl.innerHTML = currentYear;
		}

		if (metaYear) {
			metaYear.setAttribute('content', currentYear);
		}
	})();

	function getElementHeight(selector, varHeightName) {
		function heightDetermination() {
			const element = document?.querySelector(`${selector}`);

			if (element) {
				const elementHeight = element.offsetHeight;

				vars.htmlEl.style.setProperty(
					`--${varHeightName}`,
					`${elementHeight}px`,
				);
			}
		}

		heightDetermination();

		window.addEventListener('resize', heightDetermination);
	}
	getElementHeight('.header', 'header-height');
});
