export function ibg(){
	// Получаем элементы с классом ibg
	$.each($('.ibg'), function(index, val) {

		// Находим все дочерние картинки, переносим их в фон и удаляем
		if($(this).find('img').length>0){
			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');

		}
	});
};