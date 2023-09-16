const descriptionsElement = document.getElementById('descriptionTexts');
const descriptionTexts = [...descriptionsElement.querySelectorAll("p")].map(x=>x.innerText)


const typingSpeed = 13 //ms

let pendingTypeTimeout = null;

function type(text, idx = 0) {
  descriptionsElement.innerText = text.slice(0, idx);
  if (idx < text.length) {
    pendingTypeTimeout = setTimeout(() => type(text, idx + 1), typingSpeed); 
  }
}

function __typeRelevantText(numSection){
  clearTimeout(pendingTypeTimeout);
  type(descriptionTexts[numSection - 1]);
}