// Обработка файлов js
import webpack from 'webpack-stream';

import terser from 'terser-webpack-plugin'

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
			app: './assets/js/app.js'
		},

		module: {
			rules: [{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								targets: "defaults"
							}]
						]
					}
				}
			}]
		},

		optimization: {
			minimize: true,

			minimizer: [
				new terser({
					terserOptions: { format: { comments: false } },
					extractComments: false
				})
			]
		},

		output: {
			filename: '[name].min.js',
		},

		devtool: app.isBuild ? 'source-map' : false
	}))

	// Выгрузка файл в папку проекта
	.pipe(app.gulp.dest(app.path.build.js))

	// При обновлении файла перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};
