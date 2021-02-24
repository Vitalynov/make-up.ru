/*Main block*/
$(function() {
    /*Анимация*/
    let windowHeigt = $(window).height();
    let windowScrollPosTop = $(window).scrollTop();
    let windowScrollPosBottom = windowHeigt + windowScrollPosTop;

    $.fn.revealOnScroll = function(direction) {
        return this.each(function() {
            let objectOffset = $(this).offset();
            let objectOffsetTop = objectOffset.top;

            if (!$(this).hasClass("hidden")) {
                if (direction == "right") {
                    $(this).css({
                        opacity: 0,
                        transform: "translateX(700px)",
                        transition: "2s",
                    });
                } else {
                    $(this).css({
                        opacity: 0,
                        transform: "translateX(-700px)",
                        transition: "2s",
                    });
                }
                $(this).addClass("hidden");
            }

            if (!$(this).hasClass("animationComplit")) {
                if (windowScrollPosBottom > objectOffsetTop) {
                    $(this)
                        .css({
                                opacity: 1,
                                transform: "translateX(0)",
                            },
                            2000
                        )
                        .addClass("animationComplit");
                }
            }
        });
    };

    $.fn.revealOnAppear = function() {
        return this.each(function() {
            let objectOffset = $(this).offset();
            let objectOffsetTop = objectOffset.top;
            if (!$(this).hasClass("hidden")) {
                $(this).css("opacity", 0).addClass("hidden");
            }

            if (!$(this).hasClass("animationComplit")) {
                if (windowScrollPosBottom > objectOffsetTop) {
                    $(this)
                        .animate({
                                opacity: 1,
                            },
                            2000
                        )
                        .addClass("animationComplit");
                }
            }
        });
    };

    $(window).scroll(function() {
        windowHeigt = $(window).height();
        windowScrollPosTop = $(window).scrollTop();
        windowScrollPosBottom = windowHeigt + windowScrollPosTop;

        /*Анимация Scroll всех разделов заголовков h3*/
        $(".aboutMe h3").revealOnScroll("right");
        $(".servises h3").revealOnScroll("left");
        $(".gallery h3").revealOnScroll("right");
        $(".reviews h3").revealOnScroll("left");
        $(".contacts h3").revealOnScroll("right");

        /*Анимация ФУТЕР движение с права и с лева*/
        $(".mail, .social-Networks-Footer").revealOnScroll("right");
        $(".description-footer>p, .phone").revealOnScroll("left");

        /*Анимация Appear раздела О себе*/
        $(".aboutMe-img").revealOnAppear();
        $(".description").revealOnAppear();
        $(".social-Networks").revealOnAppear();

        /*Анимация Appear раздела Услуги*/
        $(".servises-items").revealOnAppear();

        /*Анимация Appear раздела Галерея*/
        $(".wrapper-Tabs").revealOnAppear();

        /*Анимация Appear раздела Отзывы*/
        $(".slider").revealOnAppear();
        $("h4").revealOnAppear();
        $(".brands").revealOnAppear();

        /*Анимация Appear раздела Контакты*/
        $(".vrapper-Form").revealOnAppear();
    });

    /*Управление табами*/
    $(".tab_item").not(":first").hide();
    $(".wrapper-Tabs .tab")
        .click(function() {
            $(".wrapper-Tabs .tab")
                .removeClass("active")
                .eq($(this).index())
                .addClass("active");
            $(".tab_item").slideUp(500).eq($(this).index()).slideDown(500);
        })
        .eq(0)
        .addClass("active");

    /*Код Убирает обязательные поля в Форме Запроса данных*/
    $('input[type=submit]').click(function() {
            $('input[name=email]').removeAttr('required'); //В поле запроса E-mail
            $('textarea[name=text]').removeAttr('required'); //В поле текст
        })
        //Отправка данных на почту с Формы запроса.
    $('#form').submit(function(event) {
        event.preventDefault();
        $.ajax({
                type: $(this).attr('method'),
                url: $(this).attr('action'),
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function(result) {
                    $('#jsThankYou').fadeIn(); //Вызов Popup: Спасибо за заявку!
                    $(this).find('input').val('');
                    $('#form').trigger('reset'); //Перезагрузка всех окон в форме
                }
            })
            // Закрыть попап «спасибо» за отправку данных с Формы
        $('#jsCloseThankYou').click(function() { // по клику на крестик
            $('input[name=email]').attr('required', ''); //В поле запроса E-mail
            $('textarea[name=text]').attr('required', ''); //В поле текст
            $('#jsThankYou').fadeOut();
        });
    })









});

