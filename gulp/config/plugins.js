// Поиск и замена
import replace from "gulp-replace";

// Обработка ошибок
import plumber from "gulp-plumber";

// Сообщения (подсказки)
import notify from "gulp-notify";

// Локальный сервер
import browsersync from "browser-sync";

// Проверка обновлений
import newer from "gulp-newer";

// Условное ветвление
import ifPlugin from "gulp-if";

// Переименовывание файлов
import rename from 'gulp-rename';

// Сжатие CSS файла
import cleanCss from 'gulp-clean-css';

// Добавление вендерных префиксов для кросс-браузерной поддержки
import autoprefixer from 'gulp-autoprefixer';


// Экспортируемые объекты
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
	rename: rename,
	cleanCss: cleanCss,
	autoprefixer: autoprefixer,
};
