let THEME = 'kindergarten';
let SUB_THEME = 'main';
let HERO = 'hero1';
let FACTOR = 1;

let themes_settings = {
    // police: {
    //     name: 'Полиция',
    //     cssClass: 'police',
    //     heroes: {
    //         hero1: {
    //             class: 'hero1',
    //         },
    //         hero2: {
    //             class: 'hero2',
    //         },
    //         hero3: {
    //             class: 'hero3',
    //         }
    //     },
    // },
    hospital: {
        name: 'Больница',
        cssClass: 'hospital',
        heroes: {
            hero1: {
                class: 'hero1',
            },
            hero2: {
                class: 'hero2',
            }
        },
    },
    kindergarten: {
        name: 'Детский сад',
        cssClass: 'kindergarten',
        target: {},
        heroes: {
            hero1: {
                class: 'kapelka',
                name: 'Капелька',
            },
            hero2: {
                class: 'ogonek',
                name: 'Огонек',
            },
            hero3: {
                class: 'veterok',
                name: 'Ветерок',
            },
            hero4: {
                class: 'ross',
                name: 'Росс',
            }
        },
    }
};


$(document).ready(function () {

    $('.btn-start').click(function (e) { //кнопка старт
        e.preventDefault();
        let str = "";

        // Object.keys(themes_settings[THEME].heroes).forEach(theme => {
        //     console.log(themes_settings[theme].name)
        //     // str += `<div class="item" id="${theme}">
        //     //         <h2>${themes_settings[theme].name}</h2>
        //     //     </div>`;
        //     str += `<div class="item col-md-3" data-hero = "${theme}">
        //             <div class="item-inner">
        //                 <h2>${themes_settings[theme].name}</h2>
        //             </div>
        //         </div>`;
        // })

        Object.keys(themes_settings[THEME].heroes).forEach(hero => {
            let class_ = themes_settings[THEME].heroes[hero]['class'];
            let name_ = themes_settings[THEME].heroes[hero]['name'];
            str += `<div class="item col-md-3 hero ${class_}" id="${class_}" data-hero="${hero}">
                        <h2>${name_}</h2>
                   <div class="item-inner">
                        <h2></h2>
                   </div>
                </div>`;
        })
        $("#hero-window .themes-carousel").html(str);
        $("#hero-window").addClass(THEME);

        // var heroCarousel = $('.themes-carousel')
        // carouselInit(heroCarousel);
        scroll($(this))
    });


    $('.btn-theme').click(function (e) { //кнопка выбора темы
        e.preventDefault();
        let str = "";

        // THEME = $(".themes-carousel .active").eq(1).find('.item').attr('id');

        Object.keys(themes_settings[THEME].heroes).forEach(hero => {
            let class_ = themes_settings[THEME].heroes[hero]['class'];
            str += `<div class="item ${class_}" id="${class_}">
                    <h2>${class_}</h2>
                </div>`;
        })

        $(".hero-carousel").html(str)

        // var heroCarousel = $('.hero-carousel');
        // carouselInit(heroCarousel);
        scroll($(this))

    });

    $('.btn-hero').click(function (event) {
        // HERO = $(".hero-carousel .active").eq(1).find('.item').attr('id')
        scroll($(this))
        // $('#video video').trigger('play');
        // document.getElementById('video1').play();

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

    $('.btn-factor').click(function () {
        $('#pole').addClass(THEME);
        $('#pole').addClass(HERO);
        scroll($(this));
    });

    /*Выбор темы*/
    $('#themes-list').on('click', '.item-inner', function () {
        $('#themes-list .item-inner').removeClass('active');
        $(this).addClass('active');
        THEME = $(this).closest('.item').data('theme');
    });

    /*Выбор героя*/
    $('#heroes-list').on('click', '.item-inner', function () {
        $('#heroes-list .item-inner').removeClass('active');
        $(this).addClass('active');
        HERO = $(this).closest('.item').data('hero');
    });

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

    function scroll(el) {
        $("html, body").animate({
            scrollTop: $(el.attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    }

});