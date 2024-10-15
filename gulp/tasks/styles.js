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
import {compareContents} from 'gulp-changed';

// Создание карты источников
import sourceMaps from 'gulp-sourcemaps'

const sassUse = gulpSass(sass);

export const styles = (done) => {
	// Находим файлы sass в папке исходников
	return app.gulp.src(app.path.src.styles, { sourcemaps: app.isDev })


	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(plumberInit('STYLES')))


	// Отслеживание и обработка только изменившихся файлов
	.pipe(app.plugins.changed(
		app.path.build.css, {hasChanged: compareContents}
	))


	// Инициализация создания карты источников
	.pipe(sourceMaps.init())


	// Выбор вида сжатия конечного файла
	.pipe(sassUse({
		outputStyle: 'compressed',
		silenceDeprecations: ['legacy-js-api'],
	}))


	// Если в режиме продакшена группируем медиа-запросы
	.pipe(app.plugins.if(app.isBuild,	groupCssMediaQueries()))


	// Если в режиме продакшена создаём дополнительные выражения с классами .webp и .avif и соответствующим расширением для изображений.
	.pipe(app.plugins.if(app.isBuild,	webpAvifCss({
		extensions: ['.jpg', '.jpeg', '.png'],

		mode: 'all'
	})))


	// Если в режиме продакшена добавляем вендерные префиксы для совместимости стилей
	.pipe(app.plugins.if(app.isBuild, autoprefixer({
		grid: true,

		overrideBrowsersList: ["last 5 versions"],

		cascade: false
	})))


	// Если в режиме продакшена создаём не сжатый дубль файла стилей
	.pipe(app.plugins.if(app.isBuild,	app.gulp.dest(app.path.build.css)))


	// Если в режиме продакшена сжимаем файл стилей
	.pipe(app.plugins.if(app.isBuild, cleanCss()))


	// Убираем лишнее в адресах картинок
	.pipe(app.plugins.replace(
			/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
			'$1$2$3$4$6$1'
		)
	)


	// Переименовываем итоговый файл
	.pipe(app.plugins.rename({
		extname: '.min.css'
	}))


	// Создание файла карты источников
	.pipe(sourceMaps.write())


	// Выгружаем файл стилей в папку проекта dist
	.pipe(app.gulp.dest(app.path.build.css))


	// При обновлении файла перезагружаем страницу
	.pipe(app.plugins.browsersync.stream());
};
