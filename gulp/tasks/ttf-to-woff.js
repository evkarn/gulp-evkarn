import ttf2woff2 from 'gulp-ttf2woff2';

import plumberInit from './plumber.js';

export default function ttfToWoff() {
	// Ищем файлы шрифтов .ttf
	return (
		app.gulp
			.src(`${app.path.src.fonts}`, { encoding: false })

			// Выдаём сообщение об ошибке, если она есть
			.pipe(app.plugins.plumber(plumberInit('TTF TO WOFF2')))

			// Проверяем менялись ли файлы
			.pipe(app.plugins.changed(app.path.build.fonts))

			// Конвертируем .ttf в .woff2
			.pipe(ttf2woff2())

			// выгружаем в папку проекта
			.pipe(app.gulp.dest(app.path.build.fonts))
	);
}
