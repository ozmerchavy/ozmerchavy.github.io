const nav = document.querySelector('nav');
const tabs = [...nav.querySelectorAll('li')];
const pages = [...document.querySelectorAll('.page')];
const profileImages = [...document.querySelectorAll('.profile-img img')];
const expandableCards = [...document.querySelectorAll('.clients-grid .card')];

let currentlySelectedTab;

function moveTabMarkerTo(li) {
  const cssLi = getComputedStyle(li);
  const padX = cssLi.getPropertyValue('--marker-pad-x');
  const padY = cssLi.getPropertyValue('--marker-pad-y');

  const { width, height, left, top } = li.getBoundingClientRect();

  nav.style.setProperty('--marker-width', width + padX * 2);
  nav.style.setProperty('--marker-height', height + padY * 2);

  const navRect = nav.getBoundingClientRect();

  nav.style.setProperty('--marker-left', left - navRect.left - padX);
  nav.style.setProperty('--marker-top', top - navRect.top - padY);
}

function changeToTab(index) {
  const li = tabs[index];
  currentlySelectedTab = li;

  tabs.forEach((tab) => tab.classList.toggle('selected', tab === li));
  pages.forEach((page, i) => (page.hidden = i !== index));
  profileImages.forEach((img, i) => img.classList.toggle('hidden', i !== index));

  // adding a handy selector to the body: [data-tab="piano"], which picks the theme
  document.body.dataset.tab = li.dataset.tab;

  moveTabMarkerTo(li);
  typeRelevantText(index);

  // a card left open shouldn't still be open when you come back to the tab
  expandableCards.forEach((card) => card.classList.remove('expanded'));
}

tabs.forEach((li, index) => {
  li.addEventListener('click', () => changeToTab(index));
});

// keep the marker on its tab when the tabs resize (font finishes loading, page resize, etc).
// the marker is positioned relative to the nav, so nav moving around doesn't matter.
new ResizeObserver(() => {
  currentlySelectedTab && moveTabMarkerTo(currentlySelectedTab);
}).observe(nav);

function tabIndexFromUrl() {
  const params = [...new URLSearchParams(window.location.search).keys()];
  const index = tabs.findIndex((li) => params.includes(li.dataset.tab));
  return index === -1 ? 0 : index;
}

// initially the first tab should be selected, unless the url asks for another
changeToTab(tabIndexFromUrl());
