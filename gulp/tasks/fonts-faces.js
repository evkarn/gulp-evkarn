export default function createFontsFaces () {
	// Файл стилей подключения шрифтов
	let fileFonts = `${app.path.src.fontsFaces}`;

	const fontDisplay = 'font-display: swap';
	const fontFormat = 'format("woff2")';
	const fontExtension = 'woff2';

	// Проверяем существуют ли файлы шрифтов
	app.plugins.fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!app.plugins.fs.existsSync(fileFonts)) {
				// Если файла нет, создаём его
				app.plugins.fs.writeFile(fileFonts, '', cb);

				let newFileOnly;

				for (var i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];

					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0]
							? fontFileName.split('-')[0]
							: fontFileName;

						let vFont = fontFileName.split('-')[1]
							? fontFileName.split('-')[1]
							: fontFileName;

						if (
							vFont === 'VariableFont' ||
							vFont.toLowerCase() === 'variablefont' ||
							vFont === 'VF' ||
							vFont.toLowerCase() === 'vf'
						) {
							const fontFormatSt = "format('woff2-variations')";
							const fontFormatVF = "format('woff2') tech('variations')";

							// Формирование кода подключения шрифта
							if (
								`${app.fontsVars.vars.preprocessor}` == 'sass' &&
								`${app.fontsVars.vars.fontStretch}` != ''
							) {
								app.plugins.fs.appendFile(
									fileFonts,
									`@font-face\r
\tfont-family: ${fontName}\r
\tsrc: url('../assets/fonts/${fontFileName}.${fontExtension}') ${fontFormatSt}\r
\tsrc: url('../assets/fonts/${fontFileName}.${fontExtension}') ${fontFormatVF}\r
\t${fontDisplay}\r
\tfont-weight: ${app.fontsVars.vars.fontWeight}\r
\tfont-stretch: ${app.fontsVars.vars.fontStretch}
\r\n`,
									cb,
								);
							} else if (
								`${app.fontsVars.vars.preprocessor}` == 'sass' &&
								`${app.fontsVars.vars.fontStretch}` == ''
							) {
								app.plugins.fs.appendFile(
									fileFonts,
									`@font-face\r
\tfont-family: ${fontName}\r
\tsrc: url('./assets/fonts/${fontFileName}.${fontExtension}') ${fontFormatSt}\r
\tsrc: url('./assets/fonts/${fontFileName}.${fontExtension}') ${fontFormatVF}\r
\t${fontDisplay}\r
\tfont-weight: ${app.fontsVars.vars.fontWeight}
\r\n`,
									cb,
								);
							} else if (
								`${app.fontsVars.vars.preprocessor}` != 'sass' &&
								`${app.fontsVars.vars.fontStretch}` != ''
							) {
								app.plugins.fs.appendFile(
									fileFonts,
									`@font-face {\r
\tfont-family: ${fontName};\r
\tsrc: url('./assets/fonts/${fontFileName}.${fontExtension}') ${fontFormatSt};\r
\tsrc: url('./assets/fonts/${fontFileName}.${fontExtension}') ${fontFormatVF};\r
\t${fontDisplay};\r
\tfont-weight: ${app.fontsVars.vars.fontWeight};\r
\tfont-stretch: ${app.fontsVars.vars.fontStretch};
}\r\n`,
									cb,
								);
							} else {
								app.plugins.fs.appendFile(
									fileFonts,
									`@font-face {\r
\tfont-family: ${fontName};\r
\tsrc: url('./assets/fonts/${fontFileName}.${fontExtension}') ${fontFormatSt};\r
\tsrc: url('./assets/fonts/${fontFileName}.${fontExtension}') ${fontFormatVF};\r
\t${fontDisplay};\r
\tfont-weight: ${app.fontsVars.vars.fontWeight};
}\r\n`,
									cb,
								);
							}

							newFileOnly = fontFileName;
						} else {
							let fontWeight = fontFileName.split('-')[1]
								? fontFileName.split('-')[1]
								: fontFileName;

							if (fontWeight.toLowerCase() === 'thin') {
								fontWeight = 100;
							} else if (fontWeight.toLowerCase() === 'extralight') {
								fontWeight = 200;
							} else if (
								fontWeight.toLowerCase() === 'light' ||
								fontWeight.toLowerCase() === 'book' ||
								fontWeight.toLowerCase() === 'demi'
							) {
								fontWeight = 300;
							} else if (
								fontWeight.toLowerCase() === 'regular' ||
								fontWeight.toLowerCase() === 'normal'
							) {
								fontWeight = 400;
							} else if (fontWeight.toLowerCase() === 'medium') {
								fontWeight = 500;
							} else if (
								fontWeight.toLowerCase() === 'semibold' ||
								fontWeight.toLowerCase() === 'demibold'
							) {
								fontWeight = 600;
							} else if (fontWeight.toLowerCase() === 'bold') {
								fontWeight = 700;
							} else if (
								fontWeight.toLowerCase() === 'extrabold' ||
								fontWeight.toLowerCase() === 'heavy'
							) {
								fontWeight = 800;
							} else if (
								fontWeight.toLowerCase() === 'black' ||
								fontWeight.toLowerCase() === 'ultrablack' ||
								fontWeight.toLowerCase() === 'fat'
							) {
								fontWeight = 900;
							} else {
								fontWeight = 400;
							}

							let fontStyle = fontFileName.split('-')[2]
								? fontFileName.split('-')[2]
								: fontFileName;

							if (
								fontStyle.toLowerCase() === 'italic' ||
								fontStyle.toLowerCase() === 'Italic'
							) {
								fontStyle = 'italic';
							} else {
								fontStyle = 'normal';
							}

							// Формирование кода подключения шрифта
							if (`${app.fontsVars.vars.preprocessor}` == 'sass') {
								app.plugins.fs.appendFile(
									fileFonts,
									`@font-face\r
\tfont-family: ${fontName}\r
\tsrc: url('./assets/fonts/${fontFileName}.${fontExtension}') ${fontFormat}\r
\t${fontDisplay}\r
\tfont-weight: ${fontWeight}\r
\tfont-style: ${fontStyle}
\r\n`,
									cb,
								);
							} else {
								app.plugins.fs.appendFile(
									fileFonts,
									`@font-face {\r
\tfont-family: ${fontName};\r
\tsrc: url('./assets/fonts/${fontFileName}.${fontExtension}') ${fontFormat};\r
\t${fontDisplay};\r
\tfont-weight: ${fontWeight};\r
\tfont-style: ${fontStyle};
}\r\n`,
									cb,
								);
							}

							newFileOnly = fontFileName;
						}
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log(
					'Файл подключения шрифтов уже существует. Для обновления файла нужно его удалить!',
				);
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);

	function cb() {}
};
