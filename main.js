
// ----------------------------Constants------------------------------ (fixed variables)

const cards = [
  { id: 1, content: 'A', matched: false, flipped: false },
  { id: 2, content: 'B', matched: false, flipped: false },
  { id: 3, content: 'A', matched: false, flipped: false },
  { id: 4, content: 'B', matched: false, flipped: false },
  { id: 5, content: 'C', matched: false, flipped: false },
  { id: 6, content: 'D', matched: false, flipped: false },
  { id: 7, content: 'C', matched: false, flipped: false },
  { id: 8, content: 'D', matched: false, flipped: false },
  { id: 9, content: 'E', matched: false, flipped: false },
  { id: 10, content: 'F', matched: false, flipped: false },
  { id: 11, content: 'E', matched: false, flipped: false },
  { id: 12, content: 'F', matched: false, flipped: false },
]; 

//-----------------------------State Variables-----------------------------------
let startCards; 
let flippedCards;
let matchedCards; 
let isGameOver; 
let score;
//----------------------------cache---------------------------------------------
const startButton = document.querySelector('#start-button');
const cardEls = document.querySelectorAll('.card');
const scoreEl = document.getElementById('score');
//---------------------------------Event Listeners----------------------------
startButton.addEventListener('click', renderStartCards);
//-----------------------------------init()-------------------------------------
init();
//-------------------------------------Function---------------------------------------
function init() {  
shuffleCards = []
flippedCards = []; 
matchedCards = []; 
isGameOver = true; 
score = 0; 
}

function renderStartCards() {

cardEls.forEach(function(cardEl, index) {
  const cardValue = cards[index].content;
  cardEl.textContent = cardValue;
  cardEl.id = cards[index].id;
  cardEl.classList.add("hidden"); 
  cardEl.addEventListener('click', handleCardClick);
   });
}; 

function handleCardClick(event) {
  const cardEl = event.target;
  const clickedCard = cards[cardEl.id - 1];

  if (clickedCard.matched || clickedCard.flipped) {
    return;
  }

  clickedCard.flipped = true;
  const showCardContent = `card-${clickedCard.id}`;

  cardEl.classList.remove("hidden");
  cardEl.classList.add("flipped", showCardContent);
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

    matchedCards.push(card1, card2);
    score++;

    const scoreEl = document.getElementById('score');
    scoreEl.textContent = "score: " + score;
    scoreEl.style.fontSize = "32px";
    scoreEl.style.color;
  } else {
    const cardEls = flippedCards.map(card => document.getElementById(card.id));

    flippedCards.forEach(flippedCard => {
      flippedCard.flipped = false;
    });

    cardEls.forEach((cardEl, index) => {
      if (index === 1) {
        setTimeout(() => {
          cardEl.classList.remove("flipped", `card-${cardEl.id}`);
          cardEl.classList.add("hidden");
        }, 1000); 
      } else {
        cardEl.classList.remove("flipped", `card-${cardEl.id}`, "hidden");
      } 
        if (matchedCards.length === 12 ) {
          renderisGameOver();
      }
    });
  }
}

function renderisGameOver() {
  console.log("matchedCards length:", matchedCards.length);
  if (matchedCards.length === 12 ) {
    isGameOver = true;
    const gameOverText = document.getElementById("over");
    gameOverText.classList.remove('.hidden-over');
    // gameOverText.innerHTML = "Game Over! All cards matched.";
  }
}