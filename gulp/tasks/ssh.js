// Выгрузка готовой сборки на сервер по SSH через rsync.
//
// Запуск: npm run ssh (предварительно сама соберёт проект).
// Требуется настроенный ssh-доступ к серверу (по ключу или агенту).
// Данные подключения — в файле .env (шаблон: .env.example).

// Передача обновлённых файлов через ssh
import rsync from 'gulp-rsync';

// Обработка ошибок
import plumberInit from './plumber.js';

export default function ssh() {
	// Проверяем, что данные для подключения заполнены
	const {
		SSH_HOST: host,
		SSH_USER: user,
		SSH_DESTINATION: destination,
	} = process.env;

	if (!host || !user || !destination) {
		throw new Error(
			'SSH: не заданы SSH_HOST, SSH_USER или SSH_DESTINATION. ' +
				'Скопируйте .env.example в .env и заполните данные подключения.',
		);
	}

	// Берём только готовую сборку из dist
	return (
		app.gulp
			.src(`${app.path.buildFolder}/**/*.*`, {})

			// Выдаём сообщение об ошибке, если она есть
			.pipe(app.plugins.plumber(plumberInit('SSH')))

			// Передаём файлы на сервер
			.pipe(
				rsync({
					root: `${app.path.buildFolder}/`,

					hostname: host,

					username: user,

					destination: destination,

					exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Исключённые файлы

					recursive: true,

					archive: true,

					silent: false,

					compress: true,
				}),
			)
	);
}
