// Выгрузка готовой сборки на FTP-сервер.
//
// Запуск: npm run ftp (предварительно сама соберёт проект).
// Данные подключения — в файле .env (шаблон: .env.example).

import { configFTP } from '../config/ftp.js';

import vinylFTP from 'vinyl-ftp';

import plumberInit from './plumber.js';

export default function ftp() {
	// Проверяем, что данные для подключения заполнены
	if (!configFTP.host || !configFTP.user || !configFTP.password) {
		throw new Error(
			'FTP: не заданы FTP_HOST, FTP_USER или FTP_PASSWORD. ' +
				'Sкопируйте .env.example в .env и заполните данные подключения.',
		);
	}

	// Лог процесса выгрузки — в терминал
	configFTP.log = message => console.log(message);

	const ftpConnect = vinylFTP.create(configFTP);

	// Находим все файлы готовой сборки и заливаем на сервер
	return (
		app.gulp
			.src(`${app.path.buildFolder}/**/*.*`, {})

			// Выдаём сообщение об ошибке, если она есть
			.pipe(app.plugins.plumber(plumberInit('FTP')))

			.pipe(ftpConnect.dest(`/${app.path.ftp}`))
	);
}
