export default class Food {
  constructor(scene, field) {
    this.scene = scene;
    this.field = field;
    this.position = { x: -50, y: -50 };
    this.food = this.scene.physics.add.image(this.position.x, this.position.y, 'food');
    this.food.setDepth(1);
  }

  // respawn() platziert das Essen an einer zufälligen Position auf dem Spielfeld.
  respawn() {
    this.position = this.field.getRandomPosition();
    this.food.setPosition(this.position.x, this.position.y);
    while(this.scene.controller.checkObstacleCollision(this.food)) {
      this.position = this.field.getRandomPosition();
      this.food.setPosition(this.position.x, this.position.y);
    }
    
  }

  getFreePosition() {
    this.position = this.field.getRandomPosition();
    while(this.scene.controller.checkObstacleCollision(this.food)) {
      position = this.field.getRandomPosition();
    }
    return position;
  }
}
