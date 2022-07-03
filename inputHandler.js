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

    static TileEditCooldown = 500;

    constructor () {

        this.surface;
        this.player;

    }

    handlePlayer (keys) {

        this.player.moving = false;
        let moved;

        if (keys.has('w')) {

            if (keys.has('a') || keys.has('d')) {

                moved = this.player.update(0, -0.7);

            } else {

                moved = this.player.update(0, -1);

            }

            if (moved) this.player.moving = true;

        }

        if (keys.has('s')) {

            if (keys.has('a') || keys.has('d')) {

                moved = this.player.update(0, 0.7);

            } else {

                moved = this.player.update(0, 1);

            }

            if (moved) this.player.moving = true;

        }

        if (keys.has('a')) {

            if (keys.has('w') || keys.has('s')) {

                moved = this.player.update(-0.7, 0);

            } else {

                moved = this.player.update(-1, 0);

            }

            if (moved) this.player.moving = true;

        }

        if (keys.has('d')) {

            if (keys.has('w') || keys.has('s')) {

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

        let changed = (recentlyChanged.has(`${index.x},${index.y}`)) ? (recentlyChanged.get(`${index.x},${index.y}`) > millis() - InputHandler.TileEditCooldown): false;

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

                    if (edited) recentlyChanged.set(`${index.x},${index.y}`, millis());
        
                    surface.tiles = Surface.populateEdges(surface.tiles);
        
                    return false;
        
                }
        
            }
    
        }

    }
    
    handleKeyboard (keys, surface) {

        if (keys.has(' ')) {

            alert(Surface.surfaceToLevel(surface.tiles));
            document.write(Surface.surfaceToLevel(surface.tiles));

        }

    }

}
