// Удаление файлов
import { deleteAsync } from 'del';

export default function reset() {
	return deleteAsync(app.path.clean);
}
