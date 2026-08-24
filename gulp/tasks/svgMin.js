// Обработка ошибок
import plumberInit from './plumber.js';

export default function svgMin() {
	// Находим исходники изображений
	return (
		app.gulp
			.src(app.path.src.svg, { encoding: false })

			// Выдаём сообщение об ошибке, если она есть
			.pipe(app.plugins.plumber(plumberInit('SVG-MINIMIZE')))

			// Проверяем менялись ли изображения
			.pipe(app.plugins.changed(app.path.build.svg))

			// Если режим продакшена оптимизируем изображения
			.pipe(
				app.plugins.imagemin({
					progressive: true,

					svgoPlugins: [{ removeViewBox: false }],

					interlaced: true,

					optimizationLevel: 3, // 0 to 7
				}),
			)

			// Выгружаем изображения в папку assets/images
			.pipe(app.gulp.dest(app.path.build.svg))

			// Перезагружаем страницу
			.pipe(app.plugins.browsersync.stream())
	);
}
