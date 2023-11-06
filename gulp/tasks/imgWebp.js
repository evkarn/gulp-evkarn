// Преобразование картинок .png, .jpg в формат .webp
import webp from 'gulp-webp';

// Обработка ошибок
import plumberInit from './plumber.js'

export const imgWebp = () => {
	// Находим исходники изображений
	return app.gulp.src(app.path.src.imgAvifWebp)


	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('WEBP')))


	// Проверяем менялись ли изображения
	.pipe(app.plugins.changed(app.path.build.img))


	// Создаём дополнительные изображения формата .webp
	.pipe(webp())


	// Помещаем изображения в папку dist/assets/images/dist
	.pipe(app.gulp.dest(app.path.build.img))


	// Перезагружаем страницу
	.pipe(app.plugins.browsersync.stream());
};
