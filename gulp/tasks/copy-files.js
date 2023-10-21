import plumberInit from './plumber.js'

export const copyFiles = () => {
	return app.gulp.src(app.path.src.files)

	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('COPY-FILES')))

	.pipe(app.gulp.dest(app.path.build.files));
};
