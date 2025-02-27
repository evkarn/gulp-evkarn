import { configFTP } from '../config/ftp.js';

import vinylFTP from 'vinyl-ftp';

import util from 'gulp-util';

import {plumberInit} from './plumber.js'

export const ftp = () => {
	configFTP.log = util.log;

	const ftpConnect = vinylFTP.create(configFTP);

	// Находим все файлы в папке проекта
	return app.gulp.src(`${app.path.build.allFiles}`, {})

		// Выдаём сообщение об ошибке, если она есть
		.pipe(app.plugins.plumber(plumberInit('FTP')))

		.pipe(ftpConnect.dest(`/${app.path.ftp}`));
};
