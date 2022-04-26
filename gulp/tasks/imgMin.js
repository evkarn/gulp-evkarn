// Оптимизация изображений
import imagemin from 'gulp-imagemin';

export const imgMin = () => {

	// Выводим сообщение об ошибке, если она возникнет
	return app.gulp.src(app.path.src.imgMin)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES-MINIMIZE",
				message: "Error: <%= error.message %>"
			})
		))

		// Если режим продакшена проверяем версии изображений
		.pipe(app.plugins.if(
			app.isBuild,
			app.plugins.newer(app.path.build.img)
		))

		// Если режим продакшена оптимизируем изображения
		.pipe(app.plugins.if(
			app.isBuild,
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		))

		// Помещаем оптимизированные изображения в папку проекта
		.pipe(app.gulp.dest(app.path.build.img))

		// Перезагружаем сайт
		.pipe(app.plugins.browsersync.stream());
};