// /////////////////////////////////////////////////////////////////////////////////
// /                             V A R I A B L E S                               ///
// /////////////////////////////////////////////////////////////////////////////////


const stages = [
    {
        levelName: "Tunnels",
        levelNo: 0,
        rows: 60,
        cols: 10,
        maxAppples: 25,
        chanceForDivineFruit: .14,
        level_fps: 12,
        maxSpeed: 22,
        minScoretoGetDoor: 60,
        alertoText: "Get to 100 points for next stage",
        doorSymbol: "🚅",
        bgColorTable: "#361e13",

        

    },
    {
        levelName: "Dizzy",
        levelNo: 1,
        rows: 22,
        cols: 19,
        maxAppples: 20,
        chanceForDivineFruit: .25,
        level_fps: 20,
        maxSpeed: 27,
        minScoretoGetDoor: 100,
        alertoText: "Try to get to 140 points",
        doorSymbol: "🎡",
        tableEmptys: "⬛"

    },
    {
        levelName: "Huge Cave",
        levelNo: 2,
        rows: 100,
        cols: 20,
        maxAppples: 55,
        chanceForDivineFruit: .2,
        level_fps: 11,
        maxSpeed: 22,
        minScoretoGetDoor: 140,
        alertoText: "The weird cave, get to 190 points for next stage",
        doorSymbol: "⛰",
        tableEmptys: "⬛",
        bgColorTable: "#191f03",
        apple: "🍓"


    },
    {
        levelName: "Banana World",
        levelNo: 3,
        rows: 25,
        cols: 25,
        maxAppples: 25,
        chanceForDivineFruit: .01,
        level_fps: 20,
        maxSpeed: 23,
        minScoretoGetDoor: 190,
        alertoText: "In the Banana world it is hard to even eat one banana. you need to get to 215 to get out.",
        doorSymbol: "🌻",
        bgColor: "#181502",
        apple: "🍌",
        bgColorTable: "#f4e8b8"


    }, {
        levelName: "Hell",
        levelNo: 4,
        rows: 40,
        cols: 40,
        maxAppples: 20,
        chanceForDivineFruit: .01,
        level_fps: 10,
        maxSpeed: 26,
        minScoretoGetDoor: 215,
        alertoText: "Good luck and stuff. You could be saved very shortly, look for the rainbow, you only need 230 points.",
        doorSymbol: "💀",
        tableEmptys: "💀",
        bgColor: "#910000",
        apple: "😭"

    }, {
        levelName: "Heaven",
        levelNo: 5,
        rows: 50,
        cols: 50,
        maxAppples: 45,
        chanceForDivineFruit: .01,
        level_fps: 8,
        maxSpeed: 20,
        minScoretoGetDoor: 230,
        alertoText: "Here is heaven, enjoy! and get to 335 points(!!) it is possible with bonus stages",
        doorSymbol: "🌈",
        apple: "☁️",
        bgColorTable: "#513538 "

    }, {
        levelName: "Mint",
        levelNo: 6,
        maxAppples: 35,
        chanceForDivineFruit: .013,
        level_fps: 11,
        maxSpeed: 23,
        minScoretoGetDoor: 335,
        alertoText: "You are literally addicated if you made it here, you need help",
        doorSymbol: "🌿",
        bgColor: "black",
        bgColorTable: "#113209 ",
        apple: "🌿",
        map: half

    }, {
        levelName: "Outer Space!",
        levelNo: 7,
        rows: 50,
        cols: 50,
        maxAppples: 50,
        chanceForDivineFruit: .01,
        level_fps: 12,
        maxSpeed: 25,
        minScoretoGetDoor: 400,
        alertoText: "The aliens are giving you one extra life!! ❤️",
        doorSymbol: "🛸",
        bgColor: "black",
        bgColorTable: "#00000080 ",
        apple: "👽",
        bgImage: "galaxy",
        stageFunctionRunOnce: () => {
            addLife()
        }
    }, {
        levelName: "Another World",
        levelNo: 8,
        maxAppples: 15,
        chanceForDivineFruit: .005,
        level_fps: 12,
        maxSpeed: 25,
        minScoretoGetDoor: 500,
        alertoText: "You got to a different world.",
        doorSymbol: "🏕️ ",
        bgColorTable: "#5f5f4477",
        apple: "✨",
        bgImage: "anotherWorld",
        map: anotherWorldMap,
        stageFunctionRunOnce: ()=>{
            window.turns = 0 

        },
        stageFunctionEveryTurn: ()=>{
            if (window.turns == 4){
                window.snaka = {
                    snakeArray: [
                        midMap, vec2dAdd(midMap, [1, 0]),
                        vec2dAdd(midMap, [2, 0])
                    ],
                    currnetDir: [
                        -1, 0
                    ],

                },
                window.snakaBackUp = copy(snaka)
                

               

            }
            window.turns ++
            if (window.turns > 20 ){    
                moveSNAKA({snake: window.snaka, backupSnake: window.snakaBackUp })
            }

 
        }

       

    }


]


