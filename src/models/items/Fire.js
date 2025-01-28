import Item from './Item.js';

export default class FireItem extends Item {
  constructor(scene, field) {
    super(scene, field, 'fireball'); // 'fireball' ist der Schlüssel für das Feuerball-Sprite
  }


  /**
   * schießt einen Feuerball in der Bewegungsrichtung des Schlangenkopfs
   * und ändert activeFireball im Gamecontroller auf den Feuerball
   * 
   * @param {*} snake 
   * @returns 
   */
  onAction(snake) {
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
    this.sprite.setActive(false).setVisible(false); // Deaktiviert den Feuerball
    this.sprite.setVelocity(0, 0); // Setzt die Geschwindigkeit auf 0
    this.scene.controller.activeFireball = null;
  }


}
