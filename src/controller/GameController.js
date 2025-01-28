import SnakeModel from "../models/SnakeModel.js";
import Food from "../models/FoodModel.js";
import Field from "../models/Field.js";
import SnakeView from "../views/SnakeView.js";
import FoodView from "../views/FoodView.js";
import ObstacleModel from "../models/ObstacleModel.js";
import ObstacleView from "../views/ObstacleView";
<<<<<<< HEAD

import HelmetItem from "../models/items/Helmet.js";
import SpeedUp from "../models/items/SpeedUp.js";
import Multiplikator from "../models/items/Multiplikator.js";
import MysteryBox from "../models/items/Mysterybox.js";
import Freeze from "../models/items/Freeze.js";
import FireItem from "../models/items/Fire.js";
import PotionItem from "../models/items/Potion.js";

import ItemDisplayView from "../views/ItemDisplayView.js"

=======
import HelmetItem from "../models/Helmet.js";
import SpeedUp from "../models/SpeedUp.js";
import Multiplikator from "../models/Multiplikator.js";
import MysteryBox from "../models/Mysterybox.js";
import Freeze from "../models/Freeze.js";
import FireItem from "../models/Fire.js";
import PotionItem from "../models/Potion.js";
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb
import HtmlController from "./HtmlController.js";

export default class GameController {
  constructor(scene) {

    // Szene und Spielfeld erstellen
    this.scene = scene;
    let bg = this.scene.add.image(0, 0, "dungeon_background");
    bg.displayWidth = this.scene.sys.canvas.width;
    bg.displayHeight = this.scene.sys.canvas.height;
    bg.setOrigin(0, 0);
    this.field = new Field(scene, scene.scale.width, scene.scale.height, 40);

    // Schlange erstellen
    this.snakeModel = new SnakeModel(scene, this.field);
    this.snakeView = new SnakeView(scene, this.snakeModel);
<<<<<<< HEAD

    // Food-Model und -View erstellen
    this.foodModel = new Food(scene, this.field);
    this.foodView = new FoodView(scene, this.foodModel);

    // Obstacle-Model und -View erstellen
    this.obstacleModel = new ObstacleModel(scene, this.field);
    this.obstacleView = new ObstacleView(scene);

    // Items erstellen (zu Testzwecken)
    this.activeItems = [];
    this.mysteryBox = new MysteryBox(scene, this.field);
    this.mysteryBox.spawn();
    this.fireItem = new FireItem(scene, this.field);
    this.potionItem = new PotionItem(scene, this.field);
    this.freeze = new Freeze(scene, this.field);
    this.speedup = new SpeedUp(scene, this.field);
    this.helmetItem = new HelmetItem(scene, this.field);
    this.multiplikator = new Multiplikator(scene, this.field);
    this.activeFireball = null;

    this.itemDisplayView = new ItemDisplayView(scene);

    // Inputs erstellen
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.HtmlController = new HtmlController();

    // Flags erstellen
    this.disableCollisions = false; // Flag zum Deaktivieren der Kollisionen

    // Bewegung Setup
=======
    this.foodModel = new Food(scene, this.field);
    this.foodView = new FoodView(scene, this.foodModel);
    this.obstacleModel = new ObstacleModel(scene, this.field);
    this.obstacleView = new ObstacleView(scene);
    this.mysteryBox = new MysteryBox(scene, this.field);
    this.fireItem = new FireItem(scene, this.field);
    this.potionItem = new PotionItem(scene, this.field);
    this.freeze = new Freeze(scene, this.field);
    this.speedup = new SpeedUp(scene, this.field);
    this.helmetItem = new HelmetItem(scene, this.field);
    this.multiplikator = new Multiplikator(scene, this.field);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.HtmlController = new HtmlController();

    this.disableCollisions = false; // Flag zum Deaktivieren der Kollisionen
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb
    this.keyLock = false; // Sperrt Tasteneingaben, um schnelle Richtungswechsel zu verhindern
    this.moveEvents = []; // Sammlung von Eingaben für Bewegungen
  }



