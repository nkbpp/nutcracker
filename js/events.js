let kolClick = 0;
$(document).ready(function () {
  $('body').on('click', 'a', function (e) {
    console.info(algCheck[0].vector == $(this).attr('id'));
    console.info(algCheck);
    if (algCheck[0].vector == $(this).attr('id')) {
      if (algCheck[0].kol == ++kolClick) {
        kolClick = 0;
        algCheck.shift();
        console.info($(this));
        console.log(arr.algorithm.length-algCheck.length-1)
        console.info($("[data-algorithmId='"+ (arr.algorithm.length-algCheck.length-1) +"']"));
        $("[data-algorithmId='"+ (arr.algorithm.length-algCheck.length-1) +"']").removeClass('error')
        $("[data-algorithmId='"+ (arr.algorithm.length-algCheck.length-1) +"']").addClass('success')
        //подсветить
      }
    } else {
      //анимация неправелльного ввода
      $("[data-algorithmId='"+ (arr.algorithm.length-algCheck.length) +"']").removeClass('success')
      $("[data-algorithmId='"+ (arr.algorithm.length-algCheck.length) +"']").addClass('error')
    }
    
    actionClick($(this).attr('id'), $(this).data('algorithmId'));
    // if ($(this).attr('id') == 'left') {
    //   if (algCheck[0].vector == $(this).attr('id')) {
    //   } else {
    //   }
    //   console.log($(this).attr('id'));
    // }
    // if ($(this).attr('id') == 'right') {
    //   if (algCheck[0].vector == $(this).attr('id')) {
    //     if (algCheck[0].kol == ++kolClick) {
    //       kolClick = 0;
    //       algCheck.shift();
    //       //подсветить
    //     }
    //   } else {
    //     //анимация неправелльного ввода
    //   }
    //   console.log(algCheck[0].vector);
    //   console.log($(this).attr('id'));
    // }
    // if ($(this).attr('id') == 'top') {
    //   if (algCheck[0].vector == $(this).attr('id')) {
    //   } else {
    //   }
    //   console.log($(this).attr('id'));
    // }
    // if ($(this).attr('id') == 'bottom') {
    //   if (algCheck[0].vector == $(this).attr('id')) {
    //   } else {
    //   }
    //   console.log($(this).attr('id'));
    // }
    //
    // if ($(this).attr('id') == 'ok') {
    //   if (algCheck.length == 0) {
    //     console.log(algCheck.length);
    //   }
    // }
  });
});

function actionClick() {
  
}

//!анимация
/* $( "#right" ).click(function() {
  $( ".block" ).animate({ "left": "+=50px" }, "slow" );
});
 
$( "#left" ).click(function(){
  $( ".block" ).animate({ "left": "-=50px" }, "slow" );
}); */
