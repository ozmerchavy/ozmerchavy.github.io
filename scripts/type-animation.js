const descriptionsElement = document.getElementById('descriptionTexts');
const descriptionTexts = [...descriptionsElement.querySelectorAll('p')].map((p) => p.innerText);

const typingSpeed = 10; // ms

let typingPendingTimeout = null;

function reserveDescriptionHeight() {
  const container = descriptionsElement;
  const style = getComputedStyle(container);
  const width = container.offsetWidth;
  if (!width) return;

  const probe = document.createElement('div');
  probe.style.cssText = `
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    width: ${width}px;
    font-size: ${style.fontSize};
    line-height: ${style.lineHeight};
    font-family: ${style.fontFamily};
    font-weight: ${style.fontWeight};
  `;
  document.body.appendChild(probe);

  let maxHeight = 0;
  for (const text of descriptionTexts) {
    probe.textContent = text;
    maxHeight = Math.max(maxHeight, probe.offsetHeight);
  }

  probe.remove();
  container.style.minHeight = `${maxHeight}px`;
}

reserveDescriptionHeight();
new ResizeObserver(reserveDescriptionHeight).observe(descriptionsElement);
document.fonts?.ready.then(reserveDescriptionHeight);

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
