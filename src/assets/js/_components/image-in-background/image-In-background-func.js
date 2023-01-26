export function imageInBackground() {
	'use strict';

	// Получаем элементы с атрибутом data-image-in-background
	let ibg = document.querySelectorAll('[data-image-in-background]');

	// Находим все дочерние картинки, переносим их в фон и удаляем
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
