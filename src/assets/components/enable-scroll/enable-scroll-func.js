const docEl = document.documentElement;
const docBody = document.body;

export function enableScroll() {
	'use strict';

	// 1. Получаем сохраненную позицию с безопасным парсингом
	const pagePosition = parseInt(docBody.dataset.position || '0', 10);

	// 2. Удаляем класс блокировки
	docBody.classList.remove('stop-scroll');

	// 3. Восстанавливаем скролл (оптимизированный вариант)
	if (pagePosition !== window.scrollY) {
		window.scrollTo({
			top: pagePosition,
			left: 0,
			behavior: 'instant', // Отключаем анимацию при восстановлении
		});
	}

	// 4. Очищаем данные и стили
	docBody.removeAttribute('data-position');
	docEl.style.removeProperty('--top-position');
	docEl.style.removeProperty('scroll-behavior');

	// 5. Особые случаи для мобильных устройств
	if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		docBody.style.removeProperty('touch-action');
		docBody.style.removeProperty('overscroll-behavior');
	}
}