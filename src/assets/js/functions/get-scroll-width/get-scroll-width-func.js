const getScrollWidth = (e) => {
	'use strict';

	const body = document.body;

	const documentRoot = document.querySelector(':root');

	const scrollWidth = window.innerWidth - body.offsetWidth;

	documentRoot.style.setProperty('--scroll-width', `${scrollWidth}px`);
};

export default getScrollWidth;
