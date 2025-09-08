export function getElementHeight(selector, varHeightName) {
	function heightDetermination() {
		const element = document?.querySelector(`${selector}`);

		if (element) {
			const elementHeight = element.offsetHeight;

			const documentRoot = document.documentElement;

			documentRoot.style.setProperty(
				`--${varHeightName}`,
				`${elementHeight}px`,
			);
		}
	}

	heightDetermination();

	window.addEventListener('resize', heightDetermination);
}
