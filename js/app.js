// JavaScript Document
// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(){
  // Define Constants

  // Define Variables
  let moves = 0;
  let stars = 3;

  // TODO: Create a list that holds all of your cards, (and access with event listener?)

  // TODO: Display the cards on the page
    // TODO: Shuffle the list of cards using the provided "shuffle" method below
    // listen for fa-repeat click, call shuffle()
    // TODO: loop through each card and create its HTML
    // TODO: add each card's HTML to the page

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

  // TODO: set up the event listener for a card.


  // TODO:  If a card is clicked: display the card's symbol (put this functionality in another function that you call from this one)

  // TODO:  If a card is clicked: add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)

  // TODO: If the list already has another card, check to see if the two cards match

  // TODO:  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

  // TODO:  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

  // TODO:  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)

  // TODO:  + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

  // TODO: Timer
    // On first card click, start Timer
    // On game win, stop Timer

  // TODO: Increment moves
    // Call move incrememnt function at end of move function

  // TODO: Decrement Stars
    // Call start decrement on not match case.


  // The End
});
