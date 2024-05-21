// Локальный сервер — синхронизация браузера и редактора
export const server = () => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}`
		},

		notify: false,

		port: 3000,

		online: true, // Work offline without internet connection
		// tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
	});
};
