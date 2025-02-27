function enableScroll() {
	const html = document.documentElement;

	const body = document.body;

	const documentRoot = document.querySelector(':root');

	let pagePosition = parseInt(body.dataset.position, 10);

	body.classList.remove('stop-scroll');

	window.scroll({
		top: pagePosition,

		left: 0,
	});

	body.removeAttribute('data-position');

	documentRoot.style.setProperty('--top-position', 'auto');

	html.style.scrollBehavior = '';
}

export default enableScroll;
