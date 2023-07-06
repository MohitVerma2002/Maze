let level1 = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 0, 1, 0],
  [1, 0, 1, 1],
];

let level2 = [
  [1, 0, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 1],
  [0, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 0, 1],
  [0, 1, 0, 1, 0, 1],
];

let level3 = [
  [1, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 0, 1, 0, 1, 1, 1],
  [1, 1, 0, 1, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 1, 1, 0, 1, 0, 1],
];

let level4 = [
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  [0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
];

let mazeArray = level1;
let levelSelect = document.getElementById("levelSelect");
let maze = document.getElementById("mazeContainer");
let house = document.getElementById("house");
let person = document.getElementById("person");

levelSelect.addEventListener("change", function () {
  let level = levelSelect.value;
  if (level == 1) {
    mazeArray = level1;
  }
  if (level == 2) {
    mazeArray = level2;
  }
  if (level == 3) {
    mazeArray = level3;
  }
  if (level == 4) {
    mazeArray = level4;
  }
  maze.innerHTML = `<img src="house.png" id="house" alt="house" style=" width: 50px; height: 50px;">
    <img src="person.png" id="person" alt="person" style="    width: 50px; height: 50px;">`;
  createMaze();
});

function setPersonPosition(x, y) {
  person.style.top = x + "px";
  person.style.left = y + "px";
}
function setHousePosition(x, y) {
  house.style.bottom = x + "px";
  house.style.right = y + "px";
}

function createMaze() {
  for (let i = 0; i < mazeArray.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < mazeArray[i].length; j++) {
      let column = document.createElement("div");
      column.classList.add("column");

      if (mazeArray[i][j] == 0) {
        column.classList.add("wall");
      }
      if (i == 0 && j == 0) {
        mazeArray[i][j] = 2;
      }
      row.appendChild(column);
    }
    maze.appendChild(row);
  }

  setHousePosition(0, 0);
  setPersonPosition(0, 0);
  getPersonPosition();
}

function getPersonPosition() {
  let position = [-1, -1];
  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {
      if (mazeArray[i][j] == 2) {
        position[0] = i;
        position[1] = j;
      }
    }
  }
  console.log(position);
  return position;
}

document.addEventListener("keydown", function (e) {
  let person = document.getElementById("person");
  let house = document.getElementById("house");
  let personLeft = person.offsetLeft;
  let personTop = person.offsetTop;
  let houseLeft = house.offsetLeft;
  let houseTop = house.offsetTop;
  let personPosition = getPersonPosition();

  if (
    e.key == "ArrowRight" &&
    personLeft < (mazeArray.length - 1) * 50 &&
    mazeArray[personPosition[0]][personPosition[1] + 1] == 1
  ) {
    play();
    personLeft += 50;
    person.style.left = personLeft + "px";
    mazeArray[personPosition[0]][personPosition[1]] = 1;
    mazeArray[personPosition[0]][personPosition[1] + 1] = 2;
  }

  if (
    e.key == "ArrowLeft" &&
    personLeft > 0 &&
    mazeArray[personPosition[0]][personPosition[1] - 1] == 1
  ) {
    play();
    personLeft -= 50;
    person.style.left = personLeft + "px";
    mazeArray[personPosition[0]][personPosition[1]] = 1;
    mazeArray[personPosition[0]][personPosition[1] - 1] = 2;
  }
  if (
    e.key == "ArrowUp" &&
    personTop > 0 &&
    mazeArray[personPosition[0] - 1][personPosition[1]] == 1
  ) {
    play();
    personTop -= 50;
    person.style.top = personTop + "px";
    mazeArray[personPosition[0]][personPosition[1]] = 1;
    mazeArray[personPosition[0] - 1][personPosition[1]] = 2;
  }
  if (
    e.key == "ArrowDown" &&
    personTop < (mazeArray.length - 1) * 50 &&
    mazeArray[personPosition[0] + 1][personPosition[1]] == 1
  ) {
    play();
    personTop += 50;
    person.style.top = personTop + "px";
    mazeArray[personPosition[0]][personPosition[1]] = 1;
    mazeArray[personPosition[0] + 1][personPosition[1]] = 2;
  }

  if (personLeft == houseLeft && personTop == houseTop) {
    var winsound = new Audio("win.mp3");
    winsound.play();
    alert("YOU WIN");
  }
});

function play() {
  var beepsound = new Audio("beep.mp3");
  beepsound.play();
}
