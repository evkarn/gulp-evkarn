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

### Конвенции

- **BEM** — stylelint проверяет через `stylelint-selector-bem-pattern`.
  Блоки, элементы, модификаторы — строго по методологии.
- **Порядок css-свойств** — `stylelint-order` с настройкой из
  `stylelint.config.js`. Используйте сниппеты VS Code — они
  генерируют блоки в правильном порядке.
- **Переменные** — в `vars/`: сетка (`grid.scss`), цвета (`colors.scss`),
  шрифты (`typography.scss`). Подключаются через `@use`.
- **Миксины** — в `mixins/`: переиспользуемые конструкции. Подключаются
  через `@use 'mixins/имя' as *` для использования без префикса.

### Каталог миксинов (`styles/scss/mixins/`)

#### Адаптивные значения

| Миксин | Сигнатура | Описание |
| --- | --- | --- |
| `adaptive-value-px` | `($property, $min, $max)` | `clamp()` для любого свойства: от `$min` px на минимуме до `$max` px на максимуме сетки |
| `fluid-size-px` | `($property, $min, $max)` | То же, но с явным указанием порогов vw (по умолчанию из сетки) |
| `fluid-size-rem` | `($property, $min, $max)` | `clamp()` с выводом в rem |
| `calc-size` | `($prop, $min, $max, $minW, $maxW, $units)` | Линейная интерполяция через `calc()` (без медиазапроса) |
| `calc-size-media` | `($prop, $min, $max, $minW, $maxW, $units)` | То же, но обёрнуто в `@media (min-width ... max-width ...)` |
| `width-height` | `($width, $height)` | Ширина и высота в px; выше 1920px масштабируются в 2x |

Примеры:

```scss
.title {
  @include adaptive-value-px(font-size, 18, 32);
}

.text {
  @include fluid-size-px(margin-bottom, 16, 32);
}

.card {
  @include width-height(48, 48);
}
```

#### Брейкпоинты

Два набора миксинов — в `px` и `em`. Каждый набор содержит ~30 миксинов
для `min-width` и `max-width` по всем точкам сетки, плюс диапазонные
(`mobile-only`, `tablet-only`, `hd-only`).

| Миксин (px) | Миксин (em) | Медиазапрос |
| --- | --- | --- |
| `max-mobile-px` | `max-mobile-em` | `max-width` на мобильном |
| `min-tablet-px` | `min-tablet-em` | `min-width` на планшете |
| `max-desktop-px` | `max-desktop-em` | `max-width` на десктопе |
| `mobile-only` | `mobile-only` | Диапазон mobile |
| `tablet-only` | `tablet-only` | Диапазон tablet |

Пример:

```scss
@include max-tablet-em {
  .sidebar {
    display: none;
  }
}
```

#### Flex-утилиты

| Миксин | Что делает |
| --- | --- |
| `flex` | `display: flex` + `@content` |
| `flex-center` | `display: flex` + центрирование по обеим осям |
| `flex-v-center` | `align-items: center` |
| `flex-h-center` | `justify-content: center` |
| `flex-all-sb` | `space-between` + `align-items: center` |
| `flex-grid($map)` | Респонсивная flex-сетка из карты настроек (кол-во колонок, отступы по брейкпоинтам) |

#### Визуальные миксины

| Миксин | Сигнатура | Описание |
| --- | --- | --- |
| `absoluteCenter` | `()` | Абсолютное центрирование: `position: absolute` + `top/left: 50%` + `translate(-50%, -50%)` |
| `overlay` | `($opacity, $color)` | `::after` оверлей на всю область родителя. Родитель должен иметь `position: relative` |
| `outline` | `($width, $offset)` | Пунктирная рамка фокуса; выше 1920px масштабируется |
| `width-height` | `($w, $h)` | Ширина + высота с масштабированием на экранах >1920px |

#### Псевдо-элементы и обёртки

| Миксин | Описание |
| --- | --- |
| `bef()` | `&::before { content: ''; @content }` |
| `aft()` | `&::after { content: ''; @content }` |
| `txt-wrap($min, $max)` | Вертикальные отступы между дочерними элементами текстового блока с адаптацией |

#### Переходы

| Миксин | Сигнатура | Описание |
| --- | --- | --- |
| `tr` | `($time)` | `transition: $time ease` для всех свойств |
| `tr-custom` | `($prop, $time)` | `transition: $prop $time ease` для конкретного свойства |

#### Функции ( units.scss )

| Функция | Описание |
| --- | --- |
| `rem($px)` | Конвертация px в rem (деление на 16) |
| `em($px)` | Конвертация px в em (деление на 16) |
| `px($val)` | Конвертация любого значения в px |
| `strip-unit($val)` | Удаление единицы измерения |

