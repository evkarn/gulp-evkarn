import {enableScroll} from './enable-scroll.js';

export function keydownEsc() {
	'use strict';
	
	document.addEventListener('keydown', function(e) {
		let keyCode = e.code;
	
		if (keyCode === 27) {
			enableScroll();
		}
	});
}