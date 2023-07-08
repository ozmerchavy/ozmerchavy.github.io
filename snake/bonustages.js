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
    }, {
        levelName: "Underwater Adventure",
        level_fps: 7,
        maxSpeed: 15,
        alertoText: "Dive into the depths of the ocean!",
        bgColorTable: "#b3d1ff",
        bgColor: "#0e2072",
        apple: "🐠",
        map: oceanmap
    }, {
        levelName: "Acropolis",
        level_fps: 9,
        maxSpeed: 14,
        alertoText: "It is a blast from the past",
        bgColorTable: "#0e157c",
        bgColor: "#dfd8d8",
        apple: "🥙",
        map: temple
    }


]
