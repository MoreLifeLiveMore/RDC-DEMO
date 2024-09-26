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

      //Establish camera Person
      const cameraPerson = this.map.gameObjects.hero;

      //update all Objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      //Draw lower level
      this.map.DrawLowerImage(this.ctx, cameraPerson);

      //Draw gameObjects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      //Draw upper level
      this.map.DrawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }
  init() {
    // init method initializes action
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    console.log(this.map.walls);
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();
  }
}
