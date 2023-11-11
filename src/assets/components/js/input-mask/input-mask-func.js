import inputmask from 'inputmask';

function inputMask(parent, selector, maskText) {
	'use strict';

	const inputMaskParent = document.querySelector(`${parent}`);

	if (inputMaskParent) {
		const inputSelector = inputMaskParent?.querySelector(`${selector}`);

		if (inputSelector) {
			Inputmask({ mask: `${maskText}` }).mask(inputSelector);
		}
	}
}

export default inputMask;
