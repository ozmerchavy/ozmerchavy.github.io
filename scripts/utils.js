function isLightColor([red, green, blue]) {
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return luminance > 0.5;
}

function memoize(func) {
  const memo = Object.create(null);
  return (...args) => {
    if (!(args in memo)) {
      memo[args] = func(...args);
    }
    return memo[args];
  }
}

const parseCssColor = memoize((color) => {
  // Create an off-screen div
  const div = document.createElement('div');
  div.style.display = 'none';
  div.style.color = color;
  document.body.appendChild(div);
  // Get the computed style of the color, which will be in rgb format
  const computedColor = window.getComputedStyle(div).color;
  // Cleanup
  document.body.removeChild(div);
  // Extract array of numbers from rgb string
  return computedColor.match(/\d+/g).map(Number);
});

// todo call parseCssColor with all inputs it will be called with,
// so actual calls take zero time