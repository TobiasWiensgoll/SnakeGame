import SnakeModel from "../models/SnakeModel.js";
import Food from "../models/FoodModel.js";
import Field from "../models/Field.js";
import SnakeView from "../views/snakeView.js";
import FoodView from "../views/FoodView.js";

export default class GameController {
    constructor(scene) {
        this.scene = scene;
        this.field = new Field(scene, scene.scale.width, scene.scale.height, 40);
        this.snakeModel = new SnakeModel(scene, this.field);
        this.snakeView = new SnakeView(scene, this.snakeModel);
        this.foodModel = new Food(scene, this.field);
        this.foodView = new FoodView(scene, this.foodModel);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    // handleInput() überprüft die Tasten-Eingaben des Spielers und ändert die Bewegungsrichtung der Schlange,
    // solange keine entgegengesetzte Richtung gewählt wurde (z.B. nicht nach links, wenn die Schlange nach rechts fährt).
    handleInput() {
        if (this.cursors.left.isDown && this.snakeModel.direction.x !== 1) this.snakeModel.direction = Phaser.Math.Vector2.LEFT;
        else if (this.cursors.right.isDown && this.snakeModel.direction.x !== -1) this.snakeModel.direction = Phaser.Math.Vector2.RIGHT;
        else if (this.cursors.up.isDown && this.snakeModel.direction.y !== 1) this.snakeModel.direction = Phaser.Math.Vector2.UP;
        else if (this.cursors.down.isDown && this.snakeModel.direction.y !== -1) this.snakeModel.direction = Phaser.Math.Vector2.DOWN;
    }

    // checkSnakeFoodCollision() prüft, ob der Schlangenkopf die Nahrung berührt.
    // Wenn ja, wächst die Schlange und die Nahrung wird an einer neuen Position respawnt.
    checkSnakeFoodCollision() {
        if (this.scene.physics.overlap(this.snakeModel.snakeHead, this.foodModel.food)) {
            this.snakeModel.grow();
            this.foodModel.respawn();
            return true;
        }
        return false;
    }

    // checkSelfCollision() prüft, ob der Schlangenkopf mit einem Körpersegment kollidiert.
    // Falls eine Kollision festgestellt wird, wird die Schlange als tot markiert.
    checkSelfCollision() {
        for (let i = 1; i < this.snakeModel.body.length; i++) {
            if (this.snakeModel.snakeHead.x === this.snakeModel.body[i].x && this.snakeModel.snakeHead.y === this.snakeModel.body[i].y) {
                this.snakeModel.alive = false; 
            }
        }
    }

    // checkWallCollision() überprüft, ob der Schlangenkopf das Spielfeld verlässt.
    // Falls der Kopf den Rand des Spielfelds überschreitet, wird die Schlange als tot markiert.
    checkWallCollision(snakeHead) {
        if (
        snakeHead.x > this.scene.game.config.width ||
        snakeHead.x < 0 ||
        snakeHead.y > this.scene.game.config.height ||
        snakeHead.y < 0
        ) {
        this.SnakeModel.alive = false;
        }
    }

    // endGame() markiert die Schlange als tot
    endGame() {
        this.alive = false;
    }

    // update() wird in jedem Frame aufgerufen, um die Eingaben zu verarbeiten, die Schlange zu bewegen
    // und Kollisionen zu überprüfen. Wenn die Schlange sich bewegt, werden Kollisionen mit sich selbst,
    // dem Essen und den Wänden geprüft. Bei einer Kollision endet das Spiel.
    update(time) {  
        this.handleInput();
        if (time >= this.snakeModel.moveTime && this.snakeModel.alive) {
        let moved = this.snakeModel.move();
        if (moved) {
            if (this.checkSelfCollision()) {
            this.endGame();
            } else {
            this.snakeView.updateBodyTextures();
            this.checkSnakeFoodCollision();
            this.checkWallCollision(this.snakeModel.snakeHead)
            }
        } else if (!this.snakeModel.alive) {
            this.endGame();
        }
        }
    }
}