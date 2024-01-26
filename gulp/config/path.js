// Плагин для получения пути к проекту
import * as nodePath from 'path';

// Путь к папке проекта
const rootFolder = nodePath.basename(nodePath.resolve());

// Путь к папке с результатом для выгрузки
const buildFolder = `./dist`;

// Путь к папке с рабочими файлами
const srcFolder = `./src`;

// Выбор формата файлов препроцессора sass или scss
const preprocessor = 'scss';

export const path = {
	build: {
		allFiles: `${buildFolder}/**/*.*`,

		css: `${buildFolder}/assets/css/`,

		configFiles: `${buildFolder}/`,

		faviconImages: `${buildFolder}/`,

		files: `${buildFolder}/assets/files/`,

		fonts: `${buildFolder}/assets/fonts/`,

		html: `${buildFolder}/`,

		img: `${buildFolder}/assets/images/dist/`,

		socialImages: `${buildFolder}/assets/images/social-images/`,

		spriteIcons: `${buildFolder}/assets/images/dist/sprite-svg/`,

		js: `${buildFolder}/assets/js/`,
	},

	// Пути к исходникам файлов
	src: {
		configFiles: `${srcFolder}/*.{php,htaccess,txt,xml,ico,png,svg}`,

		files: `${srcFolder}/assets/files/**/*.*`,

		fonts: `${srcFolder}/assets/fonts/*.ttf`,

		fontsStyle: `${srcFolder}/assets/components/styles/${preprocessor}/fonts/_index.${preprocessor}`,

		html: `${srcFolder}/*.{html,htm}`,

		js: `${srcFolder}/assets/components/js/*.js`,

		img: `${srcFolder}/assets/images/src/**/*.{jpg,jpeg,png,gif,webp,heic,heif,raw,avif}`,

		imgSrc: `${srcFolder}/assets/images/src/`,

		socialImages: `${srcFolder}/assets/images/social-images/**/*.*`,

		imgAvifWebp: `${srcFolder}/assets/images/src/**/*.{jpg,jpeg,png}`,

		imgMin: [`${srcFolder}/assets/images/src/**/*.*`, `!${srcFolder}/assets/images/src/sprite-svg/**/*.*`],

		styles: [`${srcFolder}/assets/components/styles/${preprocessor}/*.${preprocessor}`, `!${srcFolder}/assets/components/styles/${preprocessor}/_*.${preprocessor}`],

		svgSprite: `${srcFolder}/assets/images/src/sprite-svg/**/*.svg`,
	},

	// Отслеживание изменений в файлах
	watch: {
		files: `${srcFolder}/assets/files/**/*.*`,

		html: `${srcFolder}/**/*.html`,

		img: [`${srcFolder}/assets/images/src/**/*.*`, `!${srcFolder}/assets/images/src/sprite-svg/**/*.*`],

		socialImages: `${srcFolder}/assets/images/social-images/**/*.*`,

		js: `${srcFolder}/assets/components/js/**/*.js`,

		styles: `${srcFolder}/assets/components/styles/${preprocessor}/**/*.${preprocessor}`,

		svgSprite: `${srcFolder}/assets/images/src/sprite-svg/**/*.svg`,
	},

	clean: [`${buildFolder}/*.{html,ico,svg,png}`, `${buildFolder}/assets/*`, `!${buildFolder}/assets/images/`],

	buildFolder: buildFolder,

	srcFolder: srcFolder,

	rootFolder: rootFolder,

	ftp: `test-gulp`
};
