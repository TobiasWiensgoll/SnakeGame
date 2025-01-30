import Item from './Item.js';

export default class FireItem extends Item {
  constructor(scene, field) {
    super(scene, field, 'fireball', 'powerup'); // 'fireball' ist der Schlüssel für das Feuerball-Sprite
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

    this.scene.controller.activeFireball = this;

    // Setzt den Feuerball in Bewegung in Richtung der aktuellen Schlangenrichtung
    const velocity = 400;
    this.sprite.setVelocity(
      snake.direction.x * velocity,
      snake.direction.y * velocity
    );
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
