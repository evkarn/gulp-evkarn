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
import { copyConfigFiles } from './gulp/tasks/copy-config-files.js';

import { copyFaviconImages } from './gulp/tasks/copy-favicon-images.js';

import { copyFiles } from './gulp/tasks/copy-files.js';

import { copySpecialCSS } from './gulp/tasks/copySpecialCSS.js';

import { copySpecialJS } from './gulp/tasks/copySpecialJS.js';

import { ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';

import { ftp } from './gulp/tasks/ftp.js';

import { html } from './gulp/tasks/html.js';

import { img } from './gulp/tasks/img.js';

import { imgAvif } from './gulp/tasks/imgAvif.js';

import { imgMin } from './gulp/tasks/imgMin.js';

import { imgSVG } from './gulp/tasks/imgSVG.js';

import { imgWebp } from './gulp/tasks/imgWebp.js';

import { js } from './gulp/tasks/js.js';

import { reset } from './gulp/tasks/reset.js';

import { sassStyle } from './gulp/tasks/sass.js';

import { server } from './gulp/tasks/server.js';

import { ssh } from './gulp/tasks/ssh.js';

import { svgSpriteIcons } from './gulp/tasks/svgSprite.js';

import { zip } from './gulp/tasks/zip.js';


// Наблюдение за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.cssSpecial, copySpecialCSS);

	gulp.watch(path.watch.jsSpecial, copySpecialJS);

	gulp.watch(path.watch.files, copyFiles);

	gulp.watch(path.watch.html, html);

	gulp.watch(path.watch.sass, sassStyle);

	gulp.watch(path.watch.js, js);

	gulp.watch(path.watch.img, gulp.parallel(img, imgSVG));
}


// Последовательность обработки шрифтов
const fonts = gulp.series(ttfToWoff, fontsStyle);


// Основные задачи
const mainTasks = gulp.series(fonts, imgWebp, gulp.parallel(copyFiles, copySpecialCSS, html, copyConfigFiles, copyFaviconImages, sassStyle, js, img, imgSVG), imgMin);


// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

const build = gulp.series(reset, mainTasks);

const deployZip = gulp.series(reset, mainTasks, zip);

const deployFTP = gulp.series(reset, mainTasks, ftp);

const deploySSH = gulp.series(reset, mainTasks, ssh);


// Экспорт сценариев
export { dev };

export { build };

export { deployZip };

export { deployFTP };

export { deploySSH };

export { svgSpriteIcons };


// Выполнение сценариев по-умолчанию
gulp.task('default', dev);