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
        stageFunctionRunOnce: () => {
            if (localStorage.getItem("saved_game")) {
                const saves = JSON.parse(localStorage.getItem("saved_game")).saves
                if (saves > 0) {
                    pauseGame()
                    alerto(`Welcome to ${stages[0].levelName} Stage!`, `${stages[0].alertoText}.\nYou have a saved game with ${saves} saves! you can get there any time if you click Q`)

                }
            }
        }


    },
    {
        levelName: "Dizzy",
        levelNo: 1,
        rows: 22,
        cols: 19,
        maxAppples: 20,
        chanceForDivineFruit: .28,
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
        alertoText: "The weird cave, get to 200 points for next stage",
        doorSymbol: "⛰",
        tableEmptys: "⬛",
        bgColorTable: "#191f03",
        apple: "🍓"


    },
   
     {
        levelName: "Hell",
        levelNo: 4,
        rows: 40,
        cols: 40,
        maxAppples: 20,
        chanceForDivineFruit: .01,
        level_fps: 10,
        maxSpeed: 26,
        minScoretoGetDoor: 200,
        alertoText: "Good luck and stuff. You could be saved very shortly, look for the rainbow, you only need 220 points.",
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
        minScoretoGetDoor: 220,
        alertoText: "Here is heaven, enjoy! and get to 300 points(!!) it is possible with bonus stages",
        doorSymbol: "☁️",
        apple: "🌈",
        bgColorTable: "#513538 "

    }, {
        levelName: "Outer Space!",
        levelNo: 6,
        rows: 50,
        cols: 50,
        maxAppples: 50,
        chanceForDivineFruit: .01,
        level_fps: 12,
        maxSpeed: 25,
        minScoretoGetDoor: 300,
        alertoText: "The aliens are giving you one extra life!! ❤️ you need 360 points",
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
        levelNo: 7,
        maxAppples: 25,
        chanceForDivineFruit: .008,
        level_fps: 12,
        maxSpeed: 25,
        minScoretoGetDoor: 360,
        alertoText: "You got to a different world. (Get 415 points)",
        doorSymbol: "🏕️ ",
        bgColorTable: "#5f5f4477",
        apple: "✨",
        bgImage: "anotherWorld",
        map: anotherWorldMap
    }, {
        levelName: "First Love",
        levelNo: 8,
        rows: 40,
        cols: 40,
        maxAppples: 50,
        chanceForDivineFruit: .02,
        level_fps: 8,
        maxSpeed: 20,
        minScoretoGetDoor: 415,
        alertoText: "Welcome to a very special stage",
        doorSymbol: "💜",
        apple: "🌿",
        bgColorTable: "#674264",
        bgColor: "#2d0b1b",
        stageFunctionRunOnce: () => {
            window.snaka = createSnaka({body: "🌺", head: "🏵️"})

        },
        stageFunctionEveryTurn: () => {
            if (time == 5) {
                specialerto("This is snaka", "She is very shy, and very HUNGRY for WEED. Your goal is to let her eat 31 WEEDs. Every time you touch her she will start over", 140, 0, 30)
                Graphics.disableSizeChange =  true

            }
            if (window.snaka.snakeArray.length > 31 && !snaka.isDead) {
                pauseGame()
                let stringIftheWerentSavedbefore = ""
                if (!localStorage.getItem("saved_game")) {
                    stringIftheWerentSavedbefore = "when you die and restart, you will be instructed in tunnel stage regarding SAVES."
                }

                alerto("Snaka is so happy!", `thanks for keeping her safe. She gave you ❤️, her score, and TWO SAVES to space level. ${stringIftheWerentSavedbefore} Keep going now to 500!`)
                addLife()
                saveGame(2, 8, 400)
                for (const ij of snaka.snakeArray) {
                    updateMap(ij, Graphics.apple);
                }
                window.snaka.isDead = true
                snake.score += 31
            }


        }

    }, {
        levelName: "Jail",
        levelNo: 9,
        maxAppples: 0,
        chanceForDivineFruit: 0,
        level_fps: 8,
        maxSpeed: 20,
        minScoretoGetDoor: 500,
        alertoText: "OH NO! Snaka got caught eating weed from the previous stage! it is YOUR fault! You got to get her out of jail",
        doorSymbol: "🔗",
        apple: "🚬",
        bgColorTable: "#211212",
        bgColor: "#473e3e",
        map: jail,
        stageFunctionRunOnce: () => {
            window.snaka = createSnaka({
                body: "🌺",
                head: "🏵️",
                cantEatApples: true,
                diesIfTouchesSnake: false,
                initialArray: [
                    [
                        32, 3
                    ],
                    [
                        33, 3
                    ],
                    [
                        34, 3
                    ]
                ],
                target: "snake",
                targetEfficiency: 0.04
            })
        },
        stageFunctionEveryTurn: () => {
            if (time == 7) {
                specialerto("Snaka is stuck!", "We got to save her!", 450, -250, 40, {
                    title: "Use the divine fruits",
                    msg: "",
                    x: 630,
                    y: 430,
                    size: 42
                })

            }
            if (time == 8) {
                Graphics.disableSizeChange = true

            }
            if (!window.snaka.isDead && (window.snaka.snakeArray[0][0] < 6 || window.snaka.snakeArray[0][1] > 4)) {
                pauseGame()
                alerto("You saved snaka!!", `Thanks for keeping her safe. She gave you a ❤️, 50 points, and THREE SAVES to space level.  Keep going now! you need 610 points`)
                killObj(snaka, true)
                maxApplesAtOnce = 25
                chanceForDivineFruit = 0.26
                addLife()
                saveGame(3, 8, 400)
                snake.score += 50
            }


        }
    }, {

        levelName: "On the Run",
        levelNo: 10,
        rows: 14,
        cols: 200,
        maxAppples: 0,
        level_fps: 12,
        maxSpeed: 20,
        minScoretoGetDoor: 610,
        alertoText: "The police is after Snaka. Rules:\n  You win if Snaka gets to the right edge. She's following you. \n If you touch her or the cops, nothing happens, but when they get her she dies and goes back to the start",
        doorSymbol: "🦌",
        apple: choice(foods),
        bgColorTable: "#02290C",
        bgImage: "run",
        bgColor: "#000000",
        customSnakeArr: [
            [
                3, 2
            ],
            [
                3, 3
            ],
            [
                3, 4
            ]
        ],
        customSnakeDir: [
            0, 1
        ],
        disableRotation: true,
        chanceForGuns: 0.1,
        maxGunsinGame:  7,
        availableGuns: Object.values(weapons).slice(0,5),
        stageFunctionRunOnce: () => {
           
            document.querySelector("table").style.setProperty("--transX", 20 * 100)
            window.snaka = createSnaka({
                body: "🌺",
                head: "🏵️",
                cantEatApples: true,
                diesIfTouchesSnake: false,
                isAppleWhenDies: false,
                initialArray: [
                    [
                        5, 2
                    ],
                    [
                        5, 3
                    ],
                    [
                        5, 4
                    ]
                ],
                target: "snake",
                targetEfficiency: 0.13,
                speed: 0.75,
                currentDir: [0, 1]
            })
            window.cop1 = createCop([[ 9, 9],[9, 8]], [snaka])
            window.cop2 = createCop([[ 4, 131],[4, 132]], [snaka])
            window.cop3 = createSuperCop([[4, 171],[4, 172],[4, 173],], [snaka])
            window.cop4 = createSuperCop([[3, 185],[3, 186],[3, 187],[3,188]], [snaka])
      
            window.cops = [cop1,cop2, cop3, cop4]
            window.timeWon = undefined

        },

        stageFunctionEveryTurn: () => {
            if (time == 1){
                pauseGame()
                addLife()
                addLife()
                alerto("You get two ❤️", "Don't hesitate to shoot the cops!")
            }
           
            for (const cop of window.cops){
                cop.target = snaka.snakeArray[1]
                
            }
            if ((snaka.snakeArray[0][1] > 185) &&  !window.timeWon){
                pauseGame()
                alerto("you and Snaka managed to escape!", "you get 2 saves to this very state!")
                saveGame(2)
                window.timeWon = time  
            }
            if (window.timeWon && time == (timeWon+1)){
                newStage()

            }
        

        }

    },
    {
        levelName: "First Date",
        levelNo: 11,
        rows: 45,
        cols: 45,
        maxAppples: 30,
        chanceForDivineFruit: 0.005,
        level_fps: 12,
        maxSpeed: 20,
        minScoretoGetDoor: 1000, // bc it is not how you get to that stage.
        alertoText: "It's your first date! Collect 710 points to proceed. Rules:\n Do not touch Snaka! You would die\n You get her points as well",
        doorSymbol: "🎥",
        apple: "🍿",
        stageFunctionRunOnce: () => {
            window.snaka = createSnaka({
                body: "🌺",
                head: "🏵️",
                cantEatApples: false,
                diesIfTouchesSnake: true,
                isAppleWhenDies: false,
                revive: true,
                reviveAfter: 0,
                initialArray: [
                    [
                        22, 21
                    ],
                    [
                        23, 21
                    ],
                    [
                        24, 21
                    ]
                ],
                currentDir: directsVecs.down,
               goPattern: "mirror",
               getPointsforApplesEaten: true,
            })

        },
        stageFunctionEveryTurn:()=>{
            if (snaka.isDead){
                reduceLife()
            }
        }
    
    
    },
    {
        levelName: "Bank Stage",
        levelNo: 11,
        rows: 50,
        cols: 60,
        maxAppples: 30,
        chanceForDivineFruit: 0,
        level_fps: 10,
        maxSpeed: 13,
        minScoretoGetDoor: 710, 
        alertoText: "Crap! You do not have how to pay the movie, You guys have to rob the bank! Note: \nYou can touch snaka but must beware the security guards!\nThe hunting gun could break walls!",
        doorSymbol: "🏦",
        apple: "💵",
        bgColor: "#094408",
        bgColorTable: "black",
        availableGuns: [weapons.huntingun, weapons.gun, weapons.rocket],
        maxGunsinGame: 20,
        map: bank,
        disableRotation: true,
        customSnakeArr:[[48,24],[47,24], [46,24]],
    

        stageFunctionRunOnce: () => {
            window.bankRobbed = false
            document.querySelector("table").style.setProperty("--transX", 300)
            document.querySelector("table").style.setProperty("--transY", -500)
            window.snaka = createSnaka({
                body: "🌺",
                head: "🏵️",
                cantEatApples: false,
                diesIfTouchesSnake: false,
                isAppleWhenDies: true,
                getPointsforApplesEaten: true,
                revive: true,
                reviveAfter: 10,
                speed: 0.85,
                initialArray: [[48,22],[47,22], [46,22]],
                currentDir: directsVecs.up,
               target: "snake",
               targetEfficiency: 0.08,
               
            })
            window.securityGuy = createCop([[12,2], [12,3], [12,4],[12,5],[12,6]], [snaka, snake], "⚙️")
            window.securityGuy2 = createCop([[10,2], [10,3], [10,4],[10,5]], [snaka, snake], "⚙️")
            window.securityGuy.target = "snake"
            window.securityGuy2.target = "snake"
            window.banker1 = createCitizon("🫣", "🫣", [[5,23],[5,24],[5,25]], [11,67])
            window.banker2 = createCitizon("🫣", "🫣", [[5,15],[5,14],[5,16]], [11,63])
            window.banker3 = createCitizon("🫣", "🫣", [[5,6],[5,5],[5,4]], [11,65])

        },
        stageFunctionEveryTurn:()=>{
            if (bankRobbed && !isGodMode){
                newStage()
            }

            if (time>30 && snake.snakeArray[0][0]>36&&snake.snakeArray[0][1]>49){
                bankRobbed = true
            }
        }
    
    },

    {
        levelName: "Second Date - Picnic",
        levelNo: 12,
        rows: 30,
        cols: 30,
        maxAppples: 30,
        chanceForDivineFruit: 0.005,
        level_fps: 13,
        maxSpeed: 20,
        minScoretoGetDoor: 800, // it is not how you get to that stage though. We assume about almost 800 by now.
        alertoText: "Congrats for breaking into the bank locks! You and Snaka can enjoy some mice in your picnic 🧺. Don't Worry, you can touch Snaka now, she does not mind.\nGet to 890 points.",
        doorSymbol: "🧺",
        apple: "🐁",
        bgImage: "picnic",
        bgColorTable: "black",
        stageFunctionRunOnce: () => {
            window.snaka = createSnaka({
                body: "🌺",
                head: "🏵️",
                cantEatApples: false,
                diesIfTouchesSnake: false,
                isAppleWhenDies: false,
                revive: true,
                reviveAfter: 0,
                initialArray: [
                    [
                        22, 21
                    ],
                    [
                        23, 21
                    ],
                    [
                        24, 21
                    ]
                ],
                currentDir: directsVecs.down,
               getPointsforApplesEaten: true,
            })

        },
 
        
    
    
    },

    {
        levelName: "Back home",
        levelNo: 13,
        rows: 40,
        cols: 40,
        maxAppples: 16,
        chanceForDivineFruit: .2,
        level_fps: 11,
        maxSpeed: 23,
        minScoretoGetDoor: 890,
        alertoText: "Time to show Snaka home, but beware of the cops, tey are everywhere! Get to 960 points",
        doorSymbol: "🏠",
        maxGunsinGame: 3,
        apple: choice(foods),
        stageFunctionRunOnce: ()=>{
            window.snaka = createSnaka({
                body: "🌺",
                head: "🏵️",
                cantEatApples: false,
                diesIfTouchesSnake: false,
                isAppleWhenDies: false,
                revive: true,
                reviveAfter: 0,
                initialArray: [
                    [
                        22, 21
                    ],
                    [
                        23, 21
                    ],
                    [
                        24, 21
                    ]
                ],
                currentDir: directsVecs.down,
               getPointsforApplesEaten: true,
            })
           
            window.cop1 = createSnaka({
                head: "🚨",
                body: "🚨",
                cantEatApples: true,
                isAppleWhenDies: true,
                diesIfTouchesSnake: false,
                initialArray: [[29,29],[29,28],[29,27]],
                goPattern: undefined,
                speed: 0.5, 
                revive: true,
                reviveAfter: 150,
                canKill: [snaka, snake]
            })        
            

        },

        stageFunctionEveryTurn: ()=>{
            if (snake.snakeArray.length>25){
                window.cop1.backup = undefined
            }
        }
    },

    {
        levelName: "Bachelor Party",
        levelNo: 14,
        maxAppples: 30,
        chanceForDivineFruit: .27,
        level_fps: 11,
        maxSpeed: 23,
        minScoretoGetDoor: 960,
        alertoText: "Snaka said YES!🌺🌺🏵️ you get a ❤️. Time to celebrate with friends. No special rules, and you may touch them. just dont hit the walls bc youre DRUNK!.",
        doorSymbol: "🎉",
        apple: "🍾",
        map: party,
        bgColorTable: "#130214de",
        bgColor: "transparent", 
        disableRotation: true,
        bgImage: "party",
        stageFunctionRunOnce: ()=>{
            createCitizon("☸️","🌀", [[0,1],[0,2],[0,3],[0,4]], undefined)    
            createCitizon("🕰️","🌀", [[0,1],[0,2],[0,3],[0,4]], undefined) 
            createCitizon("🐽","🌀", [[0,1],[0,2],[0,3],[0,4]], undefined) 
            createCitizon("🌹","🌀", [[0,1],[0,2],[0,3],[0,4]], undefined) 
            window.curretRotation = 1
            addLife()
            

        },
        stageFunctionEveryTurn: ()=>{
          if (time % 150 == 0){
            window.curretRotation = window.curretRotation*-1
          }
            let ro = document.querySelector("table").style.getPropertyValue("--rotation");
            document.querySelector("table").style.setProperty("--rotation", Number(ro) + 3*window.curretRotation);  
          }

        },
  


    

    
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

    let enhancedCahnceforBonuStage = chanceForBonusStage + (0.0003 / (Math.abs(20 - snake.level)))
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
        if (snake.level>= stages.length){
            level = choice(bonusStages)

        }
        else {
            level = stages[snake.level]

        }
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

    let customSnakeArr = false
    let customSnakeDir = false

    if (level.customSnakeArr) {
        customSnakeArr = level.customSnakeArr
    }
    if (level.customSnakeDir) {
        customSnakeDir = level.customSnakeDir
    }
    switchToNewMap(levelMap, customSnakeArr, customSnakeDir)
    if (isBonuStage) {
        Graphics.disableSizeChange = true

    }
    if (level.disableRotation) {
        Graphics.disableRotation = true

    }
    if (! isBonuStage) {
        snake.level += 1
    }

    if (level.chanceForGuns || level.maxGunsinGame){
        chanceforGuns = level.chanceForGuns || 0.05
        availableGuns = level.availableGuns || Object.values(weapons)
        maxGunsinGame = level.maxGunsinGame || 3

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
    if (level.stageFunctionEveryTurn) {
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
// /                          S N A K A   F U N C T I O N S                      ///
// /////////////////////////////////////////////////////////////////////////////////

// allows you to add another snakes to game, they move randomly for now
// this function rotates snake-like things, its a helper function
function __rotateSNAKA(currentDir, direction) {

    let rotateDir = direction == "right" ? [1, -1] : [-1, 1];
    return [
        currentDir[1] * rotateDir[0],
        currentDir[0] * rotateDir[1]
    ];
}

function createSnaka({
    body,
    head,
    cantEatApples = false,
    diesIfTouchesSnake = true,
    initialArray = false,
    currentDir = directsVecs.up,
    goPattern = undefined,
    target = undefined,
    targetEfficiency = 0.15,
    speed = 1,
    isAppleWhenDies = true,
    revive = true,
    reviveAfter = 0,
    canKill = [],
    avoidWalls = true,
    diesWhenKills = false,
    getPointsforApplesEaten = false,
    breakWalls = false,
    functionWhenDies = undefined,
    interactionInsteadOFKillingaCanKillObject = undefined

}) {
    const snaka = {
        body,
        head,
        currentDir,
        snakeArray: initialArray || [
            midMap, vec2dAdd(midMap, [1, 0]),
            vec2dAdd(midMap, [2, 0])
        ],
        goPattern,
        target,
        targetEfficiency,
        diesIfTouchesSnake,
        cantEatApples,
        isDead: false,
        isAppleWhenDies,
        speed,
        canKill,
        avoidWalls,
        diesWhenKills,
        reviveAfter,
        getPointsforApplesEaten,
        breakWalls,
        functionWhenDies,
        interactionInsteadOFKillingaCanKillObject
    };
    if (revive) {
        snaka.backup = copy(snaka)
    }

    if (initialArray) {
        snaka.snakeArray = initialArray;
    }
    creaturesOnBoard.push(snaka)
    return snaka;
}


// this function moves a SNAKA after it is created, needs to run every turn
function 
moveSNAKA(snaka, diretion = undefined, justOnce = false) {
    if (snaka.speed != 1  & snaka.speed !=0) {
        if (snaka.speed < 1) {
            if(snaka.speed<0.5){
                snaka.speed = 0.5
            }
            const sleepEvery = Math.round(1/(1-snaka.speed))
            if (time % sleepEvery ==0){
                return
            }
    
        }
        else if (!justOnce) {
            for (let i = 0; i < snaka.speed; i++) {
                moveSNAKA(snaka, undefined, true)
            }
        }

    }




  
    if (snaka.isDead) {
        if (snaka.backup && snaka.recentDeathTime){
            if (time > (snaka.recentDeathTime + snaka.reviveAfter)){
                revive(snaka)
            }
        }

        return
    }
    

    if (diretion == "straight" || snaka.goPattern == "straight") { // do nothing to currentdir
    } else if (diretion == "right" || diretion == "left") {
        snaka.currentDir = __rotateSNAKA(snaka.currentDir, diretion);
    } else if (snaka.goPattern == "imitate") {

        if (!checkCollision(snaka, snake)) { // if imitates snake, braking the imitate if he touches her to avoid colliding
            snaka.currentDir = snake.currentDir
        }


    } else if (snaka.goPattern == "mirror") {
        snaka.currentDir[0] = snake.currentDir[0] * -1
        snaka.currentDir[1] = snake.currentDir[1] * -1
    } 
    else if (snaka.goPattern == "mostlyStraight"){
        if (Math.random() > 0.99) {
            snaka.currentDir = __rotateSNAKA(snaka.currentDir, choice(["right", "left"]));
    
    }}
    
    else if (snaka.target) {

        if (snaka.targetEfficiency >= 1 || Math.random() <= snaka.targetEfficiency) {
            let target = snaka.target;
            if (target === "snake") {
                target = snake.snakeArray[snake.snakeArray.length - 1];
            }
            let path =  getDirection(snaka.snakeArray[0], target);
            if (!path){// happens only when reched destination
                snaka.target == undefined
                path = __rotateSNAKA(snaka.currentDir, choice(["right", "left"]));
            } 
            snaka.currentDir = path 

        }


    } else if (Math.random() > 0.92) {
        snaka.currentDir = __rotateSNAKA(snaka.currentDir, choice(["right", "left"]));

    }
    if (snaka.speed == 0){
        snaka.currentDir = [0,0]
    }
    

    const headloc = snaka.snakeArray[0];
    const newHead = vec2dAdd(headloc, snaka.currentDir);
  
    const newHeadContent = map[newHead[0]] ?. [newHead[1]];

    for (let obj of snaka.canKill){
        if ( !obj.isDead && obj != snaka){
            if (checkCollision(snaka, obj)){
                if (obj == snake){
                    if (!snake.isDead && !isGodMode){
                        reduceLife()
                    }
                
                } 
                
                else {
                    if (snaka.interactionInsteadOFKillingaCanKillObject){
                        snaka.interactionInsteadOFKillingaCanKillObject(obj)
                    }
                    else {
                        killObj(obj)
                    }

                }
                if (snaka.diesWhenKills){

                    return killObj(snaka)
                     
                }
            }
        }
   
    }

    if (snaka.breakWalls && newHeadContent == Graphics.wall ){
        snaka.breakWalls--
    }   

    
    // trying to avoid things
    else if (newHeadContent === undefined || (newHeadContent == Graphics.wall || newHeadContent == Graphics.body)) {
        if (snaka.avoidWalls &&  snaka.speed != 0 ){
            return moveSNAKA(snaka, choice(["right", "left"]), true)
        }
        else if (newHeadContent == Graphics.body && !snaka.diesIfTouchesSnake){
            // save her if she doesnt die from snake
        }
        else {

            return killObj(snaka)
        }
        
    }


    // snaka dies if you touch her
    if (snaka.diesIfTouchesSnake && checkCollision(snaka, snake)) {
        return killObj(snaka)
        
    }

    let newThingtoPut = Graphics.emptys
    if (newHeadContent.includes("img")){
        newThingtoPut = newHeadContent // preserving guns. practically it moves them to the back but thats ok I guess
    }
    snaka.snakeArray.unshift(newHead);
    if ((snaka.cantEatApples || (newHeadContent != Graphics.apple)) && !snaka.speed == 0) {
        const lastPos = snaka.snakeArray.pop();
        updateMap(lastPos, newThingtoPut ); 
    }
    else if (snaka.getPointsforApplesEaten && newHeadContent ==Graphics.apple){
        snake.score++
        
    }


    for (const ij of snaka.snakeArray) {
        
        updateMap(ij, snaka.body);
    }
    
    updateMap(newHead, snaka.head);


}


function killObj(obj, noParole = false) {
    if (obj.functionWhenDies){
        obj.functionWhenDies(obj)
    }
    if (obj.head == weapons.huntingun.bulletEmoji || obj.head == weapons.gun.bulletEmoji ){
    }

    obj.recentDeathTime = time
    obj.isDead = true
    let insteadies

    if (obj.isAppleWhenDies) {
        insteadies = Graphics.apple
    } else 
        (insteadies = Graphics.emptys)
    const checklist = obj.snakeArray


    for (const ij of checklist) {
        updateMap(ij, insteadies)
    }

    if (noParole || !obj.backup) { 
        let indexToRemove = creaturesOnBoard.indexOf(obj);
        if (indexToRemove > -1) {
            creaturesOnBoard.splice(indexToRemove, 1);
        }


    }

}


function revive(snaka){
        snaka.snakeArray = copy(snaka.backup.snakeArray)
        snaka.speed = snaka.backup.speed
        snaka.currentDir = snaka.backup.currentDir
        snaka.isDead = false
}


// /////////////////////////////////////////////////////////////////////////////////
// /                          W E A P O N S     F U N C T I O N S                ///
// /////////////////////////////////////////////////////////////////////////////////

// called every turn
function maybeCreateGun(){
    

    if (chanceforGuns && gunsinGame < maxGunsinGame){
        if (!localStorage.getItem("guns_were_explained") && time > 10){
            pauseGame()
            alerto("This level has guns!", "Click S to switch between them and A to shoot!")
            localStorage.setItem("guns_were_explained", JSON.stringify("explained!"))
        }
        
        if (Math.random() < chanceforGuns){
            const av = findAvailables();
            const gun = choice(availableGuns)
            updateMap(choice(av), `<img src="extra-media/${gun.image}.jpg">`)
            gunsinGame++
        }
    }

}

function shoot(gun){
    if (gun.emmo == 0){
        let indexToRemove = snake.equipment.indexOf(gun);
        // Step 2: Remove the object from the array
        if (indexToRemove > -1) {
            snake.equipment.splice(indexToRemove, 1);
        }
        
        return equip(indexToRemove-1)
    }
    const bullet = createSnaka({head: gun.bulletEmoji, cantEatApples: true, initialArray: [snake.snakeArray[0]], 
        isAppleWhenDies: false, revive: false, goPattern: "straight", currentDir: snake.currentDir, reviveAfter:0, 
        canKill: creaturesOnBoard, speed: gun.speed, avoidWalls: false, diesIfTouchesSnake: false, diesWhenKills: true, breakWalls:gun.breakWalls
    })

    updateMap(snake.snakeArray[0], Graphics.head)
    gun.extraFunctionWhenShot(bullet)
    gun.emmo--
    document.querySelector("#emmo").innerText = gun.bulletEmoji.repeat(gun.emmo)
}


function findGunByImage(image) {
    for (const weapon in weapons) {
      if (weapons.hasOwnProperty(weapon)) {
        const weaponObj = weapons[weapon];
        if (weaponObj.image === image) {
          return weaponObj;
        }
      }
    }
    return null; // Return null if no matching gun is found
  }
  
  function equip(idx){
    snake.currentlyEquipped = snake.equipment[idx]
    document.querySelector("#emmo").innerText = ""
    document.querySelector("#gun").src = ""
    if (snake.currentlyEquipped){
      const gun = snake.currentlyEquipped
      document.querySelector("#emmo").innerText = gun.bulletEmoji.repeat(gun.emmo)
      document.querySelector("#gun").src = `extra-media/${gun.image}.jpg`
    }
  
  }






// /////////////////////////////////////////////////////////////////////////////////
// /                          C U S T O M      B O T S                           ///
// /////////////////////////////////////////////////////////////////////////////////

function createCop(initialLocationArray, canKillArray, headBody ="🚨", revive=false){
    return createSnaka({
        head: headBody,
        body: headBody,
        cantEatApples: true,
        isAppleWhenDies: true,
        diesIfTouchesSnake: false,
        initialArray: initialLocationArray,
        goPattern: undefined,
        targetEfficiency: 0.4,
        speed: 0.75, 
        revive,
        canKill: canKillArray
    })
}



function createSuperCop(initialLocationArray,canKillArray, head = "🚨", body ="🚔" ){
    return createSnaka({
        head,
        body,
        cantEatApples: true,
        isAppleWhenDies: false,
        diesIfTouchesSnake: false,
        initialArray: initialLocationArray,
        goPattern: undefined,
        targetEfficiency: 0.6,
        revive: true,
        reviveAfter: 275,
        speed: 0.8,
        canKill: canKillArray
    })
}



function createCitizon(head, body, initialLocationArray, target){
    return createSnaka({
        head,
        body, 
        cantEatApples: true,
        initialArray: initialLocationArray,
        targetEfficiency: 0.5,
        revive: false,
        speed: 0.5,
        diesIfTouchesSnake: false,
        canKill:[],
        target
    })
}


// /////////////////////////////////////////////////////////////////////////////////
// /                         O T H E R    F U N C T I O N S                      ///
// /////////////////////////////////////////////////////////////////////////////////

function getRightOrLeft(currentDir, direction) {
    let rotateDir = direction == "right" ? [1, -1] : [-1, 1];

return [currentDir[1] * rotateDir[0], currentDir[0] * rotateDir[1]]}





function checkCollision(obj1, obj2) {
    for (let pos1 of obj1.snakeArray) {
      for (let pos2 of obj2.snakeArray) {
        if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
          return true;
        }
      }
    }
    return false;
  }

  function findNeighbors(coordinates) {
    const [x, y] = coordinates;
    const neighbors = [];
  
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && i < map.length && j >= 0 && j < map[0].length && !(i === x && j === y)) {
          neighbors.push([i,j]);
        }
      }
    }
  
    return neighbors;
  }
  
  
  
  

