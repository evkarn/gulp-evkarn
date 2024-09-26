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


	// Обработка файлов js в режиме production
	.pipe(webpack({
		mode: app.isBuild ? 'production' : 'development',

		entry: {
			'scripts.min': './src/assets/js/scripts.js',
		},

		output: {
			filename: '[name].js',
		},

		devtool: app.isBuild ? 'source-map' : false,

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
					include: /\.min\.js$/,

					terserOptions: { format: { comments: false } },

					extractComments: false
				})
			]
		},
	}))


	// Выгрузка файл в папку проекта
	.pipe(app.gulp.dest(app.path.build.js))


	// При обновлении файла перезагружаем страницу
	.pipe(app.plugins.browsersync.stream());
};
