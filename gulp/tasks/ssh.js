// Передача обновлённых файлов через ssh
import rsync from 'gulp-rsync';

// Обработка ошибок
import {plumberInit} from './plumber.js'

export const ssh = () => {
	// Берём все файлы
	return app.gulp.src(`${app.path.rootFolder}/**/*.*`, {})


	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(plumberInit('SSH')))


	// Передаём файлы на сервер
	.pipe(rsync({
		root: './dist/',

		hostname: 'intelle6@intellektfinanceru.intelle6.cp.regruhosting.ru',

		destination: '/var/www/intelle6/public_html/intellektfinance.ru',

		include: ['*.htaccess'], // Included files

		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files

		recursive: true,

		archive: true,

		silent: false,

		compress: true
	}));
};
