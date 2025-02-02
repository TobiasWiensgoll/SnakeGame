export default class ObstacleView {
  constructor(scene) {
    this.scene = scene;
    this.obstacles = []; // Array zum Speichern der Hindernisse
  }

  /**
   * Zeichnet ein Hindernis an der angegebenen Position.
   * @param {number} x - Die x-Koordinate des Hindernisses.
   * @param {number} y - Die y-Koordinate des Hindernisses.
   * @param {string} type - Der Typ des Hindernisses (Sprite-Name).
   * @returns {Phaser.Physics.Arcade.Sprite} - Das gezeichnete Hindernis.
   */
  drawObstacle(x, y, type) {
    const obstacle = this.scene.physics.add.sprite(x, y, type);
    obstacle.setDisplaySize(40, 40).setSize(40, 40);
    obstacle.setImmovable(true);
    this.obstacles.push(obstacle);
    return obstacle;
  }

  /**
   * Zeichnet alle Hindernisse basierend auf den übergebenen Hindernisdaten.
   * @param {Array} obstacleData - Ein Array von Hindernisdaten.
   */
  drawAllObstacles(obstacleData) {
    obstacleData.forEach((data) => {
      this.drawObstacle(data.x, data.y, data.type);
    });
  }

  /**
   * Entfernt ein Hindernis an der angegebenen Position.
   * @param {number} x - Die x-Koordinate des Hindernisses.
   * @param {number} y - Die y-Koordinate des Hindernisses.
   */
  removeObstacle(x, y) {
    const obstacle = this.obstacles.find(obstacle => obstacle.x === x && obstacle.y === y);
    if (obstacle) {
      obstacle.destroy();
      this.obstacles = this.obstacles.filter(ob => ob !== obstacle);
    }
  }
}