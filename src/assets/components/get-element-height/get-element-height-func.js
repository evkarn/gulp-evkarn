function getElementHeight(selector, varHeightName) {
	const heightDetermination = () => {
		const element = document?.querySelector(selector);

		if (element) {
			const elementHeight = element.offsetHeight;

			const html = document.documentElement;

			html.style.setProperty(varHeightName, `${elementHeight}px`);
		}

		window.removeEventListener('resize', heightDetermination);
	}


	window.addEventListener('resize', heightDetermination);

	heightDetermination();
}

export default getElementHeight;
