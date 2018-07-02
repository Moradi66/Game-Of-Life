let grid = [];
const GRID_LENGTH = [];
let globalData = [];

function enterNumber () {
  // grid.splice(0, [grid.length])
  // grid.push ();
  var number = document.getElementById ('number').value;
  grid = [];
  globalData = [];
  GRID_LENGTH.splice (0, 1, number);
  maingame ();
  console.log (globalData);
}

function cells (raw, col) {
  let cell = document.getElementById (`${raw}-${col}`);
  if (cell === null) {
    return;
  }
  if (cell.style.backgroundColor === 'black') {
    return true;
  }
  return false;
}

//check cell if it's dead or live
function itSelf (raw, col) {
  return [cells (raw, col)];
}

//check cell neuboghrs if they are dead or live
function neuboghrs (raw, col) {
  return [
    cells (raw - 1, col - 1), //top left
    cells (raw - 1, col), //top center
    cells (raw - 1, col + 1), //top right
    cells (raw, col - 1), //middle left
    cells (raw, col + 1), //middle right
    cells (raw + 1, col - 1), //bottom left
    cells (raw + 1, col), //bottom center
    cells (raw + 1, col + 1), //bottom right
  ];
}
// creat grid
function gridCreation (len) {
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      let div = document.createElement ('div');
      div.id = `${i}-${j}`;
      div.className = 'cell';
      div.addEventListener ('click', () => clickMe (div));
      div.innerHTML = `${i}${j}`;
      grid.push (div);
    }
    grid.push (document.createElement ('br'));
  }
}

function clickMe (cell) {
  if (cell.style.backgroundColor == 'black') {
    cell.style.backgroundColor = 'white';
  } else {
    cell.style.backgroundColor = 'black';
  }
}

function maingame () {
  let root = document.getElementById ('cells');
  gridCreation (GRID_LENGTH);
  for (let i = 0; i < grid.length; i++) {
    root.appendChild (grid[i]);
  }
}

function gameLogic () {
  for (let i = 0; i < GRID_LENGTH; i++) {
    for (let j = 0; j < GRID_LENGTH; j++) {
      var currentCell = document.getElementById (`${i}-${j}`);
      var liveCells = neuboghrs (i, j).filter (index => index === true);
      var ownCells = itSelf (i, j);
      let liveCell = liveCells.length;
      let data = [liveCell, currentCell, ownCells[0]];
      globalData.push ({data});
    }
  }
  gameCheck ();
}
//Game Rules
function gameCheck () {
  globalData.map (data => {
    if (data.data[2] && data.data[0] < 2) {
      data.data[1].style.background = 'white';
    }
    if (data.data[2] && data.data[0] > 3) {
      data.data[1].style.background = 'white';
    }
    if (data.data[2] && data.data[0] === 2) {
      data.data[1].style.background = 'black';
    }
    if (data.data[2] && data.data[0] === 3) {
      data.data[1].style.background = 'black';
    }
    if (!data.data[2] && data.data[0] === 3) {
      data.data[1].style.background = 'black';
    }
  });
}
// script start
function senta () {
  gameLogic ();
}
