// Добавление в файлы строк
import fileInclude from 'gulp-file-include';

// Обработка файлов js
import webpack from 'webpack-stream';

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

	// Обработка файлов js
	.pipe(webpack({
		mode: app.isBuild ? 'production' : 'development',

		entry: {
			app: './src/assets/js/app.js',
		},

		output: {
			filename: '[name].min.js',
		}
	}))

	// Выгрузка файл в папку проекта
	.pipe(app.gulp.dest(app.path.build.js))

	// При обновлении файла перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};
