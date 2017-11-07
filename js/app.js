var openedCards, matches, timerInterval;
var cards = [
	'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb',
	'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',	'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

window.addEventListener('load', reset); // Setup Deck when page loads
document.getElementById('btnRestart').addEventListener('click', reset); // Shuffle cards when restart clicked

/**
 * Resets the game completely
 */
function reset() {
	matches = 0;
	openedCards = [];
	clearInterval(timerInterval);

	document.getElementById('deck').innerHTML = '';
	document.getElementById('timer').innerHTML = 0;
	document.getElementById('moves').innerHTML = 0;

	setupDeck();
	startTimer();
}

/**
 * Builds the deck
 */
function setupDeck() {
	cards = shuffle(cards);

	for(var i = 0; i < 16; i++) {
		var card = document.createElement('li');
		card.className = 'card';
		card.setAttribute('onclick', 'cardTapped(this)');

		var item = document.createElement('i');
		item.className = 'fa ' + cards[i];

		card.appendChild(item);
		document.getElementById('deck').appendChild(card);
	}
}

/**
 * Reveals the tapped card for one second
 *
 * @param evt
 */
function cardTapped(evt) {
	incrementMoves(); // Increment moves

	evt.classList.add('open'); // Open card
	evt.classList.add('show'); // Show card

	// Wait one second
	setTimeout(function() {
		evt.classList.remove('open'); // Close card
		evt.classList.remove('show'); // Hide card
	}, 1000);
}

/**
 * Starts the timer
 */
function startTimer() {
	timerInterval = setInterval(function() {
		document.getElementById('timer').innerHTML = parseInt(document.getElementById('timer').innerHTML) + 1;
	}, 1000);
}

/**
 * Increments moves made by one
 */
function incrementMoves() {
	document.getElementById('moves').innerHTML = parseInt(document.getElementById('moves').innerHTML) + 1;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */