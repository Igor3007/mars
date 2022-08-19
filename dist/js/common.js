document.addEventListener("DOMContentLoaded", function (event) {

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






});