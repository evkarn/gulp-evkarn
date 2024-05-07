import enableScroll from '../enable-scroll/enable-scroll-func.js';

export function windowOnKey27Down() {
	'use strict';

	const burger = document?.querySelector('[data-burger]');

	const nav = document?.querySelector('[data-nav]');

	const headerOverlay = document?.querySelector('[data-header-overlay]');

	const cartContent = document?.querySelector('[data-cart-content]');

	const cartOverlay = document?.querySelector('.cart__overlay');

	window.onkeydown = function (event) {
		if (event.keyCode == 27) {
			burger.classList.remove('burger--active');

			nav.classList.remove('bottom-nav--visible');

			headerOverlay.classList.remove('header__overlay--visible');

			cartContent.classList.remove('cart-content--active');

			cartOverlay.classList.remove('cart__overlay--visible');

			enableScroll();
		}
	};
}
