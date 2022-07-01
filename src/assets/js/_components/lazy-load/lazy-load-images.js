// IMPORT LAZY-LOAD-IMAGES
// import { lazyLoadImages } from './src/_utils/lazy-load/index.js';
// END. IMPORT LAZY-LOAD-IMAGES


	// INIT LAZY-LOAD-IMAGES
		// lazyLoadImages();
	// END. INIT LAZY-LOAD-IMAGES

export function lazyLoadImages() {
	//Находим в html все картинки с атрибутами "data-src", "data-srcset"
	const lazyImages = document.querySelectorAll('img[data-src],source[data-srcset]'); 

	//Помещаем в переменную значение текущей высоты экрана
	const windowHeight = document.documentElement.clientHeight;

	let lazyImagesPositions = [];

	if (lazyImages.length > 0) {
		lazyImages.forEach(img => {
			if (img.dataset.src || img.dataset.srcset) {lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
			lazyScrollCheck();
			}
		})
	};
	
	// При прокрутке выполняем функцию lazyScroll
	window.addEventListener('scroll', lazyScroll);

	function lazyScroll() {
		// Если "data-src", "data-srcset" не пустые, выполняем функцию "lazyScrollCheck"
		if (lazyImages.length > 0) {
			lazyScrollCheck(); 
		}
	}


	function lazyScrollCheck() {
		let imgIndex = lazyImagesPositions.findIndex(
			item => pageYOffset > item - windowHeight
		);

		if (imgIndex >= 0) {
			if (lazyImages[imgIndex].dataset.src) {
				lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
				lazyImages[imgIndex].removeAttribute('data-src');
			} else if (lazyImages[imgIndex].dataset.srcset) {
				lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
				lazyImages[imgIndex].removeAttribute('data-srcset');
			}
			delete lazyImagesPositions[imgIndex];
		}
	}
}