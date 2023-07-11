const weapons = {
    gun:{
     image: "gun",
     bulletEmoji: "📍" ,
     speed: 2,
     emmo: 0,
     defaultEmmo: 4,
     breakWalls: false,
     extraFunctionWhenShot: ()=>{}

    },
    waterGun:{
        image: "water-gun",
        bulletEmoji: "💦" ,
        speed: 3,
        emmo: 0,
        defaultEmmo: 5,
        breakWalls: false,
        extraFunctionWhenShot: ()=>{
          
        }
   
       },
       huntingun:{
        image: "huntingun",
        bulletEmoji: "⬤" ,
        speed: 6,
        emmo: 0,
        defaultEmmo: 3,
        breakWalls: 1,
        extraFunctionWhenShot: ()=>{
            
        },
    },


        duck:{
            image: "duck",
            bulletEmoji: "🦆" ,
            speed: 2,
            emmo: 0,
            defaultEmmo: 1,
            breakWalls: false,
            extraFunctionWhenShot: (bullet)=>{  
                bullet.goPattern = "mostlyStraight"
                bullet.avoidWalls = true
                
            }
   
       },

       accordion: {
        image: "accordion",
        bulletEmoji: "🪗" ,
        speed: 2,
        emmo: 0,
        defaultEmmo: 2,
        breakWalls: 1,
        extraFunctionWhenShot: (bullet)=>{
            for (const side of ["right", "left"]){
                const loc = vec2dAdd(snake.snakeArray[0],getRightOrLeft(snake.currentDir,side))
                anotherbullet = createSnaka({head: weapons.accordion.bulletEmoji, cantEatApples: true, initialArray: [loc], 
                    isAppleWhenDies: false, revive: false, goPattern: "straight", currentDir: snake.currentDir, reviveAfter:0,
                    canKill: creaturesOnBoard, speed: bullet.speed, avoidWalls: false, diesIfTouchesSnake: false, diesWhenKills: true, breakWalls:bullet.breakWalls
                })
    
            }
          
        }

       },

       rocket: {
        image: "rocket",
        bulletEmoji: "🚀",
        speed: 3,
        emmo: 0,
        defaultEmmo: 1,
        breakWalls: 2,
        extraFunctionWhenShot:(r)=>{
            const target = creaturesOnBoard.filter(c=>c.canKill.includes(snake))[0]?.snakeArray[0]
            if (target){
                r.target = target
                r.goPattern = undefined
                r.targetEfficiency = 1
            }
       

       }},
       evilEye: {
        image: "evilEye",
        bulletEmoji: "🧿",
        speed: 2,
        emmo: 0,
        defaultEmmo: 3,
        breakWalls: 0,
        extraFunctionWhenShot:(r)=>{
            for (const side of ["right", "left"]){
                const directo = getRightOrLeft(snake.currentDir,side)
                const loc = vec2dAdd(snake.snakeArray[0],directo)
                anotherbullet = createSnaka({head: weapons.evilEye.bulletEmoji, cantEatApples: true, initialArray: [loc], 
                    isAppleWhenDies: false, revive: false, goPattern: "straight", currentDir: directo, reviveAfter:0,
                    canKill: creaturesOnBoard, speed: r.speed, avoidWalls: false, diesIfTouchesSnake: false, diesWhenKills: true, breakWalls:r.breakWalls
                })
                
            }
            killObj(r)

}


}}






function testWeapons(){
    Object.values(weapons).forEach(w=> w.emmo = 20)
    snake.equipment = Object.values(weapons)
}
