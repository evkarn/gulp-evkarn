// Преобразование изображений в формат Avif
import avif from 'gulp-avif';

import plumberInit from './plumber.js'

export const imgAvif = () => {
	return app.gulp.src(app.path.src.imgAvifWebp)
		.pipe(app.plugins.plumber(plumberInit('AVIF')))

		.pipe(
			app.plugins.newer(app.path.build.img)
		)

		.pipe(
			avif({ quality: 75 })
		)

		.pipe(
			app.gulp.dest(app.path.build.img)
		)

		.pipe(app.plugins.browsersync.stream());
};
