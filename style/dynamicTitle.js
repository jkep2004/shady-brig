let lines = 0;
let read = 0;
let length = 1;

function lineCount (n) {
  lines += n;
  read++;

  if (read === length) {

    document.title = `Shady Brig - ${total}`;

  }
  
}

fetch("draw.js").then(text => text.text()).then(e => lineCount(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));