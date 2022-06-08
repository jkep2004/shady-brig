let lines = 0;
let read = 0;
let length = 1;

let total = 0;

function lineCount (n) {
  lines += n;
  read++;

  if (read === length) {

    total += lines;

  }
  
}

// Sum all lines of code within code files

fetch("../audio/audioHandler.js").then(text => text.text()).then(e => lineCount(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));
fetch("../image/imageHandler.js").then(text => text.text()).then(e => lineCount(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));
fetch("draw.js").then(text => text.text()).then(e => lineCount(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));
fetch("entity.js").then(text => text.text()).then(e => lineCount(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));
fetch("inputHandler.js").then(text => text.text()).then(e => lineCount(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));
fetch("level.js").then(text => text.text()).then(e => lineCount(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));
fetch("preload.js").then(text => text.text()).then(e => lineCount(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));
fetch("setup.js").then(text => text.text()).then(e => lineCount(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));
fetch("index.html").then(text => text.text()).then(e => lineCount(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));

document.title = `Shady Brig - ${total}`;