class OverworldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehaviour(
      {
        map: this.map,
      },
      {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time,
      }
    );
    //set up handler complete when correct person is done ai instructions, then resolve event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandingComplete", completeHandler);
        resolve();
      }
    };
    document.addEventListener("PersonStandingComplete", completeHandler);
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehaviour(
      {
        map: this.map,
      },
      {
        type: "walk",
        direction: this.event.direction,
        retry: true,
      }
    );

    //set up handler complete when correct person is done ai instructions, then resolve event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    };
    document.addEventListener("PersonWalkingComplete", completeHandler);
  }
  //⬇️ when this message runs, creates a new TextMessage, init() it and passes in where it should inject the text, then init() in TextMessage class creates Dom element, then shows on screen
  textMessage(resolve) {
    const message = new TextMessage({
      text: this.event.text, //this is the text that we want to show
      onComplete: () => resolve(), // this is what needs to be called when messages are done being acknowleged by player, once player clicks to proceed, the onComplete method needs to be called
    });
    message.init(document.querySelector(".game-container")); // passes init() a DOM container to inject our messages to
  }

  Init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve);
    });
  }
}
