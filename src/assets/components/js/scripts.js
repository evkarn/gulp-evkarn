import burger from './burger/burger-func.js';

document.addEventListener('DOMContentLoaded', (e) => {
	for (let e of document.querySelectorAll(
		'input[type="range"].input-range',
	)) {
		let parent = e.closest('.info');

		let currentPrice = parent.querySelector('.info__current-price');

		let minPrice = parent.querySelector('.info__min-price');

		let maxPrice = parent.querySelector('.info__max-price');

		currentPrice.innerHTML = e.value;

		minPrice.innerHTML = e.min;

		maxPrice.innerHTML = e.max;

		e.style.setProperty('--value', e.value);

		e.style.setProperty('--min', e.min == '' ? '0' : e.min);
		
		e.style.setProperty('--max', e.max == '' ? '100' : e.max);

		e.addEventListener('input', () => {
			e.style.setProperty('--value', e.value);

			currentPrice.innerHTML = e.value;

		});
	}
});
