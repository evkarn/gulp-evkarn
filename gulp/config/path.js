// Плагин для получения пути к проекту
import * as nodePath from 'path';

// Путь к папке проекта
const rootFolder = nodePath.basename(nodePath.resolve());

// Путь к папке с результатом для выгрузки
const buildFolder = `./dist`;

// Путь к папке с рабочими файлами
const srcFolder = `./src`;

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		img: `${buildFolder}/img/`,
		css: `${buildFolder}/css/`,
		fonts: `${buildFolder}/fonts/`,
		html: `${buildFolder}/`,
		favFiles: `${buildFolder}/`,
		favFolder: `${buildFolder}/favicon/`,
		files: `${buildFolder}/files/`,
	},

	// Пути к файлам с исходниками
	src: {
		js: `${srcFolder}/js/app.js`,

		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,heic,heif,raw,avif}`,
		imgSrc: `${srcFolder}/img/`,
		imgWebp: `${srcFolder}/img/**/*.{jpg,jpeg,png}`,
		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,heic,heif,raw,avif}`,
		imgMin: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,heic,heif,raw,avif}`,
		imgSVG: `${srcFolder}/img/**/*.svg`,

		sass: `${srcFolder}/sass/style-main.sass`,
		html: `${srcFolder}/*.html`,
		favFiles: `${srcFolder}/*.{ico,png,svg}`,
		favFolder: `${srcFolder}/favicon/*.*`,
		favicon: `${srcFolder}/*.{ico,svg}`,
		files: `${srcFolder}/files/**/*.*`,
		svgSprite: `${srcFolder}/svg-sprite/*.svg`,
	},

	// Отслеживание изменений в файлах
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp,heic,heif,raw,avif}`, 
		sass: `${srcFolder}/sass/**/*.sass`,
		html: `${srcFolder}/**/*.html`,
		files: `${srcFolder}/files/**/*.*`,
	},

	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: `test-gulp`
};