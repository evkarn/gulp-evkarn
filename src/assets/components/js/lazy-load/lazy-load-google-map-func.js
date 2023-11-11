export function lazyLoadGoogleMap() {
	'use strict';

	// Находим в html блок с классом "load-map" и помещаю в переменную
	const loadMapBlock = document.querySelector('.lazy-load-map');

	// Помещаем в переменную значение текущей высоты экрана
	const windowHeight = document.documentElement.clientHeight;

	// При прокрутке выполняем функцию lazyScroll
	window.addEventListener('scroll', lazyScroll);

	// Если у блока с картой отсутствует класс "loaded-complete" выполнить функцию "getMap"
	function lazyScroll() {
		if (!loadMapBlock.classList.contains('map-loaded')) {
			getMap();
		}
	}

	function getMap() {
		// Узнаём размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим).
		const loadMapBlockPos = loadMapBlock.getBoundingClientRect().top + pageYOffset;

		// Если нижнняя часть экрана касается блока с картой
		if (pageYOffset > loadMapBlockPos - windowHeight) {
			// Получаю значение атрибута "data-set" и помещаю в переменную
			const loadMapUrl = loadMapBlock.dataset.map;

			if (loadMapUrl) {
				// Если атрибут "data-set" не пустой, то вставляем в блок с картой фрейм от google.ru/map
				loadMapBlock.insertAdjacentHTML(
					'beforeend',
					`<iframe src="$[loadMapUrl]" style="border:0;" allowfullscreen="true" loading="lazy"></iframe>`
				);

				// После того как карта вставлена, добавляем блоку класс map-loaded
				loadMapBlock.classList.add('map-loaded');
			}
		}
	}
}
