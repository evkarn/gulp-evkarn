// IMPORT READ-PROGRESS-line
	// import { readProgressLine } from './src/_utils/read-progress-line/index.js';
// END. IMPORT READ-PROGRESS-line


	// INIT READ-PROGRESS-line
		// readProgressLine();
	// END. INIT READ-PROGRESS-line

export function readProgressLine() {
	// Добавляем в body блок для линии прогресса прокрутки
	let lineAppend = document.createElement('div');
  lineAppend.className = 'progress-line';
  lineAppend.innerHTML = '<div class="progress-line__item"></div>';
	document.body.append(lineAppend);

	// Получаем внутренний элемент оболочки линии прогресса прокрутки
	const line = document.querySelector('.progress-line__item');

	const progressAnimation = () => {
		let scrollTop = window.scrollY;
		let windowHeight = window.innerHeight;
		let siteHeight = document.documentElement.scrollHeight;
		let percentageProgress = Math.floor(scrollTop / (siteHeight - windowHeight) * 100);
		line.style.width = `${percentageProgress}%`;
	};

	progressAnimation();

	window.addEventListener('scroll', () => {
		progressAnimation();
	});
}