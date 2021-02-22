let kolClick = 0;
$(document).ready(function () {
  $('body').on('click', 'input', function (e) {
    if ($(this).attr('id') == 'left') {
      if (algCheck[0].vector == $(this).attr('id')) {
      } else {
      }
      console.log($(this).attr('id'));
    }
    if ($(this).attr('id') == 'right') {
      if (algCheck[0].vector == $(this).attr('id')) {
        if (algCheck[0].kol == ++kolClick) {
          kolClick = 0;
          algCheck.shift();
          //подсветить
        }
      } else {
        //анимация неправелльного ввода
      }
      console.log(algCheck[0].vector);
      console.log($(this).attr('id'));
    }
    if ($(this).attr('id') == 'top') {
      if (algCheck[0].vector == $(this).attr('id')) {
      } else {
      }
      console.log($(this).attr('id'));
    }
    if ($(this).attr('id') == 'bottom') {
      if (algCheck[0].vector == $(this).attr('id')) {
      } else {
      }
      console.log($(this).attr('id'));
    }

    if ($(this).attr('id') == 'ok') {
      if (algCheck.length == 0) {
        console.log(algCheck.length);
      }
    }
  });
});

//!анимация
/* $( "#right" ).click(function() {
  $( ".block" ).animate({ "left": "+=50px" }, "slow" );
});
 
$( "#left" ).click(function(){
  $( ".block" ).animate({ "left": "-=50px" }, "slow" );
}); */
