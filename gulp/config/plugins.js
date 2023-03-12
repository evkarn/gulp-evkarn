// Добавление вендерных префиксов для кросс-браузерной поддержки
import autoprefixer from 'gulp-autoprefixer';

// Локальный сервер
import browsersync from "browser-sync";

// Сжатие CSS файла
import cleanCss from 'gulp-clean-css';

// Условное ветвление
import ifPlugin from "gulp-if";

// Сообщения (подсказки)
import notify from "gulp-notify";

// Проверка обновлений
import newer from "gulp-newer";

// Обработка ошибок
import plumber from "gulp-plumber";

// Переименовывание файлов
import rename from 'gulp-rename';

// Поиск и замена
import replace from "gulp-replace";

// Обработка SVG
import svgoMin from 'gulp-svgo';


// Экспортируемые объекты
export const plugins = {
	autoprefixer: autoprefixer,
	browsersync: browsersync,
	cleanCss: cleanCss,
	if: ifPlugin,
	notify: notify,
	newer: newer,
	plumber: plumber,
	rename: rename,
	replace: replace,
	svgoMin: svgoMin,
};