// cant have own's door btw
// MAKE SURE stage apples and door ain't the same 

const bonusStages = [
    {
        levelName: "Dragons",
        level_fps: 3,
        maxSpeed: 10,
        alertoText: "The HARDEST bonus level!",
        bgColorTable: "#e5d5e8",
        bgColor: "#120c37",
        apple: "🍔",
        map: DragonsMap

    },
    {
        levelName: "Green Field",
        level_fps: 5,
        maxSpeed: 10,
        alertoText: "Enjoy!",
        bgColorTable: "#75ffc5",
        bgColor: "#3f9bfc",
        apple: "🥕",
        map: greenFieldMap

    },
    {
        levelName: "Shadow Corn",
        level_fps: 7,
        maxSpeed: 10,
        alertoText: "Scary!",
        bgColorTable: "#ccac9f",
        bgColor: "#093a07",
        apple: "🌽",
        map: shadowMap
    },
    {
        levelName: "Watermelon",
        level_fps: 6,
        maxSpeed: 7,
        alertoText: "Yum.",
        bgColorTable: "#f3bcbc",
        bgColor: "#2b875b",
        apple: "🍉",
        map: watermelon
    }, {
        levelName: "Oz Design",
        level_fps: 6,
        maxSpeed: 7,
        alertoText: "This Snake game was designed by Oz",
        bgColorTable: "#f3bcbc",
        bgColor: "#2b875b",
        map: ozDesign
    }, {
        levelName: "Sunny",
        level_fps: 5,
        maxSpeed: 15,
        alertoText: "Why is it so warm?",
        apple: "🌞",
        bgColorTable: "black",
        bgColor: "#ffd8ac",
        map: sunny
    }, {
        levelName: "lifeless",
        alertoText: "You can go through the wall with the divine fruit",
        bgColor: '#f0b2b2',
        bgColorTable: '#140505',
        map: tryGetLife
    }, {
        levelName: "Sky Hue",
        alertoText: "You can go through the wall with the divine fruit",
        bgColor: '#90e8f3',
        bgColorTable: '#e5f2ff',
        map: farFromHeartMap
    }, {
        levelName: "Hazy Red",
        alertoText: "The life is hiding!",
        bgColorTable: "#754a00",
        bgColor: "#310e08",
        apple: "🔥",
        map: hazyRedMap
    }, {
        levelName: "Candyland",
        level_fps: 8,
        maxSpeed: 12,
        alertoText: "Enter the sweetest world!",
        bgColorTable: "#fde2e2",
        bgColor: "#ff6b6b",
        apple: "🍭",
        map: candylandMAp
    }, {
        levelName: "Enchanted Forest",
        level_fps: 6,
        maxSpeed: 9,
        alertoText: "Discover the magic of the forest!",
        bgColorTable: "#d1ecd1",
        bgColor: "#157f15",
        apple: "🍄",
        map: forestMAp

    }, {
        levelName: "Neon City",
        level_fps: 15,
        maxSpeed: 20,
        alertoText: "Explore the vibrant metropolis!",
        bgColorTable: "#111111",
        bgColor: "#ff00ff",
        apple: "💡",
        map: NeonCityMap
    },
    {
        levelName: "Underwater Adventure",
        level_fps: 7,
        maxSpeed: 15,
        alertoText: "Dive into the depths of the ocean!",
        bgColorTable: "#b3d1ff",
        bgColor: "#0e2072",
        apple: "🐠",
        map: oceanmap
      }


]




