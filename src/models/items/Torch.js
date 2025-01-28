import Item from './Item.js';

export default class TorchItem extends Item {
  constructor(scene, field) {
    super(scene, field, 'flashlight'); // 'flashlight' ist der Schlüssel für das Flashlight-Sprite
    this.graphics = this.scene.add.graphics();
    this.maskGraphics = this.scene.add.graphics();
    this.mask = this.maskGraphics.createGeometryMask();
  }


  /**
   * schießt einen Feuerball in der Bewegungsrichtung des Schlangenkopfs
   * und ändert activeTorchball im Gamecontroller auf den Feuerball
   * 
   * @param {*} snake 
   * @returns 
   */
  onAction(snake) {
    this.graphics.clear();
    this.graphics.fillStyle(0x000000, 0.8); // Darken the screen with 80% opacity
    this.graphics.fillRect(0, 0, this.scene.sys.canvas.width, this.scene.sys.canvas.height);

    // Create a hole around the snake head
    
    this.maskGraphics.clear();
    this.maskGraphics.fillStyle(0xffffff);
    this.maskGraphics.fillCircle(snake.snakeHead.x, snake.snakeHead.y, 100); 
    
    this.mask = this.maskGraphics.createGeometryMask();
    this.graphics.setMask(this.mask);
  }



}
