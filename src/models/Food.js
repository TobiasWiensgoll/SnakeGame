export default class Food {


    constructor(scene, field) {
        
        this.scene = scene;
        this.field = field;

        // Erstelle das Essen an einer zufälligen Position
        const position = this.field.getRandomPosition();
        this.food = this.scene.add.image(position.x, position.y, 'apple02').setInteractive();

        // Setze den Ursprung des Rechtecks auf die Mitte
        this.food.setOrigin(0.5);
        this.food.setScale(0.05)
    }

    // Methode, um das Essen an eine neue Position zu setzen
    respawn() {
        const position = this.field.getRandomPosition();
        this.food.setPosition(position.x, position.y);
    }
}
