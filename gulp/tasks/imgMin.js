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


			// Проверяем менялись ли изображения и создаём дубликаты изображений в формате .webp
			.pipe(app.plugins.changed(app.path.build.img))
			.pipe(
				app.plugins.imagemin(
					[
						imageminWebp({
							quality: 80,
						}),
					],
					{ verbose: true },
				),
			)
			.pipe(app.plugins.rename({ extname: '.webp' }))
			.pipe(app.gulp.dest(app.path.build.img))


			// Проверяем менялись ли изображения и создаём дубликаты изображений в формате .avif
			.pipe(app.gulp.src(app.path.src.img, { encoding: false }))
			.pipe(app.plugins.changed(app.path.build.img))
			.pipe(
				app.plugins.imagemin(
					[
						imageminAvif({
							quality: 80,
						}),
					],
					{ verbose: true },
				),
			)
			.pipe(app.plugins.rename({ extname: '.avif' }))
			.pipe(app.gulp.dest(app.path.build.img))


			// Если режим продакшена оптимизируем изображения
			.pipe(app.gulp.src(app.path.src.img, { encoding: false }))
			.pipe(app.plugins.changed(app.path.build.img))
			.pipe(app.plugins.imagemin({
				progressive: true,
				interlaced: true,
				quality: 80,
				optimizationLevel: 3, // 0 to 7
				verbose: true,
			})))


			// Выгружаем изображения в папку assets/images
			.pipe(app.gulp.dest(app.path.build.img))


			// Перезагружаем страницу
			.pipe(app.plugins.browsersync.stream())
	);
}
