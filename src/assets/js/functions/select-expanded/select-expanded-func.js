import slideToggle from '../slide-toggle/slide-toggle-func.js';

function selectExpanded() {
	'use strict';

	// Собираем все элементы с атрибутом "data-selects"
	const selects = document?.querySelectorAll('[data-select]');

	if (selects) {
		selects.forEach((item) => {
			item.addEventListener('click', (e) => {
				const target = e.target;

				if (target.closest('[data-select-title]')) {
					const parent = target?.closest('[data-select]');

					target.classList.toggle('is-active');

					const content = parent?.querySelector('[data-select-content]');

					content.classList.toggle('is-active');

					const titleHeight = e.target.closest('[data-select-title]')
						.offsetHeight;

					const rootElement = document.querySelector(':root');

					rootElement.style.setProperty(
						'--select-title-height',
						`${titleHeight}px`
					);

					slideToggle(content, 300);

					const atr = target.getAttribute('aria-expanded');

					if (target.getAttribute('aria-expanded') == 'false') {
						target.setAttribute('aria-expanded', true);
					} else {
						target.setAttribute('aria-expanded', false);
					}
				}

				if (target.closest('[data-option-inner-button]')) {
					const parent = target?.closest('[data-select]');

					const innerBtns = parent.querySelectorAll(
						'[data-option-inner-button]'
					);

					innerBtns.forEach((item) => {
						item.classList.remove('is-active');
					});

					target.classList.add('is-active');

					const innerInfo = target.innerHTML;

					const title = parent.querySelector('[data-select-title]');

					const content = parent.querySelector('[data-select-content]');

					title.innerHTML = innerInfo;

					slideToggle(content, 300);

					title.setAttribute('aria-expanded', false);
					title.classList.remove('is-active');

					content.classList.remove('is-active');
				}

				document.addEventListener('click', function(e) {
					const target = e.target;

					if (!target.closest('[data-select]')) {
						const titles = document?.querySelectorAll('[data-select-title]');

						titles.forEach(function(item, index, array) {
							item.classList.remove('is-active');
							item.setAttribute('aria-expanded', false);
						});

						const contents = document?.querySelectorAll(
							'[data-select-content]'
						);

						contents.forEach(function(item, index, array) {
							slideToggle(item, 300);
						});
					}
					// Конец. Закрытие select при клике вне его
				});
			});
		});
	}
}

export default selectExpanded;
