import Item from './Item.js';

export default class Multiplikator extends Item {
  constructor(scene, field) {
    super(scene, field, 'multiplikator'); // 'multiplier' ist der Schlüssel für das Power-up-Sprite
  }

  onCollision(snake) {
    // Angenommen, die Schlange hat eine Methode, die den Punktestand verdoppelt
    if (snake.doublePoints) {
      snake.doublePoints(true); // Aktiviert den Punktmultiplikator
      this.scene.time.addEvent({
        delay: 15000, // Dauer des Punktmultiplikators in Millisekunden (15 Sekunden)
        callback: () => {
          snake.doublePoints(false); // Deaktiviert den Punktmultiplikator nach 15 Sekunden
        },
      });
    }
    this.destroy(); // Zerstört das Power-up-Item nach der Kollision
  }
}