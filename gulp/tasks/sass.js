import dartSass from 'sass'; // Обработка препроцессора SASS
import gulpSass from 'gulp-sass'; // Обработка препроцессора SASS
import rename from 'gulp-rename'; // Переименовывание файлов
import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpcss from 'gulp-webpcss'; // Вывод Webp изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендерных префексов для кроссбраузерности
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов

const sass = gulpSass(dartSass);

export const sassStyle = () => {
	// Находим файлы sass в папке исходников
	return app.gulp.src(app.path.src.sass, { sourcemaps: app.isDev })

	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "SASS",
			message: "Error: <%= error.message %>"
		})
	))

	// Предобразование специальной вставки в адрес
	.pipe(app.plugins.replace(/@img\//g, '../img/'))

	// Обработка препроцессора SASS
	.pipe(sass({
		outputStyle: 'expanded'
	}))

	// Если в режиме продакшена Группировка медиазапросов
	.pipe(app.plugins.if(
		app.isBuild,
		groupCssMediaQueries()
	))

	// Если в режиме продакшена Вывод Webp изображений
	.pipe(app.plugins.if(
		app.isBuild,
		webpcss({
			webpClass: '.webp',
			noWebpClass: '.no-webp'
		})
	))

	// Если в режиме продакшена автоматическая простановка вендерных префиксов
	.pipe(app.plugins.if(
		app.isBuild,
		autoprefixer({
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
		cleanCss()
	))

	// Переименовываем итоговый файл стилей
	.pipe(rename({
		extname: '.min.css'
	}))

	// Выгружаем файл стилей в папку проекта
	.pipe(app.gulp.dest(app.path.build.css))

	// При обновлении файла перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};