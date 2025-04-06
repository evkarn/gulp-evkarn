import burger from './functions/burger/burger-func.js';

document.addEventListener('DOMContentLoaded', () => {
	class ThemeManager {
		/** Доступные темы */
		static THEMES = {
			LIGHT: 'light',
			DARK: 'dark',
			AUTO: 'auto',
		};

		/** Ключ для localStorage */
		static STORAGE_KEY = 'theme-preference';

		constructor() {
			this.html = document.documentElement;
			this.init();
		}

		/** Инициализация менеджера тем */
		init() {
			this.setupEventListeners();
			this.applyTheme(this.getSavedTheme());
		}

		/** Получает сохранённую тему или определяет автоматически */
		getSavedTheme() {
			// Проверяем, доступен ли localStorage (на сервере его нет)
			if (typeof localStorage === 'undefined') return ThemeManager.THEMES.AUTO;

			const savedTheme = localStorage.getItem(ThemeManager.STORAGE_KEY);

			// Проверяем, что тема валидна
			if (Object.values(ThemeManager.THEMES).includes(savedTheme)) {
				return savedTheme;
			}

			return ThemeManager.THEMES.AUTO; // По умолчанию
		}

		/** Получает текущую системную тему */
		getSystemTheme() {
			return window.matchMedia('(prefers-color-scheme: dark)').matches
				? ThemeManager.THEMES.DARK
				: ThemeManager.THEMES.LIGHT;
		}

		/** Применяет выбранную тему */
		applyTheme(theme) {
			let effectiveTheme = theme;

			// Если выбрано 'auto', используем системную тему
			if (theme === ThemeManager.THEMES.AUTO) {
				effectiveTheme = this.getSystemTheme();
				this.html.style.colorScheme = 'light dark'; // Поддержка стандартных элементов
			} else {
				this.html.style.colorScheme = effectiveTheme;
			}

			// Обновляем класс на <html>
			this.html.classList.remove(
				ThemeManager.THEMES.LIGHT,
				ThemeManager.THEMES.DARK,
			);
			this.html.classList.add(effectiveTheme);

			// Сохраняем выбор пользователя
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem(ThemeManager.STORAGE_KEY, theme);
			}

			// Обновляем активные кнопки (если есть)
			this.updateActiveButtons(theme);
		}

		/** Обновляет активное состояние кнопок переключения темы */
		updateActiveButtons(activeTheme) {
			document.querySelectorAll('[data-theme]').forEach((button) => {
				const buttonTheme = button.dataset.theme;
				button.classList.toggle('active', buttonTheme === activeTheme);
				button.setAttribute('aria-pressed', buttonTheme === activeTheme);
			});
		}

		/** Настраивает обработчики событий */
		setupEventListeners() {
			// Клик по кнопкам темы
			document.addEventListener('click', (e) => {
				const themeButton = e.target.closest('[data-theme]');
				if (themeButton) {
					this.applyTheme(themeButton.dataset.theme);
				}
			});

			// Следим за изменением системной темы (если выбрано 'auto')
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			mediaQuery.addEventListener('change', () => {
				if (this.getSavedTheme() === ThemeManager.THEMES.AUTO) {
					this.applyTheme(ThemeManager.THEMES.AUTO);
				}
			});
		}
	}

	// Запуск только в браузере (не на сервере)
	if (typeof document !== 'undefined') {
		new ThemeManager();
	}
});
