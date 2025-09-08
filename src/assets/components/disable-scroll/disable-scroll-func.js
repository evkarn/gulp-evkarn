import getScrollWidth from '../get-scroll-width/get-scroll-width-func.js';

function disableScroll() {
	'use strict';

	const docEl = document.documentElement;
	const docBody = document.body;

	// Получаем текущую позицию скролла
	const pagePosition = window.scrollY;

	// Устанавливаем класс для блокировки скролла
	docBody.classList.add('stop-scroll');

	// Сохраняем позицию в data-атрибут
	docBody.dataset.position = pagePosition;

	// Устанавливаем CSS-переменную для позиции
	docEl.style.setProperty('--top-position', `-${pagePosition}px`);

	// Отключаем smooth-scroll во время блокировки
	docEl.style.scrollBehavior = 'unset';
}
