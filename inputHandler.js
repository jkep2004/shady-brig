const keys = new Map (); // Create empty map to store currently pressed keys
var recentlyChanged = new Map ();

function keyPressed () {

    let lowerKey = key.toLowerCase(); // Ensure all keys are lower case

    keys.set(lowerKey, true); // Insert the key into the map

    return false; // Prevent default

}

function keyReleased () {

    let lowerKey = key.toLowerCase(); // Ensure all keys are lower case

    keys.delete(lowerKey); // Delete the key from the map

    return false; // Prevent default

}

function mousePressed (event) {

    keys.set(`mouse${mouseButton}`, true);
    
    return false; // Prevent default

}

function mouseReleased (event) {

    keys.delete(`mouse${mouseButton}`, true);

    return false; // Prevent default

}

function mouseWheel (event) {

    let direction = Math.sign(event.deltaY);

    inputHandler.hotbar.potionSelected = (inputHandler.hotbar.potionSelected - direction) % 4;
    if (inputHandler.hotbar.potionSelected < 0) inputHandler.hotbar.potionSelected = 3;

}

class InputHandler {

    static tileEditCooldown = 500;

    static control = {

        moveUp: 'w',
        moveDown: 's',
        moveLeft: 'a',
        moveRight: 'd',
        interact: ' ',
        getMap: 'p',

    }

    constructor (surface = null, player = null) {

        this.draw = {};

        this.draw['hearts'] = function (self, player) {

            push();

            scale(-1, 1);

            let maxHearts = player.maxHealth;
            let currentHearts = player.health;

            let size = {

                x: Tile.size,
                y: Tile.size

            }

            let pos = {

                x: size.x,
                y: height / 128,
                off: width / 128

            }

            let count = 1;
            let currentImage;

            while (maxHearts > 0) {

                if (maxHearts >= 2) {

                    maxHearts -= 2;
                    
                    if (currentHearts >= 2) {

                        currentHearts -= 2;

                        currentImage = imageHandler.sprites['heart'][2];

                    } else {

                        if (currentHearts == 1) {

                            currentHearts -= 1;

                            currentImage = imageHandler.sprites['heart'][1];

                        } else {

                            currentImage = imageHandler.sprites['heart'][0];

                        }

                    }
                    

                } else if (maxHearts == 1) {

                    maxHearts -= 1;

                    if (currentHearts == 1) {

                        currentHearts -= 1;

                        currentImage = imageHandler.sprites['heart'][1];

                    } else {

                        currentImage = imageHandler.sprites['heart'][0];

                    }

                }

                image(currentImage, - width + ((pos.x + pos.off) * count), pos.y, -size.x, size.y);

                count ++;

            }

            pop();

        }

        this.draw['lowHealth'] = function (self, player) {

            if (player.health <= player.maxHealth * 0.2) {

                let lowHealthAlpha = map(Math.sin(frameCount * 0.04), 0, 1, 0, 125);
        
                noStroke();
                fill(255, 0, 0, lowHealthAlpha);
                rect(0, 0, width, height);

            }

        }

        this.draw['coins'] = function (self, player) {

        }

        this.draw['box'] = function (self, posX, posY, sizeX, sizeY, count) {

            if (self.hotbar.selected == count) {

                stroke(172, 140, 124);

            } else {

                stroke(0)

            }

            strokeWeight(4);
            noFill();

            rect(posX, posY, sizeX, sizeY);

            image(imageHandler.sprites['floor'][0], posX, posY, sizeX, sizeY);

        },

        this.draw['hotbar'] = function (self) {

            let pos = {

                x: Tile.size,
                y: height / 64 + Tile.size,
                off: width / 128

            }

            let size = {

                x: Tile.size,
                y: Tile.size

            }

            for (let index = 0; index < self.hotbar.objects.length; index ++) {

                self.draw['box'](self, width - ((pos.x + pos.off) * (index + 1)), pos.y, size.x, size.y, self.hotbar.objects.length - index);

            }

            let option, potionType, imageIndex;

            if (keys.has('shift')) {

                option = self.hotbar.color[1];
                potionType = self.hotbar.potion[1];

            } else {

                option = self.hotbar.color[0];
                potionType = self.hotbar.potion[0];

            }

            for (let index = self.hotbar.objects.length - 1; index >= 0; index --) {

                let item = self.hotbar.objects[index];

                if (item == 'switch' || item == 'actuator') {

                    item += `/${option}`;

                }

                if (item == 'potion') {

                    item += `/${potionType}`;
                    imageIndex = self.hotbar.potionSelected;

                }

                if (imageIndex == null) imageIndex = 0;

                let currentImage = imageHandler.sprites[`${item}`][imageIndex];

                image(currentImage, width - ((pos.x + pos.off) * (index + 1)), pos.y, size.x, size.y);

                fill(255);
                stroke(0);
                strokeWeight(2);

                textAlign(LEFT, BOTTOM);
                textStyle(BOLD);
                textSize(width / 128);
                text(`${self.hotbar.objects.length - index}.`, width - ((pos.x + pos.off) * (index + 1)) + size.x / 16, pos.y + size.y);

            }

        }

        this.hotbar = {

            selected: 1,
            potionSelected: 0,
            objects: [
                'coin',
                'actuator',
                'switch',
                'demon/idle',
                'ladder',
                'spikes',
                'potion'
            ].reverse(),
            color: ['red', 'blue'],
            potion: ['tube', 'flask']

        }

    }

