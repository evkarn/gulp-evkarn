// Обработка ошибок
import {plumberInit} from './plumber.js'

export const imgMin = () => {
	// Находим исходники изображений
	return app.gulp.src(app.path.src.imgMin, {encoding:false})


	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('IMAGES-MINIMIZE')))


	// Проверяем менялись ли изображения
	.pipe(app.plugins.changed(app.path.build.img))


	// Если режим продакшена оптимизируем изображения
	.pipe(app.plugins.if(app.isBuild,
		app.plugins.imagemin({
			progressive: true,

			svgoPlugins: [{ removeViewBox: false }],

			interlaced: true,

			optimizationLevel: 3 // 0 to 7
		})
	))


	// Выгружаем изображения в папку assets/images
	.pipe(app.gulp.dest(app.path.build.img))


	// Перезагружаем страницу
	.pipe(app.plugins.browsersync.stream());
};
