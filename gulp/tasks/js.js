// Обработка ошибок
import plumberInit from './plumber.js';

// Минимизация файлов
import terser from 'terser-webpack-plugin';

// Обработка скриптов
import webpack from 'webpack-stream';

// Отслеживание изменений в файлах
import { compareContents } from 'gulp-changed';

import { resolve } from 'path';

export default function js() {
	// Находим js файлы в папке исходников
	return (
		app.gulp
			.src(app.path.src.js, { source: app.isDev })

			// Вывод сообщения об ошибке, если появляется ошибка
			.pipe(app.plugins.plumber(plumberInit('JS')))

			// Проверяем были ли изменения в файлах
			.pipe(
				app.plugins.changed(app.path.src.js, { hasChanged: compareContents }),
			)

			// Обработка файлов js в режиме production
			.pipe(
				webpack({
					mode: app.isBuild ? 'production' : 'development',

					resolve: {
						alias: {
							'@': resolve(process.cwd(), 'src'),
							'@components': resolve(process.cwd(), 'src/assets/components'),
							'@utils': resolve(process.cwd(), 'src/assets/utils'),
							'@styles': resolve(process.cwd(), 'src/assets/styles/scss'),
						},
					},

					entry: {
						'scripts.min': './src/assets/js/scripts.js',
					},

					output: {
						filename: '[name].js',
					},

					module: {
						rules: [
							{
								test: /\.m?js$/,

								exclude: /(node_modules|bower_components)/,

								use: {
									loader: 'babel-loader',

									options: {
										presets: [
											[
												'@babel/preset-env',
												{
													targets: 'defaults',
												},
											],
										],

										plugins: ['babel-plugin-root-import'],
									},
								},
							},
						],
					},

					optimization: {
						minimize: true,

						minimizer: [
							new terser({
								include: /\.min\.js$/,

								terserOptions: { format: { comments: false } },

								extractComments: false,
							}),
						],
					},

					devtool: app.isBuild ? 'source-map' : false,
				}),
			)

			// Выгрузка файл в папку проекта
			.pipe(app.gulp.dest(app.path.build.js))

			// При обновлении файла перезагружаем страницу
			.pipe(app.plugins.browsersync.stream())
	);
}
