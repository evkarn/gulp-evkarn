(function tabs() {
	'use strict';

	const tabsParents = document?.querySelectorAll('[data-tabs-parent]');

	if (tabsParents.length > 0) {
		tabsParents.forEach((el) => {
			el.addEventListener('click', (e) => {
				const parent = e.target.closest('[data-tabs-parent]');

				const tabsButtons = parent?.querySelectorAll('[data-tabs-btn]');

				if (e.target.closest('[data-tabs-btn]')) {
					const tabsPath = e.target.closest('[data-tabs-btn]').dataset.tabsBtn;

					tabsButtons.forEach((el) => {
						el.classList.remove('tabs__btn--active');
						el.setAttribute('aria-selected', 'false');
					});

					const targetButton = parent.querySelector(
						`[data-tabs-btn="${tabsPath}"]`,
					);

					targetButton.classList.add('tabs__btn--active');
					targetButton.setAttribute('aria-selected', 'true');

					tabsHandler(tabsPath, parent);
				}

				if (e.target.closest('[data-tabs-prev]')) {
					const parent = e.target.closest('[data-tabs-parent]');

					const activeBtn = parent.querySelector('.tabs__btn--active');

					const prevBtn = activeBtn?.previousElementSibling;

					const currentPath = activeBtn.dataset.tabsBtn;

					const activeContent = parent.querySelector(
						`[data-tabpanel="${currentPath}"]`,
					);

					let prevContent = activeContent.previousElementSibling;

					if (prevContent) {
						tabsButtons.forEach((el) => {
							el.classList.remove('tabs__btn--active');
							el.setAttribute('aria-selected', 'false');
						});

						prevBtn.classList.add('tabs__btn--active');
						prevBtn.setAttribute('aria-selected', 'true');

						let path = prevContent.dataset.tabpanel;

						tabsHandler(path, parent);
					}
				}

				if (e.target.closest('[data-tabs-next]')) {
					const parent = e.target.closest('[data-tabs-parent]');

					const activeBtn = parent.querySelector('.tabs__btn--active');

					const nextBtn = activeBtn?.nextElementSibling;

					const currentPath = activeBtn.dataset.tabsBtn;

					const activeContent = parent.querySelector(
						`[data-tabpanel="${currentPath}"]`,
					);

					let nextContent = activeContent.nextElementSibling;

					if (nextContent) {
						tabsButtons.forEach((el) => {
							el.classList.remove('tabs__btn--active');
							el.setAttribute('aria-selected', 'false');
						});

						nextBtn.classList.add('tabs__btn--active');
						nextBtn.setAttribute('aria-selected', 'true');

						let path = nextContent.dataset.tabpanel;

						tabsHandler(path, parent);
					}
				}
			});
		});
	}

	const tabsHandler = (path, parent) => {
		const tabPanels = parent?.querySelectorAll('[data-tabpanel]');

		tabPanels.forEach((el) => {
			el.classList.remove('tabs__content--active');
		});

		const target = parent?.querySelector(`[data-tabpanel="${path}"]`);

		if (target) {
			target.classList.add('tabs__content--active');
		}
	};
})();

export default tabs;
