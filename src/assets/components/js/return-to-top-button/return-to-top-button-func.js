export function returnToTopButton(offsetViewButton) {
	'use strict';

	// Получаем кнопку в переменную
	const buttonTop = document?.querySelector('[data-button-to-top]');

	function buttonTopActive() {
		// Сколько нужно проскролить, чтобы появилась кнопка
		const breakpoint = offsetViewButton;

		// Если прокрутили на значение breakpoint, задаём кнопке указанный класс
		if (window.pageYOffset >= breakpoint) {
			buttonTop.classList.add('button-to-top__active');
		} else {
			buttonTop.classList.remove('button-to-top__active');
		}
	}

	if (buttonTop) {
		window.addEventListener('scroll', buttonTopActive);

		buttonTop.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		});
	}
}
