import Phaser, { Physics } from 'phaser'

const config = {
    width: 1200,
    height: 800,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:0}
        }
    }
}

const game = new Phaser.Game(config)