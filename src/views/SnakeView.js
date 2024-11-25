export default class SnakeView {
    constructor(scene, snakeModel) {
      this.scene = scene;
      this.model = snakeModel;
      this.tail = this.scene.physics.add.sprite(this.scene.scale.width / 2 - 40, this.scene.scale.height / 2, "tailDown")
      this.model.body.push(this.tail);
      this.createAnimations();
    }
    
    // createAnimations() erstellt Animationen für die Bewegungsrichtungen der Schlange (oben, unten, links, rechts).
    // Jede Richtung erhält eine eigene Animation mit dem entsprechenden Sprite.
    createAnimations() {
      this.scene.anims.create({ key: "moveUp", frames: [{ key: "snakeUp" }] });
      this.scene.anims.create({ key: "moveDown", frames: [{ key: "snakeDown" }] });
      this.scene.anims.create({ key: "moveLeft", frames: [{ key: "snakeLeft" }] });
      this.scene.anims.create({ key: "moveRight", frames: [{ key: "snakeRight" }] });
    }
    
    // updateBodyTextures() aktualisiert die Texturen der Schlange basierend auf ihrer aktuellen Bewegungsrichtung.
    // - Der Schlangenkopf erhält die passende Textur (rechts, links, oben, unten) je nach Richtung.
    // - Jedes Körpersegment wird überprüft und erhält die entsprechende Textur basierend auf seiner Bewegungsrichtung.
    // - Das letzte Segment (Schwanz) wird ebenfalls mit der passenden Textur versehen.
    updateBodyTextures() {
      if (this.model.direction.equals(Phaser.Math.Vector2.RIGHT)) {
        this.model.snakeHead.setTexture("snakeRight");
      } else if (this.model.direction.equals(Phaser.Math.Vector2.LEFT)) {
        this.model.snakeHead.setTexture("snakeLeft");
      } else if (this.model.direction.equals(Phaser.Math.Vector2.UP)) {
        this.model.snakeHead.setTexture("snakeUp");
      } else if (this.model.direction.equals(Phaser.Math.Vector2.DOWN)) {
        this.model.snakeHead.setTexture("snakeDown");
      }
  
      for (let i = 1; i < this.model.body.length; i++) {
        let oldBodyDirection = this.model.directions[i];
        this.setBodyPartTexture(i, oldBodyDirection);
      }
      this.setTailTexture();
    }
    
    // setBodyPartTexture() bestimmt die Textur für jedes Körpersegment der Schlange, basierend auf der Bewegungsrichtung.
    // Wenn sich die Richtung zwischen benachbarten Segmenten geändert hat, wird eine passende Textur für die Richtungsänderung gesetzt (z.B. für Ecken).
    // Falls die Richtung gleich bleibt (vertikal oder horizontal), wird eine standardisierte Textur für gerade Segmente (vertikal oder horizontal) angewendet.
    setBodyPartTexture(i, oldBodyDirection) {
        if (!oldBodyDirection.equals(this.model.directions[i - 1])) {
          let prevDirection = `${this.model.directions[i - 1].x},${this.model.directions[i - 1].y}`;
          let currDirection = `${oldBodyDirection.x},${oldBodyDirection.y}`;
          let textureMap = {
            "1,0,0,-1": "bodyUpRight", 
            "0,1,-1,0": "bodyUpRight", 
            "-1,0,0,1": "bodyRightUp", 
            "0,-1,1,0": "bodyRightUp", 
            "0,1,1,0": "bodyRightDown", 
            "-1,0,0,-1": "bodyRightDown",
            "0,-1,-1,0": "bodyDownRight",
            "1,0,0,1": "bodyDownRight",
          };
          let directionKey = `${prevDirection},${currDirection}`;
          this.model.body[i].setTexture(textureMap[directionKey]);
        } else {
          if (oldBodyDirection.y !== 0) {
            this.model.body[i].setTexture("bodyVertical");
          } else {
            this.model.body[i].setTexture("bodyHorizontal");
          }
        }
      }
      
    // setTailTexture() weist dem letzten Segment der Schlange (dem Schwanz) die richtige Textur zu,
    // basierend auf der Richtung des vorangegangenen Segments. Die Textur wird aus einer vordefinierten 
    // Zuordnung (textureMap) ausgewählt, die die möglichen Richtungen des Schwanzes (nach oben, unten, 
    // rechts, links) abdeckt. Die Methode sorgt dafür, dass der Schwanz immer in die richtige Richtung zeigt.
    setTailTexture() {
        let tailIndex = this.model.body.length - 1;
        if (tailIndex >= 0) {
          let prevDirection = this.model.directions[tailIndex - 1]; 
          let textureMap = {
            "0,-1": "tailDown", 
            "0,1": "tailUp",  
            "-1,0": "tailRight", 
            "1,0": "tailLeft", 
          };
          let directionKey = `${prevDirection.x},${prevDirection.y}`;
          if (textureMap[directionKey]) {
            this.model.body[tailIndex].setTexture(textureMap[directionKey]);
          }
        }
    }
  }
  