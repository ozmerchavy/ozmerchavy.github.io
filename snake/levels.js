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
                    alerto(`Try to get to 140 points`, `You have a saved game with ${saves} saves! you can get there any time if you click Q`)

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
        alertoText: "You are literally addicated if you made it here, you need help and 400 points.",
        doorSymbol: "🌱",
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
        alertoText: "The aliens are giving you one extra life!! ❤️ you need 500 points",
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
        maxAppples: 25,
        chanceForDivineFruit: .008,
        level_fps: 12,
        maxSpeed: 25,
        minScoretoGetDoor: 500,
        alertoText: "You got to a different world. (Get 562 points)",
        doorSymbol: "🏕️ ",
        bgColorTable: "#5f5f4477",
        apple: "✨",
        bgImage: "anotherWorld",
        map: anotherWorldMap
    }, {
        levelName: "First Love",
        levelNo: 9,
        rows: 40,
        cols: 40,
        maxAppples: 50,
        chanceForDivineFruit: .02,
        level_fps: 8,
        maxSpeed: 20,
        minScoretoGetDoor: 562,
        alertoText: "Welcome to a very special level",
        doorSymbol: "💜",
        apple: "💖",
        bgColorTable: "#674264",
        bgColor: "#2d0b1b",
        stageFunctionRunOnce: () => {
            window.snaka = createSnaka({body: "🌺", head: "🏵️"})

        },
        stageFunctionEveryTurn: () => {
            if (time == 5) {
                specialerto("This is snaka", "She is very shy, and very hungry. Your goal is to let her eat 31 apples. Every time you touch her she will start over", 140, 0, 30)
            }
            if (window.snaka.snakeArray.length > 31 && !snaka.isDead) {
                pauseGame()
                let stringIftheWerentSavedbefore = ""
                if (!localStorage.getItem("saved_game")) {
                    stringIftheWerentSavedbefore = "when you die and restart, you will be instructed in tunnel stage regarding SAVES."
                }

                alerto("Snaka is so happy!", `thanks for keeping her safe. She gave you ❤️, her score, and TWO SAVES to space level. ${stringIftheWerentSavedbefore} Keep going now to 650!`)
                addLife()
                saveGame(2, 8, 400)
                for (const ij of snaka.snakeArray) {
                    updateMap(ij, Graphics.apple);
                }
                window.snaka.isDead = true
                snake.score += 31
            }


        }

    },{
        levelName: "Big Game",
        levelNo: 9,
        rows: 50,
        cols: 50,
        maxAppples: 40,
        chanceForDivineFruit: .14,
        level_fps: 12,
        maxSpeed: 24,
        minScoretoGetDoor: 650,
        alertoText: "Get to 750 points for next stage",
        doorSymbol: "🚅",
        stageFunctionRunOnce: () => {
            localStorage.setItem("saved_game", JSON.stringify(snake))
        }

    }, {
        levelName: "Jail",
        levelNo: 10,
        maxAppples: 0,
        chanceForDivineFruit: 0,
        level_fps: 8,
        maxSpeed: 20,
        minScoretoGetDoor: 750,
        alertoText: "How did we end up here??",
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
                targetEfficiency: 0.2
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
                alerto("You saved snaka!!", `Thanks for keeping her safe. She gave you a ❤️, 50 points, and THREE SAVES to space level.  Keep going now! you need 850 points`)
                killSNAKA(snaka, true)
                maxApplesAtOnce = 20
                addLife()
                saveGame(3, 8, 400)
                snake.score += 50
            }


        }
    }, {

        levelName: "On the Run",
        levelNo: 11,
        rows: 10,
        cols: 200,
        maxAppples: 0,
        level_fps: 12,
        maxSpeed: 20,
        minScoretoGetDoor: 850,
        alertoText: "The police is after Snaka. RUN! You will win if Snaka gets to the other side. She's following you. Don't hesitate to shoot the police!",
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
        maxGunsinGame: 5,
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
                speedFactor: 0.125,
                currentDir: [0, 1]
            })
            window.cop1 = createSnaka({
                head: "🚨",
                body: "🚨",
                cantEatApples: true,
                isAppleWhenDies: true,
                diesIfTouchesSnake: false,
                initialArray: [
                    [
                        9, 9
                    ],
                    [
                        9, 8
                    ]
                ],
                goPattern: undefined,
                targetEfficiency: 0.3,
                speedFactor: 0.5, 
                hasBackup: false,
                canKill: [snaka]
            })
            window.cop2 = createSnaka({
                head: "🚨",
                body: "🚨",
                isAppleWhenDies: true,
                cantEatApples: true,
                diesIfTouchesSnake: false,
                initialArray: [
                    [
                        4, 131
                    ],
                    [
                        4, 132
                    ]
                ],
                goPattern: undefined,
                targetEfficiency: 0.3,
                speedFactor: 0.5, 
                hasBackup: false,
                canKill: [snaka]
            }),
            window.cop3 = createSnaka({
                head: "🚨",
                body: "🚨",
                isAppleWhenDies: true,
                cantEatApples: true,
                diesIfTouchesSnake: false,
                initialArray: [
                    [
                        4, 171
                    ],
                    [
                        4, 172
                    ],
                    [
                        4, 173
                    ],

                ],
                goPattern: undefined,
                targetEfficiency: 0.3,
                speedFactor: 0.5, 
                hasBackup: false,
                canKill: [snaka]
            })
            window.cop4 = createSnaka({
                head: "🚨",
                body: "🚔",
                cantEatApples: true,
                isAppleWhenDies: false,

                diesIfTouchesSnake: false,
                initialArray: [
                    [
                        3, 185
                    ],
                    [
                        3, 186
                    ],
                    [
                        3, 187
                    ],
                    [3,188]
                ],
                goPattern: undefined,
                targetEfficiency: 0.4,
                speedFactor: 0.125,
                hasBackup: true,
                canKill: [snaka]
            }),
            window.cops = [cop1,cop2, cop3, cop4]
        },

        stageFunctionEveryTurn: () => {
            if (time == 1){
                pauseGame()
                addLife()
                addLife()
                alerto("You get two ❤️", "The police cannot harm you but they can kill Snaka and set her back")
            }
           
            for (const cop of window.cops){
                if (cop.isDead){
                    snake.score += 5
                    window.cops.splice(window.cops.indexOf(cop),1)
                }
                cop.target = snaka.snakeArray[1]
                
            }
            if (snaka.snakeArray[0][1] > 190){
                pauseGame()
                alerto("you and Snaka managed to escape!", "you get 2 saves to this very state!")
                saveGame(2)
                newStage()
            }
        

        }

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

    if (level.chanceForGuns){
        chanceforGuns = level.chanceForGuns
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
    targetEfficiency = 1,
    speedFactor = 1,
    isAppleWhenDies = true,
    hasBackup = true,
    canKill = [],
    avoidWalls = true,
    diesWhenKills = false
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
        speedFactor,
        canKill,
        avoidWalls,
        diesWhenKills
    };
    if (hasBackup) {
        snaka.backup = copy(snaka)
    }

    if (initialArray) {
        snaka.snakeArray = initialArray;
    }
    creaturesOnBoard.push(snaka)
    return snaka;
}


