const descriptionsElement = document.getElementById('descriptionTexts');
const descriptionTexts = [...descriptionsElement.querySelectorAll("p")].map(x=>x.innerText)


let typingTimeOuts = []
const typingSpeed = 13 //ms

// give an external array as timeoutMummmy so you can clean all timeouts to stop the job
function type(text,  timeOutMummy = [], idx = 0,) {

  if (idx < text.length) {
    descriptionsElement.innerHTML = text.slice(0, idx);
    // index++;

    let time = setTimeout(()=>{type(text, timeOutMummy, idx + 1)}, typingSpeed); 
    timeOutMummy.push(time)
    } else {
      descriptionsElement.innerHTML = text.slice(0, idx);
    }

}

function __typeRelevantText(numSection){
  for (const timeout of typingTimeOuts){
    clearTimeout(timeout)
  }
  typingTimeOuts = []
  const relevantText = descriptionTexts[numSection-1]
  type(relevantText, typingTimeOuts)
}