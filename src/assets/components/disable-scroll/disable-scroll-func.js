import getScrollWidth from '../get-scroll-width/get-scroll-width-func.js';

function disableScroll() {
	const html = document.documentElement;

	const body = document.body;

	const documentRoot = document.querySelector(':root');

	let pagePosition = window.scrollY;

	body.classList.add('stop-scroll');

	body.dataset.position = pagePosition;

	documentRoot.style.setProperty('--top-position', `-${pagePosition}px`);

	html.style.scrollBehavior = 'unset';
}

export default disableScroll;
