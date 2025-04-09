// Основной модуль
import gulp from 'gulp';

// Импорт путей к файлам и папкам
import { path } from './gulp/config/path.js';

// Импорт настроек для шрифтов
import { fontsVars } from './gulp/config/fonts.js';

// Импорт плагинов
import { plugins } from './gulp/config/plugins.js';

// Передача значений в глобальную переменную для удобства настройки
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	fontsVars: fontsVars,
	gulp: gulp,
	plugins: plugins
};

// Импорт созданных задач из папки tasks
import copyConfigFiles from './gulp/tasks/copy-config-files.js';
import copyFiles from './gulp/tasks/copy-files.js';
import copyFavicon from './gulp/tasks/copy-favicon.js';
import ttfToWoff from './gulp/tasks/ttf-to-woff.js';
import createFontsFaces from './gulp/tasks/fonts-faces.js';
import ftp from './gulp/tasks/ftp.js';
import html from './gulp/tasks/html.js';
import svgMin from './gulp/tasks/svgMin.js';
import sprite from './gulp/tasks/sprite.js';
import imgMin from './gulp/tasks/imgMin.js';
import imgAvif from './gulp/tasks/imgAvif.js';
import imgWebp from './gulp/tasks/imgWebp.js';
import js from './gulp/tasks/js.js';
import reset from './gulp/tasks/reset.js';
import styles from './gulp/tasks/styles.js';
import server from './gulp/tasks/server.js';
import ssh from './gulp/tasks/ssh.js';
import zip from './gulp/tasks/zip.js';

// Наблюдение за изменениями в файлах
function watcher(done) {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.files, copyFiles);
	gulp.watch(path.watch.img, gulp.series(imgAvif, imgWebp, imgMin));
	gulp.watch(path.watch.svg, svgMin);
	gulp.watch(path.watch.sprite, sprite);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.styles, styles);
	done();
}

// Последовательность обработки шрифтов
const fonts = gulp.series(ttfToWoff, createFontsFaces);

// Основные задачи
const mainTasks = gulp.parallel(
	html,
	styles,
	js,
	gulp.series(imgMin, imgAvif, imgWebp),
	sprite,
	svgMin,
	copyFiles,
	copyFavicon,
	copyConfigFiles,
);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, watcher, server);
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, zip);
const deployFTP = gulp.series(reset, ftp);
const deploySSH = gulp.series(reset, ssh);

// Экспорт сценариев
export { dev, build, deployZip, deployFTP, deploySSH, fonts };

// Выполнение сценариев по-умолчанию
gulp.task('default', dev);
