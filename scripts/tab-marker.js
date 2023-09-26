const nav = document.querySelector('nav');
const tabMarker = document.querySelector('nav .tab-marker');

let __readOnly_currentlySelectedTab_li;

function __currentGridIndex() {
  const li = __readOnly_currentlySelectedTab_li;
  return [...li.parentElement.children].indexOf(li);
}

function __moveTabMarkerTo(li) {
  const cssLi = getComputedStyle(li);
  const padX = cssLi.getPropertyValue('--marker-pad-x');
  const padY = cssLi.getPropertyValue('--marker-pad-y');

  const { width, height, left, top } = li.getBoundingClientRect();

  nav.style.setProperty("--marker-width", width + padX * 2);
  nav.style.setProperty("--marker-height", height + padY * 2);

  const navRect = nav.getBoundingClientRect();

  nav.style.setProperty("--marker-left", left - navRect.left - padX);
  nav.style.setProperty("--marker-top", top - navRect.top - padY);

  __readOnly_currentlySelectedTab_li = li;

  // addint a handy selector to the body: [data-tab="piano"]
  document.body.dataset.tab = li.textContent.toLowerCase();
} 

// fix tab marker on layout shift (page resize, font change, etc)
new PerformanceObserver(() => {
  __readOnly_currentlySelectedTab_li &&
    __moveTabMarkerTo(__readOnly_currentlySelectedTab_li);
}).observe({ type: 'layout-shift', buffered: true });

