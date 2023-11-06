import plumberInit from './plumber.js'

export const copyFiles = () => {
	// Находим указанные файлы
	return app.gulp.src(app.path.src.files)


	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('COPY-FILES')))


	// Копируем файлы в папку dist
	.pipe(app.gulp.dest(app.path.build.files));
};
