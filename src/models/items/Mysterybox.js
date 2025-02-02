// MysteryBox.js
import Item from './Item';
import SpeedUpItem from './SpeedUp'; // Beispiel für Speed-Up Item
import MultiplikatorItem from './Multiplikator'; // Beispiel für das Multiplikator Item
import HelmetItem from './Helmet';
import FreezeItem from './Freeze';
import FireItem from './Fire';
import PotionItem from './Potion';
import TorchItem from './Torch';

export default class MysteryBox extends Item {
  constructor(scene, field) {
    super(scene, field, 'mysteryBox');
    this.items = [SpeedUpItem, MultiplikatorItem, HelmetItem, FreezeItem, FireItem, PotionItem, TorchItem]; // Liste von möglichen Power-ups
    this.item = null;
  }

  /**
   * Wählt ein zufälliges Power-up aus der Liste aus und erstellt es
   * Im Fall eines Handicap wird dieses direkt aktiviert
   * Im Fall eines Power-ups wird dieses zurückgegeben und in den aktiven Items gespeichert
   * 
   * @param {*} snake 
   * @returns powerup-item
   */
  onCollision(snake, maxPowerUps) {
    console.log(maxPowerUps);
    // Zufälliges Power-up auswählen, bis es sich von dem vorherigen unterscheidet
    var randomItemClass = Phaser.Utils.Array.GetRandom(this.items);
    while(this.item && randomItemClass.name === this.item.constructor.name) {
      console.log('reroll');
      randomItemClass = Phaser.Utils.Array.GetRandom(this.items);
    }
    this.item = new randomItemClass(this.scene, this.field);

    // Handicap oder Power-up?
    if(this.item.type === 'handicap') {
      // Power-up in der Schlange direkt aktivieren
      this.item.onAction(snake);
      this.respawn();
      return;
    } else if(this.item.type === 'powerup' && !maxPowerUps) {
      // Erstelle das Power-up und gebe es der Schlange
      this.respawn();
      return this.item;
    } else {
      // Kein Power-up erstellen
      this.respawn();
      return null;
    }
    
  }
}
