// When button is pressed callback is fired but keySafe(flag) is turned to false. For flag to turn back to true button must be released
class KeyPressListener {
  constructor(keyCode, callback) {
    let keySafe = true;
    this.keyDownFunction = function (event) {
      if (event.code === keyCode) {
        if (keySafe) {
          keySafe = false;
          callback();
        }
      }
    };
    this.keyUpFunction = function (event) {
      if (event.conde === keyCode) {
        keySafe = true;
      }
    };

    document.addEventListener("keydown", this.keyDownFunction);
    document.addEventListener("keyup", this.keyUpFunction);
  }

  unbind(){
    document.removeEventListener("keydown",this.keyDownFunction);
    document.removeEventListener("keyup",this.keyDownFunction);
}
}
