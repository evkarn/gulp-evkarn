import * as sass from 'sass';

import gulpSass from 'gulp-sass';

import webpcss from 'gulp-webpcss';

// Группировка медиа запросов
import groupCssMediaQueries from 'gulp-group-css-media-queries';

import plumberInit from './plumber.js'

const sassUse = gulpSass(sass);

export const sassStyle = () => {
	// Находим файлы sass в папке исходников
	return app.gulp.src(app.path.src.sass, { sourcemaps: app.isDev })

	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(plumberInit('SASS')))

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
		webpcss({
			webpClass: '.webp',
			noWebpClass: '.no-webp'
		})
	))

	.pipe(app.plugins.if(
		app.isBuild,
		app.plugins.autoprefixer({
			grid: true,
			overrideBrowsersList: ["last 5 versions"],
			cascade: true
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
		app.plugins.cleanCss()
	))

	// Переименовываем итоговый файл стилей
	.pipe(app.plugins.rename({
		extname: '.min.css'
	}))

	// Выгружаем файл стилей в папку проекта
	.pipe(app.gulp.dest(app.path.build.css))

	// При обновлении файла перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};
