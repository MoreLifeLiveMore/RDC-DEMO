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
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((object) => {
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
    this.map.mountObjects();
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();
    //crete custome cutscenes!!
    this.map.startCutscene([
      // Hero is about to walk out
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "left" },
      { who: "hero", type: "walk", direction: "left" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      // npc1 sees and comes to stop me
      { who: "npc1", type: "walk", direction: "down" },
      { who: "npc1", type: "walk", direction: "down" },
      { who: "npc1", type: "walk", direction: "down" },
      { who: "npc1", type: "walk", direction: "down" },
      { who: "npc1", type: "walk", direction: "down" },
      { who: "npc1", type: "walk", direction: "right" },
      { who: "npc1", type: "walk", direction: "right" },
      { who: "npc1", type: "stand", direction: "up", time: 500 },
    {type:"textMessage", text:"Be Careful Out There Niqqa!"},

      //npc1 then returns to normal ai route
      { who: "npc1", type: "walk", direction: "left" },
      { who: "npc1", type: "walk", direction: "left" },
      { who: "npc1", type: "walk", direction: "up" },
      { who: "npc1", type: "walk", direction: "up" },
      { who: "npc1", type: "walk", direction: "up" },
      { who: "npc1", type: "stand", direction: "down", time: 1000 },
      { who: "npc1", type: "walk", direction: "up" },
      { who: "npc1", type: "walk", direction: "up" },
    ]);
  }
}
