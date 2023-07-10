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

    //    bomb: {
    //     image: "bomb",
    //         bulletEmoji: "💣" ,
    //         speed: 2,
    //         emmo: 0,
    //         defaultEmmo: 5,
    //         breakWalls: 0,
    //         extraFunctionWhenShot: (bullet)=>{
    //             const currentCreatures = creaturesOnBoard.slice(0,-1)
    //             const boom = findNeighbors(bullet.snakeArray[0]) 
    //             boom.forEach(x=>{createSnaka({initialArray:x,body: "🦽", head:"🦽", canKill: currentCreatures, diesWhenKills:true, isAppleWhenDies:false, speedFactor: 0, cantEatApples:true, breakWalls: 2})})
    //             killObj(bullet)
                
    //         }
   
    //    }
       
}