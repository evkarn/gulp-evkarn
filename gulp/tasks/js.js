import webpack from 'webpack-stream'; // Обработка файлов js

export const js = () => {
	// Находим js файлы в папке исходников
	return app.gulp.src(app.path.src.js, { source: app.isDev })

	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "JS",
			message: "Error: <%= error.message %>"
		})
	))

	// Заменяем @img на assets/images/dist
	.pipe(app.plugins.replace(/@utils\//g, '../../_utils'))

	// Обработка файлов js
	.pipe(webpack({
		mode: app.isBuild ? 'production' : 'development',
		output: {
			filename: 'app.min.js',
		}
	}))

	// Выгрузка файл в папку проекта
	.pipe(app.gulp.dest(app.path.build.js))

	// При обновлении файла перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};