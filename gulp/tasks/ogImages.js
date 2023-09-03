import plumberInit from './plumber.js'

export const ogImgMin = () => {
	return app.gulp.src(app.path.src.ogImg)
		.pipe(app.plugins.plumber(plumberInit('OG-IMAGES')))

		.pipe(
			app.plugins.newer(app.path.build.ogImg)
		)

		.pipe(
			app.plugins.imagemin({
				progressive: true,
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)

		.pipe(app.gulp.dest(app.path.build.ogImg));
};
