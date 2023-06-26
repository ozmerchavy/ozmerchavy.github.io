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
        doorSymbol: "🍌",
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
        alertoText: "Good luck and stuff. You could be saved very shortly, look for the cloud.",
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
        apple: "🌈",
        bgColorTable: "#513538 ",

    },
    {
        levelName: "Mint",
        levelNo: 6,
        maxAppples: 35,
        chanceForDivineFruit: .01,
        level_fps: 11,
        maxSpeed: 23,
        minScoretoGetDoor: 335,
        alertoText: "You are literally addicated if you made it here, you need help",
        doorSymbol: "🌿",
        bgColor: "black",
        bgColorTable: "#113209 ",
        apple: "🌿", 
        map: half

    }


]


  // cant have own's door btw
const bonusStages = [{
        levelName: "Dragons",
        level_fps: 3,
        maxSpeed: 10,
        alertoText: "The HARDEST bonus level!",
        bgColorTable: "#e5d5e8",
        bgColor:"#120c37",
        apple: "🍔",
        map: DragonsMap

    },
    {
        levelName: "Green Field",
        level_fps: 5,
        maxSpeed: 10,
        alertoText: "Enjoy!",
        bgColorTable: "#75ffc5",
        bgColor:"#3f9bfc",
        apple: "🥕",
        map: greenFieldMap

    },
    {
        levelName: "Shadow Corn",
        level_fps: 7,
        maxSpeed: 10,
        alertoText: "Scary!",
        bgColorTable: "#ccac9f",
        bgColor:"#093a07",
        apple: "🌽",
        map: shadowMap
    },
    {
        levelName: "Watermelon",
        level_fps: 6,
        maxSpeed: 7,
        alertoText: "Yum.",
        bgColorTable: "#f3bcbc",
        bgColor:"#2b875b",
        apple: "🍉",
        map: watermelon
    },
    {
        levelName: "Oz Design",
        level_fps: 6,
        maxSpeed: 7,
        alertoText: "This Snake game was designed by Oz",
        bgColorTable: "#f3bcbc",
        bgColor:"#2b875b",
        map: ozDesign
    },
    {
        levelName: "Sunny",
        level_fps: 5,
        maxSpeed: 15,
        alertoText: "Why is it so warm?",
        apple: "🌞",
        bgColorTable: "black",
        bgColor:"#ffd8ac",
        map: sunny
    }
  



]


let n = 0


// runs every turn
function maybeOpenDoor() {
    if (snake.level >= stages.length) {
        return
    }
    if (snake.score >= stages[snake.level].minScoretoGetDoor) {
        if (stages[snake.level].doorSymbol) {
            Graphics.door = stages[snake.level].doorSymbol
        }
        createDoor()
    }

     
    let enhancedCahnceforBonuStage = chanceForBonusStage + (snake.level)/10000
    if (Math.random() < enhancedCahnceforBonuStage && !isSecretDoorOpenAlready && !isTiny){
        createDoor(true)
        isSecretDoorOpenAlready = true
    }
}

function createDoor(isBonuStage = false) {
    const av = findAvailables();
    const door = isBonuStage? Graphics.bonusDoor : Graphics.door
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
    if (typeof(isBonuStage) == "string"){
      level = stages.find(stage => stage.levelName === isBonuStage) || bonusStages.find(stage => stage.levelName === isBonuStage)
    }

    if (level.apple) {
        Graphics.apple = level.apple
    }
    Graphics.emptys = level.tableEmptys || defaultValues.emptysCells
    Graphics.bgColor = level.bgColor || defaultValues.bgColor
    Graphics.bgColorTable = level.bgColorTable || defaultValues.bgColorTable
    if (level.map) {
        /// MUST Copy or it would touch the original variable and change the apples making it untranslatable
        const mapCopy = copy(level.map)
        levelMap = translateBonusMaps(mapCopy)
    } else {
        levelMap = genMap(level.rows, level.cols)
    }
   
    switchToNewMap(levelMap)
    if (isBonuStage){
        Graphics.disableSizeChange = true

    }
    if (!isBonuStage){snake.level += 1}
    maxApplesAtOnce = level.maxAppples || 0
    chanceForDivineFruit = level.chanceForDivineFruit || 0
    initialFps = level.level_fps || defaultValues.initialFps
    maxSpeed = level.maxSpeed || defaultValues.maxSpeed
    if(isBonuStage){
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
    nextTurn()
    pauseGame()

}


// get maps made with the GUI make them into normal maps with current Graphic Object
function translateBonusMaps(bMap) {
    const GUISymbols = {
        "🍏": "apple",
        "🍇": "divineFruit",
        "⬛": "emptys",
        "🟦": "wall",
        "🔑": "doorOutBonusStage"

    }

    for (let row = 0; row < bMap.length; row++) {
        for (let col = 0; col < bMap[row].length; col++) {
            const value = bMap[row][col]
            const translatedValue = Graphics[GUISymbols[value]]
            if (!translatedValue) {
                console.error(`I cannot translate ${value} from the map you made (in ${row}, ${col}) to a Graphic I know. Here are the Graphics that are available:\n ${Graphics}`)
            }
            bMap[row][col] = translatedValue
        }
    }
    return bMap

}




// /////////////////////////////////////////////////////////////////////////////////
// /                              C U S T O M       M A P                        ///
// /////////////////////////////////////////////////////////////////////////////////    

function getParam(key) {
    const queryString = window.location.href.split("?")[1]    ; // Remove the leading "?"
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
  

 const custoMap = getParam("m")
  if (custoMap){
    defaultValues.chanceForDivineFruit = 0
    defaultValues.maxApplesAtOnce = 0
    defaultValues.disableSizeChange = true
    map = translateBonusMaps(unzipMap(custoMap))
    
    custuMapasString = JSON.stringify(map)
    const colorB = getParam("b")
    const colorT = getParam("t")
    
    if (colorB && colorT){ //we need them to both exist and differ of "wall" will look bad bc its transparent
      defaultValues.bgColor = colorB
      defaultValues.bgColorTable = colorT
  
    }
    restart()
  }
  
  
  