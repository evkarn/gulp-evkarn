import inputmask from 'inputmask';

// INIT INPUTMASK
export function inputMask(parent, selector, maskText) {
	'use strict';

	const inputMaskParent = document.querySelector(`.${parent}`);

	if (inputMaskParent) {
		const inputSelector = document?.querySelector(`.${selector}`);

		if (inputSelector) {
			Inputmask({ mask: `${maskText}` }).mask(inputSelector);
		}
	}
}
// END. INIT INPUTMASK
