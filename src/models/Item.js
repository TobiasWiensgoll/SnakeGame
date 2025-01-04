export default class Item {
    constructor(scene, field, type) {
      this.scene = scene;
      this.field = field;
      this.type = type;
      this.sprite = null;
      this.spawn();
    }
  
    spawn() {
      const position = this.field.getRandomPosition();
      this.x = position.x;
      this.y = position.y;
      this.createSprite();
    }

    respawn() {
      this.destroy();
      const position = this.field.getRandomPosition();
      this.x = position.x;
      this.y = position.y;
      this.createSprite();
    }
  
    createSprite() {
      if (!this.sprite) {
        this.sprite = this.scene.add.sprite(this.x, this.y, this.type);
        this.scene.physics.add.existing(this.sprite);
      } else {
        this.sprite.setPosition(this.x, this.y);
      }
    }
  
    setPosition(x, y) {
      this.x = x;
      this.y = y;
      if (this.sprite) {
        this.sprite.setPosition(x, y);
      }
    }
  
    getPosition() {
      return { x: this.x, y: this.y };
    }
  
    destroy() {
      if (this.sprite) {
        this.sprite.destroy();
        this.sprite = null;
      }
    }
  }