// JavaScript Document
const deck = document.querySelector(".deck");
const card = deck.querySelectorAll("li");

// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(){
  console.log('Run on DOMContentLoaded');
  // VARIABLES
  let moves = 0;
  let stars = 3;

  // EVENT LISTENERS
  deck.addEventListener("click", function(event) {
    displaySymbol(event);
    openCards(event);
  });

  // TODO: Create a list that holds all of your cards, (and access with event listener?)
  // TODO: Display the cards on the page
    // TODO: Shuffle the list of cards using the provided "shuffle" method below
    // listen for fa-repeat click, call shuffle()
    // TODO: loop through each card and create its HTML
    // TODO: add each card's HTML to the page

  // FUNCTIONS
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
      return array;
  }





  // TODO:  If a card is clicked: display the card's symbol (put this functionality in another function that you call from this one)
  function displaySymbol(event){
    console.log('card is clicked');
    // event.target.style.backgroundColor="black";
    // event.target.toggleAttribute("class[open]");
    event.target.classList.toggle("open");
    event.target.classList.toggle("show");
  }

  // TODO:  If a card is clicked: add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  function openCards(event){
    console.log('this card is on the list');
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

  // FUNCTION CALLS
  // On page load, shuffle the deck.
  // shuffle(deck);

  // The End
});
