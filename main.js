
// ---------------------------- Constants ------------------------------ (fixed variables)
//before games start cards
const cards = [
  { id: 1, content: 'a', matched: false, flipped: false, blankCard: false },
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
  { id: 12, content: 'F', matched: false, flipped: false, blankCard:false },
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
  { id: 12, content: '', matched: false, flipped: false, blankCard:true },
  ];
  flippedCards = [];
  matchedCards = [];
  isGameOver = null;
  score = 0;
}

function renderStartCards() {
  //cardEls is referring to .card in HTML
  cardEls.forEach(function (cardEl, index) {
    const cardValue = cards[index].content;
    cardEl.innerHTML = cardValue;
    cardEl.id = cards[index].id;
    cardEl.addEventListener('click', handleCardClick);
  });
}

function handleCardClick(event) {
  const cardEl = event.target;
  const clickedCard = cards[cardEl.id - 1];

  if (clickedCard.matched || clickedCard.flipped) {
    return;
  }
  clickedCard.flipped = true;
  cardEl.classList.add("flipped");
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    renderCheckCardMatched();
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

function renderisGameOver() {
  if (matchedCards.length === cards.length) {
    isGameOver = true;
    const gameOverText = document.getElementById("over");
    gameOverText.innerHTML = "Game Over! All cards matched.";
  }
}
