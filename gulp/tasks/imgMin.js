// Оптимизация изображений
import imagemin from 'gulp-imagemin';

export const imgMin = () => {
	return app.gulp.src(app.path.src.imgMin)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES-MINIMIZE",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(
			app.plugins.newer(app.path.build.img)
		)

		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)

		.pipe(app.gulp.dest(app.path.build.img))

		.pipe(app.plugins.browsersync.stream());
};
