// IMPORT IMAGE-IN-BACKGROUND
// import { imageInBackground } from './src/_utils/image-in-back-background/index.js';
// END. IMPORT IMAGE-IN-BACKGROUND


	// INIT IMAGE-IN-BACKGROUND
		// imageInBackground();
	// END. INIT IMAGE-IN-BACKGROUND

export function imageInBackground(){
	'use strict';

	// Получаем элементы с атрибутом data-image-in-background
	let ibg = document.querySelectorAll("[data-image-in-background]");

	// Находим все дочерние картинки, переносим их в фон и удаляем
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
			ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
};