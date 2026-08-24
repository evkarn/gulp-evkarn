// Локальный сервер — синхронизация браузера и редактора.
//
// Запускается автоматически после сборки (npm run dev).
// Страница откроется на http://localhost:3000

export default function server() {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}`,
		},

		notify: false,

		port: 3000,

		// false — работа без интернета: не пингуем внешние сервисы.
		// true нужен только для туннеля (см. ниже)
		online: false,

		// Раскомментируйте, чтобы получить публичную ссылку вида
		// https://yousutename.loca.lt (потребуется online: true)
		// tunnel: 'yousutename',
	});
}
