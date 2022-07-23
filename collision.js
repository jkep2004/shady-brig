class CollisionHandler {

	static drawArrayMeshBox = function (array) {

		for (let element of array) {

			Mesh.draw(element.mesh.pos.x, element.mesh.pos.y, element.mesh.size.x, element.mesh.size.y);

		}

	}

	static draw2dArrayMeshBox = function (array) {

		for (let row of array) {

			for (let element of row) {
	
				Mesh.draw(element.mesh.pos.x, element.mesh.pos.y, element.mesh.size.x, element.mesh.size.y);
	
			}

		}

	}

	static drawDictMeshBox = function (dict) {

		for (let [key, element] of Object.entries(dict)) {

			Mesh.draw(element.mesh.pos.x, element.mesh.pos.y, element.mesh.size.x, element.mesh.size.y);

		}

	}

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

	static playerObjectCollisions = function (surface, player, enemies, coins, ladders, potions, switches, actuators) {

		for (let enemy of enemies) {

			if (Mesh.colliding(player.weapon.mesh, enemy.mesh)) {

				enemy.kill();
				continue;

			}

			if (Mesh.colliding(player.mesh, enemy.mesh)) {

				player.hit();
				continue;

			}

		}

		for (let coin of coins) {

			if (Mesh.colliding(coin.mesh, player.mesh)) {

				coin.collect(player);
				continue;

			}

		}

		for (let ladder of ladders) {

			if (Mesh.colliding(player.mesh, ladder.mesh) && keys.has(InputHandler.control.interact)) {

				ladder.changeLevel(player);
				continue;

			}

		}

		for (let potion of potions) {

			if (Mesh.colliding(player.mesh, potion.mesh)) {

				potion.effect(player);
				continue;

			}

		}

		for (let [color, switchArray] of Object.entries(switches)) {

			for (let switchObject of switchArray) {

				if (Mesh.colliding(player.mesh, switchObject.mesh) && keys.has(InputHandler.control.interact)) {

					keys.delete(InputHandler.control.interact);

					switchObject.flip();

				} 

			}

		}

	}

	static entityToActuator = function (surface, entity, sideCheck) {

		for (let [color, actuatorArray] of Object.entries(surface.actuators)) {

			for (let actuator of actuatorArray) {

				if (actuator.state == true) {

					for (let [side, mesh] of Object.entries(actuator.mesh)) {

						// Treat collisions opposite to tiles, as entity is inside tile mesh as opposed to being outside of the actuator mesh

						if (side == sideCheck && side == 'down' && keys.has(InputHandler.control.moveUp) && Mesh.colliding(mesh, entity.mesh)) {  // Top

							entity.pos.y = mesh.pos.y + (entity.mesh.size.y - entity.size.y);
							entity.mesh.pos.y = mesh.pos.y;
							return true;

						}

						if (side == sideCheck && side == 'up' && keys.has(InputHandler.control.moveDown) && Mesh.colliding(mesh, entity.mesh)) { // Bottom

							entity.pos.y = mesh.pos.y - entity.size.y;
							entity.mesh.pos.y = mesh.pos.y - entity.mesh.size.y;
							return true;

						}

						if (side == sideCheck && side == 'right' && keys.has(InputHandler.control.moveLeft) && Mesh.colliding(mesh, entity.mesh)) { // Left

							entity.pos.x = mesh.pos.x;
							entity.mesh.pos.x = mesh.pos.x;
							return true;

						}

						if (side == sideCheck && side == 'left' && keys.has(InputHandler.control.moveRight) && Mesh.colliding(mesh, entity.mesh)) { // Right

							entity.pos.x = mesh.pos.x - entity.size.x;
							entity.mesh.pos.x = mesh.pos.x - entity.mesh.size.x;
							return true;

						}

					}

				}

			}

		}

	}

	static entityToWall = function (surface, entity, sideCheck) {
		
		for (let row of surface.tiles) {

			for (let tile of row) {

				if (!tile || (tile.mesh['up'] && tile.mesh['down'] && tile.mesh['left'] && tile.mesh['right'])) continue;

				for (let [side, mesh] of Object.entries(tile.mesh)) {

					if (Mesh.colliding(mesh, entity.mesh)) {

						if (side == sideCheck && side == 'up' && Mesh.colliding(mesh, entity.mesh)) {

							entity.pos.y = mesh.pos.y + (entity.mesh.size.y - entity.size.y);
							entity.mesh.pos.y = mesh.pos.y;
							return true;

						}

						if (side == sideCheck && side == 'down' && Mesh.colliding(mesh, entity.mesh)) {

							entity.pos.y = mesh.pos.y - entity.size.y;
							entity.mesh.pos.y = mesh.pos.y - entity.mesh.size.y;
							return true;

						}

						if (side == sideCheck && side == 'left' && Mesh.colliding(mesh, entity.mesh)) {

							entity.pos.x = mesh.pos.x;
							entity.mesh.pos.x = mesh.pos.x;
							return true;

						}

						if (side == sideCheck && side == 'right' && Mesh.colliding(mesh, entity.mesh)) {

							entity.pos.x = mesh.pos.x - entity.size.x;
							entity.mesh.pos.x = mesh.pos.x - entity.mesh.size.x;
							return true;

						}

					}

				}

			}

		}

		return false;

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

		this.collide = true;

	}

}