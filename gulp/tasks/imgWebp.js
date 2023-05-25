// Преобразование картинок .png, .jpg в формат .webp
import webp from 'gulp-webp';

export const imgWebp = () => {
	return app.gulp.src(app.path.src.imgAvifWebp)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES-WEBP",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(
			app.plugins.newer(app.path.build.img)
		)

		.pipe(
			webp({ quality: 80 })
		)

		.pipe(
			app.gulp.dest(app.path.build.img)
		)

		.pipe(app.plugins.browsersync.stream());
};
