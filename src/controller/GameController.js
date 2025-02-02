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
import { startGame } from "../main.js";
import Portal from "../models/Portal.js";

export default class GameController {
  constructor(scene, levelId, skinId) {
    // Szene und Spielfeld erstellen
    this.scene = scene;
    this.levelId = levelId;
    this.skinId = skinId;
    let bg = this.scene.add.image(0, 0, "dungeon_background");
    bg.displayWidth = this.scene.sys.canvas.width;
    bg.displayHeight = this.scene.sys.canvas.height;
    bg.setOrigin(0, 0);
    this.field = new Field(scene, scene.scale.width, scene.scale.height, 40);

    // Schlange erstellen
    this.snakeModel = new SnakeModel(scene, this.field);
    this.snakeView = new SnakeView(scene, this.snakeModel);

    this.score = 0;
    this.isDoublePointsActive = false;

    // Food-Model und -View erstellen
    this.foodModel = new Food(scene, this.field);
    this.foodView = new FoodView(scene, this.foodModel);

    // Obstacle-Model und -View erstellen
    this.obstacleModel = new ObstacleModel(scene, this.field);
    this.obstacleView = new ObstacleView(scene);

    this.portal = new Portal(scene, this.field);

    // Mysterybox-Setup
    this.activeItems = [];
    this.currentActiveItem = false;
    this.mysteryBox = new MysteryBox(scene, this.field);
    this.activeTorch = false;
    this.lightMask = this.scene.add.graphics();
    this.lightMask.setDepth(1);

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
    this.initialize();
  }

  /**
   * initialize() wird aufgerufen, sobald die Szene erstellt wurde.
   * Hier wird das Level initialisiert und die Hindernisse, Nahrung und Mysteryboxen erstellt.
   * 
   */
  initialize() {
    this.scene.events.once("create", () => {
      if (this.levelId === 1) {
        console.log("Level 1 ");
        this.obstacleModel.setLevel(1)
        this.obstacleModel.createRandomObstacles();
        this.drawAllObstacles();
        this.mysteryBox.spawn();
        this.foodModel.respawn();
      }
      if (this.levelId === 2) {
        console.log("Level 2 ");
        this.obstacleModel.setLevel(2)
        this.obstacleModel.createRandomObstacles();
        this.drawAllObstacles();
        this.mysteryBox.spawn();
        this.foodModel.respawn();
      }
      if (this.levelId === 3) {
        console.log("Level 3 ");
        this.obstacleModel.setLevel(3)
        this.obstacleModel.createRandomObstacles();
        this.drawAllObstacles();
        this.mysteryBox.spawn();
        this.foodModel.respawn();
      }
      if (this.levelId === 4) {
        console.log("Labyrinth ");
        this.obstacleModel.createLabyrinth();
        this.drawAllObstacles();
        this.mysteryBox.spawn();
        this.foodModel.respawn();
        this.snakeModel.lives = 3;
      }
    });
  }

  /**
   * drawAllObstacles() zeichnet alle Hindernisse auf dem Spielfeld.
   */
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
            this.addPoints(5);
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
   * checkObstacleCollision() prüft, ob ein Objekt ein Hindernis berührt.
   * Wenn ja, wird true zurückgegeben, ansonsten false.
   * @param {*} item 
   * @returns 
   */
  checkObstacleCollision(object) {
    const obstacles = this.obstacleModel.getObstacles();
    if(object.x === null || object.y === null) {
      console.log("object is null");
      return;
    }
    const objectPos = this.field.alignToGrid(
      object.x,
      object.y
    );

    for (const obstacle of obstacles) {
      const obstaclePos = this.field.alignToGrid(obstacle.x, obstacle.y);

      if (
        objectPos.x === obstaclePos.x &&
        objectPos.y === obstaclePos.y
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

  /**
   * checkPortalCollision() prüft, ob der Schlangenkopf das Portal berührt.
   * Wenn ja, wird das aktuelle Level beendet und das nächste Level gestartet.
   * @returns 
   */
  checkPortalCollision() {
    if(!this.portal.sprite){
      return;
    }
    if (
      this.snakeModel.snakeHead.x === this.portal.sprite.x &&
      this.snakeModel.snakeHead.y === this.portal.sprite.y
    ) {
      this.snakeModel.alive = false;
      this.portal.destroy();
      if(this.levelId < 4){
        startGame(this.levelId + 1, this.skinId);
      } else {
        startGame(1, this.skinId);
      }
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

  // *********************************** GAME LOGIC ***********************************

  /**
   * doublePoints() aktiviert oder deaktiviert den Punktemultiplikator.
   * @param {*} isActive 
   */
  doublePoints(isActive) {
    this.isDoublePointsActive = isActive;
  }

  /**
   * addPoints() erhöht den Punktestand um den übergebenen Betrag.
   * @param {*} amount 
   */
  addPoints(amount) {
    if (this.isDoublePointsActive) {
      amount *= 2; // Verdoppelt die Punkte
    }

    this.score += amount; // Punktestand erhöhen
    console.log('Score:', this.score); // Optional: Ausgabe des Punktestands im Konsolenlog
  }

  getScore(){
    return this.score;
  }

  /**
   * endGame() markiert die Schlange als tot
   */
  endGame() {
    console.log("Endgame");
    this.snakeModel.alive = false;
    console.log("getscore " + this.getScore());
    this.HtmlModel.setKronen(this.getScore());
    this.HtmlController.handleDeath();
  }

  /**
   * update() wird in jedem Frame aufgerufen, um die Eingaben zu verarbeiten, die Schlange zu bewegen
   * und Kollisionen zu überprüfen. Wenn die Schlange sich bewegt, werden Kollisionen mit sich selbst,
   * dem Essen und den Wänden geprüft. Bei einer Kollision endet das Spiel.
   * @param {*} time
   */
  update(time) {
    if(this.score >= 30 && !this.portal.sprite){
      this.portal.spawn();
    }
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
          this.updateLightMask();
          this.checkPortalCollision();
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
