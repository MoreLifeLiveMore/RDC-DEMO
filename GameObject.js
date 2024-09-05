// creates a sprite, passes itself in as gameObject creator in Sprite.js
class GameObject {
  constructor(config) {
    // config is like an object, so we can pass different values to it (kinda like props react?)
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new Sprite({
         gameObject: this,    // gives gameObject key access to properties
         src: config.src || "/images/characters/people/hero.png"
    });
  }
}
 