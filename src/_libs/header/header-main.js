export function headerMain() {
	// Помещаем body в переменную
	const body = document.body;

	// Помещаем header в переменную
	const header = document?.querySelector('header');

	// Высчитываем высоту header
	const headerHeight = header.offsetHeight;

	// Помещаем nav в переменную
	const nav = document?.querySelector('[data-nav]');

	// Помещаем все nav__link в переменную
	const navLinks = nav?.querySelectorAll('a');

	// Помещаем burger в переменную
	const burger = document?.querySelector('[data-burger]');

	// Помещаем nav-btn-close в переменную
	const navBtnClose = document?.querySelector('[data-btn-close]');

	let disableScroll = function () {
		let pagePosition = window.scrollY;
		document.body.classList.add('stop-scroll');
		document.body.dataset.position = pagePosition;
		document.body.style.top = -pagePosition + 'px';
	}

	let enableScroll = function () {
		let pagePosition = parseInt(document.body.dataset.position, 10);
		document.body.style.top = 'auto';
		document.body.classList.remove('stop-scroll');
		window.scroll({ top: pagePosition, left: 0 });
		document.body.removeAttribute('data-position');
	}

	// Создаём переменную и записываем в неё высоту header
	document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);

	burger?.addEventListener('click', () => {
		burger?.classList.add('burger--active');
		nav?.classList.add('nav--visible');
		disableScroll();
	});
	
	navBtnClose.addEventListener('click', () => {
		burger?.classList.remove('burger--active');
		nav?.classList.remove('nav--visible');
		enableScroll();
	});

	navLinks.forEach(el => {
		el.addEventListener('click', () => {
			burger?.classList.remove('burger--active');
			nav?.classList.remove('nav--visible');
			enableScroll();
		});
	});
}