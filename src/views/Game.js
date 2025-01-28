import GameController from "../controller/GameController.js";

<<<<<<< HEAD
// Food / Obstacles importieren
import dungeonBackgroundImage from "../assets/images/dungeon_background.jpg";
import obstacleBrickImage from "../assets/images/obstacle_brick.png";
import appleImage from "../assets/images/apple.png";
import foodImage from "../assets/images/food.png";
=======
// Manuelle Imports für die Bilder
import appleImage from "../assets/images/apple.png";
import foodImage from "../assets/images/food.png";
import dungeonBackgroundImage from "../assets/images/dungeon_background.jpg";
import obstacleBrickImage from "../assets/images/obstacle_brick.png";
import helmetImage from "../assets/images/helmet.png";
import speedImage from "../assets/images/speed.png";
import multiplikatorImage from "../assets/images/multiplikator_.png";
import mysteryBoxImage from "../assets/images/mysteryBox.png";
import fireImage from "../assets/images/fire_.png";
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb

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

<<<<<<< HEAD
// Haku Skin importieren
=======
//für Haku Skin
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb
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

<<<<<<< HEAD
// Mysterybox-Bild importieren
import mysteryBoxImg from '../assets/images/items/mysteryBox.png'
// Handicap-Bilder importieren
import flashlightImg from '../assets/images/items/handicaps/flashlight.png';
import growthImg from '../assets/images/items/handicaps/growth.png';
import reverseImg from "../assets/images/items/handicaps/reverse.png";
import speedImg from "../assets/images/items/handicaps/speed.png";
// Powerup-Bilder importieren
import fireImg from "../assets/images/items/powerups/fire.png";
import fireBallImg from "../assets/images/items/powerups/fireBall.png";
import freezeImg from "../assets/images/items/powerups/multiplikator.png";
import helmetImg from "../assets/images/items/powerups/helmet.png";
import multiplikatorImg from "../assets/images/items/powerups/multiplikator.png";
import potionImg from "../assets/images/items/powerups/potion.png";
=======
// Powerup-Bilder importieren
import fireballImage from "../assets/images/powerups/fire.png";
import potionImage from "../assets/images/powerups/potion.png";

// // Handicap-Bilder importieren
// import handicapFireImage from "../assets/images/handicaps/fire.png";
// import handicapPotionImage from "../assets/images/handicaps/potion.png";
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb

import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor(levelId, skinId) {
    super("game");
    this.levelId = levelId;
    this.skinId = skinId;
  }

  preload() {
<<<<<<< HEAD
    // ****************************** Food / Obstacles ******************************
=======
    // Lade alle Bilder
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb
    this.load.image("apple", appleImage);
    this.load.image("food", foodImage);
    this.load.image("dungeon_background", dungeonBackgroundImage);
    this.load.image("obstacle_brick", obstacleBrickImage);
<<<<<<< HEAD

    // ****************************** Snake-Bilder ******************************
=======
    this.load.image("helmet", helmetImage);
    this.load.image("speedup", speedImage);
    this.load.image("multiplikator", multiplikatorImage);
    this.load.image("mysteryBox", mysteryBoxImage);
    this.load.image("fire", fireImage);

    // Snake-Bilder laden
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb
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

<<<<<<< HEAD
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
    this.load.image("growth", growthImg);
    this.load.image("reverse", reverseImg);
    this.load.image("speedup", speedImg);
=======
    // Powerup-Bilder laden
    this.load.image("fireball", fireballImage);
    this.load.image("potion", potionImage);

    // Handicap-Bilder laden
    // this.load.image("handicapFire", handicapFireImage);
    // this.load.image("handicapPotion", handicapPotionImage);
>>>>>>> d632b1de3b1a083fdc2dc35d5791d0a1b89205cb
  }

  create() {
    this.controller = new GameController(this);
  }

  update(time) {
    this.controller.update(time);
  }
}
