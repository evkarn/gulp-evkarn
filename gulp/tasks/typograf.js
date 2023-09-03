import typograf from 'gulp-typograf'

import plumberInit from './plumber.js'

export const typografInit = () => {
	// Находим все .html в папке исходников
	return app.gulp.src(app.path.src.typograf)

	// Вывод сообщения об ошибке, если появляется ошибка
	.pipe(app.plugins.plumber(plumberInit('TYPOGRAF')))

	// Добавляем атрибут версии для стилей и скриптов
	.pipe(typograf({
		locale: ['ru', 'en-US'],

		htmlEntity: { type: 'name' },

		safeTags: [
			['<\\?php', '\\?>'],
			['<no-typography>', '</no-typography>'],
			['<head>', '</head>'],
			['---', '---'],
			['<script>', '</script>'],
			['<iframe>', '</iframe>'],
			['<img>'],
		],
	}))

	// Выгружаем файлы в папку исходников
	.pipe(app.gulp.dest(app.path.build.typograf))

	// Перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};
