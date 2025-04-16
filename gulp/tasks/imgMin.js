// Обработка ошибок
import plumberInit from './plumber.js';
import imageminAvif from 'imagemin-webp';
import imageminWebp from 'imagemin-avif';

export default function imgMin() {
	// Находим исходники изображений
	return (
		app.gulp
			.src(app.path.src.img, { encoding: false })


			// Выдаём сообщение об ошибке, если она есть
			.pipe(app.plugins.plumber(plumberInit('IMAGES')))


			// Проверяем менялись ли изображения
			.pipe(app.plugins.changed(app.path.build.img))
			.pipe(
				app.plugins.imagemin([
					imageminWebp({
						quality: 80,
					}),
				]),
			)
			.pipe(app.plugins.rename({ extname: '.webp' }))
			.pipe(app.gulp.dest(app.path.build.img))


			.pipe(app.gulp.src(app.path.src.img, { encoding: false }))
			.pipe(
				app.plugins.imagemin([
					imageminAvif({
						quality: 80,
					}),
				]),
			)
			.pipe(app.plugins.rename({ extname: '.avif' }))
			.pipe(app.gulp.dest(app.path.build.img))


			.pipe(app.gulp.src(app.path.src.img, { encoding: false }))
			// Если режим продакшена оптимизируем изображения
			.pipe(
				app.plugins.if(
					app.isBuild,
					app.plugins.imagemin({
						progressive: true,
						interlaced: true,
						optimizationLevel: 3, // 0 to 7
					}),
				),
			)
			// Выгружаем изображения в папку assets/images
			.pipe(app.gulp.dest(app.path.build.img))

			// Перезагружаем страницу
			.pipe(app.plugins.browsersync.stream())
	);
}
