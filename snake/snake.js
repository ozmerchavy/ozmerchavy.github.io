///////////////////////////////////////////////////////////////////////////////////
///                             V A R I A B L E S                               ///
///////////////////////////////////////////////////////////////////////////////////

const foods = [
  "🍏",
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍉",
  "🍓",
  "🍈",
  "🍒",
  "🍑",
  "🍍",
  "🥝",
  "🥑",
  "🍅",
];

const Graphics = {
  apple: choice(foods),
  emptys: `⬛`,
  head: "🔴",
  body: "⚪",
  godBody: "🟣",
  divineFruit: "🍇",
};

let godModeEndTime = 0; // in ms since 1970

function isGodMode() {
  return Date.now() < godModeEndTime;
}

const mapRows = 25;
const mapCols = 25;
let map = genMap(mapRows, mapCols);
const midMap = [Math.round(map.length / 2), Math.round(map[0].length / 2)];
const snake = {
  snakeArray: [midMap, vec2dAdd(midMap, [1, 0]), vec2dAdd(midMap, [2, 0])],
  currnetDir: [-1, 0], //up
  isDead: false,
};
let chanceForDivineFruit = .08;
let maxApplesAtOnce = 14;
const requeue = [];
const initialFps = 9;
let fps = 12;
let size = 40;
const maxSpeed = 35 / Math.PI; // Why? bc its funny thats why
let advancedMode = true;
const isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

///////////////////////////////////////////////////////////////////////////////////



function vec2dAdd(arr, arr2) {
  return [arr[0] + arr2[0], arr[1] + arr2[1]];
}

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(x, min, max) {
  return Math.max(min, Math.min(x, max));
}

///////////////////////////////////////////////////////////////////////////////////
///                          M A P   F U N C T I O N S                          ///
///////////////////////////////////////////////////////////////////////////////////

function genMap(rows, cols) {
  let map = [];
  for (let i = 0; i < rows; i++) {
    map.push([]);
    for (let o = 0; o < cols; o++) {
      map[i].push(Graphics.emptys);
    }
  }
  return map;
}

function updateMap([x, y], value) {
  map[x][y] = value;
  document.getElementById(`${[x, y]}`).innerHTML = value;
  document.getElementById(`${[x, y]}`).className = value;
}

function paintMap() {
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      document.getElementById(`${[r, c]}`).innerHTML = map[r][c];
      document.getElementById(`${[r, c]}`).className = map[r][c];
    }
  }
}

function findAvailables() {
  const availables = [];
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] == Graphics.emptys) availables.push([r, c]);
    }
  }
  return availables;
}


///////////////////////////////////////////////////////////////////////////////////
///                          S N A K E   F U N C T I O N S                      ///
///////////////////////////////////////////////////////////////////////////////////

function rotate(currnetDir, direction) {
  let rotateDir = direction == "right" ? [1, -1] : [-1, 1];
  let ro = document.querySelector("table").style.getPropertyValue("--rotation");
  document
    .querySelector("table")
    .style.setProperty("--rotation", Number(ro) + rotateDir[0] * 90);

  return [currnetDir[1] * rotateDir[0], currnetDir[0] * rotateDir[1]];
}

function flashNearGodModeEnd(durationMs) {
  if (godModeEndTime - durationMs > Date.now()) return;

  const msPerState = 200;
  const timeLeft = godModeEndTime - Date.now();
  const special = Math.floor(timeLeft / msPerState) % 2;
  const emoji = special ? Graphics.godBody : Graphics.body;
  for (const ij of snake.snakeArray) {
    updateMap(ij, emoji);
  }
  if (!special) updateMap(snake.snakeArray[0], Graphics.head);
}


function maybeTransportThruWall(newHead) {
  const taboole = document.querySelector("table");
  const currentYtrans = taboole.style.getPropertyValue("--transY");
  const currentXtrans = taboole.style.getPropertyValue("--transX");

  if (newHead[0] >= map.length) {
    newHead[0] = 0;
    taboole.style.setProperty("--transY", currentYtrans * -1);
  }
  if (newHead[0] < 0) {
    newHead[0] = map.length - 1;
    taboole.style.setProperty("--transY", currentYtrans * -1);
  }
  if (newHead[1] >= map[newHead[0]].length) {
    newHead[1] = 0;
    taboole.style.setProperty("--transX", currentXtrans * -1);
  }
  if (newHead[1] < 0) {
    newHead[1] = map[newHead[0]].length - 1;
    taboole.style.setProperty("--transX", currentXtrans * -1);
  }
}

function moveSnakeorDie({ rotation = undefined, thruWalls = false } = {}) {
  if (rotation == "right" || rotation == "left") {
    snake.currnetDir = rotate(snake.currnetDir, rotation);
  }
  const head = snake.snakeArray[0];
  const newHead = vec2dAdd(head, snake.currnetDir);

  if (thruWalls) {
    maybeTransportThruWall(newHead);
  }

  const newHeadContent = map[newHead[0]]?.[newHead[1]];

  if (newHeadContent === undefined || newHeadContent == Graphics.body && !isGodMode()) {
    return die();
  }

  
  snake.snakeArray.unshift(newHead);
  if (newHeadContent != Graphics.apple) {
    const lastPos = snake.snakeArray.pop();
    updateMap(lastPos, Graphics.emptys);
  }
  if (newHeadContent == Graphics.divineFruit) {
    godModeEndTime = Date.now() + 7_000; // enter (or lengthen the duration of) god mode
  }

  const emoji = isGodMode() ? Graphics.godBody : Graphics.body;
  for (const ij of snake.snakeArray) {
    updateMap(ij, emoji);
  }
  if (!isGodMode()) updateMap(newHead, Graphics.head);

  const table = document.querySelector("table");
  const transY = table.style.getPropertyValue("--transY");
  const transX = table.style.getPropertyValue("--transX");

  table.style.setProperty(
    "--transY",
    Number(transY) - size * snake.currnetDir[0]
  );
  table.style.setProperty(
    "--transX",
    Number(transX) - size * snake.currnetDir[1]
  );
}

