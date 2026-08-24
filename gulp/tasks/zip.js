// Упаковка готовой сборки из dist в zip-архив в корне проекта.
//
// Запуск: npm run zip (предварительно сама соберёт проект).
// Итоговый файл: <имя-папки-проекта>.zip

import { deleteAsync } from 'del';

import zipPlugin from 'gulp-zip';

import plumberInit from './plumber.js';

export default async function zip() {
	// Удаляем старый архив, если он уже есть.
	// await обязателен: иначе удаление может начаться
	// параллельно с созданием нового архива
	await deleteAsync(`./${app.path.rootFolder}.zip`);

	// Находим все файлы готовой сборки
	return (
		app.gulp
			.src(`${app.path.buildFolder}/**/*.*`, {})

			// Выдаём сообщение об ошибке, если она есть
			.pipe(app.plugins.plumber(plumberInit('ZIP')))

			// Создаём архив проекта
			.pipe(zipPlugin(`${app.path.rootFolder}.zip`))

			// Помещаем архив в корень
			.pipe(app.gulp.dest('./'))
	);
}
