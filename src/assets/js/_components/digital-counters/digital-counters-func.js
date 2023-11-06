function digitalCounters(timeDuration) {
	'use strict';

	// Initialization counters
	function digitalCountersInit(digitalCountersItems) {
		let digitalCounters = digitalCountersItems
			? digitalCountersItems
			: document.querySelectorAll('[data-digital-counter]');

		if (digitalCounters) {
			digitalCounters.forEach((elemDC) => {
				digitalCountersAnimate(elemDC);
			});
		}
	}

	// Animation counters
	function digitalCountersAnimate(elemDC) {
		let startTimeDefault = null;

		const duration = parseInt(elemDC.dataset.digitalCounter)
			? parseInt(elemDC.dataset.digitalCounter)
			: timeDuration;

		const startValue = parseInt(elemDC.innerHTML);

		const startPosition = 0;

		const step = (timeDefault) => {
			if (!startTimeDefault) startTimeDefault = timeDefault;

			const progress = Math.min((timeDefault - startTimeDefault) / duration, 1);

			elemDC.innerHTML = Math.floor(progress * (startPosition + startValue));

			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}

	// Start animation counters with scroll - observer system
	let options = {
		threshold: 0.3,
	};

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const targetElement = entry.target;

				const digitalCountersItems = targetElement.querySelectorAll(
					'[data-digital-counter]',
				);

				if (digitalCountersItems.length) {
					digitalCountersInit(digitalCountersItems);
				}

				// observer.unobserve(targetElement);
			}
		});
	}, options);

	let sections = document.querySelectorAll('.section');

	if (sections.length) {
		sections.forEach((sec) => {
			observer.observe(sec);
		});
	}
}

export default digitalCounters;
