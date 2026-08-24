// Мини-загрузчик переменных окружения из файла .env.
//
// Зачем: данные для FTP/SSH-деплоя (логины, пароли, хосты) не должны
// храниться в коде — они попадают в git-историю. Вместо этого они лежат
// в файле .env, который игнорируется git'ом. Шаблон для заполнения —
// .env.example в корне проекта.
//
// Файл подключается первым импортом в gulpfile.js, чтобы все конфиги
// ниже уже видели заполненный process.env.
import fs from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env');

if (fs.existsSync(envPath)) {
	const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);

	for (let line of lines) {
		line = line.trim();

		// Пропускаем пустые строки и комментарии
		if (!line || line.startsWith('#')) continue;

		const separatorIndex = line.indexOf('=');
		if (separatorIndex === -1) continue;

		const key = line.slice(0, separatorIndex).trim();
		let value = line.slice(separatorIndex + 1).trim();

		// Убираем необязательные кавычки вокруг значения
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		// Переменные, уже заданные в системе, имеют приоритет
		if (!(key in process.env)) {
			process.env[key] = value;
		}
	}
}
