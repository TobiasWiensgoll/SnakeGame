import GameController from "../controller/GameController.js";
import pngImages from "../assets/images/*.png";
import jpgImages from "../assets/images/*.jpg";
import SnakePngImages from "../assets/snake/*.png";
import Phaser from "phaser";
import ObstacleModel from "../models/ObstacleModel.js";

export default class Game extends Phaser.Scene {
  preload() {
    this.load.image("apple", pngImages.food);
    this.load.image("snakeRight", SnakePngImages.head_right);
    this.load.image("snakeLeft", SnakePngImages.head_left);
    this.load.image("snakeUp", SnakePngImages.head_up);
    this.load.image("snakeDown", SnakePngImages.head_down);
    this.load.image("bodyHorizontal", SnakePngImages.body_horizontal);
    this.load.image("bodyVertical", SnakePngImages.body_vertical);
    this.load.image("bodyRightUp", SnakePngImages.body_rightup);
    this.load.image("bodyRightDown", SnakePngImages.body_rightdown);
    this.load.image("bodyDownRight", SnakePngImages.body_downright);
    this.load.image("bodyUpRight", SnakePngImages.body_upright);
    this.load.image("tailRight", SnakePngImages.tail_right);
    this.load.image("tailLeft", SnakePngImages.tail_left);
    this.load.image("tailUp", SnakePngImages.tail_up);
    this.load.image("tailDown", SnakePngImages.tail_down);
    this.load.image("dungeon_background", jpgImages.dungeon_background);
    this.load.image("obstacle", pngImages.obstacle);
  }

  create() {
    this.controller = new GameController(this);
    this.controller.drawAllObstacles();
  }

  update(time) {
    this.controller.update(time);
  }
}