  /**
   * handleInput() überprüft die Tasten-Eingaben des Spielers und ändert die Bewegungsrichtung der Schlange,
   * solange keine entgegengesetzte Richtung gewählt wurde (z.B. nicht nach links, wenn die Schlange nach rechts fährt).
   * @returns 
   */
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
    if (this.cursors.space.isDown) {
<<<<<<< HEAD
      if(this.activeItems[0]){
        console.log(this.activeItems[0]);
        this.activeItems[0].onAction(this.snakeModel);
        this.removeItemFromDisplay();
      }
      
    }
  }

  /**
   * checkSnakeFoodCollision() prüft, ob der Schlangenkopf die Nahrung berührt.
   * Wenn ja, wächst die Schlange und die Nahrung wird an einer neuen Position respawnt.
   * @returns 
   */
  checkSnakeObstacleCollision() {
    if (!this.disableCollisions) {
      const obstacles = this.obstacleModel.getObstacles();
      const snakeHeadPos = this.field.alignToGrid(
        this.snakeModel.snakeHead.x,
        this.snakeModel.snakeHead.y
      );

      for (const obstacle of obstacles) {
        const obstaclePos = this.field.alignToGrid(obstacle.x, obstacle.y);

        if (
          snakeHeadPos.x === obstaclePos.x &&
          snakeHeadPos.y === obstaclePos.y
        ) {
          if (this.snakeModel.lives > 1) {
            this.snakeModel.loseLife();
            this.obstacleModel.removeObstacle(obstacle.x, obstacle.y);
            this.obstacleView.removeObstacle(obstacle.x, obstacle.y);
          } else {
            this.snakeModel.loseLife();
            if (!this.snakeModel.alive) {
              this.endGame();
            }
          }
          return true;
        }
      }
    }
    return false;
  }

=======
      this.fireItem.shootFireBall(this.snakeModel);
    }
  }

  // checkSnakeFoodCollision() prüft, ob der Schlangenkopf die Nahrung berührt.
  // Wenn ja, wächst die Schlange und die Nahrung wird an einer neuen Position respawnt.
  checkSnakeObstacleCollision() {
    if (!this.disableCollisions) {
      const obstacles = this.obstacleModel.getObstacles();
      const snakeHeadPos = this.field.alignToGrid(
        this.snakeModel.snakeHead.x,
        this.snakeModel.snakeHead.y
      );

      for (const obstacle of obstacles) {
        const obstaclePos = this.field.alignToGrid(obstacle.x, obstacle.y);

        if (
          snakeHeadPos.x === obstaclePos.x &&
          snakeHeadPos.y === obstaclePos.y
        ) {
          if (this.snakeModel.lives > 1) {
            this.snakeModel.loseLife();
            this.obstacleModel.removeObstacle(obstacle.x, obstacle.y);
            this.obstacleView.removeObstacle(obstacle.x, obstacle.y);
          } else {
            this.snakeModel.loseLife();
            if (!this.snakeModel.alive) {
              this.endGame();
            }
          }
          return true;
        }
      }
    }
    return false;
  }

>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb
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

  drawAllObstacles() {
    this.obstacleModel.createObstacles();
    const obstacleData = this.obstacleModel.getObstacles();
    this.obstacleView.drawAllObstacles(obstacleData);
  }

<<<<<<< HEAD
  /**
   * checkSelfCollision() prüft, ob der Schlangenkopf mit einem Körpersegment kollidiert.
   * Falls eine Kollision festgestellt wird, wird die Schlange als tot markiert.
   */
=======
  // checkSelfCollision() prüft, ob der Schlangenkopf mit einem Körpersegment kollidiert.
  // Falls eine Kollision festgestellt wird, wird die Schlange als tot markiert.
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb
  checkSelfCollision() {
    if (!this.disableCollisions) {
      for (let i = 1; i < this.snakeModel.body.length; i++) {
        if (
          this.snakeModel.snakeHead.x === this.snakeModel.body[i].x &&
          this.snakeModel.snakeHead.y === this.snakeModel.body[i].y
        ) {
          this.snakeModel.alive = false;
          this.endGame();
        }
      }
    }
  }

  /**
   * checkWallCollision() überprüft, ob der Schlangenkopf das Spielfeld verlässt.
   * Falls der Kopf den Rand des Spielfelds überschreitet, wird die Schlange als tot markiert.
   * @param {*} snakeHead 
   */
  checkWallCollision(snakeHead) {
    if (
      snakeHead.x > this.scene.game.config.width ||
      snakeHead.x < 0 ||
      snakeHead.y > this.scene.game.config.height ||
      snakeHead.y < 0
    ) {
      this.snakeModel.alive = false;
      this.endGame();
    }
  }

