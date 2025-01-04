import Item from './Item.js';

export default class FireItem extends Item {
  constructor(scene, field) {
    super(scene, field, 'fire'); // 'fire' ist der Schlüssel für das Feuer-Sprite
    this.fireBall = null; // Referenz für den Feuerball
    this.scene = scene;
  }

  onCollision(snake) {
    if (this.fireBall) return; // Wenn bereits ein Feuerball existiert, nichts tun

    // Feuerball erstellen und an den Schlangenkopf binden
    this.fireBall = this.scene.physics.add.sprite(
      0,
      0,
      'fireball'
    );
    this.fireBall.setScale(0.8);
    this.fireBall.setDepth(1);

    // Zerstört das Item, da es jetzt aktiv genutzt wird
    this.destroy();
  }

  shootFireBall(snake) {
    if (!this.fireBall) return; // Kein Feuerball vorhanden

    // Setzt den Feuerball in Bewegung in Richtung der aktuellen Schlangenrichtung
    const velocity = 400;
    this.fireBall.x = snake.snakeHead.x;
    this.fireBall.y = snake.snakeHead.y;
    this.fireBall.setVelocity(
      snake.direction.x * velocity,
      snake.direction.y * velocity
    );


    
  }

  resetFireBall() {
    if (this.fireBall) {
      this.fireBall.destroy();
      this.fireBall = null;
    }
  }
}