// /////////////////////////////////////////////////////////////////////////////////
// /                          B A S I C   F U N C T I O N S                      ///
// /////////////////////////////////////////////////////////////////////////////////



// get maps made with the GUI make them into normal maps with current Graphic Object
function translateBonusMaps(bMap) {
    const GUISymbols = {
        "🍏": "apple",
        "🍇": "divineFruit",
        "⬛": "emptys",
        "🟦": "wall",
        "🔑": "doorOutBonusStage",
        "❤️": "heart"

    }

    for (let row = 0; row < bMap.length; row++) {
        for (let col = 0; col < bMap[row].length; col++) {
            const value = bMap[row][col]
            const translatedValue = Graphics[GUISymbols[value]]
            if (! translatedValue) {
                console.error(`I cannot translate ${value} from the map you made (in ${row}, ${col}) to a Graphic I know. Here are the Graphics that are available:\n ${Graphics}`)
            }
            bMap[row][col] = translatedValue
        }
    }
    return bMap

}

// runs every turn
function maybeOpenDoor() {
    if (snake.level >= stages.length) {
        return
    }
    if (!custoMap && snake.score >= stages[snake.level].minScoretoGetDoor) {
        if (stages[snake.level].doorSymbol) {
            Graphics.door = stages[snake.level].doorSymbol
        }
        createDoor()
    }

    let enhancedCahnceforBonuStage = chanceForBonusStage + (0.0003 / (Math.abs(20-snake.level))) 
    if (Math.random() < enhancedCahnceforBonuStage && !isSecretDoorOpenAlready && !isTiny) {
        createDoor(true)
        isSecretDoorOpenAlready = true
    }
}

function createDoor(isBonuStage = false) {
    const av = findAvailables();
    const door = isBonuStage ? Graphics.bonusDoor : Graphics.door
    if (!map.flat().includes(Graphics.door)) {
        const ranSpot = av[Math.floor(Math.random() * av.length)];
        updateMap(ranSpot, door)
    }
}


// / called once a  door is entered
// if is bonus stage is false goes to next level
// if it is true, gives random bonus level. if it is a string it finds this specific level
function newStage(isBonuStage = false) {
    let level
    let levelMap
    if (isBonuStage) {
        level = choice(bonusStages)

    } else {
        level = stages[snake.level]
    }
    if (typeof(isBonuStage) == "string") {
        if (isBonuStage == "test") {
            level = bonusStages[bonusStages.length - 1]
        } else {
            level = stages.find(stage => stage.levelName === isBonuStage) || bonusStages.find(stage => stage.levelName === isBonuStage)
        }
    }

    if (level.apple) {
        Graphics.apple = level.apple
    }
    Graphics.emptys = level.tableEmptys || defaultValues.emptysCells
    Graphics.bgColor = level.bgColor || defaultValues.bgColor
    Graphics.bgColorTable = level.bgColorTable || defaultValues.bgColorTable
    Graphics.bgImage = level.bgImage || defaultValues.bgImage
    if (level.map) { // / MUST Copy or it would touch the original variable and change the apples making it untranslatable
        const mapCopy = copy(level.map)
        levelMap = translateBonusMaps(mapCopy)
    } else {
        levelMap = genMap(level.rows, level.cols)
    }

    switchToNewMap(levelMap)
    if (isBonuStage) {
        Graphics.disableSizeChange = true

    }
    if (! isBonuStage) {
        snake.level += 1
    }
    maxApplesAtOnce = level.maxAppples || 0
    chanceForDivineFruit = level.chanceForDivineFruit || 0
    initialFps = level.level_fps || defaultValues.initialFps
    maxSpeed = level.maxSpeed || defaultValues.maxSpeed
    if (isBonuStage) {
        isSecretDoorOpenAlready = true
    }

    if (isBonuStage) {
        alerto(`Bonus Stage: ${
            level.levelName
        }!`, level.alertoText)

    } else {
        alerto(`New Stage: ${
            level.levelName
        }!`, level.alertoText)
    }
    if (level.stageFunctionRunOnce) {
        level.stageFunctionRunOnce()
    }
    if (level.stageFunctionEveryTurn){
        stageFunctionEveryTurn = level.stageFunctionEveryTurn
    }
    nextTurn()
    pauseGame()

}


