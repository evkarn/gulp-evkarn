# Gulp-сборка evkarn.ru

Используется Gulp 5. Тестировалось на node.js 24.14.1

Directory structure:
Directory structure:
└── gulp/
    ├── config/
    │   ├── fonts.js
    │   ├── ftp.js
    │   ├── path.js
    │   └── plugins.js
    ├── tasks/
    │   ├── clean.js
    │   ├── copy-config-files.js
    │   ├── copy-favicon.js
    │   ├── copy-files.js
    │   ├── fonts-faces.js
    │   ├── ftp.js
    │   ├── html.js
    │   ├── imgMin.js
    │   ├── js.js
    │   ├── plumber.js
    │   ├── server.js
    │   ├── sprite.js
    │   ├── ssh.js
    │   ├── styles.js
    │   ├── svgMin.js
    │   ├── ttf-to-woff.js
    │   └── zip.js
    └── version.json
└── src/
    ├── assets/
    │   ├── favicon/
    │   │   ├── apple-touch-icon.png
    │   │   ├── favicon-96x96.png
    │   │   ├── favicon.ico
    │   │   ├── favicon.svg
    │   │   ├── site.webmanifest
    │   │   ├── web-app-manifest-192x192.png
    │   │   └── web-app-manifest-512x512.png
    │   ├── files/

    │   ├── fonts/
    │   │   └── NunitoSans-VariableFont.ttf
    │   ├── images/
    │   │   ├── iterms/
    │   │   │   ├── 404.jpg
    │   │   │   ├── blog.jpg
    │   │   │   ├── chat.jpg
    │   │   │   ├── choose-policies.jpg
    │   │   │   ├── detail-document.jpg
    │   │   │   ├── documents.jpg
    │   │   │   ├── email-template-1.jpg
    │   │   │   ├── email-template-2.jpg
    │   │   │   ├── email-template-3.jpg
    │   │   │   ├── main.jpg
    │   │   │   ├── policy-details.jpg
    │   │   │   ├── post.jpg
    │   │   │   ├── pricing.jpg
    │   │   │   ├── settings.jpg
    │   │   │   ├── sign-in.jpg
    │   │   │   ├── sign-up.jpg
    │   │   │   └── subscription.jpg
    │   │   ├── og-images/

    │   │   ├── pinterest/

    │   │   └── vodorod/
    │   │       ├── main-dark-1.jpg
    │   │       ├── main-dark-2.jpg
    │   │       ├── main-light-1.jpg
    │   │       └── main-light-2.jpg
    │   └── svg/
    │       ├── icons/
    │       │   └── logo.svg
    │       ├── sprite/
    │       │   └── logo.svg
    │       └── static/
    │           └── icons/
    │               └── logo.svg
    ├── config/
    │   └── robots.txt
    ├── html/
    │   └── index.html
    ├── includes/
    │   ├── elements/
    │   │   ├── burger.html
    │   │   ├── checkbox.html
    │   │   ├── form-justvalidate.html
    │   │   ├── go-back-top.html
    │   │   ├── loader.html
    │   │   ├── logo.html
    │   │   ├── nav.html
    │   │   └── radio.html
    │   ├── layouts/
    │   │   ├── counters.html
    │   │   ├── footer.html
    │   │   ├── head.html
    │   │   └── header.html
    │   ├── schema-org/
    │   │   └── faq.html
    │   └── sections/
    │       ├── breadcrumbs/
    │       │   ├── breadcrumbs.html
    │       │   ├── data.json
    │       │   └── loop-items.html
    │       ├── intro-home.html
    │       └── pagination.html
    ├── js/
    │   ├── constants/
    │   │   └── MatchMedia.js
    │   ├── functions/
    │   │   ├── aos/
    │   │   │   ├── aos.html
    │   │   │   └── aos.js
    │   │   ├── burger/
    │   │   │   ├── burger-init.js
    │   │   │   └── index.js
    │   │   ├── check-viewport/
    │   │   │   └── check-viewport-func.js
    │   │   ├── color-scheme/
    │   │   │   ├── buttons-webdesign-master.html
    │   │   │   ├── color-scheme-polyfil-func.js
    │   │   │   ├── color-scheme-three-func.js
    │   │   │   ├── color-scheme-two-func.js
    │   │   │   ├── color-scheme.html
    │   │   │   ├── scheme-auto-on.svg
    │   │   │   ├── scheme-dark-moon.svg
    │   │   │   ├── scheme-light-sun.svg
    │   │   │   └── scheme-status.svg
    │   │   ├── cookie-popup/
    │   │   │   ├── cookie-note-func.js
    │   │   │   ├── cookie-popup.html
    │   │   │   └── styles/
    │   │   │       ├── _cookie-popup.scss
    │   │   │       └── _cookie-popup__btn.scss
    │   │   ├── create-page-nav-items/
    │   │   │   └── create-page-nav-items.js
    │   │   ├── digital-counters/
    │   │   │   ├── digital-counters-func.js
    │   │   │   └── digital-counters.html
    │   │   ├── disable-scroll/
    │   │   │   └── disable-scroll.js
    │   │   ├── document-listener-click/
    │   │   │   └── document-listener-click-func.js
    │   │   ├── dynamic-adapt/
    │   │   │   ├── dynamic-adapt-func.js
    │   │   │   ├── dynamic-adapt.html
    │   │   │   └── README.md
    │   │   ├── enable-scroll/
    │   │   │   └── enable-scroll.js
    │   │   ├── filters/
    │   │   │   ├── filters-func.js
    │   │   │   └── filters.html
    │   │   ├── fs-lightbox/
    │   │   │   ├── fs-lightbox-func.js
    │   │   │   └── fs-lightbox.html
    │   │   ├── get-data/
    │   │   │   └── get-data-func.js
    │   │   ├── get-element-height/
    │   │   │   └── get-element-height.js
    │   │   ├── get-full-year/
    │   │   │   └── get-full-year-func.js
    │   │   ├── get-scroll-width/
    │   │   │   ├── get-scroll-width-func.js
    │   │   │   └── stop-scroll.scss
    │   │   ├── go-back-top/
    │   │   │   └── go-back-top-func.js
    │   │   ├── highlight-code/
    │   │   │   ├── highlight-code-func.js
    │   │   │   └── styles/
    │   │   │       ├── hljs-addition.scss
    │   │   │       ├── hljs-attribute.scss
    │   │   │       ├── hljs-built_in.scss
    │   │   │       ├── hljs-bullet.scss
    │   │   │       ├── hljs-comment.scss
    │   │   │       ├── hljs-deletion.scss
    │   │   │       ├── hljs-emphasis.scss
    │   │   │       ├── hljs-keyword.scss
    │   │   │       ├── hljs-link.scss
    │   │   │       ├── hljs-literal.scss
    │   │   │       ├── hljs-meta.scss
    │   │   │       ├── hljs-name.scss
    │   │   │       ├── hljs-number.scss
    │   │   │       ├── hljs-params.scss
    │   │   │       ├── hljs-quote.scss
    │   │   │       ├── hljs-regexp.scss
    │   │   │       ├── hljs-section.scss
    │   │   │       ├── hljs-selector-class.scss
    │   │   │       ├── hljs-selector-id.scss
    │   │   │       ├── hljs-selector-tag.scss
    │   │   │       ├── hljs-string.scss
    │   │   │       ├── hljs-strong.scss
    │   │   │       ├── hljs-symbol.scss
    │   │   │       ├── hljs-tag.scss
    │   │   │       ├── hljs-template-variable.scss
    │   │   │       ├── hljs-title.scss
    │   │   │       ├── hljs-type.scss
    │   │   │       ├── hljs-variable.scss
    │   │   │       ├── hljs.scss
    │   │   │       ├── pre.scss
    │   │   │       ├── scheme-dark.scss
    │   │   │       ├── scheme-light.scss
    │   │   │       └── _index.scss
    │   │   ├── hystmodal/
    │   │   │   ├── hystmodal.html
    │   │   │   └── hystmodal.min.js
    │   │   ├── image-in-bg/
    │   │   │   ├── image-In-bg-func.js
    │   │   │   └── image-In-bg.html
    │   │   ├── input-mask/
    │   │   │   └── input-mask-func.js
    │   │   ├── input-password-show-hide/
    │   │   │   └── input-password-show-hide-func.js
    │   │   ├── likely/
    │   │   │   ├── likely-func.js
    │   │   │   └── styles/
    │   │   │       ├── likely.scss
    │   │   │       ├── likely_visible.scss
    │   │   │       ├── likely__button.scss
    │   │   │       ├── likely__counter.scss
    │   │   │       ├── likely__icon.scss
    │   │   │       ├── likely__widget.scss
    │   │   │       └── _index-likely.scss
    │   │   ├── link-scroll-to-element/
    │   │   │   └── link-scroll-to-element-func.js
    │   │   ├── micromodal/
    │   │   │   ├── micromodal-close.js
    │   │   │   ├── micromodal-func.js
    │   │   │   ├── micromodal.html
    │   │   │   ├── _index-micromodal.scss
    │   │   │   ├── _keyframes.scss
    │   │   │   ├── _modal.scss
    │   │   │   ├── _modal__close.scss
    │   │   │   ├── _modal__container.scss
    │   │   │   ├── _modal__content.scss
    │   │   │   ├── _modal__header.scss
    │   │   │   ├── _modal__overlay.scss
    │   │   │   ├── _modal__subtitle.scss
    │   │   │   └── _modal__title.scss
    │   │   ├── modal-evkarn/
    │   │   │   ├── modal-evkarn-func.js
    │   │   │   └── modal-evkarn-index.html
    │   │   ├── nav-active-link/
    │   │   │   ├── nav-active-link-func.js
    │   │   │   └── nav-active-link-observer-func.js
    │   │   ├── nav-submenu/
    │   │   │   └── nav-submenu-func.js
    │   │   ├── no-ui-slider/
    │   │   │   ├── no-ui-slider-func.js
    │   │   │   └── no-ui-slider.html
    │   │   ├── normal-price/
    │   │   │   └── normal-price.js
    │   │   ├── offset-panel-phone/
    │   │   │   ├── offset-panel-phone-func.js
    │   │   │   └── offset-panel-phone-styles.sass
    │   │   ├── open-graph/
    │   │   │   └── article-open-graph.html
    │   │   ├── orphus/
    │   │   │   ├── orphus-func.js
    │   │   │   ├── orphus-local.php
    │   │   │   ├── orphus-ru.js
    │   │   │   ├── orphus.gif
    │   │   │   ├── orphus.js
    │   │   │   ├── orphus.php
    │   │   │   └── screenshot.png
    │   │   ├── pagination/
    │   │   │   ├── pagination.html
    │   │   │   └── styles/
    │   │   │       ├── pagination__element.scss
    │   │   │       └── _index-pagination.scss
    │   │   ├── photo-swipe/
    │   │   │   ├── photo-swipe-func.js
    │   │   │   └── photo-swipe.html
    │   │   ├── portfolio/
    │   │   │   ├── portfolio-func.js
    │   │   │   ├── portfolio-index.html
    │   │   │   └── portfolio-styles.sass
    │   │   ├── quiz/
    │   │   │   ├── quiz-func.js
    │   │   │   ├── quiz-index.html
    │   │   │   └── quiz-styles.sass
    │   │   ├── rating/
    │   │   │   ├── rating-func.js
    │   │   │   ├── rating-index.html
    │   │   │   ├── rating-js-styles.sass
    │   │   │   ├── rating-styles.sass
    │   │   │   └── rating.json
    │   │   ├── read-progress-circle/
    │   │   │   ├── read-progress-circle-func.js
    │   │   │   └── read-progress-circle-styles.sass
    │   │   ├── read-progress-line/
    │   │   │   ├── read-progress-line-func.js
    │   │   │   ├── _index-read-progress-line.scss
    │   │   │   ├── _progress-line.scss
    │   │   │   └── _progress-line__item.scss
    │   │   ├── scheme-org/
    │   │   │   ├── article-blog.html
    │   │   │   ├── article.html
    │   │   │   ├── organization-json-2.json
    │   │   │   ├── organization-json.json
    │   │   │   ├── organization-microdata.html
    │   │   │   ├── review.html
    │   │   │   └── video.html
    │   │   ├── scroll-to-element/
    │   │   │   └── scroll-to-element-func.js
    │   │   ├── search/
    │   │   │   ├── header-search-block.html
    │   │   │   ├── search-button.html
    │   │   │   ├── search-button.sass
    │   │   │   ├── search-func.js
    │   │   │   ├── search-google.sass
    │   │   │   ├── search-result.sass
    │   │   │   └── search-yandex.sass
    │   │   ├── search-elements/
    │   │   │   └── search-elements-func.js
    │   │   ├── search-field-google/
    │   │   │   ├── search-field-google-func.js
    │   │   │   ├── search-field-google-index.html
    │   │   │   ├── search-field-google-result-page-index.html
    │   │   │   └── search-field-google-styles.sass
    │   │   ├── select-display-none/
    │   │   │   ├── select-display-none-func.js
    │   │   │   ├── select-display-none-index.html
    │   │   │   └── select-display-none-styles.sass
    │   │   ├── select-expanded/
    │   │   │   ├── select-expanded-func.js
    │   │   │   ├── select-expanded.html
    │   │   │   └── styles/
    │   │   │       ├── index-select-expanded.scss
    │   │   │       ├── select-expanded.scss
    │   │   │       ├── select-expanded__arrow.scss
    │   │   │       ├── select-expanded__button.scss
    │   │   │       ├── select-expanded__chevron.scss
    │   │   │       ├── select-expanded__content.scss
    │   │   │       ├── select-expanded__options.scss
    │   │   │       ├── select-expanded__text.scss
    │   │   │       └── select-expanded__title.scss
    │   │   ├── set-class-when-scrolling/
    │   │   │   └── set-class-when-scrolling-func.js
    │   │   ├── set-element-min-height/
    │   │   │   └── set-element-min-height-func.js
    │   │   ├── set-images-orientation-classes/
    │   │   │   └── set-images-orientation-classes-func.js
    │   │   ├── set-min-height-elements/
    │   │   │   └── set-min-height-elements.js
    │   │   ├── show-hide-password/
    │   │   │   └── show-hide-password.js
    │   │   ├── show-more/
    │   │   │   ├── show-more-func.js
    │   │   │   ├── show-more-index.html
    │   │   │   └── show-more-styles.sass
    │   │   ├── simple-bar/
    │   │   │   ├── simple-bar-func.js
    │   │   │   ├── simple-bar-index.html
    │   │   │   └── simplebar.css
    │   │   ├── slide-down/
    │   │   │   └── slide-down-func.js
    │   │   ├── slide-toggle/
    │   │   │   └── slide-toggle-func.js
    │   │   ├── slide-up/
    │   │   │   └── slide-up-func.js
    │   │   ├── slider-switch-images/
    │   │   │   ├── slider-switch-images-func.js
    │   │   │   ├── slider-switch-images.html
    │   │   │   └── _slider-switch-images.sass
    │   │   ├── sorting/
    │   │   │   ├── sorting-func.js
    │   │   │   └── sorting-index.html
    │   │   ├── spoilers/
    │   │   │   ├── faq.html
    │   │   │   ├── spoilers.html
    │   │   │   └── spoilers.js
    │   │   ├── spoilers-new/
    │   │   │   ├── init-spoilers.js
    │   │   │   ├── spoilers-faq.html
    │   │   │   ├── spoilers.html
    │   │   │   └── styles/
    │   │   │       ├── spoilers.scss
    │   │   │       ├── _spoilers__content.scss
    │   │   │       ├── _spoilers__inner.scss
    │   │   │       └── _spoilers__trigger.scss
    │   │   ├── stepper/
    │   │   │   ├── stepper-func.js
    │   │   │   ├── stepper-index.html
    │   │   │   ├── stepper-styles.sass
    │   │   │   └── stepper-sum-func.js
    │   │   ├── swiper/
    │   │   │   ├── resizable-swiper.js
    │   │   │   ├── swiper-func.js
    │   │   │   ├── swiper-import-styles.sass
    │   │   │   └── swiper-index.html
    │   │   ├── switch/
    │   │   │   ├── html/
    │   │   │   │   └── switch.html
    │   │   │   └── styles/
    │   │   │       ├── _index.scss
    │   │   │       ├── _switch-input.scss
    │   │   │       └── _switch-label.scss
    │   │   ├── tabs/
    │   │   │   ├── styles/
    │   │   │   │   ├── index.scss
    │   │   │   │   ├── tabs-content.scss
    │   │   │   │   ├── tabs.scss
    │   │   │   │   ├── tabs__arrow--next.scss
    │   │   │   │   ├── tabs__arrow--prev.scss
    │   │   │   │   ├── tabs__arrow.scss
    │   │   │   │   ├── tabs__btn.scss
    │   │   │   │   └── tabs__list.scss
    │   │   │   ├── tabs-func.js
    │   │   │   └── tabs.html
    │   │   ├── ticker/
    │   │   │   ├── ticker-keyframes.scss
    │   │   │   ├── ticker.html
    │   │   │   ├── ticker.scss
    │   │   │   ├── ticker__img.scss
    │   │   │   ├── ticker__item.scss
    │   │   │   ├── ticker__wrapper.scss
    │   │   │   └── _index-ticker.scss
    │   │   ├── timer-countdown/
    │   │   │   ├── timer-countdown-func.js
    │   │   │   ├── timer-countdown-index.html
    │   │   │   └── timer-countdown-styles.sass
    │   │   ├── tooltip/
    │   │   │   ├── html/
    │   │   │   │   ├── tooltip-notification.html
    │   │   │   │   └── tooltip.html
    │   │   │   └── styles/
    │   │   │       ├── _index.scss
    │   │   │       ├── _tooltip.scss
    │   │   │       ├── _tooltip__btn.scss
    │   │   │       └── _tooltip__txt.scss
    │   │   ├── validation-forms/
    │   │   │   └── validation-forms-func.js
    │   │   ├── vars.js
    │   │   ├── video/
    │   │   │   ├── video-func.js
    │   │   │   ├── video-index.html
    │   │   │   └── video.sass
    │   │   ├── webp-avif-support/
    │   │   │   └── webp-avif-support-func.js
    │   │   ├── window-listener-resize/
    │   │   │   └── window-listener-resize-func.js
    │   │   └── window-on-key-27-down/
    │   │       └── window-on-key-27-down-func.js
    │   ├── libs/

    │   ├── modules/
    │   │   ├── InputMaskCollection.js
    │   │   └── OverlayMenu.js
    │   ├── scripts.js
    │   └── utils/
    │       ├── getAttrNameFromSelector.js
    │       ├── getIdFromTitle.js
    │       └── pxToRem.js
    └── styles/
        └── scss/
            ├── elements/
            │   ├── animations/
            │   │   ├── animations.scss
            │   │   ├── fade-in.scss
            │   │   ├── fade-out.scss
            │   │   ├── pulse.scss
            │   │   ├── slide-in.scss
            │   │   └── slide-out.scss
            │   ├── badge/
            │   │   └── badge.scss
            │   ├── bootstrap/
            │   │   └── bootstrap-breakpoints.sass
            │   ├── breadcrumbs/
            │   │   ├── _breadcrumbs.scss
            │   │   ├── _breadcrumbs__item.scss
            │   │   └── _breadcrumbs__link.scss
            │   ├── burger/
            │   │   ├── _burger.scss
            │   │   └── _burger__line.scss
            │   ├── card/
            │   │   ├── _card.scss
            │   │   ├── _card__date.scss
            │   │   ├── _card__footer.scss
            │   │   ├── _card__img-link.scss
            │   │   ├── _card__img.scss
            │   │   ├── _card__main.scss
            │   │   ├── _card__minimal.scss
            │   │   ├── _card__pressure.scss
            │   │   └── _card__title.scss
            │   ├── checkbox/
            │   │   ├── _checkbox-input.scss
            │   │   ├── _checkbox-label.scss
            │   │   ├── _checkbox-txt.scss
            │   │   └── _checkbox.scss
            │   ├── form/
            │   │   ├── _fieldset.scss
            │   │   ├── _fieldset__header.scss
            │   │   ├── _form.scss
            │   │   ├── _form__button.scss
            │   │   ├── _input.scss
            │   │   └── _textarea.scss
            │   ├── likely/
            │   │   ├── _likely.scss
            │   │   ├── _likely_visible.scss
            │   │   ├── _likely__button.scss
            │   │   ├── _likely__counter.scss
            │   │   ├── _likely__icon.scss
            │   │   └── _likely__widget.scss
            │   ├── loader/
            │   │   ├── _loader.scss
            │   │   ├── _loader__body.scss
            │   │   ├── _loader__header.scss
            │   │   ├── _loader__icon.scss
            │   │   ├── _loader__list.scss
            │   │   ├── _loader__main.scss
            │   │   ├── _loader__overlay.scss
            │   │   └── _loader__row.scss
            │   ├── mega-menu/
            │   │   └── _mega-menu.scss
            │   ├── nav/
            │   │   ├── nav--multi-level/
            │   │   │   ├── _a.scss
            │   │   │   ├── _index-nav--multi-level.scss
            │   │   │   ├── _li.scss
            │   │   │   ├── _sub-menu.scss
            │   │   │   └── _ul.scss
            │   │   ├── nav--two-level/
            │   │   │   ├── _index-nav--two-level.scss
            │   │   │   ├── _menu-item.scss
            │   │   │   ├── _menu.scss
            │   │   │   └── _sub-menu.scss
            │   │   ├── _nav.scss
            │   │   ├── _nav__link.scss
            │   │   └── _nav__list.scss
            │   ├── page-nav/
            │   │   ├── _page-nav.scss
            │   │   ├── _page-nav__item.scss
            │   │   ├── _page-nav__link.scss
            │   │   ├── _page-nav__list.scss
            │   │   └── _page-nav__title.scss
            │   ├── radio/
            │   │   ├── radio-input.scss
            │   │   ├── radio-label.scss
            │   │   └── radio.scss
            │   ├── scheme/
            │   │   ├── scheme-switcher.scss
            │   │   ├── scheme.scss
            │   │   ├── _scheme-dark.scss
            │   │   ├── _scheme-light.scss
            │   │   ├── _scheme-switcher__legend.scss
            │   │   ├── _scheme-switcher__radio--auto.scss
            │   │   ├── _scheme-switcher__radio--dark.scss
            │   │   ├── _scheme-switcher__radio--light.scss
            │   │   ├── _scheme-switcher__radio.scss
            │   │   └── _scheme-switcher__status.scss
            │   ├── select-css/
            │   │   ├── _select-css.scss
            │   │   └── _select-wrap.scss
            │   ├── shareon/
            │   │   └── shareon.min.scss
            │   ├── spoilers/
            │   │   ├── _spoiler-content__inner.scss
            │   │   ├── _spoilers.scss
            │   │   ├── _spoilers__item.scss
            │   │   ├── _spoilers__list.scss
            │   │   ├── _spoiler__content.scss
            │   │   └── _spoiler__title.scss
            │   ├── swiper/
            │   │   ├── _swiper-button.scss
            │   │   ├── _swiper-buttons.scss
            │   │   ├── _swiper-wrapper.scss
            │   │   └── _swiper.scss
            │   ├── wordpress/
            │   │   ├── comment-form/
            │   │   │   ├── _checkbox-input.scss
            │   │   │   ├── _comment-form.scss
            │   │   │   ├── _comment-form__submit.scss
            │   │   │   ├── _fieldset--category.scss
            │   │   │   └── _fieldset--message.scss
            │   │   ├── comments/
            │   │   │   ├── _author.scss
            │   │   │   ├── _author__city.scss
            │   │   │   ├── _author__icon.scss
            │   │   │   ├── _author__info.scss
            │   │   │   ├── _author__name.scss
            │   │   │   ├── _comment.scss
            │   │   │   ├── _comments.scss
            │   │   │   ├── _comments__more.scss
            │   │   │   ├── _comment__body.scss
            │   │   │   ├── _comment__bottom.scss
            │   │   │   ├── _comment__date.scss
            │   │   │   ├── _comment__info.scss
            │   │   │   ├── _comment__text-wrap.scss
            │   │   │   ├── _comment__text.scss
            │   │   │   ├── _index.scss
            │   │   │   ├── _review.scss
            │   │   │   ├── _review__btn.scss
            │   │   │   ├── _review__quantity.scss
            │   │   │   └── _review__svg.scss
            │   │   └── menu/
            │   │       ├── _current-menu-item.scss
            │   │       ├── _menu-link.scss
            │   │       └── _menu.scss
            │   ├── _button.scss
            │   ├── _go-back-top.scss
            │   └── _photo-swipe.scss
            ├── fonts/
            │   └── _fonts-faces.scss
            ├── footer/
            │   └── _footer.scss
            ├── header/
            │   ├── _header.scss
            │   ├── _header__container.scss
            │   └── _header__logo.scss
            ├── mixins/
            │   ├── absolute-center.scss
            │   ├── adaptive-value.scss
            │   ├── adaptive-value_old.scss
            │   ├── breakpoints-em.scss
            │   ├── breakpoints-px.scss
            │   ├── flex.scss
            │   ├── fluid-size.scss
            │   ├── outline.scss
            │   ├── overlay.scss
            │   ├── pseudo-elements.scss
            │   ├── resp-val.scss
            │   ├── states/
            │   │   ├── state-accent.scss
            │   │   ├── state-buttons.scss
            │   │   ├── state-link-opacity.scss
            │   │   └── state-link.scss
            │   ├── transition.scss
            │   ├── txt-wrap.scss
            │   ├── units.scss
            │   └── width-height-px.scss
            ├── sections/
            │   └── intro/
            │       └── _intro.scss
            ├── settings/
            │   ├── _body.scss
            │   ├── _config.scss
            │   ├── _containers.scss
            │   ├── _custom-classes.scss
            │   ├── _flex.scss
            │   ├── _general.scss
            │   ├── _grid.scss
            │   ├── _icons-bg.scss
            │   ├── _imports.scss
            │   ├── _indents.scss
            │   ├── _reset-classes.scss
            │   ├── _settings.scss
            │   ├── _states.scss
            │   └── _titles.scss
            ├── styles.scss
            └── vars/
                ├── general.scss
                ├── grid.scss
                └── root.scss