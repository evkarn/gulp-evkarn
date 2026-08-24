# Gulp-сборка evkarn

Сборка для вёрстки многостраничных сайтов на Gulp 5: SCSS + dart-sass,
webpack для JavaScript, спрайты SVG, конвертация шрифтов, оптимизация
картинок (включая генерацию WebP/AVIF), деплой на FTP/SSH.

Тестировалось на Node.js 24 (подойдёт любая версия 20+).

---

## Быстрый старт

```bash
npm install     # установить зависимости
npm run dev     # запустить разработку: http://localhost:3000
```

После запуска `dev` правки исходников в `src/` подхватываются автоматически:
меняете файл — таск пересобирает результат в `dist/`, браузер обновляется.
Ошибки сборки выводятся в терминал с меткой таска (`[STYLES]`, `[JS]`, ...),
вотчер при этом не падает.

## Команды

| Команда            | Что делает                                                                           |
| ------------------ | ------------------------------------------------------------------------------------ |
| `npm run dev`      | Полная сборка → локальный сервер → вотчер изменений                                  |
| `npm run build`    | Production-сборка в `dist/`: сжатие css/js/html, типограф, версии у ссылок           |
| `npm run fonts`    | `.ttf` из `src/assets/fonts` → `.woff2` в `dist` + автогенерация `_fonts-faces.scss` |
| `npm run files`    | Разовое копирование config/favicon/files в `dist` (в dev/build делается само)        |
| `npm run zip`      | Сборка + архив `dist` в `<имя-проекта>.zip` в корне                                  |
| `npm run ftp`      | Сборка + выгрузка `dist` на FTP (нужен `.env`)                                       |
| `npm run ssh`      | Сборка + выгрузка `dist` по SSH/rsync (нужен `.env`)                                 |
| `npm run lint`     | Проверка JS (eslint), CSS (stylelint) и форматирования (prettier)                    |
| `npm run lint:fix` | То же, но с автоисправлением                                                         |

Каждая команда деплоя сначала пересобирает проект — вручную запускать
`build` перед ними не нужно.

## Структура проекта

```
gulpfile.js            # точка входа: сценарии dev / build / deploy*
gulp/
├── config/
│   ├── env.js         # загрузчик .env (секреты деплоя)
│   ├── path.js        # ВСЕ пути сборки: src, dist, watch, clean
│   ├── plugins.js     # реестр gulp-плагинов (app.plugins)
│   ├── fonts.js       # настройки генерации @font-face
│   └── ftp.js         # подключение к FTP из переменных окружения
└── tasks/             # один файл = один таск сборки
    ├── styles.js      # SCSS → CSS (+autoprefixer, px→rem, cssnano в build)
    ├── js.js          # webpack: src/js/scripts.js → dist/js/scripts.min.js
    ├── html.js        # @include-сборка html, типограф, минификация
    ├── imgMin.js      # картинки → оптимизация + WebP + AVIF
    ├── svgMin.js      # статичные svg
    ├── sprite.js      # svg-спрайт из src/assets/svg/sprite
    ├── ttf-to-woff.js # конвертация шрифтов
    ├── fonts-faces.js # генерация _fonts-faces.scss
    ├── copy-*.js      # копирование config / files / favicon
    ├── clean.js       # очистка dist перед сборкой
    ├── server.js      # browser-sync (:3000)
    ├── plumber.js     # обработчик ошибок (лог в терминал без попапов)
    └── zip/ftp/ssh.js # упаковка и деплой
src/
├── html/              # страницы (*.html собираются в dist/*.html)
├── includes/          # фрагменты для @include (layouts/, sections/, ...)
├── styles/scss/       # стили; *.scss — точки входа, _*.scss — партиалы
├── js/                # скрипты; scripts.js — точка входа webpack
├── assets/
│   ├── favicon/       # фавиконки (копируются как есть)
│   ├── files/         # документы для скачивания
│   ├── fonts/         # исходные .ttf
│   ├── images/        # картинки
│   └── svg/static/    # статичные svg; svg/sprite — иконки для спрайта
└── config/            # robots.txt и подобное (копируется в корень dist)
dist/                  # результат сборки (в git не хранится)

.env.example           # шаблон секретов для деплоя — скопируйте в .env
```

## Режимы dev и build

Режим переключается флагом `--build` в сценариях gulpfile.js:
без него `app.isDev = true`, с ним — `app.isBuild`.

В **build** дополнительно включаются: autoprefixer, группировка
медиазапросов, перевод `px` в `rem`, сжатие cssnano и htmlClean,
типограф Лебедева, версии `?v=...` у ссылок на css/js (сброс кэша),
минификация JS. В **dev** всё это пропускается ради скорости, а к стилям
и скриптам добавляются sourcemaps.

## HTML

Вместо шаблонизатора используется `gulp-file-include`. Фрагменты лежат
в `src/includes/` и вставляются директивой `@include` (путь от корня
проекта):

```html
<!-- src/includes/layouts/header.html -->
<header class="header">@include('src/includes/elements/nav.html')</header>

<!-- страница src/html/index.html -->
@include('src/includes/layouts/header.html')
```

Переменные можно передавать так:

```html
@include('src/includes/elements/logo.html', { "mod": "header" })
```

## Стили

- Точки входа — `src/styles/scss/*.scss`; файлы с `_` в начале —
  партиалы, отдельно не собираются.
