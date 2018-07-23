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
/**
  * @description increments timeCount and updates html timer
  */
function gameTimer(){
  timeCount++;
  TIMER.innerText = timeCount;
}

/**
  * @description starts timer on first card click
  */
function startTimer(){
  timerID = window.setInterval(gameTimer, 1000);
  DECK.removeEventListener('click', startTimer);
}

/**
  * @description stops timer when called
  */
function stopTimer(){
  clearInterval(timerID);
}

/**
  * @description load each card into suits[]
  */
function suitList(){
  SUITS.forEach(function(entry){
    // remove fa class, add classes to suits[], remove entry
    entry.classList.remove('fa');
    suits.push(entry.className);
    entry.remove();
  });
}


/**
  * @description Shuffle function from http://stackoverflow.com/a/2450976
  */
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

/**
  * @description increment moves and display on .html
  */
function counter(){
  moves++;
  MOVES.innerText = moves;
}

/**
  * @description set a new game on DOMContentLoaded, deal cards, reset stars, moves, matches, openCards and times
  */
function newGame() {
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

/**
  * @description flip card
  * @param event - the event from the event that calls this
  */
function displaySymbol(event){
  event.target.classList.add('open', 'show');
}

/**
  * @description add card to openCards[], 2 cards / turn, compare 2nd card
  * @param event - the event from the event that calls this
  */
function cardList(event){
  if (openCards.length < 2) {
    openCards.push(event.target);
  }
  if (openCards.length == 2) {
    cardCompare();
  }
}

/**
  * @description flip cards back and remove from openCards
  */
function clearCards (){
  openCards.forEach( function(card){
    card.classList.remove('open', 'show', 'nope');
  });
  openCards = [];
}

/**
  * @description if cards match, lock openCards
  */
function cardsMatch(){
  openCards.forEach( function(card){ card.classList.add('match') });
  clearCards();
  matchCount++;
}

/**
  * @description if no match, remove from list and flip after 1s
  */
function cardsDontMatch(){
  openCards.forEach( function(card){ card.classList.add('nope') });
  setTimeout(clearCards, 1000);
  starMinus();
}

/**
  * @description winGame() at 8 matches, stopTimer(), alert user, call newGame
  */
function winGame(){
  stopTimer();
  window.alert(`YOU WIN!!
Your time was ${timeCount} seconds.
Your score is ${stars} points.
Play again?`);
  newGame();
}

/**
  * @description loseGame() at 0 stars, stopTimer(), alert user, call newGame()
  */
function loseGame(){
  stopTimer();
  window.alert('you lose :(');
  newGame();
}

/**
  * @description compare card class symbols
  */
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

/**
  * @description Decrement stars on not match
  */
function starMinus(){
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
