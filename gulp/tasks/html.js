// Добавление в файлы строк
import fileInclude from 'gulp-file-include';

// Обработка текстов типографом
import typograf from 'gulp-typograf';

// Проверка версий файлов
import versionNumber from 'gulp-version-number';

import plumberInit from './plumber.js';

import changed from "gulp-changed";

import webpAvifHtml from 'gulp-webp-avif-html-nosvg-nogif-lazyload';

// Плагин для минимизации html файлов
import htmlClean from "gulp-htmlclean";

export const html = () => {
	// Находим все .html в папке исходников
	return app.gulp.src(app.path.src.html)

	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(plumberInit('HTML')))

	.pipe(
		app.plugins.changed(
			app.path.build.html, {hasChanged: changed.compareContents}
		)
	)

	// Вставляем заданные @include
	.pipe(fileInclude({
		prefix: '@',
		basepath: '@file'
	}))

	// Добавляем атрибут версии для стилей и скриптов
	.pipe(app.plugins.if(
		app.isBuild,
		typograf({
			locale: ['ru', 'en-US'],

			htmlEntity: { type: 'name' },

			safeTags: [
				['<\\?php', '\\?>'],
				['<no-typography>', '</no-typography>'],
				['<head>', '</head>'],
				['<code>', '</code>'],
				['<pre>', '</pre>'],
				['---', '---'],
				['<script>', '</script>'],
				['<iframe>', '</iframe>'],
				['<img>'],
			],
		})
	))

	// Заменяем @img на assets/images/dist
	.pipe(app.plugins.replace(/@img\//g, 'assets/images/dist/'))

	.pipe(app.plugins.if(
		app.isBuild,
		webpAvifHtml()
	))

	// Если режим продакшена, то добавляем атрибут версии для стилей и скриптов
	.pipe(app.plugins.if(
		app.isBuild,
		versionNumber({
			'value': '%DT%',
			'append': {
				'key': '_v',
				'cover': 0,
				'to': [
					'css',
					'js',
				]
			},
			'output': {
				'file': 'gulp/version.json'
			}
		})
	))

	// Если режим продакшена минимизируем html файлы
	// .pipe(app.plugins.if(
	// 	app.isBuild,
	// 	htmlClean()
	// ))

	// Переименовываем итоговый файл
	.pipe(app.plugins.rename({
		extname: '.html'
	}))

	// Выгружаем файлы в папку готовой вёрстки
	.pipe(app.gulp.dest(app.path.build.html))

	// Перезагружаем страницу
	.pipe(app.plugins.browsersync.stream());
};
