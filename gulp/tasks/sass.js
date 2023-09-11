// Добавление вендерных префиксов для кросс-браузерной вёрстки
import autoprefixer from 'gulp-autoprefixer';

// Сжатие CSS файла
import cleanCss from 'gulp-clean-css';

import * as sass from 'sass';

import gulpSass from 'gulp-sass';

import webpAvifCss from 'gulp-web-images-css';

// Группировка медиа запросов
import groupCssMediaQueries from 'gulp-group-css-media-queries';

import plumberInit from './plumber.js'

import changed from "gulp-changed";

import sourceMaps from 'gulp-sourcemaps'

import sassGlob from 'gulp-sass-glob';

const sassUse = gulpSass(sass);

export const sassStyle = () => {
	// Находим файлы sass в папке исходников
	return app.gulp.src(app.path.src.sass, { sourcemaps: app.isDev })

	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(plumberInit('SASS')))

	.pipe(
		app.plugins.changed(
			app.path.build.css, {hasChanged: changed.compareContents}
		)
	)

	.pipe(sourceMaps.init())

	.pipe(sassGlob())

	// Преобразование специальной вставки в адрес
	.pipe(app.plugins.replace(/@img\//g, '../images/dist'))

	.pipe(sassUse({
		outputStyle: 'compressed'
	}))

	.pipe(app.plugins.if(
		app.isBuild,
		groupCssMediaQueries()
	))

	.pipe(app.plugins.if(
		app.isBuild,
		webpAvifCss({
			extensions: ['.jpg','.jpeg', '.png'],
			mode: 'all'
		})
	))

	.pipe(app.plugins.if(
		app.isBuild,
		autoprefixer({
			grid: true,
			overrideBrowsersList: ["last 5 versions"],
			cascade: false
		})
	))

	// Если в режиме продакшена создаём не сжатый дубль файла стилей
	.pipe(app.plugins.if(
		app.isBuild,
		app.gulp.dest(app.path.build.css)
	))

	// Если в режиме продакшена сжимаем файл стилей
	.pipe(app.plugins.if(
		app.isBuild,
		cleanCss()
	))

	// Переименовываем итоговый файл стилей
	.pipe(app.plugins.rename({
		extname: '.min.css'
	}))

	.pipe(sourceMaps.write())

	// Выгружаем файл стилей в папку проекта
	.pipe(app.gulp.dest(app.path.build.css))

	// При обновлении файла перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};
