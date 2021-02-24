/*Header jQuery*/
$(function() {

    /*Анимация скроулинга*/
    $(".header_menu a").mPageScroll2id({
        offset: 0,
        scrollSpeed: 700
    });
    /*Анимация панели навигации и бургера*/
    $(window).on('scroll', function() {
        if ($(this).scrollTop()) {
            $('.header_body').addClass('block');
        } else {
            $('.header_body').removeClass('block');
        }
    });
    $('.header_burger').on('click', function(event) {
        $('.header_burger,.header_menu').toggleClass('active');
        $('body').toggleClass('lock');
    });

});

//Вызов формы (Popup) запроса обратного звонка на JS

const popupSign = () => {

    let btnSignUp = document.querySelector('.btn-SignUp'),
        modalJSmyForm = document.querySelector('#JS_myForm'),
        clouseForm = document.querySelector('#JS_clouseForm'),
        paddScr = window.innerWidth - document.querySelector('header').offsetWidth + 'px';
 

    btnSignUp.addEventListener('click', () => {
        document.body.style.paddingRight = paddScr;
        modalJSmyForm.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    clouseForm.addEventListener('click', () => {
        document.body.style.paddingRight = '0px';
        modalJSmyForm.style.display = 'none';
        document.body.style.overflow = '';
    });

    modalJSmyForm.addEventListener('click', (e) => {
        if (e.target === modalJSmyForm) {
            document.body.style.paddingRight = '0px';
            modalJSmyForm.style.display = 'none';
            document.body.style.overflow = '';
        };

    });

};