export const copyFavFolder = () => {
	return app.gulp.src(app.path.src.favFolder)
	.pipe(app.gulp.dest(app.path.build.favFolder));
};