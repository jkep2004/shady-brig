const files = [
    "actuator.js",
    "coin.js",
    "dotherestyourself.js"
 ];
 
 let lines = 0;
 let read = 0;
 
 function add(n) {
   lines += n;
   read++;
 
   if (read === files.length) {
     document.title = `Shady Brig - ${lines}`;
   }
 }
 
 for (let file of files) {
    fetch(file).then(text => text.text()).then(e => add(e.split("\n").filter(x => x.trim().slice(0, 2) !== "//" && x.trim().length > 0 && x.match(/[a-zA-Z0-9]/gi)).length));
 }
 
 