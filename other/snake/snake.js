

// /////////////////////////////////////////////////////////////////////////////////
// /                             V A R I A B L E S                               ///
// /////////////////////////////////////////////////////////////////////////////////

const say = console.log

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


const defaultValues = {
	emptysCells: `⬛`,
	chanceForDivineFruit: .1,
	maxApplesAtOnce: 14,
	mapRows: 30,
	mapCols: 30,
	initialFps: 9,
	maxSpeed: 65 / Math.PI,
	bgColor: "black",
	bgColorTable: "",
	disableSizeChange: false,
  disableRotation: false, 
  bgImage: "",


}


// changing names here would affect Levels as well (translating the GUI)
// note that ⬛ and ⬜️ have css of their own
// make sure there are no identical graphics when come to different kinds of doors
const Graphics = {
	apple: choice(foods),
	emptys: defaultValues.emptysCells,
	head: "🔴",
	body: "⚪",
	godBody: "🔵",
	divineFruit: "🍇",
	wall: "⬜️",
	door: "🚅",
	bgColor: defaultValues.bgColor,
	bgColorTable: defaultValues.bgColorTable,
	bonusDoor: "🚪",
	doorOutBonusStage: "🔑",
	disableSizeChange: false,
  disableRotation: false, 
  bgImage: "",
  heart: "❤️"

};

let godModeEndTime = 0; // in ms since 1970
let isGodMode = false;
let isPaused = false
let maxApplesAtOnce = defaultValues.maxApplesAtOnce;
let chanceForDivineFruit = defaultValues.chanceForDivineFruit;
let isTiny = false
let mapRows = defaultValues.mapRows;
let mapCols = defaultValues.mapCols;
let chanceForBonusStage = 0.0003
let isSecretDoorOpenAlready = false
let custuMapasString = ""
let custoMap = ""
let stageFunctionEveryTurn = ()=>{}
let creaturesOnBoard = []
let time = 0
let chanceforGuns = 0
let availableGuns = []
let gunsinGame = 0
let maxGunsinGame = 0


// for tiny mode
if (document.URL.includes("tiny") && !custuMapasString) { // levels disabled (later)
	isTiny = true
	defaultValues.mapCols = 11
	defaultValues.mapRows = 11
	defaultValues.maxApplesAtOnce = 2
	defaultValues.chanceForDivineFruit = .08;
	document.querySelector("#scoreText").innerHTML = "Tiny " + document.querySelector("#scoreText").innerHTML
	document.title = "Tiny Snake"
}
// // redirecting mobiles to tiny snake
if ((detectMob())) {
	if (! isTiny) {
		document.location += "?tiny"
	}
}

let map = genMap(mapRows, mapCols);
let midMap = findMid(map)
const snake = {
	snakeArray: [
		midMap, vec2dAdd(midMap, [1, 0]),
		vec2dAdd(midMap, [2, 0])
	],
	currentDir: [
		-1, 0
	], // up
	life: 1,
	score: 0,
	level: 0,
  equipment: [undefined],
  currentlyEquipped: undefined

};
let requeue = [];
let initialFps = defaultValues.initialFps
let fps = defaultValues.initialFps;
let size = 40;
let maxSpeed = defaultValues.maxSpeed
const isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);



const directsVecs = {
  up: [-1,0], 
  right: [0,1],
  down: [1,0],
  left: [0, -1]    
}

// /////////////////////////////////////////////////////////////////////////////////
// /                       U S E F U L      F U N C T I O N S                    ///
// /////////////////////////////////////////////////////////////////////////////////

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


function detectMob() {
	return(window.innerWidth<= 800 );
}

function vec2dAdd(arr, arr2) {
  return [arr[0] + arr2[0], arr[1] + arr2[1]];
}

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(x, min, max) {
  return Math.max(min, Math.min(x, max));
}


function copy(thing){
  return JSON.parse(JSON.stringify(thing))
}


