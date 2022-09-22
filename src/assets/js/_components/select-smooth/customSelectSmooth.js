// IMPORT SELECT-SMOOTH
	// import { customSelectSmooth } from './src/_utils/select-smooth/index.js';
// END. IMPORT SELECT-SMOOTH


	// INIT SELECT-SMOOTH
		/*
		Для родителя селектов пишем атрибут data-selects
		Для заголовков селектов пишем атрибут data-select-title

		Если нужно чтобы в блоке открывался только один селект, а остальные при этом закрывались добавляем родителю атрибут data-one-select

		500 — это скорость закрытия и открытия селекта в мс:
		*/

		// customSelectSmooth(500);
	// END. INIT SELECT-SMOOTH

export function customSelectSmooth(durationSpeed) {
	'use strict';

	// Собираем все элементы с атрибутом "data-selects"
	const selectsArray = document?.querySelectorAll('[data-selects]');

	// Проверяем есть ли они
	if (selectsArray.length > 0) {
		// Получение селектов
		const selectsSmooth = Array.from(selectsArray).filter(function (item, index, self) {
			return !item.dataset.selects.split(",")[0];
		});


		// Инициализация
		if (selectsSmooth.length > 0) {
			initSelects(selectsSmooth);
		}


		// Инициализация
		function initSelects(selectsArray, matchMedia = false) {
			selectsArray.forEach(selectsBlock => {
				selectsBlock = matchMedia ? selectsBlock.item : selectsBlock;

				if (matchMedia.matches || !matchMedia) {
					selectsBlock.classList.add('init');

					initSelectBody(selectsBlock);

					selectsBlock.addEventListener('click', setSelectAction);

				} else {
					selectsBlock.classList.remove('init');

					initSelectBody(selectsBlock, false);

					selectsBlock.removeEventListener('click', setSelectAction);
				}
			});
		}


		// Работа с контентом
		function initSelectBody(selectsBlock, hideSelectBody = true) {
			const selectTitles = selectsBlock.querySelectorAll('[data-select-title]');

			if (selectTitles.length > 0) {
				selectTitles.forEach(selectTitle => {
					if (hideSelectBody) {
						selectTitle.removeAttribute('tabindex');

						if (!selectTitle.classList.contains('active')) {
							selectTitle.nextElementSibling.hidden = true;
						}
					} else {
						selectTitle.setAttribute('tabindex', '-1');

						selectTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}


		// Закрываем остальные селекты, кроме одного
		function setSelectAction(e) {
			const el = e.target;

			if (el.hasAttribute('data-select-title') || el.closest('[data-select-title]')) {
				const selectTitle = el.hasAttribute('data-select-title') ? el : el.closest('[data-select-title]');

				const selectsBlock = selectTitle.closest('[data-selects]');

				const oneSelect = selectsBlock.hasAttribute('data-one-select') ? true : false;

				if (!selectsBlock.querySelectorAll('.slide').length) {
					if (oneSelect && !selectTitle.classList.contains('active')) {
						hideSpoilersBody(selectsBlock);
					}

					selectTitle.classList.toggle('active');

					slideToggle(selectTitle.nextElementSibling, durationSpeed);
				}

				e.preventDefault();
			}
		}
		// Конец. Закрываем остальные селекты, кроме одного


		// Скрываем контентную область
		function hideSpoilersBody(selectsBlock) {
			const selectActiveTitle = selectsBlock.querySelector('[data-select-title].active');

			if (selectActiveTitle) {
				selectActiveTitle.classList.remove('active');

				slideUp(selectActiveTitle.nextElementSibling, durationSpeed);
			}
		}
		// Конец. Скрываем контентную область


		// Обработка различных событий
		document.addEventListener("click", function (e) {
			const target = e.target;

			
			// Подмена текста в заголовке select при клике на data-select-option
			if (target.closest('[data-select-option]')) {
				const targetElText = target.innerText;

				const targetDataSelectWrapper = target.closest('[data-select-wrapper]');

				const targetSelectTitle = targetDataSelectWrapper.querySelector('[data-select-title]');

				if (targetSelectTitle) {
					targetSelectTitle.innerText = targetElText;
				}
			}
			// Конец. Подмена текста в заголовке select при клике на data-select-option


			// Закрытие select при клике вне его
			if (!target.closest('[data-selects]')) {
				const selectActiveTitles = document?.querySelectorAll('[data-select-title].active');

				selectActiveTitles.forEach(title => {
					title.classList.remove('active');

					slideUp(title.nextElementSibling, durationSpeed);
				});
			}
			// Конец. Закрытие select при клике вне его


			// Закрытие select при клике на data-select-option
			if (target.closest('[data-select-option]')) {
				const targetDataSelectWrapper = target.closest('[data-select-wrapper]');

				const targetSelectActiveTitle = targetDataSelectWrapper.querySelector('[data-select-title].active');

				if (targetSelectActiveTitle) {
					targetSelectActiveTitle.classList.remove('active');

					slideUp(targetSelectActiveTitle.nextElementSibling, durationSpeed);
				}
			}
			// Конец. Закрытие select при клике на data-select-option
		});
		// Конец. Обработка различных событий
	}

	// Плавное раскрытие селекта
	let slideUp = (target, duration = durationSpeed) => {
		if (!target.classList.contains('slide')) {
			target.classList.add('slide');

			target.style.transitionProperty = "height, margin, padding";

			target.style.transitionDuration = duration + 'ms';

			target.style.height = target.offsetHeight + 'px';

			target.offsetHeight;

			target.style.overflow = 'hidden';

			target.style.height = 0;

			target.style.paddingTop = 0;

			target.style.paddingBottom = 0;

			target.style.marginTop = 0;

			target.style.marginBottom = 0;

			window.setTimeout(() => {
				target.hidden = true;

				target.style.removeProperty('height');

				target.style.removeProperty('padding-top');

				target.style.removeProperty('padding-bottom');

				target.style.removeProperty('margin-top');

				target.style.removeProperty('margin-bottom');

				target.style.removeProperty('overflow');

				target.style.removeProperty('transition-property');

				target.style.removeProperty('transition-duration');

				target.classList.remove('slide');
			}, duration);
		}
	};
	// Конец. Плавное раскрытие селекта


	// Плавное закрытие селекта
	let slideDown = (target, duration = durationSpeed) => {
		if (!target.classList.contains('slide')) {
			target.classList.add('slide');
			if (target.hidden) {
				target.hidden = false;
			}
		}

		let height = target.offsetHeight;

		target.style.overflow = 'hidden';

		target.style.height = 0;

		target.style.paddingTop = 0;

		target.style.paddingBottom = 0;

		target.style.marginTop = 0;

		target.style.marginBottom = 0;

		target.offsetHeight;

		target.style.transitionProperty = "height, margin, padding";

		target.style.transitionDuration = duration + 'ms';

		target.style.height = height + 'px';

		target.style.removeProperty('padding-top');

		target.style.removeProperty('padding-bottom');

		target.style.removeProperty('margin-top');

		target.style.removeProperty('margin-bottom');

		window.setTimeout(() => {
			target.style.removeProperty('height');

			target.style.removeProperty('overflow');

			target.style.removeProperty('transition-property');

			target.style.removeProperty('transition-duration');

			target.classList.remove('slide');
		}, duration);
	};
	// Конец. Плавное закрытие селекта


	// Выбор между открытием и закрытием селекта
	let slideToggle = (target, duration = durationSpeed) => {
		if (target.hidden) {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	};
	// Конец. Выбор между открытием и закрытием селекта
}