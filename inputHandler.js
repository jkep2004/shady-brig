const keys = new Map (); // Create empty map to store currently pressed keys
var recentlyChanged = new Map (); // Map of recently changed tiles (Removed after InputHandler.tileEditCooldown)

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

    let potionColors = 4; // Amount of potion types

    let direction = Math.sign(event.deltaY); // Direction of mouse scroll

    inputHandler.hotbar.potionSelected = (inputHandler.hotbar.potionSelected - direction + potionColors) % potionColors; // Change selected potion

}

class InputHandler {

    static tileEditCooldown = 500; // Ms time between updating tiles

    static control = { // Key bindings for game

        moveUp: 'w',
        moveDown: 's',
        moveLeft: 'a',
        moveRight: 'd',
        interact: ' ',
        getMap: 'p',
        mute: 'm',

    }

    /** Controls all input and UI
     * 
     *  @param {Surface} surface \<Surface> Surface input handler is effecting
     *  @param {Player} player \<Player> Player input handler is effecting
     * 
     *  @author Jakob
     * 
     */

    constructor (surface = null, player = null) {

        this.draw = {}; // Dictionary of user interface drawing functions

        /** Draw all player hearts to screen (Top-right)
         * 
         *  @param {InputHandler} self \<InputHandler> This
         *  @param {Player} player \<Player> Player UI is drawn for
         * 
         *  @author Jakob
         * 
         */

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

        /** Draws red flashing background when player is low health
         * 
         *  @param {InputHandler} self \<InputHandler> This
         *  @param {Player} player \<Player> Player UI is drawn for
         * 
         *  @author Jakob
         * 
         */

        this.draw['lowHealth'] = function (self, player) {

            if (player.health <= player.maxHealth * 0.2) {

                let lowHealthAlpha = map(Math.sin(frameCount * 0.04), 0, 1, 0, 125);
        
                noStroke();
                fill(255, 0, 0, lowHealthAlpha);
                rect(0, 0, width, height);

            }

        }

        /** Draw coins and keys collected to screen (Top-left)
         * 
         *  @param {InputHandler} self \<InputHandler> This
         *  @param {Player} player \<Player> Player UI is drawn for
         * 
         *  @author Jakob
         * 
         */

        this.draw['score'] = function (self, player) {

            let size = {

                x: Tile.size,
                y: Tile.size * 0.9

            }

            let pos = {

                x: size.x,
                y: height / 128,
                off: width / 128

            }

            // REMOVED

            // if (millis() - self.hotbar.coin.update > 1000 / self.hotbar.coin.animationRate) {

            //     self.hotbar.coin.update = millis();
            //     self.hotbar.coin.animationState = (self.hotbar.coin.animationState + 1) % self.hotbar.coin.images.length;

            // }

            let coinImage = self.hotbar.coin.images[self.hotbar.coin.animationState];

            let totalCoins = player.score;

            fill(255);
            strokeWeight(4);
            stroke(0);

            textAlign(LEFT, TOP);
            textStyle(BOLD);
            textSize(size.y);

            image(coinImage, 0, pos.y, size.x, size.y);
            text(`: ${totalCoins}`, size.x, pos.y * 1.625);

            image(imageHandler.sprites['potion/flask'][3], 0, pos.y + size.y, size.x, size.y);
            text(`: ${player.keys}`, size.x, (pos.y * 1.625) + size.y);

        }

        /** Draw UI box in given location
         * 
         *  @param {InputHandler} self \<InputHandler> This
         *  @param {Player} player \<Player> Player UI is drawn for
         * 
         *  @author Jakob
         * 
         */

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

        }

        /** Draw player hotbar to screen
         * 
         *  @param {InputHandler} self \<InputHandler> This
         *  @param {Player} player \<Player> Player UI is drawn for
         * 
         *  @author Jakob
         * 
         */

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

            let option, potionType, imageIndex, ladderDirection;

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

                if (item == 'ladder') {

                    if (!keys.has('control')) ladderDirection = (keys.has('shift')) ? 'up' : 'down';

                    if (keys.has('control'))ladderDirection = (keys.has('shift')) ? 'right' : 'left';

                }

                if (item == 'spikes') imageIndex = (keys.has('shift')) ? 3 : 0;

                if (imageIndex == null) imageIndex = 0;

                let currentImage = imageHandler.sprites[`${item}`][imageIndex];

                image(currentImage, width - ((pos.x + pos.off) * (index + 1)), pos.y, size.x, size.y);

                fill(255);
                stroke(0);
                strokeWeight(2);

                textAlign(LEFT, BOTTOM);
                textStyle(BOLD);
                textSize(width / 128);
                