function die() {
  snake.isDead = true;
  const highscore = localStorage.getItem("highscore") || 0;
  const score = snake.snakeArray.length - 3;
  if (score > highscore) {
    localStorage.setItem("highscore", score);
    alerto(`You have a new record of ${score}!`, "machmi");
  } else {
    alerto("You die, you loser piece of sh*t", "maaliv");
  }
}

function win() {
  const score = snake.snakeArray.length - 3;
  localStorage.setItem("highscore", score);
  snake.isDead == true;
  alerto("You won you magnificent creature", "machmi");
}

///////////////////////////////////////////////////////////////////////////////////
///                          G A M E   F U N C T I O N S                        ///
///////////////////////////////////////////////////////////////////////////////////

function applesOrWin() {
  const av = findAvailables();
  if (av.length == 0) {
    return win();
  } else if (
    map.flat().filter((fatut) => fatut == Graphics.apple).length <
    maxApplesAtOnce
  ) {
    const ranSpot = av[Math.floor(Math.random() * av.length)];
    if (Math.random() < chanceForDivineFruit) {
      updateMap(ranSpot, Graphics.divineFruit);
    } else updateMap(ranSpot, Graphics.apple);
  }
}


function nextTurn() {
  if (snake.isDead) {
    return;
  }
  applesOrWin();
  moveSnakeorDie({ rotation: requeue.shift(), thruWalls: isGodMode() });

  if (!snake.isDead) {
    document.querySelector(".score").innerText = snake.snakeArray.length - 3;

    if (advancedMode) {
      fps = Math.min(initialFps + (snake.snakeArray.length - 3) / 4, maxSpeed);
      size = Math.max(40 - snake.snakeArray.length, 18);
      document.querySelector("body").style.setProperty("--size", size);
      document.querySelector("body").style.setProperty("--fps", fps);
    }
  }

  if (isGodMode()) flashNearGodModeEnd(2000);
}

async function restart() {
  map = genMap(mapRows, mapCols);
  snake.snakeArray = [
    midMap,
    vec2dAdd(midMap, [1, 0]),
    vec2dAdd(midMap, [2, 0]),
  ];
  let table = document.querySelector("table");

  table.style.setProperty("--transY", 0);
  table.style.setProperty("--transX", 0);

  snake.currnetDir = [-1, 0]; //up

  await sleep(350);
  snake.isDead = false;
  paintMap();
}

///////////////////////////////////////////////////////////////////////////////////
///                          H T M L   F U N C T I O N S                        ///
///////////////////////////////////////////////////////////////////////////////////

function createTable(tableData) {
  let table = document.createElement("table");
  let tableBody = document.createElement("tbody");

  tableData.forEach((rowData, idxR) => {
    let row = document.createElement("tr");

    rowData.forEach((cellData, idxC) => {
      let cell = document.createElement("td");
      cell.id = String([idxR, idxC]);
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);

  document.querySelector("table").outerHTML = table.outerHTML;
}

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "37") {
    requeue.push("left");
  } else if (e.keyCode == "39") {
    requeue.push("right");
  }
}

document.querySelector(".advanced-switch").addEventListener("click", () => {
  advancedMode = !advancedMode;
  document.querySelector(".advanced-switch .text").innerText = advancedMode
    ? "On"
    : "Off";
});

/// BEING COOL AND RESPONSIVE!!

let { width: screenWidth } = document.body.getBoundingClientRect();

addEventListener("resize", () => {
  screenWidth = document.body.getBoundingClientRect().width;
});

document.body.addEventListener("touchstart", (event) => {
  const { pageX: x } = event.targetTouches[0];
  if (x < screenWidth / 2) {
    requeue.push("left");
  } else {
    requeue.push("right");
  }
});

function alerto(msg, string) {
  string = Object.keys(quotes).includes(string)
    ? quotes[string][Math.floor(Math.random() * quotes[string].length)]
    : string;

  const thing = document.querySelector(".alerto");
  thing.querySelector(".msg").innerText = msg;
  thing.querySelector(".also-msg").innerText = string;
  thing.setAttribute("open", true);

  const highscore = localStorage.getItem("highscore");
  if (highscore) {
    document.querySelector(".high-score .text").innerText = highscore;
    document.querySelector(".high-score").classList.remove("secret");
  }
}

/////////////// Responsiveness for Macs and iPhones  //////////////////////////////
/////////////// It's smart hire me                   //////////////////////////////

if (isMacLike) {
  document.body.setAttribute("apple-device", true);
}

///////////////////////////////////////////////////////////////////////////////////
///                          S T U F F  and  S H I T                            ///
///////////////////////////////////////////////////////////////////////////////////

document.querySelector(".alerto").addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".alerto").removeAttribute("open");
  restart();
  document.querySelector(".high-score").classList.add("secret");
});

document.onkeyup = checkKey;

createTable(map);
paintMap();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function mainLoop() {
  await sleep(350);
  while (true) {
    nextTurn();
    await sleep(1000 / fps);
  }
}

mainLoop();
