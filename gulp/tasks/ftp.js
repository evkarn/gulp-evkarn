import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
	configFTP.log = util.log;

	const ftpConnect = vinylFTP.create(configFTP);

	// Находим все файлы в папке проекта
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})

		// Выдаём сообщение об ошибке, если она есть
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FTp",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
};