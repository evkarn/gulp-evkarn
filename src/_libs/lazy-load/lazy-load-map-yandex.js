export function lazyLoadYandexMap() {
	// Находим в html блок с классом "load-map" и помещаю в переменную
	const loadMapBlock = document?.querySelector('.lazy-load-map');

	// Помещаем в переменную значение текущей высоты экрана
	const windowHeight = document.documentElement.clientHeight; 

	// При прокрутке выполняем функцию lazyScroll
	window.addEventListener('scroll', lazyScroll);

	function lazyScroll() {
		//Если у блока с картой отсутствует класс "map-loaded" выполнить функцию "getMap"
		if (!loadMapBlock.classList.contains('map-loaded')) {
			getMap();
		}
	}

	function getMap() {
		// Узнаём размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим).
		const loadMapBlockPos = loadMapBlock.getBoundingClientRect().top + pageYOffset; 

		// Если нижнняя часть экрана касается блока с картой
		if (pageYOffset > loadMapBlockPos - windowHeight) {
			//Получаем значение атрибута "data-map" и помещаем в переменную
			const loadMapScript = loadMapBlock.dataset.map; 

			//Если атрибут "data-map" не пустой, то вставляем в блок с картой скрипт от map.yandex.ru
			if(loadMapScript) { 
				loadMapBlock.insertAdjacentHTML(
					"beforeend", `$[loadMapScript]`
				);

				// После того как карта вставлена, добавляем блоку класс "map-loaded"
				loadMapBlock.classList.add('map-loaded');
			}
		}
	}
}