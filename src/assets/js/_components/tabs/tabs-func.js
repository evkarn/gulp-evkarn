function tabs () {
	'use strict';

	const tabsParents = document?.querySelectorAll('[data-tabs-parent]');

	if (tabsParents.length > 0) {
		tabsParents.forEach((el) => {
			el.addEventListener('click', (e) => {
				const parent = e.target.closest('[data-tabs-parent]');

				const tabsButtons = parent?.querySelectorAll('[data-tabs-path]');

				if (e.target.closest('[data-tabs-path]')) {
					const tabsPath = e.target.closest('[data-tabs-path]').dataset.tabsPath;

					tabsButtons.forEach((el) => {
						el.classList.remove('tabs__btn--active');
					});

					const targetButton = parent.querySelector(
						`[data-tabs-path="${tabsPath}"]`,
					);

					targetButton.classList.add('tabs__btn--active');

					tabsHandler(tabsPath, parent);
				}

				if (e.target.closest('[data-tabs-button-prev]')) {
					let activeBtn = parent?.querySelector('.tabs__btn--active');

					let activeParent = activeBtn.closest('[data-tabs-button-item]');

					let previousParent = activeParent.previousElementSibling;

					if (previousParent) {
						let prevActive = previousParent.querySelector('[data-tabs-path]');

						tabsButtons.forEach((el) => {
							el.classList.remove('tabs__btn--active');
						});

						prevActive.classList.add('tabs__btn--active');

						let path = prevActive.dataset.tabsPath;

						tabsHandler(path, parent);
					}
				}

				if (e.target.closest('[data-tabs-button-next]')) {
					let activeBtn = parent?.querySelector('.tabs__btn--active');

					let activeParent = activeBtn.closest('[data-tabs-button-item]');

					let nextParent = activeParent.nextElementSibling;

					if (nextParent) {
						let nextActive = nextParent.querySelector('[data-tabs-path]');

						tabsButtons.forEach((el) => {
							el.classList.remove('tabs__btn--active');
						});

						nextActive.classList.add('tabs__btn--active');

						let path = nextActive.dataset.tabsPath;

						tabsHandler(path, parent);
					}
				}
			});
		});
	}

	const tabsHandler = (path, parent) => {
		const tabsContents = parent?.querySelectorAll('[data-tabs-target]');

		tabsContents.forEach((el) => {
			el.classList.remove('tabs__content--active');
		});

		const target = parent?.querySelector(`[data-tabs-target="${path}"]`);

		target.classList.add('tabs__content--active');
	};
};

export default tabs;
