function range(n) {
    return [...Array(n).keys()];
}

function findMid(map) {
    return [
        Math.round(map.length / 2),
        Math.round(map[0].length / 2)
    ];
}
function genMap(rows, cols) {
    let map = [];
    for (let i = 0; i < rows; i++) {
        map.push([]);
        for (let o = 0; o < cols; o++) {
            map[i].push("Graphics.emptys");
        }
    }
    return map;
}


const rowsInput = document.querySelector("#rows-input");
const colsInput = document.querySelector("#cols-input");
const tableDiv = document.querySelector(".table");
const selectEmoji = document.querySelector("#emoji-select");
const btnExport = document.querySelector("#btn-export");
const btnaddSnake = document.querySelector("#addSnake");
const btnShare = document.querySelector("#btn-share");
const resultElm = document.querySelector(".result");
const colorTable = document.querySelector("#table-color");
const colorBG = document.querySelector("#background-color");
const body = document.querySelector("body")
const appleselect = document.querySelector("#maxApples")



function updateHtmlTable() {
    const numRows = Number(rowsInput.value);
    const numCols = Number(colsInput.value);
    const numsReqDivs = numRows * numCols;
    const numActDivs = tableDiv.children.length;
    if (numActDivs < numsReqDivs) {
        range(numsReqDivs - numActDivs).forEach(() => {
            const div = document.createElement("div");
            div.classList.add("cell");
            tableDiv.appendChild(div);
            div.addEventListener("mousedown", function () {
                cellClicked(this);
            });
            div.addEventListener("mouseenter", function (event) {
                const mouseDown = !! event.buttons;
                mouseDown && cellClicked(this);
            });
        });
    } else if (numActDivs > numsReqDivs) {
        range(numActDivs - numsReqDivs).forEach(() => {
            tableDiv.children[tableDiv.children.length - 1].remove();
        });
    }
    tableDiv.style.setProperty("--num-rows", numRows);
    tableDiv.style.setProperty("--num-cols", numCols);
}

rowsInput.addEventListener("input", updateHtmlTable);
colsInput.addEventListener("input", updateHtmlTable);
document.addEventListener("readystatechange", updateHtmlTable);
btnaddSnake.addEventListener("click", addSnakeToTable)



const relevantGraphics = {
    apple: "🍏",
    divineFruit: "🍇",
    wall: "🟦",
    doorOutBonusStage: "🔑", 
    heart: "❤️"
}

Object.entries(relevantGraphics).forEach(([name, emoji]) => {
    const option = document.createElement("option");
    option.innerText = `${emoji} ${name}`;
    option.value = emoji;
    selectEmoji.appendChild(option);
    

});


function cellClicked(cell) {
    cell.innerText = cell.innerText ? "" : selectEmoji.value;
}


function designToArray() {
    const numRows = Number(rowsInput.value);
    const numCols = Number(colsInput.value);
    const arr2d = [];
    let idx = 0;
    range(numRows).forEach(() => {
        const row = [];
        range(numCols).forEach(() => {
            const cell = tableDiv.querySelector(`:nth-child(${
                ++ idx
            })`);
            if (cell.innerText == "🔴" || cell.innerText == "⚪") {
                cell.innerText = ""
            }
            row.push(cell.innerText || "⬛");
        });
        arr2d.push(row);
    });

    return arr2d
}


btnExport.addEventListener("click", () => {
    const arr2d = designToArray()

    if (! arr2d.flat().includes(relevantGraphics.doorOutBonusStage)) {
        alert("You forgot to include a door out!")
    }

    resultElm.innerText = `[
  ${
        arr2d.map((row) => `  ${
            JSON.stringify(row)
        }`).join(",\n")
    },
  ]`;

    navigator.clipboard.writeText(resultElm.innerText).then(() => alert("copied to clipboard!"));
});


colorTable.addEventListener("input", () => {
    tableDiv.style.backgroundColor = colorTable.value
})

colorBG.addEventListener("input", () => {
    body.style.backgroundColor = colorBG.value
})


btnShare.addEventListener("click", () => {
    const map = designToArray()
    const zippedMapString = compressMap(map)
    const bgColor = colorBG.value
    const bgColorTable = colorTable.value
    const flatmap = map.flat()
    const numApples = appleselect.value


    if (!flatmap.includes(relevantGraphics.doorOutBonusStage)) {
        alert("You did not add a key. They will only win if they eat enough apples")
    }
    if (flatmap.includes(relevantGraphics.wall) && colorBG.value == colorTable.value) {
        alert("background color cannot stay the same as table color if you have a wall, becasuse it would be transparent")
    } else {
        const link = `${
            document.location.host
        }/snake/?m=${zippedMapString}&b=${bgColor}&t=${bgColorTable}&a=${numApples}`
        resultElm.innerText = link
        navigator.clipboard.writeText(resultElm.innerText).then(() => alert("copied link to clipboard!"));
    }


});


function addSnakeToTable() {
    const numRows = Number(rowsInput.value);
    const numCols = Number(colsInput.value);
    const table = document.querySelector(".table");

    const [middleRowIndex, middleColIndex] = findMid(genMap(numRows, numCols));

    const cells = table.querySelectorAll(".cell");
    const middleCellIndex = middleRowIndex * numCols + middleColIndex;

    cells[middleCellIndex].textContent = "🔴";
    cells[middleCellIndex + numCols].textContent = "⚪";
    cells[middleCellIndex + numCols * 2].textContent = "⚪";
}

