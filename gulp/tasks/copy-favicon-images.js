export const copyFaviconImages = () => {
	return app.gulp.src(app.path.src.faviconImages)
	
	.pipe(app.gulp.dest(app.path.build.faviconImages));
};