/*Управление Модальные окна УСЛУГИ*/
function popupServises(btnSer, popupSer, clouseSer) {
    btnSer.onclick = () => {
        popupSer.style.display = "block";
        document.body.style.overflow = 'hidden';
    };
    clouseSer.onclick = () => {
        popupSer.style.display = "none";
        document.body.style.overflow = ''
    };
    popupSer.addEventListener('click', (e) => {
        if (e.target === popupSer) {
            popupSer.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
};





/*Управление Модальные окна ГАЛЕРЕЯ */
function popup(myModal, foto, clouse) {
    foto.onclick = function() {
        myModal.style.display = "block";
        document.body.style.overflow = 'hidden';
    };

    clouse.onclick = function() {
        myModal.style.display = "none";
        document.body.style.overflow = ''
    };

    myModal.addEventListener('click', (e) => {
        if (e.target === myModal) {
            myModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

/*Слайдер отзывов*/
var slider = (function(config) {
    const ClassName = {
        INDICATOR_ACTIVE: "slider__indicator_active",
        ITEM: "slider__item",
        ITEM_LEFT: "slider__item_left",
        ITEM_RIGHT: "slider__item_right",
        ITEM_PREV: "slider__item_prev",
        ITEM_NEXT: "slider__item_next",
        ITEM_ACTIVE: "slider__item_active",
    };

    var _isSliding = false, // индикация процесса смены слайда
        _interval = 0, // числовой идентификатор таймера
        _transitionDuration = 700, // длительность перехода
        _slider = {}, // DOM элемент слайдера
        _items = {}, // .slider-item (массив слайдов)
        _sliderIndicators = {}, // [data-slide-to] (индикаторы)
        _config = {
            selector: "", // селектор слайдера
            isCycling: true, // автоматическая смена слайдов
            direction: "next", // направление смены слайдов
            interval: 3000, // интервал между автоматической сменой слайдов
            pause: true, // устанавливать ли паузу при поднесении курсора к слайдеру
        };

    var // функция для получения порядкового индекса элемента
        _getItemIndex = function(_currentItem) {
            var result;
            _items.forEach(function(item, index) {
                if (item === _currentItem) {
                    result = index;
                }
            });
            return result;
        },
        // функция для подсветки активного индикатора
        _setActiveIndicator = function(_activeIndex, _targetIndex) {
            if (_sliderIndicators.length !== _items.length) {
                return;
            }
            _sliderIndicators[_activeIndex].classList.remove(
                ClassName.INDICATOR_ACTIVE
            );
            _sliderIndicators[_targetIndex].classList.add(ClassName.INDICATOR_ACTIVE);
        },
        // функция для смены слайда
        _slide = function(direction, activeItemIndex, targetItemIndex) {
            var directionalClassName = ClassName.ITEM_RIGHT,
                orderClassName = ClassName.ITEM_PREV,
                activeItem = _items[activeItemIndex], // текущий элемент
                targetItem = _items[targetItemIndex]; // следующий элемент

            var _slideEndTransition = function() {
                activeItem.classList.remove(ClassName.ITEM_ACTIVE);
                activeItem.classList.remove(directionalClassName);
                targetItem.classList.remove(orderClassName);
                targetItem.classList.remove(directionalClassName);
                targetItem.classList.add(ClassName.ITEM_ACTIVE);
                window.setTimeout(function() {
                    if (_config.isCycling) {
                        clearInterval(_interval);
                        _cycle();
                    }
                    _isSliding = false;
                    activeItem.removeEventListener("transitionend", _slideEndTransition);
                }, _transitionDuration);
            };

            if (_isSliding) {
                return; // завершаем выполнение функции если идёт процесс смены слайда
            }
            _isSliding = true; // устанавливаем переменной значение true (идёт процесс смены слайда)

            if (direction === "next") {
                // устанавливаем значение классов в зависимости от направления
                directionalClassName = ClassName.ITEM_LEFT;
                orderClassName = ClassName.ITEM_NEXT;
            }

            targetItem.classList.add(orderClassName); // устанавливаем положение элемента перед трансформацией
            _setActiveIndicator(activeItemIndex, targetItemIndex); // устанавливаем активный индикатор

            window.setTimeout(function() {
                // запускаем трансформацию
                targetItem.classList.add(directionalClassName);
                activeItem.classList.add(directionalClassName);
                activeItem.addEventListener("transitionend", _slideEndTransition);
            }, 0);
        },
        // функция для перехода к предыдущему или следующему слайду
        _slideTo = function(direction) {
            var activeItem = _slider.querySelector("." + ClassName.ITEM_ACTIVE), // текущий элемент
                activeItemIndex = _getItemIndex(activeItem), // индекс текущего элемента
                lastItemIndex = _items.length - 1, // индекс последнего элемента
                targetItemIndex =
                activeItemIndex === 0 ? lastItemIndex : activeItemIndex - 1;
            if (direction === "next") {
                // определяем индекс следующего слайда в зависимости от направления
                targetItemIndex =
                    activeItemIndex == lastItemIndex ? 0 : activeItemIndex + 1;
            }
            _slide(direction, activeItemIndex, targetItemIndex);
        },
        // функция для запуска автоматической смены слайдов в указанном направлении
        _cycle = function() {
            if (_config.isCycling) {
                _interval = window.setInterval(function() {
                    _slideTo(_config.direction);
                }, _config.interval);
            }
        },
        // обработка события click
        _actionClick = function(e) {
            var activeItem = _slider.querySelector("." + ClassName.ITEM_ACTIVE), // текущий элемент
                activeItemIndex = _getItemIndex(activeItem), // индекс текущего элемента
                targetItemIndex = e.target.getAttribute("data-slide-to");

            if (!(
                    e.target.hasAttribute("data-slide-to") ||
                    e.target.classList.contains("slider__control")
                )) {
                return; // завершаем если клик пришёлся на не соответствующие элементы
            }
            if (e.target.hasAttribute("data-slide-to")) {
                // осуществляем переход на указанный сдайд
                if (activeItemIndex === targetItemIndex) {
                    return;
                }
                _slide(
                    targetItemIndex > activeItemIndex ? "next" : "prev",
                    activeItemIndex,
                    targetItemIndex
                );
            } else {
                e.preventDefault();
                _slideTo(
                    e.target.classList.contains("slider__control_next") ? "next" : "prev"
                );
            }
        },
        // установка обработчиков событий
        _setupListeners = function() {
            // добавление к слайдеру обработчика события click
            _slider.addEventListener("click", _actionClick);
            // остановка автоматической смены слайдов (при нахождении курсора над слайдером)
            if (_config.pause && _config.isCycling) {
                _slider.addEventListener("mouseenter", function(e) {
                    clearInterval(_interval);
                });
                _slider.addEventListener("mouseleave", function(e) {
                    clearInterval(_interval);
                    _cycle();
                });
            }
        };

    // init (инициализация слайдера)
    for (var key in config) {
        if (key in _config) {
            _config[key] = config[key];
        }
    }
    _slider =
        typeof _config.selector === "string" ?
        document.querySelector(_config.selector) :
        _config.selector;
    _items = _slider.querySelectorAll("." + ClassName.ITEM);
    _sliderIndicators = _slider.querySelectorAll("[data-slide-to]");
    // запуск функции cycle
    _cycle();
    _setupListeners();

    return {
        next: function() {
            // метод next
            _slideTo("next");
        },
        prev: function() {
            // метод prev
            _slideTo("prev");
        },
        stop: function() {
            // метод stop
            clearInterval(_interval);
        },
        cycle: function() {
            // метод cycle
            clearInterval(_interval);
            _cycle();
        },
    };
})({
    selector: ".slider",
    isCycling: true,
    direction: "next",
    interval: 3000,
    pause: false,
});