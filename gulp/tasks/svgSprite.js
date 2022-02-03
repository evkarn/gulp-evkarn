import svgSprite from 'gulp-svg-sprite';

export const svgSpriteIcons = () => {
	return app.gulp.src(`${app.path.src.svgSprite}`, {})
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "SVG-SPRITE",
			message: "Error: <%= error.message %>"
		})
	))
	
	.pipe(svgSprite({
		mode: {
			stack: {
				sprite: `../svg-sprite/svg-sprite.svg`,
				
				// Создать страницу с перечнем иконок
				example: true
			}
		},
	}))
	
	.pipe(app.gulp.dest(`${app.path.build.img}`));
};