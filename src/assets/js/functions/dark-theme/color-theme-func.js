const darkTheme = ((e) => {
	'use strict';

	const btnColorScheme = document.querySelector('[data-dark-theme-btn]');

	// 1. Проверка темной темы на уровне системных настроек
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		btnColorScheme.classList.add('dark-mode-btn--active');
		document.body.classList.add('dark');
	}

	// 2. Проверка темной темы в localStorage
	if (localStorage.getItem('colorScheme') === 'dark') {
		btnColorScheme.classList.add('dark-mode-btn--active');
		document.body.classList.add('dark');
	} else if (localStorage.getItem('colorScheme') === 'light') {
		btnColorScheme.classList.remove('dark-mode-btn--active');
		document.body.classList.remove('dark');
	}

	// Если меняются системные настройки, меняем тему
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', (event) => {
			const newColorScheme = event.matches ? 'dark' : 'light';

			if (newColorScheme === 'dark') {
				btnColorScheme.classList.add('dark-mode-btn--active');
				document.body.classList.add('dark');
				localStorage.setItem('colorScheme', 'dark');
			} else {
				btnColorScheme.classList.remove('dark-mode-btn--active');
				document.body.classList.remove('dark');
				localStorage.setItem('colorScheme', 'light');
			}
		});

	// Включение ночного режима по кнопке
	btnColorScheme.onclick = function () {
		btnColorScheme.classList.toggle('dark-mode-btn--active');
		const isDark = document.body.classList.toggle('dark');

		if (isDark) {
			localStorage.setItem('colorScheme', 'dark');
		} else {
			localStorage.setItem('colorScheme', 'light');
		}
	};
})();
