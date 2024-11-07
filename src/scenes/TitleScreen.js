import Phaser from "phaser";

export default class TitleScreen extends Phaser.Scene{

    preload(){

    }

    create(){
        const text = this.add.text(600, 400, 'Start!')
        text.setOrigin(0.5, 0.5)
        text.setInteractive()

        text.on('pointerdown', () => { this.scene.start("game") });
    }

}