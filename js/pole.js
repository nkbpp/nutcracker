let ROW = 4;
let COL = 12;

let arr;
let algCheck;

$(window).resize(function () {
  resizeCols();
});

function start() {
  arr = new Arr(ROW, COL);
  console.log(arr);
  drawPole(arr.poles);
  drawAlgorithm(arr.algorithm);
  algCheck = [];
  algCheck = arr.algorithm.slice();
}

class Arr {
  constructor(col, row) {
    let shab = this.#createShab();
    st: for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (shab[i][j] == 1) {
          this.startI = i;
          this.startJ = j;
          break st;
        }
      }
    }

    this.poles = new Array(col);
    for (let i = 0; i < this.poles.length; i++) {
      this.poles[i] = new Array(row);
    }

    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        this.poles[i][j] = this.#pole(shab, i, j);
      }
    }

    this.algorithm = [];
    let i = this.startI,
      j = this.startJ;
    let v = this.poles[i][j].vector;
    let kol = 0;

    // let k = 0;
    // while (k++ < 25) {
    while (shab[i][j] != 0) {
      if (this.poles[i][j].vector == '') {
        this.algorithm.push({ vector: v, kol });
      } else if (this.poles[i][j].vector == v) {
        kol++;
      } else {
        this.algorithm.push({ vector: v, kol });
        v = this.poles[i][j].vector;
        kol = 1;
      }

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
  }

  #createShab(params) {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16],
      [0, 0, 4, 5, 6, 7, 0, 0, 12, 0, 0, 17],
      [0, 0, 3, 0, 0, 8, 9, 10, 11, 0, 19, 18],
      [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
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
    let col = shab.length;
    let row = shab[0].length;
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
        j != row - 1 &&
        shab[i][j - 1] != 0 &&
        shab[i][j + 1] != 0
      ) {
        arr.subtype = 1; // horizont
      } else if (
        i != 0 &&
        i != col - 1 &&
        shab[i - 1][j] != 0 &&
        shab[i + 1][j] != 0
      ) {
        arr.subtype = 2; // vettical
      } else if (
        i != col - 1 &&
        j != row - 1 &&
        shab[i + 1][j] != 0 &&
        shab[i][j + 1] != 0
      ) {
        arr.subtype = 3; //
      } else if (
        i != 0 &&
        j != row - 1 &&
        shab[i - 1][j] != 0 &&
        shab[i][j + 1] != 0
      ) {
        arr.subtype = 4; //
      } else if (
        i != col - 1 &&
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
            str += `<div class="pole home" ><div class="pole hero" id="hero"></div></div>`;
          }
          break;
        case 'финиш':
          {
            str += `<div class="pole finish"></div>`;
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
    console.info(arAlgorithm[i]);

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


  $('#algorithm .row div:first-child').css(
    'margin-left',
    ($('#algorithm .row').width() - allAlgorithmItemWidth) / 4
  );
}

function resizeCols() {
  let colsWidth = $('#pole').find('.row:first-child div:first-child').width();
  $('#pole').find('.row>div').height(colsWidth);
}

start();
