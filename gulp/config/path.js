// Центральный конфиг путей сборки.
//
// Здесь заданы:
//   build — куда складывается результат (dist),
//   src   — где лежат исходники,
//   watch — какие маски отслеживает вотчер в режиме dev,
//   clean — что удаляется перед сборкой.

// Плагин для получения пути к проекту
import * as nodePath from 'path';

// Путь к папке проекта
const rootFolder = nodePath.basename(nodePath.resolve());

// Путь к папке с результатом для выгрузки
const buildFolder = `./dist`;

// Путь к папке с рабочими файлами
const srcFolder = `./src`;

const preprocessor = 'scss';

export const path = {
	build: {
		css: `${buildFolder}/css/`,

		configFiles: `${buildFolder}/`,

		favicon: `${buildFolder}/assets/favicon/`,

		files: `${buildFolder}/assets/files/`,

		fonts: `${buildFolder}/assets/fonts/`,

		html: `${buildFolder}/`,

		img: `${buildFolder}/assets/images/`,

		svg: `${buildFolder}/assets/svg/static/`,

		sprite: `${buildFolder}/assets/svg/sprite/`,

		js: `${buildFolder}/js/`,
	},

	// Пути к исходникам файлов
	src: {
		configFiles: `${srcFolder}/config/*.*`,

		favicon: `${srcFolder}/assets/favicon/*.*`,

		files: `${srcFolder}/assets/files/**/*.*`,

		fonts: `${srcFolder}/assets/fonts/*.ttf`,

		fontsFaces: `${srcFolder}/styles/${preprocessor}/fonts/_fonts-faces.${preprocessor}`,

		html: `${srcFolder}/html/**/*.{html,htm}`,

		js: `${srcFolder}/js/*.{js,mjs}`,

		img: `${srcFolder}/assets/images/**/*.*`,

		svg: [
			`${srcFolder}/assets/svg/static/**/*.svg`,

			// Спрайт собирается отдельным таском — исключаем его исходники
			`!${srcFolder}/assets/svg/sprite/**`,
		],

		sprite: `${srcFolder}/assets/svg/sprite/**/*.svg`,

		styles: [
			`${srcFolder}/styles/${preprocessor}/*.${preprocessor}`,

			// Партиалы (файлы «_*.scss») отдельно не собираются
			`!${srcFolder}/styles/${preprocessor}/_*.${preprocessor}`,
		],
	},

	// Отслеживание изменений в файлах
	watch: {
		configFiles: `${srcFolder}/config/**/*.*`,

		favicon: `${srcFolder}/assets/favicon/**/*.*`,

		files: `${srcFolder}/assets/files/**/*.*`,

		html: `${srcFolder}/**/*.html`,

		img: `${srcFolder}/assets/images/**/*.*`,

		svg: [
			`${srcFolder}/assets/svg/static/**/*.*`,

			// Спрайт обрабатывает отдельный таск
			`!${srcFolder}/assets/svg/sprite/**`,
		],

		sprite: `${srcFolder}/assets/svg/sprite/**/*.*`,

		js: `${srcFolder}/js/**/*.js`,

		styles: `${srcFolder}/**/*.${preprocessor}`,
	},

	// Перед каждой сборкой dist очищается целиком:
	// mainTasks копирует туда все нужные файлы заново
	clean: [`${buildFolder}/`],

	buildFolder: buildFolder,

	srcFolder: srcFolder,

	rootFolder: rootFolder,

	// Папка на FTP-сервере для выгрузки (см. .env.example)
	ftp: process.env.FTP_REMOTE_PATH || rootFolder,
};
