// IMPORT
import { webpFind } from './_components/index.js';
// END. IMPORT

import Swiper, { Navigation } from 'swiper';


import MicroModal from 'micromodal';


document.addEventListener('DOMContentLoaded', () => {

	MicroModal.init({
		// Оповещения в консоли об открытии окна
		onShow: modal => console.info(`${modal.id} показано`),

		// Оповещения в консоли о закрытии окна
		onClose: onClose,

		// Отключает прокрутку на странице, когда открыто модальное окно. Значение по умолчанию — false
		disableScroll: true,

		// Отключает автофокус на первом фокусируемом элементе. Значение по умолчанию — false
		disableFocus: true,

		// Установите для этого параметра значение true, если вы используете анимацию css для открытия модального окна. Это позволяет ему дождаться завершения анимации, прежде чем сфокусироваться на элементе внутри модального окна. Значение по умолчанию — false
		awaitOpenAnimation: true,

		// Установите значение true, если используете анимацию css, чтобы скрыть модальное окно. Это позволяет ему дождаться завершения анимации, прежде чем удалять ее из DOM. Значение по умолчанию — false
		awaitCloseAnimation: true,
	});

	function onClose(modal) {
    console.info(`${modal.id} скрыто`);

		var instaProjectsItems = document.querySelectorAll( '.insta-projects__item' );

		instaProjectsItems.forEach(el => {
			el.classList.remove( 'insta-projects__item--active' );
		});
  }


	// Отработка табов проектов из инстаграмм
	function instaContentActivate() {
		'use strict';
	
		var instaProjects = document.querySelector( '.insta-projects' );
	
		var instaProjectsItems = document.querySelectorAll( '.insta-projects__item' );

		if ( instaProjects ) {
			instaProjects.addEventListener('click', (e) => {
				if ( e.target.closest( '.insta-projects__item' ) ) {
					var dataProjectName = e.target.closest( '.insta-projects__item' ).dataset.projectName;

					instaProjectsItems.forEach(el => {
						el.classList.remove( 'insta-projects__item--active' );
					});
	
					var projectItemDataName = document.querySelector( `[data-project-name="${dataProjectName}"]` );
	
					projectItemDataName.classList.add( 'insta-projects__item--active' );

					var modalActive = document.querySelector( '.modal.is-open' );

					if (modalActive) {
						var projectContentDataTarget = document.querySelector( `[data-project-target="${dataProjectName}"]` );

						console.log(projectContentDataTarget);

						var blockProjectsContents = document.querySelectorAll( `[data-project-target]` );

						blockProjectsContents.forEach(el => {
							el.classList.remove( 'insta-projects-content--active' );
						});

						projectContentDataTarget.classList.add( 'insta-projects-content--active' );

						const swiperTargetSlider = new Swiper(`[data-project-target-slider="${dataProjectName}"]`, {
							modules: [Navigation],

							navigation: {
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							},
						});
					}


	
					// tabsHandler(dataProjectName);
				}
			});


		}


		// function tabsHandler( path ) {
		// 	tabsContent.forEach(el => {
		// 		el.classList.remove('tabs__content--active');
		// 	});
	
		// 	const dataTabsTarget = document.querySelector(`[data-tabs-target="${path}"]`);
	
		// 	dataTabsTarget.classList.add('tabs__content--active');
		// }
	}
	instaContentActivate();


	function closeProjectsItem() {
		var instaProjectsItems = document.querySelectorAll( '.insta-projects__item' );

		document.addEventListener("click", function (e) {
			if (!e.target.closest( '.insta-projects__list' )) {
				instaProjectsItems.forEach(el => {
					el.classList.remove( 'insta-projects__item--active' );
				});
			}
		});
	}
	closeProjectsItem();




	// Отработка кнопки — Показать ещё
	function showMore() {
		'use strict';

		var showMoreButton = document.querySelector( '.show-more' );

		var projectsLength = document.querySelectorAll( '.insta-projects__item' ).length;

		var itemsActiveAmount = 6;
	
		showMoreButton.addEventListener('click', () => {
			itemsActiveAmount += 3;
			
			var array = Array.from(document.querySelector('.insta-projects__list').children);

			var visibleItems = array.slice(0, itemsActiveAmount);
	
			visibleItems.forEach(el => el.classList.add('is-visible'));
	
			if (visibleItems.length === projectsLength) {
				showMoreButton.style.display = 'none';
			}
		});
	}
	showMore();
	// Конец. Отработка кнопки — Показать ещё





	// INIT WEBP-FIND
		webpFind();
	// END. INIT WEBP-FIND
});