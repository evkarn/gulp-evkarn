export function lazyLoadElement() {

	// Переменная для позиций всех блоков
	let lazyBlocksPositions = [];

	// Помещаем в переменную все блоки с атрибутом data-lazy
	const lazyBlocks = document?.querySelectorAll('[data-lazy]');

	// Если есть блоки с нужным дата атрибутом
	if (lazyBlocks.length > 0) {
		// Пробегаемся по ним
		lazyBlocks.forEach(element => {
			// Если у элемента есть атрибут data-lazy записываем их позиции в переменную lazyBlocksPositions и выполняем функцию lazyScrollCheck
			if (element.dataset.lazy) {
				lazyBlocksPositions.push(element.getBoundingClientRect().top + pageYOffset);

				lazyScrollCheck();
			}
		})
	};

	// При прокрутке страницы выполняем функцию lazyScroll
	window.addEventListener('scroll', lazyScroll); 

	function lazyScroll() {
		// Если "data-lazy" не пустой, выполняем функцию "lazyScrollCheck"
		if (document.querySelectorAll('[data-lazy]').length > 0) {
			lazyScrollCheck(); 
		}
	}

	function lazyScrollCheck() {
		// Помещаем в переменную значение текущей высоты экрана
		let windowHeight = document.documentElement.clientHeight;

		let blockIndex = lazyBlocksPositions.findIndex(
			item => pageYOffset > item - windowHeight
		);

		if (blockIndex >= 0) {
			if (lazyBlocks[blockIndex].dataset.lazy) {
				// Присваиваем класс "loaded-complete"
				lazyBlocks[blockIndex].classList.add('loaded-complete');
			}

			delete lazyBlocksPositions[blockIndex];
		}
	}
}