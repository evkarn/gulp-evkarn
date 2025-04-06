import plumberInit from './plumber.js';

export default function copyConfigFiles() {
	// Находим указанные файлы
	return (
		app.gulp
			.src(app.path.src.configFiles, { dot: true })

			// Выдаём сообщение об ошибке, если она есть
			.pipe(app.plugins.plumber(plumberInit('COPY-CONFIG-FILES')))

			// Копируем файлы в папку dist
			.pipe(app.gulp.dest(app.path.build.configFiles))
	);
}
