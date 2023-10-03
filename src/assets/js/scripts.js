import getElementHeight from './_components/get-element-height/get-element-height-func.js';

document.addEventListener('DOMContentLoaded', (e) => {
	getElementHeight('.section', '--section-height');

	getElementHeight('.section-2', '--section-two-height');
});
