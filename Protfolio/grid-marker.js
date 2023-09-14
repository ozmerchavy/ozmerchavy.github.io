const gridMarker = document.querySelector(".grid-marker")
let __readOnlyHoveredGridItem


function moveGridMarkerTo(griDiv, leaveSameSize = false){

  const gridMarkerCss = getComputedStyle(gridMarker)
  const heightRatio = gridMarkerCss.getPropertyValue('--grid-marker-height');
  const widthRation = gridMarkerCss.getPropertyValue('--grid-marker-width');
  const { width, height, left } = griDiv.getBoundingClientRect();
  gridMarker.style.top = griDiv.offsetTop  +"px"
  gridMarker.style.left = left + "px"
  if (leaveSameSize){
    return
  }
  gridMarker.style.minHeight = height * Number(heightRatio) +"px"
  gridMarker.style.minWidth = width * Number(widthRation)+"px"

}



// fix grid marker on layout shift (page resize, font change, etc)
new PerformanceObserver(() => {
  __readOnlyHoveredGridItem &&
    moveGridMarkerTo(__readOnlyHoveredGridItem);
}).observe({ type: 'layout-shift', buffered: true });

const currentGrid = document.querySelectorAll('.grid')[currentSectionidx];
const allGridDivs = document.querySelectorAll(".grid-item");

allGridDivs.forEach(gridDiv => {
  gridDiv.addEventListener("mouseenter", function () {
    __readOnlyHoveredGridItem = this;
    moveGridMarkerTo(this)
  })})


   moveGridMarkerTo(allGridDivs[0], true)
