// Оптимизация файлов .svg
import svgoMin from 'gulp-svgo';

export const imgSVG = () => {
	return app.gulp.src(app.path.src.imgSVG)

	// Выводим сообщение об ошибке, если она возникнет
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES-SVG",
				message: "Error: <%= error.message %>"
			})
		))

		// проверяем версии изображений в папке dist
		.pipe(app.plugins.newer(app.path.build.img))

		// Оптимизируем файлы
		.pipe(svgoMin())

		// Копируем svg в папку проекта
		.pipe(app.gulp.dest(app.path.build.img))

		// Перезагружаем сайт
		.pipe(app.plugins.browsersync.stream());
};