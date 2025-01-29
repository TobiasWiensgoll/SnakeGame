import Item from './Item.js';

export default class TorchItem extends Item {
  constructor(scene, field) {
    super(scene, field, 'flashlight', 'handicap'); // 'flashlight' ist der Schlüssel für das Flashlight-Sprite
  }


  /**
   * aktiviert im Controller die Methode zum Erstellen und Updaten der Lichtmaske
   * für 5 Sekunden und löscht das Graphic Objekt danach wieder
   * 
   * @param {*} snake 
   * @returns 
   */
  onAction(snake) {
    this.createItemAnimation();
    this.scene.controller.activeTorch = true;

    this.scene.time.delayedCall(5000, () => {
      this.scene.controller.activeTorch = false;
      this.scene.controller.lightMask.clear();
    });
  }

}
