export default class Food {
    constructor(scene, field) {
      this.scene = scene;
      this.field = field;
  
      const position = this.field.getRandomPosition();
      this.food = this.scene.physics.add.image(position.x, position.y, "apple02");
      this.food.setScale(0.05);
    }
  
    // respawn() platziert das Essen an einer zufälligen Position auf dem Spielfeld.
    respawn() {
      const position = this.field.getRandomPosition();
      this.food.setPosition(position.x, position.y);
    }
  }