import Food from '../models/Food.js'
import Field from '../models/Field.js'
import pngImages from '../assets/images/*.png';
import jpgImages from '../assets/images/*.jpg'
import Phaser from "phaser"

export default class Game extends Phaser.Scene {
    preload(){
        this.load.image('apple', pngImages.apple);
        this.load.image('apple02', jpgImages.apple02);
    }

    create(){
        this.field = new Field(this, this.scale.width, this.scale.height, 50)
        this.field.drawGrid()
        
        

        this.food = new Food(this, this.field);
    }

    update(){
        this.food.food.on('pointerdown', () => {
            this.food.respawn()

        });
    }
}