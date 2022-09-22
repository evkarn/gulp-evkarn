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
				sprite: `../sprite-icons.svg`,
				
				// Создать страницу с перечнем иконок
				example: true
			}
		},
	}))
	
	.pipe(app.gulp.dest(`${app.path.build.spriteIcons}`));
};