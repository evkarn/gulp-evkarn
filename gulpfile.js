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
import { copyFiles } from './gulp/tasks/copy-files.js';
import { copyFavicon } from './gulp/tasks/copy-favicon.js';
import { ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { ftp } from './gulp/tasks/ftp.js';
import { html } from './gulp/tasks/html.js';
import { imgAvif } from './gulp/tasks/imgAvif.js';
import { imgMin } from './gulp/tasks/imgMin.js';
import { imgWebp } from './gulp/tasks/imgWebp.js';
import { socialImagesMin } from './gulp/tasks/socialImages.js';
import { js } from './gulp/tasks/js.js';
import { reset } from './gulp/tasks/reset.js';
import { styles } from './gulp/tasks/styles.js';
import { server } from './gulp/tasks/server.js';
import { ssh } from './gulp/tasks/ssh.js';
import { svgSpriteIcons } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';

// Наблюдение за изменениями в файлах
function watcher(done) {
	gulp.watch(path.watch.files, copyFiles);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.styles, styles);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.img, gulp.parallel(imgAvif, imgWebp, imgMin));
	gulp.watch(path.watch.socialImages, socialImagesMin);
	gulp.watch(path.watch.svgSprite, svgSpriteIcons);
	done();
}

// Последовательность обработки шрифтов
const fonts = gulp.series(ttfToWoff, fontsStyle);

// Основные задачи
const mainTasks = gulp.parallel(
	copyFiles,
	copyFavicon,
	copyConfigFiles,
	html,
	styles,
	js,
	imgAvif,
	imgWebp,
	imgMin,
	socialImagesMin,
	svgSpriteIcons
);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, fonts, mainTasks, watcher, server);
const build = gulp.series(reset, fonts, mainTasks);
const deployZip = gulp.series(reset, zip);
const deployFTP = gulp.series(reset, ftp);
const deploySSH = gulp.series(reset, ssh);

// Экспорт сценариев
export { dev };
export { build };
export { deployZip };
export { deployFTP };
export { deploySSH };
export { svgSpriteIcons };

// Выполнение сценариев по-умолчанию
gulp.task('default', dev);
