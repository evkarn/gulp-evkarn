// INIT ADAPTIVE-SPOILERS
/*
		Для родителя спойлеров пишем атрибут data-spoilers-list

		Для заголовков спойлеров пишем атрибут data-spoiler

		Если нужно включить/выключить работу спойлеров на разных размерах экранов пишем параметры ширины и типа брейкпоинта.

		Например:
			data-spoilers-list="992,max" — спойлеры будут работать только на экранах меньше или равно 992px

			data-spoilers-list="768,min" — спойлеры будут работать только на экранах больше или равно 768px

			Если нужно чтобы в блоке открывался только один спойлер добавляем родителю атрибут data-one-spoiler

			500 в скобках — время открытия и закрытия спойлера в мс
		*/

// adaptiveSpoilers(500);

// END. INIT ADAPTIVE-SPOILERS

function spoilers(durationSpeed) {
	'use strict';

	// Собираем все элементы с атрибутом data-spoilers-list
	const spoilersArray = document.querySelectorAll('[data-spoilers-list]');

	// Проверяем есть ли они
	if (spoilersArray.length > 0) {
		// Получение обычных спойлеров
		const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
			return !item.dataset.spoilers.split(',')[0];
		});

		// Инициализация обычных спойлеров
		if (spoilersRegular.length > 0) {
			initSpoilers(spoilersRegular);
		}

		// Получение спойлеров с медиазапросами
		const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
			return item.dataset.spoilers.split(',')[0];
		});

		// Инициализация спойлеров с медиазапросами
		if (spoilersMedia.length > 0) {
			const breakpointsArray = [];

			spoilersMedia.forEach((item) => {
				const params = item.dataset.spoilers;

				const breakpoint = [];

				const paramsArray = params.split(',');

				breakpoint.value = paramsArray[0];

				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';

				breakpoint.item = item;

				breakpointsArray.push(breakpoint);
			});

			// Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
			});

			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});

			// Работаем с каждым брейкпоинтом
			mediaQueries.forEach((breakpoint) => {
				const paramsArray = breakpoint.split(',');

				const mediaBreakpoint = paramsArray[1];

				const mediaType = paramsArray[2];

				const matchMedia = window.matchMedia(paramsArray[0]);

				// Объекты с нужными условиями
				const spoilersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});

				// Событие
				matchMedia.addListener(function () {
					initSpoilers(spoilersArray, matchMedia);
				});

				initSpoilers(spoilersArray, matchMedia);
			});
		}
	}

	// Инициализация
	function initSpoilers(spoilersArray, matchMedia = false) {
		spoilersArray.forEach((spoilersBlock) => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;

			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add('init');

				initSpoilerBody(spoilersBlock);

				spoilersBlock.addEventListener('click', setSpoilerAction);
			} else {
				spoilersBlock.classList.remove('init');

				initSpoilerBody(spoilersBlock, false);

				spoilersBlock.removeEventListener('click', setSpoilerAction);
			}
		});
	}

	// Работа с контентом
	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
		const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler-title]');

		if (spoilerTitles.length > 0) {
			spoilerTitles.forEach((spoilerTitle) => {
				if (hideSpoilerBody) {
					spoilerTitle.removeAttribute('tabindex');

					if (!spoilerTitle.classList.contains('active')) {
						const spoilerTitleParent = spoilerTitle?.closest('[data-spoiler]');

						if (spoilerTitleParent) {
							const targetContent = spoilerTitleParent.querySelector('[data-spoiler-content]');

							targetContent.hidden = true;
						}
					}
				} else {
					spoilerTitle.setAttribute('tabindex', '-1');

					const spoilerTitleParent = spoilerTitle?.closest('[data-spoiler]');

					if (spoilerTitleParent) {
						const targetContent = spoilerTitleParent.querySelector('[data-spoiler-content]');

						targetContent.hidden = false;
					}
				}
			});
		}
	}

	function setSpoilerAction(e) {
		const el = e.target;

		if (el.hasAttribute('data-spoiler-title') || el.closest('[data-spoiler-title]')) {
			const spoilerTitle = el.hasAttribute('data-spoiler-title') ? el : el.closest('[data-spoiler-title]');

			const spoilersBlock = spoilerTitle.closest('[data-spoilers-list]');

			const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;

			if (!spoilersBlock.querySelectorAll('.slide').length) {
				if (oneSpoiler && !spoilerTitle.classList.contains('active')) {
					hideSpoilersBody(spoilersBlock);
				}

				spoilerTitle.classList.toggle('active');

				const spoilerTitleParent = spoilerTitle.closest('[data-spoiler]');

				const targetContent = spoilerTitleParent.querySelector('[data-spoiler-content]');

				slideToggle(targetContent, durationSpeed);
			}
			e.preventDefault();
		}
	}

	function hideSpoilersBody(spoilersBlock) {
		const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler-title].active');

		const activeTitleParent = spoilerActiveTitle.closest('[data-spoiler]');

		const targetContent = activeTitleParent.querySelector('[data-spoiler-content]');

		if (spoilerActiveTitle) {
			spoilerActiveTitle.classList.remove('active');

			slideUp(targetContent, durationSpeed);
		}
	}

	let slideUp = (target, duration = durationSpeed) => {
		if (!target.classList.contains('slide')) {
			target.classList.add('slide');

			target.style.transitionProperty = 'height, margin, padding';

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

		target.style.transitionProperty = 'height, margin, padding';

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

	let slideToggle = (target, duration = durationSpeed) => {
		if (target.hidden) {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	};
}

export default spoilers
