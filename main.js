

//MVC-
//Data That Needs To Be Remembered - Players , Whos Turn, Tally points(state variables)
// 
// ----------------------------Constants------------------------------ (fixed variables)

const cards = [
    { id: 1, content: 'A', matched: false, flipped: false },
    { id: 2, content: 'B', matched: false, flipped: false },
    { id: 3, content: 'A', matched: false, flipped: false },
    { id: 4, content: 'B', matched: false, flipped: false },
    // ... more card objects
  ]; 



//-----------------------------State Variables-----------------------------------

let startCards; // total cards in the game 
let flippedCards;// when player p1(player 1) or C(computer) have clicked the cards to flip
let matchedCards; // after fliiping the cards in matching them
let isGameOver; // when there are no cards on the screen . Game is Over!




//----------------------------cache---------------------------------------------


const startButton = document.querySelector('#start-button');

const cardEls = document.querySelectorAll('.card');

const cardContainer = document.getElementById('cards');



//---------------------------------Event Listeners----------------------------

startButton.addEventListener('click', renderStartCards )


//-----------------------------------init()-------------------------------------
init();//have to ALWAYS call the init function it initialize all state variables.
// This function make sure all variables have a starting point


//-------------------------------------Function---------------------------------------



function init() {  // initialize all state then call render

flippedCards = []; // no cards should be flipped when game start
matchedCards = []; // no matched cards when game start
isGameOver = null; // no winner when game start

}
//for each / loop through each card element and add the text of each array to each one 
function renderStartCards() {

  cardEls.forEach(function(cardEl, index) {
    const cardValue = cards[index].content;
    cardEl.textContent =cardValue;
    cardEl.id = cards[index].id
    cardEl.addEventListener('click', handleCardClick);
  });
}; 
    
function handleCardClick(event) {
  let clickedCard = cards[event.target.id - 1];
  clickedCard.flipped = true
  flippedCards.push(clickedCard)
  if(flippedCards.length === 2) {
    checkCardMatched() 
  }
}
function checkCardMatched () {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];
  
  if(card1.content === card2.content) {
    card1.matched = true;
    card2.matched= true;
    flippedCards.splice(0,2); // need to add this same code if not true
  }
  } else if { 

    const card3 = flippedCards[0]
  }

  
    
  
  







}












// if(clickedCard.flipped = true) {
// // want it to  retur card clickd value
//   cards.flipped = cards.content;
// // return clickedCard.content;
// console.log(cards.content)
// }
// }



 


 
 




    

    












        

        









  
  
  
 
   
 






















































// //using my STATE Variables in this section to Render or Display elements on the screen when needed
// function renderGame(){
// if(gameState ==="playing") {
//     //update game elements

// } else if (gameState === "gameover"){
//     //display game over sceen
