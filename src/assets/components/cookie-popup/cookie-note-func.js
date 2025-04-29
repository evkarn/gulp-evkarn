function cookieNote() {
	function setCookie(name, value, days) {
		let expires = '';

		if (days) {
			let date = new Date();

			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

			expires = '; expires=' + date.toUTCString();
		}

		document.cookie = name + '=' + (value || '') + expires + '; path=/';
	}

	// Функция для получения куки
	function getCookie(name) {
		let nameEQ = name + '=';

		const ca = document.cookie.split(';');

		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];

			while (c.charAt(0) === ' ') c = c.substring(1, c.length);

			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
		}

		return null;
	}

	(function hiddenCookiePopup() {
		if (getCookie('cookieConsent')) {
			const cookieEl = document?.querySelector('[data-cookie-popup]');

			cookieEl.style.display = 'none';
		}
	})();

	(function initCookie() {
		const cookiePopup = document?.querySelector('[data-cookie-popup]');
		const cookieBtn = document?.querySelector('[data-cookie-popup-btn]');

		cookieBtn.addEventListener('click', () => {
			setCookie('cookieConsent', 'true', 30);

			cookiePopup.style.display = 'none';
		});
	})();
}

export default cookieNote;