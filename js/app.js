let openedCard, matches, timer, timerInterval, movesMade, modal, starOne, starTwo, starThree, cardOne, cardTwo, rating;
let cards = [
	'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb',
	'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',	'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

modal = document.getElementById('modal');
starOne = document.getElementById('starOne');
starTwo = document.getElementById('starTwo');
starThree = document.getElementById('starThree');

// Modal specific
window.addEventListener('click', function(event) {
	if (event.target === modal) modal.style.display = 'none';
});

// Modal specific
document.getElementById('btnClose').addEventListener('click', function() {
	modal.style.display = 'none';
});

window.addEventListener('load', reset); // Setup Deck when page loads
document.getElementById('btnRestart').addEventListener('click', reset); // Shuffle cards when restart clicked

/**
 * Resets the game completely
 */
function reset() {
	timer = 0;
	rating = 3;
	matches = 0;
	movesMade = 0;
	cardOne = null;
	cardTwo = null;
	openedCard = null;
	clearInterval(timerInterval);

	document.getElementById('deck').innerHTML = '';
	document.getElementById('timer').innerHTML = timer;
	document.getElementById('moves').innerHTML = movesMade;

	if(modal.style.display !== 'none') modal.style.display = 'none';

	setupDeck();
	setupStars();
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
 * Initial setup of the stars. Set their colour to reflect highlighted.
 */
function setupStars() {
	starOne.classList.add('selected-star');
	starTwo.classList.add('selected-star');
	starThree.classList.add('selected-star');
}

/**
 * Reveals the tapped card for one second
 *
 * @param evt - tapped card
 */
function cardTapped(evt) {
	evt.classList.add('open'); // Open card
	evt.classList.add('show'); // Show card

	if(cardOne && cardTwo) {
		cardOne.classList.remove('open'); // Close card
		cardOne.classList.remove('show'); // Hide card

		cardTwo.classList.remove('open'); // Close card
		cardTwo.classList.remove('show'); // Hide card

		cardOne = null;
		cardTwo = null;
	}

	if(!openedCard) {
		openedCard = evt;
	}
	else {
		incrementMoves(); // Increment moves

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
		}

		// Sets the current selected cards to global variables for easy selection elsewhere
		cardOne = evt;
		cardTwo = openedCard;

		// Resets the openedCard variables
		openedCard = null;

		// Sets the turned over cards to reset
		resetCards();
	}
}

/**
 * Hides the current two displayed cards after a second if another card is not clicked in the mean time
 */
function resetCards() {
	setTimeout(() => {
		if(cardOne) {
			cardOne.classList.remove('open'); // Close card
			cardOne.classList.remove('show'); // Hide card
			cardOne = null;
		}

		if(cardTwo) {
			cardTwo.classList.remove('open'); // Close card
			cardTwo.classList.remove('show'); // Hide card
			cardTwo = null;
		}
	}, 1000);
}

/**
 * Checks the number of recorded matches and determines if the user has won
 */
function checkForWin() {
	if(matches === 8) {
		clearInterval(timerInterval);
		document.getElementById('winMessage').innerHTML = `Congratulations! You won in ${timer} seconds and made ${movesMade} moves! That was a ${rating} star performance!`;
		modal.style.display = 'block';
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
	timerInterval = setInterval(() => {
		timer++;
		document.getElementById('timer').innerHTML = timer;
	}, 1000);
}

/**
 * Increments moves made by one
 */
function incrementMoves() {
	if(movesMade === 0) startTimer();

	switch(movesMade) {
		case 20:
			rating--;
			starThree.classList.remove('selected-star');
			break;

		case 35:
			rating--;
			starTwo.classList.remove('selected-star');
			break;
	}

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