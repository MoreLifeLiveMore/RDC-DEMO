// top level, parent component that keeps track of state and sends to sub-components... draws images to canvas
class Overworld {
  constructor(config) {
    this.element = config.element; // assigns element(game containter), assings to config parameter
    this.canvas = this.element.querySelector(".game-canvas"); // finds game canvas from game container, used to draw images to
    this.ctx = this.canvas.getContext("2d"); //reference to canvas, access to drawing methods(2d)
  }

  init() {
    // Init methods initializes action
    const image = new Image(); // creates new image
    image.onload = () => {
      // loads image data(pixels) to browser so it can be used
      this.ctx.drawImage(image, 0, 0); // loads data to canvas thru its context, context allows us to draw to canvas
    };
    image.src = "/images/maps/DemoLower.png"; // assigns image source

    // Place Game Objects!
    const hero = new GameObject({
      x: 7,
      y: 5,
    });
    const npc1 = new GameObject({
      x: 3,
      y: 4,
      src: "/images/characters/people/npc1.png",
    });

    setTimeout(() => {
      hero.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 200);
  }
}