#### Состояния (`mixins/states/`)

| Миксин | Описание |
| --- | --- |
| `state-link` | Hover → `color: var(--accent)`, focus-visible → пунктир, active → тёмный акцент |
| `state-link-opacity` | Hover → `opacity: 0.7`, для кнопок-картинок |
| `state-accent` | Hover → `color: var(--accent-dark)`, для текстовых элементов |
| `state-buttons` | Hover → `background-color: var(--accent-dark)`, для кнопок |

Пример:

```scss
a {
  @include state-link;
}

.btn {
  @include state-buttons;
}
```

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

### Алиасы

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

### Паттерн хранения сниппетов

Каждая функция — отдельная папка в `src/js/functions/`:

```
functions/burger/
├── burger-init.js      # логика (экспорт функции)
├── burger-func.js      # альтернативный/старый вариант
└── burger.html         # демо-страница для тестирования
```

Блок копируется целиком: берёте папку, подключаете в `scripts.js`,
стили (если есть) — в основной SCSS-файл.

### Структура `src/js/`

| Директория | Назначение |
| --- | --- |
| `functions/` | Готовые сниппеты-решения (~75 штук), каждый в своей папке |
| `modules/` | ES6-классы: `InputMaskCollection`, `OverlayMenu` |
| `utils/` | Вспомогательные функции: `pxToRem`, `getIdFromTitle`, `getAttrNameFromSelector` |
| `constants/` | Константы: `MatchMedia` (предустановленный медиазапрос mobile) |

### Каталог сниппетов (`src/js/functions/`)

#### UI-компоненты

| Папка | Описание |
| --- | --- |
| `aos` | Инициализация AOS (Animation On Scroll) при наличии `[data-aos]` |
| `burger` | Мобильное бургер-меню: toggle, scroll lock, aria, закрытие по overlay |
| `color-scheme` | Переключатель темы: localStorage + системная / button toggle / класс ThemeManager |
| `cookie-popup` | Cookie-уведомление с установкой на 30 дней |
| `create-page-nav-items` | Автогенерация навигации по статье из `<h2>` тегов |
| `digital-counters` | Анимированное увеличение чисел от 0 до целевого через IntersectionObserver |
| `dynamic-adapt` | Респонсивный перенос элементов между контейнерами по `data-da` атрибуту |
| `filters` | Категорийные фильтры с `data-filter-button/target`, «показать ещё» |
| `highlight-code` | Подсветка синтаксиса через highlight.js |
| `likely` | Кнопки соцшаринга (ilyabirman-likely) |
| `nav-submenu` | Раскрытие/свертывание подменю с aria-expanded |
| `orphus` | Орфографическая проверка: выделение → Ctrl+Enter → отправка |
| `pagination` | HTML-шаблон пагинации |
| `portfolio` | Табы-фильтры портфолио с ленивым показом и «загрузить ещё» |
| `rating` | Система рейтинга звёздами с возможной AJAX-отправкой |
| `search` | Toggle видимости блока поиска, закрытие по Escape |
| `search-elements` | Клиентский поиск по тексту внутри списка элементов |
| `search-field-google` | Google-стиль поле поиска: toggle по кнопке, закрытие по Escape |
| `select-display-none` | Кастомный select: раскрытие/закрытие, подмена текста заголовка |
| `select-expanded` | Кастомный select с анимацией slideToggle, aria-expanded |
| `show-more` | Прогрессивный показ контента с настраиваемым количеством |
| `simple-bar` | Кастомный скроллбар SimpleBar на `[data-simple-bar]` |
| `sorting` | Сортировка каталога: по цене, скидке, рейтингу, новинкам |
| `spoilers` | Адаптивные спойлеры/аккордеон с data-атрибутами, slideToggle |
| `spoilers-new` | Улучшенные спойлеры: `data-min/max`, `data-mode="single"`, делегирование |
| `stepper` | Степпер количества: кнопки +/-, валидация ввода |
| `stepper-sum` | Степпер с пересчётом цены в реальном времени |
| `tabs` | Табы с навигацией по клику и клавиатуре (стрелки, Enter), ARIA |
| `ticker` | CSS-лента бегущей строки (без JS) |
| `timer-countdown` | Обратный отсчёт до даты с русскими склонениями |
| `tooltip` | CSS-тултипы (без JS): `role="tooltip"` |
| `video` | Интеграция YouTube IFrame API: autoplay, loop, muted |
| `window-on-key-27-down` | Обработчик Escape: закрытие бургера, навигации, корзины |
| `yandex-metrika-with-cookie` | Cookie-уведомление + отслеживание целей Яндекс.Метрики |
| `switch` | Toggle-переключатель (CSS-only, без JS) |
| `scheme-org` | HTML-шаблоны для Schema.org разметки |

