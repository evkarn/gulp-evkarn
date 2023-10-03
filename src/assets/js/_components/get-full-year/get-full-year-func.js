const getFullYear = () => {
	'use strict';
	
	const yearEl = document?.querySelector('.year');

	if (yearEl) {
		yearEl.innerHTML = new Date().getFullYear();
	}
};

export default getFullYear;
