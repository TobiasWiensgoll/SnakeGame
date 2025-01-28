import Item from './Item.js';

export default class PotionItem extends Item {
  constructor(scene, field) {
    super(scene, field, 'potion'); // 'fire' ist der Schlüssel für das Feuer-Sprite
  }

  onCollision(snake) {
    
    // Zerstört das Item, da es jetzt aktiv genutzt wird
    this.destroy();
  }

  
  
}
