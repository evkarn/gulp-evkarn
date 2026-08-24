// Единый реестр gulp-плагинов сборки.
// Любой таск получает доступ к ним через global.app.plugins.
//
// Локальный сервер и синхронизация браузера
import browsersync from 'browser-sync';

// Работа с файловой системой (используется таском шрифтов)
import fs from 'fs';

// Отслеживание изменений в файлах (сравнение с копией в dist)
import changed from 'gulp-changed';
import newer from 'gulp-newer';

// Условное ветвление внутри потока
import ifPlugin from 'gulp-if';

// Минимизация изображений
import imagemin from 'gulp-imagemin';

// Обработка ошибок без падения вотчера
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
	fs: fs,
	newer: newer,
	plumber: plumber,
	rename: rename,
	replace: replace,
};
