import plumberInit from './plumber.js'

export const socialImagesMin = () => {
	return app.gulp.src(app.path.src.socialImages)
		.pipe(app.plugins.plumber(plumberInit('SOCIAL-IMAGES')))

		.pipe(
			app.plugins.changed(app.path.build.socialImages)
		)

		.pipe(
			app.plugins.imagemin({
				progressive: true,

				interlaced: true,

				quality: 75,

				optimizationLevel: 3 // 0 to 7
			})
		)

		.pipe(app.gulp.dest(app.path.build.socialImages));
};
