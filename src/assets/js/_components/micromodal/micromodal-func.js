
import MicroModal from 'micromodal';

import disableScroll from '../disable-scroll/disable-scroll-func.js';

import enableScroll from '../enable-scroll/enable-scroll-func.js';

function micromodal() {
	'use strict';

	const modalsParent = document?.querySelector('.modals');

	if (modalsParent) {
		function onShow(modal) {
			console.info(`${modal.id} is shown`);

			disableScroll();
		}

		function onClose(modal) {
			console.info(`${modal.id} is hidden`);

			enableScroll();
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

export default micromodal;
