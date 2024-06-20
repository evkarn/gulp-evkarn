import plumberInit from './plumber.js'

export const copyFavicon = () => {
	// Находим указанные файлы
	return app.gulp.src(app.path.src.faviconImages, {encoding:false})


	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('COPY-FAVICON')))


	// Копируем файлы в папку dist
	.pipe(app.gulp.dest(app.path.build.faviconImages));
};
