import GameController from "../controller/GameController.js";

// Food / Obstacles importieren / background
import dungeonBackgroundImage from "../assets/images/dungeon_background.jpg";
import dungeonBackgroundImage2 from "../assets/images/forest_background.png";
import dungeonBackgroundImage3 from "../assets/images/sky_background.gif";
import obstacleBrickImage from "../assets/images/obstacle_brick.png";
import appleImage from "../assets/images/apple.png";
import foodImage from "../assets/images/food.png";

// Snake-Bilder importieren
import headRight from "../assets/snake/head_right.png";
import headLeft from "../assets/snake/head_left.png";
import headUp from "../assets/snake/head_up.png";
import headDown from "../assets/snake/head_down.png";
import bodyHorizontal from "../assets/snake/body_horizontal.png";
import bodyVertical from "../assets/snake/body_vertical.png";
import bodyRightUp from "../assets/snake/body_rightup.png";
import bodyRightDown from "../assets/snake/body_rightdown.png";
import bodyDownRight from "../assets/snake/body_downright.png";
import bodyUpRight from "../assets/snake/body_upright.png";
import tailRight from "../assets/snake/tail_right.png";
import tailLeft from "../assets/snake/tail_left.png";
import tailUp from "../assets/snake/tail_up.png";
import tailDown from "../assets/snake/tail_down.png";

// Haku Skin importieren
import headRighth from "../assets/snake/haku/head_right.png";
import headLefth from "../assets/snake/haku/head_left.png";
import headUph from "../assets/snake/haku/head_up.png";
import headDownh from "../assets/snake/haku/head_down.png";
import bodyHorizontalh from "../assets/snake/haku/body_horizontal.png";
import bodyVerticalh from "../assets/snake/haku/body_vertical.png";
import bodyRightUph from "../assets/snake/haku/body_rightup.png";
import bodyRightDownh from "../assets/snake/haku/body_rightdown.png";
import bodyDownRighth from "../assets/snake/haku/body_downright.png";
import bodyUpRighth from "../assets/snake/haku/body_upright.png";
import tailRighth from "../assets/snake/haku/tail_right.png";
import tailLefth from "../assets/snake/haku/tail_left.png";
import tailUph from "../assets/snake/haku/tail_up.png";
import tailDownh from "../assets/snake/haku/tail_down.png";

// Pink Skin importieren
import headRightp from "../assets/snake/pink/head_right.png";
import headLeftp from "../assets/snake/pink/head_left.png";
import headUpp from "../assets/snake/pink/head_up.png";
import headDownp from "../assets/snake/pink/head_down.png";
import bodyHorizontalp from "../assets/snake/pink/body_horizontal.png";
import bodyVerticalp from "../assets/snake/pink/body_vertical.png";
import bodyRightUpp from "../assets/snake/pink/body_rightup.png";
import bodyRightDownp from "../assets/snake/pink/body_rightdown.png";
import bodyDownRightp from "../assets/snake/pink/body_downright.png";
import bodyUpRightp from "../assets/snake/pink/body_upright.png";
import tailRightp from "../assets/snake/pink/tail_right.png";
import tailLeftp from "../assets/snake/pink/tail_left.png";
import tailUpp from "../assets/snake/pink/tail_up.png";
import tailDownp from "../assets/snake/pink/tail_down.png";

// Mysterybox-Bild importieren
import mysteryBoxImg from "../assets/images/items/mysteryBox.png";
// Handicap-Bilder importieren
import flashlightImg from "../assets/images/items/handicaps/flashlight.png";
import lightMaskImg from "../assets/images/light_mask.png";
import growthImg from "../assets/images/items/handicaps/growth.png";
import reverseImg from "../assets/images/items/handicaps/reverse.png";
import speedImg from "../assets/images/items/handicaps/speed.png";
// Powerup-Bilder importieren
import fireImg from "../assets/images/items/powerups/fire.png";
import fireBallImg from "../assets/images/items/powerups/fireBall.png";
import freezeImg from "../assets/images/items/powerups/freeze.png";
import helmetImg from "../assets/images/items/powerups/helmet.png";
import multiplikatorImg from "../assets/images/items/powerups/multiplikator.png";
import potionImg from "../assets/images/items/powerups/potion.png";

import Phaser from "phaser";
import ObstacleModel from "../models/ObstacleModel.js";

export default class Game extends Phaser.Scene {
  constructor(levelId, skinId) {
    super("game");
    this.levelId = levelId;
    this.skinId = skinId;
  }

