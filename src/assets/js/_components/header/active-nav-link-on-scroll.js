export function activeNavLinkOnScroll() {
	'use strict';
	
	// Помещаем все ссылки меню с атрибутом data-section в переменную
	const navLinksGoto = document.querySelectorAll('[data-goto]');

	// Находим все секции на странице и помещаем в переменную
	let sections = document.querySelectorAll('.section');

	// Помещаем все ссылки меню с атрибутом data-section в переменную
	const navLinksAll = document.querySelectorAll('nav a');

	// Находим высоту header и помещаем в переменную
	const headerHeight = document.querySelector('header').offsetHeight;

	window.addEventListener('scroll', () => {
		// Помещаем в переменную расстояние на которое прокрутили экран
		let scrollDistance = window.scrollY;

		let sectionCurrent = document.querySelector('.section--current');

		if (window.innerWidth > 768 && navLinksGoto.length > 0) {
			sections.forEach((el, i) => {
				if (el.offsetTop - headerHeight <= scrollDistance && el.offsetTop + el.offsetHeight >= scrollDistance) {
					el.classList.add('section--current');

					// nav.find('a[data-goto=".'+$(this).attr('id')+'"]').addClass('active');
	
					// document.querySelectorAll('.nav li')[i].querySelector('a').classList.add('active');
				} else {
					el.classList.remove('section--current');
				}

				if (el.classList.contains('section--current')) {
					let sectionCurrent = el;

					let dataSectionCurrent = sectionCurrent.dataset.section;

					navLinksAll.forEach((el) => {
						if (el.classList.contains('active')) {
							el.classList.remove('active');
						}

						if (el.dataset.goto === dataSectionCurrent) {
							el.classList.add('active');
						}
					});
				}
			});

			if (!sectionCurrent) {
				navLinksGoto.forEach((el) => {
					if (el.classList.contains('active')) {
						el.classList.remove('active');
					}
				});
			}
		}
	});
}