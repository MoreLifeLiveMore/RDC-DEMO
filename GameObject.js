// creates a sprite, passes itself in as gameObject creator in Sprite.js
class GameObject {
  constructor(config) {
    // config is like an object, so we can pass different values to it (kinda like props react?)
    this.id = null;
    this.x = config.x || 0;
    this.isMounted = false;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this, // gives gameObject key access to properties
      src: config.src || "/images/characters/people/hero.png",
    });

    this.behaviourloop = config.behaviourloop || [];
    this.behaviourloopIndex = 0;

    this.talking = config.talking || [];
  }

  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    //if we have ai behaviour, start after short delay
    setTimeout(() => {
      this.doBehaviourEvent(map);
    }, 10);
  }

  update() {}

  async doBehaviourEvent(map) {
    // Don't do anything while cutscene is playing and ai is taking brief pause to reset(not doing anything momentarily)
    if (map.isCutscenePlaying || this.behaviourloop.length === 0 || this.isStanding) {
      return;
    }
    //setting up relevant information for the event
    let eventConfig = this.behaviourloop[this.behaviourloopIndex];
    eventConfig.who = this.id;

    //create event instance out of next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.Init();

    /// do this next event
    //
    //
    this.behaviourloopIndex += 1;
    if (this.behaviourloopIndex === this.behaviourloop.length) {
      this.behaviourloopIndex = 0;
    }

    // Do it again
    this.doBehaviourEvent(map);
  }
}
 