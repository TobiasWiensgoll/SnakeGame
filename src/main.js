import Phaser, { Physics } from 'phaser'
import Game from './views/Game'

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

game.scene.add('game', Game)
game.scene.start('game')