// Преобразование картинок .png, .jpg в формат .webp
import webp from 'gulp-webp';

import plumberInit from './plumber.js'

export const imgWebp = () => {
	return app.gulp.src(app.path.src.imgAvifWebp)
		.pipe(app.plugins.plumber(plumberInit('WEBP')))

		.pipe(
			app.plugins.newer(app.path.build.img)
		)

		.pipe(
			webp({ quality: 75 })
		)

		.pipe(
			app.gulp.dest(app.path.build.img)
		)

		.pipe(app.plugins.browsersync.stream());
};
