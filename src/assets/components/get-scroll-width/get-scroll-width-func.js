
export function getScrollWidth() {
	'use strict';

	const docEl = document.documentElement;

	const docBody = document.body;

	const scrollbarWidth = window.innerWidth - docBody.clientWidth;

	docEl.style.setProperty('--scroll-width', `${scrollbarWidth}px`);

	return scrollbarWidth;
}
