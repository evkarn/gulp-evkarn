export const stopStartScroll = () => {
	'use strict';
	
	let pagePosition = 0;



	const disableScroll = () => {
		let pagePosition = window.scrollY;

		document.body.style.cssText = `
			position: fixed;
			top: -${pagePosition}px;
			left: 0;
			height: 100vh;
			width: 100vw;
			margin-right: ${window.innerWidth - document.body.offsetWidth}px;
			overflow: hidden;
		`;

		document.documentElement.style.scrollBehavior = 'unset';
	};

	const enableScroll = () => {
		document.body.style.cssText = '';

		window.scroll({ top: pagePosition, left: 0 });

		document.documentElement.style.scrollBehavior = '';
	};
};

