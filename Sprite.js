class Sprite {
  constructor(config) {
    //Setup Images
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    //Setup Shadow
    this.shadow = new Image();
    this.useShadow = true; //config.useShadow || false
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    // current animation & initial state
    this.animation = config.animation || {
      // default key(animation) with a series of frames(stored as an array)
      idleDown: [[0, 0]],
    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.curentAnimationFrame = 0;

    //Reference the gameObject
    this.gameObject = config.gameObject;
  }

  draw(ctx) {
    // method that draws to context(canvas)
    const x = this.gameObject.x - 8; // position to draw to x-axis
    const y = this.gameObject.y - 18; // position to draw to y-axis

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
  }
}
