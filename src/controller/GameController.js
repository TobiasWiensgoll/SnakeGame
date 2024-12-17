import SnakeModel from "../models/SnakeModel.js";
import Food from "../models/FoodModel.js";
import Field from "../models/Field.js";
import SnakeView from "../views/snakeView.js";
import FoodView from "../views/FoodView.js";

export default class GameController {
  constructor(scene) {
    this.scene = scene;
    let bg = this.scene.add.image(0, 0, "dungeon_background");
    bg.displayWidth = this.scene.sys.canvas.width;
    bg.displayHeight = this.scene.sys.canvas.height;
    bg.setOrigin(0, 0);
    this.field = new Field(scene, scene.scale.width, scene.scale.height, 40);
    this.snakeModel = new SnakeModel(scene, this.field);
    this.snakeView = new SnakeView(scene, this.snakeModel);
    this.foodModel = new Food(scene, this.field);
    this.foodView = new FoodView(scene, this.foodModel);
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.keyLock = false; // Sperrt Tasteneingaben, um schnelle Richtungswechsel zu verhindern
    this.moveEvents = []; // Sammlung von Eingaben für Bewegungen
  }

  // handleInput() überprüft die Tasten-Eingaben des Spielers und ändert die Bewegungsrichtung der Schlange,
  // solange keine entgegengesetzte Richtung gewählt wurde (z.B. nicht nach links, wenn die Schlange nach rechts fährt).
  handleInput() {
    if (this.keyLock) return; // Input ignorieren, wenn Bewegung aktiv ist
  
    const inputMap = {
      left: {
        key: this.cursors.left,
        direction: Phaser.Math.Vector2.LEFT,
        opposite: -1,
      },
      right: {
        key: this.cursors.right,
        direction: Phaser.Math.Vector2.RIGHT,
        opposite: -1,
      },
      up: {
        key: this.cursors.up,
        direction: Phaser.Math.Vector2.UP,
        opposite: -1,
      },
      down: {
        key: this.cursors.down,
        direction: Phaser.Math.Vector2.DOWN,
        opposite: -1,
      },
    };
  
    for (const key in inputMap) {
      const input = inputMap[key];
      if (
        input.key.isDown &&
        this.snakeModel.direction.dot(input.direction) !== input.opposite
      ) {
        this.moveEvents.push(input.direction); // Bewegung in den Puffer
        this.keyLock = true; // Lock aktivieren
        break;
      }
    }
  }
  

  // checkSnakeFoodCollision() prüft, ob der Schlangenkopf die Nahrung berührt.
  // Wenn ja, wächst die Schlange und die Nahrung wird an einer neuen Position respawnt.
  checkSnakeFoodCollision() {
    if (
      this.scene.physics.overlap(this.snakeModel.snakeHead, this.foodModel.food)
    ) {
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
      if (
        this.snakeModel.snakeHead.x === this.snakeModel.body[i].x &&
        this.snakeModel.snakeHead.y === this.snakeModel.body[i].y
      ) {
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
      this.keyLock = false;
      if (this.moveEvents.length > 0) {
        this.snakeModel.direction = this.moveEvents.shift();
      }
      let moved = this.snakeModel.move();
      if (moved) {
        if (this.checkSelfCollision()) {
          this.endGame();
        } else {
          this.snakeView.updateBodyTextures();
          this.checkSnakeFoodCollision();
          this.checkWallCollision(this.snakeModel.snakeHead);
        }
      } else if (!this.snakeModel.alive) {
        this.endGame();
      }
    }
  }
}
