export function btnReturnTop(speedReturnTop, scrollTop) {
	// Получаем кнопку в переменную
	const btnTop = document.querySelector('.btn-to-top');

	function btnTopActive() {
		// Сколько нужно проскролить, чтобы появилась кнопка
		const breakpoint = scrollTop; 
	
		// Если проскролили на значение breakpoint, задаём кнопке указанный класс
		if (window.pageYOffset >= breakpoint && btnTop) {
			btnTop.classList.add('active');
		} else {
			btnTop.classList.remove('active');
		}
	}
	window.addEventListener('scroll', btnTopActive);

	btnTop.addEventListener('click', function() {
		window.scrollTo(0,0);
	});
}