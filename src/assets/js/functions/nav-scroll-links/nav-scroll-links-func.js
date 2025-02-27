export const navScrollLinks = () => {
	'use strict';

	const nav = document?.querySelector('[data-nav]');

	const navLinksGoto = document?.querySelectorAll('[data-goto]');

	const header = document?.querySelector('header');

	const headerHeight = header.offsetHeight;

	document
		.querySelector(':root')
		.style.setProperty('--header-height', `${headerHeight}px`);

	if (nav.hasAttribute('data-scroll-links')) {
		if (navLinksGoto.length > 0) {
			// Проходимся по всем ссылкам и отслеживаем клик по ним, при клике выполняем функцию onMenuLinkClick
			navLinksGoto.forEach((link) => {
				link.addEventListener('click', onMenuLinkClick);
			});

			function onMenuLinkClick(e) {
				// Помещаем в переменную ссылку по которой кликнули
				const dataSetText = e.target.dataset.goto;

				// Если у ссылки есть атрибут data-goto и в DOM есть элемент с таким классом или id
				if (dataSetText && document.querySelector(dataSetText)) {
					// Помещаем элемент с классом или id как в атрибуте data-goto в переменную
					const gotoBlock = document.querySelector(dataSetText);

					// Рассчитываем положение этого элемента на странице минус высоту header
					const gotoBlockValue =
						gotoBlock.getBoundingClientRect().top + pageYOffset - headerHeight;

					// Прокручиваем страницу до этого элемента
					window.scrollTo({
						top: gotoBlockValue,
						behavior: 'smooth',
					});

					e.preventDefault();
				}
			}
		}
	}
};