//get best direction Vector
function getDirection(object, target) {
 
  const [objX, objY] = object;
  const [targetX, targetY] = target;
  const diffX = targetX - objX;
  const diffY = targetY - objY;

  if (diffY == 0 && diffX ==0){
    return undefined
  }

  if (Math.abs(diffX) > Math.abs(diffY)) {
    return [diffX > 0 ? 1 : -1, 0];
  } else {
    return [0, diffY > 0 ? 1 : -1];
  }
}


///////////////////////////////////////////////////////////////////////////////////
///                          M A P   F U N C T I O N S                          ///
///////////////////////////////////////////////////////////////////////////////////

function findMid(map){
  return  [Math.round(map.length / 2), Math.round(map[0].length / 2)]
}

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



// would simply switch the map
function switchToNewMap(newmap, customSnakeArr = false,  customSnakeDir = false){
  map =  newmap
  const newMid = findMid(map)
  if (customSnakeArr){
    snake.snakeArray = customSnakeArr
  
  }
  else {
    snake.snakeArray = [
      newMid, vec2dAdd(newMid, [1, 0]), vec2dAdd(newMid, [2, 0])];
  }
  if (customSnakeDir){
    snake.currentDir = customSnakeDir
  }
  else {
    snake.currentDir = [-1, 0]; //up

  }

  requeue = [] // restarting snake should reset the action queue
  time = 0
  isSecretDoorOpenAlready = false
  createTable(map)
  let table = document.querySelector("table");
  table.style.setProperty("--transY", 0);
  table.style.setProperty("--transX", 0);
  Graphics.disableSizeChange = defaultValues.disableSizeChange
  Graphics.disableRotation = defaultValues.disableRotation
  chanceforGuns = 0
  availableGuns = []
  gunsinGame = 0
  maxGunsinGame = 0
  stageFunctionEveryTurn = () =>{}
  creaturesOnBoard = []


  // nextTurn()
  paintMap();
  

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

function rotate(currentDir, direction) {
  let rotateDir = direction == "right" ? [1, -1] : [-1, 1];
  if (!Graphics.disableRotation){
    let ro = document.querySelector("table").style.getPropertyValue("--rotation");
    document
      .querySelector("table")
      .style.setProperty("--rotation", Number(ro) + rotateDir[0] * 90);  
  }

  return [currentDir[1] * rotateDir[0], currentDir[0] * rotateDir[1]];
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
    snake.currentDir = rotate(snake.currentDir, rotation);
  }
  const head = snake.snakeArray[0];
  const newHead = vec2dAdd(head, snake.currentDir);

  if (thruWalls) {
    maybeTransportThruWall(newHead);
  }

  const newHeadContent = map[newHead[0]]?.[newHead[1]];
  if (newHeadContent === undefined || (newHeadContent == Graphics.wall || newHeadContent == Graphics.body) && !isGodMode) {
    return reduceLife()
   
    }

  else if (newHeadContent == Graphics.heart){
    addLife()
  }


  else if (newHeadContent.includes("<img")){
    
    const gunpic = newHeadContent.split(`extra-media/`)[1].split(".jpg")[0]
    const gun = findGunByImage(gunpic)
    let isThereAlready = snake.equipment.map(g=>g && g.image).indexOf(gunpic) 
    //filtering by name bc of saved games that dont have referenced objs
    if (isThereAlready == -1){
      isThereAlready = snake.equipment.push(gun) -1
    }
    snake.equipment[isThereAlready].emmo += gun.defaultEmmo
    equip(isThereAlready)
    gunsinGame--

  } 
  
     

  else if (custoMap && newHeadContent == Graphics.doorOutBonusStage){
    return winCustomStage()
  }


  // for now after bonus stages you also get to next level
  else if (newHeadContent == Graphics.door || newHeadContent == Graphics.doorOutBonusStage ){
    return newStage(false)
  }
  else if (newHeadContent == Graphics.bonusDoor){
    return newStage(true)
  }


  snake.snakeArray.unshift(newHead);
  if (newHeadContent != Graphics.apple) {
    const lastPos = snake.snakeArray.pop();
    updateMap(lastPos, Graphics.emptys);
  }
  else if (newHeadContent == Graphics.apple){
    snake.score +=1 
  }
  if (newHeadContent == Graphics.divineFruit) {
    godModeEndTime = Date.now() + 7_000; // enter (or lengthen the duration of) god mode
    isGodMode = true;
  }

  const emoji = isGodMode ? Graphics.godBody : Graphics.body;
  for (const ij of snake.snakeArray) {
    updateMap(ij, emoji);
  }
  if (!isGodMode) updateMap(newHead, Graphics.head);

  const table = document.querySelector("table");
  const transY = table.style.getPropertyValue("--transY");
  const transX = table.style.getPropertyValue("--transX");

  table.style.setProperty(
    "--transY", Number(transY) - (1.09*size) * snake.currentDir[0]
  );
  table.style.setProperty(
    "--transX", Number(transX) - (1.09*size) * snake.currentDir[1]
  );



}



