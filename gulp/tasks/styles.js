// Добавление вендерных префиксов для кросс-браузерной вёрстки

// Обработка стилей sass, scss
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

// Группировка медиа запросов
import postCss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import sortCSSmq from 'sort-css-media-queries';
import mqPacker from 'css-mqpacker';
import pxToRem from 'postcss-pxtorem';
import cssnano from 'cssnano';

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

						postcssPresetEnv({}),

						mqPacker({
							sort: sortCSSmq,
						}),

						pxToRem({
							propList: ['*'],
							selectorBlackList: [],
							replace: true,
							mediaQuery: true,
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
