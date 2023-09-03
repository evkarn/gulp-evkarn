// Удаление файлов
import {deleteAsync} from "del";

// Создание архива
import zipPlugin from "gulp-zip";

import plumberInit from './plumber.js'

export const zip = () => {
	// Удаляем архив, если он уже есть
	deleteAsync(`./${app.path.rootFolder}.zip`);

	// Находим все файлы в папке проекта
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})

	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('ZIP')))

	// Создаём архив проекта
	.pipe(zipPlugin(`${app.path.rootFolder}`))

	// Помещаем архив в корень
	.pipe(app.gulp.dest('./'));
};
