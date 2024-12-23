export default class FoodView {
    constructor(scene, foodModel) {
      this.scene = scene;
      this.model = foodModel;
    }
  
    render() {
      const { x, y } = this.model.food;
      this.model.food.setPosition(x, y);
    }
  }