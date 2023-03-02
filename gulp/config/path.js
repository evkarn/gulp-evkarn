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
		allFiles: `${buildFolder}/**/*.*`,

		css: `${buildFolder}/assets/css/`,

		configFiles: `${buildFolder}/`,

		faviconImages: `${buildFolder}/`,

		files: `${buildFolder}/assets/files/`,

		fonts: `${buildFolder}/assets/fonts/`,

		html: `${buildFolder}/`,

		img: `${buildFolder}/assets/images/dist/`,

		spriteIcons: `${buildFolder}/assets/sprite-icons/`,

		js: `${buildFolder}/assets/js/`,

		jsSpecial: `${buildFolder}/assets/js-special/`,
	},

	// Пути к исходникам файлов
	src: {
		configFiles: `${srcFolder}/*.{htaccess,txt,xml}`,

		faviconImages: `${srcFolder}/*.{ico,png,svg}`,

		files: `${srcFolder}/assets/files/**/*.*`,

		fonts: `${srcFolder}/assets/fonts/*.ttf`,

		fontsStyle: `${srcFolder}/assets/styles/_fonts/fonts.sass`,

		html: `${srcFolder}/*.html`,

		js: `${srcFolder}/assets/js/*.js`,

		jsSpecial: `${srcFolder}/assets/js-special/**/*.js`,

		img: `${srcFolder}/assets/images/_src/**/*.{jpg,jpeg,png,gif,webp,heic,heif,raw,avif}`,

		imgSrc: `${srcFolder}/assets/images/_src/`,

		imgAvif: `${srcFolder}/assets/images/_src/**/*.{jpg,jpeg,png}`,

		imgMin: `${srcFolder}/assets/images/_src/**/*.{jpg,jpeg,png,gif,webp,heic,heif,raw,avif}`,

		imgWebp: `${srcFolder}/assets/images/_src/**/*.{jpg,jpeg,png}`,

		imgSVG: `${srcFolder}/assets/images/_src/**/*.svg`,

		sass: `${srcFolder}/assets/styles/**.sass`,

		svgSprite: `${srcFolder}/assets/svg-sprite/*.svg`,
	},

	// Отслеживание изменений в файлах
	watch: {
		files: `${srcFolder}/assets/files/**/*.*`,

		html: `${srcFolder}/**/*.html`,

		img: `${srcFolder}/assets/images/_src/*.{jpg,jpeg,png,svg,gif,ico,webp,heic,heif,raw,avif}`,

		imgSvg: `${srcFolder}/assets/images/_src/**/*.svg`,

		js: `${srcFolder}/assets/js/**/*.js`,

		jsSpecial: `${srcFolder}/assets/js-special/**/*.js`,

		sass: `${srcFolder}/assets/styles/**/*.sass`,
	},

	clean: buildFolder,

	buildFolder: buildFolder,

	srcFolder: srcFolder,

	rootFolder: rootFolder,

	ftp: `test-gulp`
};
