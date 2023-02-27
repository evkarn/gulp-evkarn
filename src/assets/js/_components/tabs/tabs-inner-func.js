export const tabsInner = () => {
	'use strict';

	const tabsParents = document?.querySelectorAll('[data-tabs-inner-parent]');

	if (tabsParents.length > 0) {
		tabsParents.forEach(el => {
			el.addEventListener('click', e => {
				const parent = e.target.closest('[data-tabs-inner-parent]');

				const tabsButtons = parent?.querySelectorAll('[data-tabs-inner-path]');

				if (e.target.closest('[data-tabs-inner-path]')) {
					const tabsPath = e.target.closest('[data-tabs-inner-path]').dataset.tabsPath;

					tabsButtons.forEach(el => {
						el.classList.remove('tabs-inner__btn--active');
					});

					const targetButton = parent.querySelector(`[data-tabs-inner-path="${tabsPath}"]`);

					targetButton.classList.add('tabs-inner__btn--active');

					tabsHandler(tabsPath, parent);
				}

				if (e.target.closest('[data-tabs-inner-button-prev]')) {
					let activeBtn = parent?.querySelector('.tabs-inner__btn--active');

					let activeParent = activeBtn.closest('[data-tabs-inner-button-item]');

					let previousParent = activeParent.previousElementSibling;

					if (previousParent) {
						let prevActive = previousParent.querySelector('[data-tabs-inner-path]');

						tabsButtons.forEach(el => {
							el.classList.remove('tabs-inner__btn--active');
						});

						prevActive.classList.add('tabs-inner__btn--active');

						let path = prevActive.dataset.tabsPath;

						tabsHandler(path, parent);
					}
				}

				if (e.target.closest('[data-tabs-inner-button-next]')) {
					let activeBtn = parent?.querySelector('.tabs-inner__btn--active');

					let activeParent = activeBtn.closest('[data-tabs-inner-button-item]');

					let nextParent = activeParent.nextElementSibling;

					if (nextParent) {
						let nextActive = nextParent.querySelector('[data-tabs-inner-path]');

						tabsButtons.forEach(el => {
							el.classList.remove('tabs-inner__btn--active');
						});

						nextActive.classList.add('tabs-inner__btn--active');

						let path = nextActive.dataset.tabsPath;

						tabsHandler(path, parent);
					}
				}
			});
		});
	}

	const tabsHandler = (path, parent) => {
		const tabsContents = parent?.querySelectorAll('[data-tabs-inner-target]');

		tabsContents.forEach(el => {
			el.classList.remove('tabs-inner__content--active');
		});

		const targetContent = parent.querySelector(`[data-tabs-inner-target="${path}"]`);

		targetContent.classList.add('tabs-inner__content--active');
	};
};
