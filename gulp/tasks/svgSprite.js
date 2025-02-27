// Обработка ошибок
import {plumberInit} from './plumber.js'
import svgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';
import svgMin from 'gulp-svgmin';

export const svgSpriteIcons = () => {
	// Находим файлы svg в папке исходников
	return app.gulp.src(`${app.path.src.svgSprite}`, {})


	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(plumberInit('SVG-SPRITE')))


	// Оптимизируем файлы
	.pipe(svgMin({
		js2svg: {
			pretty: true,
		},

		plugins: [
			{
				name: 'removeViewBox',
				// Disable a plugin by setting active to false.
				active: false,
			},
		],
	}))


	// Убираем лишнее из svg
	.pipe(
		cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill'); // убираем цвета заливки
				$('[stroke]').removeAttr('stroke'); // Убираем stroke
				$('[style]').removeAttr('style'); // Удаляем стили
			},

			parserOptions: {
				xmlMode: true
			},
		})
	)

	// Замена неправильных символов закрытия тегов
	.pipe(app.plugins.replace('&gt;', '>'))

	// Создаём спрайт
	.pipe(svgSprite({
		mode: {
			stack: {
				sprite: `../sprite.svg`,

				// Создать страницу с перечнем иконок
				example: true
			}
		},
	}))


	// Выгружаем спрайт в папку проекта
	.pipe(app.gulp.dest(`${app.path.build.spriteIcons}`));
};