#### Прокрутка

| Папка | Описание |
| --- | --- |
| `go-back-top` | Кнопка «наверх»: появляется при скролле, плавный scrollTo(0,0) |
| `link-scroll-to-element` | Плавный скролл к элементу по клику с компенсацией header |
| `nav-active-link` | Подсветка активной ссылки навигации (2 варианта: scroll / IntersectionObserver) |
| `read-progress-circle` | SVG-круг индикатора прогресса чтения (stroke-dashoffset) |
| `read-progress-line` | Горизонтальная полоса прогресса чтения |
| `scroll-to-element` | Плавный скролл по `data-go-to` с компенсацией header |
| `set-class-when-scrolling` | Скрытие header при прокрутке вниз, показ при прокрутке вверх |

#### Формы

| Папка | Описание |
| --- | --- |
| `input-mask` | Маска ввода телефона +7 (999) 999-99-99 через inputmask |
| `input-password-show-hide` | Toggle видимости пароля (переключение type password/text) |
| `quiz` | Многошаговая форма-викторина: progress-bar, next/prev, финишный экран |
| `show-hide-password` | Toggle видимости пароля с классом (альтернативная реализация) |
| `validation-forms` | Валидация через just-validate: имя, телефон (inputmask), email |

#### Модалки

| Папка | Описание |
| --- | --- |
| `hystmodal` | Библиотека HystModal: accessible модалки, overlay, Esc, focus-trap |
| `micromodal` | Интеграция MicroModal: scroll lock, сброс iframe, пауза видео |
| `micromodal-close` | Закрытие MicroModal по `data-modal-close` |
| `modal-evkarn` | Своя реализация модалок: `data-modal-path/target`, overlay, disableScroll |

#### Слайдеры

| Папка | Описание |
| --- | --- |
| `fs-lightbox` | FsLightbox для портфолио с блокировкой скролла |
| `no-ui-slider` | noUiSlider (range-слайдер) с настройками по умолчанию |
| `photo-swipe` | PhotoSwipe lightbox для галерей с `[data-gallery]` |
| `slider-switch-images` | Переключение изображений в карточке при наведении |
| `swiper` | Swiper с навигацией и адаптивными брейкпоинтами |

#### Утилиты

| Папка | Описание |
| --- | --- |
| `check-viewport` | Определение типа устройства (mobile/tablet/desktop) |
| `disable-scroll` | Блокировка скролла: класс `stop-scroll` + сохранение позиции |
| `enable-scroll` | Разблокировка скролла: удаление `stop-scroll` + восстановление |
| `get-data` | Async-обёртка для fetch(), возвращает JSON |
| `get-element-height` | Получение высоты элемента, запись в CSS-переменную, отслеживание resize |
| `get-full-year` | Подстановка текущего года в элемент и meta |
| `get-scroll-width` | Вычисление ширины скроллбара → CSS-переменная `--scroll-width` |
| `image-in-bg` | Установка background-image из img/picture с учётом webp |
| `normal-price` | Форматирование числа: 100000 → «100 000» |
| `offset-panel-phone` | Установка `--verticalHeight` для мобильных панелей |
| `open-graph` | HTML-шаблон мета-тегов Open Graph |
| `set-element-min-height` | Выравнивание высот: установка max(высот) как min-height |
| `set-images-orientation-classes` | Классы `img-horizontal/img-vertical/img-square` по пропорциям |
| `set-min-height-elements` | Альтернативная реализация set-element-min-height |
| `slide-down` | Анимация раскрытия (height 0 → auto) |
| `slide-toggle` | Toggle между slideDown и slideUp |
| `slide-up` | Анимация сворачивания (height auto → 0) |
| `webp-avif-support` | Определение поддержки WebP/AVIF, классы на html/body |
| `window-listener-resize` | Установка высоты элемента как CSS-переменной при resize |

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

## VS Code

В папке `.vscode/` лежат готовые сниппеты и рекомендации расширений:

- **Расширения** (`.vscode/extensions.json`) — рекомендуемые плагины:
  Live Server, stylelint, ESLint, Project Snippets и др.
- **Настройки** (`.vscode/settings.json`) — пути поиска для Sass,
  ассоциации файлов.
- **Сниппеты** (`.vscode/*.code-snippets`) — 70+ сниппетов для HTML, CSS,
  JavaScript и PHP. Копируйте папку `.vscode/` в свой проект, и VS Code
  предложит установить рекомендации. Сниппеты вызываются через
  `rebornix.project-snippets` или стандартный менеджер сниппетов.

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
