const columns = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
  event.preventDefault();
  if (event.code.toLowerCase() === 'space') {
    getNewColColors(columns);
  }
});

document.addEventListener('click', event => {
  const type = event.target.dataset.type;
  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i'
      ? event.target
      : event.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');

  } else if (event.target.classList.contains('title')) {
    copyToClipboard(event.target.textContent);
  }
});

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function generateColor() {
  let color = '#';
  const hexCodes = '01234567890ABCDEF';
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return color;
}

function getNewColColors(cols, isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : generateColor()
      : generateColor();
    if (!isLocked) {
      text.textContent = color;
      col.style.background = color;
      setTextColor(text, color);
      setTextColor(button, color);
      if (!isInitial) {
        colors.push(color);
      }
    } else colors.push(text.textContent);
  });
  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map(el => el.substring(1)).join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map(el => `#` + el);
  }
  return [];
}

getNewColColors(columns, true);
