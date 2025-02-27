import SimpleBar from 'simplebar';

export const simpleBarFunction = () => {
	'use strict';

	const element = document?.querySelector('[data-simple-bar]');

	if (element) {
		new SimpleBar(element, {});
	}
};

export const simpleBarArrayFunction = () => {
	'use strict';

	const elements = document?.querySelectorAll('[data-simple-bar-for-array]');

	if (element) {
		Array.prototype.forEach.call(elements, (el) => new SimpleBar({}));
	}
};
