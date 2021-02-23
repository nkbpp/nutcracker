function even(e) {
  console.info(this);
  if ($(this).attr('id') == 'ok') {
    if (algCheck.length == 0) {
      startAudio('soundFanfary');
      //if (true) {
      let speed = 400;
      let time = 0;
      arr.algorithm.forEach((al) => {
        let lr = al.vector == 'bottom' ? '+=' : '-=';
        let o = {
          [al.vector == 'bottom' ? 'top' : al.vector]:
            lr + $('#hero').width() * al.kol,
        };
        time += speed * al.kol;
        $('#hero').animate(o, speed * al.kol, function () {});
      });
      //замена картинок
      $('#hero').animate({ opacity: 0 }, 1000);
      setTimeout(() => $('.finish').animate({ opacity: 0 }, 1000), time);
      setTimeout(
        () => $('.finish').addClass('finish2').removeClass('finish'),
        time + 1000
      );
      setTimeout(
        () => $('.finish2').animate({ opacity: 1 }, 1000),
        time + 1000
      );
    }
  } else {
    if (algCheck[0].vector == $(this).attr('id')) {
      if (algCheck[0].kol == ++kolClick) {
        kolClick = 0;
        algCheck.shift();
        $(
          "[data-algorithmId='" +
            (arr.algorithm.length - algCheck.length - 1) +
            "']"
        ).removeClass('error');
        $(
          "[data-algorithmId='" +
            (arr.algorithm.length - algCheck.length - 1) +
            "']"
        ).addClass('success');

        startAudio('soundCorrect');
        //подсветить
      } else {
        //промежуточно верно
        startAudio('soundCorr');
      }
    } else {
      //анимация неправелльного ввода
      $(
        "[data-algorithmId='" + (arr.algorithm.length - algCheck.length) + "']"
      ).removeClass('success');
      $(
        "[data-algorithmId='" + (arr.algorithm.length - algCheck.length) + "']"
      ).addClass('error');

      startAudio('soundError');
    }
  }
}

let kolClick = 0;
$(document).ready(function () {
  $('body').on('click', 'a', even);
  $('body').on('click', 'input', function () {
    if ($(this).attr('id') == 'checkSound') {
      let audios = document.querySelectorAll('audio');
      if ($('#checkSound').is(':checked')) {
        console.log('is');
        audios.forEach((a) => {
          console.log(a.volume);
          a.volume = 1;
        });
      } else {
        console.log('not is');
        audios.forEach((a) => {
          console.log(a.volume);
          a.volume = 0;
        });
      }
    }
  });

  /*   $('body').on('click', 'input', function () {
    if ($('#checkSound').is(':checked')) {
      let audios = document.querySelectorAll('audio');
      audios.forEach((a) => {
        console.log(a.volume);
        a.volume = 0;
      });
      // Отметить checkbox
      //$('#checkSound').prop('checked', true);
    } else {
      let audios = document.querySelectorAll('audio');
      audios.forEach((a) => {
        a.volume = 1;
      });
      // Снять checkbox
      //$('#checkSound').prop('checked', false);
    }
  }); */

  $('body').swipe({
    swipe: function (
      event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
      let contextId = null;
      switch (direction) {
        case 'right':
          contextId = '#right';
          break;
        case 'down':
          contextId = '#bottom';
          break;
        case 'up':
          contextId = '#top';
          break;
        case 'left':
          contextId = '#left';
          break;
      }
      if (contextId != null && algCheck.length > 0) {
        let funcBind2 = even.bind($(contextId));
        funcBind2(event);
      }
    },
  });
});

$(document).keydown(function (e) {
  //console.log(e.which);
  let contextId = null;
  switch (e.which) {
    case 39:
      contextId = '#right';
      break;
    case 40:
      contextId = '#bottom';
      break;
    case 38:
      contextId = '#top';
      break;
    case 37:
      contextId = '#left';
      break;
    case 13:
      contextId = '#ok';
      break;
  }
  if (contextId != null && (algCheck.length > 0 || e.which == 13)) {
    let funcBind = even.bind($(contextId));
    funcBind(e);
  }
});

function startAudio(id) {
  //if ($('#checkSound').is(':checked')) {
  let audios = document.querySelectorAll('audio');
  audios.forEach((a) => {
    a.pause();
    a.currentTime = 0.0;
  });

  let audio = document.getElementById(id);
  audio.play();
  //}
}
