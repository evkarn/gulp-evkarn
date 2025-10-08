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

		svg: `${buildFolder}/assets/svg/`,

		sprite: `${buildFolder}/assets/svg/sprite/`,

		js: `${buildFolder}/js/`,
	},

	// Пути к исходникам файлов
	src: {
		configFiles: `${srcFolder}/config/*.{php,htaccess,txt,xml,ico,png,svg}`,

		favicon: `${srcFolder}/assets/favicon/*.*`,

		files: `${srcFolder}/assets/files/**/*.*`,

		fonts: `${srcFolder}/assets/fonts/*.ttf`,

		fontsFaces: `${srcFolder}/styles/${preprocessor}/fonts/_fonts-faces.${preprocessor}`,

		html: `${srcFolder}/html/**/*.{html,htm}`,

		js: `${srcFolder}/js/*.{js,mjs}`,

		img: `${srcFolder}/assets/images/**/*.*`,

		svg: [
			`${srcFolder}/assets/svg/**/*.svg`,
			`!${srcFolder}/assets/svg/sprite/`,
		],

		sprite: `${srcFolder}/assets/svg/sprite/**/*.svg`,

		styles: [
			`${srcFolder}/styles/${preprocessor}/*.${preprocessor}`,
			`!${srcFolder}/styles/${preprocessor}/_*.${preprocessor}`,
		],
	},

	// Отслеживание изменений в файлах
	watch: {
		files: `${srcFolder}/assets/files/**/*.*`,

		html: `${srcFolder}/**/*.html`,

		img: `${srcFolder}/assets/images/**/*.*`,

		svg: [`${srcFolder}/assets/svg/**/*.*`, `!${srcFolder}/assets/svg/sprite/`],

		sprite: `${srcFolder}/assets/svg/sprite/**/*.*`,

		js: `${srcFolder}/js/**/*.js`,

		styles: `${srcFolder}/**/*.${preprocessor}`,
	},

	clean: [
		`${buildFolder}/*.*`,
		`${buildFolder}/assets/*`,
		`!${buildFolder}/assets/images/`,
		`!${buildFolder}/assets/fonts/`,
		`!${buildFolder}/assets/favicon/`,
		`!${buildFolder}/assets/files/`,
	],

	buildFolder: buildFolder,

	srcFolder: srcFolder,

	rootFolder: rootFolder,

	ftp: `test-gulp`,
};
