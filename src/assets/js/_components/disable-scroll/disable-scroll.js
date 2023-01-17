export let disableScroll = function () {
	'use strict';
	
	let pagePosition = window.scrollY;

	document.body.classList.add('stop-scroll');

	document.body.dataset.position = pagePosition;

	document.querySelector(':root').style.setProperty('--top-position', `-${pagePosition}px`);

	document.documentElement.style.scrollBehavior = 'unset';
};