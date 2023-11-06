function isMobile () {
	if (window.innerWidth < 768) {
		return true;
	}

	return false;
};

function isTablet () {
	if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
		return true;
	}

	return false;
};

function isDesktop () {
	if (window.innerWidth > 1025) {
		return true;
	}

	return false;
};

export default {isMobile, isTablet, isDesktop}
