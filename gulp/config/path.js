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

		ogImg: `${buildFolder}/assets/images/og-images/`,

		pinterestImg: `${buildFolder}/assets/images/pinterest/`,

		spriteIcons: `${buildFolder}/assets/images/dist/sprite/`,

		js: `${buildFolder}/assets/js/`,
	},

	// Пути к исходникам файлов
	src: {
		configFiles: `${srcFolder}/*.{htaccess,txt,xml,ico,png,svg}`,

		files: `${srcFolder}/assets/files/**/*.*`,

		fonts: `${srcFolder}/assets/fonts/*.ttf`,

		fontsStyle: `${srcFolder}/assets/styles/_fonts/fonts.sass`,

		html: `${srcFolder}/*.{html,php,htm}`,

		js: `${srcFolder}/assets/js/*.js`,

		img: `${srcFolder}/assets/images/_src/**/*.{jpg,jpeg,png,gif,webp,heic,heif,raw,avif}`,

		imgSrc: `${srcFolder}/assets/images/_src/`,

		ogImg: `${srcFolder}/assets/images/og-images/*.*`,

		pinterestImg: `${srcFolder}/assets/images/pinterest/*.*`,

		imgAvifWebp: `${srcFolder}/assets/images/_src/**/*.{jpg,jpeg,png}`,

		imgMin: [`${srcFolder}/assets/images/_src/**/*.*`, `!${srcFolder}/assets/images/_src/sprite/**/*.*`],

		sass: `${srcFolder}/assets/styles/**.sass`,

		svgSprite: `${srcFolder}/assets/images/_src/sprite/*.svg`,
	},

	// Отслеживание изменений в файлах
	watch: {
		files: `${srcFolder}/assets/files/**/*.*`,

		html: `${srcFolder}/**/*.html`,

		img: [`${srcFolder}/assets/images/_src/**/*.*`, `!${srcFolder}/assets/images/_src/sprite/*.*`],

		ogImg: `${srcFolder}/assets/og-images/*.*`,

		pinterestImg: `${srcFolder}/assets/images/pinterest/*.*`,

		js: `${srcFolder}/assets/js/**/*.js`,

		sass: `${srcFolder}/assets/styles/**/*.sass`,

		svgSprite: `${srcFolder}/assets/images/_src/sprite/*.svg`,
	},

	clean: buildFolder,

	buildFolder: buildFolder,

	srcFolder: srcFolder,

	rootFolder: rootFolder,

	ftp: `test-gulp`
};
