const stages = [
    {
        levelName: "Tunnels",
        levelNo: 0,
        rows: 60,
        cols: 10,
        maxAppples: 25, 
        chanceForDivineFruit: .14,
        level_fps: 12,
        maxSpeed: 22 ,
        minScoretoGetDoor: 60,
        alertoText: "Get to 100 points for next stage",
        doorSymbol: "🚅", 
        tableEmptys: "🟫",
        bgColorTable: "#6d4534"
    
    },
    {
        levelName: "dizzy",
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
        tableEmptys: "⬛",

    }, 
    {
        levelName: "huge cave",
        levelNo: 2,
        rows: 200,
        cols: 20,
        maxAppples: 50, 
        chanceForDivineFruit: .1,
        level_fps: 10,
        maxSpeed: 22,
        minScoretoGetDoor: 140,
        alertoText: "The weird cave, get to 192 points for next stage",
        doorSymbol: "⛰",
        tableEmptys: "🟩",
        bgColorTable: "#00d26a"



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
        apple:"🍌",
        bgColorTable: "#f4e8b8"


    },
    {
        levelName: "Hell",
        levelNo: 4,
        rows: 35,
        cols: 35,
        maxAppples: 20, 
        chanceForDivineFruit: .01,
        level_fps: 8,
        maxSpeed: 26,
        minScoretoGetDoor: 202,
        alertoText: "Good luck and stuff",
        doorSymbol: "💀",
        tableEmptys: "💀",
        bgColor: "#910000",
        apple:"😭"


    }


]



// runs every turn
function maybeOpenDoor() {
    if (snake.level>= stages.length){
        return
    }
    if (snake.score >= stages[snake.level].minScoretoGetDoor) {
        if (stages[snake.level].doorSymbol){
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
 function nextStage() {
    const level = stages[snake.level]
    if (level.tableEmptys){
        Graphics.emptys = level.tableEmptys
    }
    if (level.bgColor){
        Graphics.bgColor = level.bgColor
    }
    else{
        Graphics.bgColor = defaultValues.bgColor
    }
    if (level.apple){
        Graphics.apple = level.apple
    }
    if (level.bgColorTable){
        Graphics.bgColorTable = level.bgColorTable
    }
    else {
        Graphics.bgColorTable = defaultValues.bgColorTable

    }


    switchToNewMap(level.rows, level.cols)
    snake.level += 1
    maxApplesAtOnce = level.maxAppples
    chanceForDivineFruit = level.chanceForDivineFruit
    initialFps = level.level_fps
    maxSpeed = level.maxSpeed
    alerto(`New Stage: ${level.levelName}!`, level.alertoText)
    nextTurn()
    pauseOrunpauseGame()

}


