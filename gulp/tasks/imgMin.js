// Оптимизация изображений из src/assets/images.
//
// Для каждой картинки в dist/assets/images создаётся:
//   1. оптимизированный оригинал (jpg/png/...)
//   2. копия .webp  (quality 80)
//   3. копия .avif  (quality 80)
//
// Три прохода выполняются ПОСЛЕДОВАТЕЛЬНО (gulp.series):
// параллельный запуск через merge-stream в Gulp 5 приводит
// к гонкам потоков и потере части файлов .avif.
//
// Повторные сборки обрабатывают только новые и изменённые файлы
// (gulp-newer сравнивает с уже лежащим в dist).

import imageminWebp from 'imagemin-webp';
import imageminAvif from 'imagemin-avif';

import gulp from 'gulp';

import plumberInit from './plumber.js';

// Поток для WebP
function imgWebp() {
	return app.gulp
		.src(app.path.src.img, { encoding: false })
		.pipe(app.plugins.plumber(plumberInit('IMAGES-WEBP')))
		.pipe(app.plugins.newer(app.path.build.img))
		.pipe(
			app.plugins.imagemin([imageminWebp({ quality: 80 })], { verbose: true }),
		)
		.pipe(app.plugins.rename({ extname: '.webp' }))
		.pipe(app.gulp.dest(app.path.build.img));
}

// Поток для AVIF
function imgAvif() {
	return app.gulp
		.src(app.path.src.img, { encoding: false })
		.pipe(app.plugins.plumber(plumberInit('IMAGES-AVIF')))
		.pipe(app.plugins.newer(app.path.build.img))
		.pipe(
			app.plugins.imagemin([imageminAvif({ quality: 80 })], { verbose: true }),
		)
		.pipe(app.plugins.rename({ extname: '.avif' }))
		.pipe(app.gulp.dest(app.path.build.img));
}

// Поток для оптимизации оригиналов
function imgOptimize() {
	return app.gulp
		.src(app.path.src.img, { encoding: false })
		.pipe(app.plugins.plumber(plumberInit('IMAGES')))
		.pipe(app.plugins.newer(app.path.build.img))
		.pipe(
			app.plugins.imagemin({
				progressive: true,
				interlaced: true,
				optimizationLevel: 3,
				verbose: true,
			}),
		)
		.pipe(app.gulp.dest(app.path.build.img))
		.pipe(app.plugins.browsersync.stream());
}

export default gulp.series(imgWebp, imgAvif, imgOptimize);
