export default class ObstacleModel {
  constructor(scene, field) {
    this.field = field;
    this.scene = scene;
    this.obstacleData = []; // Speichert die Positionen und Typen der Hindernisse
  }

  addObstacle(x, y, type) {
    const alignedPosition = this.field.alignToGrid(x, y);
    this.obstacleData.push({ x: alignedPosition.x, y: alignedPosition.y, type });
    //console.log(`Obstacle data stored: (${alignedPosition.x}, ${alignedPosition.y}, ${type})`);
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

  createLabyrinth() {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;
    const tileSize = this.field.tileSize;
  
    const horizontalCells = Math.floor(width / tileSize);
    const verticalCells = Math.floor(height / tileSize);
  
    const maze = Array.from({ length: verticalCells }, () => Array(horizontalCells).fill(false));
  
    const carvePassagesFrom = (cx, cy) => {
      const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
      ];
  
      // Shuffle directions
      for (let i = directions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [directions[i], directions[j]] = [directions[j], directions[i]];
      }
  
      directions.forEach(direction => {
        const nx = cx + direction.x;
        const ny = cy + direction.y;
        const nx2 = cx + direction.x * 2;
        const ny2 = cy + direction.y * 2;
  
        if (nx2 >= 0 && nx2 < horizontalCells && ny2 >= 0 && ny2 < verticalCells && !maze[ny2][nx2]) {
          maze[ny][nx] = true;
          maze[ny2][nx2] = true;
          carvePassagesFrom(nx2, ny2);
        }
      });
    };
  
    // Start carving from the top-left corner
    carvePassagesFrom(0, 0);
  
    // Define the center area to remain free
    const centerX = Math.floor(horizontalCells / 2);
    const centerY = Math.floor(verticalCells / 2);
    const centerSize = 6;
  
    // Add the maze walls to the obstacle data
    for (let y = 0; y < verticalCells; y++) {
      for (let x = 0; x < horizontalCells; x++) {
        // Skip the center area
        if (
          x >= centerX - Math.floor(centerSize / 2) &&
          x < centerX + Math.ceil(centerSize / 2) &&
          y >= centerY - Math.floor(centerSize / 2) &&
          y < centerY + Math.ceil(centerSize / 2)
        ) {
          continue;
        }
  
        if (!maze[y][x]) {
          this.addObstacle(x * tileSize, y * tileSize, "obstacle_brick");
        }
      }
    }
  }

  getObstacles() {
    return this.obstacleData;
  }

  removeObstacle(x, y) {
    console.log(`Removing obstacle at (${x}, ${y})`);
    this.obstacleData = this.obstacleData.filter(obstacle => obstacle.x !== x || obstacle.y !== y);
  }
}