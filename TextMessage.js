
//UI Components to follow this type of structure//
class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null; // element to append to DOM when ready to show TextMessage
  }

  createElement() {
    // creates a div element and populates it with text and presantational details from scratch
    // creates element
    this.element = document.createElement("div"); // creates new element and assigned to this element property
    this.element.classList.add("TextMessage"); // added class to element

    this.element.innerHTML = `
        <p class="TextMessage_p">${this.text}</p> 
        <button class="TextMessage_button">next</button>
        `; //html ready to append to the DOM

        this.element.querySelector("button").addEventListener("click", () => {
          //closes text messages
          this.done();
        })
  } 
// resolves event by removing on screen text message and calling onComplete, moving action forward?
  done(){
    this.element.remove()
    this.onComplete();
  }

  

  init(container) {
    // takes in container and when called creates its element then appends created element to the container
    this.createElement();
    container.appendChild(this.element);
  }
}
