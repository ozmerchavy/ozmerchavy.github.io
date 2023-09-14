const nav = document.querySelector('nav');
const tabMarker = document.querySelector('nav .tab-marker');

let __readOnly_currentlySelectedTab;

function __moveTabMarkerTo(li) {
  const cssLi = getComputedStyle(li);
  const padX = cssLi.getPropertyValue('--pad-x');
  const padY = cssLi.getPropertyValue('--pad-y');

  const { width, height, left, top } = li.getBoundingClientRect();

  nav.style.setProperty("--marker-width", width + padX * 2);
  nav.style.setProperty("--marker-height", height + padY * 2);

  const navRect = nav.getBoundingClientRect();

  nav.style.setProperty("--marker-left", left - navRect.left - padX);
  nav.style.setProperty("--marker-top", top - navRect.top - padY);

  __readOnly_currentlySelectedTab = li;
} 

// fix tab marker on layout shift (page resize, font change, etc)
new PerformanceObserver(() => {
  __readOnly_currentlySelectedTab &&
    __moveTabMarkerTo(__readOnly_currentlySelectedTab);
}).observe({ type: 'layout-shift', buffered: true });

