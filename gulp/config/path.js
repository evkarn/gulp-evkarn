// Плагин для получения пути к проекту
import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve()); // Путь к папке проекта

const buildFolder = `./dist`; // Путь к папке с результатом для выгрузки
const srcFolder = `./src`; // Путь к папке с рабочими файлами

export const path = {
	build: {
		js: `${buildFolder}/js/`, // Путь к папке js
		img: `${buildFolder}/img/`, // Путь к папке изображений
		css: `${buildFolder}/css/`, // Путь к папке стилей
		fonts: `${buildFolder}/fonts/`, // Путь к папке шрифтов
		html: `${buildFolder}/`, // Путь к папке в которую нужзно скопировать файлы
		files: `${buildFolder}/files/`, // Путь к папке в которую нужзно скопировать файлы
	},

	src: {
		js: `${srcFolder}/js/app.js`, // Путь к папке с js
		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,heic,heif}`, // Путь к папке с растровыми изображениями в исходниках
		svg: `${srcFolder}/img/**/*.svg`, // Путь к папке с svg в исходниках
		sass: `${srcFolder}/sass/style-main.sass`, // Путь к папке стилей в исходниках
		html: `${srcFolder}/*.html`, // Путь к папке с html файлами в исходниках
		files: `${srcFolder}/files/**/*.*`, // Путь к папке для копирования файлов в исходниках
		svgSprite: `${srcFolder}/svg-sprite/*.svg`, // Путь к папке для копирования файлов в исходниках
	},

	watch: {
		js: `${srcFolder}/js/**/*.js`, 	// Смотрим за скриптами
		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp,heic,heif}`, // Смотрим за картинками
		sass: `${srcFolder}/sass/**/*.sass`, 	// Смотрим за стилями
		html: `${srcFolder}/**/*.html`,				// Смотрим за изменениями в html
		files: `${srcFolder}/files/**/*.*`, 	// Смотрим за изменениями в файлах
	},

	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: `test-gulp`
};