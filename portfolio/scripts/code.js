const carouselGrids = document.querySelector('.carousel-grids');
const profileImages = [...document.querySelectorAll('.profile-img img')];

function __gotoSection(numSection) {
  const subGrid = document.querySelector(`.carousel-grids > :nth-child(${numSection})`);
  carouselGrids.scrollLeft = subGrid.offsetLeft;
}


function __isLightColor([red, green, blue]) {
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return luminance > 0.5;
}

function __parseCssColor(color) {
  // Create an off-screen div
  const div = document.createElement('div');
  div.style.display = 'none';
  div.style.color = color;
  document.body.appendChild(div);

  // Get the computed style of the color, which will be in rgb format
  const computedColor = window.getComputedStyle(div).color;

  // Cleanup
  document.body.removeChild(div);

  return computedColor.match(/\d+/g).map(Number);
}

function __changeOverallColors(numSection) {
  const subGrid = document.querySelector(`.carousel-grids > :nth-child(${numSection})`);

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
    __isLightColor(__parseCssColor(bgColor)) ? almostBlack : almostWhite;
  
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

