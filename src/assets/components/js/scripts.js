import getFullYear from './get-full-year/get-full-year-func.js';

import tabs from './tabs/tabs-func.js';

document.addEventListener('DOMContentLoaded', (e) => {
	getFullYear('.footer__year');

	tabs();
});
