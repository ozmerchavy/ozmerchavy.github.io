let i = await fetch("https://this-person-does-not-exist.com/en")

let y = await i.text()

console.log(y);


