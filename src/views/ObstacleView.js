export default class ObstacleView {
    constructor(scene) {
      this.scene = scene;
    }
  
    drawObstacle(x, y, type) {
      const obstacle = this.scene.physics.add.sprite(x, y, type);
      obstacle.setDisplaySize(40, 40).setSize(40, 40);
      obstacle.setImmovable(true);
      console.log(`Obstacle drawn at (${x}, ${y})`);
      return obstacle;
    }
  
    drawAllObstacles(obstacleData) {
      obstacleData.forEach((data) => {
        this.drawObstacle(data.x, data.y, data.type);
      });
    }
  }
  