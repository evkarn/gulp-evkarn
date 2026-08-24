// Сборка стилей SCSS.
//
// Источники: src/styles/scss/*.scss — точки входа.
//            Файлы с префиксом «_» считаются партиалами
//            и отдельно не собираются.
//
// Что происходит:
//   dev  — компиляция dart-sass, sourcemaps рядом с файлом.
//   build — autoprefixer, группировка медиазапросов, перевод px в rem,
//           сжатие cssnano. Результат — dist/css/*.min.css.

// Обработка стилей sass, scss
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

// Группировка медиа запросов и постобработка css (только build)
import postCss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import pxToRem from 'postcss-pxtorem';
import cssnano from 'cssnano';

// Обработка ошибок
import plumberInit from './plumber.js';

const sass = gulpSass(dartSass);

export default function styles() {
	// Находим файлы sass в папке исходников
	return (
		app.gulp
			.src(app.path.src.styles, { sourcemaps: !app.isBuild })

			// Вывод сообщения об ошибке, если появляется ошибка
			.pipe(app.plugins.plumber(plumberInit('STYLES')))

			.pipe(
				sass({
					// Где искать файлы при @use/@import
					loadPaths: [
						'./src',
						'./src/components',
						'./src/styles/scss',
						'./src/styles/scss/vars',
						'./node_modules',
					],
					// outputStyle: 'compressed'
				}).on('error', sass.logError),
			)

			// Убираем лишнее в адресах картинок
			.pipe(
				app.plugins.replace(
					/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^/'"]+(\/))?([^'"]*)\1/gi,
					'$1$2$3$4$6$1',
				),
			)

			// В режиме продакшена группируем медиа-запросы и сжимаем файл стилей
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

						postcssSortMediaQueries({
							sort: 'desktop-first',
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
