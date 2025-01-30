import Item from './Item';

export default class Freeze extends Item {
  constructor(scene, field) {
    super(scene, field, 'freeze', 'powerup'); // 'freeze' ist der Schlüssel für das Freeze-Sprite
  }

  /**
   * friert die Schlange für 3 Sekunden ein
   * 
   * @param {*} snake 
   */
  onAction(snake) {
    this.createItemAnimation();
    // Schlange einfrieren
    snake.freeze();

    // Nach 3 Sekunden die Schlange wieder freigeben
    this.scene.time.addEvent({
      delay: 3000, // Freeze für 3 Sekunden
      callback: () => {
        snake.unfreeze();
        console.log("Schlange ist wieder normal!");
      },
      loop: false,
    });
  }
}
