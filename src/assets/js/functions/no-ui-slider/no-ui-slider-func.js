import noUiSlider from 'nouislider';

export const noUiSliderFunction = () => {
	const sliderEl = document.getElementById('.element');

	noUiSlider.create(sliderEl, {
		start: [20, 80],

		connect: true,

		range: {
			min: 0,
			max: 100,
		},
	});
};