function die() {
  let highscore
  if (isTiny) {
    highscore = localStorage.getItem("tinyscore") || 0
  }
  else {
    highscore = localStorage.getItem("highscore") || 0;
  }

  const score = snake.score
  if (score > highscore) {
    if (isTiny) {
      localStorage.setItem("tinyscore", score)
    }
    else {
      localStorage.setItem("highscore", score);
    }
    alerto(`You have a new record of ${score}!`, "machmi");
  } else {
    alerto("You die, you loser piece of sh*t", "maaliv");
  }
  document.querySelector(".high-score").classList.remove("secret");
}

function win() {

  //due to bugs, suspended
  const score = snake.score
  console.log("won!")
  if (isTiny) {
    localStorage.setItem("tinyscore", score);
  }
  else {
    localStorage.setItem("highscore", score);

  }
}

function winCustomStage(){
  snake.life = 0
  alerto("Congrats! You won this custom stage", "congratulations")
}


function addLife(){
  snake.life++
  document.querySelector("#life").innerText = "❤️".repeat(snake.life - 1)
}


function reduceLife(){
  snake.life--
  if (snake.life == 0){
    document.querySelector("#life").innerText = ""
    return die()
  }
  document.querySelector("#life").innerText = "❤️".repeat(snake.life -1)
  godModeEndTime = Date.now() + 3_000; // enter (or lengthen the duration of) god mode
  isGodMode = true;
  
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
  
  if (snake.life == 0) {
    return;
  }
  applesOrWin();
  if(!isTiny){
    maybeOpenDoor()

  }
  if(!isTiny){
    maybeCreateGun()
  }
  moveSnakeorDie({  rotation: requeue.shift(), thruWalls: isGodMode });

  if (snake.life > 0) {
    document.querySelector(".score").innerText = snake.score

    fps = Math.min(initialFps + (snake.snakeArray.length - 3) / 4, maxSpeed);
    size = Math.max(36 - snake.snakeArray.length, 18);
    if (Graphics.disableSizeChange || (map.length >= 45 || map[0].length >= 45)){
      size = 20
    }
    document.querySelector("body").style.setProperty("--size", size);

    document.querySelector("body").style.setProperty("--fps", fps);
  }

  if (isGodMode) {
    flashNearGodModeEnd(2000);
    isGodMode = Date.now() < godModeEndTime;
  }
  stageFunctionEveryTurn()
  for (const obj of creaturesOnBoard){
    moveSNAKA(obj)
  }


}

async function restart() {
  Graphics.emptys = defaultValues.emptysCells
  maxApplesAtOnce = defaultValues.maxApplesAtOnce;
  maxSpeed = defaultValues.maxSpeed
  chanceForDivineFruit = defaultValues.chanceForDivineFruit
  initialFps = defaultValues.initialFps
  Graphics.bgColor = defaultValues.bgColor
  Graphics.bgColorTable = defaultValues.bgColorTable
  Graphics.bgImage = defaultValues.bgImage
  Graphics.apple = choice(foods)
  equip(0)

  let oldMap
  if (!custuMapasString){
     oldMap = genMap(defaultValues.mapRows, defaultValues.mapCols)

  }
  else{
    oldMap = JSON.parse(custuMapasString)
  }
  switchToNewMap(oldMap)


  snake.level = 0 
   
  
  snake.currentDir = [-1, 0]; //up
  snake.score = 0 
  snake.equipment = [undefined]
  snake.currentlyEquipped = snake.equipment[0]
  await sleep(350);
  snake.life = 1;
  paintMap();
}



