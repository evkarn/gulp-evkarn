// Добавление вендерных префиксов для кросс-браузерной вёрстки
import autoprefixer from 'gulp-autoprefixer';

// Сжатие CSS файла
import cleanCss from 'gulp-clean-css';

// Обработка стилей sass, scss
import * as sass from 'sass';

// Обработка стилей sass, scss
import gulpSass from 'gulp-sass';

// Генерирует дополнительные выражения с классами .webp и .avif и соответствующим расширением.
import webpAvifCss from 'gulp-web-images-css';

// Группировка медиа запросов
import groupCssMediaQueries from 'gulp-group-css-media-queries';

// Обработка ошибок
import plumberInit from './plumber.js'

// Отслеживание изменений в файлах
import changed from "gulp-changed";

// Создание карты источников
import sourceMaps from 'gulp-sourcemaps'

// Множественный импорт файлов из папки
import sassGlob from 'gulp-sass-glob';

const sassUse = gulpSass(sass);

export const styles = () => {
	// Находим файлы sass в папке исходников
	return app.gulp.src(app.path.src.styles, { sourcemaps: app.isDev })

	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(plumberInit('STYLES')))


	// Отслеживание и обработка только изменившихся файлов
	.pipe(
		app.plugins.changed(
			app.path.build.css, {hasChanged: changed.compareContents}
		)
	)


	// Создание карты источников
	.pipe(sourceMaps.init())


	// Множественный импорт файлов из папки
	.pipe(sassGlob())

	// Преобразование специальной вставки в адрес
	.pipe(app.plugins.replace(/@img\//g, '../images/dist'))


	// Выбор вид сжатия конченого файла
	.pipe(sassUse({ outputStyle: 'compressed' }))


	// Если в режиме продакшена группируем медиа-запросы
	.pipe(app.plugins.if(
		app.isBuild,
		groupCssMediaQueries()
	))


	// Если в режиме продакшена создаём дополнительные выражения с классами .webp и .avif и соответствующим расширением для изображений.
	.pipe(app.plugins.if(
		app.isBuild,
		webpAvifCss({
			extensions: ['.jpg','.jpeg', '.png'],

			mode: 'all'
		})
	))


	// Если в режиме продакшена добавляем вендерные префиксы для совместимости стилей
	.pipe(app.plugins.if(
		app.isBuild,
		autoprefixer({
			grid: true,

			overrideBrowsersList: ["last 7 versions"],

			cascade: false
		})
	))


	// Если в режиме продакшена создаём не сжатый дубль файла стилей
	.pipe(app.plugins.if(
		app.isBuild,
		app.gulp.dest(app.path.build.css)
	))


	// Если в режиме продакшена сжимаем файл стилей
	.pipe(app.plugins.if(app.isBuild, cleanCss()))


	// Переименовываем итоговый файл
	.pipe(app.plugins.rename({
		extname: '.min.css'
	}))


	// Создание файла карты источников
	.pipe(sourceMaps.write())


	// Выгружаем файл стилей в папку проекта
	.pipe(app.gulp.dest(app.path.build.css))


	// При обновлении файла перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};
