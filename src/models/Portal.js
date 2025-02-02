export default class Portal {
    constructor(scene, field) {
      this.scene = scene;
      this.field = field;
      this.sprite = null;
      this.x;
      this.y;
    }
  
    /**
     * Erstellt ein Portal an einer zufälligen Position auf dem Spielfeld
     */
    spawn() {
      var position = this.field.getRandomPosition();
      this.x = position.x;
      this.y = position.y;
      while(this.scene.controller.checkObstacleCollision(this)) {
        position = this.field.getRandomPosition();
        this.x = position.x;
        this.y = position.y
      }
      this.createSprite();
      this.sprite.setDepth(2);
    }
  
    /**
     * Erstellt ein Sprite für das Portal
     */
    createSprite() {
      if (!this.sprite) {
        this.sprite = this.scene.physics.add.sprite(this.x, this.y, 'portal');
      } else {
        this.sprite.setPosition(this.x, this.y);
      }
    }
  
    /**
     * Setzt die Position des Portal
     * @param {*} x 
     * @param {*} y 
     */
    setPosition(x, y) {
      this.x = x;
      this.y = y;
      if (this.sprite) {
        this.sprite.setPosition(x, y);
      }
    }
  
    /**
     * Gibt die Position des Portal zurück
     * @returns Position des Portal
     */
    getPosition() {
      return { x: this.x, y: this.y };
    }
  
    /**
     * Zerstört das Portal
     */
    destroy() {
      if (this.sprite) {
        this.sprite.destroy();
        this.sprite = null;
      }
    }
  }