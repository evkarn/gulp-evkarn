// imgMin.js - более простой вариант с merge-stream
import plumberInit from './plumber.js';
import imageminWebp from 'imagemin-webp';
import imageminAvif from 'imagemin-avif';
import merge from 'merge-stream';

export default function imgMin() {
	// Поток для WebP
	const webpStream = app.gulp
		.src(app.path.src.img, { encoding: false })
		.pipe(app.plugins.plumber(plumberInit('IMAGES')))
		.pipe(app.plugins.newer(app.path.build.img))
		.pipe(app.plugins.imagemin([imageminWebp({ quality: 80 })], { verbose: true }))
		.pipe(app.plugins.rename({ extname: '.webp' }))
		.pipe(app.gulp.dest(app.path.build.img));

	// Поток для AVIF
	const avifStream = app.gulp
		.src(app.path.src.img, { encoding: false })
		.pipe(app.plugins.plumber(plumberInit('IMAGES')))
		.pipe(app.plugins.newer(app.path.build.img))
		.pipe(app.plugins.imagemin([imageminAvif({ quality: 80 })], { verbose: true }))
		.pipe(app.plugins.rename({ extname: '.avif' }))
		.pipe(app.gulp.dest(app.path.build.img));

	// Поток для оптимизации
	const optimizeStream = app.gulp
		.src(app.path.src.img, { encoding: false })
		.pipe(app.plugins.plumber(plumberInit('IMAGES')))
		.pipe(app.plugins.newer(app.path.build.img))
		.pipe(app.plugins.imagemin({
			progressive: true,
			interlaced: true,
			quality: 80,
			optimizationLevel: 3,
			verbose: true,
		}))
		.pipe(app.gulp.dest(app.path.build.img))
		.pipe(app.plugins.browsersync.stream());

	// Объединяем все потоки в один
	return merge(webpStream, avifStream, optimizeStream);
}
