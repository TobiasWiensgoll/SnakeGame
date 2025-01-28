import Item from './Item.js';

export default class Multiplikator extends Item {
  constructor(scene, field) {
    super(scene, field, 'multiplikator', 'powerup'); // 'multiplier' ist der Schlüssel für das Multiplier-Sprite
  }

  /**
   * Aktiviert den Punktmultiplikator für 15 Sekunden
   * 
   * @param {*} snake 
   */
  onAction(snake) {
    this.createItemAnimation();
    if (snake.doublePoints) {
      snake.doublePoints(true); 
      this.scene.time.addEvent({
        delay: 15000, // Dauer des Punktmultiplikators in Millisekunden (15 Sekunden)
        callback: () => {
          snake.doublePoints(false); 
        },
      });
    }
  }
}