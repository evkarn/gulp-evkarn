export const copySpecialJS = () => {
	return app.gulp.src(app.path.src.jsSpecial)

		.pipe(app.gulp.dest(app.path.build.jsSpecial))

		// Перезагружаем страницу
		.pipe(app.plugins.browsersync.stream());
};