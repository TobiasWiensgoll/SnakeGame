import SnakeModel from "../models/SnakeModel.js";
import Food from "../models/FoodModel.js";
import Field from "../models/Field.js";
import SnakeView from "../views/SnakeView.js";
import FoodView from "../views/FoodView.js";
import ObstacleModel from "../models/ObstacleModel.js";
import ObstacleView from "../views/ObstacleView";

import MysteryBox from "../models/items/Mysterybox.js";

import ItemDisplayView from "../views/ItemDisplayView.js";

import HtmlController from "./HtmlController.js";
import HtmlModel from "../models/HtmlModel.js";
import Item from "../models/items/Item.js";

export default class GameController {
  constructor(scene, levelId) {
    // Szene und Spielfeld erstellen
    this.scene = scene;
    this.levelId = levelId;
    let bg = this.scene.add.image(0, 0, "dungeon_background");
    bg.displayWidth = this.scene.sys.canvas.width;
    bg.displayHeight = this.scene.sys.canvas.height;
    bg.setOrigin(0, 0);
    this.field = new Field(scene, scene.scale.width, scene.scale.height, 40);

    // Schlange erstellen
    this.snakeModel = new SnakeModel(scene, this.field);
    this.snakeView = new SnakeView(scene, this.snakeModel);

    // Food-Model und -View erstellen
    this.foodModel = new Food(scene, this.field);
    this.foodView = new FoodView(scene, this.foodModel);

    // Obstacle-Model und -View erstellen
    this.obstacleModel = new ObstacleModel(scene, this.field);
    this.obstacleView = new ObstacleView(scene);

    // Mysterybox-Setup
    this.activeItems = [];
    this.currentActiveItem = false;
    this.mysteryBox = new MysteryBox(scene, this.field);
    //this.mysteryBox.spawn();
    this.activeFireball = null;
    this.activeTorch = false;
    this.lightMask = this.scene.add.graphics();

    // Item-Display erstellen
    this.itemDisplayView = new ItemDisplayView(scene);

    // Inputs erstellen
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.HtmlModel = new HtmlModel("Wilkommen", 0);
    this.HtmlController = new HtmlController(this.HtmlModel);

    // Flags erstellen
    this.disableCollisions = false; // Flag zum Deaktivieren der Kollisionen

    // Bewegung Setup
    this.keyLock = false; // Sperrt Tasteneingaben, um schnelle Richtungswechsel zu verhindern
    this.moveEvents = []; // Sammlung von Eingaben für Bewegungen
    this.initialize(levelId);
  }

  initialize(levelId) {
    this.scene.events.once("create", () => {
      if (this.HtmlModel.getGameModeId() != 1) {
        if (levelId === 1) {
          this.obstacleModel.setLevel(1);
          this.obstacleModel.createRandomObstacles();
          this.drawAllObstacles();
          this.mysteryBox.spawn();
          console.log("Level 1 ");
        }
        if (levelId === 2) {
          this.obstacleModel.setLevel(2);
          this.obstacleModel.createRandomObstacles();
          this.drawAllObstacles();
          this.mysteryBox.spawn();
          console.log("Level 2 ");
        }
        if (levelId === 3) {
          this.obstacleModel.setLevel(3);
          this.obstacleModel.createRandomObstacles();
          this.drawAllObstacles();
          this.mysteryBox.spawn();
          console.log("Level 3 ");
        }
      } else {
        this.obstacleModel.createLabyrinth();
        this.drawAllObstacles();
        this.mysteryBox.spawn();
        console.log("Labyrinth Mode");
      }
    });
  }

  drawAllObstacles() {
    this.obstacleModel.createRandomObstacles;
    const obstacleData = this.obstacleModel.getObstacles();
    this.obstacleView.drawAllObstacles(obstacleData);
  }

