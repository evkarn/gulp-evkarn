// Сборка JavaScript через webpack.
//
// Точка входа: src/js/scripts.js
// Результат:   dist/js/scripts.min.js
//
// Режимы:
//   dev  (npm run dev)   — без минификации, inline sourcemaps:
//                          в DevTools виден исходный код.
//   build (npm run build) — минификация terser'ом, без карт
//                          (исходники не утекают на сервер).
//
// Алиасы путей (@js, @utils и т.д.) заданы ниже в resolve.alias.
// Те же алиасы продублированы в jsconfig.json — для подсказок редактора.

// Обработка ошибок
import plumberInit from './plumber.js';

// Минимизация файлов
import terser from 'terser-webpack-plugin';

// Обработка скриптов
import webpack from 'webpack-stream';

import { resolve } from 'path';

export default function js() {
	// Находим точки входа (src/js/*.js) и отдаём их webpack'у
	return (
		app.gulp
			.src(app.path.src.js)

			// Вывод сообщения об ошибке, если появляется ошибка
			.pipe(app.plugins.plumber(plumberInit('JS')))

			.pipe(
				webpack({
					// production — минификация, development — читаемый код
					mode: app.isBuild ? 'production' : 'development',

					resolve: {
						alias: {
							'@': resolve(process.cwd(), 'src'),
							'@components': resolve(process.cwd(), 'src/components'),
							'@js': resolve(process.cwd(), 'src/js'),
							'@funcs': resolve(process.cwd(), 'src/js/functions'),
							'@utils': resolve(process.cwd(), 'src/js/utils'),
							'@modules': resolve(process.cwd(), 'src/js/modules'),
							'@constants': resolve(process.cwd(), 'src/js/constants'),
							'@styles': resolve(process.cwd(), 'src/styles/scss'),
						},
					},

					entry: {
						'scripts.min': '@js/scripts.js',
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
									},
								},
							},
						],
					},

					optimization: {
						// Минимизируем только в сборке; в dev оставляем читаемый код
						minimize: app.isBuild,

						minimizer: [
							new terser({
								include: /\.min\.js$/,

								terserOptions: { format: { comments: false } },

								extractComments: false,
							}),
						],
					},

					// В dev карты зашиваются прямо в бандл (inline),
					// в проде карты не генерируются
					devtool: app.isBuild ? false : 'inline-source-map',
				}),
			)

			// Выгрузка файл в папку проекта
			.pipe(app.gulp.dest(app.path.build.js))

			// При обновлении файла перезагружаем страницу
			.pipe(app.plugins.browsersync.stream())
	);
}
