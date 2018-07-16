// JavaScript Document
// Constant Variables
const DECK = document.querySelector(".deck");
const CARDS = DECK.querySelectorAll('li');
const SUITS = document.querySelectorAll("li.card > i");
const RESET = document.querySelector(".fa-repeat");

// Variables
let moves = 0;
let stars = 3;

let showall = function(){
  CARDS.forEach(function(card){
    card.classList.add('open', 'show')
  });
};


// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(event) {
  // FUNCTIONS
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

  function newGame() {
    console.log('newGame()');
    // (re)declare an empty array for suits
    let suits = [];
    // load the suits into the array
    SUITS.forEach(function(entry){
      // remove fa class
      entry.classList.remove('fa');
      // add entry.className to end of array
      suits.push(entry.className);
      // remove entry
      entry.remove();
    });
    console.log(suits);

    // It is generally understood that 7 shuffles are needed to create a  unique deck (in normal 52 card decks with riffle shuffling)
    for (let i = 0;i<7;i++){
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

  // TODO:  If a card is clicked: display the card's symbol (put this functionality in another function that you call from this one)
  function displaySymbol(event){
    console.log('displaySymbol()');
    event.target.classList.toggle("open");
    event.target.classList.toggle("show");
  }

  // TODO:  If a card is clicked: add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  function openCards(event){
    console.log('openCards()');
    // add card to open list
  }

  // TODO: If the list already has another card, check to see if the two cards match
  function cardCompare(){
    /*if () {
      cardsMatch();
      counter();
    } else {
      cardsDontMatch();
      starMinus();
      counter();
    }*/
  }

  // TODO:  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  function cardsMatch(){
    // element.matches(selectorString)
  }

  // TODO:  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  function cardsDontMatch(){

  }

  function clearCards (){
    // turn cards back after some time
  }

  // TODO:  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  function counter(){
    moves++;
    // update new moves count
  }

  // TODO:  + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

  // TODO: Timer
    // On first card click, start Timer
    // On game win, stop Timer

  // TODO: Decrement Stars
    // Call star decrement on not match case.
  function starMinus(){
    stars--;
    // update stars
  }

  // EVENT LISTENERS & FUNCTION CALLS
  // On DOMContentLoaded, call newGame
  newGame();

  // On reset, shuffle cards, reset stars ...
  RESET.addEventListener("click", function(event) {
    console.log('reset clicked')
    newGame();
  });

  // On lose, call newGame

  // On Click, display symbol and open cards
  DECK.addEventListener("click", function(event) {
    displaySymbol(event);
    // openCards(event);
  });



  // The End
});
