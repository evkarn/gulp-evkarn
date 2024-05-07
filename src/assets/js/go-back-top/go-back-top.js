export function goBackTop(offsetViewButton) {
	'use strict';

	// Получаем кнопку в переменную
	const btn = document?.querySelector('[data-go-back-top]');

	function btnActive() {
		// Сколько нужно проскролить, чтобы появилась кнопка
		const breakpoint = offsetViewButton;

		// Если прокрутили на значение breakpoint, задаём кнопке указанный класс
		if (window.pageYOffset >= breakpoint) {
			btn.classList.add('go-back-top__is-active');
		} else {
			btn.classList.remove('go-back-top__is-active');
		}
	}

	if (btn) {
		window.addEventListener('scroll', btnActive);

		btn.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		});
	}
}
