import FsLightbox from 'fslightbox';

import disableScroll from '../disable-scroll/disable-scroll-func.js';

import enableScroll from '../enable-scroll/enable-scroll-func.js';

export function lightbox() {
	fsLightboxInstances['portfolio'].props.onOpen = function () {
		disableScroll();
	};

	fsLightboxInstances['portfolio'].props.onClose = function () {
		enableScroll();
	};
}