// (saves only level and score)
function saveGame(saves = 2, specificLevel = false, specificScore = false) {
    const retrieved = localStorage.getItem("saved_game")
    if (retrieved) {
        const retrievedData = JSON.parse(retrieved)
        saves += Number(retrievedData.saves)
    }
    localStorage.setItem("saved_game", JSON.stringify({
        score: specificScore || snake.score,
        level: specificLevel || snake.level,
        lives: snake.life,
        equipment: snake.equipment,
        saves: saves
    }))
}

function retrieveGame() {
    const retrieved = localStorage.getItem("saved_game")
    if (! retrieved) {
        return
    }

    const retrievedData = JSON.parse(retrieved)
    if (Number(retrievedData.saves) == 0) {
        pauseGame()
        alerto("No saves", "You are out of saves! try to earn them!")
        return

    }
    snake.equipment = retrievedData.equipment
    snake.score = Number(retrievedData.score)
    snake.life = Number(retrievedData.lives)
    document.querySelector("#life").innerText = "❤️".repeat(snake.life - 1)
    if (retrievedData.level >= 0) {
        
        snake.level = retrievedData.level - 1 // becuase we now do nextstage which adds back a level
        localStorage.setItem("saved_game", JSON.stringify({
            score: Number(retrievedData.score),
            level: Number(retrievedData.level),
            lives: snake.life,
            equipment: snake.equipment,
            saves: Number(retrievedData.saves) - 1,
        }))

        newStage()

    }


}


