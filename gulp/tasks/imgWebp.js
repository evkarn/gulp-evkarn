// Преобразование картинок .png, .jpg в формат .webp
import webp from 'gulp-webp';

export const imgWebp = () => {
	return app.gulp.src(app.path.src.imgWebp)

	// Выводим сообщение об ошибке, если она возникнет
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES-WEBP",
				message: "Error: <%= error.message %>"
			})
		))

		// Если режим продакшена проверяем версии изображений
		.pipe(app.plugins.if(
			app.isBuild,
			app.plugins.newer(app.path.build.img)
		))

		// Если режим продакшена создаём изображение в формате webp
		.pipe(app.plugins.if(
			app.isBuild,
			webp()
		))

		// Если режим продакшена выгружаем созданные изображения в папку с изображениями
		.pipe(app.plugins.if(
			app.isBuild,
			app.gulp.dest(app.path.src.imgSrc)
		))

		// Перезагружаем сайт
		.pipe(app.plugins.browsersync.stream());
};