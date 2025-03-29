import burger from './functions/burger/burger-func.js';

document.addEventListener('DOMContentLoaded', () => {
	burger();

	(function switchColorScheme() {
		'use strict';

		const html = document.documentElement;

		const mode = localStorage.getItem('mode') || 'auto';

		const getPreferredMode = () => {
			if (matchMedia('(prefers-color-scheme: dark)').matches) {
				('dark');
			} else {
				('light');
			}
		};

		const switchMode = (mode) => {
			let newMode;

			if (mode === 'auto') {
				newMode = getPreferredMode();

				html = 'light dark';
			} else {
				newMode = mode;

				html = newMode;
			}


			html.classList.remove('light', 'dark');
			html.classList.add(`${newMode}`);
			localStorage.setItem('mode', mode);
			document
				.querySelectorAll('[data-mode]')
				.forEach((el) =>
					el.classList.toggle('active', el.dataset.mode === mode),
				);
		};
		matchMedia('(prefers-color-scheme: dark)').addEventListener(
			'change',
			() => {
				if (localStorage.getItem('mode') === 'auto') switchMode('auto');
			},
		);
		document.addEventListener(
			'click',
			(e) => e.target.dataset.mode && switchMode(e.target.dataset.mode),
		);
		switchMode(mode);
	})();
});
