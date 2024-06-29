const selectExpandedListener = () => {
	'use strict';

	const selects = document?.querySelectorAll('[data-select]');

	selects.forEach(item => {
		item.addEventListener('click', (e) => {
			const parent = e.target.closest('[data-select-parent]');

			parent.classList.toggle('is-active');
		});
	});
};

export default selectExpandedListener;