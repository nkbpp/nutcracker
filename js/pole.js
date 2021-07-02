let ROW = 10;
let COL = 12;

let arr;
let algCheck;

$(window).resize(function () {
  resizeCols();
});

function start() {
  arr = new Arr(ROW, COL);
  //console.log('arr=', arr);
  drawPole(arr.poles);
  drawAlgorithm(arr.algorithm);
  algCheck = [];
  algCheck = arr.algorithm.slice();
}

class Arr {
  constructor(row, col) {
    // let shab = this.#createShab(row, col);
    //console.log(this.#createShab(row, col))
    let shab = this.#createShab2(row, col); //!!!УДОЛИТЬ
    st: for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        //console.log('i ' + i);
        //console.log('j ' + j);
        //console.log(shab[i][j]);
        if (shab[i][j] == 1) {
          this.startI = i;
          this.startJ = j;
          break st;
        }
      }
    }

    this.poles = new Array(row);
    for (let i = 0; i < this.poles.length; i++) {
      this.poles[i] = new Array(col);
    }

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        this.poles[i][j] = this.#pole(shab, i, j);
      }
    }

    //add putin
    while (true) {
      let putinJ = Math.round(
        Math.random() *
          (this.poles[0].length - 1 - (this.poles[0].length - 2)) +
          (this.poles[0].length - 2)
      );
      let putinI = Math.round(Math.random() * (this.poles.length - 1));
      if (this.poles[putinI][putinJ].type == 'преграда') {
        this.poles[putinI][putinJ].subtype = 'путин';
        break;
      }
    }

    this.algorithm = [];
    let i = this.startI,
      j = this.startJ;
    let v = this.poles[i][j].vector;
    let kol = 0;

    while (true) {
      if (j == 11) {
      }
      if (v == this.poles[i][j].vector) {
        kol++;
      } else {
        this.algorithm.push({ vector: v, kol });
        v = this.poles[i][j].vector;
        kol = 1;
      }

      if (this.poles[i][j].vector == '') break;

      switch (v) {
        case 'right':
          {
            j++;
          }
          break;
        case 'top':
          {
            i--;
          }
          break;
        case 'bottom':
          {
            i++;
          }
          break;
        case 'left':
          {
            j--;
          }
          break;
      }
    }
    //console.log('algorithm', this.algorithm);
  }

  #randVstart(max, arr, i, j) {
    let r = null;
    w: while (true) {
      r = this.#getRandomArbitrary(1, max);
      switch (r) {
        //вверх
        case 1:
          {
            if (i != 0) {
              break w;
            }
          }
          break;
        //вниз
        case 3:
          {
            if (i != arr.length - 1) {
              break w;
            }
          }
          break;
        //прямо
        case 2:
          {
            if (arr[i][j - 1] == 0) {
              break w;
            }
          }
          break;
        default: {
          break w;
        }
      }
    }
    return r;
  }

  #stepRight(arr, i, j, l) {
    for (let index = 1; index <= l; index++) {
      arr[i][j + index] = arr[i][j] + index;
    }
    return arr;
  }

  #stepTop(arr, i, j, l) {
    for (let index = 1; index <= l; index++) {
      arr[i - index][j] = arr[i][j] + index;
    }
    return arr;
  }

  #stepBottom(arr, i, j, l) {
    for (let index = 1; index <= l; index++) {
      arr[i + index][j] = arr[i][j] + index;
    }
    return arr;
  }

  #stepLeft(arr, i, j, l) {
    for (let index = 1; index <= l; index++) {
      arr[i][j - index] = arr[i][j] + index;
    }
    return arr;
  }

  #canStepArrTop(arr, tekI, tekJ, STEP) {
    if (tekI - STEP >= 0) {
      //проверка верхней границы
      for (let i = tekI - 1; i >= tekI - STEP; i--) {
        if (
          arr[i][tekJ] != 0 ||
          (i - 1 >= 0 && arr[i - 1][tekJ] != 0) ||
          (tekJ + 1 < COL && arr[i][tekJ + 1] != 0) ||
          (tekJ - 1 >= 0 && arr[i][tekJ - 1] != 0)
        ) {
          //console.log('Вверх нельзя проверка 2');
          return false;
        }
      }
    } else {
      //console.log('Вверх нельзя проверка 1 граница');
      return false;
    }
    return true;
  }

  #canStepArrLeft(arr, tekI, tekJ, STEP) {
    if (tekJ - STEP >= 0) {
      //проверка левого края
      for (let j = tekJ - 1; j >= tekJ - STEP; j--) {
        if (
          arr[tekI][j] != 0 ||
          (j - 1 >= 0 && arr[tekI][j - 1] != 0) ||
          (tekI + 1 < ROW && arr[tekI + 1][j] != 0) ||
          (tekI - 1 >= 0 && arr[tekI - 1][j] != 0)
        ) {
          //console.log('В лево нельзя проверка 2');
          return false;
        }
      }
    } else {
      //console.log('В лево нельзя проверка 1 граница');
      return false;
    }
    return true;
  }

  #canStepArrBottom(arr, tekI, tekJ, STEP) {
    if (tekI + STEP <= ROW - 1) {
      //проверка нижней границы
      for (let i = tekI + 1; i <= tekI + STEP; i++) {
        if (
          arr[i][tekJ] != 0 ||
          (i + 1 <= ROW - 1 && arr[i + 1][tekJ] != 0) ||
          (tekJ + 1 < COL && arr[i][tekJ + 1] != 0) ||
          (tekJ - 1 >= 0 && arr[i][tekJ - 1] != 0)
        ) {
          //console.log('Вниз нельзя проверка 2');
          return false;
        }
      }
    } else {
      //console.log('Вниз нельзя проверка 1 граница');
      return false;
    }
    return true;
  }

  #canStepArrRight(arr, tekI, tekJ, STEP) {
    if (tekJ + STEP <= COL - 1) {
      //проверка правого края
      for (let j = tekJ + 1; j <= tekJ + STEP; j++) {
        if (
          arr[tekI][j] != 0 ||
          (j + 1 <= COL - 1 && arr[tekI][j + 1] != 0) ||
          (tekI + 1 < ROW && arr[tekI + 1][j] != 0) ||
          (tekI - 1 >= 0 && arr[tekI - 1][j] != 0)
        ) {
          //console.log('в право нельзя проверка 2');
          return false;
        }
      }
    } else {
      //console.log('в право нельзя проверка 1 граница');
      return false;
    }
    return true;
  }

  #generateArr(row, col, STEP) {
    arr = new Array(row);

    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(col);
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    } //делаем массив и зополняем 0ми

    let tekI = this.#getRandomArbitrary(0, arr.length - 1);
    let tekJ = this.#getRandomArbitrary(0, col - 1);

    //let tekI = 0; //!
    //let tekJ = 0; //!

    arr[tekI][tekJ] = 1; //стартовое поле
    //arr[1][3] = 1; //стартовое поле //!

    while (
      this.#canStepArrTop(arr, tekI, tekJ, STEP) ||
      this.#canStepArrBottom(arr, tekI, tekJ, STEP) ||
      this.#canStepArrLeft(arr, tekI, tekJ, STEP) ||
      this.#canStepArrRight(arr, tekI, tekJ, STEP)
    ) {
      let vector = 0;
      while (vector == 0) {
        vector = this.#getRandomArbitrary(1, 4);
        //console.log('vector = ', vector);
        switch (vector) {
          case 1:
            vector = this.#canStepArrTop(arr, tekI, tekJ, STEP) ? vector : 0;
            break;
          case 2:
            vector = this.#canStepArrBottom(arr, tekI, tekJ, STEP) ? vector : 0;
            break;
          case 3:
            vector = this.#canStepArrLeft(arr, tekI, tekJ, STEP) ? vector : 0;
            break;
          case 4:
            vector = this.#canStepArrRight(arr, tekI, tekJ, STEP) ? vector : 0;
            break;
          default:
            vector = 0;
            break;
        }
      }

      switch (vector) {
        case 1:
          {
            //console.log('vector = Top');
            this.#stepTop(arr, tekI, tekJ, STEP);
            tekI -= STEP;
          }
          break;
        case 2:
          {
            //console.log('vector = Bottom');
            this.#stepBottom(arr, tekI, tekJ, STEP);
            tekI += STEP;
          }
          break;
        case 3:
          {
            //console.log('vector = Left');
            this.#stepLeft(arr, tekI, tekJ, STEP);
            tekJ -= STEP;
          }
          break;
        case 4:
          {
            //console.log('vector = Right');
            this.#stepRight(arr, tekI, tekJ, STEP);
            tekJ += STEP;
          }
          break;
      }
    }
    return arr;
  }

  #arrProc(row, col, STEP) {
    let max = 0;
    let sum = 0;

    let pocolenie = 30;

    for (let i = 0; i < pocolenie; i++) {
      let maxArr = this.#maxValue(this.#generateArr(row, col, STEP));
      sum += maxArr;
      max = max < maxArr ? maxArr : max;
    }

    let srznach = sum / pocolenie;

    console.log(
      'srznach = ' + srznach + ' or ' + ((row * col) / 100) * srznach + '%'
    );
    console.log('max = ' + max + ' or ' + ((row * col) / 100) * max + '%');

    console.log(
      'itog proc = ',
      ((row * col) / 100) * srznach +
        (((row * col) / 100) * max - ((row * col) / 100) * srznach) / 3
    );

    return (
      ((row * col) / 100) * srznach +
      (((row * col) / 100) * max - ((row * col) / 100) * srznach) / 3
    );
  }

  #createShab2(row, col) {
    let arr;
    let STEP = 3;

    let procent = this.#arrProc(row, col, STEP);
    //let procent = STEP == 1 ? 34 : STEP == 2 ? 26 : 18;

    do {
      arr = this.#generateArr(row, col, STEP);
    } while (
      this.#maxValue(arr) <
      ((procent * 100) / (COL * ROW)) * ((COL * ROW) / 100)
    ); //процент заполнения поля первая цифра

    console.log('Сгенерированный массив'); //!!!
    console.log(arr); //!!!

    return arr;
    /*     return [
      [0, 0, 0, 0, 5, 6, 7, 0, 11, 12, 13, 14],
      [0, 1, 2, 3, 4, 0, 8, 9, 10, 0, 0, 15],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]; */
  }

  #createShab(row, col) {
    let arr = new Array(row);

    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(col);
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }

    let tekI = this.#getRandomArbitrary(0, arr.length - 1);
    let tekJ = 1;
    arr[tekI][tekJ] = 1; //стартовое поле

    while (tekJ < arr[0].length - 2) {
      let vector = this.#randVstart(3, arr, tekI, tekJ);
      switch (vector) {
        case 1:
          {
            let l = this.#getRandomArbitrary(1, arr.length + tekI - arr.length);
            this.#stepTop(arr, tekI, tekJ, l);
            tekI -= l;
          }
          break;
        case 3:
          {
            let l = this.#getRandomArbitrary(
              1,
              arr.length - 1 - (arr.length + tekI - arr.length)
            );
            this.#stepBottom(arr, tekI, tekJ, l);
            tekI += l;
          }
          break;
      }

      //идем вперед
      let l = this.#getRandomArbitrary(2, 3);
      if (l + tekJ >= arr[0].length) {
        //проверить чтобы не конец
        l = arr[0].length - 1 - tekJ;
      }
      this.#stepRight(arr, tekI, tekJ, l);
      tekJ += l;
    }

    //финалочка
    let vector = this.#randVstart(3, arr, tekI, tekJ);
    /*     console.log('arr', arr);
    console.log('vec=', vector);
    console.log('i j', tekI, tekJ); */

    switch (vector) {
      case 1:
        {
          let l = this.#getRandomArbitrary(1, arr.length + tekI - arr.length);
          this.#stepTop(arr, tekI, tekJ, l);
          tekI -= l;
        }
        break;
      case 3:
        {
          let l = this.#getRandomArbitrary(
            1,
            arr.length - 1 - (arr.length + tekI - arr.length)
          );
          this.#stepBottom(arr, tekI, tekJ, l);
          tekI += l;
        }
        break;
    }

    //предпоследняя строка
    if (tekJ == arr[0].length - 2) {
      let rl = this.#getRandomArbitrary(1, 3);
      if (rl != 1) {
        this.#stepRight(arr, tekI, tekJ, 1);
        tekJ += 1;
      }
    }

    //конец последняя строка
    if (tekJ == arr[0].length - 1) {
      let rl = this.#getRandomArbitrary(1, 3);
      if (rl != 1) {
        //с какой то вероятностью идем в лево
        let l = 0;
        if (
          arr[tekI][tekJ - 2] == 0 &&
          (tekI == 0 || (tekI - 1 >= 0 && arr[tekI - 1][tekJ - 1] == 0)) &&
          (tekI == arr.length - 1 ||
            (tekI + 1 <= arr.length - 1 && arr[tekI + 1][tekJ - 1] == 0))
        ) {
          l = 1;
          if (
            arr[tekI][tekJ - 3] == 0 &&
            (tekI == 0 || (tekI - 1 >= 0 && arr[tekI - 1][tekJ - 2] == 0)) &&
            (tekI == arr.length - 1 ||
              (tekI + 1 <= arr.length - 1 && arr[tekI + 1][tekJ - 2] == 0))
          ) {
            l = 2;
          }
        }
        this.#stepLeft(arr, tekI, tekJ, l);
      }
    }

    //console.log('Сгенерированный массив'); //!!!
    //console.log(arr); //!!!

    return arr;
    // return [
    //   [0, 0, 0, 0, 5, 6, 7, 0, 11, 12, 13, 14],
    //   [0, 1, 2, 3, 4, 0, 8, 9, 10, 0, 0, 15],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // ];
  }

  #maxValue(arr) {
    let max = Math.max.apply(Math, arr[0]);
    for (let i = 1; i < arr.length; i++) {
      max =
        max < Math.max.apply(Math, arr[i]) ? Math.max.apply(Math, arr[i]) : max;
    }
    return max;
  }

  #vector(arr, i, j) {
    if (j + 1 < arr[i].length && arr[i][j] + 1 == arr[i][j + 1]) {
      return 'right';
    }
    if (i - 1 >= 0 && arr[i][j] + 1 == arr[i - 1][j]) {
      return 'top';
    }
    if (i + 1 < arr.length && arr[i][j] + 1 == arr[i + 1][j]) {
      return 'bottom';
    }
    if (j - 1 >= 0 && arr[i][j] + 1 == arr[i][j - 1]) {
      return 'left';
    }
    return '';
  }

  #getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  #pole(shab, i, j) {
    let arr = {};
    let row = shab.length;
    let col = shab[0].length;
    arr.start = false;
    arr.finish = false;

    if (shab[i][j] == 0) {
      //Это преграда
      arr.type = 'преграда';
      switch (this.#getRandomArbitrary(1, 3)) {
        case 1:
          arr.subtype = 'преграда1';
          break;
        case 2:
          arr.subtype = 'преграда2';
          break;
        case 3:
          arr.subtype = 'преграда3';
          break;
      }

      shab.length;
    } else {
      // это тропа
      arr.type = 'тропа';
      arr.vector = this.#vector(shab, i, j);
      if (shab[i][j] == 1) {
        //это старт
        arr.type = 'старт';
        arr.subtype = 'старт';
        arr.start = true;
      } else if (shab[i][j] == this.#maxValue(shab)) {
        //это финиш
        arr.type = 'финиш';
        arr.subtype = 'финиш';
        arr.finish = true;
      } else if (
        j != 0 &&
        j != col - 1 &&
        shab[i][j - 1] != 0 &&
        shab[i][j + 1] != 0
      ) {
        arr.subtype = 1; // horizont
      } else if (
        i != 0 &&
        i != row - 1 &&
        shab[i - 1][j] != 0 &&
        shab[i + 1][j] != 0
      ) {
        arr.subtype = 2; // vettical
      } else if (
        i != row - 1 &&
        j != col - 1 &&
        shab[i + 1][j] != 0 &&
        shab[i][j + 1] != 0
      ) {
        arr.subtype = 3; //
      } else if (
        i != 0 &&
        j != col - 1 &&
        shab[i - 1][j] != 0 &&
        shab[i][j + 1] != 0
      ) {
        arr.subtype = 4; //
      } else if (
        i != row - 1 &&
        j != 0 &&
        shab[i][j - 1] != 0 &&
        shab[i + 1][j] != 0
      ) {
        arr.subtype = 5; //
      } else if (
        i != 0 &&
        j != 0 &&
        shab[i - 1][j] != 0 &&
        shab[i][j - 1] != 0
      ) {
        arr.subtype = 6; //
      }
    }
    return arr;
  }
}

