export const tabs = () => {
	'use strict';

	const tabsParents = document?.querySelector('[data-tabs-parent]');

	if (tabsParents.length > 0) {
		tabsParents.forEach(el => {
			el.addEventListener('click', e => {
				if (e.target.closest('[data-tabs-path]')) {
					const tabsPath = e.target.closest('[data-tabs-path]').dataset.tabsPath;

					const parent = e.target.closest('[data-tabs-parent]');

					const tabsButtons = parent?.querySelectorAll('[data-tabs-path]');

					tabsButtons.forEach(el => {
						el.classList.remove('tabs__btn--active');
					});

					const targetButton = parent.querySelector(`[data-tabs-path="${tabsPath}"]`);

					targetButton.classList.add('tabs__btn--active');

					tabsHandler(tabsPath, parent);
				}
			});
		});

	}

	const tabsHandler = (path, parent) => {
		const tabsContents = parent?.querySelectorAll('[data-tabs-target]');

		tabsContents.forEach(el => {
			el.classList.remove('tabs__content--active');
		});

		const targetContent = parent.querySelector(`[data-tabs-target="${path}"]`);

		targetContent.classList.add('tabs__content--active');
	};
};
