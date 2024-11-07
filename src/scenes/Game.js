import Phaser from "phaser";

class Game extends Phaser.Scene{

    preload(){

    }

    create(){
        const ball = this.add.circle(600,400,10,0xffffff, 1)
        this.physics.add.existing(ball)

        ball.body.setVelocity(300, 300)
        ball.body.setCollideWorldBounds(true, 1, 1)
    }

}
export default Game