export function linkScrollToElement() {
	'use strict';

	// Помещаем все ссылки меню с атрибутом data-goto в переменную
	const linksScroll = document.querySelectorAll('[data-nav-page]');

	if (linksScroll.length > 0) {
		// Проходимся по всем ссылкам и отслеживаем клик по ним, при клике выполняем функцию onScrollLinkClick
		linksScroll.forEach(link => {
			link.addEventListener('click', onScrollLinkClick);
		});

		function onScrollLinkClick(e) {
			// Помещаем в переменную ссылку по которой кликнули
			const linkTarget = e.target.closest('[data-nav-page]');

			// Помещаем в переменную содержание атрибута data-nav-page у сслыки по которой кликнули
			const dataSet = linkTarget.dataset.navPage;

			// Если у ссылки есть атрибут data-nav-page и в DOM есть элемент с классом или id равным его значению
			if (dataSet && document.querySelector(dataSet)) {
				// Помещаем элемент с классом или id как в атрибуте data-nav-page в переменную
				const targetElement = document.querySelector(dataSet);

				// Рассчитываем положение этого элемента на странице минус высоту header
				const targetElementValue =
					targetElement.getBoundingClientRect().top +
					pageYOffset -
					document.querySelector('header').offsetHeight;

				// Прокручиваем страницу до этого элемента
				window.scrollTo({
					top: targetElementValue,
					behavior: 'smooth'
				});

				e.preventDefault();
			}
		}
	}
}
