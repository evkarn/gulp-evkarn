// Настройки подключения к FTP.
//
// Значения берутся из переменных окружения, которые загружаются
// из файла .env в корне проекта (см. gulp/config/env.js и .env.example).
// Так логины и пароли не попадают в репозиторий.

export const configFTP = {
	host: process.env.FTP_HOST || '',

	user: process.env.FTP_USER || '',

	password: process.env.FTP_PASSWORD || '',

	parallel: Number(process.env.FTP_PARALLEL) || 5,
};
