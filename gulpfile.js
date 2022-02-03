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
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { sassStyle } from './gulp/tasks/sass.js';
import { js } from './gulp/tasks/js.js';
import { img } from './gulp/tasks/img.js';
import { ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSpriteIcons } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// Наблюдение за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.sass, sassStyle);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.img, img);
}

export { svgSpriteIcons };

// Последовательность обработки шрифтов
const fonts = gulp.series( ttfToWoff, fontsStyle );

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, sassStyle, js, img));

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

// Выполнение сценариев по умолчанияю
gulp.task('default', dev);