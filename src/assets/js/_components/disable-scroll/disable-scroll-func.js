function disableScroll() {
	const html = document.documentElement;

	const body = document.body;

	const documentRoot = document.querySelector(':root');

	const scrollWidth = window.innerWidth - document.body.offsetWidth;

	let pagePosition = window.scrollY;

	documentRoot.style.setProperty('--scroll-width', `${scrollWidth}px`);

	body.classList.add('stop-scroll');

	body.dataset.position = pagePosition;

	documentRoot.style.setProperty('--top-position', `-${pagePosition}px`);

	html.style.scrollBehavior = 'unset';
};

export default disableScroll;
