export default class Item {
    constructor(scene, field, type) {
      this.scene = scene;
      this.field = field;
      this.type = type;
      this.sprite = null;
      this.x;
      this.y;
      //this.spawn();
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

    onAction() {return}
  
    createSprite() {
      if (!this.sprite) {
        this.sprite = this.scene.physics.add.sprite(this.x, this.y, this.type);
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