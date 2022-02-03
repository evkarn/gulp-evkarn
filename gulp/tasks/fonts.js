import fs from 'fs';
import ttf2woff2 from 'gulp-ttf2woff2';

export const ttfToWoff = () => {
	// Ищем файлы шрифтов .ttf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})

	// Выдаём сообщение об ошибке, если она есть
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "FONTS",
			message: "Error: <%= error.message %>"
		})
	))
	
	// Конвертируем .ttf в .woff2
	.pipe(ttf2woff2())

	// выгружаем в папку проекта
	.pipe(app.gulp.dest(app.path.build.fonts));
};

export const fontsStyle = () => {
	// Файл стилей подключения шрифтов
	let fileFonts = `${app.path.srcFolder}/sass/_fonts.sass`;

	// Проверяем существуют ли файлы шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fileFonts)) {

				// Если вайла нет, создаём его
				fs.writeFile(fileFonts, '', cb);

				let newFileOnly;
				
				for (var i = 0; i < fontsFiles.length; i++) {

					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];

					if (newFileOnly !== fontFileName) {

						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;

						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

						if(fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'regular') {
							fontWeight = 400;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}

						let fontStyle = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

						if(fontStyle.toLowerCase() === 'italic' || fontStyle.toLowerCase() === 'Italic') {
							fontStyle = 'italic';
						} else {
							fontStyle = 'normal';
						}

						const fontDisplay = 'font-display: swap';

						const fontFormat = 'format("woff2")';

						// Формирование кода подключения шрифта
						fs.appendFile(fileFonts,
							`@font-face \n\tfont-family: ${fontName}-font-custom\n\t${fontDisplay}\n\tfont-weight: ${fontWeight}\n\tfont-style: ${fontStyle}\n\tsrc: url("../fonts/${fontFileName}.woff2") ${fontFormat}\n\r\n`, cb);
							
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log("Файл sass/_fonts.sass уже существует. Для обновления файла нужно его удалить!");
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);

	function cb() {}
};