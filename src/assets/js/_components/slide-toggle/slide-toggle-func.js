const slideToggle = (target, duration) => {
	if (window.getComputedStyle(target).display === 'none') {
		return slideDown(target, duration);
	}
	else {
		return slideUp(target, duration);
	}
};
