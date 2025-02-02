export default class Item {
    constructor(scene, field, name, type) {
      this.scene = scene;
      this.field = field;
      this.name = name;
      this.type = type;
      this.sprite = null;
      this.x;
      this.y;
    }
  
    /**
     * Erstellt ein Item an einer zufälligen Position auf dem Spielfeld
     */
    spawn() {
      var position = this.field.getRandomPosition();
      this.x = position.x;
      this.y = position.y;
      while(this.scene.controller.checkItemObstacleCollision(this)) {
        position = this.field.getRandomPosition();
        this.x = position.x;
        this.y = position.y
      }
      this.createSprite();
    }

    /**
     * Erstellt ein Item an einer bestimmten Position auf dem Spielfeld
     */
    respawn() {
      this.destroy();
      const position = this.field.getRandomPosition();
      this.x = position.x;
      this.y = position.y;
      this.createSprite();
    }

    onAction() {return}
  
    /**
     * Erstellt ein Sprite für das Item
     */
    createSprite() {
      if (!this.sprite) {
        this.sprite = this.scene.physics.add.sprite(this.x, this.y, this.name);
      } else {
        this.sprite.setPosition(this.x, this.y);
      }
    }
  
    /**
     * Setzt die Position des Items
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
     * Gibt die Position des Items zurück
     * @returns Position des Items
     */
    getPosition() {
      return { x: this.x, y: this.y };
    }
  
    /**
     * Zerstört das Item
     */
    destroy() {
      if (this.sprite) {
        this.sprite.destroy();
        this.sprite = null;
      }
    }

    createItemAnimation() {
      const timeline = this.scene.add.timeline({

    
        run: () => {
    
          const img = this.scene.add.sprite(this.scene.sys.canvas.width/2, this.scene.sys.canvas.height/2, this.name); 
        
          // Füge den ersten Tween mit einer Verzögerung hinzu
          this.scene.tweens.add({
            targets: img,
            scale: 5,
            alpha: 0.5,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
              // Zweiter Tween, der startet, wenn der erste beendet ist
              this.scene.tweens.add({
                targets: img,
                scale: 2,
                alpha: 0,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                  img.destroy();  // Bild nach der Animation löschen
                }
              });
            }
          });
    
        }
    
      });
      timeline.play();
    }

  }