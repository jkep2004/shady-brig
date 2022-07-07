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

			if (Mesh.colliding(player.weapon.mesh, enemy)) {

				enemy.kill();
				continue;

			}

			if (Mesh.colliding(player.mesh, enemy)) {

				player.hit();
				continue;

			}

		}

		for (let coin of coins) {

			if (Mesh.colliding(coin, player.mesh)) {

				coin.collect(player);
				continue;

			}

		}

		for (let ladder of ladders) {

			if (Mesh.colliding(player.mesh, ladder) && keys.has(InputHandler.control.interact)) {

				ladder.changeLevel(surface, player);

			}

		}

	}

	static entityToWall = function (surface, entity, sideCheck) {

		let colliding = {};
		
		for (let row of surface.tiles) {

			for (let tile of row) {

				if (!tile || (tile.mesh['up'] && tile.mesh['down'] && tile.mesh['left'] && tile.mesh['right'])) continue;

				for (let [side, mesh] of Object.entries(tile.mesh)) {

					if (Mesh.colliding(mesh, entity.mesh)) {

						if (side == sideCheck && side == 'up' && Mesh.colliding(mesh, entity.mesh)) {

							entity.pos.y = mesh.pos.y + (entity.mesh.size.y - entity.size.y);
							entity.mesh.pos.y = mesh.pos.y;
							colliding[side] = true;

						}

						if (side == sideCheck && side == 'down' && Mesh.colliding(mesh, entity.mesh)) {

							entity.pos.y = mesh.pos.y - entity.size.y;
							entity.mesh.pos.y = mesh.pos.y - entity.mesh.size.y;
							colliding[side] = true;

						}

						if (side == sideCheck && side == 'left' && Mesh.colliding(mesh, entity.mesh)) {

							entity.pos.x = mesh.pos.x;
							entity.mesh.pos.x = mesh.pos.x;
							colliding[side] = true;

						}

						if (side == sideCheck && side == 'right' && Mesh.colliding(mesh, entity.mesh)) {

							entity.pos.x = mesh.pos.x - entity.size.x;
							entity.mesh.pos.x = mesh.pos.x - entity.mesh.size.x;
							colliding[side] = true;

						}

					}

				}

			}

		}

		return colliding;

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