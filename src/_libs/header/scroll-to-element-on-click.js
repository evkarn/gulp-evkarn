export function scrollToElement () {
	// Помещаем все ссылки меню с атрибутом data-goto в переменную
	const menuLinks = document.querySelectorAll('[data-goto]');

	if(menuLinks.length > 0) {
		// Проходимся по всем ссылкам и отслеживаем клик по ним, при клике выполняем функцию onMenuLinkClick
		menuLinks.forEach(menuLink => {
			menuLink.addEventListener('click', onMenuLinkClick);
		});

		function onMenuLinkClick(e) {
			// Помещаем в переменную ссылку по которой кликнули
			const menuLink = e.target;

			const dataSet = menuLink.dataset.goto;

			// Если у ссылки есть атрибут data-goto и в DOM есть элемент с таким классом или id
			if(dataSet && document.querySelector(dataSet)){
				// Помещаем элемент с классом или id как в атрибуте data-goto в переменную
				const gotoBlock = document.querySelector(menuLink.dataset.goto);

				// Рассчитываем положение этого элемента на странице минус высоту header
				const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

				// Прокручиваем страницу до этого элемента
				window.scrollTo({
					top: gotoBlockValue,
					behavior: "smooth"
				});

				e.preventDefault();
			}
		}
	}
}