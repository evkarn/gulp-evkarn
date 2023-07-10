export const pinterestImgMin = () => {
	return app.gulp.src(app.path.src.pinterestImg)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "OG-IMAGES-MINIMIZE",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(
			app.plugins.newer(app.path.build.pinterestImg)
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
