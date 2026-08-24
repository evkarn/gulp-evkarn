// Точка входа Gulp-сборки.
//
// Сценарии (см. также команды в package.json и README.md):
//   dev       — полная сборка + локальный сервер с вотчером
//   build     — production-сборка в dist (сжатие, типограф, версии)
//   fonts     — конвертация .ttf → .woff2 и генерация _fonts-faces.scss
//   files     — разовое копирование config/favicon/files в dist
//   deployZip — сборка + архив dist в корень проекта
//   deployFTP — сборка + выгрузка dist на FTP (нужен .env)
//   deploySSH — сборка + выгрузка dist по SSH/rsync (нужен .env)

// Загрузка .env идёт первым импортом, чтобы конфиги ниже
// уже видели переменные окружения (FTP_HOST и т.д.)
import './gulp/config/env.js';

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
	plugins: plugins,
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
import js from './gulp/tasks/js.js';
import clean from './gulp/tasks/clean.js';
import styles from './gulp/tasks/styles.js';
import server from './gulp/tasks/server.js';
import ssh from './gulp/tasks/ssh.js';
import zip from './gulp/tasks/zip.js';

// Наблюдение за изменениями в файлах:
// gulp.watch сам запускает нужный таск при правке файла,
// таск каждый раз пересобирает результат целиком
function watcher(done) {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.files, copyFiles);
	gulp.watch(path.watch.favicon, copyFavicon);
	gulp.watch(path.watch.configFiles, copyConfigFiles);
	gulp.watch(path.watch.img, imgMin);
	gulp.watch(path.watch.svg, svgMin);
	gulp.watch(path.watch.sprite, sprite);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.styles, styles);
	done();
}

// Копирование «статичных» файлов: конфиги, документы, фавиконки
const files = gulp.parallel(copyConfigFiles, copyFiles, copyFavicon);

// Конвертация шрифтов + генерация файла их подключений
const fonts = gulp.series(ttfToWoff, createFontsFaces);

// Основные задачи: всё, что должно оказаться в dist при сборке.
// Конвертация .ttf → .woff2 тоже здесь: dist очищается целиком,
// без этого шага шрифты не попали бы в сборку
const mainTasks = gulp.parallel(
	files,
	html,
	styles,
	js,
	ttfToWoff,
	imgMin,
	sprite,
	svgMin,
);

// Построение сценариев выполнения задач

// Разработка: очистка dist → сборка → вотчер → локальный сервер
const dev = gulp.series(clean, mainTasks, watcher, server);

// Production-сборка без сервера
const build = gulp.series(clean, mainTasks);

// Сборка + упаковка результата
const deployZip = gulp.series(clean, mainTasks, zip);
const deployFTP = gulp.series(clean, mainTasks, ftp);
const deploySSH = gulp.series(clean, mainTasks, ssh);

// Экспорт сценариев
export { dev, build, deployZip, deployFTP, deploySSH, fonts, files };

// Выполнение сценариев по умолчанию (npm run dev)
gulp.task('default', dev);
