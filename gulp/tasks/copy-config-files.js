import plumberInit from './plumber.js'

export const copyConfigFiles = () => {
	return app.gulp.src(app.path.src.configFiles)

	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('COPY-CONFIG-FILES')))

	.pipe(app.gulp.dest(app.path.build.configFiles));
};
