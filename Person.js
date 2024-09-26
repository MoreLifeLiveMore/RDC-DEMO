class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      //More cases for starting to walk
      //
      //

      //Case: Ready to receive input and have arrow key pressed
      if (this.isPlayerControlled && state.arrow) {
        this.startBehaviour(state, {
          type: "walk",
          direction: state.arrow
        })
      }
      this.updateSprite(state);
    }
  }

  startBehaviour(state, behaviour) {
    // Set character direction to match behaviour
    this.direction = behaviour.direction;

    if (behaviour.type === "walk") {
      // Stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }
      //Ready walk
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgressRemaining -= 1;
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }

    this.sprite.setAnimation("idle-" + this.direction);
  }
}
