// Обработка XML, SVG файлов
import cheerio from 'gulp-cheerio';

// Берём множество SVG-файлов, оптимизирует их и создаём SVG-спрайт
import svgSprite from 'gulp-svg-sprite';

// Обработка ошибок
import plumberInit from './plumber.js'

// Оптимизация файлов svg
import svgoMin from 'gulp-svgo';

export const svgSpriteIcons = () => {
	// Находим файлы svg в папке исходников
	return app.gulp.src(`${app.path.src.svgSprite}`, {})


	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(plumberInit('SVG-SPRITE')))


	// Оптимизируем файлы
	.pipe(svgoMin({
		js2svg: {
			indent: 2,
			pretty: true,
		},

		plugins: [
			{
				name: 'preset-default',
				params: {
					overrides: {
						removeViewBox: false
					},
				},
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
