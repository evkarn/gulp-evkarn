// Добавление в файлы строк
import fileInclude from 'gulp-file-include';

// Проверка версий файлов
import versionNumber from 'gulp-version-number';

// Замена img на picture с webp компонентом
import webpHtmlNoSVG from 'gulp-webp-html-nosvg';

// Обработка текстов типографом
import typograf from 'gulp-typograf';

export const html = () => {
	// Находим все .html в папке исходников
	return app.gulp.src(app.path.src.html)

	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "HTML",
			message: "Error: <%= error.message %>"
		})
	))

	// Вставляем заданные @include
	.pipe(fileInclude({
		prefix: '@',
		basepath: '@file'
	}))

	.pipe(typograf({
		locale: ['ru', 'en-US']
	}))

	// Заменяем @img на assets/images/dist
	.pipe(app.plugins.replace(/@img\//g, 'assets/images/dist/'))

	// Если режим продакшена, то заменяем img на picture с webp компонентом
	.pipe(app.plugins.if(
		app.isBuild,
		webpHtmlNoSVG()
	))

	// Если режим продакшена, то добавляем атрибут версии для стилей и скриптов
	.pipe(app.plugins.if(
		app.isBuild,
		versionNumber({
			'value': '%DT%',
			'append': {
				'key': '_v',
				'cover': 0,
				'to': [
					'css',
					'js',
				]
			},
			'output': {
				'file': 'gulp/version.json'
			}
		})
	))

	// Выгружаем файлы в папку готовой вёрстки
	.pipe(app.gulp.dest(app.path.build.html))

	// Перезагружаем страницу
	.pipe(app.plugins.browsersync.stream());
};
