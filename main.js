
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
let startCards; // total cards in the game 
let flippedCards;// when player p1(player 1) or C(computer) have clicked the cards to flip
let matchedCards; // after fliiping the cards in matching them
let isGameOver; // when there are no cards on the screen . Game is Over!
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
flippedCards = []; 
matchedCards = []; 
isGameOver = null; 
score = 0; 
}
//for each loop through each card element and add the text of each array to each one 
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

  // Use a conditional to check if the clicked card is flipped or matched and return from function if so 
  if (clickedCard.matched || clickedCard.flipped) {
    return;
  }

  clickedCard.flipped = true;
  const showCardContent = `card-${clickedCard.id}`;

  cardEl.classList.remove("hidden"); // Remove the "hidden" class
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

    // Increment the score variable
    score++;

    const scoreEl = document.getElementById('score');
    scoreEl.textContent = "score: " + score;
    scoreEl.style.fontSize = "32px";
    scoreEl.style.color;
  } else {
    // Map over the flipped cards and for each card, get the element by card.id and save to a variable called cardEls 
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
    });
  }
}
function renderisGameOver() {
  if (matchedCards.length === cards.length / 2) {
    isGameOver = true;
    const gameOverText = document.getElementById("over");
    gameOverText.innerHTML = "Game Over! All cards matched.";
  }
renderisGameOver();
}
