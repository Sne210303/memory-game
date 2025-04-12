document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const timerDisplay = document.getElementById("timer");
    const moveDisplay = document.getElementById("moves");
    const restartBtn = document.getElementById("restart-btn");
  
    const letters = "A B C D E F G H".split("");
    let cardValues = [...letters, ...letters];
    let flippedCards = [];
    let lockBoard = false;
  
    
    let time = 0;
    let timerInterval;
    let timerStarted = false;
  
    
    let moves = 0;
  
    
    const flipSound = new Audio("sounds/flip.mp3");
    const matchSound = new Audio("sounds/match.mp3");
    const winSound = new Audio("sounds/win.mp3");
  
    
    cardValues.sort(() => 0.5 - Math.random());
  
    
    function createCard(letter) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.letter = letter;
      card.textContent = "";
  
      card.addEventListener("click", () => {
        if (lockBoard || card.classList.contains("flipped")) return;
  
        if (!timerStarted) {
          startTimer();
          timerStarted = true;
        }
  
        flipCard(card);
        flipSound.play();
        flippedCards.push(card);
  
        if (flippedCards.length === 2) {
          updateMoves();
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
        matchSound.play();
  
        const allFlipped = [...document.querySelectorAll(".card")]
          .every(card => card.classList.contains("flipped"));
  
        if (allFlipped) {
          clearInterval(timerInterval);
          winSound.play();
          setTimeout(() => {
            alert(`🎉 You win! All pairs matched in ${time}s and ${moves} moves.`);
          }, 300);
        }
      } else {
        unflipCards();
      }
    }
  
    
    function startTimer() {
      timerInterval = setInterval(() => {
        time++;
        timerDisplay.textContent = `⏳ Time: ${time}s`;
      }, 1000);
    }
  
   
    function updateMoves() {
      moves++;
      moveDisplay.textContent = `🎯 Moves: ${moves}`;
    }
  
   
    cardValues.forEach(letter => {
      const card = createCard(letter);
      board.appendChild(card);
    });
  
   
    restartBtn.addEventListener("click", () => {
      clearInterval(timerInterval);
      location.reload();
    });
  });
  

  