let files = [

  './audio/audioHandler.js',
  './image/imageHandler.js',
  'actuator.js',
  'coin.js',
  'collision.js',
  'draw.js',
  'edge.js',
  'enemy.js',
  'entity.js',
  'index.html',
  'inputHandler.js',
  'ladder.js',
  'level.js',
  'player.js',
  'potion.js',
  'preload.js',
  'setup.js',
  'surface.js',
  'tile.js',
  'weapon.js'

]
 
let lines = 0;
let read = 0;

function addLines (n) {

  lines += n;
  read++;

  if (read === files.length) {

    document.title = `Shady Brig - ${lines}`;

  }

}

for (let file of files) {

  fetch(file).then(text => text.text()).then(e => addLines(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));

}
 
 