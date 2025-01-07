import Item from './Item';

export default class Freeze extends Item {
  constructor(scene, field) {
    super(scene, field, 'freeze'); // Der Typ für das Freeze-Item ist 'freeze'
  }

  // Überschreibt die onCollision Methode für das Freeze-Item
  onCollision(snake) {
    // Logik für das Einfrieren der Schlange
    console.log("Freeze-Item wurde eingesammelt! Schlange eingefroren.");

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

    // Zerstöre das Freeze-Item
    this.destroy();
  }
}
