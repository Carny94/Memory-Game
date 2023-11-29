
// ---------------------------- Constants ------------------------------ (fixed variables)
//before games start cards
const cards = [
  { id: 1, content: 'A', matched: false, flipped: false, blankCard: false },
  { id: 2, content: 'B', matched: false, flipped: false, blankCard: false },
  { id: 3, content: 'A', matched: false, flipped: false, blankCard: false },
  { id: 4, content: 'B', matched: false, flipped: false, blankCard: false },
  { id: 5, content: 'C', matched: false, flipped: false, blankCard: false },
  { id: 6, content: 'D', matched: false, flipped: false, blankCard: false },
  { id: 7, content: 'C', matched: false, flipped: false, blankCard: false },
  { id: 8, content: 'D', matched: false, flipped: false, blankCard: false },
  { id: 9, content: 'E', matched: false, flipped: false, blankCard: false },
  { id: 10, content: 'F', matched: false, flipped: false, blankCard: false },
  { id: 11, content: 'E', matched: false, flipped: false , blankCard:false },
  { id: 12, content: 'F', matched: false, flipped: false, blankCard:false }
];

// ---------------------------- State Variables -------------------------
let startCards;     // blank card before user click to flip
let flippedCards;   // when player p1(player 1) or C(computer) have clicked the cards to flip
let matchedCards;   // after flipping the cards in matching them
let isGameOver;     // when there are no cards on the screen. Game is Over!
let score;

// ------------------------------ Cache ------------------------------
const startButton = document.querySelector('#start-button');
const cardEls = document.querySelectorAll('.card');
const scoreEl = document.getElementById('score');
const cardContainer = document.getElementById('cardContainer')
// ------------------------ Event Listeners ------------------------
startButton.addEventListener('click', renderStartCards);

// ------------------------------- Initialization --------------------------
init();

// ------------------------------- Functions -------------------------------

function init() {
  startCards = [
  { id: 1, content: '', matched: false, flipped: false, blankCard: true },
  { id: 2, content: '', matched: false, flipped: false, blankCard: true },
  { id: 3, content: '', matched: false, flipped: false, blankCard: true },
  { id: 4, content: '', matched: false, flipped: false, blankCard: true },
  { id: 5, content: '', matched: false, flipped: false, blankCard: true },
  { id: 6, content: '', matched: false, flipped: false, blankCard: true },
  { id: 7, content: '', matched: false, flipped: false, blankCard: true },
  { id: 8, content: '', matched: false, flipped: false, blankCard: true },
  { id: 9, content: '', matched: false, flipped: false, blankCard: true },
  { id: 10, content: '', matched: false, flipped: false, blankCard: true },
  { id: 11, content: '', matched: false, flipped: false , blankCard:true },
  { id: 12, content: '', matched: false, flipped: false, blankCard:true }
  ];
  flippedCards = [];
  matchedCards = [];
  isGameOver = null;
  score = 0;
}

function renderStartCards() {
 
  //cardEls is referring to .card in HTML
  cardEls.forEach(function (cardEl, index) {
   cardEl.textContent = '';
   const card1 = startCards[index].blankCard ? startCards[index].content : cards[index];
   cardEl.textContent = card1.blankCard ? '' : card1.content;
   cardEl.addEventListener('click', handleCardClick);
 
  });
}

  function handleCardClick(event) {
    const currentCardEl = event.target;
    const cardId = parseInt(currentCardEl.id.split('-')[1]);

      if (isNaN(cardId)) {
        console.error('Invalid cardId:', currentCardEl.id);
      return;
    }

    const clickedCard = startCards[0].blankCard ? startCards[0] : cards.find(card => card.id === cardId);
  
    if ( clickedCard.matched || clickedCard.flipped) {
      return;
    }
    clickedCard.flipped = true;
    currentCardEl.classList.add("flipped");
    flippedCards.push(clickedCard);
  
    if (flippedCards.length === 2) {
      setTimeout(renderCheckCardMatched, 1000); // Delay to show the second card
      flippedCards.splice(0, 2);
    }
  }

function renderCheckCardMatched() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  if (card1.content === card2.content) {
    card1.matched = true;
    card2.matched = true;
    score++;

    const scoreEl = document.getElementById('score');
    scoreEl.textContent = "score: " + score;
    scoreEl.style.fontSize = "32px";
  } else {
    const cardEls = flippedCards.map(card => document.getElementById(card.id));
    flippedCards.forEach(flippedCard => {
      flippedCard.flipped = false;
    });
    cardEls.forEach(cardEl => {
      cardEl.classList.remove("flipped");
    });
  }
 
}

// function renderisGameOver() {
//   if (matchedCards.length === cards.length) {
//     isGameOver = true;
//     const gameOverText = document.getElementById("over");
//     gameOverText.innerHTML = "Game Over! All cards matched.";
//   }
// }
