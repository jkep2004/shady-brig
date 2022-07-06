class Surface {

    static surfaceToLevel = function (tiles) {

        let levelCode = '';

        let tileCode = '';

        for (let row of tiles) {

            for (let tile of row) {

                if (!tile) {

                    tileCode += '!';

                } else { 

                    tileCode += tile.imageNum;

                }

            }

            tileCode += '/';

        }

        tileCode = tileCode.split('');

        let oldTile = tileCode.shift();
        let newTile = tileCode.shift();

        let count = 1;

        while (newTile != undefined) {

            if (oldTile == '/') {

                levelCode += '/';

                count = 1;
                oldTile = newTile;
                newTile = tileCode.shift();

            }

            if (oldTile != newTile) {

                levelCode += count;
                levelCode += oldTile;

                count = 1;
                oldTile = newTile;
                newTile = tileCode.shift();

            } else if (count == 9) {

                levelCode += count;
                levelCode += oldTile;

                count = 1;
                oldTile = newTile;
                newTile = tileCode.shift();

            } else {

                count ++;
                oldTile = newTile;
                newTile = tileCode.shift();

            }

        }

        levelCode += '/';

        keys.clear();

        return levelCode;

    }

    static populateEdges = function (tiles) {

        for (let row of tiles) {

            for (let tile of row) {

                if (tile) tile.edges = {};
                if (tile) tile.mesh = {};

            }

        }

        for (let indexY = 0; indexY < tiles.length; indexY ++) {

            for (let indexX = 0; indexX < tiles[indexY].length; indexX ++) {

                if (!tiles[indexY][indexX]) continue;

                let up = false;
                
                if (indexY > 0) {

                    if (tiles[indexY - 1][indexX]) up = true;

                }

                let down = false;

                if (indexY < tiles.length - 1) {

                    if (tiles[indexY + 1][indexX]) down = true;

                }

                let left = false;
                
                if (indexX > 0) {

                    if (tiles[indexY][indexX - 1]) left = true;

                }

                let right = false;

                if (indexX < tiles[indexY].length - 1) {

                    if (tiles[indexY][indexX + 1]) right = true;

                }

                let upLeft = false;

                if (indexY > 0 && indexX > 0) {

                    if (tiles[indexY - 1][indexX - 1]) {

                        if (tiles[indexY - 1][indexX - 1]) upLeft = true;

                    }

                }

                let upRight = false;

                if (indexY > 0 && indexX < tiles[indexY].length - 1) {

                    if (tiles[indexY - 1][indexX + 1]) {

                        if (tiles[indexY - 1][indexX + 1]) upRight = true;

                    }

                }

                let downLeft = false;

                if (indexY < tiles.length - 1 && indexX > 0) {

                    if (tiles[indexY + 1][indexX - 1]) {

                        if (tiles[indexY + 1][indexX - 1]) downLeft = true;

                    }

                }

                let downRight = false;

                if (indexY < tiles.length - 1 && indexX < tiles[indexY].length - 1) {

                    if (tiles[indexY + 1][indexX + 1]) {

                        if (tiles[indexY + 1][indexX + 1]) downRight = true;

                    }

                }

                let currentTile = tiles[indexY][indexX];

                if (!up) currentTile.mesh['up'] = new Mesh (currentTile.pos.x, currentTile.pos.y - 1, Tile.size, 1);
                if (!down) currentTile.mesh['down'] = new Mesh (currentTile.pos.x, currentTile.pos.y + Tile.size + 1, Tile.size, 1);
                if (!left) currentTile.mesh['left'] = new Mesh (currentTile.pos.x - 1, currentTile.pos.y, 1, Tile.size);
                if (!right) currentTile.mesh['right'] = new Mesh (currentTile.pos.x + Tile.size + 1, currentTile.pos.y, 1, Tile.size);

                if (!up) currentTile.edges['up'] = new Edge (currentTile.index.x, currentTile.index.y, currentTile.pos.x, currentTile.pos.y - Edge.size.x, 'up', currentTile);
                if (!down) currentTile.edges['down'] = new Edge (currentTile.index.x, currentTile.index.y, currentTile.pos.x, currentTile.pos.y + Edge.size.off, 'down', currentTile);
                if (!left) currentTile.edges['left'] = new Edge (currentTile.index.x, currentTile.index.y, currentTile.pos.x - Edge.size.off, currentTile.pos.y, 'left', currentTile);
                if (!right) currentTile.edges['right'] = new Edge (currentTile.index.x, currentTile.index.y, currentTile.pos.x + Edge.size.off, currentTile.pos.y, 'right', currentTile);

                if (!left && !upLeft && !up) currentTile.edges['left'].cap.push(new Edge (currentTile.index.x, currentTile.index.y, currentTile.pos.x - Edge.size.off, currentTile.pos.y - Edge.size.y, 'left', currentTile));
                if (!right && !upRight && !up) currentTile.edges['right'].cap.push(new Edge (currentTile.index.x, currentTile.index.y, currentTile.pos.x + Edge.size.off, currentTile.pos.y - Edge.size.y, 'right', currentTile));

                if (!left && !downLeft && !down) currentTile.edges['down'].cap.push(new Edge (currentTile.index.x, currentTile.index.y, currentTile.pos.x - Edge.size.off, currentTile.pos.y + Edge.size.off, 'downLeft', currentTile));
                if (!right && !downRight && !down) currentTile.edges['down'].cap.push(new Edge (currentTile.index.x, currentTile.index.y, currentTile.pos.x + Edge.size.off, currentTile.pos.y + Edge.size.off, 'downRight', currentTile));

                if (!upRight && !right && downRight) currentTile.edges['right'].show = false;
                if (!upLeft && !left && downLeft) currentTile.edges['left'].show = false;
                
                if (upRight && !right && downRight) currentTile.edges['right'].show = false;
                if (upLeft && !left && downLeft) currentTile.edges['left'].show = false;


            }

        }

        return tiles;

    }

    static saveLevel = function (surface) {

        for (let row of surface.tiles) {

            for (let tile of row) {

                if (!tile) continue;

                if (tile.imageNum == 'c' && tile.object == null) tile.imageNum = 0;
                if (tile.imageNum == 'P') tile.imageNum = 0;
                if (tile.imageNum == 'e') tile.imageNum = 0;
alpha
            }

        }

        for (let enemy of surface.enemies) {

            let indexX = Math.floor(enemy.pos.x / Tile.size);
            let indexY = Math.floor(enemy.pos.y / Tile.size);

            surface.tiles[indexY][indexX].imageNum = 'e';

        }

        surface.tiles[surface.player.last.y][surface.player.last.x].imageNum = 'P';

        let code = '';

        code = Surface.surfaceToLevel(surface.tiles);

        return new Level (code, surface.size.x, surface.size.y);

    }

    static loadLevel = function (player, levelChange) {

        let newLevel = player.level + levelChange;

        let surface = LEVELS[newLevel];
        surface.player.score = player.score;
        surface.player.level = newLevel;

        return surface;

    }
    
    constructor (level, player = null) {

        let levelCode = level.code;
        this.size = {

            x: level.size.x,
            y: level.size.y

        }
        
        this.player = player;

        this.enemies = [];
        this.coins = [];
        this.ladders = [];
        this.potions = [];

        this.switches = {

            'red': [],
            'blue': []

        }
        
        this.actuators = {

            'red': [],
            'blue': []

        }
        
        this.tiles = new Array (this.size.y);

        for (let index = 0; index < this.size.y; index ++) {

            this.tiles[index] = new Array (this.size.x);

        }

        levelCode = levelCode.split('/');

        for (let indexY = 0; indexY < this.size.y; indexY ++) {

            let totalLength = 0;

            for (let index = 0; index < levelCode[indexY].length; index += 2) {

                let tileCount = parseInt(levelCode[indexY][index]);
                let tileType = levelCode[indexY][index + 1];

                if (tileType == '!') {

                    totalLength += tileCount;
                    continue;

                }

                for (let count = 0; count < tileCount; count ++) {

                    this.tiles[indexY][totalLength + count] = new Tile (totalLength + count, indexY, tileType, this);

                }

                totalLength += tileCount;
                
            }

        }

        this.tiles = Surface.populateEdges(this.tiles);

    }

    draw () {

        for (let row of this.tiles) {

            for (let tile of row) {

                if (tile) {

                    tile.draw();

                }

            }

        }

        for (let enemy of this.enemies) {

            enemy.draw();

        }

    }

    drawEdges (...sides) {

        for (let side of sides) {

            for (let row of this.tiles) {

                for (let tile of row) {

                    if (!tile) continue;

                    if (tile.edges[side]) tile.edges[side].draw();

                }

            }

        }

    }

}