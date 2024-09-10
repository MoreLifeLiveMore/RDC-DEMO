// top level, parent component that keeps track of state and sends to sub-components... draws images to canvas
class Overworld {
  constructor(config) {
    this.element = config.element; // assigns element(game containter), assings to config parameter
    this.canvas = this.element.querySelector(".game-canvas"); // finds game canvas from game container, used to draw images to
    this.ctx = this.canvas.getContext("2d"); //reference to canvas, access to drawing methods(2d)
    this.map = null;
  }

  startGameLoop() {
    // runs every framen(example 60fps)
    // step() calling step() when a new frame starts during requestAnimationFrame()
    const step = () => {
      //clear screen
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //Draw lower level
      this.map.DrawLowerImage(this.ctx);

      //Draw gameObjects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction
        });
        object.sprite.draw(this.ctx);
      });

      //Draw upper level
      this.map.DrawUpperImage(this.ctx);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }
  init() {
    // init method initializes action
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();
  }
}
