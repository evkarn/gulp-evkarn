// Обработчик ошибок для тасков сборки.
//
// Использование в таске:
//   .pipe(app.plugins.plumber(plumberInit('ИМЯ-ТАСКА')))
//
// Что делает при ошибке:
//   1. Печатает сообщение в терминал с меткой таска — всплывающих
//      уведомлений ОС нет специально, чтобы не отвлекать от работы.
//   2. this.emit('end') мягко завершает текущий проход потока,
//      поэтому вотчер не падает: исправили файл — сборка пошла дальше.
export default function plumberInit(title) {
	return {
		errorHandler(error) {
			console.error(`[${title}] ${error.messageFormatted || error.message}`);
			this.emit('end');
		},
	};
}
