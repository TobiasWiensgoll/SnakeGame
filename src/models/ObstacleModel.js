export default class ObstacleModel {
  constructor(scene, field) {
    this.field = field;
    this.scene = scene;
    this.obstacleData = []; // Speichert die Positionen und Typen der Hindernisse
  }

  addObstacle(x, y, type) {
    const alignedPosition = this.field.alignToGrid(x, y);
    this.obstacleData.push({ x: alignedPosition.x, y: alignedPosition.y, type });
    console.log(`Obstacle data stored: (${alignedPosition.x}, ${alignedPosition.y}, ${type})`);
  }

  createObstacles() {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;

    const obstaclePositions = [
        // Raum in der Ecke unten links
        { x: width - 220, y: height - 20 },
        { x: width - 220, y: height - 60 },
        { x: width - 220, y: height - 100 },
        { x: width - 220, y: height - 140 },
        { x: width - 220, y: height - 180 },
        { x: width - 220, y: height - 220 },
        { x: width - 180, y: height - 220 },
        { x: width - 140, y: height - 220 },
        { x: width - 100, y: height - 220 },
        { x: width - 60, y: height - 220 },
        { x: width - 20, y: height - 220 },

        // Hindernisse in der Mitte
        { x: width / 2 - 100, y: height / 2 - 100 },
        { x: width / 2 - 100, y: height / 2 - 140 },
        { x: width / 2 - 140, y: height / 2 - 180 },

        // Weitere Hindernisse
        { x: 40, y: 40 },
        { x: 40, y: 80 },
        { x: 80, y: 40 },

        { x: 160, y: height - 200 },
        { x: 200, y: height - 240 },
        { x: 200, y: height - 280 },
    ];

    obstaclePositions.forEach(pos => {
        this.addObstacle(pos.x, pos.y, "obstacle_brick");
    });
}

  getObstacles() {
    return this.obstacleData;
  }

  removeObstacle(x, y) {
    this.obstacleData = this.obstacleData.filter(obstacle => obstacle.x !== x || obstacle.y !== y);
  }
}