const board = document.getElementById("game-board");
const letters = "A B C D E F G H".split("");
let cardValues = [...letters, ...letters];
let flippedCards = [];
let lockBoard = false;


cardValues.sort(() => 0.5 - Math.random());

function createCard(letter) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.letter = letter;
  card.textContent = ""; 

  card.addEventListener("click", () => {
    if (lockBoard || card.classList.contains("flipped")) return;

    flipCard(card);

    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  });

  return card;
}

function flipCard(card) {
  card.classList.add("flipped");
  card.textContent = card.dataset.letter;
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    flippedCards.forEach(card => {
      card.classList.remove("flipped");
      card.textContent = "";
    });
    flippedCards = [];
    lockBoard = false;
  }, 1000);
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.letter === card2.dataset.letter) {
    flippedCards = [];

    
    const allFlipped = [...document.querySelectorAll(".card")]
      .every(card => card.classList.contains("flipped"));
    if (allFlipped) {
      setTimeout(() => alert("🎉 You win! All pairs matched."), 300);
    }

  } else {
    unflipCards();
  }
}


cardValues.forEach(letter => {
  const card = createCard(letter);
  board.appendChild(card);
});
