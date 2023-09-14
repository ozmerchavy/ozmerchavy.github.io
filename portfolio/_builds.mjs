function toChevronCard({ imgSrc, titleText, bodyText }) {
  return `
    <div class="card" onclick="this.classList.toggle('expanded')">
      <div class="lil-img"><img src="${imgSrc}"></div>
      <div class="lil-text-content">
          <div class="text-content">
              <h3 class="title">${titleText}</h3>
              <div class="body-text">${bodyText}</div>
          </div>
      </div>
      <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 100 35" width="30"><path d="M5 30L50 5l45 25" fill="none" stroke="#000" stroke-width="5"/></svg>
    </div>
  `
}
