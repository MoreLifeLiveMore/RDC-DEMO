class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image(); // lowerImage is like tles the player walks on
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image(); // upperImage is like roofs and treetops that hover above player, covering them?
    this.upperImage.src = config.upperSrc;
  }

  DrawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }

  DrawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0);
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(8),
        y: utils.withGrid(5),
      }),
      npc1: new Person({
        x: utils.withGrid(3), 
        y: utils.withGrid(4),
        src: "/images/characters/people/npc1.png" 
      }) 
    },
  },
};
