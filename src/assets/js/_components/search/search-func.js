export const search = function () {
	'use strict';

	const searchButton = document?.querySelector('[data-search-button]');

	const searchBlock = document?.querySelector('[data-search-block]');

	const headerHeight = document.querySelector('header').offsetHeight;

	document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

	if (searchButton && searchBlock) {
		searchButton.addEventListener('click', function () {
			searchBlock.classList.toggle('search-block--visible');
		});
	}

	document.addEventListener('keydown', function (e) {
		if (e.code == 'Escape' && searchBlock.classList.contains('search-block--visible')) {
			searchBlock.classList.remove('search-block--visible');
		}
	});

	window.addEventListener('click', e => {
		if (!e.target.closest('.search-block') && !e.target.closest('.header')) {
			searchBlock.classList.remove('search-block--visible');
		}
	});
};
