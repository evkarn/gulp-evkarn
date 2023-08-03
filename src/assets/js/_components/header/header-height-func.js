export const headerHeight = () => {
  let headerHeight = document?.querySelector('.header').offsetHeight;

	const rootVars = document.querySelector(':root');

  rootVars.style.setProperty('--header-height', `${headerHeight}px`);

	window.addEventListener('resize', () => {
		headerHeight = document.querySelector('header').offsetHeight;

		document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
	});
};
