// Function that runs itself to create the Overworld
(function () {
    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    })
    overworld.init();
})();