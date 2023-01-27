import Swiper, { Navigation, Pagination } from 'swiper';

export const swiperFunction = () => {
	'use strict';

	const swiperEl = document?.querySelector('.el__slider');

	if (swiperEl) {
		const swiper = new Swiper('swiperEl', {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},

			pagination: {
				el: '.swiper-pagination',
				type: 'bullets'
			},

			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true
			}
		});
	}
};
