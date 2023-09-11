import plumberInit from './plumber.js'

export const pinterestImgMin = () => {
	return app.gulp.src(app.path.src.pinterestImg)
		.pipe(app.plugins.plumber(plumberInit('PINTEREST-IMAGES')))

		.pipe(
			app.plugins.changed(app.path.build.pinterestImg)
		)

		.pipe(
			app.plugins.imagemin({
				progressive: true,
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)

		.pipe(app.gulp.dest(app.path.build.pinterestImg));
};