  // *********************************** INPUT-HANDLING ***********************************

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
  }

  /**
   * überprüft, ob der Spieler die Aktivierungstaste (Leertaste) gedrückt hat
   * und aktiviert das erste Item in der Liste der aktiven Items
   */
  handleItemActivation() {
    if (this.cursors.space.isDown) {
      if (this.activeItems[0] && !this.currentActiveItem) {
        this.currentActiveItem = true;
        console.log(this.activeItems);
        this.activeItems[0].onAction(this.snakeModel);
        this.removeItemFromDisplay();
      }
    }
    if (this.cursors.space.isUp) {
      this.currentActiveItem = false;
    }
  }

  // *********************************** COLLISION-HANDLING ***********************************

  /**
   * checkSnakeObstacleCollision() prüft, ob der Schlangenkopf ein Hindernis berührt
   * und ob die Schlange noch Leben hat.
   * Wenn ja, wird ein Leben abgezogen und das Hindernis entfernt.
   * Wenn die Schlange keine Leben mehr hat, wird das Spiel beendet.
   * 
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

  /**
   * checkItemObstacleCollision() prüft, ob ein Item ein Hindernis berührt.
   * Wenn ja, wird true zurückgegeben, ansonsten false.
   * @param {*} item 
   * @returns 
   */
  checkItemObstacleCollision(item) {
    const obstacles = this.obstacleModel.getObstacles();
    if(item.x === null || item.y === null) {
      return;
    }
    const itemPos = this.field.alignToGrid(
      item.x,
      item.y
    );

    for (const obstacle of obstacles) {
      const obstaclePos = this.field.alignToGrid(obstacle.x, obstacle.y);

      if (
        itemPos.x === obstaclePos.x &&
        itemPos.y === obstaclePos.y
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * checkSnakeFoodCollision() prüft, ob der Schlangenkopf die Nahrung berührt.
   * Wenn ja, wächst die Schlange und die Nahrung wird an einer neuen Position respawnt.
   * @returns
   */
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

  /**
   * checkSelfCollision() prüft, ob der Schlangenkopf mit einem Körpersegment kollidiert.
   * Falls eine Kollision festgestellt wird, wird die Schlange als tot markiert.
   */
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

  // *********************************** ITEMS COLLISIONS ***********************************

  /**
   * prüft, ob der Schlangenkopf die Mysterybox berührt
   * wenn ja, wird ein zufälliges Item aus der Mysterybox generiert
   * @returns
   */
  checkSnakeMysteryBoxCollision() {
    if (
      this.scene.physics.overlap(
        this.snakeModel.snakeHead,
        this.mysteryBox.sprite
      )
    ) {
      console.log(this.activeItems.length);
      this.addItemToDisplay(
        this.mysteryBox.onCollision(
          this.snakeModel,
          this.activeItems.length >= 4
        )
      );
    }
    return false;
  }

  /**
   * prüft, ob der Feuerball ein Hindernis trifft
   * bei einer Kollision wird der Feuerball gestoppt und das Hindernis entfernt
   * @returns
   */
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

  /**
   * aktualisiert den Lichteffekt, der von der Fackel erzeugt wird
   * wenn die Fackel aktiv ist, wird ein Lichteffekt um den Schlangenkopf erzeugt
   */
  updateLightMask() {
    if (this.activeTorch) {
      var maskImg = this.scene.add
        .image(
          this.snakeModel.snakeHead.x,
          this.snakeModel.snakeHead.y,
          "lightMask"
        )
        .setVisible(false);
      var mask = maskImg.createBitmapMask();
      mask.invertAlpha = true;

      this.lightMask.clear();
      this.lightMask.fillStyle(0x000000, 0.9);
      this.lightMask.setMask(mask);
      this.lightMask.fillRect(
        0,
        0,
        this.scene.sys.canvas.width,
        this.scene.sys.canvas.height
      );
    }
  }

  // ****************************************************************************************

  /**
   * endGame() markiert die Schlange als tot
   */
  endGame() {
    console.log("Endgame");
    this.snakeModel.alive = false;
    console.log("getscore " + this.snakeModel.getScore());
    this.HtmlModel.setKronen(this.snakeModel.getScore());
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
    this.handleItemActivation();
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
          this.checkSnakeMysteryBoxCollision();
          this.checkFireBallObstacleCollision();
          this.updateLightMask();
        }
      } else if (!this.snakeModel.alive) {
        this.endGame();
      }
    }
  }

  // *********************************** ITEM DISPLAY ***********************************

  addItemToDisplay(item) {
    if (item && item !== null) {
      this.activeItems.push(item);
      console.log(this.activeItems);
      this.itemDisplayView.addItem(item);
    } else if (item === null) {
      this.itemDisplayView.redOutline();
    }
  }

  removeItemFromDisplay() {
    this.activeItems.shift();
    this.itemDisplayView.removeItem(1);
  }
}
