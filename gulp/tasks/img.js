export const img = () => {

	// Выводим сообщение об ошибке, если она возникнет
	return app.gulp.src(app.path.src.img)
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "IMAGES-COPYING",
			message: "Error: <%= error.message %>"
		})
	))

	// проверяем версии изображений
	.pipe(app.plugins.newer(app.path.build.img)) 

	// Помещаем изображения в папку проекта
	.pipe(app.gulp.dest(app.path.build.img))

	// Перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};