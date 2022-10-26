export function modalEvkarnInit() {
	'use strict';
	
	const modals = document?.querySelector( '[data-modals]' );

	if ( modals ) {
		const buttons = document.querySelectorAll( '[data-modal-path]' );

		const buttonsClose = document.querySelectorAll( '[data-modal-close]' );

		const modalsOverlay = document.querySelector( '[data-modals-overlay]' );

		const modals = document.querySelectorAll( '[data-modal-target]' );

		let disableScroll = function () {
			let pagePosition = window.scrollY;

			document.body.classList.add('body--stop-scroll');

			document.body.dataset.position = pagePosition;

			document.body.style.top = -pagePosition + 'px';
		};
	
		let enableScroll = function () {
			let pagePosition = parseInt(document.body.dataset.position, 10);

			document.body.style.top = 'auto';

			document.body.classList.remove('body--stop-scroll');

			window.scroll({ top: pagePosition, left: 0 });

			document.body.removeAttribute('data-position');
		};


		buttons.forEach((el) => {
			el.addEventListener('click', (e) => {
				let dataModalPath = e.currentTarget.getAttribute( 'data-modal-path' );

				modals.forEach((el) => {
					el.classList.remove('modal--visible');
				});

				const modalTarget = document.querySelector( `[data-modal-target="${dataModalPath}"]` );

				modalTarget.classList.add('modal--visible');

				modalsOverlay.classList.add('modals__overlay--visible');

				disableScroll();
			});
		});


		modalsOverlay.addEventListener('click', (e) => {
			if (e.target == modalsOverlay) {
				modalsOverlay.classList.remove('modals__overlay--visible');

				modals.forEach((el) => {
					el.classList.remove('modal--visible');
				});

				enableScroll();
			}
		});


		buttonsClose.forEach((el) => {
			el.addEventListener('click', (e) => {
				modalsOverlay.classList.remove('modals__overlay--visible');

				modals.forEach((el) => {
					el.classList.remove('modal--visible');
				});

				enableScroll();
			});
		});
	}
}