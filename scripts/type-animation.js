const descriptionsElement = document.getElementById('descriptionTexts');
const descriptionTexts = [...descriptionsElement.querySelectorAll('p')].map((p) => p.innerText);

const typingSpeed = 13 //ms

let typingPendingTimeout = null;

function type(text, idx = 0) {
  descriptionsElement.innerText = text.slice(0, idx);
  if (idx < text.length) {
    typingPendingTimeout = setTimeout(() => type(text, idx + 1), typingSpeed);
  }
}

function typeRelevantText(index) {
  clearTimeout(typingPendingTimeout);
  typingPendingTimeout = setTimeout(() => type(descriptionTexts[index]), 200);
}