                if (item != 'ladder') {

                    text(`${self.hotbar.objects.length - index}.`, width - ((pos.x + pos.off) * (index + 1)) + size.x / 16, pos.y + size.y);

                } else {

                    text(`${self.hotbar.objects.length - index}. ${ladderDirection}`, width - ((pos.x + pos.off) * (index + 1)) + size.x / 16, pos.y + size.y);

                }

            }

        }

        this.hotbar = { // Contains all UI variables

            selected: 1, // Currently selected hotbar box
            potionSelected: 0, // Currently selected potion type
            objects: [ // All different object types
                'coin',
                'actuator',
                'switch',
                'demon/idle',
                'ladder',
                'spikes',
                'potion'
            ].reverse(),
            color: ['red', 'blue'], // Different actuator colors
            potion: ['tube', 'flask'], // Different potion sizes
            coin: {
                animationState: 0, // Coin sprite location within array
                animationRate: 4, // Update rate of coin sprite - REMOVED
                update: 0, // Time of last update - REMOVED
                images: imageHandler.sprites['coin'] // Images of coin tile set
            }

        }

    }

    /** Handle all inputs for the player entity
     * 
     *  @param {Map} keys \<Map> Keys currently pressed
     *  @param {Player} player \<Player> Player being controlled
     * 
     *  @author Jakob
     * 
     */

    handlePlayer (keys, player) {

        player.moving = false; // Assume player is not moving
        let moved; // Player has not moved this frame

        /*  if key is pressed for given direction
                if player is moving diagonally
                    move at 0.7 * speed (Pythagoras for a total movement of 1 * speed)
                else
                    move at 1 * speed
                if player moved: moved is true
        */

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

    /** Handles mouse inputs
     * 
     *  @param {Map} keys \<Map> Keys being pressed
     *  @param {Surface} surface \<Surface> Surface being effected
     *  @param {Player} player \<Player> Player being effected
     * 
     *  @author Jakob 
     * 
     */

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
        
                }
        
            }
    
        }

    }

    /** Handles keyboard inputs
     * 
     *  @param {Map} keys \<Map> Keys being pressed
     *  @param {Surface} surface \<Surface> Surface being effected
     *  @param {Player} player \<Player> Player being effected
     * 
     *  @author Jakob 
     * 
     */
    
    handleKeyboard (keys, surface, player) {

        if (keys.has(InputHandler.control.getMap)) { // Logs the current level code

            console.log(Surface.surfaceToLevel(surface.tiles));

            keys.delete(InputHandler.control.getMap);

        }

        if (keys.has(InputHandler.control.mute)) { // Toggles mute state of game

            audioHandler.toggleMute();

            keys.delete(InputHandler.control.mute);

        }

        for (let x = 1; x <= this.hotbar.objects.length; x ++) { // Switch to currently selected hotbar slot

            if (keys.has(`${x}`)) this.hotbar.selected = x;

        }

        if (keys.has('=') || keys.has('+')) { // DEBUG - Increase attribute

            player.score ++;
            keys.delete('=');
            keys.delete('+');

        }

        if (keys.has('-') || keys.has('_')) { // DEBUG - Decrease attribute

            player.score --;
            keys.delete('-');
            keys.delete('_');

        }

        if (keys.has('c')) { // Place object from hotbar

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
                        surface.enemies[surface.enemies.length - 1].last = {x: index.x, y: index.y};

                        break;

                    case 'ladder':

                        let xOff = 0, yOff = 0;

                        if (keys.has('control')) {

                            if (keys.has('shift')) {

                                xOff = 1;

                            } else {

                                xOff = -1;

                            }

                        } else {

                            if (keys.has('shift')) {

                                yOff = -1;

                            } else {

                                yOff = 1;

                            }

                        }

                        surface.tiles[index.y][index.x].createLadder(surface, LEVELS[surface.index.y + yOff][surface.index.x + xOff]);

                        break;

                    case 'potion':

                        let potionColor;

                        switch (this.hotbar.potionSelected) {

                            case 0:

                                potionColor = 'blue';
                                
                                break;

                            case 1:

                                potionColor = 'green';

                                break;

                            case 2:

                                potionColor = 'orange';

                                break;

                            case 3:

                                potionColor = 'yellow';

                                break;
                            
                        }

                        surface.tiles[index.y][index.x].object = new Potion (surface.tiles[index.y][index.x].pos.x + Tile.size / 2 - Potion.size[(keys.has('shift')) ? 'flask': 'tube'] / 2, surface.tiles[index.y][index.x].pos.y + Tile.size / 2 - Potion.size[(keys.has('shift')) ? 'flask': 'tube'] / 2, Potion.size[(keys.has('shift')) ? 'flask': 'tube'], Potion.size[(keys.has('shift')) ? 'flask': 'tube'], potionColor, (keys.has('shift')) ? 'flask': 'tube', surface.tiles[index.y][index.x], surface.potions.length);
                        surface.potions.push(surface.tiles[index.y][index.x].object);

                        surface.tiles[index.y][index.x].imageNum = (keys.has('shift')) ? potionColor[0].toUpperCase() : potionColor[0].toLowerCase();

                }

            }

        }

    }

}