// Скрипт обработки ошибок
export const plumberInit = (title) => {
	return {
		errorHandler: app.plugins.notify.onError({
			title: title,
			message: "Error: <%= error.message %>",
			sound: false,
		}),
	}
}
