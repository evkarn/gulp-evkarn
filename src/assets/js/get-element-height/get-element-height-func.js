function getElementHeight(selector, varHeightName) {
	function heightDetermination() {
		const element = document?.querySelector(selector);

		if (element) {
			const elementHeight = element.offsetHeight;

			const documentRoot = document.querySelector(':root');

			documentRoot.style.setProperty(varHeightName, `${elementHeight}px`);
		}
	}

	heightDetermination();

	window.addEventListener('resize', () => {
		heightDetermination();
	});
}

export default getElementHeight;
