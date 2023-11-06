// Обработка ошибок
import plumberInit from './plumber.js'

export const socialImagesMin = () => {
	// Находим исходники изображений
	return app.gulp.src(app.path.src.socialImages)


	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('SOCIAL-IMAGES')))


	// Проверяем менялись ли изображения
	.pipe(app.plugins.changed(app.path.build.socialImages))


	// Оптимизируем изображения
	.pipe(
		app.plugins.imagemin({
			progressive: true,

			interlaced: true,

			quality: 75,

			optimizationLevel: 3 // 0 to 7
		})
	)


		// Помещаем изображения в папку dist
	.pipe(app.gulp.dest(app.path.build.socialImages));
};
