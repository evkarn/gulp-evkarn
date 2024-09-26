import MicroModal from 'micromodal';
import disableScroll from '../disable-scroll/disable-scroll-func.js';
import enableScroll from '../enable-scroll/enable-scroll-func.js';

function micromodal() {
	'use strict';

	const modals = document?.querySelectorAll('.modal');

	if (modals.length > 0) {
		function onShow(modal) {
			console.info(`${modal.id} is shown`);

			disableScroll();
		}

		function onClose(modal) {
			console.info(`${modal.id} is hidden`);

			enableScroll();

			const iFrames = document?.querySelectorAll('.modal .video__iframe');

			if (iFrames.length > 0) {
				iFrames.forEach((item) => {
					item.src = item.src;
				});
			}

			const videos = document?.querySelectorAll('video');

			if (videos.length > 0) {
				videos.forEach((item) => {
					item.pause();
				});
			}
		}

		MicroModal.init({
			onShow: onShow,
			onClose: onClose,
			disableScroll: true,
			awaitOpenAnimation: true,
			awaitCloseAnimation: true,
		});
	}
}

export default micromodal;
