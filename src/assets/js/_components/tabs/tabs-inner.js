export const tabsInner = () => {
	'use strict';

	const tabsParent = document?.querySelector('[data-tabs-parent]');

	const tabsButtons = document?.querySelectorAll('[data-tabs-inner-path]');

	const tabsContents = document?.querySelectorAll('[data-tabs-inner-target]');

	if (tabsParent) {
		tabsParent.addEventListener('click', (e) => {
			const t = e.target;

			if (e.target.closest('[data-tabs-inner-path]')) {
				const tabsPath = e.target.closest('[data-tabs-inner-path]').dataset.tabsInnerPath;

				tabsButtons.forEach((el) => {
					el.classList.remove('tabs-inner__btn--active');
				});

				const tabsButtonDataPath = document.querySelector(`[data-tabs-inner-path="${tabsPath}"]`);

				tabsButtonDataPath.classList.add('tabs-inner__btn--active');

				tabsHandler(tabsPath);
			}
		});
	}

	const tabsHandler = (path) => {
		tabsContents.forEach((el) => {
			el.classList.remove('tabs-inner__content--active');
		});

		const dataTabsTarget = document.querySelector(`[data-tabs-inner-target="${path}"]`);

		dataTabsTarget.classList.add('tabs-inner__content--active');
	};
};
