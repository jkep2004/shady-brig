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

        this.surface = surface;
        this.player = player;

        this.draw = {};

        this.draw['hearts'] = function (self) {



        }

        this.draw['coins'] = function (self) {

        }

        this.draw['box'] = function (self, posX, posY, sizeX, sizeY, count) {

            if (self.hotbar.selected == count) {

                stroke(172, 140, 124);

            } else {

                stroke(0)

            }

            strokeWeight(4);
            fill(100);

            rect(posX, posY, sizeX, sizeY);

            fill(255);
            stroke(0);
            strokeWeight(2);
        
            textAlign(LEFT, BOTTOM);
            textStyle(BOLD);
            textSize(width / 128);
            text(`${count}.`, posX + sizeX / 16, posY + sizeY);

        },

        this.draw['hotbar'] = function (self) {

            let pos = {

                x: Tile.size,
                y: height / 64 + height / 16,
                off: width / 64

            }

            for (let index = self.hotbar.objects.length; index > 0; index --) {

                self.draw['box'](self, width - ((pos.x + pos.off) * index), pos.y, pos.x, pos.x, self.hotbar.objects.length - index + 1);

            }

        }

        this.hotbar = {

            selected: 1,
            objects: [
                'coin',
                'actuator',
                'switch',
                'enemy',
                'ladder',
                'spike'
            ],
            options: ['red', 'blue']

        }

    }

    handlePlayer (keys) {

        this.player.moving = false;
        let moved;

        if (keys.has(InputHandler.control.moveUp)) {

            if (keys.has(InputHandler.control.moveLeft) || keys.has(InputHandler.control.moveRight)) {

                moved = this.player.update(0, -0.7);

            } else {

                moved = this.player.update(0, -1);

            }

            if (moved) this.player.moving = true;

        }

        if (keys.has(InputHandler.control.moveDown)) {

            if (keys.has(InputHandler.control.moveLeft) || keys.has(InputHandler.control.moveRight)) {

                moved = this.player.update(0, 0.7);

            } else {

                moved = this.player.update(0, 1);

            }

            if (moved) this.player.moving = true;

        }

        if (keys.has(InputHandler.control.moveLeft)) {

            if (keys.has(InputHandler.control.moveUp) || keys.has(InputHandler.control.moveDown)) {

                moved = this.player.update(-0.7, 0);

            } else {

                moved = this.player.update(-1, 0);

            }

            if (moved) this.player.moving = true;

        }

        if (keys.has(InputHandler.control.moveRight)) {

            if (keys.has(InputHandler.control.moveUp) || keys.has(InputHandler.control.moveDown)) {

                moved = this.player.update(0.7, 0);

            } else {

                moved = this.player.update(1, 0);

            }

            if (moved) this.player.moving = true;

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



                    }

                    if (edited) recentlyChanged.set(`${index.x},${index.y}`, millis());
        
                    surface.tiles = Surface.populateEdges(surface.tiles);
        
                    return false;
        
                }
        
            }
    
        }

    }
    
    handleKeyboard (keys, surface) {

        if (keys.has(InputHandler.control.getMap)) {

            alert(Surface.surfaceToLevel(surface.tiles));
            document.write(Surface.surfaceToLevel(surface.tiles));

        }

        for (let x = 1; x <= this.hotbar.objects.length; x ++) {

            if (keys.has(`${x}`)) this.hotbar.selected = x;

        }

    }

}
