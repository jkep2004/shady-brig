let lines = 0;
let read = 0;
let length = 1;

let files = [

  'audioHandler.js',
  'imageHandler.js',
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
  'preload.js',
  'setup.js',
  'surface.js',
  'tile.js',
  'weapon.js'

]

/**Counts lines within file and changes document title to the total
 * 
 * @param {Number} n \<int> ??
 * 
 * @author Luc
 * 
 */

function lineCount (n) {
  lines += n;
  read++;

  if (read === length) {

    document.title = `Shady Brig - ${lines}`;

  }
  
}

fetch('draw.js').then(text => text.text()).then(e => lineCount(e.split('\n').filter(x => x.trim().slice(0, 2) !== '//' && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));