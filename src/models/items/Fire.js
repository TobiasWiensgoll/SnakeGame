import Item from './Item.js';

export default class FireItem extends Item {
  constructor(scene, field) {
    super(scene, field, 'fireball', 'powerup'); // 'fireball' ist der Schlüssel für das Feuerball-Sprite
    this.directionX = 0;
    this.directionY = 0;
  }


  /**
   * erstellt und schießt einen Feuerball in der Bewegungsrichtung des Schlangenkopfs
   * und ändert activeFireball im Gamecontroller auf den Feuerball,
   * sodass die Kollisionserkennung für den Feuerball funktioniert
   * 
   * @param {*} snake 
   * @returns 
   */
  onAction(snake) {
    this.createItemAnimation();
    
    this.x = snake.snakeHead.x;
    this.y = snake.snakeHead.y;
    this.createSprite();
    this.sprite.setScale(0.5);

    // Setzt den Feuerball in Bewegung in Richtung der aktuellen Schlangenrichtung
    this.directionX = snake.direction.x;
    this.directionY = snake.direction.y;
    this.move();
  }

  move() {
    const speed = 30; // 10px pro Schritt
    this.fireballInterval = setInterval(() => {
      if (!this.scene.controller.checkObstacleCollision(this.sprite)) {
          this.sprite.x += this.directionX * speed;
          this.sprite.y += this.directionY * speed;
      } else {
          const position = this.field.alignToGrid(this.sprite.x, this.sprite.y);
          this.stopFireBall();
          this.scene.controller.obstacleModel.removeObstacle(position.x, position.y);
          this.scene.controller.obstacleView.removeObstacle(position.x, position.y);
          clearInterval(this.fireballInterval);
      }
    }, 70); // Alle 50ms (20 Updates pro Sekunde)
    return true;
  }

  /**
   * Deaktiviert das Feuerball-Sprite und ändert activeFireball im
   * Gamecontroller auf null
   */
  stopFireBall() {
    this.sprite.setActive(false).setVisible(false);
    this.sprite.setVelocity(0, 0);
    this.scene.controller.activeFireball = null;
  }


}
