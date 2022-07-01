// Преобразование изображений в формат Avif
import avif from 'gulp-avif';

export const imgAvif = () => {
	return app.gulp.src(app.path.src.imgAvif)

		// Вывод сообщения об ошибке, если появляется ошибка
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES-AVIF",
				message: "Error: <%= error.message %>"
			})
		))

		// Если режим продакшена проверяем версии изображений
		.pipe(app.plugins.if(
			app.isBuild,
			app.plugins.newer(app.path.build.img)
		))

		// Если режим продакшена создаём изображение в формате .avif
		.pipe(app.plugins.if(
			app.isBuild,
			avif()
		))

		// Если режим продакшена выгружаем созданные изображения в папку с изображениями
		.pipe(app.plugins.if(
			app.isBuild,
			app.gulp.dest(app.path.src.imgSrc)
		))

		// Перезагружаем сайт
		.pipe(app.plugins.browsersync.stream());
};