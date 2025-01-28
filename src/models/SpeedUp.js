import Item from './Item.js';

export default class SpeedUp extends Item {
  constructor(scene, field) {
    super(scene, field, 'speedup'); // 'speedup' ist der Schlüssel für das Handicap-Sprite
  }

  onCollision(snake) {
    // Angenommen, die Schlange hat eine Methode, die ihre Geschwindigkeit setzt
    if (snake.setSpeed) {
      snake.setSpeed(snake.getSpeed() / 1.5); // Erhöht die Geschwindigkeit der Schlange um 50%
      this.scene.time.addEvent({
        delay: 5000, // Dauer der erhöhten Geschwindigkeit (in Millisekunden)
        callback: () => {
          snake.setSpeed(snake.getSpeed() * 1.5); // Setzt die Geschwindigkeit nach 5 Sekunden zurück
        },
      });
    }
    this.destroy(); // Zerstört das SpeedUp-Item nach der Kollision
  }
}
