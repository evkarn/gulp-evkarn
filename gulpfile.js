// Основной модуль
import gulp from 'gulp';

// Импорт путей к файлам и папкам
import { path } from './gulp/config/path.js';

// Импорт плагинов
import { plugins } from './gulp/config/plugins.js';

// Передача значений в глобальную переменную для удобства настройки
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
};

// Импорт созданных задач из папки tasks
import { copyFiles } from './gulp/tasks/copy-files.js';
import { copyFavFiles } from './gulp/tasks/copy-fav-files.js';
import { copyFavFolder } from './gulp/tasks/copy-fav-folder.js';

import { reset } from './gulp/tasks/reset.js';

import { html } from './gulp/tasks/html.js';

import { server } from './gulp/tasks/server.js';

import { sassStyle } from './gulp/tasks/sass.js';

import { js } from './gulp/tasks/js.js';

import { img } from './gulp/tasks/img.js';
import { imgWebp } from './gulp/tasks/imgWebp.js';
import { imgSVG } from './gulp/tasks/imgSVG.js';
import { imgMin } from './gulp/tasks/imgMin.js';

import { ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';

import { svgSpriteIcons } from './gulp/tasks/svgSprite.js';

import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// Наблюдение за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, copyFiles);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.sass, sassStyle);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.img, gulp.parallel(img, imgSVG));
}

// Последовательность обработки шрифтов
const fonts = gulp.series( ttfToWoff, fontsStyle );

// Последовательность обработки favicon
const favicon = gulp.series( copyFavFiles, copyFavFolder );

// Основные задачи
const mainTasks = gulp.series( fonts, favicon, imgWebp, gulp.parallel(copyFiles, html, sassStyle, js, img, imgSVG ), imgMin);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
export { dev };
export { build };
export { deployZip };
export { deployFTP };
export { svgSpriteIcons };

// Выполнение сценариев по-умолчанию
gulp.task('default', dev);