// this function moves a SNAKA after it is created, needs to run every turn
function moveSNAKA(snaka, diretion = undefined, justOnce = false) {
    if (snaka.isDead) {
        return
    }

    if (snaka.speedFactor != 1) {
        if (snaka.speedFactor < 1) {
            const sleepEvery = Math.round(1 / snaka.speedFactor)
            if (time % sleepEvery == 0) {
                return
            } 
        }
        else if (!justOnce) {
            for (let i = 0; i < snaka.speedFactor; i++) {
                moveSNAKA(snaka, undefined, true)
            }
        }

    }

    if (diretion == "straight" || snaka.goPattern == "straight") { // do nothing to currentdir
    } else if (diretion == "right" || diretion == "left") {
        snaka.currentDir = __rotateSNAKA(snaka.currentDir, diretion);
    } else if (snaka.goPattern == "imitate") {

        if (!String(snake.snakeArray).includes(String(snaka.snakeArray[0]))) { // if imitates snake, braking the imitate if he touches her to avoid colliding
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


    const headloc = snaka.snakeArray[0];
    const newHead = vec2dAdd(headloc, snaka.currentDir);
    const newHeadContent = map[newHead[0]] ?. [newHead[1]];

    for (let obj of snaka.canKill){
        if (creaturesOnBoard.includes(obj) && obj != snaka){
            if (String(obj.snakeArray).includes(headloc)){
                killSNAKA(obj)
                if (snaka.diesWhenKills){
                    killSNAKA(obj)
                }
            }
        }
   
    }

    // trying to avoid things
    if (newHeadContent === undefined || (newHeadContent == Graphics.wall || newHeadContent == Graphics.body)) {
        if (!snaka.avoidWalls){
            return killSNAKA(snaka)
        }
        moveSNAKA(snaka, choice(["right", "left"]), true)
        return
    }


    // snaka dies if you touch her
    if (snaka.diesIfTouchesSnake && JSON.stringify(snaka.snakeArray).includes(snake.snakeArray[0])) {
        return killSNAKA(snaka)
        
    }

    let newThingtoPut = Graphics.emptys
    if (newHeadContent.includes("img")){
        newThingtoPut = newHeadContent // preserving guns. practically it moves them to the back but thats ok I guess
    }
    snaka.snakeArray.unshift(newHead);
    if (snaka.cantEatApples || (newHeadContent != Graphics.apple)) {
        const lastPos = snaka.snakeArray.pop();
        updateMap(lastPos, newThingtoPut ); 
    }


    for (const ij of snaka.snakeArray) {
        updateMap(ij, snaka.body);
    }
    updateMap(newHead, snaka.head);


}


function killSNAKA(snaka, noParole = false) {

    let insteadies

    if (snaka.isAppleWhenDies) {
        insteadies = Graphics.apple
    } else 
        (insteadies = Graphics.emptys)

    

    for (const ij of snaka.snakeArray) {
        if (!snake.snakeArray.includes(ij)) {
            updateMap(ij, insteadies)
        };
        snaka.isDead = true
    }

    if (! noParole && snaka.backup) {
        snaka.snakeArray = copy(snaka.backup.snakeArray)
        snaka.currentDir = snaka.backup.currentDir
        snaka.isDead = false
    } else {
        let indexToRemove = creaturesOnBoard.indexOf(snaka);
        // Step 2: Remove the object from the array
        if (indexToRemove > -1) {
            creaturesOnBoard.splice(indexToRemove, 1);
        }


    }

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
        isAppleWhenDies: false, hasBackup: false, goPattern: "straight", currentDir: snake.currentDir, 
        canKill: creaturesOnBoard, speedFactor: gun.speed, avoidWalls: false, diesIfTouchesSnake: false, diesWhenKills: true
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
// /                         O T H E R    F U N C T I O N S                      ///
// /////////////////////////////////////////////////////////////////////////////////

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
