let kolClick = 0;
$(document).ready(function () {
    $('body').on('click', 'a', function (e) {

        if ($(this).attr('id') == 'ok') {
            if (algCheck.length == 0) {
                arr.algorithm.forEach((al) => {

                        let lr = al.vector == 'bottom' ? "+=" : "-="
                        let o = {[al.vector == 'bottom' ? "top" : al.vector]: lr + $('#hero').width() * al.kol,}
                        console.log(o)
                        $('#hero').animate(
                            o
                            , 700 * al.kol, function () {
                            });
                    }
                )
            }
        } else {
            console.info(algCheck[0].vector == $(this).attr('id'));
            console.info(algCheck);
            if (algCheck[0].vector == $(this).attr('id')) {
                if (algCheck[0].kol == ++kolClick) {
                    kolClick = 0;
                    algCheck.shift();
                    console.info($(this));
                    console.log(arr.algorithm.length - algCheck.length - 1)
                    console.info($("[data-algorithmId='" + (arr.algorithm.length - algCheck.length - 1) + "']"));
                    $("[data-algorithmId='" + (arr.algorithm.length - algCheck.length - 1) + "']").removeClass('error')
                    $("[data-algorithmId='" + (arr.algorithm.length - algCheck.length - 1) + "']").addClass('success')
                    //подсветить
                }
            } else {
                //анимация неправелльного ввода
                $("[data-algorithmId='" + (arr.algorithm.length - algCheck.length) + "']").removeClass('success')
                $("[data-algorithmId='" + (arr.algorithm.length - algCheck.length) + "']").addClass('error')
            }
        }
    });
});
