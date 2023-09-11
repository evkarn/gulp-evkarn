// Локальный сервер
import browsersync from "browser-sync";

// Условное ветвление
import ifPlugin from "gulp-if";

// Минимизация изображений
import imagemin from 'gulp-imagemin';

// Сообщения (подсказки)
import notify from "gulp-notify";

import changed from "gulp-changed";

// Обработка ошибок
import plumber from "gulp-plumber";

// Переименовывание файлов
import rename from 'gulp-rename';

// Поиск и замена
import replace from "gulp-replace";


// Экспортируемые объекты
export const plugins = {
	browsersync: browsersync,
	if: ifPlugin,
	imagemin: imagemin,
	notify: notify,
	changed: changed,
	plumber: plumber,
	rename: rename,
	replace: replace,
};
