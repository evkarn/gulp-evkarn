export let enableScroll = function () {
	'use strict';
	
	let pagePosition = parseInt(document.body.dataset.position, 10);

	document.body.classList.remove('stop-scroll');

	window.scroll({ top: pagePosition, left: 0 });

	document.body.removeAttribute('data-position');

	document.querySelector(':root').style.setProperty('--top-position', 'auto');

	document.documentElement.style.scrollBehavior = '';
};