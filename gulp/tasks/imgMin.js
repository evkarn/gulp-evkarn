import plumberInit from './plumber.js'

export const imgMin = () => {
	return app.gulp.src(app.path.src.imgMin)

	.pipe(app.plugins.plumber(plumberInit('IMAGES-MINIMIZE')))

	// Проверяем менялись ли изображения
	.pipe(
		app.plugins.changed(app.path.build.img)
	)

	// Если режим продакшена сжимаем изображения
	.pipe(app.plugins.if(
		app.isBuild,
		app.plugins.imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3 // 0 to 7
		})
	))

	.pipe(app.gulp.dest(app.path.build.img))

	.pipe(app.plugins.browsersync.stream());
};
