let ROW = 4;
let COL = 12;

let arr;
let algCheck;

$(window).resize(function () {
  resizeCols();
});

function start() {
  arr = new Arr(ROW, COL);
  console.log('arr=', arr);
  console.log(arr.poles);
  drawPole(arr.poles);
  drawAlgorithm(arr.algorithm);
  algCheck = [];
  algCheck = arr.algorithm.slice();
}

class Arr {
  constructor(row, col) {
    let shab = this.#createShab(row, col);
    st: for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
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

    // let k = 0;
    // while (k++ < 25) {
    console.log(shab);
    console.log(this.poles);
    while (shab[i][j] != 0 && j < 12) {
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

    //console.log(tekI, tekJ);

    while (tekJ < arr[0].length - 2) {
      let vector = this.#randVstart(3, arr, tekI, tekJ);
      //console.log('v=' + vector);
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
    /*     let vector = 1; //this.#randVstart(3, arr, tekI, tekJ);
    console.log(arr);
    console.log('vec=', vector);
    console.log('i j', tekI, tekJ);
    //конец
    if (tekJ == arr[0].length - 1) {
      switch (vector) {
        case 1:
          {
            let l = this.#getRandomArbitrary(1, arr.length + tekI - arr.length);
            console.log(tekI, tekJ, l);
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
    } */

    return arr;
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
