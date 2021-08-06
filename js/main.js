"use strict";

$(function () {

    var swiper = new Swiper('.semple-swiper', {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerGroup: 1,
        // loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            575: {
                slidesPerView: 1
            },
            991: {
                slidesPerView: 2
            }
        }
    });

    $('.accept_form_btn').click(function() {
        $('.accept_form_chat').slideToggle(0);
    });

    $('.toggle_menu').click(function() {
        $(this).toggleClass('on');
        $('.nav_menu').slideToggle('active');
        return false;
    });

    $('.nav_menu li a').click(function(e){
        var isPhoneDevice = 'ontouchstart' in document.documentElement;
        if(isPhoneDevice){
            if($(this).siblings().length > 0) {
                e.preventDefault();
                $(this).siblings('ul').slideToggle();
                $(this).find('.plus-menu').toggleClass('activer');
            }
        }
    });


    // $('.nav_callback_btn').magnificPopup();
    // $('.footer_services-call').magnificPopup();
    // $('.header_order').magnificPopup();

    $('.footer_services-call, .header_order, .nav_callback_btn').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    $('.js-gallery, .cart__slider').each(function () {

        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }
        });
    });

    $('.js-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });


    $('.scroll').click(function () {
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top }, 800);
        return false;
    });


    var cartSlider = $('.cart__slider').lightSlider({
        gallery:true,
        item:1,
        loop:false,
        thumbItem:6,
        slideMargin:0,
        enableDrag: false,
        currentPagerPosition:'left'
    });
    $('.cart__gallery-prev').on('click', function (e) {
        e.preventDefault();
        cartSlider.goToPrevSlide();
    });
    $('.cart__gallery-next').on('click', function (e) {
        e.preventDefault();
        cartSlider.goToNextSlide();
    });
    if($('.lSGallery > li').length <= 6){
        $('.cart__gallery-next').hide();
        $('.cart__gallery-prev').hide();
    }


    $('.js-next').click(function (e) {
        e.preventDefault();
        $('.calc__item.active').removeClass('active').next().addClass('active');
    });
    $('.js-back').click(function (e) {
        e.preventDefault();
        $('.calc__item.active').removeClass('active').prev().addClass('active');
    });
    $('.js-first').click(function (e) {
        e.preventDefault();
        $('.calc__item').removeClass('active').eq(0).addClass('active');
    });

    $('.js-next-1').click(function (e) {
        e.preventDefault();
        var item_1 = $('[name=calc_1]').val(),
            item_2 = $('[name=calc_2]').val(),
            item_3 = $('[name=calc_3]').val();

        if(+item_1){
            if(+item_2){
                if(+item_3){
                    $('.calc__item.active').removeClass('active').next().addClass('active');
                }else{$('[name=calc_3]').focus();}
            }else{$('[name=calc_2]').focus();}
        } else{$('[name=calc_1]').focus();}
    });


    function checkNumber(item){
        return parseInt(item) > 0 ? parseInt(item) : 1;
    }

    calc();

    function calc() {
        var item_1 =  checkNumber($('[name=calc_1]').val()),
            item_2 =  checkNumber($('[name=calc_2]').val()),
            item_3 =  checkNumber($('[name=calc_3]').val()),
            item_4 =  checkNumber($('[name=calc_4]').val()),
            select_1 =  parseFloat($('[name=name_6]').val()),
            item_5 =  checkNumber($('[name=calc_5]').val()),
            check_5 =  $('[name=calc_5_check]').prop( "checked" ),
            item_6 =  checkNumber($('[name=calc_6]').val()),
            check_6 =  $('[name=calc_color]').prop( "checked" ),
            radio_1 =  parseFloat($('[name=radio_1]:checked').val()),
            color =  check_6 ? "Нет" : "Да",
            total = 0;

        var include1 = '<p>Кол-во сгибов: ' + item_5 +' шт</p>';
        if(check_5){
            include1 = '';
            item_5 = 0;
        }
        var include2 = '<p>Длина лазерного реза: ' + item_6 + ' мм</p>';
        if(check_6){
            include2 = '';
            item_6 = 0;
        }


        total = (item_1 * item_2 * item_3 * item_4 * select_1 * 0.000001)
            + (item_5 * 8.33)
            + (item_6 * 0.05)
            + (radio_1 * item_1 * item_2 * 0.000001);



        var resHtml = '' +
            '<div class="calc__row">' +
            '    <div class="calc__col-12">' +
            '        <div class="calc__title">Перечень работ</div>' +
            '    </div>' +
            '    <div class="calc__col-4">' +
            '        <p>Ширина детали: '+item_1+' мм</p>' +
            '        <p>Высота детали: '+item_2+' мм</p>' +
            '        <p>Глубина детали: '+item_3+' мм</p>' +
            '    </div>' +
            '    <div class="calc__col-4">' +
            include1 +
            '        <p>Кол-во изделий: '+item_4+'</p>' +
            '        <p>Порошковая покраска: '+ (  radio_1 ? "Да" : "Нет"  ) +'</p>' +
            '    </div>' +
            '    <div class="calc__col-4">' +
            '        <p>Материал: '+$("[name=name_6]").find('option:selected').text()+'</p>' +
            include2 +
            '        <p>Сварка: '+ color +'</p>' +
            // '        <p>Порошковая покраска: Да</p>' +
            // '        <p>Материал: Сталь</p>' +
            // '        <p>Кол-во сгибов: 2 шт</p>' +
            '    </div>' +
            '</div>' +
            '<div class="calc__res_col">' +
            '    <div class="calc__title">Примерная стоимость</div>' +
            '    <div class="calc__result">' + parseInt(total) + ' руб</div>' +
            '</div>';

        $('.calc__res').html(resHtml);
    }

    $('.calc__form input, .calc__form select').change(function () {
        calc();
    });

    // var options = {
    //     mobileFallbackImage: "http://www.hdwallpapers.in/walls/pink_cosmos_flowers-wide.jpg",
    //     playOnlyIfVisible  : false
    // };
    //
    // var myPlayer = jQuery('.header__iframe').YTPlayer(options);
    //


});