- Общие переменные — `styles/scss/vars/`, миксины — `styles/scss/mixins/`.
- В build все `px` переводятся в `rem` (postcss-pxtorem). Если для какого-то
  свойства это нежелательно, используйте `Px` (с большой буквы).
- Пути к картинкам в css можно писать относительно исходника —
  таск нормализует их для dist.

## Шрифты

1. Положите `.ttf` в `src/assets/fonts/`.
2. Имя файла задаёт параметры подключения:

   - `NunitoSans-VariableFont.ttf` или `...-VF.ttf` — вариативный шрифт,
     диапазон весов берётся из `gulp/config/fonts.js` (`fontWeight: '100 900'`).
   - `Roboto-Bold.ttf`, `Roboto-Italic.ttf` — статичные: вес и стиль
     распознаются по имени (thin/extralight/light/regular/medium/semibold/
     bold/extrabold/black + italic).

3. Запустите `npm run fonts` — шрифты конвертируются в `.woff2`,
   а в `src/styles/scss/fonts/_fonts-faces.scss` сгенерируются `@font-face`.
4. Подключите этот файл в основном стиле (`styles.scss`), если ещё не подключён.

Файл `_fonts-faces.scss` создаётся только если его нет. Чтобы обновить
(добавили новый шрифт) — удалите его и запустите `npm run fonts` снова.
Тип подключения (вариативный/статичный) настраивается в `gulp/config/fonts.js`.

## SVG-спрайт

Иконки кладите в `src/assets/svg/sprite/`. После сборки получите:

- `dist/assets/svg/sprite/sprite.svg` — сам спрайт;
- `sprite.html` рядом — страница со списком всех иконок.

Использование на странице:

```html
<svg class="icon">
	<use href="assets/svg/sprite/sprite.svg#icon-name"></use>
</svg>
```

Из иконок при сборке удаляются `fill`, `stroke` и инлайновые `style` —
цвет задаётся через css свойством `fill`/`color`.

## Изображения

`src/assets/images/**/*` при сборке оптимизируются, и рядом с каждой
картинкой создаются копии `.webp` и `.avif` (качество 80 настраивается
в `gulp/tasks/imgMin.js`). Повторная сборка обрабатывает только новые
и изменённые файлы.

## JavaScript

Точка входа — `src/js/scripts.js` (модули можно импортировать через
`import`). Результат — `dist/js/scripts.min.js`, подключайте его на
страницах обычным `<script src>`.

Алиасы путей (работают и в js, и в подсказках редактора):

| Алиас         | Путь                |
| ------------- | ------------------- |
| `@`           | `src/`              |
| `@components` | `src/components/`   |
| `@js`         | `src/js/`           |
| `@funcs`      | `src/js/functions/` |
| `@utils`      | `src/js/utils/`     |
| `@modules`    | `src/js/modules/`   |
| `@constants`  | `src/js/constants/` |
| `@styles`     | `src/styles/scss/`  |

Пример: `import { burgerInit } from '@funcs/burger/burger-init.js';`

## Деплой на FTP / SSH

Данные серверов хранятся вне кода — в файле `.env`:

```bash
cp .env.example .env   # затем заполните своими данными
```

`.env` добавлен в `.gitignore` и никогда не попадает в репозиторий.
Если данные когда-либо были закоммичены в коде — обязательно смените
их у хостинга.

- `npm run ftp` — заливает содержимое `dist/` на FTP
  (`FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, опционально `FTP_REMOTE_PATH`).
- `npm run ssh` — синхронизирует `dist/` с сервером через rsync
  (`SSH_HOST`, `SSH_USER`, `SSH_DESTINATION`). Требуется настроенный
  ssh-доступ по ключу или ssh-agent.

## Линтинг и форматирование

```bash
npm run lint        # eslint + stylelint + prettier (проверка)
npm run lint:fix    # автоматическое исправление
```

- `eslint.config.js` — проверяются код сборки (`gulp/`, `gulpfile.js`,
  окружение Node) и точка входа бандла `src/js/scripts.js` (окружение
  браузера). Остальное в `src/js/` — архив сниппетов, который постоянно
  редактируется, — из проверки намеренно исключено. Замечания выводятся
  предупреждениями и не валят команду посреди работы.
- `stylelint.config.js` — стандарт SCSS + порядок css-свойств
  (stylelint-order) и BEM-паттерн. Проверяет все стили проекта,
  исторические замечания — предупреждения.
- `.prettierrc` — форматирование. Prettier проверяет только код сборки
  и документацию (см. `.prettierignore`): разовый прогон по всему
  историческому `src/` дал бы коммит на тысячи строк. Если захотите
  отформатировать исходники целиком — уберите `src/` из игнора и
  запустите `npm run format:fix`.

## Если что-то не работает

- **Ошибка в терминале вида `[STYLES] ...`** — читайте сообщение:
  указан таск, в котором произошла ошибка. Вотчер продолжит работу
  после исправления файла.
- **Не применились изменения css/js в браузере** — проверьте, что
  страница открывается с локального сервера (`localhost:3000`),
  а не прямо из папки `dist`.
- **Шрифты не подключились** — см. раздел «Шрифты»: скорее всего
  существует старый `_fonts-faces.scss`, который нужно удалить
  и перегенерировать.
