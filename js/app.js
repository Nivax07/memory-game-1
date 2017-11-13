let openedCard, matches, timer, timerInterval, movesMade;
let cards = [
	'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb',
	'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',	'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

window.addEventListener('load', reset); // Setup Deck when page loads
document.getElementById('btnRestart').addEventListener('click', reset); // Shuffle cards when restart clicked

/**
 * Resets the game completely
 */
function reset() {
	timer = 0;
	matches = 0;
	movesMade = 0;
	openedCard = null;
	clearInterval(timerInterval);

	document.getElementById('deck').innerHTML = '';
	document.getElementById('timer').innerHTML = 0;
	document.getElementById('moves').innerHTML = 0;

	setupDeck();
}

/**
 * Builds the deck
 */
function setupDeck() {
	cards = shuffle(cards);

	for(let i = 0; i < 16; i++) {
		// Create the card
		let card = document.createElement('li');
		card.classList.add('card');
		card.setAttribute('id', i);
		card.setAttribute('name', cards[i]);
		card.setAttribute('onclick', 'cardTapped(this)');

		// Create the item
		let item = document.createElement('i');
		item.classList.add('fa');
		item.classList.add(cards[i]);

		card.appendChild(item); // Append item to card
		document.getElementById('deck').appendChild(card); // Append card to board
	}
}

/**
 * Reveals the tapped card for one second
 *
 * @param evt - tapped card
 */
function cardTapped(evt) {
	incrementMoves(); // Increment moves

	evt.classList.add('open'); // Open card
	evt.classList.add('show'); // Show card

	let item = { // Object containing ID and name of selected card
		id: evt.getAttribute('id'),
		name: evt.getAttribute('name')
	};

	if(checkForMatch(item)) {
		matches++; // Increments matches

		// Adds match class and removes event listener
		evt.classList.add('match');
		evt.removeAttribute('onclick');

		// Adds match class and removes event listener
		openedCard.classList.add('match');
		openedCard.removeAttribute('onclick');

		// Checks if user won
		checkForWin();
	} else openedCard = evt; // If didn't match, update selected card

	setTimeout(function () {
		evt.classList.remove('open'); // Close card
		evt.classList.remove('show'); // Hide card
	}, 1000);
}

/**
 * Checks the number of recorded matches and determines if the user has won
 */
function checkForWin() {
	if(matches === 8) {
		clearInterval(timerInterval);
		alert(`Congratulations! You won in ${timer} seconds and made ${movesMade} moves!`);
	}
}

/**
 * Checks to see if the current open card matches the previous
 * open card if it is still open. Both cards should have the 'open'
 * class assigned to them.
 *
 * @param item
 * @returns boolean - The cards matched
 */
function checkForMatch(item) {
	if(!openedCard) return; // Return if first card

	let card = {
		id: openedCard.getAttribute('id'),
		name: openedCard.getAttribute('name'),
		isOpen: openedCard.classList.contains('open')
	};

	// Check if same name but different card and both are still open
	return (item.name === card.name && item.id !== card.id && card.isOpen);
}

/**
 * Starts the timer
 */
function startTimer() {
	timerInterval = setInterval(function() {
		timer++;
		document.getElementById('timer').innerHTML = timer;
	}, 1000);
}

/**
 * Increments moves made by one
 */
function incrementMoves() {
	if(movesMade === 0) startTimer();
	movesMade++;
	document.getElementById('moves').innerHTML = movesMade;
}

/**
 * This chunk of code should already look somewhat familiar :P
 *
 * @param array
 * @returns {*}
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