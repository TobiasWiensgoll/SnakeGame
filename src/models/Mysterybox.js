// MysteryBox.js
import Item from './Item';
import SpeedUp from './SpeedUp'; // Beispiel für Speed-Up Item
import Multiplikator from './Multiplikator'; // Beispiel für das Multiplikator Item
import HelmetItem from './Helmet';
import Freeze from './Freeze';
import FireItem from './Fire';
import PotionItem from './Potion';

export default class MysteryBox extends Item {
  constructor(scene, field) {
    super(scene, field, 'mysteryBox');
    this.items = [SpeedUp, Multiplikator, HelmetItem, Freeze, FireItem, PotionItem ]; // Liste von möglichen Power-ups
  }

  onCollision(snake) {
    // Zufälliges Power-up auswählen
    const randomItemClass = Phaser.Utils.Array.GetRandom(this.items);
    const randomItem = new randomItemClass(this.scene, this.field);

    // Erstelle das Power-up und gebe es der Schlange
    randomItem.onCollision(snake);
    // Konsolenausgabe des Power-ups, das durch die MysteryBox gegeben wurde
    console.log(`MysteryBox-Item wurde eingesammelt! Das ausgewählte Power-up ist: ${randomItem.constructor.name}`);

    // Zerstöre das MysteryBox-Item nach der Kollision
    this.destroy();
  }
}
