// IMPORT HEADER
// import { headerMain } from './src/_utils/header/index.js';
// END. IMPORT HEADER


	// INIT HEADER
		// headerMain();
	// END. INIT HEADER

export function headerMain() {
	'use strict';
	
	// Помещаем body в переменную
	const body = document.body;

	// Находим все секции на странице и помещаем в переменную
	const sections = document?.querySelectorAll('.section');

	// Помещаем header в переменную
	const header = document?.querySelector('header');

	// Высчитываем высоту header
	const headerHeight = header.offsetHeight;

	// Помещаем nav в переменную
	const nav = document?.querySelector('[data-nav]');

	// Помещаем все nav__link в переменную
	const navLinks = nav?.querySelectorAll('a');

	// Помещаем все ссылки меню с атрибутом data-goto в переменную
	const navLinksGoto = document?.querySelectorAll('[data-goto]');

	// Помещаем burger в переменную
	const burger = document?.querySelector('[data-burger]');

	// Помещаем nav-btn-close в переменную
	const navBtnClose = document?.querySelector('[data-nav-close]');


	let disableScroll = function () {
		let pagePosition = window.scrollY;

		document.body.classList.add('stop-scroll');

		document.body.dataset.position = pagePosition;

		document.body.style.top = -pagePosition + 'px';
	};


	let enableScroll = function () {
		let pagePosition = parseInt(document.body.dataset.position, 10);

		document.body.style.top = 'auto';

		document.body.classList.remove('stop-scroll');

		window.scroll({ top: pagePosition, left: 0 });

		document.body.removeAttribute('data-position');
	};


	// Создаём переменную и записываем в неё высоту header
	document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);

	burger.addEventListener('click', () => {
		burger.classList.add('burger--active');

		nav.classList.add('nav--visible');

		disableScroll();
	});

	
	navBtnClose.addEventListener('click', () => {
		burger.classList.remove('burger--active');

		nav.classList.remove('nav--visible');

		enableScroll();
	});


	navLinks.forEach(el => {
		el.addEventListener('click', () => {
			burger.classList.remove('burger--active');

			nav.classList.remove('nav--visible');

			enableScroll();
		});
	});


	// Прокрутка до блока по клику на ссылку
	if (document.querySelector('[data-scroll-links]')) {
		if(navLinksGoto.length > 0) {
			// Проходимся по всем ссылкам и отслеживаем клик по ним, при клике выполняем функцию onMenuLinkClick
			navLinksGoto.forEach(menuLink => {
				menuLink.addEventListener('click', onMenuLinkClick);
			});

			function onMenuLinkClick(e) {
				// Помещаем в переменную ссылку по которой кликнули
				const menuLink = e.target;

				const dataSet = menuLink.dataset.goto;

				// Если у ссылки есть атрибут data-goto и в DOM есть элемент с таким классом или id
				if(dataSet && document.querySelector(dataSet)){
					// Помещаем элемент с классом или id как в атрибуте data-goto в переменную
					const gotoBlock = document.querySelector(dataSet);

					// Рассчитываем положение этого элемента на странице минус высоту header
					const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - headerHeight;

					// Прокручиваем страницу до этого элемента
					window.scrollTo({
						top: gotoBlockValue,

						behavior: "smooth"
					});

					e.preventDefault();
				}
			}
		}
	}
	

	// Добавление ссылке класса active при докрутке до конкретного блока
	if (document.querySelector('[data-active-link]')) {
		window.addEventListener('scroll', () => {
			// Помещаем в переменную расстояние на которое прокрутили экран
			let scrollDistance = window.pageYOffset; 

			// Помещаем в переменную секцию с классом section--current
			let sectionCurrent = document.querySelector('.section--current');

			if (window.innerWidth > 768 && navLinksGoto.length > 0) {
				sections.forEach((el, i) => {
					if (el.offsetTop - headerHeight <= scrollDistance && el.offsetTop + el.offsetHeight >= scrollDistance) {
						el.classList.add('section--current');
					} else {
						el.classList.remove('section--current');
					}

					if (el.classList.contains('section--current')) {
						let sectionCurrent = el;

						let dataSectionCurrent = sectionCurrent.dataset.section;

						navLinks.forEach((el) => {
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
}