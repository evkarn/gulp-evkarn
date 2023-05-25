// Преобразование изображений в формат Avif
import avif from 'gulp-avif';

export const imgAvif = () => {
	return app.gulp.src(app.path.src.imgAvifWebp)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES-AVIF",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(
			app.plugins.newer(app.path.build.img)
		)

		.pipe(
			avif({ quality: 80 })
		)

		.pipe(
			app.gulp.dest(app.path.build.img)
		)

		.pipe(app.plugins.browsersync.stream());
};
