export default class ObstacleModel {
    constructor() {
      this.obstacleData = []; // Speichert die Positionen und Typen der Hindernisse
    }
  
    addObstacle(x, y, type) {
      this.obstacleData.push({ x, y, type });
      console.log(`Obstacle data stored: (${x}, ${y}, ${type})`);
    }

    createObstacles() {
        this.addObstacle(this.scene.scale.width / 2-100, this.scene.scale.height / 2 + 300, "obstacle")
        this.addObstacle(this.scene.scale.width / 2-300, this.scene.scale.height / 2 + 100, "obstacle")
    }
  
    getObstacles() {
      return this.obstacleData;
    }
  }