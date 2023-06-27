//MVC-
//Data That Needs To Be Remembered - Players , Whos Turn, Tally points(state variables)
// 
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
init();//have to ALWAYS call the init function it initialize all state variables.
// This function make sure all variables have a starting point


//-------------------------------------Function---------------------------------------



function init() {  // initialize all state then call render

flippedCards = []; // no cards should be flipped when game start
matchedCards = []; // no matched cards when game start
isGameOver = null; // no winner when game start
score = 0; 

}
//for each / loop through each card element and add the text of each array to each one 
function renderStartCards() {
cardEls.forEach(function(cardEl, index) {
  const cardValue = cards[index].content;
  cardEl.textContent = cardValue;
  cardEl.id = cards[index].id;
  cardEl.addEventListener('click', handleCardClick);
});
}; 

function handleCardClick(event) { 

const cardEl = event.target
const clickedCard = cards[cardEl.id - 1];

//use a conditional to check if the clicked card is flipped or matched and return from function if so 
if (clickedCard.matched || clickedCard.flipped) {
  return;
}
clickedCard.flipped = true;
//toggle the flipped classlist on the card element 
cardEl.classList.add("flipped");
flippedCards.push(clickedCard);
  
if(flippedCards.length === 2) {
  renderCheckCardMatched(); 
  flippedCards.splice(0,2);
}
};

function renderCheckCardMatched () {
const card1 = flippedCards[0];
const card2 = flippedCards[1];
// console.log("checkCardMatched")
  
if (card1.content === card2.content) {
  card1.matched = true;
  card2.matched = true;
  // console.log("matched")
  //increment the score variable
  score++;
  // update innerText of the score HTML element to value of score
  const scoreEl = document.getElementById('score');
  scoreEl.textContent = "score: " + score;
  // console.log(score)
} else {
  //map over the flipped cards and for each card get element by card.id and save to a variable called cardEls 
  const cardEls = flippedCards.map(card => document.getElementById(card.id))
  // another forEach flippedcards.forEach, set flipped card to false**
  flippedCards.forEach(flippedCard => {
    flippedCard = false;
    // console.log(false)
  });
  //use the forEach iterator method to toggle the classlist of each cardEl to flipped 
  cardEls.forEach(cardEl => {
    cardEl.classList.remove("flipped");
  });
  // console.log(cardEls)
}
}
function renderisGameOver() {
  if (matchedCards.length === cards.length) {
    isGameOver = true;
    const gameOverText = document.getElementById("gameOverText");
    gameOverText.innerHTML = "Game Over! All cards matched.";
    
  }
}







