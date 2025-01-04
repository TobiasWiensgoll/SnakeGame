import Item from './Item.js';

export default class HelmetItem extends Item {
  constructor(scene, field) {
    super(scene, field, 'helmet'); // 'helmet' ist der Schlüssel für das Helm-Sprite
  }

  onCollision(snake) {
    if (snake.lives !== undefined) {
      snake.lives += 1; // Gibt der Schlange ein Extraleben
    } else {
      snake.lives = 1; // Initialisiert das Leben, falls es nicht definiert ist
    }
    this.destroy(); // Zerstört das Helm-Item nach der Kollision
  }
}