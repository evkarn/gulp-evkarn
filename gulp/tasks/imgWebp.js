// Преобразование картинок .png, .jpg в формат .webp
import webp from 'gulp-webp';

import plumberInit from './plumber.js'

export const imgWebp = () => {
	return app.gulp.src(app.path.src.imgAvifWebp)

	.pipe(app.plugins.plumber(plumberInit('WEBP')))

	// Проверяем менялись ли изображения
	.pipe(
		app.plugins.changed(app.path.build.img)
	)

	.pipe(app.plugins.if(
		app.isBuild,
		webp()
	))

	.pipe(
		app.gulp.dest(app.path.build.img)
	)

	.pipe(app.plugins.browsersync.stream());
};
