import Item from './Item.js';

export default class PotionItem extends Item {
  constructor(scene, field) {
    super(scene, field, 'potion', 'powerup'); // 'potion' ist der Schlüssel für das Potion-Sprite
  }

  /**
   * Deaktiviert die Kollisionen für 5 Sek
   * 
   * @param {*} snake 
   */
  onAction(snake) {
    this.createItemAnimation();
    this.scene.controller.disableCollisions = true;
    this.scene.time.delayedCall(5000, () => {
      this.scene.controller.disableCollisions = false;
    });
  }

  
  
}
