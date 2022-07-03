export const copySpecialCSS = () => {
	return app.gulp.src(app.path.src.cssSpecial)

		.pipe(app.gulp.dest(app.path.build.cssSpecial))

		// Перезагружаем страницу
		.pipe(app.plugins.browsersync.stream());
};