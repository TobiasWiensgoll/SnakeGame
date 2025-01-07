export default class ItemDisplayView {
    constructor(scene) {
      this.scene = scene;
      this.container = this.createItemDisplay();
    }
  
    createItemDisplay() {
      const container = this.scene.add.container(20, 20);
      const background = this.scene.add.graphics();
      background.fillStyle(0x222222, 0.8);
      background.fillRoundedRect(0, 0, 200, 50, 10);
      container.add(background);
      return container;
    }
  
    addItem(item) {
      const xOffset = this.container.list.length * 40 + 10;
      this.item = this.scene.add.sprite(xOffset, 25, item.type).setScale(0.5);

      console.log(this.item);
      this.container.add(this.item);
    }
  
    removeItem(itemIndex) {
      const icon = this.container.list[itemIndex];
      icon.destroy();
      this.container.remove(icon);
      this.rearrangeItems();
    }
  
    rearrangeItems() {
      this.container.list.forEach((icon, index) => {
        icon.x = index * 40 + 10;
      });
    }
  }
  