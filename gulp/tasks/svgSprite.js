import cheerio from 'gulp-cheerio';

import svgSprite from 'gulp-svg-sprite';

export const svgSpriteIcons = () => {
	return app.gulp.src(`${app.path.src.svgSprite}`, {})

	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "SVG-SPRITE",
			message: "Error: <%= error.message %>"
		})
	))

	// Оптимизируем файлы
	.pipe(app.plugins.svgoMin())

	.pipe(
		cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {
				xmlMode: true
			},
		})
	)

	.pipe(app.plugins.replace('&gt;', '>'))

	.pipe(svgSprite({
		mode: {
			stack: {
				sprite: `../sprite.svg`,

				// Создать страницу с перечнем иконок
				example: true
			}
		},
	}))

	.pipe(app.gulp.dest(`${app.path.build.spriteIcons}`));
};
