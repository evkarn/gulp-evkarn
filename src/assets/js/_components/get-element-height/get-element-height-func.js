function getElementHeight(selector, varHeightName) {
	let elementName = document?.querySelector(selector).offsetHeight;

	const documentRoot = document.querySelector(':root');

	documentRoot.style.setProperty(varHeightName, `${elementName}px`);

	window.addEventListener('resize', () => {
		elementName = document?.querySelector(selector).offsetHeight;

		documentRoot.style.setProperty(varHeightName, `${elementName}px`);
	});
};

export default getElementHeight;
