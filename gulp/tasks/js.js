import plumberInit from './plumber.js'

import terser from 'terser-webpack-plugin'

import webpack from 'webpack-stream';

import changed from "gulp-changed";

export const js = () => {
	// Находим js файлы в папке исходников
	return app.gulp.src(app.path.src.js, { source: app.isDev })

	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(plumberInit('JS')))

	.pipe(
		app.plugins.changed(
			app.path.build.js, {hasChanged: changed.compareContents}
		)
	)

	// Обработка файлов js
	.pipe(webpack({
		mode: app.isBuild ? 'production' : 'development',

		entry: {
			scripts: './src/assets/js/scripts.js',
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
	}))

	// Выгрузка файл в папку проекта
	.pipe(app.gulp.dest(app.path.build.js))

	// При обновлении файла перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};
