// JavaScript Document
// Constant Variables
const DECK = document.querySelector('.deck');
const CARDS = DECK.querySelectorAll('li.card');
const SUITS = DECK.querySelectorAll('li.card > i');
const RESET = document.querySelector('.fa-repeat');
const STARS = document.querySelectorAll('.stars li')
const MOVES = document.querySelector('.moves');


// Variables
let stars, moves, matchCount, timeCount, timerID;
let suits = [], openCards = [];


function gameTimer(){
    timeCount++;
}
function startTimer(){
 timerID = window.setInterval(gameTimer, 1000);
 console.log('timer started');
 DECK.removeEventListener('click', startTimer);
 console.log('event listener removed')
}
function stopTimer(){
  clearInterval(timerID);
}


// TODO remove when finished
let flipall = function(){
  CARDS.forEach(function(card){
    card.classList.toggle('open');
    card.classList.toggle('show');
  });
};


// // // FUNCTIONS
// Load each card into suits[]
function suitList(){
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


// Increment moves and display on page
function counter(){
  moves++;
  MOVES.innerText = moves;
}


// Set a newGame() (on DOMContentLoaded or RESET)
function newGame() {
  console.log('newGame()');
  console.log('preshuffle');
  // Shuffle 7 times
  for (let i = 0; i<7; i++){
    suits = shuffle(suits);
  }
  console.log('postshuffle');
  // Deal cards
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
  console.log('cards dealt');
  // Reset star count and icons
  stars = 9;
  STARS.forEach(function(star){
    star.firstChild.classList.remove('hide');
  });
  console.log('stars reset');

  // Reset move and run counter() to display moves
  moves = -1;
  counter();
  console.log('moves counter reset');

  // Count the matches
  matchCount = 0;
  console.log('matchCount reset');

  // TODO start timeCount (on card('click' ... ?)
  timeCount = 0;
  DECK.addEventListener('click', startTimer);
}



// flip the card
function displaySymbol(event){
  event.target.classList.add('open', 'show');
}


// Add card to openCards[]
function cardList(event){
  if (openCards.length < 2) {
    openCards.push(event.target);
    console.log(openCards);
  }
  if (openCards.length == 2) {
    cardCompare();
  }
  console.log(`${openCards.length} cards open`);
}


// flip cards back and remove from openCards
function clearCards (){
  console.log('clearCards()');
  openCards.forEach( function(card){ card.classList.remove('open', 'show', 'nope') });
  openCards = [];
}


// If cards match, lock open
function cardsMatch(){
  console.log('cardsMatch()');
  openCards.forEach( function(card){ card.classList.add('match') });
  clearCards();
  matchCount++;
  console.log(`${matchCount} matches`);
}


// If  cards do not match, remove cards from list and flip
function cardsDontMatch(){
  console.log('cardsDontMatch()');
  openCards.forEach( function(card){ card.classList.add('nope') });
  setTimeout(clearCards, 1000);
  starMinus();
}


// winGame() at 8 matches
function winGame(){
  console.log('winGame()');
  stopTimer();
  console.log('stopTimer()');
  // On win, alert user, call newGame
  // TODO:  + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  //window.alert('you win');
  window.alert(
`YOU WIN!!
Your time was ${timeCount} seconds.
Your score is ${stars} points.
Play again?`
  )
  newGame();
}


// loseGame() at 0 stars
function loseGame(){
  console.log('loseGame()');
  stopTimer();
  console.log('stopTimer()');
  // On lose, alert user, call newGame()
  window.alert('you lose');
  newGame();
}


// compare card class symbols
function cardCompare(){
  if (openCards[0].firstChild.className == openCards[1].firstChild.className){
    cardsMatch();
  } else {
    cardsDontMatch();
  }
  counter();
  // Winner?
  if (matchCount == 8) {
    winGame();
  }
  // Loser?
  if (stars == 0) {
    loseGame();
  }
}


// Decrement Stars
function starMinus(){     // Call star decrement on not match case.
  switch (stars) {
    case 6:
    STARS[2].firstChild.classList.add('hide');
    break;
    case 4:
    STARS[1].firstChild.classList.add('hide');
    break;
    case 2:
    STARS[0].firstChild.classList.add('hide');
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
  stopTimer();
  newGame();
});


// On Click, display symbol and open cards
DECK.addEventListener("click", function(event) {
  //  Only call functions on unmatched cards
  if (event.target.tagName == "LI"
    && openCards.length < 2
    && event.target.classList.contains('match') == false
    && event.target.classList.contains('open') == false){
      // flip the card
      displaySymbol(event);
      // add to comparison list
      cardList(event);
  }
});


// The End
});
