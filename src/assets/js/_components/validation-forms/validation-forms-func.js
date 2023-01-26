import justValidate from 'just-validate';

export function validationForm() {
	'use strict';

	const form = document?.querySelector('.edit-profile__form');

	if (form) {
		const validateEditProfileForm = new justValidate('.edit-profile__form');

		validateEditProfileForm
			.addField('.input-text', [
				{
					rule: 'required',
					errorMessage: 'Ошибка'
				}
			])
			.addField('.input-text--surname', [
				{
					rule: 'required',
					errorMessage: 'Ошибка'
				}
			])
			.addField('.input-text--family', [
				{
					rule: 'required',
					errorMessage: 'Ошибка'
				}
			])
			.addField('.input-phone', [
				{
					rule: 'required',
					errorMessage: 'Ошибка'
				}
			])
			.addField('.input-email', [
				{
					rule: 'required',
					errorMessage: 'Ошибка'
				},
				{
					rule: 'email',
					errorMessage: 'Ошибка'
				}
			]);
	}
}
