let THEME = 'autumn';
let SUB_THEME = 'main';
let HERO = 'hero1';
let FACTOR = 3;
let SHOW_ROAD = true;

let themes_settings = {
/*    hospital: {
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
    },*/
    kindergarten: {
        name: 'Детский сад',
        cssClass: 'kindergarten',
        target: {},
        heroes: {
            hero1: {
                class: 'kapelka',
                name: 'Капелька',
                audioid: 'audioChooseHeroKapelka',
            },
            hero2: {
                class: 'ogonek',
                name: 'Огонек',
                audioid: 'audioChooseHeroOgonek',
            },
            hero3: {
                class: 'veterok',
                name: 'Ветерок',
                audioid: 'audioChooseHeroVeterok',
            },
            hero4: {
                class: 'ross',
                name: 'Росс',
                audioid: 'audioChooseHeroRoss',
            }
        },
        barriers: {
            1: {
                class: 'stop1',
                name: 'преграда1',
            },
            /*1: {
                class: 'stop1',
                name: 'преграда1',
            },
            2: {
                class: 'stop2',
                name: 'преграда2',
            },
            3: {
                class: 'stop3',
                name: 'преграда3',
            },*/
        },
        road_heroes: {
            1: {
                class: 'povar',
            },
            2: {
                class: 'vrach',
            },
            3: {
                class: 'nyanya',
            },
        },
        field_heroes: {
            1: {
                class: 'balerina',
            },
            2: {
                class: 'politseyskiy',
            },
            3: {
                class: 'pozharnyy',
            },
        },

    },
    autumn: {
        name: 'Осень',
        cssClass: 'autumn',
        target: {},
        heroes: {
            hero1: {
                class: 'kapelka',
                name: 'Капелька',
                audioid: 'audioChooseHeroKapelka',
            },
            hero2: {
                class: 'ogonek',
                name: 'Огонек',
                audioid: 'audioChooseHeroOgonek',
            },
            hero3: {
                class: 'veterok',
                name: 'Ветерок',
                audioid: 'audioChooseHeroVeterok',
            },
            hero4: {
                class: 'ross',
                name: 'Росс',
                audioid: 'audioChooseHeroRoss',
            }
        },
        barriers: {
            1: {
                class: 'stop1',
                name: 'преграда1',
            },
            /*1: {
                class: 'stop1',
                name: 'преграда1',
            },
            2: {
                class: 'stop2',
                name: 'преграда2',
            },
            3: {
                class: 'stop3',
                name: 'преграда3',
            },*/
        },
        road_heroes: {
            1: {
                class: 'tucha',
            },
            2: {
                class: 'listya',
            },
            3: {
                class: 'zont',
            },
            4: {
                class: 'ptici',
            },
        },
        field_heroes: {
            1: {
                class: 'derevo',
            },
            2: {
                class: 'dereviya',
            },
            3: {
                class: 'cveti',
            },
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
        generateThemes();
        // var heroCarousel = $('.themes-carousel')
        // carouselInit(heroCarousel);
        startAudio('audioBtnStart');
        scroll($(this))
    });


    $('.btn-theme').click(function (e) { //кнопка выбора темы
        e.preventDefault();
        let str = "";

        // THEME = $(".themes-carousel .active").eq(1).find('.item').attr('id');

        // Object.keys(themes_settings[THEME].heroes).forEach(hero => {
        //     let class_ = themes_settings[THEME].heroes[hero]['class'];
        //     str += `<div class="item ${class_}" id="${class_}">
        //             <h2>${class_}</h2>
        //         </div>`;
        // })
        //
        // $(".hero-carousel").html(str)

        generateViewHeroes();

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
        startAudioFactor(FACTOR)
        console.log(THEME + " " +
            SUB_THEME + " " +
            HERO + " " +
            FACTOR)
    });

    $('.btn-factor').click(function () {
        console.info('THEME' , THEME , "HERO" , HERO);
        $('#pole').addClass(THEME);
        $('#pole').addClass(HERO);
        scroll($(this));
        start();
    });

    $('.btn-explain-factor').click(function () {
        startAudioFactor(FACTOR);
    });

    $('.btn-explain-rules').click(function () {
        startAudioTheme();
    });

    /*Выбор темы*/
    $('#themes-list').on('click', '.item-inner', function () {
        $('#themes-list .item-inner').removeClass('active');
        $(this).addClass('active');
        THEME = $(this).closest('.item').data('theme');
        console.info('theme ', THEME);
    });

    /*Выбор героя*/
    $('#heroes-list').on('click', '.item-inner', function () {
        $('#heroes-list .item-inner').removeClass('active');
        $(this).addClass('active');
        HERO = $(this).closest('.item').data('hero');
        startAudioByElement($(this).closest('.item'))
    });

    function generateThemes() {
        let str = "";
        let q = true;
        Object.keys(themes_settings).forEach(theme => {
            console.info('theme' , theme);
            let class_ = themes_settings[theme]['cssClass'];
            let name_ = themes_settings[theme]['name'];
            str += `<div class="item col-md-3 hero ${class_}" id="${class_}" data-theme="${theme}">
                        <h2>${name_}</h2>
                   <div class="item-inner ${q ? ' active' : ''}">
                        <h2></h2>
                   </div>
                </div>`;
            q = false;
        })
        $("#window-theme .themes-carousel").html(str);
        $("#window-theme").addClass(THEME);
    }

    function generateViewHeroes(){
        let str = "";
        let q = true;
        Object.keys(themes_settings[THEME].heroes).forEach(hero => {
            console.info('hero' , hero);
            let class_ = themes_settings[THEME].heroes[hero]['class'];
            let name_ = themes_settings[THEME].heroes[hero]['name'];
            let audioId_ = themes_settings[THEME].heroes[hero]['audioid'];
            str += `<div class="item col-md-3 hero ${class_}" id="${class_}" data-hero="${hero}" data-audioid="${audioId_}">
                        <h2>${name_}</h2>
                   <div class="item-inner ${q ? ' active' : ''}">
                        <h2></h2>
                   </div>
                </div>`;
            q = false;
        })
        $("#hero-window .themes-carousel").html(str);
        $("#hero-window").addClass(THEME);

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
        console.info(el);
        console.info(el.attr("href"));
        $("html, body").animate({
            scrollTop: $(el.attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    }


    function startAudioByElement(element){
        console.info(element);
        console.info(element.data('audioid'));
        startAudio(element.data('audioid'))
    }

    function startAudioFactor(){
        startAudio('audioChooseFactor' + FACTOR)
    }
    function startAudioTheme(){
        console.info('audioChooseTheme_' + THEME);
        startAudio('audioChooseTheme_' + THEME)
    }

});