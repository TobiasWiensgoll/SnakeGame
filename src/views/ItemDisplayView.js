export default class ItemDisplayView {
    constructor(scene) {
      this.scene = scene;
      this.container = this.createItemDisplay();
    }
  
    /**
     * Erstellt ein neues Container-Element, in dem die Items angezeigt werden können.
     * @returns 
     */
    createItemDisplay() {
      const container = this.scene.add.container(20, 20);
      const background = this.scene.add.graphics();
      background.fillStyle(0x222222, 0.8);
      background.fillRoundedRect(0, 0, 200, 50, 10);
      container.add(background);
      return container;
    }

    /**
     * Zeichnet einen roten Rahmen um das Item, wenn es nicht hinzugefügt werden kann.
     */
    redOutline() {
      const outline = this.scene.add.graphics();
      outline.lineStyle(4, 0xff0000, 1);
      outline.strokeRoundedRect(0, 0, 200, 50, 10);
      this.container.add(outline);
      this.scene.time.delayedCall(800, () => {
        outline.destroy();
      });
    }
  
    /**
     * Fügt ein Item zur Anzeige hinzu.
     * @param {*} item 
     */
    addItem(item) {
      const xOffset = this.container.list.length * 40 + 10;
      this.item = this.scene.add.sprite(xOffset, 25, item.name).setScale(0.5);

      console.log(this.item);
      this.container.add(this.item);
    }
  
    /**
     * Entfernt ein Item aus der Anzeige.
     * @param {*} itemIndex 
     */
    removeItem(itemIndex) {
      const icon = this.container.list[itemIndex];
      icon.destroy();
      this.container.remove(icon);
      this.rearrangeItems();
    }
  
    /**
     * Sortiert die Items neu, wenn eines entfernt wurde.
     */
    rearrangeItems() {
      this.container.list.forEach((icon, index) => {
        if(index > 0) {
          icon.x = index * 40 + 10;
        }
      });
    }
  }
  