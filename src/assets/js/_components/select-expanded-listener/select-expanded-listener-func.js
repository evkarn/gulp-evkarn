const selectExpandedListener = () => {
	'use strict';

	const selects = document?.querySelectorAll('[data-select]');

	document.addEventListener('click', function (e) {
		const target = e.target;

		if (target.closest('[data-select]')) {
			const parent = e.target.closest('[data-select-parent]');

			parent.classList.toggle('is-active');
		}

		if (!target.closest('[data-select]')) {
			selects.forEach(item => {
				const parent = item.closest('[data-select-parent]');

				parent.classList.remove('is-active');
			});
		}
	});
};

export default selectExpandedListener;
