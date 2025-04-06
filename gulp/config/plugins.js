// Локальный сервер
import browsersync from 'browser-sync';

// Отслеживание изменений в файлах
import changed from 'gulp-changed';

// Условное ветвление
import ifPlugin from 'gulp-if';

// Минимизация изображений
import imagemin from 'gulp-imagemin';

// Сообщения (подсказки)
import notify from 'gulp-notify';

// Обработка ошибок
import plumber from 'gulp-plumber';

// Переименовывание файлов
import rename from 'gulp-rename';

// Поиск и замена
import replace from 'gulp-replace';

// Экспортируемые объекты
export const plugins = {
	browsersync: browsersync,
	changed: changed,
	if: ifPlugin,
	imagemin: imagemin,
	notify: notify,
	plumber: plumber,
	rename: rename,
	replace: replace,
};
