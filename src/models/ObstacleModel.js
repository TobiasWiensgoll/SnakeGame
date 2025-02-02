export default class ObstacleModel {
  constructor(scene, field) {
    this.field = field;
    this.scene = scene;
    this.levelId = 3;
    this.obstacleData = [];
  }

  /**
   * Fügt ein Hindernis an der angegebenen Position hinzu.
   * @param {number} x - Die x-Koordinate des Hindernisses.
   * @param {number} y - Die y-Koordinate des Hindernisses.
   * @param {string} type - Der Typ des Hindernisses (Sprite-Name).
   */
  addObstacle(x, y, type) {
    const alignedPosition = this.field.alignToGrid(x, y);
    this.obstacleData.push({ x: alignedPosition.x, y: alignedPosition.y, type });
  }

  /**
   * Setzt die Level-ID, um das entsprechende Hindernis-Sprite zu verwenden.
   * @param {number} levelId - Die ID des Levels.
   */
  setLevel(levelId) {
    this.levelId = levelId;
  }

  /**
   * Gibt das Hindernis-Sprite basierend auf der aktuellen Level-ID zurück.
   * @returns {string} - Der Name des Hindernis-Sprites.
   */
  getObstacleSprite() {
    switch (this.levelId) {
      case 1:
        return "obstacle_brick";
      case 2:
        return "obstacle_leaf";
      case 3:
        return "obstacle_cloud";
    }
  }

  /**
   * Erstellt zufällig Hindernisse auf der Karte, wobei bestimmte Bereiche ausgeschlossen werden.
   */
  createRandomObstacles() {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;
    const tileSize = this.field.tileSize;
    const numObstacles = 20; // Anzahl der Hindernisse
    const maxWallLength = 5; // Maximale Länge der Hinderniswände

    const exclusionZoneSize = 6 * tileSize; // Größe des 6x6 Feldes in der Mitte
    const exclusionZoneTopLeftWidth = 4 * tileSize; // Breite des 4x7 Feldes in der oberen linken Ecke
    const exclusionZoneTopLeftHeight = 7 * tileSize; // Höhe des 4x7 Feldes in der oberen linken Ecke

    const obstacleSprite = this.getObstacleSprite();

    for (let i = 0; i < numObstacles; i++) {
      let startX, startY;
      do {
        startX = Math.floor(Math.random() * (width / tileSize)) * tileSize;
        startY = Math.floor(Math.random() * (height / tileSize)) * tileSize;
      } while (
        // Überprüfen, ob die Position in der oberen linken Ecke liegt
        (startX < exclusionZoneTopLeftWidth && startY < exclusionZoneTopLeftHeight) ||
        // Überprüfen, ob die Position in der Mitte des Spielfelds liegt
        (startX >= (width / 2 - exclusionZoneSize / 2) && startX < (width / 2 + exclusionZoneSize / 2) &&
         startY >= (height / 2 - exclusionZoneSize / 2) && startY < (height / 2 + exclusionZoneSize / 2))
      );

      const wallLength = Math.floor(Math.random() * maxWallLength) + 1;
      const isHorizontal = Math.random() > 0.5;

      for (let j = 0; j < wallLength; j++) {
        const x = startX + (isHorizontal ? j * tileSize : 0);
        const y = startY + (isHorizontal ? 0 : j * tileSize);

        if (x < width && y < height) {
          this.addObstacle(x, y, obstacleSprite);
        }
      }
    }
  }

  /**
   * Gibt die gespeicherten Hindernisdaten zurück.
   * @returns {Array} - Ein Array von Hindernisdaten.
   */
  getObstacles() {
    return this.obstacleData;
  }

  /**
   * Entfernt ein Hindernis an der angegebenen Position.
   * @param {number} x - Die x-Koordinate des Hindernisses.
   * @param {number} y - Die y-Koordinate des Hindernisses.
   */
  removeObstacle(x, y) {
    this.obstacleData = this.obstacleData.filter(obstacle => obstacle.x !== x || obstacle.y !== y);
  }
}