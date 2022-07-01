export const copySpecialCSS = () => {
	return app.gulp.src(app.path.src.specialCSS)
	
	.pipe(app.gulp.dest(app.path.build.specialCSS))

	// Перезагружаем страницу
	.pipe(app.plugins.browsersync.stream());
};