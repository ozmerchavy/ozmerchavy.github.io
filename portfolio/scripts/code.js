const gridsContainer = document.querySelector('.carousel-grids');
const profileImages = [...document.querySelectorAll('.profile-img img')];
const gridsArr = [...gridsContainer.querySelectorAll('.carousel-grids > .grid')];

function adjustGridsContainerHeight() {
  requestAnimationFrame(() => {
    // the requestAnimationFrame is a patch needed for chromium.
    const gridsHeights = gridsArr.map((grid) => grid.offsetHeight);
    gridsContainer.style.height = `${Math.max(...gridsHeights)}px`;
  });
  // todo in order to really optimize for poor safari,
  // instead of using ResizeObserver (which fires ~35 times when a card is animated to grow),
  // we can hook to the card click event, and grow the container to its calculated future height.
}
adjustGridsContainerHeight();
const gridsResizeObserver = new ResizeObserver(adjustGridsContainerHeight);
gridsArr.forEach((grid) => gridsResizeObserver.observe(grid));

function __gotoSection(numSection) {
  const subGrid = gridsContainer.children[numSection - 1];
  gridsContainer.scrollLeft = subGrid.offsetLeft;
}

function __changeOverallColors(numSection) {
  const subGrid = gridsContainer.children[numSection - 1];

  const subGridStyles = getComputedStyle(subGrid);
  const bgColor = subGridStyles.getPropertyValue('--bg-color'); 
  const secondColor = subGridStyles.getPropertyValue('--second-color'); 
  const fontColor =   subGridStyles.getPropertyValue('--font-color'); 
  const navTextColor =   subGridStyles.getPropertyValue('--menu-font-color'); 
  // const descriptionBG =   subGridStyles.getPropertyValue('--grid-item-desc-bg'); 

  const tabMarkers = document.querySelectorAll('nav li');

  document.body.style.backgroundColor = bgColor;

  const [almostBlack, almostWhite] = ['rgb(0 0 0 / .9)', 'rgb(255 255 255 / .9)'];
  document.body.style.color = fontColor || 
    isLightColor(parseCssColor(bgColor)) ? almostBlack : almostWhite;
  
    for (const tab of tabMarkers){
    tab.style.color =  document.body.style.color
  }
  __readOnly_currentlySelectedTab_li.style.color = navTextColor || document.body.style.color
  document.documentElement.style.setProperty("--second-color", secondColor);
}
  

function __changeProfileImage(numSection){
  for (const pic of profileImages){
    pic.classList.add("hidden")
  }
  const relevantPic =  profileImages[numSection-1]
  relevantPic.classList.remove("hidden")

}

document.querySelectorAll('nav li').forEach((li) => {
  li.addEventListener('click', () => {
    const numSection = [...nav.querySelectorAll('li')].indexOf(li) + 1;
    changeToSection(numSection)
  });
});

function changeToSection(numSection){
  __moveTabMarkerTo(document.querySelector(`nav li:nth-child(${numSection})`));
  __gotoSection(numSection);
  __changeOverallColors(numSection);
  __typeRelevantText(numSection)
  __changeProfileImage(numSection)
}

// initally the first section should be selected
changeToSection(1);

