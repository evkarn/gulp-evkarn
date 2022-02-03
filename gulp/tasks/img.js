import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const img = () => {
	return app.gulp.src(app.path.src.img)
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "IMAGES",
			message: "Error: <%= error.message %>"
		})
	))

	// проверяем версии изображений
	.pipe(app.plugins.newer(app.path.build.img)) 

	// Если режим продакшена создаём изображение в формате webp
	.pipe(app.plugins.if(
		app.isBuild,
		webp()
	))	

	// Если режим продакшена выгружаем созданные изображения в папку с изображениями
	.pipe(app.plugins.if(
		app.isBuild,
		app.gulp.dest(app.path.build.img)
	))

	// Если режим продакшена снова получаем доступ к папке с исходными изображениями
	.pipe(app.plugins.if(
		app.isBuild,
		app.gulp.src(app.path.src.img)
	))

	// Если режим продакшена снова проверяем версии изображений
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

	// Получаем доступ к svg изображениям в папке исходников
	.pipe(app.gulp.src(app.path.src.svg))

	// Копируем svg в папку проекта
	.pipe(app.gulp.dest(app.path.build.img))

	// Перезагружаем сайт
	.pipe(app.plugins.browsersync.stream());
};