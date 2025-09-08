import disableScroll from '../disable-scroll/disable-scroll-func.js';

import enableScroll from '../enable-scroll/enable-scroll-func.js';

export function burgerMenu() {
	'use strict';

	const header = document?.querySelector('[data-header]');
	const overlay = document?.querySelector('[data-overlay]');
	const burger = document?.querySelector('[data-burger]');
	const nav = document?.querySelector('[data-nav]');
	const navItems = nav?.querySelectorAll('[data-nav-item]');
	const fixedElements = document?.querySelectorAll('[data-fixed]');

	if (!burger || !nav || !header) return;

	const setBurgerAttributes = (expanded, pressed, label) => {
		burger.setAttribute('aria-expanded', expanded);
		burger.setAttribute('aria-pressed', pressed);
		burger.setAttribute('aria-label', label);
	};

	const closeMenu = () => {
		setBurgerAttributes('false', 'false', 'Открыть меню');
		burger.classList.remove('burger--is-active');
		nav.classList.remove('nav--is-visible');
		header.classList.remove('header--open-nav');
		enableScroll();
	};

	// Переключаем классы и состояние меню
	const toggleMenu = () => {
		const isExpanded = burger.getAttribute('aria-expanded') === 'true';

		burger.classList.toggle('burger--is-active');
		header.classList.toggle('header--open-nav');
		nav.classList.toggle('nav--is-visible');

		// Переключаем класс для фиксированных элементов
		fixedElements?.forEach(el => el.classList.toggle('not-leap'));

		if (isExpanded) {
			closeMenu();
		} else {
			setBurgerAttributes('true', 'true', 'Закрыть меню');
			disableScroll();
		}
	};

	// Обработчики событий
	burger.addEventListener('click', toggleMenu);

	// Закрытие при клике на пункты меню
	navItems?.forEach(item => {
		item.addEventListener('click', closeMenu);
	});

	// Закрытие при клике на оверлей
	overlay?.addEventListener('click', closeMenu);
}