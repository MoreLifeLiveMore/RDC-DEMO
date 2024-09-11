// class that takes in input from key codes
class DirectionInput {
  constructor() {
    this.heldDirections = []; 
    this.map = {
      ArrowUp: "up",
      KeyW: "up",
      ArrowDown: "down",
      KeyS: "down",
      ArrowLeft: "left",
      KeyA: "left",
      ArrowRight: "right",
      KeyD: "right",
    };
  }

  get direction() { // methd that returns current direction and shows in array
    return this.heldDirections[0];
  }

  init() { // runs init to add events to "gameScreen/container" document/webpage 
    //listens for an event (a key being pressed down(keydown)) with an option for
    // the event to have a variable that holds the key codes held in the map property.
    document.addEventListener("keydown", (e) => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) { 
        this.heldDirections.unshift(dir);
        console.log(this.heldDirections);
      }
    });
    document.addEventListener("keyup", (e) => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
        console.log(this.heldDirections);
      }
    });
  }
}
