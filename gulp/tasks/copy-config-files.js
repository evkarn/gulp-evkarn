export const copyConfigFiles = () => {
	return app.gulp.src(app.path.src.configFiles)
	
	.pipe(app.gulp.dest(app.path.build.configFiles));
};