function pauseOrunpauseGame() {
  isPaused = !isPaused;
  const pauseButton = document.querySelector("#pause")
  const backButton = document.querySelector("#back")

  if (isPaused) { pauseButton.classList.remove("secret"); document.querySelector(".high-score").classList.remove("secret") 
    if (custoMap){
      backButton.classList.remove("secret")
    }

}
  else {
    pauseButton.classList.add("secret")
    document.querySelector(".high-score").classList.add("secret")
    if (custoMap){
      backButton.classList.add("secret")
    }
    requeue = [] //clean all the moves


}

  }


  

function pauseGame(){
  isPaused = true;
  const pauseButton = document.querySelector("#pause")
  pauseButton.classList.remove("secret"); document.querySelector(".high-score").classList.remove("secret") 

}


document.querySelector("#back").addEventListener("click",()=>{
  location.replace(window.location.href.split("?")[0])
}


 )

function maybeOpenDoor(){
  //New stage functionality is in a different file, so this function is gonna get ran over
  //I kept this function so this js fle could work by itself

}

function newStage(){
  //New stage functionality is in a different file, so this function is gonna get ran over
  //I kept this function so this js fle could work by itself
}

function moveSNAKA(){
    //New stage functionality is in a different file, so this function is gonna get ran over
  //I kept this function so this js fle could work by itself

}

function findGunByImage(image) {
    //New stage functionality is in a different file, so this function is gonna get ran over
  //I kept this function so this js fle could work by itself

}

function equip(idx){
    //New stage functionality is in a different file, so this function is gonna get ran over
  //I kept this function so this js fle could work by itself

}

function maybeCreateGun(){
      //New stage functionality is in a different file, so this function is gonna get ran over
  //I kept this function so this js fle could work by itself


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
  document.querySelector("body").style.setProperty("--bgColor", Graphics.bgColor);
  document.querySelector("body").style.setProperty("--bgColorTable", Graphics.bgColorTable);
  document.body.style.backgroundImage = `url('extra-media/${Graphics.bgImage}.jpg')`;


}

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "37") {
    requeue.push("left");
  } else if (e.keyCode == "39") {
    requeue.push("right");
  }
  /// pause option
  else if (e.keyCode == "32") {
    //close dialogue box
    document.querySelector(".alerto").dispatchEvent( new Event("submit"))
    if (!window.isInSpecialerto){ // we dont want it to unpause during specialelertos in a row
      pauseOrunpauseGame()

    }

  }
  else if (e.keyCode == "84") {
    if (!isTiny){
    document.location+="?tiny"
    }
    else{
      document.location=document.location.href.split("?tiny")[0]
    }

  }

  else if (e.key === "s"){
    let idx = snake.equipment.indexOf(snake.currentlyEquipped) + 1
    if (idx>= snake.equipment.length){
      idx = idx % snake.equipment.length
    }
    equip(idx)    

  }

  else if (e.key === "a"){
    if (snake.currentlyEquipped){
      const gun = snake.currentlyEquipped
      shoot(gun)
    }
  }
  if (e.key === 'q') {
    retrieveGame()
  }
}



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
  let highscore;
  if (isTiny) {
    highscore = localStorage.getItem("tinyscore")
  }
  else highscore = localStorage.getItem("highscore");
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
  if (snake.life == 0){
    restart();
    

  }
  document.querySelector(".high-score").classList.add("secret");
});

document.onkeyup = checkKey;

createTable(map);
paintMap();


async function mainLoop() {
  await sleep(350);
  while (true) {
    while (isPaused) {
      await sleep(10)
    }
    time++
    const timeStart = performance.now();
    nextTurn();
    const timePassed = performance.now() - timeStart;
    const timeLeftToSleep = 1000 / fps - timePassed;
    if (timeLeftToSleep> 0)await sleep(timeLeftToSleep);

}}mainLoop();