function specialerto(title, msg, x, y, size, nextAlerto = undefined) {
    pauseGame();

    const taboole = document.querySelector("table");
    const currentStyles = {
        transX: taboole.style.getPropertyValue("--transX"),
        transY: taboole.style.getPropertyValue("--transY"),
        size: taboole.style.getPropertyValue("--size"),
        go: taboole.style.getPropertyValue("--go")
    };

    taboole.style.setProperty("--transX", x);
    taboole.style.setProperty("--transY", y);
    taboole.style.setProperty("--size", size);
    taboole.style.setProperty("--go", 0);

    window.isInSpecialerto = true;
    window.nextAlertoObj = nextAlerto;

    alerto(title, msg);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (window.isInSpecialerto) {
            const alertoElement = document.querySelector(".alerto");
            alertoElement.removeEventListener("submit", formSubmitHandler);
            alertoElement.removeAttribute("open");

            taboole.style.setProperty("--transX", currentStyles.transX);
            taboole.style.setProperty("--transY", currentStyles.transY);
            taboole.style.setProperty("--go", currentStyles.go);
            taboole.style.setProperty("--size", currentStyles.size);

            if (!window.nextAlertoObj) {
                window.isInSpecialerto = false;
            } else {
                const nextAlerto = window.nextAlertoObj;
                specialerto(nextAlerto.title, nextAlerto.msg, nextAlerto.x, nextAlerto.y, nextAlerto.size, nextAlerto.nextAlerto);
            }
        }
    };

    const alertoForm = document.querySelector(".alerto");
    if (alertoForm) {
        alertoForm.addEventListener("submit", formSubmitHandler);
    }
}

