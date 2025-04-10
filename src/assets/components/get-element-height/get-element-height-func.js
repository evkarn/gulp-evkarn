function getElementHeight(selector, varHeightName) {
	function heightDetermination() {
		const element = document?.querySelector(selector);

		if (element) {
			const elementHeight = element.offsetHeight;

			const html = document.documentElement;

			html.style.setProperty(varHeightName, `${elementHeight}px`);
		}
	}

	heightDetermination();

	window.addEventListener('resize', () => {
		heightDetermination();
	});
}

export default getElementHeight;
