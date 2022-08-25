document.addEventListener("DOMContentLoaded", function (event) {

    /* ==============================================
    loadScript
    ==============================================*/

    window.loadScript = function (url, callback) {
        var script = document.createElement("script");

        if (script.readyState) { // IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    /* ==============================================
     mobile menu
     ============================================== */

    const elContainer = document.querySelector('[data-menu="container"]')
    const elButton = document.querySelector('[data-menu="btn"]')

    function mobileMenu(params) {
        this.el = params.elContainer;
        this.button = params.elButton;
        this.state = 'close';

        this.open = function () {

            if (window.userMenuInstance) {
                window.userMenuInstance.close()
            }

            this.el.classList.add('open')
            this.button.classList.add('open')
            document.body.classList.add('hidden')
            this.state = 'open';

        }

        this.close = function () {

            this.el.classList.add('close-animate')
            this.button.classList.remove('open')

            setTimeout(() => {
                this.el.classList.remove('open')
                this.el.classList.remove('close-animate')
                document.body.classList.remove('hidden')
                this.state = 'close'
            }, 200)


        }

        this.toggle = function () {
            if (this.state == 'close') this.open()
            else this.close()
        }
    }

    window.menuInstanse = new mobileMenu({
        elButton,
        elContainer
    })

    elButton.addEventListener('click', function () {
        window.menuInstanse.toggle()
    })

    /* ========================================
    mobile nav
    ========================================*/

    document.querySelectorAll('.header-nav li').forEach(li => {
        li.addEventListener('click', e => {
            //e.preventDefault()
            li.classList.toggle('active')
        })
    })

    /* ========================================
    hover news
    ========================================*/

    if (document.querySelectorAll('.last-news-block__item').length) {

        let imageArr = document.querySelectorAll('.last-news-block__img')

        document.querySelectorAll('.last-news-block__item').forEach((item, index) => {
            item.addEventListener('mouseenter', e => {
                e.preventDefault()
                imageArr[index].classList.add('active')
            })
            item.addEventListener('mouseleave', e => {
                e.preventDefault()
                if (imageArr[index].classList.contains('active')) imageArr[index].classList.remove('active')
            })
        })
    }

    /* ==============================================
    select
    ============================================== */

    // public methods
    // select.afSelect.open()
    // select.afSelect.close()
    // select.afSelect.update()

    const selectCustom = new customSelect({
        selector: 'select'
    })

    selectCustom.init()


    /* ==============================================
    open filter in mobile
    ============================================== */

    if (document.querySelector('[data-filter-open="btn"]')) {

        document.querySelector('[data-filter-open="btn"]').addEventListener('click', function (e) {
            document.querySelector('[data-filter-open="container"]').classList.toggle('open')
        })

        document.querySelector('[data-filter-open="close"]').addEventListener('click', function (e) {
            document.querySelector('[data-filter-open="container"]').classList.remove('open')
        })

    }


    /* ==============================================
    all photo news
    ============================================== */

    if (document.querySelector('.news-details__all')) {
        document.querySelector('.news-details__all a').addEventListener('click', function (e) {

            e.preventDefault()

            let arrImage = e.target.closest('.news-details__all').querySelectorAll('[data-src]')
            let arrFancybox = []

            arrImage.forEach(item => {
                arrFancybox.push({
                    src: item.dataset.src,
                    type: "image",
                })
            })

            console.log(arrImage)

            const fancybox = Fancybox.show(arrFancybox);
        })
    }
    /* ==============================================
    fancybox
    ============================================== */

    if (document.querySelector('[data-fancybox]')) {

        let arrImage = document.querySelectorAll('[data-fancybox]')
        let arrFancybox = []

        arrImage.forEach((item, index) => {
            arrFancybox.push({
                src: item.dataset.src,
                type: "image",
            })

            item.addEventListener('click', function () {
                Fancybox.show(arrFancybox, {
                    startIndex: index
                });
            })
        })

        console.log(arrImage)


    }
    /* ==============================================
    datepicker
    ============================================== */



    if (document.querySelector('.top-filter__group')) {

        (function () {
            Datepicker.locales.ru = {
                days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
                daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
                daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                today: "Сегодня",
                clear: "Очистить",
                format: "dd.mm.yyyy",
                weekStart: 1,
                monthsTitle: 'Месяцы'
            }
        })();

        const elem = document.querySelector('.top-filter__group');
        const input = elem.querySelector('input')
        const rangepicker = new DateRangePicker(elem, {
            language: 'ru'
        });


    }


    /* ==============================================
    signup modal
    ============================================== */

    if (document.querySelectorAll('[data-modal="signup"]').length) {

        document.querySelectorAll('[data-modal="signup"]').forEach(item => {
            item.addEventListener('click', function (e) {
                Fancybox.show([{
                    src: document.querySelector('#modal-signup').innerHTML,
                    type: "html",
                }]);
            })
        })

    }


    /* ==============================================
    swiper
    ============================================== */

    if (document.querySelectorAll('[data-swiper="speaker"]').length) {

        const swiper = new Swiper('[data-swiper="speaker"]', {

            slidesPerView: 1,
            spaceBetween: 10,

            navigation: {
                nextEl: '[data-swiper-next="speaker"]',
                prevEl: '[data-swiper-prev="speaker"]',
            },


            breakpoints: {
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 20
                },

                576: {
                    slidesPerView: 2.1,
                    spaceBetween: 20,
                },

                767: {
                    slidesPerView: 3.1,
                    spaceBetween: 20,
                },

                992: {
                    slidesPerView: 4.1,
                    spaceBetween: 30,
                }
            }




        });

    }


    /* ========================================
    swiper-partner
    ========================================*/


    if (document.querySelectorAll('[data-swiper="partners"]').length) {

        if (document.body.clientWidth > 766) {
            const swiper = new Swiper('[data-swiper="partners"]', {

                slidesPerView: 1,
                spaceBetween: 10,

                // autoplay: {
                //     delay: 5000,
                // },




                breakpoints: {
                    320: {
                        slidesPerView: 1.2,
                        spaceBetween: 20
                    },

                    576: {
                        slidesPerView: 2.1,
                        spaceBetween: 20,
                    },



                    992: {
                        slidesPerView: 3.1,
                        spaceBetween: 25,
                    },

                    1200: {
                        slidesPerView: 4.1,
                        spaceBetween: 28,
                    }
                }




            });
        }



    }

    /* ==================================
    swiper nav hide
    ==================================*/

    if (document.querySelectorAll('.school-conditions .swiper-slide').length > 4) {
        document.querySelector('.school-conditions__title-nav').style.display = 'block'
    }

    /* ==================================
    faq
    ==================================*/

    if (document.querySelectorAll('.faq-item__question')) {

        const faqItems = document.querySelectorAll('.faq-item__question')


        faqItems.forEach(function (item, index) {
            item.addEventListener('click', function () {
                this.parentNode.classList.toggle('open')
            })
        })

    }


    /* ==================================
    map
    ==================================*/

    function YMaps(option) {

        this.map = null;
        this.MyBalloonLayout = null;
        this.MyBalloonContentLayout = null;
        this.MyIconContentLayout = null;
        this.isInit = false;

        this.mapsParams = {
            container: 'mapcontainer',
            params: {
                center: [55.714225, 37.848540],
                zoom: 14,
                controls: ['zoomControl', 'fullscreenControl']
            },
            ballonMobileMode: false,
            autoscale: false,
            icons: {
                'default': '/img/common/mapmarker.png',
                'active': '/img/common/mapmarker-active.png',
            },
            points: []
        }

        this.init = function (onInitCallback) {

            if (!this.isInit) {

                this.isInit = !this.isInit
                var _this = this
                console.info('init Ymaps')

                ymaps.ready(function () {

                    // Создание экземпляра карты и его привязка к созданному контейнеру.
                    _this.map = new ymaps.Map('' + _this.mapsParams.container + '', _this.mapsParams.params, {
                        suppressMapOpenBlock: true,
                    });

                    // Создание макета балуна на основе Twitter Bootstrap.
                    _this.MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                        '<div class="sh-balloon"></div>'
                    );

                    // Создание вложенного макета содержимого балуна.
                    _this.MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div class="bln-scroll-offset" >$[properties.balloonContent]</div>'
                    );

                    _this.MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div class="pin-content" >$[properties.iconContent]</div>'
                    );

                    _this.map.behaviors.disable('scrollZoom')

                    onInitCallback(_this.isInit);
                })
            }


        }

        this.resizeContainer = function () {
            var _this = this;
            setTimeout(function () {
                _this.map.container.fitToViewport();
                //autoscale
                if (_this.mapsParams.autoscale) {
                    _this.autoScale()
                }
            }, 500)
        }

        this.autoScale = function () {
            var _this = this;
            _this.map.setBounds(_this.map.geoObjects.getBounds(), {
                checkZoomRange: true,
                zoomMargin: 100
            });
        }

        this.addPlacemark = function (arrayPoints) {


            var _this = this;
            var sizeIcons = [28, 28];
            var placemarkOffset = [-14, -26];
            var offsetIcons = [16, 15];
            this.mapsParams.points = arrayPoints;
            this.map.geoObjects.removeAll();

            // if (window.innerWidth < 769) {
            //     sizeIcons = [30, 45];
            //     offsetIcons = [8, 9];
            //     placemarkOffset = [-15, -45];
            // }

            try {

                var PlacemarkArr = [];

                for (let i = 0; i < _this.mapsParams.points.length; i++) {

                    // Создание метки  
                    PlacemarkArr[i] = new ymaps.Placemark(_this.mapsParams.points[i].coordinates.split(','), {
                        //balloonContentHeader: "Балун метки",
                        balloonContentBody: _this.mapsParams.points[i].ballon,
                        //balloonContentFooter: "Подвал",
                        //iconContent: '<span class="icons-marker" style="background-image: url(' + _this.mapsParams.points[i].markerImage + ')" ></span>',
                        hintContent: _this.mapsParams.points[i].hint,
                    }, {
                        balloonShadow: false,

                        // balloonPanelLayout: _this.MyBalloonLayout,
                        balloonPanelMaxMapArea: 200000,
                        // Не скрываем иконку при открытом балуне.
                        hideIconOnBalloonOpen: false,
                        // И дополнительно смещаем балун, для открытия над иконкой.
                        balloonOffset: [0, -55],


                        // balloonContentLayout: LayoutActivatePoint,
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: _this.mapsParams.icons.default,
                        iconImageSize: sizeIcons,
                        iconImageOffset: placemarkOffset,
                        pane: 'balloon',
                        iconContentOffset: offsetIcons,
                        iconContentLayout: _this.MyIconContentLayout,
                        draggable: false
                    });

                    PlacemarkArr[i].events.add('balloonopen', function (e) {

                        PlacemarkArr[i].properties.set('balloonContent', _this.mapsParams.points[i].balloonContent);
                        e.get('target').options.set({
                            iconImageHref: _this.mapsParams.icons.active,
                            iconImageSize: [56, 56],
                            iconImageOffset: [-28, -56],
                        });

                        // app.renderMapPopupClick(_this.mapsParams.points[i].code, false)

                    });

                    PlacemarkArr[i].events.add('balloonclose', function (e) {
                        e.get('target').options.set({
                            iconImageHref: _this.mapsParams.icons.default,
                            iconImageSize: sizeIcons,
                            iconImageOffset: placemarkOffset,
                        });

                        // app.closeMapPopup()
                    });

                    _this.map.geoObjects.add(PlacemarkArr[i]);

                } // endfor


            } catch (err) {
                console.error('error: YM addPlacemark ', err)
            }
        }

    }

    if (document.querySelectorAll('.contacts-map__left li').length) {

        const country = document.querySelectorAll('.contacts-map__left li')
        const allCountry = document.querySelectorAll('.contacts-map__left [data-coordinates]')


        country.forEach(function (item, index) {


            item.querySelector('a').addEventListener('click', e => {
                e.preventDefault()
                e.target.closest('li').classList.toggle('open')



            })
        })

        //baloon template

        function balloonTemplate(data) {
            return `
            <div class="balloon-template" >
                <div class="balloon-template__title" >${data.title}</div>
                <div class="balloon-template__phone" ><a href="tel:${data.phone}">${data.phone}</a></div>
                <div class="balloon-template__email" ><a href="mailto:${data.email}">${data.email}</a></div>
                <div class="balloon-template__link" >
                    <ul>
                        <li><a href="${data.site}" ><span class="ic-balloon-site" ></span></a></li>
                        <li><a href="${data.tg}" ><span class="ic-balloon-tg" ></span></a></li>
                    </ul>
                </div>
            </div>
            `
        }


        //load ymaps api

        window.loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU', function () {


            const YM = new YMaps();

            YM.mapsParams.params.center = [50.45548484049313, 14.722319145243398]

            YM.init(function () {

                let arrPoint = []

                allCountry.forEach(item => {
                    arrPoint.push({
                        coordinates: item.dataset.coordinates,
                        ballon: balloonTemplate({
                            title: item.innerText,
                            phone: item.dataset.phone,
                            email: item.dataset.email,
                            site: item.dataset.site,
                            tg: item.dataset.tg,
                        }),

                        hint: item.innerText
                    })
                })

                //click

                allCountry.forEach(item => {
                    item.addEventListener('click', function (e) {

                        YM.map.setCenter(item.dataset.coordinates.split(','), 12, {
                            checkZoomRange: true
                        });

                    })
                })


                YM.addPlacemark(arrPoint)
                YM.autoScale()
            })




        })

    }

    /* ===========================================
    swiper first-block
    =========================================== */

    if (document.querySelector('[data-swiper="first-block"]')) {
        const swiper = new Swiper('[data-swiper="first-block"]', {

            slidesPerView: 1,
            spaceBetween: 50,

            pagination: {
                el: '[data-swiper-dots="first-block"]',
                type: 'bullets',
            },

            autoplay: {
                delay: 4000
            },

            navigation: {
                nextEl: '[data-swiper-next="first-block"]',
                prevEl: '[data-swiper-prev="first-block"]',
            },

        })

    }

    /* =================================================
    spoiler for page about
    =================================================*/

    if (document.querySelectorAll('.about-directions__header').length) {
        document.querySelectorAll('.about-directions__header').forEach(item => {
            item.addEventListener('click', e => {
                e.target.closest('.about-directions__item').classList.toggle('open')
            })
        })
    }



});