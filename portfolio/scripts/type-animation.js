const descriptionsElement = document.getElementById('descriptionTexts');
const descriptionTexts = [...descriptionsElement.querySelectorAll("p")].map(x=>x.innerText)


const typingSpeed = 13 //ms

let typingPendingTimeout = null;

function type(text, idx = 0) {
  descriptionsElement.innerText = text.slice(0, idx);
  if (idx < text.length) {
    typingPendingTimeout = setTimeout(() => type(text, idx + 1), typingSpeed); 
  }
}

function __typeRelevantText(numSection){
  clearTimeout(typingPendingTimeout);
  typingPendingTimeout = setTimeout(
    () => type(descriptionTexts[numSection - 1]), 200);
}