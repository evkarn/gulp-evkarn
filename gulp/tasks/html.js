import fileInclude from 'gulp-file-include'; // Добавление в файлы строк
import webpHtmlNosvg from 'gulp-webp-html-nosvg'; // Обработка webp
import versionNumber from 'gulp-version-number'; // Проверка версий файлов

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

	.pipe(fileInclude())

	.pipe(app.plugins.replace(/@img\//g, 'img/'))

	// Если режим продакшена, то переделываем картинки в webp
	.pipe(app.plugins.if(
		app.isBuild,
		webpHtmlNosvg()
	))

	// Если режим продакшена, то добавляем атрибует версии для стилей и скриптов
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

	.pipe(app.gulp.dest(app.path.build.html))
	.pipe(app.plugins.browsersync.stream());
};