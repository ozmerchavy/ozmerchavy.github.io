function range(n) {
    return [...Array(n).keys()];
  }
  
  const rowsInput = document.querySelector("#rows-input");
  const colsInput = document.querySelector("#cols-input");
  const tableDiv = document.querySelector(".table");
  const selectEmoji = document.querySelector("#emoji-select");
  const btnExport = document.querySelector("#btn-export");
  const resultElm = document.querySelector(".result");
  
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
          const mouseDown = !!event.buttons;
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
  
  const relevantGraphics = {
    apple: "🍏",
    divineFruit: "🍇",
    empty: "⬛",
    nothing: "⬜️"
  };
  
  Object.entries(relevantGraphics).forEach(([name, emoji]) => {
    const option = document.createElement("option");
    option.innerText = `${emoji} ${name}`;
    option.value = emoji;
    selectEmoji.appendChild(option);
  });
  
  function cellClicked(cell) {
    cell.innerText = cell.innerText ? "" : selectEmoji.value;
  }
  
  btnExport.addEventListener("click", () => {
    const numRows = Number(rowsInput.value);
    const numCols = Number(colsInput.value);
    const arr2d = [];
    let idx = 0;
    range(numRows).forEach(() => {
      const row = [];
      range(numCols).forEach(() => {
        const cell = tableDiv.querySelector(`:nth-child(${++idx})`);
        row.push(cell.innerText || relevantGraphics.empty);
      });
      arr2d.push(row);
    });
  
    resultElm.innerText = `[
  ${arr2d.map((row) => `  ${JSON.stringify(row)}`).join(",\n")},
  ]`;
  
    navigator.clipboard
      .writeText(resultElm.innerText)
      .then(() => alert("copied to clipboard!"));
  });
  