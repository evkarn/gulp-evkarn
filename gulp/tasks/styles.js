// Добавление вендерных префиксов для кросс-браузерной вёрстки

// Обработка стилей sass, scss
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

// Группировка медиа запросов
import postCss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sortCSSmq from 'sort-css-media-queries';
import mqPacker from 'css-mqpacker';
import cssnano from 'cssnano';
import pxToRem from 'postcss-pxtorem';

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

			.pipe(
				sass({
					// style: 'compressed',
				}).on('error', sass.logError),
			)

			// Убираем лишнее в адресах картинок
			.pipe(
				app.plugins.replace(
					/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
					'$1$2$3$4$6$1',
				),
			)

			// Если в режиме продакшена группируем медиа-запросы и сжимаем файл стилей
			.pipe(
				app.plugins.if(
					app.isBuild,
					postCss([
						autoprefixer({
							grid: true,
							overrideBrowsersList: ['last 5 versions'],
							cascade: false,
						}),

						mqPacker({
							sort: sortCSSmq,
						}),

						pxToRem({
							rootValue: 16,
							unitPrecision: 5,
							propList: [
								'font',
								'font-size',
								'line-height',
								'letter-spacing',
								'margin',
								'margin-top',
								'margin-right',
								'margin-bottom',
								'margin-left',
								'padding',
								'padding-top',
								'padding-right',
								'padding-bottom',
								'padding-left',
								'width',
								'max-width',
								'min-width',
								'height',
								'max-height',
								'min-height',
								'border-radius',
								'border-width',
							],
							selectorBlackList: [],
							replace: true,
							mediaQuery: true,
							minPixelValue: 0,
							exclude: /node_modules/i,
						}),

						cssnano({
							preset: ['default'],
						}),
					]),
				),
			)

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