// /////////////////////////////////////////////////////////////////////////////////
// /                              C U S T O M       M A P                        ///
// /////////////////////////////////////////////////////////////////////////////////

function getParam(key) {
    if (!window.location.href.includes("&")) {
        return
    }

    const queryString = window.location.href.split("?")[1]; // Remove the leading "?"
    const params = queryString.split('&');

    for (const param of params) {
        const [paramKey, paramValue] = param.split('=');
        if (paramKey === key) {
            const decodedValue = decodeURIComponent(paramValue);
            return decodedValue;
        }
    }

    return null;
}


custoMap = getParam("m")
if (custoMap) {
    const numberApples = getParam("a")
    defaultValues.maxApplesAtOnce = Number(numberApples)
    if (! numberApples) {
        defaultValues.chanceForDivineFruit = 0
    }
    defaultValues.disableSizeChange = true
    map = translateBonusMaps(unzipMap(custoMap))

    custuMapasString = JSON.stringify(map)
    const colorB = getParam("b")
    const colorT = getParam("t")


    if (colorB && colorT) { // we need them to both exist and differ of "wall" will look bad bc its transparent
        defaultValues.bgColor = colorB
        defaultValues.bgColorTable = colorT

    }
    restart()
}




// /////////////////////////////////////////////////////////////////////////////////
// /                              E X S T R A       B S                          ///
// /////////////////////////////////////////////////////////////////////////////////

// for complex custom shit

// this function rotates snake-like things, its a helper function
function __rotateSNAKA(currnetDir, direction) {
    let rotateDir = direction == "right" ? [1, -1] : [-1, 1];  
    return [currnetDir[1] * rotateDir[0], currnetDir[0] * rotateDir[1]];
  }






// this function moves a SNAKA after it is created, needs to run every turn
function moveSNAKA({ snaka = window.snaka, rotation = undefined, body = "🌺", headGraphics = "🏵️", backupSnake = {} } = {}) {
 
    if (rotation == "right" || rotation == "left") {
      snaka.currnetDir = __rotateSNAKA(snaka.currnetDir, rotation);
    }
      else if (Math.random()>0.9){
          snaka.currnetDir = __rotateSNAKA(snaka.currnetDir, choice(["right", "left"]));
  
      }
    const head = snaka.snakeArray[0];
    const newHead = vec2dAdd(head, snaka.currnetDir);
  
  
    const newHeadContent = map[newHead[0]]?.[newHead[1]];
  

    // if bumps into things, it is going to move and actually avoid them if it can
    if (newHeadContent === undefined || (newHeadContent == Graphics.wall || newHeadContent == Graphics.body)) {
       moveSNAKA({snaka = snaka, rotation = choice(["right", "left"])} = {})
       return
      }


    // snaka dies if you touch her
    if (JSON.stringify(snaka.snakeArray).includes(snake.snakeArray[0])){
        for (const ij of snaka.snakeArray) {
            updateMap(ij, Graphics.apple);
          }
        
        if (fps< maxSpeed){
            fps+= 1

        }
        snaka.snakeArray = copy(backupSnake.snakeArray)
        snaka.currnetDir = backupSnake.currnetDir
        
        return
    }
  
  
  
    snaka.snakeArray.unshift(newHead);
    if (newHeadContent != Graphics.apple) {
      const lastPos = snaka.snakeArray.pop();
      updateMap(lastPos, Graphics.emptys);
    }
   
    for (const ij of snaka.snakeArray) {
      updateMap(ij, body);
    }
    updateMap(newHead, headGraphics);


  
  
  }

