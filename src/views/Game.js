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
        this.foodSprite = this.add.image(600,400,'apple02');
        this.foodSprite.setScale(0.05)
        this.foodSprite.setInteractive();

        this.field = new Field(this, this.scale.width, this.scale.height, 50)
        this.field.drawGrid()

        
    }

    update(){
        const newPosition = this.field.getRandomPosition();
        this.foodSprite.on('pointerdown', () => {
            this.foodSprite.setPosition(newPosition.x, newPosition.y)
        });
    }
}