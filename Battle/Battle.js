class Battle {
  constructor() {
    this.combatant = {
      player1: new Combatant(
        {
          hp: 30,
          maxHp: 30,
          xp: 0,
          level: 1,
          status: null,
        },
        this
      ),
    };
  }

  createElement() {
    this.element = document.querySelector("div");
    this.element.classList.add("Battle");
    this.element.innerHTML = `
        <div class = "Battle_hero">
        <img src = "${"/images/characters/people/hero.png"}" alt="Hero"/>
        </div>
        <div class="Battle_enemy">
        <img src =${`/images/characters/people/npc3.png`} alt="Enemy"/>
        </div>`;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
