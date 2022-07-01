// Добавление в файлы строк
import fileInclude from 'gulp-file-include';

// Проверка версий файлов
import versionNumber from 'gulp-version-number';

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

	// Заменяем @img на assets/images/dist
	.pipe(app.plugins.replace(/@img\//g, 'assets/images/dist/'))

	// Заменяем @js на assets/js
	.pipe(app.plugins.replace(/@js\//g, 'assets/js/'))

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