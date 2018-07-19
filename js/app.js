// JavaScript Document
// Constant Variables
const DECK = document.querySelector(".deck");
const CARDS = DECK.querySelectorAll('li');
const SUITS = document.querySelectorAll("li.card > i");
const RESET = document.querySelector(".fa-repeat");
const STARS = document.querySelectorAll(".stars li")


// Variables
let moves = 0;
let stars = 3;  // TODO maybe you get 6 misses before you lose
let suits = [];
let openCards = [];


// TODO remove when finished
let showall = function(){
  CARDS.forEach(function(card){
    card.classList.add('open', 'show')
  });
};


// // // FUNCTIONS
// Load cards into suitList()
function suitList(){
  // load the suits into the array
  SUITS.forEach(function(entry){
    // remove fa class
    entry.classList.remove('fa');
    // add entry.className to end of array
    suits.push(entry.className);
    // remove entry
    entry.remove();
  });
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// begin a newGame() at DOMContentLoaded or RESET
function newGame() {
  console.log('newGame()');
  console.log(suits);
  // shuffle 7 times
  for (let i = 0; i<7; i++){
    suits = shuffle(suits);
  }
  console.log(suits);

  // Remove the card classes
  CARDS.forEach(function(card, index){
    let children = card.firstChild;
    // Create i element
    let element = document.createElement('i');
    // Remove classes from card
    card.classList.remove('match', 'open', 'show');
    // Add classes to I
    element.classList.add('fa', suits[index]);
    // Replace new card with old card
    card.replaceChild(element, children);
  });

  // Reset stars and moves
  stars = 3;
  moves = 0;
}


// display this cards symbol (flip the card)
function displaySymbol(event){
  event.target.classList.add('open', 'show');
}


// Add card to a list of open cards
function cardList(event){
  if (openCards.length < 2) {
    openCards.push(event.target);
    console.log(openCards)
  }
  if (openCards.length == 2) {
    cardCompare();
  }
  console.log(`${openCards.length} cards open`);
}


// compare card class symbols
function cardCompare(){
  if (openCards[0].firstChild.className == openCards[1].firstChild.className){
    openCards[0].classList.add('match');
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.add('match');
    openCards[1].classList.remove('open', 'show');
    cardsMatch();
    counter();
  } else {
    cardsDontMatch();
    starMinus();
    counter();
  }
}


// flip cards back and remove from openCards
function clearCards (){
  console.log('clearCards()');
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  openCards = [];
}


// TODO:  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
function cardsMatch(){
  console.log('cardsMatch()');
  clearCards();
}


// TODO:  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function cardsDontMatch(){
  console.log('cardsDontMatch()');
  setTimeout(clearCards, 2000);
}


// TODO:  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
function counter(){
  moves++;
  // update new moves count
}


// TODO:  + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function winGame(){
  console.log('winGame()');
  // On win, alert user, call newGame
}


function loseGame(){
  console.log('loseGame()');
  // On lose, alert user, call newGame()

}


// TODO: Timer
  // On first card click, start Timer
  // On game win, stop Timer


// Decrement Stars
function starMinus(){     // Call star decrement on not match case.
  switch (stars) {
    case 3:
    STARS[2].firstElementChild.removeAttribute('class');
    break;
    case 2:
    STARS[1].firstElementChild.removeAttribute('class');
    break;
    case 1:
    STARS[0].firstElementChild.removeAttribute('class');
    loseGame();
    break;
  }
  stars--;
  console.log(`${stars} stars`);
}


// // // Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(event) {
suitList();
newGame();


// On reset, shuffle cards, reset stars ...
RESET.addEventListener("click", function(event) {
  console.log('reset clicked')
  newGame();
});


// On Click, display symbol and open cards
DECK.addEventListener("click", function(event) {
  //  Only call functions on unmatched cards
  if (event.target.tagName == "LI"
    && event.target.classList.contains('match') == false
    && openCards.length < 2){
      // TODO don't let them open the same card twice.
      // flip the card when clicked
      displaySymbol(event);
      // add card to comparison list
      cardList(event);
  }
});


// The End
});
