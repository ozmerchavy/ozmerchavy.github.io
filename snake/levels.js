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
        tableEmptys: "🟫",
        bgColorTable: "#6d4534"

    },
    {
        levelName: "Dizzy",
        levelNo: 1,
        rows: 22,
        cols: 19,
        maxAppples: 20,
        chanceForDivineFruit: .2,
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
        rows: 200,
        cols: 20,
        maxAppples: 55,
        chanceForDivineFruit: .15,
        level_fps: 11,
        maxSpeed: 22,
        minScoretoGetDoor: 140,
        alertoText: "The weird cave, get to 192 points for next stage",
        doorSymbol: "⛰",
        tableEmptys: "🟩",
        bgColorTable: "#078b4a",
        apple: "🍓"


    },
    {
        levelName: "Banana World",
        levelNo: 3,
        rows: 20,
        cols: 20,
        maxAppples: 2,
        chanceForDivineFruit: .01,
        level_fps: 20,
        maxSpeed: 23,
        minScoretoGetDoor: 192,
        alertoText: "In the Banana world it is hard to even eat one banana. you need to get to 202 to get out.",
        doorSymbol: "🍌",
        tableEmptys: "🟨",
        bgColor: "#5c521b",
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
        rows: 20,
        cols: 20,
        maxAppples: 35,
        chanceForDivineFruit: .01,
        level_fps: 10,
        maxSpeed: 20,
        minScoretoGetDoor: 230,
        alertoText: "Here is heaven, enjoy!",
        doorSymbol: "☁️",
        bgColorTable: "#f4cfd3 ",
        apple: "🌈"

    }


]

  
const bonusStages = [{
        levelName: "Dragons",
        minScoretoGetDoor: 60,
        level_fps: 12,
        maxSpeed: 15,
        alertoText: "Get to 100 points for next stage",
        doorSymbol: "🚅",
        tableEmptys: "",
        bgColorTable: "#a7d1d6",
        map: BonusExample

    }]


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
}

function createDoor() {
    const av = findAvailables();
    if (!map.flat().includes(Graphics.door)) {
        const ranSpot = av[Math.floor(Math.random() * av.length)];
        updateMap(ranSpot, Graphics.door)
    }
}


// / called once a  door is entered
function newStage(isBonuStage = false) {
    let level
    let levelMap
    if (isBonuStage) {
        level = choice(bonusStages)
    } else {
        level = stages[snake.level]

    }

    if (level.apple) {
        Graphics.apple = level.apple
    }
    Graphics.emptys = level.tableEmptys || defaultValues.emptysCells
    Graphics.bgColor = level.bgColor || defaultValues.bgColor
    Graphics.bgColorTable = level.bgColorTable || defaultValues.bgColorTable
    if (level.map) {
        levelMap = translateBonusMaps(level.map)
    } else {
        levelMap = genMap(level.rows, level.cols)
    }
    switchToNewMap(levelMap)
    snake.level += 1
    maxApplesAtOnce = level.maxAppples || 0
    chanceForDivineFruit = level.chanceForDivineFruit || 0
    initialFps = level.level_fps || defaultValues.initialFps
    maxSpeed = level.maxSpeed || defaultValues.maxSpeed
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
        "⬜️": "nothing"

    }

    for (let row = 0; row < bMap.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const value = bMap[row][col]
            const translatedValue = Graphics[GUISymbols[value]]
            if (!translatedValue) {
                console.error(`I cannot translate ${value} from the map you made to a Graphic I know. Here are the Graphics that are available:\n ${Graphics}`)
            }
            bMap[row][col] = translatedValue
        }
    }
    say(bMap)
    return bMap

}


