// IMPORT SELECT-DISPLAY-NONE
	// import { customSelectDisplayNone } from './src/_utils/select-display-none/index.js';
// END. IMPORT SELECT-DISPLAY-NONE


	// INIT SELECT-DISPLAY-NONE
		// customSelectDisplayNone();
	// END. INIT SELECT-DISPLAY-NONE

export function customSelectDisplayNone() {
	'use strict';

	// Собираем все элементы с атрибутом "data-selects"
	const selectsArray = document?.querySelectorAll('[data-selects]');


	// Проверяем есть ли они
	if (selectsArray.length > 0) {
		// Получение селектов
		const selectsElement = Array.from(selectsArray).filter(function (item, index, self) {
			return !item.dataset.selects.split(",")[0];
		});


		// Раскрытие и закрытие селекта
		function selectWork() {
			selectsElement.forEach(selectsBlock => {
				selectsBlock.addEventListener('click', (e) => {
					const targetText = e.target.innerText;

					let target = e.target;

					if (e.target.closest('[data-select-title]')) {
						const targetDataSelectTitle = e.target.closest('[data-select-title]').dataset.selectTitle;

						const targetParent = document.querySelector(`[data-select-title="${targetDataSelectTitle}"]`);

						targetParent.classList.toggle('custom-select__title--active');

						const buttonHeight = targetParent.offsetHeight;

						document.querySelector(':root').style.setProperty('--button-height', `${buttonHeight}px`);


						e.target.closest('[data-select-title]').nextElementSibling.classList.toggle('custom-select__options--active');
					}
				});
			});
		}
		selectWork();
		// Конец. Раскрытие и закрытие селекта


		document.addEventListener("click", function (e) {
			const target = e.target;

			// Подмена текста в заголовке select при клике на data-select-option
			if (target.closest('[data-select-option]')) {
				const targetElText = target.innerText;

				console.log(targetElText);

				const targetDataSelectWrapper = target.closest('[data-select-wrapper]');

				const targetSelectTitle = targetDataSelectWrapper.querySelector('[data-select-title]');

				if (targetSelectTitle) {
					targetSelectTitle.innerText = targetElText;
				}
			}
			// Конец. Подмена текста в заголовке select при клике на data-select-option


			// Закрытие select при клике вне его
			if (!target.closest('[data-selects]')) {
				const selectActiveTitles = document?.querySelectorAll('[data-select-title].custom-select__title--active');

				const selectActiveOptions = document?.querySelectorAll('[data-select-options].custom-select__options--active');

				selectActiveTitles.forEach(title => {
					title.classList.remove('custom-select__title--active');
				});

				selectActiveOptions.forEach(options => {
					options.classList.remove('custom-select__options--active');
				});
			}
			// Конец. Закрытие select при клике вне его


			// Закрытие select при клике на data-select-option
			if (target.closest('[data-select-option]')) {
				const targetDataSelectWrapper = target.closest('[data-select-wrapper]');

				const targetSelectActiveTitle = targetDataSelectWrapper.querySelector('[data-select-title].custom-select__title--active');

				const targetSelectActiveOptions = targetDataSelectWrapper.querySelector('[data-select-options].custom-select__options--active');

				if (targetSelectActiveTitle) {
					targetSelectActiveTitle.classList.remove('custom-select__title--active');
				}

				if (targetSelectActiveOptions) {
					targetSelectActiveOptions.classList.remove('custom-select__options--active');
				}
			}
			// Конец. Закрытие select при клике на data-select-option
		});
	}
}