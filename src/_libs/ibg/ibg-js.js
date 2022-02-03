export function ibg(){
	// Получаем элементы с классом ibg
	let ibg=document.querySelectorAll(".ibg");

	// Находим все дочерние картинки, переносим их в фон и удаляем
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
			ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
};