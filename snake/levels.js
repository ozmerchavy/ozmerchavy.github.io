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
        newGraphics: "🟫"
    
    },
    {
        levelName: "dizzy",
        levelNo: 0,
        rows: 22,
        cols: 19,
        maxAppples: 20, 
        chanceForDivineFruit: .2,
        level_fps: 20,
        maxSpeed: 27,
        minScoretoGetDoor: 100,
        alertoText: "Try to get to 140 points",
        doorSymbol: "🎡",
        newGraphics: "⬛"

    }, 
    {
        levelName: "huge cave",
        levelNo: 0,
        rows: 200,
        cols: 20,
        maxAppples: 50, 
        chanceForDivineFruit: .1,
        level_fps: 10,
        maxSpeed: 22,
        minScoretoGetDoor: 140,
        alertoText: "The weird cave",
        doorSymbol: "⛰",
        newGraphics: "🟩"


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
    if (level.newGraphics){
        Graphics.emptys = level.newGraphics
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


