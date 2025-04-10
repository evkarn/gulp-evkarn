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
		allFiles: `${buildFolder}/**/*.*`,

		css: `${buildFolder}/assets/css/`,

		configFiles: `${buildFolder}/`,

		favicon: `${buildFolder}/assets/favicon/`,

		files: `${buildFolder}/assets/files/`,

		fonts: `${buildFolder}/assets/fonts/`,

		html: `${buildFolder}/`,

		img: `${buildFolder}/assets/images/`,

		imgAvif: `${buildFolder}/assets/images/`,

		imgWebp: `${buildFolder}/assets/images/`,

		svg: `${buildFolder}/assets/svg/`,

		sprite: `${buildFolder}/assets/svg/sprite/`,

		js: `${buildFolder}/assets/js/`,
	},

	// Пути к исходникам файлов
	src: {
		configFiles: `${srcFolder}/*.{php,htaccess,txt,xml,ico,png,svg}`,

		files: `${srcFolder}/assets/files/**/*.*`,

		fonts: `${srcFolder}/assets/fonts/*.ttf`,

		favicon: `${srcFolder}/assets/favicon/*.*`,

		fontsFaces: `${srcFolder}/assets/styles/${preprocessor}/fonts/_fonts-faces.${preprocessor}`,

		html: `${srcFolder}/*.{html,htm}`,

		js: `${srcFolder}/assets/js/*.{js,mjs}`,

		imgAvifWebp: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png}`,

		imgAvifBuild: `${buildFolder}/assets/images/**/*.avif`,

		imgWebpBuild: `${buildFolder}/assets/images/**/*.webp`,

		img: `${srcFolder}/assets/images/**/*.*`,

		imgBuild: `${buildFolder}/assets/images/**/*.{jpg,jpeg,png,gif}`,

		svg: [
			`${srcFolder}/assets/svg/**/*.svg`,
			`!${srcFolder}/assets/svg/sprite/`,
		],

		sprite: `${srcFolder}/assets/svg/sprite/**/*.svg`,

		styles: [
			`${srcFolder}/assets/styles/${preprocessor}/*.${preprocessor}`,
			`!${srcFolder}/assets/styles/${preprocessor}/_*.${preprocessor}`,
		],
	},

	// Отслеживание изменений в файлах
	watch: {
		files: `${srcFolder}/assets/files/**/*.*`,

		html: `${srcFolder}/**/*.html`,

		img: `${srcFolder}/assets/images/**/*.*`,

		svg: [`${srcFolder}/assets/svg/**/*.*`, `!${srcFolder}/assets/svg/sprite/`],

		sprite: `${srcFolder}/assets/svg/sprite/**/*.*`,

		js: `${srcFolder}/assets/js/**/*.js`,

		styles: `${srcFolder}/assets/styles/${preprocessor}/**/*.${preprocessor}`,
	},

	clean: [
		`${buildFolder}/*.{html,ico,svg,png}`,
		`${buildFolder}/assets/*`,
		`!${buildFolder}/assets/images/`,
		`!${buildFolder}/assets/fonts/`,
	],

	buildFolder: buildFolder,

	srcFolder: srcFolder,

	rootFolder: rootFolder,

	ftp: `test-gulp`,
};
