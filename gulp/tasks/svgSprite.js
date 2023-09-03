import cheerio from 'gulp-cheerio';

import svgSprite from 'gulp-svg-sprite';

import plumberInit from './plumber.js'

export const svgSpriteIcons = () => {
	return app.gulp.src(`${app.path.src.svgSprite}`, {})

	.pipe(app.plugins.plumber(plumberInit('SVG-SPRITE')))

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
