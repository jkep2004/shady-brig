const files = [
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
];

async function countLines(files) {
  let actualLines = 0;

  for (let file of files) {
    let lines = await fetch(file)
      .then(response => response.text())
      .then(text => text.split("\n"));

    let multiline = false;

    for (let line of lines) {
      const trimmed = line.trim();

      if (trimmed.includes("/*")) multiline = true;
      if (trimmed.includes("*/")) multiline = false;

      if (multiline) continue;

      if (trimmed.slice(0, 2) == "//") continue;
      if (trimmed.length === 0) continue;

      const alphanumeric = trimmed.match(/[a-zA-Z0-9]/gi);
      if (!alphanumeric) continue;

      actualLines++;
    }
  }

  document.title = `Shady Brig - ${actualLines}`;
}

countLines(files);
 
 