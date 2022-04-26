export const copyFavFiles = () => {
	return app.gulp.src(app.path.src.favFiles)
	.pipe(app.gulp.dest(app.path.build.favFiles));
};