    handlePlayer (keys, player) {

        player.moving = false;
        let moved;

        if (keys.has(InputHandler.control.moveUp)) {

            if (keys.has(InputHandler.control.moveLeft) || keys.has(InputHandler.control.moveRight)) {

                moved = player.update(0, -0.7);

            } else {

                moved = player.update(0, -1);

            }

            if (moved) player.moving = true;

        }

        if (keys.has(InputHandler.control.moveDown)) {

            if (keys.has(InputHandler.control.moveLeft) || keys.has(InputHandler.control.moveRight)) {

                moved = player.update(0, 0.7);

            } else {

                moved = player.update(0, 1);

            }

            if (moved) player.moving = true;

        }

        if (keys.has(InputHandler.control.moveLeft)) {

            if (keys.has(InputHandler.control.moveUp) || keys.has(InputHandler.control.moveDown)) {

                moved = player.update(-0.7, 0);

            } else {

                moved = player.update(-1, 0);

            }

            if (moved) player.moving = true;

        }

        if (keys.has(InputHandler.control.moveRight)) {

            if (keys.has(InputHandler.control.moveUp) || keys.has(InputHandler.control.moveDown)) {

                moved = player.update(0.7, 0);

            } else {

                moved = player.update(1, 0);

            }

            if (moved) player.moving = true;

        }
        
    }

    handleMouse (keys, surface, player) {

        let mouseLocation = {

            x: mouseX - width / 2 + player.pos.x,
            y: mouseY - height / 2 + player.pos.y
    
        }
    
        let index = {
    
            x: Math.floor(mouseLocation.x / Tile.size),
            y: Math.floor(mouseLocation.y / Tile.size),
            
        }

        let changed = (recentlyChanged.has(`${index.x},${index.y}`)) ? (recentlyChanged.get(`${index.x},${index.y}`) > millis() - InputHandler.tileEditCooldown): false;

        if (mouseIsPressed && !changed) {

            if (index.y >= 0 && index.y < surface.tiles.length) {
        
                if (index.x >= 0 && index.x < surface.tiles[index.y].length) {
        
                    let edited = false;
        
                    if (!surface.tiles[index.y][index.x]) {
        
                        if (mouseButton == 'left') {
                            
                            surface.tiles[index.y][index.x] = new Tile (index.x, index.y, "0", surface);
        
                        } else if (mouseButton == 'right') {
        
                            surface.tiles[index.y][index.x] = new Tile (index.x, index.y, "7", surface);
        
                        }
        
                        edited = true;
        
                    }

                    if (!isNaN(parseInt(surface.tiles[index.y][index.x].imageNum))) {

                        if (mouseButton == 'left' && !edited) {
                            
                            surface.tiles[index.y][index.x].imageNum ++;
            
                            if (surface.tiles[index.y][index.x].imageNum == 8) {
            
                                surface.tiles[index.y][index.x] = null;
                                
                            } else {
            
                                surface.tiles[index.y][index.x].image = imageHandler.sprites['floor'][surface.tiles[index.y][index.x].imageNum];
            
                            }
            
                            edited = true;
            
                        } else if (mouseButton == 'right' && !edited) {
    
                            surface.tiles[index.y][index.x].imageNum --;
            
                            if (surface.tiles[index.y][index.x].imageNum == -1) {
            
                                surface.tiles[index.y][index.x] = null;
                                
                            } else {
            
                                surface.tiles[index.y][index.x].image = imageHandler.sprites['floor'][surface.tiles[index.y][index.x].imageNum];
            
                            }
    
                            edited = true;
    
                        }

                    } else {

                        if (mouseButton == 'left' && !edited) {
                            
                            surface.tiles[index.y][index.x].imageNum = 0;
            
                            edited = true;
            
                        }

                    }

                    if (edited) recentlyChanged.set(`${index.x},${index.y}`, millis());
        
                    surface.tiles = Surface.populateEdges(surface.tiles);
        
                    return false;
        
                }
        
            }
    
        }

    }
    
    handleKeyboard (keys, surface, player) {

        if (keys.has(InputHandler.control.getMap)) {

            document.write(Surface.surfaceToLevel(surface.tiles));

        }

        for (let x = 1; x <= this.hotbar.objects.length; x ++) {

            if (keys.has(`${x}`)) this.hotbar.selected = x;

        }

        if (keys.has('=') || keys.has('+')) {

            console.log('Change health +1')

            player.changeHealth(1);
            keys.delete('=');
            keys.delete('+');

        }

        if (keys.has('-') || keys.has('_')) {

            console.log('Change health -1')

            player.changeHealth(-1);
            keys.delete('-');
            keys.delete('_');

        }

        if (keys.has('c')) {

            keys.delete('c');

            let mouseLocation = {

                x: mouseX - width / 2 + player.pos.x,
                y: mouseY - height / 2 + player.pos.y
        
            }
        
            let index = {
        
                x: Math.floor(mouseLocation.x / Tile.size),
                y: Math.floor(mouseLocation.y / Tile.size),
                
            }

            if (surface.tiles[index.y] && surface.tiles[index.y][index.x]) {

                surface.tiles[index.y][index.x].image = imageHandler.sprites['floor'][0];
                surface.tiles[index.y][index.x].object = null;

                switch (this.hotbar.objects[this.hotbar.objects.length - this.hotbar.selected]) {

                    case 'coin':

                        surface.tiles[index.y][index.x].createCoin();

                        break;

                    case 'demon/idle':

                        surface.tiles[index.y][index.x].createEnemy();

                        break;

                    case 'ladder':

                        let direction = (keys.has('shift')) ? -1: 1;

                        surface.tiles[index.y][index.x].createLadder(direction);

                        break;

                }

            }

        }

    }

}
