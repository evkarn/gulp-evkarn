// Обработка ошибок
import plumberInit from './plumber.js'

// Минимизация файлов
import terser from 'terser-webpack-plugin'

// Обработка скриптов
import webpack from 'webpack-stream';

// Отслеживание изменений в файлах
import {compareContents} from 'gulp-changed';

export const js = () => {
	// Находим js файлы в папке исходников
	return app.gulp.src(app.path.src.js, { source: app.isDev })

		// Вывод сообщения об ошибке, если появляется ошибка
		.pipe(app.plugins.plumber(plumberInit('JS')))


		// Проверяем были ли изменения в файлах
		.pipe(app.plugins.changed(
			app.path.src.js, {hasChanged: compareContents}
		))


		// Переименовываем итоговый файл
		.pipe(app.plugins.if(app.isDev, app.plugins.rename({
			extname: '.min.js'
		})))


		// Обработка файлов js в режиме production
		.pipe(app.plugins.if(app.isBuild, webpack({
			// mode: app.isBuild ? 'production' : 'development',
			mode: 'production',

			entry: {
				scripts: './src/assets/js/scripts.js',
				main: './src/assets/js/main.js',
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
										'@babel/preset-env', {
											targets: 'defaults',
										},
									],
								],

								plugins: [
									'babel-plugin-root-import'
								]
							},
						},
					},

					{
						test: /\.(scss|sass|css)$/,

						use: [
							'style-loader',
							'css-loader',
							'postcss-loader',
							'sass-loader',
						],
					},
				],
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
		})))


		// Выгрузка файл в папку проекта
		.pipe(app.gulp.dest(app.path.build.js))


		// При обновлении файла перезагружаем страницу
		.pipe(app.plugins.browsersync.stream());
};
