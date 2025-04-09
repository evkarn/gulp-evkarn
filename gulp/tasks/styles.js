// Добавление вендерных префиксов для кросс-браузерной вёрстки
import autoprefixer from 'gulp-autoprefixer';

// Сжатие CSS файла
import cleanCss from 'gulp-clean-css';

// Обработка стилей sass, scss
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

// Группировка медиа запросов
import postCss from 'gulp-postcss';
import sortCSSmq from 'sort-css-media-queries';
import mqPacker from 'css-mqpacker';

// Обработка ошибок
import plumberInit from './plumber.js';

// Отслеживание изменений в файлах
import { compareContents } from 'gulp-changed';

const sass = gulpSass(dartSass);

export default function styles() {
	// Находим файлы sass в папке исходников
	return (
		app.gulp
			.src(app.path.src.styles, { sourcemaps: !app.isBuild })

			// Вывод сообщения об ошибке, если появляется ошибка
			.pipe(app.plugins.plumber(plumberInit('STYLES')))

			// Отслеживание и обработка только изменившихся файлов
			.pipe(
				app.plugins.changed(app.path.build.css, {
					hasChanged: compareContents,
				}),
			)

			// Выбор вида сжатия конечного файла
			.pipe(
				sass({
					outputStyle: 'compressed',
				}).on('error', sass.logError),
			)

			// Если в режиме продакшена группируем медиа-запросы
			.pipe(
				postCss([
					mqPacker({
						sort: sortCSSmq,
					}),
				]),
			)

			// Если в режиме продакшена добавляем вендерные префиксы для совместимости стилей
			.pipe(
				app.plugins.if(
					app.isBuild,
					autoprefixer({
						grid: true,
						overrideBrowsersList: ['last 5 versions'],
						cascade: false,
					}),
				),
			)

			// Убираем лишнее в адресах картинок
			.pipe(
				app.plugins.replace(
					/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
					'$1$2$3$4$6$1',
				),
			)

			// Если в режиме продакшена создаём не сжатый дубль файла стилей
			.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.css)))

			// Если в режиме продакшена сжимаем файл стилей
			.pipe(app.plugins.if(app.isBuild, cleanCss({ level: 2 })))

			// Переименовываем итоговый файл
			.pipe(
				app.plugins.rename({
					extname: '.min.css',
				}),
			)

			// Выгружаем файл стилей в папку проекта dist
			.pipe(app.gulp.dest(app.path.build.css, { sourcemaps: '.' }))

			// При обновлении файла перезагружаем страницу
			.pipe(app.plugins.browsersync.stream())
	);
}
