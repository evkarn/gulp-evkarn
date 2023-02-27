export const disableScroll = function () {
	const body = document.body;
	
	const scrollWidth = window.innerWidth - document.body.offsetWidth;

	document.querySelector(':root').style.setProperty('--scroll-width', `${scrollWidth}px`);

	let pagePosition = window.scrollY;

	body.classList.add('stop-scroll');

	body.dataset.position = pagePosition;

	document.querySelector(':root').style.setProperty('--top-position', `-${pagePosition}px`);

	document.documentElement.style.scrollBehavior = 'unset';
};
