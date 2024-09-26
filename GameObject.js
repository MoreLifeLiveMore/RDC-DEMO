// creates a sprite, passes itself in as gameObject creator in Sprite.js
class GameObject {
  constructor(config) {
    // config is like an object, so we can pass different values to it (kinda like props react?)
    this.x = config.x || 0;
    this.isMounted = false;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this, // gives gameObject key access to properties
      src: config.src || "/images/characters/people/hero.png",
    });
  }

  mount(map) {
    this.isMounted = true;
    map.addMap(this.x, this.y);
  }

  update() {}
}
