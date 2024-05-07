// Преобразование изображений в формат Avif
import avif from 'gulp-avif';

// Обработка ошибок
import plumberInit from './plumber.js'

export const imgAvif = () => {
	// Находим исходники изображений
	return app.gulp.src(`${app.path.src.imgAvifWebp}`, {encoding:false})


	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('AVIF')))


	// Проверяем менялись ли изображения
	.pipe(app.plugins.changed(app.path.build.img))


	// Создаём дополнительные изображения формата .avif
	.pipe(avif({ quality: 75 }))


	// Помещаем изображения в папку dist/assets/images/dist
	.pipe(app.gulp.dest(app.path.build.img))


	// Перезагружаем страницу
	.pipe(app.plugins.browsersync.stream());
};
