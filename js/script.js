let THEME = 'main';
let SUB_THEME = 'main';
let HERO = 'main';
let FACTOR = 1;

let themes_settings = {
    police: {
        name: 'полиция',
        cssClass: 'police',
        heroes: {
            hero1: {
                class: 'hero1',
            },
            hero2: {
                class: 'hero2',
            },
            hero3: {
                class: 'hero3',
            }
        },
    },
    hospital: {
        name: 'больница',
        cssClass: 'hospital',
        heroes: {
            hero1: {
                class: 'hero1',
            },
            hero2: {
                class: 'hero2',
            }
        },
    }
};


$(document).ready(function () {

    $('.btn-start').click(function (e) { //кнопка старт
        e.preventDefault();
        let str = "";

        Object.keys(themes_settings).forEach(theme => {
            console.log(themes_settings[theme].name)
            str += `<div class="item" id="${theme}">
                    <h2>${themes_settings[theme].name}</h2>
                </div>`;
        })

        $(".themes-carousel").html(str)

        var heroCarousel = $('.themes-carousel')

        carouselInit(heroCarousel);

    });


    $('.btn-theme').click(function (e) { //кнопка выбора темы
        e.preventDefault();
        let str = "";

        THEME = $(".themes-carousel .active").eq(1).find('.item').attr('id');

        Object.keys(themes_settings[THEME].heroes).forEach(hero => {
            let class_ = themes_settings[THEME].heroes[hero]['class'];
            str += `<div class="item ${class_}" id="${class_}">
                    <h2>${class_}</h2>
                </div>`;
        })

        $(".hero-carousel").html(str)

        var heroCarousel = $('.hero-carousel');
        carouselInit(heroCarousel);

    });

    $('.btn-hero').click(function (event) {
        HERO = $(".hero-carousel .active").eq(1).find('.item').attr('id')
    });

    $('.factor').click(function (e) {
        e.preventDefault();
        $('.factor').removeClass('active');
        $(this).addClass('active');
        FACTOR = $(this).data('factor');
        console.log(THEME + " " +
        SUB_THEME + " " +
        HERO + " " +
        FACTOR)
    });



    $('.btn-start').click();//убрать
    $('.btn-theme').click();//убрать
    $('.btn-hero').click();//убрать

    function generateThemes() {

    }

    function carouselInit(t) {
        t.owlCarousel('destroy');
        t.owlCarousel({
            margin: 10,
            loop: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        })
    }
});