class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image(); // lowerImage is like tles the player walks on
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image(); // upperImage is like roofs and treetops that hover above player, covering them?
    this.upperImage.src = config.upperSrc;

    this.isCutScenePlaying = false;
  }

  DrawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  DrawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {

      let object = this.gameObjects[key];
      object.id = key;
      //TODO: determine if this object should actually mount
      object.mount(this);
    });
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
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
        src: "/images/characters/people/npc1.png",
        behaviourloop: [
          {type:"walk", direction:"down",},
          {type:"walk", direction:"left",},
          {type:"walk", direction:"right",},
          {type:"walk", direction:"up",},
          {type:"stand", direction:"up", time: 2000},
        ]
      }),
      npc2: new Person({
        x: utils.withGrid(4),
        y: utils.withGrid(4),
        src: "/images/characters/people/npc2.png",
        behaviourloop: [
          {type:"walk", direction:"right",},
          {type:"stand", direction:"right", time:1200},
          {type:"stand", direction:"up",time:1200},
          {type:"stand", direction:"down",time:1200},
          {type:"walk", direction:"left",}
        ]
      }),
    },
    walls: {
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(8, 7)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 9)]: true,
      [utils.asGridCoord(1, 10)]: true,
      [utils.asGridCoord(2, 10)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(9, 10)]: true,
      [utils.asGridCoord(10, 10)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(11, 5)]: true,
      [utils.asGridCoord(11, 6)]: true,
      [utils.asGridCoord(11, 7)]: true,
      [utils.asGridCoord(11, 8)]: true,
      [utils.asGridCoord(11, 9)]: true,
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(8, 4)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      // [utils.asGridCoord(7, 3)]: true, Event Space
      // [utils.asGridCoord(5, 10)]: true, Event Space
    },
  },
};
