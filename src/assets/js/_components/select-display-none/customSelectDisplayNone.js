// IMPORT SELECT-DISPLAY-NONE
	// import { customSelectDisplayNone } from './src/_utils/select-display-none/index.js';
// END. IMPORT SELECT-DISPLAY-NONE


	// INIT SELECT-DISPLAY-NONE
		// customSelectDisplayNone();
	// END. INIT SELECT-DISPLAY-NONE

export function customSelectDisplayNone() {
	// Собираем все элементы с атрибутом "data-selects"
	const selectsArray = document?.querySelectorAll('[data-selects]');

	const customSelectItems = document?.querySelectorAll('[data-select-wrapper]');

	const customSelectOptions = document?.querySelectorAll('[data-select-options]');

	const customSelectsWrappersTitle = document?.querySelectorAll('[data-select-title]');


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

					if (e.target.dataset.selectTitle) {
						const targetDataSelectTitle = e.target.dataset.selectTitle;

						document.querySelector(`[data-select-title="${targetDataSelectTitle}"]`).classList.toggle('custom-select__title--active');

						e.target.nextElementSibling.classList.toggle('custom-select__options--active');
					}
				});
			});
		}
	
		selectWork();
		// Конец. Раскрытие и закрытие селекта


		// Обработка различных событий
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
		// Конец. Обработка различных событий
	}
}