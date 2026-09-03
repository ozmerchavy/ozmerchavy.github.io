// clicking a video plays it right here, instead of sending you to youtube.
// the markup keeps plain youtube links, so with no js, or on a ctrl click, they still open there.

const featuredLink = document.querySelector('.featured-video');
const openPlayers = new Map(); // player element -> the thumbnail link it replaced

function embedUrl(watchUrl, { autoplay } = { autoplay: true }) {
  const { hostname, pathname, searchParams } = new URL(watchUrl);
  const videoId = hostname.endsWith('youtu.be') ? pathname.slice(1) : searchParams.get('v');

  // youtube has no switch for the title, the logo or the captions button. controls=0 is the
  // one thing that takes them off, and it takes the timeline and fullscreen button with them.
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    controls: '1',
    rel: '0',
    playsinline: '1',
    iv_load_policy: '3', // no annotation cards over the video
  });
  const startsAt = parseInt(searchParams.get('t'));
  if (startsAt) params.set('start', startsAt);

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
}

function playerFor(link) {
  const iframe = document.createElement('iframe');
  iframe.className = 'video-player';
  iframe.src = embedUrl(link.href);
  iframe.title = link.querySelector('.title').innerText;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.allowFullscreen = true;

  // the featured thumbnail is a wide crop under a gradient, and the player wants neither,
  // so there it swaps in as the whole banner rather than as a picture inside one
  if (!link.classList.contains('featured-video')) return iframe;

  const banner = document.createElement('div');
  banner.className = 'featured-video playing';
  banner.append(iframe);
  return banner;
}

function closePlayers() {
  openPlayers.forEach((link, player) => {
    player.replaceWith(link);
    link.closest('.card')?.classList.remove('playing');
  });
  openPlayers.clear();
}

document.querySelectorAll('.featured-video, .videos-grid a').forEach((link) => {
  link.addEventListener('click', (event) => {
    // a ctrl click, a middle click and the like still belong to the browser
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    closePlayers(); // two videos playing over each other is nobody's idea of a good time

    const player = playerFor(link);
    link.closest('.card')?.classList.add('playing');
    link.replaceWith(player);
    openPlayers.set(player, link);

    // the warm up copy has served its purpose, and there is a real player now
    warmUpFrame?.remove();
  });
});

// a video left behind a hidden page keeps on playing, so leaving the tab closes it
document.querySelectorAll('nav li').forEach((li) => li.addEventListener('click', closePlayers));

/*PRELOADING*/

// what makes the first video slow is the embed's own player: a pile of script and css that is
// only fetched once an iframe asks for it. all the videos share that player, so one off-screen
// embed pulls it into the browser cache while nobody is waiting, and the first click starts warm.

let warmUpFrame;

function warmUpPlayer() {
  const connection = navigator.connection;
  const sparingData = connection?.saveData || /2g/.test(connection?.effectiveType ?? '');
  if (warmUpFrame || sparingData) return;

  warmUpFrame = document.createElement('iframe');
  warmUpFrame.className = 'player-warm-up';
  // the featured video is the likeliest first click, so its page gets cached along the way
  warmUpFrame.src = embedUrl(featuredLink.href, { autoplay: false });
  warmUpFrame.tabIndex = -1;
  warmUpFrame.setAttribute('aria-hidden', 'true');

  document.body.append(warmUpFrame);
}

function warmUpWhenIdle() {
  window.requestIdleCallback
    ? requestIdleCallback(warmUpPlayer, { timeout: 2000 })
    : setTimeout(warmUpPlayer, 1200);
}

// only worth doing on the tab that actually has videos on it
if (document.body.dataset.tab === 'piano') warmUpWhenIdle();
document.querySelector('nav [data-tab="piano"]').addEventListener('click', warmUpWhenIdle);
