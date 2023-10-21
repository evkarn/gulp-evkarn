// Преобразование изображений в формат Avif
import avif from 'gulp-avif';

import plumberInit from './plumber.js'

export const imgAvif = () => {
	return app.gulp.src(app.path.src.imgAvifWebp)

	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('AVIF')))

	// Проверяем менялись ли изображения
	.pipe(
		app.plugins.changed(app.path.build.img)
	)

	// Если режим продакшена создаём дополнительные изображения формата .webp
	.pipe(app.plugins.if(
		app.isBuild,
		avif({
			quality: 75
		})
	))

	.pipe(
		app.gulp.dest(app.path.build.img)
	)

	.pipe(app.plugins.browsersync.stream());
};
