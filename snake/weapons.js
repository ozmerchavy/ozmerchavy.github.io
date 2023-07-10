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
   
       }
}