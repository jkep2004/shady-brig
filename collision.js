class CollisionHandler {

	static drawArrayCollisionBox = function (array) {

		for (let element of array) {

			Mesh.draw(element.pos.x, element.pos.y, element.size.x, element.size.y);

		}

	}

	static draw2dArrayCollisionBox = function (array) {

		for (let row of array) {

			for (let element of row) {
	
				Mesh.draw(element.pos.x, element.pos.y, element.size.x, element.size.y);
	
			}

		}

	}

	static drawDictCollisionBox = function (dict) {

		for (let [key, element] of Object.entries(dict)) {

			Mesh.draw(element.pos.x, element.pos.y, element.size.x, element.size.y);

		}

	}

	static playerObjectCollisions = function (surface, player, enemies, coins, ladders) {

		for (let enemy of enemies) {

			if (Mesh.colliding(player.weapon, enemy)) {

				enemy.kill();
				continue;

			}

			if (Mesh.colliding(player, enemy)) {

				player.hit();
				continue;

			}

		}

		for (let coin of coins) {

			if (Mesh.colliding(coin, player)) {

				coin.collect(player);
				continue;

			}

		}

		for (let ladder of ladders) {

			if (Mesh.colliding(player, ladder) && keys.has(InputHandler.control.interact)) {

				ladder.changeLevel(surface, player);

			}

		}

	}

	static playerWallCollisions = function (surface, player) {

		for (let row of surface.tiles) {

			for (let tile of row) {

				if (!tile || (tile.mesh['up'] && tile.mesh['down'] && tile.mesh['left'] && tile.mesh['right'])) continue;

				for (let [side, mesh] of Object.entries(tile.mesh)) {

					if (Mesh.colliding(mesh, player)) {

						switch (side) {

							case 'up':

								player.pos.y = tile.pos.y;

								break;

							case 'down':

								player.pos.y = tile.pos.y + Tile.size - player.size.y;

								break;

							case 'left':

								player.pos.x = tile.pos.x;

								break;

							case 'right':

								player.pos.x = tile.pos.x + Tile.size - player.size.x;

								break;


						}

					}

				}

			}

		}

	}

}

class Mesh {

	static draw = function (posX, posY, sizeX, sizeY) {

		stroke(255, 0, 0);
		strokeWeight(2);
		noFill();

		rect(posX, posY, sizeX, sizeY);

	}

	static colliding = function (entity1, entity2) {

		return entity1.pos.x < entity2.pos.x + entity2.size.x &&
        entity1.pos.x + entity1.size.x > entity2.pos.x &&
        entity1.pos.y < entity2.pos.y + entity2.size.y &&
        entity1.size.y + entity1.pos.y > entity2.pos.y;
		
	}

	constructor (posX, posY, sizeX, sizeY) {

		this.pos = {

			x: posX,
			y: posY

		}

		this.size = {

			x: sizeX,
			y: sizeY

		}

	}

}