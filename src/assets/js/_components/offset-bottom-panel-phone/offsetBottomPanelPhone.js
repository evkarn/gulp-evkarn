// IMPORT OFFSET-BOTTOM-PANEL-PHONE
	// import { offsetBottomPanelPhone } from './src/_utils/offset-bottom-panel-phone/index.js';
// END. IMPORT OFFSET-BOTTOM-PANEL-PHONE


	// INIT OFFSET-BOTTOM-PANEL-PHONE
		// offsetBottomPanelPhone();
	// END. INIT OFFSET-BOTTOM-PANEL-PHONE

export function offsetBottomPanelPhone() {
	const changeHeight = () => {
		let vh = window.innerHeight * 0.01;

		document.documentElement.style.setProperty('--vh', `${vh}px`);
	};
	
	changeHeight();
	
	window.addEventListener('resize', () => {
		changeHeight();
	});
}