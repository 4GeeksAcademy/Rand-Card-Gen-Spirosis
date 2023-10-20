import "./style.css";

class CardGame {
  constructor() {
    this.downloadTimer = null;
    this.isCountdownRunning = false;
    this.generateCardButton = document.querySelector("#generate-card");
    this.timerCardButton = document.querySelector("#timer-card");
    this.progressBar = document.querySelector("#progressBar");
    this.cardHeightInput = document.querySelector("#card-height");
    this.cardWidthInput = document.querySelector("#card-width");

    this.generateCardButton.addEventListener("click", () => {
      this.generateRandomCard();
      // this.startConfettiAnimation(); // Load confetti and trigger the animation
    });

    this.timerCardButton.addEventListener("click", () =>
      this.toggleCountdown()
    );
    this.cardHeightInput.addEventListener("input", () => this.updateCardSize());
    this.cardWidthInput.addEventListener("input", () => this.updateCardSize());

    this.generateRandomCard();
    this.startCountdown();
    this.toggleButtonText();
    this.toggleButtonColor();
  }

  deckBuilder() {
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K"
    ];
    const suits = ["♥", "♦", "♠", "♣"];
    const cards = [];

    for (let s = 0; s < suits.length; s++) {
      for (let v = 0; v < values.length; v++) {
        const value = values[v];
        const suit = suits[s];
        cards.push({ value, suit });
      }
    }
    return cards;
  }

  randomCard(cards) {
    const random = Math.floor(Math.random() * 52);
    const cardValue = cards[random].value;
    const cardSuit = cards[random].suit;
    const card = document.createElement("div");
    card.classList.add("card", cardSuit.toLowerCase());

    card.classList.add("animate-rotation");

    card.innerHTML =
      '<span class="card-value-suit top">' +
      cardValue +
      cardSuit +
      "</span>" +
      '<span class="card-suit">' +
      cardValue +
      "</span>" +
      '<span class="card-value-suit bot">' +
      cardValue +
      cardSuit +
      "</span";
    document.querySelector("#theDeck").innerHTML = "";
    document.querySelector("#theDeck").appendChild(card);
    card.style.width = this.cardWidthInput.value + "px";
    card.style.height = this.cardHeightInput.value + "px";

    card.addEventListener("animationend", () => {
      card.classList.remove("animate-rotation");
    });
  }

  updateCardSize() {
    // Update the card size based on user input in real-time
    const card = document.querySelector(".card");
    card.style.width = this.cardWidthInput.value + "px";
    card.style.height = this.cardHeightInput.value + "px";
  }

  startCountdown() {
    clearInterval(this.downloadTimer);

    if (this.isCountdownRunning) {
      let timeleft = 10;
      const interval = 1000; //(1 second)

      this.downloadTimer = setInterval(() => {
        if (timeleft <= 0) {
          clearInterval(this.downloadTimer);
          this.randomCard(this.deckBuilder());
          // if (this.isCountdownRunning) {
          //   this.startConfettiAnimation(); //confetti animation when countdown triggers
          // }
          this.startCountdown();
        }
        const progress = ((10 - timeleft) / 10) * 100;
        this.progressBar.value = progress;
        timeleft -= 1;
      }, interval);
    }
  }

  toggleCountdown() {
    this.isCountdownRunning = !this.isCountdownRunning;
    this.toggleButtonText();
    this.startCountdown();
  }

  toggleButtonText() {
    this.timerCardButton.textContent = this.isCountdownRunning
      ? "Stop"
      : "Randomize every 10 secs";
  }

  toggleButtonColor() {
    this.timerCardButton.classList.toggle("start-color");
    this.timerCardButton.classList.toggle("stop-color");
  }

  generateRandomCard() {
    this.randomCard(this.deckBuilder());
  }

  //particle function to be created here:
  // startConfettiAnimation() {
  //   (async () => {
  //     await loadConfettiPreset(tsParticles);
  //     await tsParticles.load("tsparticles", {
  //       preset: "confetti"
  //       /* Additional configuration options for the confetti particles can be added here */
  //     });
  //     // Trigger the confetti animation
  //     tsParticles.start("tsparticles");
  //   })();
  // }
}

const game = new CardGame();
