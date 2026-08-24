// Сборка HTML.
//
// Источники: src/html/**/*.html — страницы,
//            src/includes/**/*    — подключаемые фрагменты.
//
// Что происходит:
//   1. gulp-file-include разворачивает директивы @include
//      (подробнее в README, раздел «HTML»).
//   2. Чистятся переносы строк внутри <img> и нормализуются пути.
//   3. Только в build: типограф Лебедева обрабатывает текст,
//      htmlClean минифицирует разметку, к ссылкам на css/js
//      добавляется версия для сброса браузерного кэша.

// Добавление в файлы строк
import fileInclude from 'gulp-file-include';

// Обработка текстов типографом
import typograf from 'gulp-typograf';

// Проверка версий файлов
import versionNumber from 'gulp-version-number';

// Обработка ошибок
import plumberInit from './plumber.js';

// Минимизация html-файлов
import htmlClean from 'gulp-htmlclean';

export default function html() {
	// Находим все .html в папке исходников
	return (
		app.gulp
			.src(app.path.src.html)

			// Вывод сообщения об ошибке, если появляется ошибка
			.pipe(app.plugins.plumber(plumberInit('HTML')))

			// Вставляем заданные @include
			.pipe(
				fileInclude({
					prefix: '@',
					basepath: '@root',
					maxRecursion: 100,
				}),
			)

			// Удаляет лишние пробелы и переводы строк внутри тега <img>
			.pipe(
				app.plugins.replace(/<img(?:.|\n|\r)*?>/g, function (match) {
					return match.replace(/\r?\n|\r/g, '').replace(/\s{2,}/g, ' ');
				}),
			)

			// Приводим пути к статике к виду ./css/..., ./js/... и т.д.
			.pipe(
				app.plugins.replace(
					/(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^/'"]+(\/))?([^'"]*)\1/gi,
					'$1./$4$5$7$1',
				),
			)

			// Обработка текста типографом (только в build)
			.pipe(
				app.plugins.if(
					app.isBuild,
					typograf({
						locale: ['ru', 'en-US'],

						htmlEntity: { type: 'name' },

						safeTags: [
							['<\\?php', '\\?>'],
							['\\{\\{', '\\}\\}'],
							['\\{', '\\}'],
							['<no-typography>', '</no-typography>'],
							[
								'<head itemscope itemtype="https://schema.org/WPHeader">',
								'</head>',
							],
							['<head>', '</head>'],
							['<title itemprop="headline">', '</title>'],
							['<title>', '</title>'],
							['<code>', '</code>'],
							['<pre>', '</pre>'],
							['---', '---'],
							['<script>', '</script>'],
							['<iframe>', '</iframe>'],
							['<img>'],
						],
					}),
				),
			)

			// Минимизируем html (только в build)
			.pipe(app.plugins.if(app.isBuild, htmlClean()))

			// Добавляем версию к ссылкам на css/js (только в build) —
			// делаем это последним шагом, чтобы типограф и htmlClean
			// уже не трогали готовые адреса
			.pipe(
				app.plugins.if(
					app.isBuild,
					versionNumber({
						value: '%DT%',

						append: {
							key: '_v',
							cover: 0,
							to: ['css', 'js'],
						},

						output: {
							file: 'gulp/version.json',
						},
					}),
				),
			)

			// Выгружаем файлы в папку готовой вёрстки
			.pipe(app.gulp.dest(app.path.build.html))

			// Перезагружаем страницу
			.pipe(app.plugins.browsersync.stream())
	);
}
