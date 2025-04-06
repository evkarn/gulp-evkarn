export default function aosInit() {
	const dataAos = document?.querySelector('data-aos');

	if (dataAos) {
		AOS.init();
	}
}
