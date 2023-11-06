import getFullYear from './_components/get-full-year/get-full-year-func.js';

import tabs from './_components/tabs/tabs-func.js';

document.addEventListener('DOMContentLoaded', (e) => {
	getFullYear('.footer__year');

	tabs();
});