function drawPole(arPoles) {
  let colRows = arPoles.length;
  let colCols = arPoles[0].length;
  let str = '';

  for (let i = 0; i < colRows; i++) {
    str += "<div class='row'>";
    for (let j = 0; j < colCols; j++) {
      str += `<div class="col-xs-${12 / colCols}">`;
      if (j == 0 && arPoles[i][j + 1].type == 'старт') {
        str += `<div class="pole home"></div>`;
      } else
        switch (arPoles[i][j].subtype) {
          case 'преграда1':
            {
              str += `<div class="pole stop1"></div>`;
            }
            break;
          case 'преграда2':
            {
              str += `<div class="pole stop2"></div>`;
            }
            break;
          case 'преграда3':
            {
              str += `<div class="pole stop3"></div>`;
            }
            break;
          case 'старт':
            {
              str += `<div class="pole start" ><div class="pole hero" id="hero"></div></div>`;
            }
            break;
          case 'финиш':
            {
              str += `<div class="pole finish"></div>`;
            }
            break;
          case 'путин':
            {
              str += `<div class="pole putin" id="putin"></div>`;
            }
            break;
          case 2:
            {
              str += `<div class="pole way way1"></div>`;
            }
            break;
          case 1:
            {
              str += `<div class="pole way"></div>`;
            }
            break;
          case 3:
            {
              str += `<div class="pole duga"></div>`;
            }
            break;
          case 4:
            {
              str += `<div class="pole duga duga4"></div>`;
            }
            break;
          case 5:
            {
              str += `<div class="pole duga duga5"></div>`;
            }
            break;
          case 6:
            {
              str += `<div class="pole duga duga6"></div>`;
            }
            break;
        }
      str += `</div>`;
    }
    str += '</div>';
  }

  $('#pole').html(str);
  resizeCols();
}

