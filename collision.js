class CollisionHandler {

    static drawCollisionBox = function (posX, posY, sizeX, sizeY) {

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

	static playerObjectCollisions = function (surface, player, enemies, coins, ladders) {

		for (let enemy of enemies) {

			if (CollisionHandler.colliding(player.weapon, enemy)) {

				enemy.kill();
				continue;

			}

			if (CollisionHandler.colliding(player, enemy)) {

				player.hit();
				continue;

			}

		}

		for (let coin of coins) {

			if (CollisionHandler.colliding(coin, player)) {

				coin.collect(player);
				continue;

			}

		}

		for (let ladder of ladders) {

			if (CollisionHandler.colliding(player, ladder) && keys.has(InputHandler.control.interact)) {

				ladder.changeLevel(surface, player);

			}

		}

	}

	static playerWallCollisions = function (surface, player) {

		for (let row of surface.tiles) {

			for (let tile of row) {

				if (!tile) continue;

			}

		}

	}

}