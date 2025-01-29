import Item from './Item.js';

export default class HelmetItem extends Item {
  constructor(scene, field) {
    super(scene, field, 'helmet', 'powerup'); // 'helmet' ist der Schlüssel für das Helm-Sprite
  }

  /**
   * Gibt der Schlange ein zusätzliches Leben
   * 
   * @param {*} snake 
   */
  onAction(snake) {
    this.createItemAnimation();
    if (snake.lives !== undefined) {
      snake.lives += 1;
    } else {
      snake.lives = 1; // Initialisiert das Leben, falls es nicht definiert ist
    }
  }
}