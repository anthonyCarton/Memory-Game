// JavaScript Document
// Constant Variables
const DECK = document.querySelector(".deck");
const CARDS = DECK.querySelectorAll('li');
const SUITS = document.querySelectorAll("li.card > i");
const RESET = document.querySelector(".fa-repeat");
const STARS = document.querySelectorAll(".stars li")


// Variables
let moves = 0;
let stars = 3;
let suits = [];

let openCards = [];

let showall = function(){
  CARDS.forEach(function(card){
    card.classList.add('open', 'show')
  });
};

  // FUNCTIONS
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
    // TODO once player flips two cards, cards automatically toggle back, so instead of toggle, use classList.add('') here
    // event.target.classList.add('open', 'show');
  }

  // TODO:  If a card is clicked: add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  function cardList(event){
    console.log('openCards()');
    if (openCards.length < 2) {
      // append card.classList to openCards[]
      openCards.push(event.target);
      console.log(openCards)
    }
    if (openCards.length == 2) {
      cardCompare();
      openCard = [];
    }
    console.log(openCards.length);
  }

  // TODO: If the list already has another card, check to see if the two cards match
  function cardCompare(){
    if (openCards[0].firstChild.className == openCards[1].firstChild.className){
      openCards[0].classList.add('match');
      openCards[0].classList.remove('open', 'show');
      openCards[1].classList.add('match');
      openCards[1].classList.remove('open', 'show');
      // will I need to? openCard[1].classList.add('match');
      cardsMatch();
      counter();
    } else {
      cardsDontMatch();
      starMinus();
      counter();
    }
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
  function winGame(){
    console.log('winGame()');
  }

  function loseGame(){
    console.log('loseGame()');
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
    console.log(stars);
  }



  // // // Run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function(event) {
  // On reset, shuffle cards, reset stars ...
  RESET.addEventListener("click", function(event) {
    console.log('reset clicked')
    newGame();
  });

  // On lose, call newGame

  // On Click, display symbol and open cards
  DECK.addEventListener("click", function(event) {
    displaySymbol(event);
    cardList(event);
  });

  // On DOMContentLoaded call suitList(), newGame()

  suitList();
  newGame();

  // The End
});