<<<<<<< HEAD
  // *********************************** ITEMS COLLISIONS ***********************************
=======
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb
  checkSnakePotionCollision() {
    if (
      this.scene.physics.overlap(
        this.snakeModel.snakeHead,
        this.potionItem.sprite
      )
    ) {
      this.potionItem.onCollision(this.snakeModel);
      this.disableCollisions = true;
      this.scene.time.delayedCall(5000, () => {
        this.disableCollisions = false;
      });
      this.potionItem.spawn(); // Respawn des Helm-Items
      return true;
    }
    return false;
<<<<<<< HEAD
=======
  }

  checkSnakeFireCollision() {
    if (
      this.scene.physics.overlap(
        this.snakeModel.snakeHead,
        this.fireItem.sprite
      )
    ) {
      this.fireItem.onCollision(this.snakeModel);
      return true;
    }
    return false;
  }

  checkFireBallObstacleCollision() {
    if (this.fireItem.fireBall) {
      const obstacles = this.obstacleModel.getObstacles();
      const fireBallPos = this.field.alignToGrid(
        this.fireItem.fireBall.x,
        this.fireItem.fireBall.y
      );
      for (const obstacle of obstacles) {
        const obstaclePos = this.field.alignToGrid(obstacle.x, obstacle.y);
        if (
          fireBallPos.x === obstaclePos.x &&
          fireBallPos.y === obstaclePos.y
        ) {
          this.obstacleModel.removeObstacle(obstacle.x, obstacle.y);
          this.obstacleView.removeObstacle(obstacle.x, obstacle.y);
          break;
        }
      }
    }
  }
  checkSnakeFreezeCollision() {
    if (
      this.scene.physics.overlap(this.snakeModel.snakeHead, this.freeze.sprite)
    ) {
      this.freeze.onCollision(this.snakeModel);
      this.freeze.spawn(); // Respawn des Freeze-Items
      return true;
    }
    return false;
  }

  checkSnakeHelmetCollision() {
    if (
      this.scene.physics.overlap(
        this.snakeModel.snakeHead,
        this.helmetItem.sprite
      )
    ) {
      this.helmetItem.onCollision(this.snakeModel);
      this.helmetItem.spawn(); // Respawn des Helm-Items
      return true;
    }
    return false;
  }

  checkSnakeSpeedUpCollision() {
    if (
      this.scene.physics.overlap(this.snakeModel.snakeHead, this.speedup.sprite)
    ) {
      this.speedup.onCollision(this.snakeModel);
      this.speedup.spawn(); // Respawn des SpeedUp-Items
      return true;
    }
    return false;
  }

  checkSnakeMultiplikatorCollision() {
    if (
      this.scene.physics.overlap(
        this.snakeModel.snakeHead,
        this.multiplikator.sprite
      )
    ) {
      this.multiplikator.onCollision(this.snakeModel);
      this.multiplikator.spawn(); // Respawn des Multiplikator-Items
      return true;
    }
    return false;
  }

  checkSnakeMysteryBoxCollision() {
    if (
      this.scene.physics.overlap(
        this.snakeModel.snakeHead,
        this.mysteryBox.sprite
      )
    ) {
      this.mysteryBox.onCollision(this.snakeModel);
      this.mysteryBox.spawn(); // Respawn des mysterybox-Items
      return true;
    }
    return false;
  }

  // endGame() markiert die Schlange als tot
  endGame() {
    console.log("Endgame");
    this.snakeModel.alive = false;
    this.HtmlController.handleDeath();
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb
  }

  checkSnakeFireCollision() {
    if (
      this.scene.physics.overlap(
        this.snakeModel.snakeHead,
        this.fireItem.sprite
      )
    ) {
      this.fireItem.onCollision(this.snakeModel);
      return true;
    }
    return false;
  }

  checkFireBallObstacleCollision() {
    if (this.activeFireball) {
      console.log("active");
      if (
        this.activeFireball.sprite.x > this.scene.game.config.width ||
        this.activeFireball.sprite.x < 0 ||
        this.activeFireball.y > this.scene.game.config.height ||
        this.activeFireball.y < 0
      ) {
        this.activeFireball.stopFireBall();
        return;
      }
      const obstacles = this.obstacleModel.getObstacles();
      const fireBallPos = this.field.alignToGrid(
        this.activeFireball.x,
        this.activeFireball.y
      );
      for (const obstacle of obstacles) {
        const obstaclePos = this.field.alignToGrid(obstacle.x, obstacle.y);
        if (
          fireBallPos.x === obstaclePos.x &&
          fireBallPos.y === obstaclePos.y
        ) {
          this.obstacleModel.removeObstacle(obstacle.x, obstacle.y);
          this.obstacleView.removeObstacle(obstacle.x, obstacle.y);
          this.activeFireball.stopFireBall();
          return;
        }
      }
      
    }
  }
  checkSnakeFreezeCollision() {
    if (
      this.scene.physics.overlap(this.snakeModel.snakeHead, this.freeze.sprite)
    ) {
      this.freeze.onCollision(this.snakeModel);
      this.freeze.spawn(); // Respawn des Freeze-Items
      return true;
    }
    return false;
  }

  checkSnakeHelmetCollision() {
    if (
      this.scene.physics.overlap(
        this.snakeModel.snakeHead,
        this.helmetItem.sprite
      )
    ) {
      this.helmetItem.onCollision(this.snakeModel);
      this.helmetItem.spawn(); // Respawn des Helm-Items
      return true;
    }
    return false;
  }

  checkSnakeSpeedUpCollision() {
    if (
      this.scene.physics.overlap(this.snakeModel.snakeHead, this.speedup.sprite)
    ) {
      this.speedup.onCollision(this.snakeModel);
      this.speedup.spawn(); // Respawn des SpeedUp-Items
      return true;
    }
    return false;
  }

  checkSnakeMultiplikatorCollision() {
    if (
      this.scene.physics.overlap(
        this.snakeModel.snakeHead,
        this.multiplikator.sprite
      )
    ) {
      this.multiplikator.onCollision(this.snakeModel);
      this.multiplikator.spawn(); // Respawn des Multiplikator-Items
      return true;
    }
    return false;
  }

  checkSnakeMysteryBoxCollision() {
    if (
      this.scene.physics.overlap(
        this.snakeModel.snakeHead,
        this.mysteryBox.sprite
      )
    ) {
      this.addItemToDisplay(this.mysteryBox.onCollision(this.snakeModel));
      return true;
    }
    return false;
  }
  // ****************************************************************************************

  /**
   * endGame() markiert die Schlange als tot
   */
  endGame() {
    console.log("Endgame");
    this.snakeModel.alive = false;
    this.HtmlController.handleDeath();
  }

  /**
   * update() wird in jedem Frame aufgerufen, um die Eingaben zu verarbeiten, die Schlange zu bewegen
   * und Kollisionen zu überprüfen. Wenn die Schlange sich bewegt, werden Kollisionen mit sich selbst,
   * dem Essen und den Wänden geprüft. Bei einer Kollision endet das Spiel.
   * @param {*} time 
   */
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
          this.checkSnakeObstacleCollision();
          this.checkWallCollision(this.snakeModel.snakeHead);
          this.checkSnakeHelmetCollision();
          this.checkSnakeSpeedUpCollision();
          this.checkSnakeMultiplikatorCollision();
          this.checkSnakeFreezeCollision();
          this.checkSnakeMysteryBoxCollision();
          this.checkSnakeFireCollision();
          this.checkSnakePotionCollision();
          this.checkFireBallObstacleCollision();
        }
      } else if (!this.snakeModel.alive) {
        this.endGame();
      }
    }
  }

  addItemToDisplay(item) {
    this.activeItems.push(item);
    this.itemDisplayView.addItem(item);
  }

  removeItemFromDisplay() {
    this.activeItems.shift();
    this.itemDisplayView.removeItem(1);
  }
}
