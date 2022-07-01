// IMPORT BUTTON-RETURN-TOP
// import { buttonToTop } from './src/_utils/button-to-top/index.js';
// END. IMPORT BUTTON-RETURN-TOP


	// INIT BUTTON-RETURN-TOP
		/*
			700 - скорость прокрутки к верху в мс

			500 - количество пикселей от верха доя появления кнопки
		*/

		// buttonToTop(700, 500);
	// END. INIT BUTTON-RETURN-TOP

export function buttonToTop(speedReturnTop, scrollTop) {
	// Получаем кнопку в переменную
	const buttonTop = document?.querySelector('[data-button-to-top]');

	function buttonTopActive() {
		// Сколько нужно проскролить, чтобы появилась кнопка
		const breakpoint = scrollTop; 
	
		// Если прокрутили на значение breakpoint, задаём кнопке указанный класс
		if (window.pageYOffset >= breakpoint && buttonTop) {
			buttonTop.classList.add('button-to-top__active');
		} else {
			buttonTop.classList.remove('button-to-top__active');
		}
	}
	window.addEventListener('scroll', buttonTopActive);

	if (buttonTop) {
		buttonTop.addEventListener('click', function() {
			window.scrollTo(0,0);
		});
	}
}