function drawAlgorithm(arAlgorithm) {
  let str = '';
  for (let i = 0; i < arAlgorithm.length; i++) {
    //console.info(arAlgorithm[i]);

    switch (arAlgorithm[i]['vector']) {
      case 'left':
        {
          str += `<div class="col-xs-1 algorithmItem" data-algorithmId="${i}">
                <i class="fa fa-arrow-left"></i> ${arAlgorithm[i].kol}
                </div>`;
        }
        break;
      case 'right':
        {
          str += `<div class="col-xs-1 algorithmItem" data-algorithmId="${i}">
                <i class="fa fa-arrow-right"></i> ${arAlgorithm[i].kol}
                </div>`;
        }
        break;
      case 'top':
        {
          str += `<div class="col-xs-1 algorithmItem" data-algorithmId="${i}">
                <i class="fa fa-arrow-up"></i> ${arAlgorithm[i].kol}
                </div>`;
        }
        break;
      case 'bottom':
        {
          str += `<div class="col-xs-1 algorithmItem" data-algorithmId="${i}">
                <i class="fa fa-arrow-down"></i> ${arAlgorithm[i].kol}
                </div>`;
        }
        break;
    }
  }
  $('#algorithm .row').html(str);

  let algorithmItemWidth = $('#algorithm .row>div').width();
  let allAlgorithmItemWidth = algorithmItemWidth * arAlgorithm.length;

  // $('#algorithm .row div:first-child').css(
  //   'margin-left',
  //   ($('#algorithm .row').width() - allAlgorithmItemWidth) / 4
  // );
  if ($('#algorithm .row div').length < 12) {
    $('#algorithm .row div:first-child').css(
      'margin-left',
      ($('#algorithm .row').width() - allAlgorithmItemWidth) / 2
    );
  } else if ($('#algorithm .row div').length > 12) {
    $('#algorithm .row div:nth-child(13)').css(
      'margin-left',
      ($('#algorithm .row').width() -
        algorithmItemWidth * ($('#algorithm .row div').length - 12)) /
        2
    );
  }
}

function resizeCols() {
  let colsWidth = $('#pole').find('.row:first-child div:first-child').width();
  $('#pole').find('.row>div').height(colsWidth);
}

start();
