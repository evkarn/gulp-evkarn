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

const 

export const path = {
	build: {
		allFiles: `${buildFolder}/**/*.*`,

		css: `${buildFolder}/assets/css/`,

		configFiles: `${buildFolder}/`,

		faviconImages: `${buildFolder}/assets/favicon/`,

		files: `${buildFolder}/assets/files/`,

		fonts: `${buildFolder}/assets/fonts/`,

		html: `${buildFolder}/`,

		img: `${buildFolder}/assets/images/`,

		imgAvif: `${buildFolder}/assets/images/avif/`,

		imgWebp: `${buildFolder}/assets/images/webp/`,

		socialImages: `${buildFolder}/assets/images/social-images/`,

		spriteIcons: `${buildFolder}/assets/images/sprite-svg/`,

		js: `${buildFolder}/assets/js/`,
	},

	// Пути к исходникам файлов
	src: {
		configFiles: `${srcFolder}/*.{php,htaccess,txt,xml,ico,png,svg}`,

		files: `${srcFolder}/assets/files/**/*.*`,

		fonts: `${srcFolder}/assets/fonts/*.ttf`,

		faviconImages: `${srcFolder}/assets/favicon/*.*`,

		fontsStyle: `${srcFolder}/assets/styles/${preprocessor}/fonts/_index.${preprocessor}`,

		html: `${srcFolder}/*.{html,htm}`,

		js: `${srcFolder}/assets/js/*.{js,mjs}`,

		img: `${srcFolder}/assets/images/src/**/*.{jpg,jpeg,png,gif,webp,heic,heif,raw,avif}`,

		imgSrc: `${srcFolder}/assets/images/src/`,

		socialImages: `${srcFolder}/assets/images/social-images/**/*.*`,

		imgAvifWebp: `${srcFolder}/assets/images/src/**/*.{jpg,jpeg,png}`,

		imgMin: `${srcFolder}/assets/images/src/**/*.*`,

		svgSprite: `${srcFolder}/assets/images/sprite-svg/**/*.svg`,

		styles: [`${srcFolder}/assets/styles/${preprocessor}/*.${preprocessor}`, `!${srcFolder}/assets/styles/${preprocessor}/_*.${preprocessor}`],

	},

	// Отслеживание изменений в файлах
	watch: {
		files: `${srcFolder}/assets/files/**/*.*`,

		html: `${srcFolder}/**/*.html`,

		img: [`${srcFolder}/assets/images/src/**/*.*`, `!${srcFolder}/assets/images/src/**/*.svg`],

		imgSvg: `${srcFolder}/assets/images/src/**/*.svg`,

		socialImages: `${srcFolder}/assets/images/social-images/**/*.*`,

		js: `${srcFolder}/assets/js/**/*.js`,

		styles: `${srcFolder}/assets/styles/${preprocessor}/**/*.${preprocessor}`,

		svgSprite: `${srcFolder}/assets/images/sprite-svg/**/*.*`,
	},

	clean: [`${buildFolder}/*.{html,ico,svg,png}`, `${buildFolder}/assets/*`, `!${buildFolder}/assets/images/`, `!${buildFolder}/assets/fonts/`],

	buildFolder: buildFolder,

	srcFolder: srcFolder,

	rootFolder: rootFolder,

	ftp: `test-gulp`
};