  preload() {
    // ****************************** Food / Obstacles ******************************
    this.load.image("apple", appleImage);
    this.load.image("food", foodImage);
    this.load.image("obstacle_brick", obstacleBrickImage);
    //Background
    if (this.levelId === 1 || this.levelId === 4) {
      this.load.image("dungeon_background", dungeonBackgroundImage);
    }
    if (this.levelId === 2) {
      this.load.image("dungeon_background", dungeonBackgroundImage2);
    }
    if (this.levelId === 3) {
      this.load.image("dungeon_background", dungeonBackgroundImage3);
    }

    // ****************************** Snake-Bilder ******************************
    if (this.skinId === 1) {
      this.load.image("snakeRight", headRight);
      this.load.image("snakeLeft", headLeft);
      this.load.image("snakeUp", headUp);
      this.load.image("snakeDown", headDown);
      this.load.image("bodyHorizontal", bodyHorizontal);
      this.load.image("bodyVertical", bodyVertical);
      this.load.image("bodyRightUp", bodyRightUp);
      this.load.image("bodyRightDown", bodyRightDown);
      this.load.image("bodyDownRight", bodyDownRight);
      this.load.image("bodyUpRight", bodyUpRight);
      this.load.image("tailRight", tailRight);
      this.load.image("tailLeft", tailLeft);
      this.load.image("tailUp", tailUp);
      this.load.image("tailDown", tailDown);
    }
    if (this.skinId === 2) {
      this.load.image("snakeRight", headRighth);
      this.load.image("snakeLeft", headLefth);
      this.load.image("snakeUp", headUph);
      this.load.image("snakeDown", headDownh);
      this.load.image("bodyHorizontal", bodyHorizontalh);
      this.load.image("bodyVertical", bodyVerticalh);
      this.load.image("bodyRightUp", bodyRightUph);
      this.load.image("bodyRightDown", bodyRightDownh);
      this.load.image("bodyDownRight", bodyDownRighth);
      this.load.image("bodyUpRight", bodyUpRighth);
      this.load.image("tailRight", tailRighth);
      this.load.image("tailLeft", tailLefth);
      this.load.image("tailUp", tailUph);
      this.load.image("tailDown", tailDownh);
    }

    if (this.skinId === 3) {
      this.load.image("snakeRight", headRightp);
      this.load.image("snakeLeft", headLeftp);
      this.load.image("snakeUp", headUpp);
      this.load.image("snakeDown", headDownp);
      this.load.image("bodyHorizontal", bodyHorizontalp);
      this.load.image("bodyVertical", bodyVerticalp);
      this.load.image("bodyRightUp", bodyRightUpp);
      this.load.image("bodyRightDown", bodyRightDownp);
      this.load.image("bodyDownRight", bodyDownRightp);
      this.load.image("bodyUpRight", bodyUpRightp);
      this.load.image("tailRight", tailRightp);
      this.load.image("tailLeft", tailLeftp);
      this.load.image("tailUp", tailUpp);
      this.load.image("tailDown", tailDownp);
    }

    // ****************************** Item-Bilder ******************************
    this.load.image("mysteryBox", mysteryBoxImg);
    // Powerup-Bilder
    this.load.image("fire", fireImg);
    this.load.image("fireball", fireBallImg);
    this.load.image("freeze", freezeImg);
    this.load.image("helmet", helmetImg);
    this.load.image("multiplikator", multiplikatorImg);
    this.load.image("potion", potionImg);
    // Handicap-Bilder laden
    this.load.image("flashlight", flashlightImg);
    this.load.image("lightMask", lightMaskImg);
    this.load.image("growth", growthImg);
    this.load.image("reverse", reverseImg);
    this.load.image("speedup", speedImg);
  }

  create() {
    this.controller = new GameController(this, this.levelId);
    // Add countdown text
    this.countdownText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '', {
      fontSize: '128px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Start countdown
    this.startCountdown(3); // 3 seconds countdown
  }

  startCountdown(seconds) {
    this.countdown = seconds;
    this.updateCountdownText();

    this.time.addEvent({
      delay: 1000,
      callback: this.updateCountdown,
      callbackScope: this,
      repeat: seconds - 1
    });
  }

  updateCountdown() {
    this.countdown--;
    this.updateCountdownText();

    if (this.countdown <= 0) {
      this.countdownText.setVisible(false);
      this.startGame();
    }
  }

  updateCountdownText() {
    this.countdownText.setText(this.countdown);
  }

  startGame() {
    // Start the game logic here
    this.controller.initialize(this.levelId);
  }

  update(time) {
    if (this.controller && this.countdown <= 0) {
      this.controller.update(time);
    }
  }
}
