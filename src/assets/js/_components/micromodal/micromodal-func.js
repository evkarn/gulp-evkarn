
import MicroModal from 'micromodal';

export function micromodal() {
	'use strict';

	const modalsParent = document?.querySelector('.modals');

	const scrollWidth = window.innerWidth - document.body.offsetWidth;

	document.querySelector(':root').style.setProperty('--scroll-width', `${scrollWidth}px`);

	if (modalsParent) {
		function onShow(modal) {
			console.info(`${modal.id} is shown`);

			let pagePosition = window.scrollY;

			document.body.classList.add('stop-scroll');

			document.body.dataset.position = pagePosition;

			document.querySelector(':root').style.setProperty('--top-position', `-${pagePosition}px`);

			document.documentElement.style.scrollBehavior = 'unset';
		}

		function onClose(modal) {
			console.info(`${modal.id} is hidden`);

			let pagePosition = parseInt(document.body.dataset.position, 10);

			document.body.classList.remove('stop-scroll');

			window.scroll({ top: pagePosition, left: 0 });

			document.body.removeAttribute('data-position');

			document.querySelector(':root').style.setProperty('--top-position', 'auto');

			document.documentElement.style.scrollBehavior = '';
		}

		MicroModal.init({
			onShow: onShow,
			onClose: onClose,
			openTrigger: 'data-modal-open',
			closeTrigger: 'data-modal-close',
			openClass: 'is-open',
			disableScroll: true,
			disableFocus: false,
			awaitOpenAnimation: true,
			awaitCloseAnimation: true,
			debugMode: false
		});
	}
}
