export const enableScroll = function () {
	const body = document.body;
	
	let pagePosition = parseInt(document.body.dataset.position, 10);

	body.classList.remove('stop-scroll');

	window.scroll({ top: pagePosition, left: 0 });

	body.removeAttribute('data-position');

	document.querySelector(':root').style.setProperty('--top-position', 'auto');

	document.documentElement.style.scrollBehavior = '';
};
