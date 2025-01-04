import GameController from "../controller/GameController.js";

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

// Powerup-Bilder importieren
import fireballImage from "../assets/images/powerups/fire.png";
import potionImage from "../assets/images/powerups/potion.png";

// // Handicap-Bilder importieren
// import handicapFireImage from "../assets/images/handicaps/fire.png";
// import handicapPotionImage from "../assets/images/handicaps/potion.png";

import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  preload() {
    // Lade alle Bilder
    this.load.image("apple", appleImage);
    this.load.image("food", foodImage);
    this.load.image("dungeon_background", dungeonBackgroundImage);
    this.load.image("obstacle_brick", obstacleBrickImage);
    this.load.image("helmet", helmetImage);
    this.load.image("speedup", speedImage);
    this.load.image("multiplikator", multiplikatorImage);
    this.load.image("mysteryBox", mysteryBoxImage);
    this.load.image("fire", fireImage);

    // Snake-Bilder laden
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

    // Powerup-Bilder laden
    this.load.image("fireball", fireballImage);
    this.load.image("potion", potionImage);

    // Handicap-Bilder laden
    // this.load.image("handicapFire", handicapFireImage);
    // this.load.image("handicapPotion", handicapPotionImage);
  }

  create() {
    this.controller = new GameController(this);
  }

  update(time) {
    this.controller.update(time);
  }
}
