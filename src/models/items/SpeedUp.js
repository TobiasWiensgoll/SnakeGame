import Item from './Item.js';

export default class SpeedUp extends Item {
  constructor(scene, field) {
    super(scene, field, 'speedup', 'handicap'); // 'speedup' ist der Schlüssel für das Handicap-Sprite
  }

  /**
   * Erhöht die Geschwindigkeit der Schlange um 50% für 5 Sek
   * 
   * @param {*} snake 
   */
  onAction(snake) {
    this.createItemAnimation();
    snake.setSpeed(snake.getSpeed() / 1.5); // Erhöht die Geschwindigkeit der Schlange um 50%
    this.scene.time.addEvent({
      delay: 5000, // Dauer der erhöhten Geschwindigkeit (in Millisekunden)
      callback: () => {
        snake.setSpeed(snake.getSpeed() * 1.5); // Setzt die Geschwindigkeit nach 5 Sekunden zurück
      },
    });
  }
}
