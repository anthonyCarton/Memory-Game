// JavaScript Document
// Constant Variables
const DECK = document.querySelector('.deck');
const CARDS = DECK.querySelectorAll('li.card');
const SUITS = DECK.querySelectorAll('li.card > i');
const RESET = document.querySelector('.fa-repeat');
const STARS = document.querySelectorAll('.stars li');
const MOVES = document.querySelector('.moves');
const TIMER = document.querySelector('.timer');


// Variables
let stars, moves, matchCount, timeCount, timerID;
let suits = [], openCards = [];


// // // FUNCTIONS
function gameTimer(){
  // increment timeCount and display on .html
  timeCount++;
  TIMER.innerText = timeCount;
}


function startTimer(){
  // create timer, start on click
  timerID = window.setInterval(gameTimer, 1000);
  DECK.removeEventListener('click', startTimer);
}


function stopTimer(){
  clearInterval(timerID);
}


function suitList(){
  // Load each card into suits[]
  SUITS.forEach(function(entry){
    // remove fa class, add classes to suits[], remove entry
    entry.classList.remove('fa');
    suits.push(entry.className);
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


function counter(){
  // Increment moves and display on .html
  moves++;
  MOVES.innerText = moves;
}


function newGame() {
  // Set a newGame() (on DOMContentLoaded or RESET)
  for (let i = 0; i<7; i++){
    // Shuffle 7 times
    suits = shuffle(suits);
  }
  // Deal cards
  CARDS.forEach(function(card, index){
    // create i, remove classes, add to i, replace card
    let children = card.firstChild;
    let element = document.createElement('i');
    card.classList.remove('match', 'open', 'show');
    element.classList.add('fa', suits[index]);
    card.replaceChild(element, children);
  });
  // Reset star count and icons
  stars = 9;
  STARS.forEach(function(star){
    star.firstChild.classList.remove('hide');
  });
  // Reset move and run counter() to display moves
  moves = -1;
  counter();
  // reset matcheCount
  matchCount = 0;
  // Start timeCount @ 0sec on 1st click
  timeCount = 0;
  DECK.addEventListener('click', startTimer);
  // reset openCards[] to fix reset bug.
  openCards = [];
}


function displaySymbol(event){
  // flip card
  event.target.classList.add('open', 'show');
}


function cardList(event){
  // Add card to openCards[], 2 cards / turn, compare 2nd card
  if (openCards.length < 2) {
    openCards.push(event.target);
  }
  if (openCards.length == 2) {
    cardCompare();
  }
}


function clearCards (){
  // flip cards back and remove from openCards
  openCards.forEach( function(card){
    card.classList.remove('open', 'show', 'nope');
  });
  openCards = [];
}


function cardsMatch(){
  // If cards match, lock open
  openCards.forEach( function(card){ card.classList.add('match') });
  clearCards();
  matchCount++;
}


function cardsDontMatch(){
  // If no match, remove from list and flip after 1s
  openCards.forEach( function(card){ card.classList.add('nope') });
  setTimeout(clearCards, 1000);
  starMinus();
}


function winGame(){
  // winGame() at 8 matches, stopTimer(), alert user, call newGame
  stopTimer();
  window.alert(`YOU WIN!!
Your time was ${timeCount} seconds.
Your score is ${stars} points.
Play again?`);
  newGame();
}


function loseGame(){
  // loseGame() at 0 stars, stopTimer(), alert user, call newGame()
  stopTimer();
  window.alert('you lose :(');
  newGame();
}


function cardCompare(){
  // compare card class symbols
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


function starMinus(){
  // Decrement stars on not match.
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
}


// // // Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(event) {
  suitList();
  newGame();


  RESET.addEventListener("click", function(event) {
    stopTimer();
    newGame();
  });


  DECK.addEventListener("click", function(event) {
    // Only call functions on unmatched cards
    if (event.target.tagName == "LI"
      && openCards.length < 2
      && event.target.classList.contains('match') == false
      && event.target.classList.contains('open') == false){
        displaySymbol(event);
        cardList(event);
    }
  });


// The End
});
