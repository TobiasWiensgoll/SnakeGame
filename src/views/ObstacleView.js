export default class ObstacleView {
  constructor(scene) {
    this.scene = scene;
    this.obstacles = [];
  }

  drawObstacle(x, y, type) {
    const obstacle = this.scene.physics.add.sprite(x, y, type);
    obstacle.setDisplaySize(40, 40).setSize(40, 40);
    obstacle.setImmovable(true);
    //console.log(`Obstacle drawn at (${x}, ${y})`);
    this.obstacles.push(obstacle);
    return obstacle;
  }

  drawAllObstacles(obstacleData) {
    obstacleData.forEach((data) => {
      this.drawObstacle(data.x, data.y, data.type);
    });
  }

  removeObstacle(x, y) {
    console.log(`Removing obstacle at (${x}, ${y})`);
    const obstacle = this.obstacles.find(obstacle => obstacle.x === x && obstacle.y === y);
    if (obstacle) {
      obstacle.destroy();
      this.obstacles = this.obstacles.filter(ob => ob !== obstacle);
    }
  }
}